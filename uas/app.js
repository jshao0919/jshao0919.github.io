import { lessons } from './lessons.js';
import { catalogue } from './catalogue.js';
import { quizQuestions } from './quiz.js';
import { makeCfarScene, cfar, fuseEvidence } from './lab-core.js';
import { coreSources, glossary } from './sources.js';
import { catalogueSources } from './catalogue-sources.js';
import { renderModelStudy, cancelPhotoRequest } from './model-study.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const list = values => `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>`;
const paragraphs = values => values.map(value => `<p>${esc(value)}</p>`).join('');
const sources = [...coreSources, ...catalogueSources];
const sourceById = new Map(sources.map(source => [source.id, source]));
const storageKey = 'mathjock.uas.progress.v1';
let progress = { completed: [], assessment: null, assessmentRevision: 2 };
let selectedLesson = lessons[0].id;
let compared = [];
let noiseSeed = 7;
let quiz = null;

function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (!data || !Array.isArray(data.completed)) return;
    progress.assessmentRevision = data.assessmentRevision === 2 ? 2 : 1;
    progress.completed = [...new Set(data.completed.filter(id => lessons.some(lesson => lesson.id === id)))];
    const a = data.assessment;
    if (a && Number.isInteger(a.correct) && Number.isInteger(a.total) && a.total === quizQuestions.length && a.correct >= 0 && a.correct <= a.total) {
      progress.assessment = { correct: a.correct, total: a.total };
    }
  } catch {
    $('#storage-status').textContent = 'Saved progress could not be read. You can still use the course in this session.';
  }
}

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
    $('#storage-status').textContent = '';
  } catch {
    $('#storage-status').textContent = 'Browser storage is unavailable. Progress is kept only until this page closes.';
  }
  renderProgress();
}

function renderProgress() {
  $('#course-progress').max = lessons.length;
  $('#course-progress').value = progress.completed.length;
  $('#progress-label').textContent = `${progress.completed.length} of ${lessons.length} lessons completed`;
  const a = progress.assessment;
  $('#assessment-label').textContent = a ? `${progress.assessmentRevision === 2 ? 'Last full assessment' : 'Earlier edition assessment'}: ${a.correct}/${a.total} (${Math.round(a.correct / a.total * 100)}%).${progress.assessmentRevision === 2 ? '' : ' Retake to review the updated photo lessons.'}` : 'Assessment not yet attempted.';
  renderModuleGrid();
  renderLessonMenu();
}

function readingLinks(ids = []) {
  const found = ids.map(id => sourceById.get(id)).filter(Boolean);
  return found.length ? `<p class="small muted">Background reading: ${found.map(source => `<a href="#reference/${source.id}">${esc(source.title)}</a>`).join('; ')}. See the reference section for source limitations.</p>` : '';
}

function renderModuleGrid() {
  $('#module-grid').innerHTML = lessons.map((lesson, index) => `<a class="module-card" href="#lessons/${lesson.id}"><span class="module-number">${String(index + 1).padStart(2, '0')}</span><span class="badge ${progress.completed.includes(lesson.id) ? 'documented' : ''}">${progress.completed.includes(lesson.id) ? 'Read' : esc(lesson.duration)}</span><h3>${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><span class="small">Open lesson →</span></a>`).join('');
}

function renderLessonMenu() {
  $('#lesson-menu').innerHTML = lessons.map((lesson, index) => `<a class="lesson-link ${lesson.id === selectedLesson ? 'active' : ''}" href="#lessons/${lesson.id}" ${lesson.id === selectedLesson ? 'aria-current="page"' : ''}><span>${String(index + 1).padStart(2, '0')} · ${esc(lesson.title)}</span>${progress.completed.includes(lesson.id) ? '<span class="badge documented">Read</span>' : ''}</a>`).join('');
}

