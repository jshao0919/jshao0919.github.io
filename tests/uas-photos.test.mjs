import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogue } from '../uas/catalogue.js';
import { photoQueries, commonsSearchUrl, loadCommonsPhotos } from '../uas/photos.js';

// Synthetic fixtures shaped like MediaWiki formatversion=2 responses. These
// tests do not constitute a live Commons integration or image-identity audit.
function candidate(name = 'Shahed-136 example.jpg', overrides = {}) {
  const base = {
    pageid: 123, ns: 6, title: `File:${name}`, index: 1,
    imageinfo: [{
      mime: 'image/jpeg', width: 1600, height: 1000,
      thumbwidth: 640, thumbheight: 400,
      url: `https://upload.wikimedia.org/wikipedia/commons/a/ab/${name.replaceAll(' ', '_')}`,
      thumburl: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/${name.replaceAll(' ', '_')}/640px-${name.replaceAll(' ', '_')}`,
      descriptionurl: `https://commons.wikimedia.org/wiki/File:${name.replaceAll(' ', '_')}`,
      timestamp: '2024-02-03T04:05:06Z',
      extmetadata: {
        Artist: { value: '<a href="https://example.org">Example Photographer</a>' },
        Credit: { value: 'Courtesy of &quot;Example Archive&quot;' },
        ImageDescription: { value: '<p>A source caption; model label is an unverified claim.</p>' },
        LicenseShortName: { value: 'CC BY-SA 4.0' },
        License: { value: 'cc-by-sa-4.0' },
        LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0' },
        UsageTerms: { value: 'Creative Commons Attribution-Share Alike 4.0' },
        Copyrighted: { value: 'True' },
      },
    }],
  };
  Object.assign(base.imageinfo[0], overrides);
  return base;
}

function response(data, { ok = true, status = 200 } = {}) {
  return { ok, status, json: async () => data };
}

const fetchPages = pages => async () => response({ batchcomplete: true, query: { pages } });

test('every catalogue entry has explicit clean queries and grouped designations are separate', () => {
  for (const asset of catalogue) {
    const queries = photoQueries(asset);
    assert.ok(queries.length > 0, asset.id);
    assert.ok(queries.every(query => /^[A-Za-z0-9][A-Za-z0-9 -]*$/.test(query)));
    assert.ok(queries.every(query => !/Iran|family|reported|all /i.test(query)));
  }
  assert.deepEqual(photoQueries({ id: 'shahed-181-191' }), ['Shahed-181', 'Shahed-191']);
  assert.deepEqual(photoQueries({ id: 'samad' }), ['Samad-1', 'Samad-2', 'Samad-3', 'Samad-4']);
  assert.deepEqual(photoQueries({ id: 'ababil-4-5' }), ['Ababil-4', 'Ababil-5']);
  assert.deepEqual(photoQueries({ id: 'constructor' }), []);
  assert.deepEqual(photoQueries(null), []);
  const mutable = photoQueries({ id: 'karrar' });
  mutable.push('wrong');
  assert.deepEqual(photoQueries({ id: 'karrar' }), ['Karrar']);
});

test('human and API searches preserve exact designations and anonymous CORS settings', async () => {
  const link = new URL(commonsSearchUrl('Shahed-136'));
  assert.equal(link.origin, 'https://commons.wikimedia.org');
  assert.equal(link.pathname, '/wiki/Special:MediaSearch');
  assert.equal(link.searchParams.get('type'), 'image');
  assert.equal(link.searchParams.get('search'), '"Shahed-136"');
  assert.equal(new URL(commonsSearchUrl('Karrar')).searchParams.get('search'), '"Karrar" drone');
  let received;
  const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: async (url, options) => {
    received = { url: new URL(url), options };
    return response({ query: { pages: [candidate()] } });
  } });
  assert.equal(received.url.origin, 'https://commons.wikimedia.org');
  assert.equal(received.url.pathname, '/w/api.php');
  for (const [key, value] of Object.entries({ formatversion: '2', generator: 'search', gsrnamespace: '6', gsrlimit: '6', origin: '*', iiurlwidth: '640', gsrsearch: '"Shahed-136"' })) {
    assert.equal(received.url.searchParams.get(key), value, key);
  }
  assert.equal(received.options.credentials, 'omit');
  assert.equal(received.options.mode, 'cors');
  assert.equal(received.options.referrerPolicy, 'no-referrer');
  assert.ok(received.options.signal instanceof AbortSignal);
  assert.equal(result.query, 'Shahed-136');
  assert.equal(result.items.length, 1);
  assert.equal(result.total, 1);
  assert.equal(result.skipped, 0);
  assert.ok(Number.isFinite(Date.parse(result.retrievedAt)));
});

