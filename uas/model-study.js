import { catalogue } from './catalogue.js';
import { photoQueries, commonsSearchUrl, loadCommonsPhotos } from './photos.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const list = values => `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>`;
let pendingRequest = null;
let requestGeneration = 0;

/** General airframe vocabulary, not distinguishing features for an identification. */
export function designVocabulary(asset) {
  const form = asset.form.toLowerCase();
  if (/unresolved|variant-dependent|provenance|no single form/.test(form)) return [
    ['Unresolved configuration', 'This entry does not establish one airframe layout. Keep the original source label and distinguish the pictured object from any claimed family relationship.'],
    ['Variant', 'A particular version within a family. A shared name or number does not establish a shared structure.'],
  ];
  const terms = [];
  if (/canard/.test(form)) terms.push(['Canard', 'A layout with a foreplane ahead of the main wing. The term describes the arrangement of surfaces, not a unique aircraft identity.']);
  if (/twin.boom/.test(form)) terms.push(['Twin booms', 'Two longitudinal members extend toward the tail. They are structural members; the term is not a count of fuselages or engines.']);
  if (/delta/.test(form)) terms.push(['Delta wing', 'A broadly triangular wing planform. Delta describes the wing shape; it does not, by itself, specify a tail arrangement, propulsion type, or aircraft model.']);
  if (/flying.wing/.test(form)) terms.push(['Flying wing', 'An overall configuration centered on the wing without a conventional separate fuselage-and-tail arrangement. It is a configuration category, not a synonym for every triangular outline.']);
  if (/long.wing/.test(form)) terms.push(['Span and proportion', 'Span runs from one wing tip to the other. An oblique photograph changes apparent proportions; pixels alone do not give physical dimensions.']);
  if (/jet/.test(form)) terms.push(['Propulsion description', 'A source may describe a design as jet powered. Attribute that statement to the source; a propeller that is blurred or hidden does not prove jet propulsion.']);
  if (/vertical.takeoff/.test(form)) terms.push(['Hybrid configuration', 'A design can combine fixed-wing surfaces with a reported vertical-takeoff arrangement. A static picture alone does not demonstrate a flight mode.']);
  if (!terms.length) terms.push(['Wing and tail', 'The main wing and tail surfaces are different structural elements. Describe only what the view resolves; an obscured tail is not evidence that no tail exists.']);
  terms.push(['Viewpoint', 'Plan, side, and oblique views reveal different surfaces. A source caption and a visible feature are separate kinds of information.']);
  return terms;
}

export function cancelPhotoRequest() {
  requestGeneration++;
  pendingRequest?.abort();
  pendingRequest = null;
}

function photoCard(item, index) {
  return `<figure class="photo-card">
    <div class="photo-image-wrap"><img src="${esc(item.thumbUrl)}" alt="Unreviewed Wikimedia source image: ${esc(item.title)}. Model identity is not verified." loading="lazy" decoding="async" referrerpolicy="no-referrer"><p class="image-unavailable" hidden>Image unavailable. The source page and its attribution remain linked below.</p></div>
    <figcaption>
      <p class="photo-status">Unreviewed source result · model identity not verified</p>
      <h3>${esc(item.title)}</h3>
      <p class="photo-caption"><strong>Source description (plain-text excerpt):</strong> ${esc(item.caption || 'No description supplied in the returned metadata.')}</p>
      <dl class="photo-metadata"><dt>Creator, as credited by Commons</dt><dd>${esc(item.creator)}</dd><dt>Date stated in metadata</dt><dd>${esc(item.dateText || 'Not supplied; do not infer a capture date from the upload date.')}</dd><dt>Reuse statement from Commons</dt><dd><a href="${esc(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.licenseLabel)} <span class="sr-only">(opens in a new tab)</span></a></dd>${item.credit ? `<dt>Additional credit</dt><dd>${esc(item.credit)}</dd>` : ''}</dl>
      <p class="photo-attribution"><a href="${esc(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open original Commons file page <span class="sr-only">for result ${index + 1} (opens in a new tab)</span></a>. Thumbnail supplied by Wikimedia; shown without cropping or added annotations.</p>
    </figcaption>
  </figure>`;
}