function renderLesson(id) {
  const lesson = lessons.find(item => item.id === id) || lessons[0];
  selectedLesson = lesson.id;
  const index = lessons.indexOf(lesson);
  renderLessonMenu();
  $('#lesson-content').innerHTML = `<p class="eyebrow">Lesson ${index + 1} / ${lessons.length} · ${esc(lesson.kicker)}</p><h2 id="current-lesson-title" tabindex="-1">${esc(lesson.title)}</h2><p class="lede">${esc(lesson.summary)}</p><div class="objectives"><h3>By the end, you can…</h3>${list(lesson.objectives)}</div>${lesson.sections.map(section => `<section class="lesson-section"><h3>${esc(section.heading)}</h3>${paragraphs(section.body)}${section.bullets ? list(section.bullets) : ''}</section>`).join('')}<div class="callout"><h3>Keep these ideas</h3>${list(lesson.takeaways)}</div>${readingLinks(lesson.sourceIds)}<div class="toolbar"><button id="complete-lesson" class="button" type="button" aria-pressed="${progress.completed.includes(lesson.id)}">${progress.completed.includes(lesson.id) ? 'Marked complete ✓' : 'Mark lesson complete'}</button><button id="practice-lesson" class="button secondary" type="button">Practice this lesson</button>${index + 1 < lessons.length ? `<a class="button ghost" href="#lessons/${lessons[index + 1].id}">Next lesson →</a>` : '<a class="button ghost" href="#practice">Full assessment →</a>'}</div>`;
  $('#complete-lesson').addEventListener('click', event => {
    const already = progress.completed.includes(lesson.id);
    progress.completed = already ? progress.completed.filter(item => item !== lesson.id) : [...progress.completed, lesson.id];
    saveProgress();
    event.currentTarget.textContent = already ? 'Mark lesson complete' : 'Marked complete ✓';
    event.currentTarget.setAttribute('aria-pressed', String(!already));
  });
  $('#practice-lesson').addEventListener('click', () => {
    $('#quiz-module').value = lesson.id;
    location.hash = 'practice';
    startQuiz();
  });
}

