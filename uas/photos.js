/**
 * On-demand Wikimedia Commons candidate-image search.
 * Search results are source images, not verified aircraft identifications.
 * No live Commons response could be verified in the build environment.
 */

const queriesById = Object.freeze({
  'ababil-early': ['Ababil-1'],
  'ababil-2': ['Ababil-2', 'Ababil-T'],
  'ababil-3': ['Ababil-3'],
  'ababil-4-5': ['Ababil-4', 'Ababil-5'],
  'mohajer-1': ['Mohajer-1'],
  'mohajer-2': ['Mohajer-2', 'Mohajer-2N'],
  'mohajer-3': ['Mohajer-3'],
  'mohajer-4': ['Mohajer-4', 'Mohajer-4B'],
  'mohajer-6': ['Mohajer-6'],
  'mohajer-10': ['Mohajer-10'],
  sadegh: ['Sadegh'],
  'shahed-121': ['Shahed-121'],
  'shahed-129': ['Shahed-129'],
  'shahed-149': ['Shahed-149'],
  'shahed-131': ['Shahed-131'],
  'shahed-136': ['Shahed-136'],
  'shahed-238': ['Shahed-238'],
  'shahed-171': ['Shahed-171'],
  'shahed-181-191': ['Shahed-181', 'Shahed-191'],
  'shahed-101-107': ['Shahed-101', 'Shahed-107'],
  karrar: ['Karrar'],
  fotros: ['Fotros'],
  'kaman-12': ['Kaman-12'],
  'kaman-22': ['Kaman-22'],
  yasir: ['Yasir'],
  kian: ['Kian-1', 'Kian-2'],
  arash: ['Arash-1', 'Arash-2'],
  'raad-85': ['Raad-85'],
  'pelican-2': ['Pelican-2'],
  mobin: ['Mobin'],
  qasef: ['Qasef-1', 'Qasef-2K'],
  samad: ['Samad-1', 'Samad-2', 'Samad-3', 'Samad-4'],
});

const ambiguousNames = new Set(['Sadegh', 'Karrar', 'Fotros', 'Yasir', 'Mobin']);
const imageMimes = new Set(['image/jpeg', 'image/png', 'image/webp']);

/** Explicit model queries, including separately searchable grouped labels. */
export function photoQueries(asset) {
  return Object.prototype.hasOwnProperty.call(queriesById, asset?.id) ? [...queriesById[asset.id]] : [];
}

function cleanQuery(query) {
  if (typeof query !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9 .’'()-]{0,119}$/.test(query.trim())) {
    throw new TypeError('An exact model designation is required for the image search.');
  }
  return query.trim();
}

function searchTerms(query) {
  // A quoted designation preserves specificity. The extra word reduces
  // obvious namesakes; it does not validate what the resulting image shows.
  return `"${query}"${ambiguousNames.has(query) ? ' drone' : ''}`;
}

/** Human-readable fallback; there is no automatic broader search. */
export function commonsSearchUrl(query) {
  query = cleanQuery(query);
  const url = new URL('https://commons.wikimedia.org/wiki/Special:MediaSearch');
  url.searchParams.set('type', 'image');
  url.searchParams.set('search', searchTerms(query));
  return url.href;
}

const entities = Object.freeze({
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ndash: '–', mdash: '—', hellip: '…', copy: '©', reg: '®', trade: '™',
  laquo: '«', raquo: '»', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
  bull: '•', middot: '·', thinsp: ' ', ensp: ' ', emsp: ' ', shy: '',
});

function decodeEntities(value) {
  return value.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (whole, entity) => {
    if (!entity.startsWith('#')) return entities[entity.toLowerCase()] ?? whole;
    const code = entity[1]?.toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : '';
  });
}

/** Conservative plain-text metadata. The UI must still use textContent/escape. */
function plainText(value, limit = 1000) {
  if (typeof value !== 'string') return '';
  let text = value.slice(0, 16000);
  for (let pass = 0; pass < 3; pass += 1) text = decodeEntities(text);
  text = text
    .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > limit || value.length > 16000 ? `${text.slice(0, Math.max(0, limit - 1))}…` : text;
}

function metadataValue(metadata, key, limit = 1000) {
  return plainText(metadata?.[key]?.value, limit);
}

