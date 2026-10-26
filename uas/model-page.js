import { bindPhotoPanel } from './photo-ui.js';

const cancel = bindPhotoPanel(document);
window.addEventListener('pagehide', cancel);
document.documentElement.dataset.photoEnhancement = 'ready';
