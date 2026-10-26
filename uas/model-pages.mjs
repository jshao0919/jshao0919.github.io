/** Static public-source study pages. Generated content works without scripts. */
import { designVocabulary } from './model-study.js';
import { photoQueries, commonsSearchUrl } from './photos.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const list = values => `<ul>${values.map(value => `<li>${escape(value)}</li>`).join('')}</ul>`;
const evidenceNames = { documented: 'Established public-reference family', reported: 'Reported name / variant', uncertain: 'Uncertain naming or attribution' };

function page({ title, description, body, modelId = null, enhancementScript = '../model-page.js' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${escape(description)}">
<meta name="theme-color" content="#12383d">
<title>${escape(title)} · UAS Fieldnotes</title>
<link rel="icon" href="../icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../course.css">
${modelId ? `<script type="module" src="${escape(enhancementScript)}"></script>` : ''}
</head>
<body class="model-page"${modelId ? ` data-model-id="${escape(modelId)}"` : ''}>
<a class="skip-link" href="#main">Skip to model study</a>
<header class="site-header">
<a class="brand" href="../index.html"><span class="brand-mark" aria-hidden="true">U</span><span>UAS FIELDNOTES<small>A Mathjock learning course</small></span></a>
<nav class="header-actions" aria-label="Site links"><a href="../../">Mathjock home</a><a class="button secondary" href="../workbook.html">Print workbook</a></nav>
</header>
<main id="main" class="model-page-content" tabindex="-1">
${body}
<footer><p>Mathjock · UAS Fieldnotes · Public-information learning edition</p><p><a href="index.html">All model study pages</a> · <a href="../index.html#atlas">Interactive atlas</a> · <a href="../workbook.html#photo-study">Source-study worksheet</a> · <a href="../README.md">Scope and maintenance notes</a></p><p>Public-source study, not an operational identification manual or a current inventory.</p></footer>
</main>
</body>
</html>
`;
}

function modelPage(asset, index, catalogue, sourcesById, enhancementScript) {
  const previous = catalogue[(index + catalogue.length - 1) % catalogue.length];
  const next = catalogue[(index + 1) % catalogue.length];
  const queries = photoQueries(asset);
  const sources = asset.sourceIds.map(id => sourcesById.get(id));
  const navigation = `<nav class="source-study-nav toolbar" aria-label="Model pages"><a class="button secondary" href="${previous.id}.html">← Previous: ${escape(previous.name)}</a><a class="button ghost" href="index.html">All ${catalogue.length} entries</a><a class="button secondary" href="${next.id}.html">Next: ${escape(next.name)} →</a></nav>`;
  const body = `${navigation}
<header class="study-header"><div class="study-intro"><p class="eyebrow">Model record ${index + 1} / ${catalogue.length} · Public-history study</p><h1 id="study-model-title">${escape(asset.name)}</h1><div class="toolbar"><a class="button secondary" href="#photos-heading">Photo sources</a><a class="button ghost" href="#record-heading">Model description</a></div><p class="lede">${escape(asset.summary)}</p><p><span class="badge ${escape(asset.evidence)}">${escape(evidenceNames[asset.evidence])}</span> <span class="badge">${escape(asset.category)}</span></p></div></header>
<div class="study-grid">
<article class="panel"><h2 id="record-heading">The record and its limits</h2><dl class="design-vocabulary"><dt>Broad design description</dt><dd>${escape(asset.form)}</dd><dt>Names and aliases</dt><dd>${escape(asset.aliases.length ? asset.aliases.join(' · ') : 'No additional alias listed.')}</dd></dl><p>${escape(asset.evidenceNote)}</p><h3>Description cues</h3>${list(asset.cues)}<h3>Confusions and limits</h3>${list(asset.confusions)}</article>
<article class="panel"><h2>Understand the design vocabulary</h2><dl class="design-vocabulary">${designVocabulary(asset).map(([term, definition]) => `<dt>${escape(term)}</dt><dd>${escape(definition)}</dd>`).join('')}</dl><p>These terms describe broad structures. They do not authenticate a model label, origin, operator, or current use.</p><a href="../workbook.html#lesson-recognition">Read the airframe-vocabulary lesson</a></article>
</div>
<article class="photo-study panel" aria-labelledby="photos-heading"><p class="eyebrow">Open-source image archive</p><h2 id="photos-heading">Read the picture and its source together</h2><p>Search Wikimedia Commons for public images associated with this name. Results can include photographs, exhibits, drawings, parts, unrelated objects, or another variant. A keyword match is not a verified model photograph.</p><div class="photo-consent notice"><strong>Optional external image search</strong><p>Loading sends the selected public search term and normal connection information to Wikimedia. Thumbnails then load from Wikimedia. Your course progress and practice notes are not sent. External access is required; this build environment could not test the live service.</p></div>
<div class="toolbar"><div class="field"><label for="photo-query">Name for optional image loading</label><select id="photo-query">${queries.map(query => `<option value="${escape(query)}">${escape(query)}</option>`).join('')}</select></div><button id="load-source-photos" class="button" type="button" disabled>Load source images</button><a id="commons-search-link" class="button secondary" href="${escape(commonsSearchUrl(queries[0]))}" target="_blank" rel="noopener noreferrer">Search ${escape(queries[0])} on Commons <span class="sr-only">(opens in a new tab)</span></a></div>
<p id="photo-status" class="photo-loading" role="status">The model record is available. If image loading is unavailable, use the direct source links below.</p><div id="photo-results" class="photo-grid" aria-busy="false"></div>
<div class="static-source-links"><h3>Direct source searches</h3><p>These ordinary links work without the optional gallery. Open the original file pages to inspect captions, credits, dates, and reuse terms.</p><ul>${queries.map(query => `<li><a href="${escape(commonsSearchUrl(query))}" target="_blank" rel="noopener noreferrer">Search Commons for ${escape(query)} <span class="sr-only">(opens in a new tab)</span></a></li>`).join('')}</ul></div>
<noscript><p class="notice">The model record and all source links are available without JavaScript. The optional inline image gallery needs JavaScript; use the direct source searches above.</p></noscript>
</article>
<article class="panel"><h2>Work through a public source</h2><div class="grid three-col"><div><p class="eyebrow">1 · Attribute</p><p>Write “the source calls this…” and retain the original title, creator, and stated date. Distinguish a photograph from an exhibit, drawing, or illustration.</p></div><div><p class="eyebrow">2 · Describe</p><p>Use broad vocabulary for visible structures and viewpoint. Keep the caption’s claim separate from observations supported by the image.</p></div><div><p class="eyebrow">3 · Qualify</p><p>List unresolved attribution, variant, capture date, provenance, or obscured surfaces. A reuse license does not verify the aircraft label.</p></div></div><p>This activity studies an archived public source. It is not a model-discrimination drill, an operational qualification, or evidence of current deployment.</p><div class="toolbar"><a class="button secondary" href="../workbook.html#photo-study">Open the source-study worksheet</a><a class="button ghost" href="../workbook.html#lesson-families">Read the family-history lesson</a></div></article>
<section aria-labelledby="reading-heading"><h2 id="reading-heading">Background reading and limitations</h2><p>External references were not retrieved in the build environment. These are background or discovery leads, not fresh claim-level verification. A catalogue entry or source label does not establish a complete or current inventory.</p><div class="source-list">${sources.map(source => `<article class="source-card"><p class="eyebrow">${escape(source.publisher)} · ${escape(source.date)}</p><h3><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)} <span class="sr-only">(opens in a new tab)</span></a></h3><p>${escape(source.scope)}</p><p class="small muted">${escape(source.accessNote)}</p></article>`).join('')}</div></section>
${navigation}`;
  return page({ title: `${asset.name} · Public-source study`, description: `${asset.name}: broad design vocabulary, naming limits, and links for reading public image sources.`, body, modelId: asset.id, enhancementScript });
}

/** Returns 32 complete records plus a directory; it performs no filesystem I/O. */
export function getStandalonePages({ catalogue, sources, enhancementScript = '../model-page.js' }) {
  const sourcesById = new Map(sources.map(source => [source.id, source]));
  const pages = new Map();
  const body = `<p class="eyebrow">Static model-study directory</p><h1>Study the model and its sources</h1><p class="lede">${catalogue.length} complete public-reference records, with design vocabulary and direct image-source links. Every page opens independently and can be read without JavaScript.</p><div class="callout"><h2>Start with a public source</h2><p>Read what the source calls an object, describe broad visible structures, and retain what remains unknown. The entries cover historical families, reported names, and uncertain regional associations; they are not a complete or current inventory.</p><p>Optional image search is available on each record when scripts and network access are available. Returned images are unreviewed archive results, not a verified aircraft-photo collection. Direct Commons search links remain available without the gallery.</p></div><div class="toolbar"><a class="button secondary" href="../workbook.html#lesson-foundations">Read the first lesson</a><a class="button ghost" href="../index.html#atlas">Open the interactive atlas</a></div><section class="module-grid model-directory" aria-label="All model study pages">${catalogue.map((asset, index) => `<a class="module-card" href="${asset.id}.html"><span class="module-number">${String(index + 1).padStart(2, '0')}</span><span class="badge ${escape(asset.evidence)}">${escape(evidenceNames[asset.evidence])}</span><h2>${escape(asset.name)}</h2><p>${escape(asset.summary)}</p><p class="small"><strong>Broad form:</strong> ${escape(asset.form)}</p><span class="small">Open complete study page →</span></a>`).join('')}</section>`;
  pages.set('models/index.html', page({ title: 'Model study directory', description: 'Complete static public-source model study pages with design vocabulary, source limitations, and image research links.', body }));
  for (const [index, asset] of catalogue.entries()) pages.set(`models/${asset.id}.html`, modelPage(asset, index, catalogue, sourcesById, enhancementScript));
  return pages;
}