test('result schema preserves plain metadata, attribution, source, dimensions, and reported license', async () => {
  const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([candidate()]) });
  const item = result.items[0];
  assert.deepEqual(Object.keys(item).sort(), ['caption','creator','credit','dateText','height','licenseLabel','licenseUrl','sourceUrl','thumbUrl','title','width'].sort());
  assert.equal(item.creator, 'Example Photographer');
  assert.equal(item.credit, 'Courtesy of "Example Archive"');
  assert.equal(item.licenseLabel, 'CC BY-SA 4.0');
  assert.equal(item.licenseUrl, 'https://creativecommons.org/licenses/by-sa/4.0/');
  assert.equal(item.width, 640);
  assert.equal(item.height, 400);
  assert.match(item.dateText, /^File revision timestamp:/);
  assert.match(item.caption, /unverified claim/);
});

test('remote markup and encoded scripts are reduced to inert plain text', async () => {
  const page = candidate();
  page.title = 'File:<img src=x onerror=alert(1)>Example.jpg';
  const meta = page.imageinfo[0].extmetadata;
  meta.Artist.value = '<script>alert(1)</script><a href="javascript:alert(2)">Jane &amp; John</a>';
  meta.ImageDescription.value = '&lt;script&gt;alert(3)&lt;/script&gt;A &#x64;rone &amp; a test. <img src=x onerror="alert(4)">';
  meta.Credit.value = '&amp;lt;b&amp;gt;Source&amp;lt;/b&amp;gt;\u202e';
  const item = (await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([page]) })).items[0];
  assert.equal(item.creator, 'Jane & John');
  assert.equal(item.caption, 'A drone & a test.');
  assert.equal(item.credit, 'Source');
  assert.ok(!JSON.stringify(item).includes('alert('));
  assert.ok(!item.title.includes('<'));
});

test('untrusted image/source URLs, credentials, malformed escapes, and unsuitable media are omitted', async () => {
  const modifications = [
    { thumburl: 'javascript:alert(1)' },
    { thumburl: 'data:image/png;base64,abc' },
    { thumburl: 'http://upload.wikimedia.org/wikipedia/commons/a/a.jpg' },
    { thumburl: 'https://upload.wikimedia.org.example.net/wikipedia/commons/a/a.jpg' },
    { thumburl: 'https://user:pass@upload.wikimedia.org/wikipedia/commons/a/a.jpg' },
    { thumburl: 'https://upload.wikimedia.org:444/wikipedia/commons/a/a.jpg' },
    { thumburl: 'https://upload.wikimedia.org/wikipedia/commons/%ZZ' },
    { descriptionurl: 'https://commons.wikimedia.org/wiki/User:Example' },
    { descriptionurl: 'https://example.net/wiki/File:Example.jpg' },
    { mime: 'image/svg+xml' },
    { mime: 'application/pdf' },
    { mime: 'video/webm' },
  ];
  for (const override of modifications) {
    const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([candidate('Example.jpg', override)]) });
    assert.equal(result.items.length, 0, JSON.stringify(override));
    assert.equal(result.skipped, 1);
  }
});