export function renderModelStudy(requestedId) {
  cancelPhotoRequest();
  const container = document.querySelector('#model-study-content');
  const asset = catalogue.find(item => item.id === requestedId) || catalogue.find(item => item.id === 'ababil-2') || catalogue[0];
  const index = catalogue.indexOf(asset), queries = photoQueries(asset);
  const evidence = { documented: 'Established public-reference family', reported: 'Reported name / variant', uncertain: 'Uncertain naming or attribution' }[asset.evidence];
  const previous = catalogue[(index + catalogue.length - 1) % catalogue.length];
  const next = catalogue[(index + 1) % catalogue.length];
  container.innerHTML = `
    <div class="study-toolbar panel"><div class="field"><label for="study-model">Choose an atlas entry</label><select id="study-model">${catalogue.map(item => `<option value="${item.id}" ${item.id === asset.id ? 'selected' : ''}>${esc(item.name)}</option>`).join('')}</select></div><div class="source-study-nav"><a class="button secondary" href="#study/${previous.id}">← Previous entry</a><span class="small">${index + 1} / ${catalogue.length}</span><a class="button secondary" href="#study/${next.id}">Next entry →</a></div></div>
    <div class="study-header"><div class="study-intro"><p class="eyebrow">Model record · public-history study</p><h2 id="study-model-title" tabindex="-1">${esc(asset.name)}</h2><p class="lede">${esc(asset.summary)}</p><span class="badge ${asset.evidence}">${esc(evidence)}</span> <span class="badge">${esc(asset.category)}</span></div></div>
    <div class="study-grid"><article class="panel"><h3>The record and its limits</h3><dl class="design-vocabulary"><dt>Broad design description in this course</dt><dd>${esc(asset.form)}</dd><dt>Names and aliases</dt><dd>${esc(asset.aliases.join(' · ') || 'No additional alias listed.')}</dd></dl><p>${esc(asset.evidenceNote)}</p><details><summary>Read the existing atlas description</summary>${list(asset.cues)}<h4>Confusions and limits</h4>${list(asset.confusions)}</details></article><article class="panel"><h3>Understand the design vocabulary</h3><dl class="design-vocabulary">${designVocabulary(asset).map(([term, definition]) => `<dt>${esc(term)}</dt><dd>${esc(definition)}</dd>`).join('')}</dl><a href="#lessons/recognition">Study airframe vocabulary and photographic perspective →</a></article></div>
    <article class="photo-study panel"><div class="section-heading"><div><p class="eyebrow">Open-source image archive</p><h2>Read the picture and its source together</h2></div></div><p>Search Wikimedia Commons for public images associated with this name. Results may show photographs, exhibits, drawings, parts, unrelated objects, or a different variant. A keyword match is not a verified model photograph.</p><div class="photo-consent notice"><strong>Optional external image search</strong><p>Loading sends the selected public search term and normal connection information to Wikimedia. Thumbnails then load from Wikimedia. Your course progress and practice notes are not sent. External access is required; this build environment could not test the live service.</p></div><div class="toolbar"><div class="field"><label for="photo-query">Name to research</label><select id="photo-query">${queries.map(query => `<option value="${esc(query)}">${esc(query)}</option>`).join('')}</select></div><button id="load-source-photos" class="button" type="button">Load source images</button><a id="commons-search-link" class="button secondary" href="${esc(commonsSearchUrl(queries[0]))}" target="_blank" rel="noopener noreferrer">Search on Commons <span class="sr-only">(opens in a new tab)</span></a></div><p id="photo-status" class="photo-loading" role="status">No external images have been requested.</p><div id="photo-results" class="photo-grid" aria-busy="false"></div></article>
    <article class="panel"><h3>Work through each source image</h3><div class="grid three-col"><div><p class="eyebrow">1 · Attribute</p><p>Write “the source calls this…” and retain its exact title, creator, and stated date. Distinguish a photograph from an exhibit or illustration.</p></div><div><p class="eyebrow">2 · Describe</p><p>Use broad vocabulary for visible surfaces and viewpoint. Keep the source’s caption separate from observations you can make directly.</p></div><div><p class="eyebrow">3 · Qualify</p><p>List what remains unresolved: variant, provenance, capture date, obscured surfaces, or whether the caption is accurate. A reuse license does not verify the identification.</p></div></div><p>This activity studies a public source. It is not a model-discrimination test, an operational identification qualification, or evidence of current deployment.</p><div class="toolbar"><a class="button secondary" href="#lessons/families">Learn the source-checking method</a><a class="button ghost" href="#reference">Review source limitations</a></div></article>`;

  const queryControl = container.querySelector('#photo-query');
  const button = container.querySelector('#load-source-photos');
  const status = container.querySelector('#photo-status');
  const results = container.querySelector('#photo-results');
  container.querySelector('#study-model').addEventListener('change', event => { location.hash = `study/${event.target.value}`; });
  queryControl.addEventListener('change', () => {
    cancelPhotoRequest();
    button.disabled = false;
    button.textContent = 'Load source images';
    status.textContent = 'No images requested for this name. Choose Load source images to search.';
    status.className = 'photo-loading';
    results.innerHTML = '';
    results.setAttribute('aria-busy', 'false');
    container.querySelector('#commons-search-link').href = commonsSearchUrl(queryControl.value);
  });
  button.addEventListener('click', async () => {
    cancelPhotoRequest();
    const generation = requestGeneration;
    pendingRequest = new AbortController();
    const query = queryControl.value;
    button.disabled = true;
    status.textContent = `Requesting source images for ${query}…`;
    status.className = 'photo-loading';
    results.innerHTML = '';
    results.setAttribute('aria-busy', 'true');
    try {
      const response = await loadCommonsPhotos(query, { signal: pendingRequest.signal });
      if (generation !== requestGeneration) return;
      results.innerHTML = response.items.map(photoCard).join('');
      results.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
          img.hidden = true;
          img.parentElement.querySelector('.image-unavailable').hidden = false;
        }, { once: true });
      });
      const omitted = response.skipped ? ` ${response.skipped} result(s) were omitted because their format, attribution, URL, or reuse metadata did not meet this gallery’s checks.` : '';
      status.textContent = response.items.length ? `${response.items.length} unreviewed source image(s) returned for ${query}. Retrieved ${new Date(response.retrievedAt).toLocaleString()}.${omitted} Inspect each original file page; model identity is not verified.` : `No source images meeting this gallery’s attribution and format checks were returned for ${query}.${omitted} The Commons search link remains available. No photograph is substituted from another model.`;
    } catch (error) {
      if (generation !== requestGeneration || error.name === 'AbortError') return;
      status.className = 'photo-error';
      status.textContent = `Images could not be loaded. ${error.message} Use the Commons search link to inspect the archive directly. No model photograph has been verified.`;
    } finally {
      if (generation === requestGeneration) {
        pendingRequest = null;
        button.disabled = false;
        button.textContent = 'Search again';
        results.setAttribute('aria-busy', 'false');
      }
    }
  });
  return asset.id;
}