function safeUrl(raw, host, pathTest) {
  if (typeof raw !== 'string' || raw.length > 4096) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.hostname !== host || url.username || url.password || (url.port && url.port !== '443')) return null;
    if (!pathTest(decodeURIComponent(url.pathname))) return null;
    return url.href;
  } catch {
    return null;
  }
}

function reportedLicense(metadata) {
  const label = metadataValue(metadata, 'LicenseShortName', 120);
  const terms = metadataValue(metadata, 'UsageTerms', 180);
  const code = metadataValue(metadata, 'License', 120).toLowerCase();
  const normalized = `${label} ${terms} ${code}`.toLowerCase();
  if (/\bnc\b|\bnd\b|noncommercial|no derivatives|all rights reserved/.test(normalized)) return null;
  const raw = metadata?.LicenseUrl?.value;
  let url = null;
  if (typeof raw === 'string' && raw.trim()) {
    // Older Commons metadata often uses HTTP or protocol-relative CC links.
    // Upgrade only the exact validated CC host; no URL is fetched here.
    let normalizedUrl;
    try {
      normalizedUrl = new URL(raw.trim().startsWith('//') ? `https:${raw.trim()}` : raw.trim());
      if (!['http:', 'https:'].includes(normalizedUrl.protocol) || normalizedUrl.hostname !== 'creativecommons.org' || normalizedUrl.username || normalizedUrl.password || normalizedUrl.port) return null;
      normalizedUrl.protocol = 'https:';
    } catch { return null; }
    // Known canonical families only. NC/ND licenses, license texts on other
    // sites, and unrecognized statements are excluded.
    url = safeUrl(normalizedUrl.href, 'creativecommons.org', path =>
      /^\/licenses\/by(?:-sa)?\/(?:1\.0|2\.0|2\.5|3\.0|4\.0)\/?$/.test(path) ||
      /^\/publicdomain\/(?:zero|mark)\/1\.0\/?$/.test(path));
    if (!url) return null;
  }
  if (url) {
    const path = new URL(url).pathname;
    const statements = [...`${label} ${code}`.toLowerCase().matchAll(/\bcc[\s-]*by(?:[\s-]+(sa))?(?:[\s-]+([1-4]\.0|2\.5))?/g)];
    if (path.startsWith('/licenses/')) {
      const match = path.match(/^\/licenses\/(by(?:-sa)?)\/([0-9.]+)/);
      if (statements.some(statement => (statement[1] ? 'by-sa' : 'by') !== match[1] || (statement[2] && statement[2] !== match[2]))) return null;
      if (/\bcc0\b|\bpublic domain\b/.test(normalized) || code === 'pd') return null;
      return { licenseLabel: `CC ${match[1].toUpperCase()} ${match[2]}`, licenseUrl: `https://creativecommons.org/licenses/${match[1]}/${match[2]}/` };
    }
    if (statements.length > 0) return null;
    if (path.includes('/zero/')) return { licenseLabel: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' };
    if (path.includes('/mark/')) return { licenseLabel: 'Public domain (reported by Commons)', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/' };
  }
  // Commons often leaves LicenseUrl empty for public-domain files. Require
  // both an explicit public-domain statement and the noncopyright flag.
  const publicDomain = /^(?:public domain|pd)$/i.test(label) || code === 'pd';
  if (publicDomain && metadataValue(metadata, 'Copyrighted', 10).toLowerCase() === 'false') {
    return { licenseLabel: 'Public domain (reported by Commons)', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/' };
  }
  return null;
}

function dimension(value) {
  return Number.isInteger(value) && value > 0 && value <= 100000 ? value : null;
}

function parseImage(page) {
  if (!page || typeof page !== 'object' || !Array.isArray(page.imageinfo)) return null;
  const info = page.imageinfo[0];
  if (!info || !imageMimes.has(info.mime)) return null;
  const sourceUrl = safeUrl(info.descriptionurl, 'commons.wikimedia.org', path => /^\/wiki\/File:.+/.test(path));
  const thumbUrl = safeUrl(info.thumburl || info.url, 'upload.wikimedia.org', path => path.startsWith('/wikipedia/commons/'));
  if (!sourceUrl || !thumbUrl) return null;
  const metadata = info.extmetadata;
  const license = reportedLicense(metadata);
  if (!license) return null;
  const creator = metadataValue(metadata, 'Artist', 16000);
  const credit = metadataValue(metadata, 'Credit', 16000);
  // Do not present truncated or absent required attribution as a cleared
  // CC-BY/CC-BY-SA image. The original file-page search remains available.
  if (license.licenseLabel.startsWith('CC BY') && (!creator || (metadata?.Artist?.value?.length ?? 0) > 16000 || (metadata?.Credit?.value?.length ?? 0) > 16000)) return null;
  return {
    title: plainText(page.title, 250).replace(/^File:/, '') || 'Commons source image',
    caption: metadataValue(metadata, 'ImageDescription', 1500) || 'No descriptive caption supplied in the retrieved Commons metadata.',
    creator: creator || 'Creator not specified in the retrieved Commons metadata',
    credit,
    ...license,
    sourceUrl,
    thumbUrl,
    width: dimension(info.thumbwidth ?? info.width),
    height: dimension(info.thumbheight ?? info.height),
    dateText: metadataValue(metadata, 'DateTimeOriginal', 200) || (plainText(info.timestamp, 100) ? `File revision timestamp: ${plainText(info.timestamp, 100)}` : 'Date not specified in the retrieved metadata'),
  };
}

function abortError() {
  return new DOMException('Image lookup cancelled.', 'AbortError');
}

/**
 * Load at most six unreviewed candidate source images for one designation.
 * `total` is returned candidate pages, not the search engine's total hits.
 * `skipped` counts pages omitted for type, source, metadata, or duplication.
 * The returned licence is reported by Commons, not independently validated.
 */
export async function loadCommonsPhotos(query, { fetchImpl = globalThis.fetch, signal } = {}) {
  query = cleanQuery(query);
  if (typeof fetchImpl !== 'function') throw new TypeError('Image loading is unavailable in this browser.');
  if (signal?.aborted) throw abortError();
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.search = new URLSearchParams({
    action: 'query', format: 'json', formatversion: '2', generator: 'search',
    gsrnamespace: '6', gsrlimit: '6', gsrsearch: searchTerms(query),
    prop: 'imageinfo', iiprop: 'url|extmetadata|mime|size|timestamp', iiurlwidth: '640',
    iiextmetadatalanguage: 'en',
    iiextmetadatafilter: 'Artist|Credit|ImageDescription|License|LicenseShortName|LicenseUrl|UsageTerms|Copyrighted|AttributionRequired|DateTimeOriginal',
    origin: '*',
  }).toString();
  const controller = new AbortController();
  let timedOut = false;
  const cancel = () => controller.abort();
  signal?.addEventListener('abort', cancel, { once: true });
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, 12000);
  try {
    const response = await fetchImpl(url.href, {
      method: 'GET', mode: 'cors', credentials: 'omit', referrerPolicy: 'no-referrer', signal: controller.signal,
    });
    if (!response || typeof response.json !== 'function') throw new Error('Wikimedia returned an unreadable response.');
    if (!response.ok) throw new Error(`Wikimedia image search returned HTTP ${response.status || 'error'}. Open the source search or try again later.`);
    let data;
    try { data = await response.json(); } catch { throw new Error('Wikimedia returned malformed image metadata.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Wikimedia returned malformed image metadata.');
    const apiError = data.error || (Array.isArray(data.errors) ? data.errors[0] : null);
    if (apiError) throw new Error(`Wikimedia API error: ${plainText(apiError.info || apiError.text || apiError.code, 250) || 'search unavailable'}.`);
    if (data.query !== undefined && (!data.query || typeof data.query !== 'object' || Array.isArray(data.query))) {
      throw new Error('Wikimedia returned malformed search results.');
    }
    const pages = data.query?.pages ?? [];
    if (!Array.isArray(pages)) throw new Error('Wikimedia returned malformed search results.');
    const ordered = [...pages].sort((a, b) => (Number.isFinite(a?.index) ? a.index : Infinity) - (Number.isFinite(b?.index) ? b.index : Infinity));
    const items = [];
    const seen = new Set();
    for (const page of ordered.slice(0, 6)) {
      const item = parseImage(page);
      if (!item || seen.has(item.sourceUrl)) continue;
      seen.add(item.sourceUrl);
      items.push(item);
    }
    if (signal?.aborted) throw abortError();
    return { items, skipped: pages.length - items.length, total: pages.length, query, retrievedAt: new Date().toISOString() };
  } catch (error) {
    if (signal?.aborted) throw abortError();
    if (timedOut) throw new Error('Wikimedia image lookup timed out. Open the source search or try again later.');
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', cancel);
  }
}
