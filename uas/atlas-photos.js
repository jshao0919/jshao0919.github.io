import { photoQueries, commonsSearchUrl, loadCommonsPhotos } from './photos.js';
import { escapePhotoText as esc, sourceImageCard, handleImageFailures } from './photo-ui.js';

const cached = new Map();
const pending = new Map();

export function atlasPhotoPanel(asset, genericIcon) {
  const query = photoQueries(asset)[0];
  const prior = cached.get(asset.id);
  return `<div class="atlas-photo" data-atlas-photo="${asset.id}"><div class="atlas-photo-content">${prior ? sourceImageCard(prior, true) : `<div class="asset-icon">${genericIcon}<span class="small muted">Generic form icon · no photograph loaded</span></div>`}</div><div class="atlas-photo-actions"><button class="button secondary" type="button" data-load-atlas-photo="${asset.id}">${prior ? 'Refresh source image' : 'Load source image'}</button><a class="small" href="${esc(commonsSearchUrl(query))}" target="_blank" rel="noopener noreferrer">Image source search</a></div><p class="small atlas-photo-status" role="status">${prior ? 'Source result retained for this browser session; model attribution remains unreviewed.' : 'Optional Wikimedia search. Its result is not a verified model photograph.'}</p></div>`;
}

export function cancelAtlasPhotos() {
  for (const controller of pending.values()) controller.abort();
  pending.clear();
}

export function attachAtlasPhotos(grid, catalogue) {
  handleImageFailures(grid);
  grid.querySelectorAll('[data-load-atlas-photo]').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.loadAtlasPhoto;
      const asset = catalogue.find(record => record.id === id);
      if (!asset || pending.has(id)) return;
      const panel = button.closest('.atlas-photo');
      const status = panel.querySelector('.atlas-photo-status');
      const content = panel.querySelector('.atlas-photo-content');
      const controller = new AbortController();
      pending.set(id, controller);
      button.disabled = true;
      status.className = 'small atlas-photo-status';
      status.textContent = 'Loading a Commons source result for this entry…';
      try {
        const response = await loadCommonsPhotos(photoQueries(asset)[0], { signal: controller.signal });
        if (controller.signal.aborted) return;
        const item = response.items[0];
        if (item) {
          cached.set(id, item);
          content.innerHTML = sourceImageCard(item, true);
          handleImageFailures(content);
          status.textContent = 'The source image and its attribution are shown here. The model identification is a source claim, not a verified result.';
          button.textContent = 'Refresh source image';
        } else {
          status.textContent = 'No source image meeting the format and attribution checks was returned. The source search and model page remain available.';
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        status.className = 'small atlas-photo-status photo-error';
        status.textContent = `Source image unavailable. ${error.message} Use the source link or try again later.`;
      } finally {
        if (pending.get(id) === controller) pending.delete(id);
        if (controller.signal.aborted) status.textContent = 'Image request stopped. Choose Load source image to try again.';
        button.disabled = false;
      }
    });
  });
}