test('license filter accepts canonical BY/BY-SA/CC0 or explicit public domain and rejects unclear terms', async () => {
  const supported = [
    { LicenseShortName: { value: 'CC BY 4.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by/4.0/' } },
    { LicenseShortName: { value: 'CC BY-SA 3.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/3.0/' } },
    { LicenseShortName: { value: 'CC BY 4.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by/4.0/?unneeded=query#fragment' } },
    { LicenseShortName: { value: 'CC BY 4.0' }, LicenseUrl: { value: 'http://creativecommons.org/licenses/by/4.0/' } },
    { LicenseShortName: { value: 'CC BY-SA 4.0' }, LicenseUrl: { value: '//creativecommons.org/licenses/by-sa/4.0/' } },
    { LicenseShortName: { value: 'CC0' }, LicenseUrl: { value: 'https://creativecommons.org/publicdomain/zero/1.0/' } },
    { LicenseShortName: { value: 'Public domain' }, License: { value: 'pd' }, Copyrighted: { value: 'False' } },
  ];
  for (const metadata of supported) {
    const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([candidate('Example.jpg', { extmetadata: { Artist: { value: 'Example photographer' }, ...metadata } })]) });
    assert.equal(result.items.length, 1);
    assert.match(result.items[0].licenseUrl, /^https:\/\/creativecommons\.org\//);
    assert.equal(new URL(result.items[0].licenseUrl).search, '');
    assert.equal(new URL(result.items[0].licenseUrl).hash, '');
  }
  const excluded = [
    {},
    { LicenseShortName: { value: 'CC BY' } },
    { LicenseShortName: { value: 'Public domain' } },
    { LicenseShortName: { value: 'CC BY-NC 4.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by-nc/4.0/' } },
    { LicenseShortName: { value: 'CC BY-ND 4.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by/4.0/' } },
    { LicenseUrl: { value: 'https://example.net/licenses/by/4.0/' } },
    { LicenseUrl: { value: 'http://creativecommons.org:8080/licenses/by/4.0/' } },
    { LicenseUrl: { value: '//creativecommons.org.example.net/licenses/by/4.0/' } },
    { LicenseUrl: { value: 'http://user:pass@creativecommons.org/licenses/by/4.0/' } },
    { LicenseShortName: { value: 'CC BY-SA 4.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by/4.0/' } },
    { LicenseShortName: { value: 'CC BY 3.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by/4.0/' } },
    { LicenseUrl: { value: 'javascript:alert(1)' } },
    { LicenseUrl: { value: 'https://creativecommons.org/licenses/by/9.0/' } },
    { LicenseShortName: { value: 'All rights reserved' }, LicenseUrl: { value: 'https://creativecommons.org/publicdomain/mark/1.0/' } },
  ];
  for (const metadata of excluded) {
    const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([candidate('Example.jpg', { extmetadata: { Artist: { value: 'Example photographer' }, ...metadata } })]) });
    assert.equal(result.items.length, 0, JSON.stringify(metadata));
  }
});

test('BY/BY-SA images require preserved attribution; descriptions explicitly mark excerpts', async () => {
  for (const badArtist of [undefined, { value: '' }, { value: '<script>hidden</script>' }, { value: 'a'.repeat(16001) }]) {
    const page = candidate();
    page.imageinfo[0].extmetadata.Artist = badArtist;
    assert.equal((await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([page]) })).items.length, 0);
  }
  const page = candidate();
  page.imageinfo[0].extmetadata.Artist.value = 'Photographer '.repeat(100);
  page.imageinfo[0].extmetadata.Credit.value = 'Required credit '.repeat(400);
  page.imageinfo[0].extmetadata.ImageDescription.value = 'Description '.repeat(300);
  const item = (await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([page]) })).items[0];
  assert.equal(item.creator, page.imageinfo[0].extmetadata.Artist.value.trim());
  assert.equal(item.credit, page.imageinfo[0].extmetadata.Credit.value.trim());
  assert.equal(item.caption.length, 1500);
  assert.ok(item.caption.endsWith('…'));
  page.imageinfo[0].extmetadata.Credit.value = 'c'.repeat(16001);
  assert.equal((await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([page]) })).items.length, 0);
  for (const metadata of [
    { LicenseShortName: { value: 'Public domain' }, License: { value: 'pd' }, Copyrighted: { value: 'False' } },
    { LicenseShortName: { value: 'CC0' }, LicenseUrl: { value: 'https://creativecommons.org/publicdomain/zero/1.0/' } },
  ]) {
    const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([candidate('Example.jpg', { extmetadata: metadata })]) });
    assert.equal(result.items.length, 1);
    assert.match(result.items[0].creator, /not specified/);
  }
});