function route(focus = true) {
  const [requested, lessonId] = location.hash.slice(1).split('/');
  const allowed = ['overview', 'lessons', 'atlas', 'study', 'cfar', 'network', 'practice', 'reference'];
  const view = allowed.includes(requested) ? requested : 'overview';
  $$('.view').forEach(element => { element.hidden = element.dataset.view !== view; });
  $$('.nav-link').forEach(link => {
    const active = link.hash === `#${view}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  if (view === 'lessons') renderLesson(lessonId || selectedLesson);
  if (view === 'study') renderModelStudy(lessonId); else cancelPhotoRequest();
  document.title = `${({ overview: 'Start here', lessons: 'Guided course', atlas: 'Recognition atlas', study: 'Model & photo study', cfar: 'CFAR laboratory', network: 'Sensor networks', practice: 'Knowledge checks', reference: 'Reference & protocols' })[view]} · UAS Fieldnotes`;
  if (focus) {
    const target = view === 'study' ? $('#study-model-title') : view === 'lessons' && lessonId ? $('#current-lesson-title') : view === 'reference' && sourceById.has(lessonId) ? $(`#source-${lessonId} h3`) : $(`[data-view="${view}"] h1`);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
}

const evidenceNames = { documented: 'Documented family', reported: 'Reported name / variant', uncertain: 'Uncertain attribution' };
function formIcon(form) {
  const lower = form.toLowerCase();
  if (/unresolved|unverified|not asserted|not established|uncertain|variant-dependent|no single form|provenance/.test(lower)) return '<svg viewBox="0 0 160 120" aria-hidden="true"><rect x="32" y="12" width="96" height="96" rx="14" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 6"/><text x="80" y="82" text-anchor="middle" fill="currentColor" font-size="64">?</text></svg>';
  let shape = '<path d="M80 12V104M80 39L20 69H140L80 39M80 86L49 101H111L80 86"/>';
  if (/delta|flying.wing/.test(lower)) shape = '<path d="M80 14L18 104L80 85L142 104Z"/><path d="M80 14V85"/>';
  else if (/canard/.test(lower)) shape = '<path d="M80 12V104M80 32H51M80 32H109M80 66L20 94H140L80 66"/>';
  else if (/twin.boom/.test(lower)) shape = '<path d="M80 17V91M15 47H145M46 47V104H114V47M80 31L71 82H89Z"/>';
  else if (/rotor|helicopter/.test(lower)) shape = '<ellipse cx="80" cy="60" rx="19" ry="29"/><path d="M80 11V108M29 60H131"/>';
  return `<svg viewBox="0 0 160 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">${shape}</svg>`;
}

function assetDetails(asset) {
  return `<p><span class="badge ${esc(asset.evidence)}">${esc(evidenceNames[asset.evidence])}</span> <span class="badge">${esc(asset.category)}</span></p><p>${esc(asset.summary)}</p><dl><dt>Broad form</dt><dd>${esc(asset.form)}</dd><dt>Names and aliases</dt><dd>${esc(asset.aliases.length ? asset.aliases.join(' · ') : 'No additional alias listed')}</dd></dl><h3>Description cues</h3>${list(asset.cues)}<h3>Confusions and limits</h3>${list(asset.confusions)}<div class="callout"><strong>Evidence note</strong><p>${esc(asset.evidenceNote)}</p></div>${readingLinks(asset.sourceIds)}<a class="button" href="#study/${asset.id}">Open model &amp; photo study</a>`;
}

function renderAtlas() {
  const query = $('#atlas-search').value.trim().toLowerCase();
  const category = $('#atlas-category').value;
  const evidence = $('#atlas-evidence').value;
  const visible = catalogue.filter(asset => (category === 'all' || asset.category === category) && (evidence === 'all' || asset.evidence === evidence) && [asset.name, ...asset.aliases, asset.form, asset.summary, ...asset.cues].join(' ').toLowerCase().includes(query));
  $('#filter-summary').textContent = `${visible.length} of ${catalogue.length} entries shown. Select up to two to compare.`;
  $('#atlas-grid').innerHTML = visible.length ? visible.map(asset => `<article class="asset-card"><div class="asset-icon">${formIcon(asset.form)}<span class="small muted">Generic form icon</span></div><div class="asset-details"><span class="badge ${esc(asset.evidence)}">${esc(evidenceNames[asset.evidence])}</span><h2>${esc(asset.name)}</h2><p class="small muted">${esc(asset.category)}</p><p>${esc(asset.summary)}</p><p><a class="button" href="#study/${asset.id}">Model &amp; photo study<span class="sr-only">: ${esc(asset.name)}</span></a></p><div class="toolbar"><button class="button secondary" type="button" data-open="${asset.id}">Read entry<span class="sr-only">: ${esc(asset.name)}</span></button><label class="small"><input type="checkbox" data-compare="${asset.id}" ${compared.includes(asset.id) ? 'checked' : ''} ${compared.length === 2 && !compared.includes(asset.id) ? 'disabled' : ''}> Compare<span class="sr-only"> ${esc(asset.name)}</span></label></div></div></article>`).join('') : '<p class="empty-state">No entries match these filters. Try another name or choose all categories.</p>';
}

function renderCompare() {
  $('#compare-panel').hidden = compared.length === 0;
  $('#compare-content').innerHTML = compared.map(id => catalogue.find(asset => asset.id === id)).map(asset => `<article><h3>${esc(asset.name)}</h3><p><strong>Form:</strong> ${esc(asset.form)}</p><p><strong>Limits:</strong> ${esc(asset.confusions.join(' '))}</p><p class="small">${esc(asset.evidenceNote)}</p></article>`).join('');
}

function renderCfar() {
  const training = Number($('#cfar-training').value), guard = Number($('#cfar-guard').value), pfa = Number($('#cfar-pfa').value), strength = Number($('#cfar-strength').value);
  $('#training-value').value = training; $('#guard-value').value = guard; $('#strength-value').value = strength;
  const mode = $('#cfar-mode').value === 'nearby-targets' ? 'multiple' : $('#cfar-mode').value;
  const scene = makeCfarScene({ seed: noiseSeed, mode, targetStrength: strength });
  const result = cfar({ samples: scene.samples, training, guard, pfa });
  const cellControl = $('#cfar-cell');
  cellControl.min = training + guard; cellControl.max = scene.samples.length - training - guard - 1;
  const selected = Number(cellControl.value);
  $('#cell-value').value = selected;
  const width = 730, height = 240, left = 52, top = 24, bottom = top + height;
  const max = Math.max(...scene.samples, ...result.thresholds.filter(value => value !== null)) * 1.12;
  const x = i => left + i / (scene.samples.length - 1) * width;
  const y = value => bottom - value / max * height;
  const points = scene.samples.map((value, i) => `${x(i)},${y(value)}`).join(' ');
  const thresholdPoints = result.thresholds.map((value, i) => value === null ? null : `${x(i)},${y(value)}`).filter(Boolean).join(' ');
  const windowRects = scene.samples.map((_, i) => {
    const offset = Math.abs(i - selected);
    if (offset > training + guard) return '';
    const fill = offset === 0 ? '#b8d8ed' : offset <= guard ? '#fff0cc' : '#dceee7';
    return `<rect x="${x(i) - width / 190}" y="${top}" width="${width / 95}" height="${height}" fill="${fill}"/>`;
  }).join('');
  const crossings = result.detections.filter(Boolean).length;
  const tested = result.thresholds.filter(value => value !== null).length;
  const injectedDetected = scene.targets.filter(i => result.detections[i]).length;
  const noiseCrossings = result.detections.filter((detected, i) => detected && !scene.targets.includes(i)).length;
  $('#cfar-chart').innerHTML = `<title id="cfar-chart-title">Synthetic CFAR detection plot</title><desc id="cfar-chart-description">${crossings} threshold crossings in ${tested} evaluated cells. ${injectedDetected} of ${scene.targets.length} injected peaks crossed the threshold. Cell ${selected} is highlighted.</desc>${windowRects}${Array.from({ length: 5 }, (_, i) => { const value = max * i / 4; return `<line x1="${left}" y1="${y(value)}" x2="${left + width}" y2="${y(value)}" stroke="#d2dcdf"/><text x="${left - 7}" y="${y(value) + 4}" text-anchor="end" font-size="12">${value.toFixed(0)}</text>`; }).join('')}<polyline points="${points}" fill="none" stroke="#142f45" stroke-width="1.8"/><polyline points="${thresholdPoints}" fill="none" stroke="#b34931" stroke-width="2.3"/>${result.detections.map((detected, i) => detected ? `<circle cx="${x(i)}" cy="${y(scene.samples[i])}" r="4" fill="#116d6c" stroke="white"/>` : '').join('')}${scene.targets.map(i => `<path d="M ${x(i)-4} ${bottom+5} l 8 0 l -4 7 Z" fill="#b34931"/>`).join('')}<line x1="${left}" y1="${bottom}" x2="${left+width}" y2="${bottom}" stroke="#516575"/>${[0, 24, 48, 72, 95].map(i => `<text x="${x(i)}" y="${bottom + 27}" text-anchor="middle" font-size="12">${i}</text>`).join('')}<text x="420" y="318" text-anchor="middle" font-size="13">Sample index (no distance units)</text><text x="${left}" y="15" font-size="12">Normalized power</text>`;
  $('#cfar-metrics').innerHTML = `<div class="metric"><strong>${result.alpha.toFixed(3)}</strong><span>threshold multiplier α</span></div><div class="metric"><strong>${result.referenceCount}</strong><span>total reference cells</span></div><div class="metric"><strong>${crossings}</strong><span>threshold crossings</span></div>`;
  $('#cfar-summary').textContent = `${tested} cells evaluated; ${96-tested} edge cells have incomplete windows and no decision. ${injectedDetected}/${scene.targets.length} injected peaks crossed; ${noiseCrossings} other crossings. Below-axis triangles mark injected peaks. Window shading: blue = test cell, gold = guards, green = references.`;
  const mean = result.thresholds[selected] / result.alpha;
  $('#cell-calculation').textContent = `Cell ${selected}: power ${scene.samples[selected].toFixed(3)}. Mean of ${result.referenceCount} reference powers = ${mean.toFixed(3)}. Threshold = ${result.alpha.toFixed(3)} × ${mean.toFixed(3)} = ${result.thresholds[selected].toFixed(3)}. ${result.detections[selected] ? 'The sample exceeds the threshold: a candidate detection.' : 'The sample does not exceed the threshold.'} Rounded numbers are shown; the comparison uses full precision.`;
}

const sensors = [
  { id: 'radar', name: 'Radar', contribution: 'Measurements of reflected radio energy can support estimates of motion and location. A return is not a model identification.', limitation: 'Background returns, geometry, propagation, and processing assumptions affect interpretation.' },
  { id: 'eo', name: 'EO / IR', contribution: 'Images and thermal patterns can add visual context to an associated observation.', limitation: 'Occlusion, atmosphere, resolution, lighting, and viewpoint limit what an image can establish.' },
  { id: 'rf', name: 'Passive RF', contribution: 'Observed radio emissions may add evidence about a signal source.', limitation: 'A signal need not come from an aircraft; an aircraft need not emit a signal observable by this sensor.' },
  { id: 'acoustic', name: 'Acoustic', contribution: 'Sound measurements can add another observation when interpreted with their environment.', limitation: 'Other sound sources and environmental conditions can produce ambiguity.' },
];
function renderNetwork() {
  const selected = sensors.filter(sensor => $(`#sensor-${sensor.id}`).checked);
  $('#sensor-explanation').innerHTML = selected.length ? selected.map(sensor => `<section class="lesson-section"><h3>${sensor.name}</h3><p>${sensor.contribution}</p><p class="small muted">${sensor.limitation}</p></section>`).join('') : '<p class="empty-state">No sensor inputs are selected. No observations is not the same as evidence of absence.</p>';
  $('#network-chart').innerHTML = `<title id="network-title">Generic sensor information network</title><desc id="network-description">${selected.length} selected sensor types feed association and quality review. A human reviews uncertainty. This is an information-flow diagram, not a deployment map.</desc>${sensors.map((sensor, index) => {
    const cy = 42 + index * 85, active = selected.includes(sensor);
    return `<path d="M165 ${cy} L270 170" fill="none" stroke="${active ? '#116d6c' : '#c7d1d5'}" stroke-width="${active ? 3 : 1}" ${active ? '' : 'stroke-dasharray="5 6"'}/><rect x="8" y="${cy-24}" width="155" height="48" rx="8" fill="${active ? '#e4f2ee' : '#eef2f2'}" stroke="#a7b9bf"/><text x="85" y="${cy+5}" text-anchor="middle" font-size="16">${sensor.name}</text>`;
  }).join('')}<rect x="270" y="113" width="190" height="113" rx="12" fill="#142f45"/><text x="365" y="145" text-anchor="middle" fill="white" font-size="15">Time & provenance</text><text x="365" y="174" text-anchor="middle" fill="white" font-size="15">Association</text><text x="365" y="203" text-anchor="middle" fill="white" font-size="15">Quality & uncertainty</text><path d="M460 170H502" stroke="#116d6c" stroke-width="3"/><rect x="502" y="132" width="169" height="76" rx="12" fill="#fff0e8" stroke="#b34931"/><text x="586" y="165" text-anchor="middle" font-size="16">Human review</text><text x="586" y="189" text-anchor="middle" font-size="13">Retain uncertainty</text><text x="340" y="350" text-anchor="middle" font-size="13">Information flow only · no geographic or performance model</text>`;
}

function renderFusion() {
  const prior = Number($('#fusion-prior').value) / 100;
  const a = Number($('#fusion-a').value), b = Number($('#fusion-b').value);
  $('#prior-value').value = Math.round(prior * 100);
  const result = fuseEvidence({ prior, likelihoodRatios: [a, b], assumeIndependent: $('#fusion-independent').checked });
  $('#fusion-result').innerHTML = result.posterior === null ? `<strong>No combined probability calculated.</strong><p>${esc(result.assumption)}</p>` : `<p class="formula">Prior odds = ${prior.toFixed(2)} / ${(1-prior).toFixed(2)} = ${result.priorOdds.toFixed(3)}<br>Posterior odds = ${result.priorOdds.toFixed(3)} × ${a} × ${b} = ${result.posteriorOdds.toFixed(3)}<br>Posterior probability = odds / (1 + odds) = <strong>${(result.posterior * 100).toFixed(1)}%</strong></p><p>${esc(result.assumption)}</p><p class="small">This is a probability for the invented test-object hypothesis. It does not establish identity, intent, or authorization to respond.</p>`;
}

function startQuiz() {
  const moduleId = $('#quiz-module').value;
  const questions = quizQuestions.filter(question => moduleId === 'all' || question.moduleId === moduleId);
  quiz = { moduleId, questions, index: 0, answers: [], submitted: false };
  renderQuestion();
}
function renderQuestion() {
  const question = quiz.questions[quiz.index];
  $('#quiz-stage').innerHTML = `<p class="eyebrow">Question ${quiz.index + 1} of ${quiz.questions.length}</p><h2 id="question-heading" tabindex="-1">${esc(lessons.find(lesson => lesson.id === question.moduleId)?.title || 'Course question')}</h2><form id="answer-form"><fieldset class="question"><legend>${esc(question.prompt)}</legend><div class="answer-options">${question.options.map((option, index) => `<label class="answer-option"><input type="radio" name="answer" value="${index}" required><span>${esc(option)}</span></label>`).join('')}</div></fieldset><button class="button" type="submit">Check answer</button></form><div id="answer-feedback" class="feedback" role="status" hidden></div><button id="next-question" class="button secondary" type="button" hidden>${quiz.index + 1 === quiz.questions.length ? 'See results' : 'Next question →'}</button>`;
  $('#question-heading').focus({ preventScroll: true });
  $('#answer-form').addEventListener('submit', event => {
    event.preventDefault();
    if (quiz.submitted) return;
    const checked = $('#answer-form input:checked');
    if (!checked) return;
    const answer = Number(checked.value), correct = answer === question.answer;
    quiz.answers.push(answer); quiz.submitted = true;
    $$('#answer-form input').forEach(input => {
      input.disabled = true;
      if (Number(input.value) === question.answer) input.parentElement.classList.add('correct');
      else if (input.checked) input.parentElement.classList.add('incorrect');
    });
    $('#answer-form button').hidden = true;
    const feedback = $('#answer-feedback');
    feedback.hidden = false; feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `<strong>${correct ? 'Correct.' : 'Review this idea.'}</strong><p>Best answer: ${esc(question.options[question.answer])}</p><p>${esc(question.explanation)}</p>`;
    $('#next-question').hidden = false; $('#next-question').focus({ preventScroll: true });
  });
  $('#next-question').addEventListener('click', () => {
    if (!quiz.submitted) return;
    quiz.index++; quiz.submitted = false;
    if (quiz.index === quiz.questions.length) renderResults(); else renderQuestion();
  });
}
function renderResults() {
  const correct = quiz.questions.filter((question, index) => question.answer === quiz.answers[index]).length;
  const total = quiz.questions.length, percent = Math.round(correct / total * 100);
  if (quiz.moduleId === 'all') { progress.assessment = { correct, total }; progress.assessmentRevision = 2; saveProgress(); }
  const missed = quiz.questions.filter((question, index) => question.answer !== quiz.answers[index]);
  const review = missed.length ? '<h3>Ideas to revisit</h3>' + missed.map(question => `<details><summary>${esc(question.prompt)}</summary><p><strong>Best answer:</strong> ${esc(question.options[question.answer])}</p><p>${esc(question.explanation)}</p><a href="#lessons/${question.moduleId}">Review the lesson</a></details>`).join('') : '<p>All answers were correct. Try explaining CFAR and evidence independence without looking at the notes.</p>';
  $('#quiz-stage').innerHTML = `<div class="results"><p class="eyebrow">${quiz.moduleId === 'all' ? 'Full assessment' : 'Lesson practice'} complete</p><h2 id="results-heading" tabindex="-1">${correct} / ${total} · ${percent}%</h2><p>${percent >= 80 ? 'You met the self-study review target of 80%. Revisit any missed concepts below.' : 'Review the linked lessons and try again when you can explain the reasoning.'} This score is not an operational certification.</p>${review}<button id="retry-quiz" class="button" type="button">Try this set again</button></div>`;
  $('#retry-quiz').addEventListener('click', startQuiz);
  $('#results-heading').focus({ preventScroll: true });
}

function init() {
  $('.skip-link').addEventListener('click', event => {
    event.preventDefault();
    $('#main').focus({ preventScroll: true });
    $('#main').scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  loadProgress();
  $('#lesson-count').textContent = lessons.length; $('#asset-count').textContent = catalogue.length; $('#question-count').textContent = quizQuestions.length;
  renderProgress(); renderLesson(selectedLesson);
  for (const category of [...new Set(catalogue.map(asset => asset.category))].sort()) $('#atlas-category').add(new Option(category, category));
  for (const lesson of lessons) $('#quiz-module').add(new Option(lesson.title, lesson.id));
  for (const element of [$('#atlas-search'), $('#atlas-category'), $('#atlas-evidence')]) element.addEventListener('input', renderAtlas);
  $('#atlas-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-open]');
    if (!button) return;
    const asset = catalogue.find(item => item.id === button.dataset.open);
    $('#asset-dialog-title').textContent = asset.name; $('#asset-dialog-body').innerHTML = assetDetails(asset);
    $('#asset-dialog').showModal();
  });
  $('#atlas-grid').addEventListener('change', event => {
    const control = event.target.closest('[data-compare]');
    if (!control) return;
    compared = control.checked ? [...compared, control.dataset.compare].slice(0, 2) : compared.filter(id => id !== control.dataset.compare);
    renderCompare();
    $$('#atlas-grid [data-compare]').forEach(input => { input.disabled = compared.length === 2 && !compared.includes(input.dataset.compare); });
  });
  $('#clear-compare').addEventListener('click', () => { compared = []; renderCompare(); renderAtlas(); $('#atlas-search').focus(); });
  $('#close-asset').addEventListener('click', () => $('#asset-dialog').close());
  $('#asset-dialog-body').addEventListener('click', event => { if (event.target.closest('a')) $('#asset-dialog').close(); });
  renderAtlas();
  $('#cfar-controls').addEventListener('submit', event => event.preventDefault());
  $('#cfar-controls').addEventListener('input', renderCfar); $('#cfar-cell').addEventListener('input', renderCfar);
  $('#new-noise').addEventListener('click', () => { noiseSeed = (noiseSeed + 1) >>> 0; renderCfar(); });
  renderCfar();
  $('#sensor-controls').innerHTML = sensors.map((sensor, index) => `<label class="sensor-card"><input id="sensor-${sensor.id}" type="checkbox" ${index < 2 ? 'checked' : ''}> ${sensor.name}</label>`).join('');
  $('#sensor-controls').addEventListener('change', renderNetwork); renderNetwork();
  ['fusion-prior','fusion-a','fusion-b','fusion-independent'].forEach(id => $(`#${id}`).addEventListener('input', renderFusion)); renderFusion();
  $('#start-quiz').addEventListener('click', startQuiz);
  $('#glossary').innerHTML = glossary.map(([term, definition]) => `<dt>${esc(term)}</dt><dd>${esc(definition)}</dd>`).join('');
  $('#source-list').innerHTML = sources.map(source => `<article class="source-card" id="source-${source.id}"><p class="eyebrow">${esc(source.publisher)} · ${esc(source.date)}</p><h3 tabindex="-1"><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)} <span class="sr-only">(opens in a new tab)</span></a></h3><p>${esc(source.scope || 'Background reading for the related family names; not a claim of complete variant coverage.')}</p><p class="small muted">${esc(source.accessNote)}</p></article>`).join('');
  $('#reset-progress').addEventListener('click', () => $('#reset-dialog').showModal());
  $('#cancel-reset').addEventListener('click', () => $('#reset-dialog').close());
  $('#confirm-reset').addEventListener('click', () => { progress = { completed: [], assessment: null, assessmentRevision: 2 }; saveProgress(); renderLesson(selectedLesson); $('#reset-dialog').close(); });
  $('#report-form').addEventListener('submit', event => { event.preventDefault(); $('#report-feedback').hidden = false; });
  $('#download-report').addEventListener('click', () => {
    const content = `FICTIONAL TRAINING NOTE — not an incident report\n\nDirect observations:\n${$('#report-observation').value}\n\nUnknowns and secondhand claims:\n${$('#report-uncertainty').value}\n`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'uas-fictional-practice-note.txt'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  window.addEventListener('hashchange', () => route()); route(false);
}
init();
