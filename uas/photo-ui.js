import { commonsSearchUrl, loadCommonsPhotos } from './photos.js';

export const escapePhotoText = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const esc = escapePhotoText;

export function sourceImageCard(item, compact = false) {
  return `<figure class="${compact ? 'atlas-source-photo' : 'photo-card'}"><div class="${compact ? 'atlas-photo-frame' : 'photo-image-wrap'}"><img src="${esc(item.thumbUrl)}" alt="Source image titled ${esc(item.title)}; model attribution is unreviewed." loading="lazy" decoding="async" referrerpolicy="no-referrer"><p class="image-unavailable" hidden>The image could not load. Open its original source below.</p></div><figcaption class="${compact ? 'atlas-photo-caption' : ''}"><p class="photo-status">Source image · model attribution unreviewed</p><h3>${esc(item.title)}</h3><p><strong>Source description:</strong> ${esc(item.caption)}</p><p><strong>Creator:</strong> ${esc(item.creator)}</p>${item.credit ? `<p><strong>Credit:</strong> ${esc(item.credit)}</p>` : ''}<p><strong>Date stated by source:</strong> ${esc(item.dateText)}</p><p><a href="${esc(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.licenseLabel)}</a> · <a href="${esc(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original file and full metadata</a></p><p class="small muted">Commons thumbnail, displayed without cropping or annotations. Descriptions are plain-text excerpts; the source’s identification and reuse statement have not been independently verified here.</p></figcaption></figure>`;
}

export function handleImageFailures(container) {
  container.querySelectorAll('img').forEach(image => {
    const fail = () => {
      image.hidden = true;
      const message = image.parentElement.querySelector('.image-unavailable');
      if (message) message.hidden = false;
    };
    image.addEventListener('error', fail, { once: true });
    if (image.complete && image.naturalWidth === 0) fail();
  });
}

/** Enhance existing static HTML; the record and source links never depend on JS. */
export function bindPhotoPanel(panel) {
  const query = panel.querySelector('#photo-query');
  const button = panel.querySelector('#load-source-photos');
  const sourceLink = panel.querySelector('#commons-search-link');
  const status = panel.querySelector('#photo-status');
  const results = panel.querySelector('#photo-results');
  if (!query || !button || !sourceLink || !status || !results) return () => {};
  let controller = null;
  let generation = 0;
  const cancel = () => {
    const wasLoading = controller !== null;
    generation++;
    controller?.abort();
    controller = null;
    button.disabled = false;
    results.setAttribute('aria-busy', 'false');
    if (wasLoading) {
      button.textContent = 'Load source images';
      status.className = 'photo-loading';
      status.textContent = 'Image search stopped. You can load it again; the model record and source links remain available.';
    }
  };
  const update = () => {
    cancel();
    sourceLink.href = commonsSearchUrl(query.value);
    button.disabled = false;
    button.textContent = 'Load source images';
    status.className = 'photo-loading';
    status.textContent = 'The model page is ready. Images are optional and load from Wikimedia only when requested.';
    results.innerHTML = '';
    results.setAttribute('aria-busy', 'false');
  };
  query.addEventListener('change', update);
  button.addEventListener('click', async () => {
    cancel();
    const current = generation;
    controller = new AbortController();
    button.disabled = true;
    status.className = 'photo-loading';
    status.textContent = `Looking for source images associated with ${query.value}…`;
    results.innerHTML = '';
    results.setAttribute('aria-busy', 'true');
    try {
      const response = await loadCommonsPhotos(query.value, { signal: controller.signal });
      if (current !== generation) return;
      results.innerHTML = response.items.map(item => sourceImageCard(item)).join('');
      handleImageFailures(results);
      status.textContent = response.items.length
        ? `${response.items.length} source image(s) returned. Model identity is unreviewed; inspect the original captions and file pages. ${response.skipped} result(s) omitted by format, URL, or attribution checks.`
        : 'No images meeting the format and attribution checks were returned. Use the direct Commons links below. No photograph of a different model has been substituted.';
    } catch (error) {
      if (current !== generation || error.name === 'AbortError') return;
      status.className = 'photo-error';
      status.textContent = `Images could not be loaded. ${error.message} The model page and direct source links remain available.`;
    } finally {
      if (current === generation) {
        controller = null;
        button.disabled = false;
        button.textContent = 'Search again';
        results.setAttribute('aria-busy', 'false');
      }
    }
  });
  update();
  return cancel;
}