test('empty and missing query results are handled, duplicate files are omitted, and index is respected', async () => {
  for (const data of [{ batchcomplete: true }, { query: {} }, { query: { pages: [] } }]) {
    const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: async () => response(data) });
    assert.deepEqual(result.items, []);
    assert.equal(result.total, 0);
    assert.equal(result.skipped, 0);
  }
  const first = candidate('First.jpg'); first.index = 1;
  const second = candidate('Second.jpg'); second.index = 2;
  const result = await loadCommonsPhotos('Shahed-136', { fetchImpl: fetchPages([second, first, first, { title: 'File:Missing.jpg' }]) });
  assert.deepEqual(result.items.map(item => item.title), ['First.jpg', 'Second.jpg']);
  assert.equal(result.total, 4);
  assert.equal(result.skipped, 2);
});

test('HTTP errors, HTTP-200 API errors, and malformed responses fail explicitly', async () => {
  await assert.rejects(loadCommonsPhotos('Shahed-136', { fetchImpl: async () => response({}, { ok: false, status: 429 }) }), /HTTP 429/);
  await assert.rejects(loadCommonsPhotos('Shahed-136', { fetchImpl: async () => response({ error: { code: 'ratelimited', info: '<b>Limit reached</b>' } }) }), /API error: Limit reached/);
  await assert.rejects(loadCommonsPhotos('Shahed-136', { fetchImpl: async () => response({ errors: [{ text: 'Unavailable' }] }) }), /API error: Unavailable/);
  for (const data of [null, [], 'not JSON object', { query: 'wrong' }, { query: { pages: {} } }]) {
    await assert.rejects(loadCommonsPhotos('Shahed-136', { fetchImpl: async () => response(data) }), /malformed/);
  }
  await assert.rejects(loadCommonsPhotos('Shahed-136', { fetchImpl: async () => ({ ok: true, json: async () => { throw new SyntaxError('bad JSON'); } }) }), /malformed/);
  await assert.rejects(loadCommonsPhotos('Shahed-136', { fetchImpl: async () => { throw new TypeError('Network blocked'); } }), /Network blocked/);
  await assert.rejects(loadCommonsPhotos('Shahed-136', { fetchImpl: null }), /unavailable/);
});

test('invalid queries are rejected before networking; cancellation propagates as AbortError', async () => {
  for (const query of ['', '"bad" OR other', 'javascript:alert(1)', 'Shahed\n136', 'x'.repeat(121), null]) {
    assert.throws(() => commonsSearchUrl(query));
    await assert.rejects(loadCommonsPhotos(query, { fetchImpl: async () => { throw new Error('must not fetch'); } }), /designation/);
  }
  const already = new AbortController(); already.abort();
  await assert.rejects(loadCommonsPhotos('Shahed-136', { signal: already.signal, fetchImpl: async () => { throw new Error('must not fetch'); } }), error => error.name === 'AbortError');
  const controller = new AbortController();
  const pending = loadCommonsPhotos('Shahed-136', {
    signal: controller.signal,
    fetchImpl: (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true })),
  });
  controller.abort();
  await assert.rejects(pending, error => error.name === 'AbortError');
});
