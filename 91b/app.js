import { lessons, quizQuestions, glossary } from './curriculum.js';
import { inspectionStations, inspectionPhases, leakClasses, workflowSteps } from './inspections.js';
import { truckDiagram, leakDiagram } from './visuals.js';
import { formScenarios, formGuides, statusSymbols, evaluateForm } from './forms.js';
import { references, sourceNote } from './references.js';
import { STORAGE_KEY, escapeHtml as h, cleanProgress, questionSet, quizResult, trainingRecord } from './course-core.js';

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const list = values => `<ul>${values.map(value => `<li>${h(value)}</li>`).join('')}</ul>`;
const buttons = (label, id, secondary = false) => `<button type="button" class="button${secondary ? ' secondary' : ''}" id="${id}">${h(label)}</button>`;
const heading = (label, title, description) => `<div class="view-heading"><p class="eyebrow">${h(label)}</p><h1>${h(title)}</h1><p>${h(description)}</p></div>`;
const views = $$('[data-view]');
let progress = cleanProgress({}, lessons.map(l => l.id), inspectionStations.map(s => s.id));
let storageAvailable = true;
try { progress = cleanProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'), lessons.map(l => l.id), inspectionStations.map(s => s.id)); } catch { storageAvailable = false; }
let routeName = 'overview';
let stationIndex = 0;
let stationStep = 0;
let stationPlaying = false;
let stationTimer = null;
let leakId = leakClasses[0].id;
let leakPlaying = false;
let scenarioId = formScenarios[0].id;
let demoStep = 0;
let formDrafts = {};
let lastEvaluation = null;
let quizFilter = 'all';
let quizIndex = 0;
let quizAnswers = {};
let quizChecked = false;
let quizFinished = false;
let handoffOrder = workflowSteps.map((_, i) => i).reverse();
let handoffFrame = 0;
let handoffTimer = null;

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); storageAvailable = true; }
  catch { storageAvailable = false; }
  updateProgress();
}
function updateProgress() {
  $('#progress-summary').textContent = `${progress.lessons.length} / ${lessons.length} lessons · ${progress.stations.length} / ${inspectionStations.length} stations`;
  $('#overall-progress').style.width = `${100 * (progress.lessons.length + progress.stations.length) / (lessons.length + inspectionStations.length)}%`;
  $('#storage-status').textContent = storageAvailable ? 'Saved on this browser. No account needed.' : 'Browser storage is unavailable. You can continue; progress may not survive a reload.';
}
function stopAnimations() {
  clearInterval(stationTimer); stationTimer = null; stationPlaying = false;
  clearInterval(handoffTimer); handoffTimer = null;
  leakPlaying = false;
  $$('.is-playing').forEach(el => el.classList.remove('is-playing'));
  for (const [id, label] of [['station-play','Play inspection'],['leak-play','Play animation'],['handoff-play','Play handoff']]) {
    const button = $(`#${id}`); if (button) { button.textContent = label; button.setAttribute('aria-pressed','false'); }
  }
}

function renderOverview() {
  const view = $('[data-view="overview"]');
  view.innerHTML = `<div class="hero"><div class="hero-copy"><p class="eyebrow">91B · Wheeled vehicle maintenance</p><h1>Good maintenance starts with a good look.</h1><p>A practical course in common preventive maintenance checks and services, clear fault descriptions, and paperwork that helps the next person do the job.</p><div class="button-row"><a class="button" href="#learn/roles">Start the course <span aria-hidden="true"></span></a><a class="button secondary" href="#walkaround">Explore the vehicle</a></div><div class="hero-tags"><span>Beginner friendly</span><span>Interactive practice</span><span>Self paced</span></div></div><div class="hero-art"><div class="eyebrow">Your practice vehicle</div>${truckDiagram('overview')}<p>Generic training schematic · use your vehicle’s TM</p></div></div>
  <div class="stats-grid"><div class="stat"><strong>${lessons.length}</strong><span>Step-by-step lessons</span></div><div class="stat"><strong>${inspectionStations.length}</strong><span>Walkaround stations</span></div><div class="stat"><strong>${formScenarios.length}</strong><span>Forms scenarios</span></div><div class="stat"><strong>${quizQuestions.length}</strong><span>Explained questions</span></div></div>
  <div class="section-heading"><div><p class="eyebrow">The learning path</p><h2>From first check to final handoff.</h2></div><a href="workbook.html">Read or print the entire course</a></div>
  <div class="card-grid">${[
    ['01 / Prepare','Know your role and your manual','Match the vehicle to the TM. Set up a safe work area and learn what you can inspect, service, record, and escalate.','#learn/roles','Build the foundation'],
    ['02 / Observe','Make your walkaround repeatable','Move through twelve inspection stations, learn common observations, and separate a symptom from a diagnosis.','#walkaround','Start the walkaround'],
    ['03 / Document','Make a useful maintenance record','Practice identifiers, item references, status, fault wording, and the boundary between reporting and certifying a correction.','#forms','Practice the forms'],
    ['04 / Follow through','Close the communication loop','Trace a fault through maintenance control, authorized work, verification, and record reconciliation.','#handoff','Practice the handoff'],
  ].map(([n,t,b,u,a])=>`<article class="card"><p class="eyebrow">${n}</p><h3>${t}</h3><p>${b}</p><a href="${u}">${a} <span aria-hidden="true"></span></a></article>`).join('')}</div>
  <div class="callout"><strong>Learn the process, then apply the correct technical manual.</strong><p>This course covers common PMCS and documentation foundations for a new 91B or operator. It does not replace MOS qualification, supervised hands-on instruction, the exact vehicle TM, or current unit procedures. A truck diagram cannot set a pressure, torque, fluid specification, inspection interval, or release-to-operate decision.</p></div>
  <div class="section-heading"><h2>Your progress</h2></div><p>${progress.lessons.length} lessons reviewed; ${progress.stations.length} stations practiced. ${progress.quizBest === null ? 'Complete the full knowledge check to record a best score.' : `Best full-course knowledge check: ${progress.quizBest}%.`}</p><div class="button-row"><button class="button ghost" id="reset-progress" type="button">Reset learning progress</button></div><div id="reset-confirm" hidden class="callout"><p>Clear the lesson, station, and quiz progress saved in this browser?</p>${buttons('Yes, clear progress','confirm-reset')}${buttons('Keep progress','cancel-reset',true)}</div>`;
  $('#reset-progress').onclick = () => { $('#reset-confirm').hidden = false; $('#confirm-reset').focus(); };
  $('#cancel-reset').onclick = () => { $('#reset-confirm').hidden = true; $('#reset-progress').focus(); };
  $('#confirm-reset').onclick = () => { progress = cleanProgress({},[],[]); saveProgress(); renderOverview(); $('#reset-progress').focus(); };
}

function renderLesson(id) {
  const lesson = lessons.find(l => l.id === id) || lessons[0];
  const index = lessons.indexOf(lesson);
  $('[data-view="learn"]').innerHTML = `${heading('The course / Learn at your pace', 'A clear process, one step at a time.', 'Read the explanation, work through the example, and check your understanding. Your vehicle’s manual supplies the specific procedure.')}
  <div class="lesson-layout"><nav class="lesson-list" aria-label="Lessons">${lessons.map((l,i)=>`<a class="lesson-link${l.id === lesson.id ? ' active' : ''}" ${l.id === lesson.id ? 'aria-current="page"' : ''} href="#learn/${l.id}"><span>${String(i+1).padStart(2,'0')}</span><span>${h(l.title)}<small>${l.minutes} min${progress.lessons.includes(l.id) ? ' · Reviewed ✓' : ''}</small></span></a>`).join('')}</nav><article class="lesson-content"><p class="eyebrow">Lesson ${index+1} / ${lessons.length} · ${lesson.minutes} min</p><h2 id="lesson-title" tabindex="-1">${h(lesson.title)}</h2><p>${h(lesson.summary)}</p><div class="lesson-objectives"><h3>By the end, you can…</h3>${list(lesson.objectives)}</div>${lesson.sections.map(s=>`<section class="teaching-section"><h3>${h(s.title)}</h3><p>${h(s.body)}</p>${s.steps ? `<ol class="step-list">${s.steps.map(x=>`<li>${h(x)}</li>`).join('')}</ol>` : ''}${s.example ? `<div class="example"><span class="eyebrow">Worked example</span><p>${h(s.example)}</p></div>` : ''}</section>`).join('')}<div class="takeaways"><h3>Keep these habits</h3>${list(lesson.takeaways)}</div><p class="field-help">Read alongside: ${lesson.references.map(id=>{const r=references.find(r=>r.id===id);return r?`<a href="#reference">${h(r.title)}</a>`:h(id);}).join(' · ')}</p><div class="button-row">${buttons(progress.lessons.includes(lesson.id) ? 'Reviewed ✓' : 'Mark lesson reviewed','lesson-complete')}<button class="button secondary" id="lesson-check">Check this lesson</button><a href="lessons/${lesson.id}.html">Standalone reading page</a></div><div class="button-row">${index ? `<a href="#learn/${lessons[index-1].id}">← Previous lesson</a>`:''}${index<lessons.length-1?`<a class="button secondary" href="#learn/${lessons[index+1].id}">Next: ${h(lessons[index+1].title)} →</a>`:`<a class="button secondary" href="#forms">Practice the forms →</a>`}</div></article></div>`;
  $('#lesson-complete').onclick = () => { if (!progress.lessons.includes(lesson.id)) progress.lessons.push(lesson.id); saveProgress(); renderLesson(lesson.id); $('#lesson-complete').focus(); };
  $('#lesson-check').onclick = () => { quizFilter=lesson.id; resetQuiz(); location.hash='quiz'; };
}

function renderWalkaround() {
  const station = inspectionStations[stationIndex];
  stationStep = Math.min(stationStep, station.steps.length-1);
  $('[data-view="walkaround"]').innerHTML = `${heading('Interactive demo / PMCS walkaround','Build a repeatable inspection habit.','A generic vehicle lets you rehearse where to look and how to record an observation. Follow the actual TM sequence, access instructions, and before / during / after requirements on the real vehicle.')}
  <div class="segmented" aria-label="Inspection phases">${inspectionPhases.map(p=>`<button type="button" class="button ${p.id===station.phase?'':'secondary'}" data-phase="${p.id}">${h(p.title)}</button>`).join('')}</div><p class="field-help">${h(inspectionPhases.find(p=>p.id===station.phase)?.description || '')}</p>
  <div class="walk-layout"><div class="diagram-panel"><p class="eyebrow">Station ${stationIndex+1} / ${inspectionStations.length} · ${h(station.phase)}</p><div id="truck-scene" class="${stationPlaying?'is-playing':''}">${truckDiagram(station.zone)}</div><div class="diagram-toolbar"><button id="station-play" class="button secondary small" aria-pressed="${stationPlaying}">${stationPlaying?'Pause inspection':'Play inspection'}</button><button id="station-prev-step" class="button ghost small" ${stationStep===0?'disabled':''}>Previous step</button><button id="station-next-step" class="button ghost small" ${stationStep===station.steps.length-1?'disabled':''}>Next step</button></div><div class="step-card" aria-live="polite"><span class="step-number">${stationStep+1}</span><div><span class="eyebrow">Inspection step ${stationStep+1} of ${station.steps.length}</span><p id="inspection-step">${h(station.steps[stationStep])}</p></div></div><p class="field-help">Animation illustrates the inspection sequence; it does not simulate a functional test. Playback advances every 7 seconds. Pause or use the step buttons at any time.</p><div class="station-list" aria-label="Inspection stations">${inspectionStations.map((s,i)=>`<button class="station-button${i===stationIndex?' active':''}" data-station="${i}" aria-pressed="${i===stationIndex}"><span>${String(i+1).padStart(2,'0')}</span>${h(s.title)}${progress.stations.includes(s.id)?' ✓':''}</button>`).join('')}</div></div><article class="station-panel"><h2>${h(station.title)}</h2><p>${h(station.summary)}</p><h3>Observations to describe</h3>${list(station.observe)}<div class="callout warning"><strong>Pause and escalate</strong><p>${h(station.stop)}</p></div><div class="example"><span class="eyebrow">Example observation — not a diagnosis</span><p>${h(station.recordExample)}</p></div><fieldset class="checklist"><legend>Rehearse the sequence</legend>${station.steps.map((s,i)=>`<label><input type="checkbox" name="station-step" value="${i}"><span>${h(s)}</span></label>`).join('')}</fieldset><fieldset class="quiz-options"><legend>${h(station.question.prompt)}</legend>${station.question.options.map((o,i)=>`<label class="option"><input type="radio" name="station-answer" value="${i}"><span>${h(o)}</span></label>`).join('')}</fieldset>${buttons('Check this station','station-check')}<div id="station-feedback" class="feedback" role="status"></div><div class="button-row"><button class="button secondary" id="next-station">${stationIndex===inspectionStations.length-1?'Return to first station':'Next station →'}</button></div></article></div>`;
  $$('[data-station]').forEach(b=>b.onclick=()=>{stopAnimations();stationIndex=Number(b.dataset.station);stationStep=0;renderWalkaround();$('.station-panel h2').setAttribute('tabindex','-1');$('.station-panel h2').focus({preventScroll:true});});
  $$('[data-phase]').forEach(b=>b.onclick=()=>{stopAnimations();stationIndex=inspectionStations.findIndex(s=>s.phase===b.dataset.phase);stationStep=0;renderWalkaround();});
  $('#next-station').onclick=()=>{stopAnimations();stationIndex=(stationIndex+1)%inspectionStations.length;stationStep=0;renderWalkaround();$('#station-play').focus();};
  const updateStep = () => {
    $('#inspection-step').textContent=station.steps[stationStep];
    $('.step-number').textContent=stationStep+1;
    $('.step-card .eyebrow').textContent=`Inspection step ${stationStep+1} of ${station.steps.length}`;
    $('#station-prev-step').disabled=stationStep===0; $('#station-next-step').disabled=stationStep===station.steps.length-1;
  };
  $('#station-prev-step').onclick=()=>{stopAnimations();stationStep=Math.max(0,stationStep-1);updateStep();};
  $('#station-next-step').onclick=()=>{stopAnimations();stationStep=Math.min(station.steps.length-1,stationStep+1);updateStep();};
  $('#station-play').onclick=()=>{
    if(stationPlaying){stopAnimations();return;}
    if(stationStep>=station.steps.length-1){stationStep=0;updateStep();}
    stationPlaying=true;$('#truck-scene').classList.add('is-playing');$('#station-play').textContent='Pause inspection';$('#station-play').setAttribute('aria-pressed','true');
    stationTimer=setInterval(()=>{if(stationStep>=station.steps.length-1){stopAnimations();return;}stationStep++;updateStep();},7000);
  };
  $('#station-check').onclick=()=>{
    const all=$$('input[name="station-step"]:checked').length===station.steps.length;
    const answer=$('input[name="station-answer"]:checked');
    const correct=answer&&Number(answer.value)===station.question.answer;
    const feedback=$('#station-feedback');
    feedback.className=`feedback ${all&&correct?'success':'review'}`;
    feedback.textContent=!answer?'Choose an answer, then check the station.':!all?'Rehearse and check each inspection step before marking this station practiced.':`${correct?'Station practiced.':'Review this observation.'} ${station.question.explanation}`;
    if(all&&correct&&!progress.stations.includes(station.id)){progress.stations.push(station.id);saveProgress();}
  };
}

function renderLeaks() {
  const selected=leakClasses.find(l=>l.id===leakId)||leakClasses[0];
  const observation={I:'Fluid wetness visible on the outside of the lower housing; no drops formed during the check. Fluid identity not confirmed.',II:'Fluid drops formed at the visible lower housing joint and remained attached; no drops fell during the check. Fluid identity not confirmed.',III:'Fluid drops fell from the visible lower housing joint during the check. Fluid identity not confirmed.'}[leakId];
  $('[data-view="leaks"]').innerHTML=`${heading('Interactive demo / Describe what you see','Wetness. Forming drops. Falling drops.','Learn the common visual definitions of fluid-leak classes. These describe an observation; the fluid, location, vehicle TM, and applicable limitations determine the required response.')}
  <div class="leak-layout"><div class="diagram-panel"><div class="segmented">${leakClasses.map(l=>`<button class="button ${l.id===leakId?'':'secondary'}" data-leak="${l.id}" aria-pressed="${l.id===leakId}">${h(l.label)}</button>`).join('')}</div><div id="leak-scene" class="${leakPlaying?'is-playing':''}">${leakDiagram(leakId)}</div><div class="diagram-toolbar"><button class="button secondary" id="leak-play" aria-pressed="${leakPlaying}">${leakPlaying?'Pause animation':'Play animation'}</button></div><p class="field-help">Illustration only. Animation speed and drop size are not measurements, allowable rates, or equipment limits.</p></div><article class="station-panel"><p class="eyebrow">Observation vocabulary</p><h2>${h(selected.label)}</h2><p>${h(selected.description)}</p><div class="example"><h3>What this tells you</h3><p>${h(selected.meaning)}</p></div><div class="callout warning"><strong>A leak class does not decide whether a vehicle can operate.</strong><p>Check the fluid and exact component against the TM. Fuel, brake, and other hazardous or safety-critical leaks may have stricter requirements. Do not touch or smell an unknown fluid, feel for pressurized leaks with a hand, or open a hot or pressurized system. Report the observation and follow the prescribed stop / shutdown procedure when required.</p></div><h3>Write the observation</h3><p>Identify the location, visible condition, operating condition when observed, and applicable item reference. Do not replace a visible symptom with a guessed cause.</p><div class="example" id="leak-observation">“${h(observation)}” Add the correct TM item and required status through your authorized process.</div></article></div>
  <section class="card"><h2>Try an observation</h2><p>At a visible joint, fluid gathers into drops that remain attached. You do not see a drop fall. Which class describes the observation?</p><fieldset class="quiz-options"><legend class="sr-only">Choose a leak class</legend>${leakClasses.map((l,i)=>`<label class="option"><input type="radio" name="leak-answer" value="${i}"><span>${h(l.label)}</span></label>`).join('')}</fieldset>${buttons('Check observation','leak-check')}<p class="feedback" id="leak-feedback" role="status"></p></section>`;
  $$('[data-leak]').forEach(b=>b.onclick=()=>{stopAnimations();leakId=b.dataset.leak;renderLeaks();});
  $('#leak-play').onclick=()=>{leakPlaying=!leakPlaying;$('#leak-scene').classList.toggle('is-playing',leakPlaying);$('#leak-play').textContent=leakPlaying?'Pause animation':'Play animation';$('#leak-play').setAttribute('aria-pressed',String(leakPlaying));};
  $('#leak-check').onclick=()=>{const answer=$('input[name="leak-answer"]:checked');$('#leak-feedback').className=`feedback ${answer&&answer.value==='1'?'success':'review'}`;$('#leak-feedback').textContent=!answer?'Choose an observation first.':`${answer.value==='1'?'Correct.':'Review the distinction.'} Class II describes drops that form but do not fall. This alone does not determine equipment status or permission to operate.`;};
}

function readForm() { return Object.fromEntries(['item','status','fault','action','initials'].map(key=>[key,$(`[name="${key}"]`, $('#practice-form'))?.value||''])); }
function saveDraft() { if($('#practice-form')) formDrafts[scenarioId]=readForm(); }
function renderForms() {
  const scenario=formScenarios.find(s=>s.id===scenarioId)||formScenarios[0];
  const draft=formDrafts[scenario.id]||{item:'',status:'',fault:'',action:'',initials:''};
  lastEvaluation=null;
  demoStep=0;
  const correction=scenario.mode==='correction';
  const recordLabels={organization:'Organization',equipment:'Equipment / model',identifier:'Training equipment ID',date:'Inspection date',odometer:'Odometer / units',hours:'Hours',tmReference:'Reference supplied for this exercise',inspectionType:'Inspection type'};
  $('[data-view="forms"]').innerHTML=`${heading('Interactive workshop / Maintenance forms','Turn an observation into a useful record.','Study the field roles, watch a worked example fill in one step at a time, then practice writing your own entry. All equipment, item references, and statuses in these scenarios are fictional training data.')}
  <div class="form-layout"><aside class="scenario-panel"><label class="field"><span>Choose a practice scenario</span><select id="scenario-select">${formScenarios.map(s=>`<option value="${s.id}" ${s.id===scenario.id?'selected':''}>${h(s.title)}</option>`).join('')}</select></label><p class="eyebrow">${scenario.formType==='2404'?'DA Form 2404':'DA Form 5988-E'} · Practice layout</p><h2 id="scenario-title">${h(scenario.title)}</h2><p>${h(scenario.brief)}</p><div class="example"><strong>Observed condition</strong><p>${h(scenario.observation)}</p></div>${correction?`<div class="example"><strong>Supplied work and verification</strong><p>${h(scenario.completedWork)}</p><p>${h(scenario.verification)}</p><p>${h(scenario.closeout)}</p></div>`:''}<div class="callout"><strong>Scenario instructions</strong><p>Training item: <b>${h(scenario.expected.item)}</b>. The exercise’s authorized reviewer has supplied status <b>${h(scenario.expected.status)}</b>. Use that value only for this fictional exercise; do not infer a real vehicle’s status from it.</p></div><h3>Guided demonstration</h3><p>Each click fills one part of a worked example. “Start blank” lets you practice independently.</p><div class="button-row">${buttons('Show next entry','form-demo')}${buttons('Start blank','form-reset',true)}</div><p id="demo-feedback" class="feedback" role="status"></p><details><summary>Step-by-step entry guide</summary><ol>${scenario.steps.map(s=>`<li><strong>${h(s.title)}</strong><p>${h(s.body)}</p></li>`).join('')}</ol></details></aside>
  <section class="practice-sheet"><div class="sheet-header"><div><p class="eyebrow">${scenario.formType==='2404'?'DA 2404':'DA 5988-E'} · Field roles practice</p><h2>Inspection worksheet</h2></div><span class="training-stamp">TRAINING ONLY</span></div><p class="field-help">Simplified learning layout, not an official form. Never enter real personnel, unit readiness, or equipment records here. ${scenario.formType==='5988'?'Read and verify the generated identifiers and existing faults before adding new observations.':'Verify the equipment identifiers and inspection reference before entering a fault.'}</p><dl class="form-meta">${Object.entries(scenario.record).map(([key,value])=>`<div><dt>${h(recordLabels[key]||key)}</dt><dd>${h(value)}</dd></div>`).join('')}</dl>
  <form id="practice-form" novalidate><div class="field-grid"><label class="field"><span>TM item / training reference</span><input name="item" maxlength="100" value="${h(draft.item)}" autocomplete="off" aria-describedby="item-help"><small id="item-help">Use the item reference supplied by this training card.</small></label><label class="field"><span>Status supplied for this exercise</span><select name="status"><option value="">Choose status</option>${statusSymbols.map(s=>`<option value="${h(s.symbol)}" ${draft.status===s.symbol?'selected':''}>${h(s.symbol)} — ${h(s.label)}</option>`).join('')}</select></label><label class="field wide"><span>Deficiency / shortcoming — what did you observe?</span><textarea name="fault" rows="4" maxlength="1600" placeholder="Component and location + observable condition + relevant context">${h(draft.fault)}</textarea><small>State the symptom. Avoid diagnosing a failed part without evidence.</small></label><label class="field wide"><span>${correction?'Corrective action and verification (training)':'Pending handoff / action note (training)'}</span><textarea name="action" rows="3" maxlength="1600" placeholder="${correction?'Record only the completed work and verification supplied by the scenario.':'What was reported or requested? What remains pending?'}">${h(draft.action)}</textarea><small>${correction?'Use only the supplied facts of work and verification already completed by the fictional maintainer. A documentation exercise does not teach or authorize the repair.':'This is a practice handoff note. On a real worksheet, use the location your current instructions specify; the corrective-action field must reflect work actually performed by authorized personnel.'}</small></label><label class="field"><span>Correction initials</span><input name="initials" maxlength="30" value="${h(draft.initials)}" autocomplete="off" aria-describedby="initials-help"><small id="initials-help">${correction?`Use the fictional designated corrector’s supplied initials: ${h(scenario.expected.initials)}. Do not enter real personnel information.`:'Leave blank: no authorized correction was performed in this reporting scenario.'}</small></label></div><div class="button-row"><button class="button" type="submit">Check my entries</button><button class="button secondary" id="form-export" type="button">Download practice record</button></div></form><div id="form-feedback" class="feedback" role="status"></div><p class="field-help">Feedback uses a limited wording-based rubric; it is not a full language or technical review and cannot approve a real maintenance record. Your form text stays in this tab and is not sent anywhere; downloading creates a file on your device.</p></section></div>
  <div class="section-heading"><div><p class="eyebrow">Keep the roles straight</p><h2>Which record does what?</h2></div></div><div class="guide-grid">${formGuides.map(g=>`<article class="guide-card"><h3>${h(g.title)}</h3><p>${h(g.summary)}</p><details><summary>Fields, workflow &amp; common mistakes</summary><dl>${g.fields.map(f=>`<dt>${h(f.name)}</dt><dd>${h(f.meaning)}${f.example?`<p class="example">${h(f.example)}</p>`:''}</dd>`).join('')}</dl><h4>Workflow</h4><ol>${g.workflow.map(t=>`<li>${h(t)}</li>`).join('')}</ol><h4>Common mistakes</h4>${list(g.pitfalls)}</details></article>`).join('')}</div>`;
  $('#scenario-select').onchange=e=>{saveDraft();scenarioId=e.target.value;demoStep=0;renderForms();};
  $('#practice-form').oninput=()=>{saveDraft();lastEvaluation=null;$('#form-feedback').innerHTML='Entries changed. Check them again when ready.';$('#form-feedback').className='feedback';};
  $('#form-reset').onclick=()=>{formDrafts[scenarioId]={};demoStep=0;renderForms();$('[name="item"]').focus();};
  $('#form-demo').onclick=()=>{
    const keys=['item','status','fault','action','initials'];
    const key=keys[demoStep]; if(!key)return;
    $(`[name="${key}"]`).value=scenario.expected[key]||'';
    const notes={item:'Copy the reference from the training card. On equipment, use the exact applicable TM item or authorized fault reference.',status:'Use the status provided by the exercise’s authorized reviewer. Real status must follow the applicable technical criteria and your authority.',fault:'Describe the observed component, location, and symptom. Do not turn an observation into an unsupported diagnosis.',action:correction?'Document the actual work and verification supplied in the scenario. Do not invent an extra repair, test, system closure, or operating authorization.':'Record the pending handoff truthfully. This note does not certify a repair or authorize operation.',initials:correction?'Use only the fictional initials provided for the authorized corrector after the supplied verification. No real sign-off occurs here.':'Leave correction initials blank. No authorized correction was performed; a completed-looking record would be misleading.'};
    $('#demo-feedback').textContent=`Step ${demoStep+1} / 5. ${notes[key]}`;saveDraft();demoStep++;lastEvaluation=null;$('#form-feedback').innerHTML='';
    if(demoStep===5){$('#form-demo').disabled=true;$('#form-demo').textContent='Example complete';}
  };
  $('#practice-form').onsubmit=e=>{e.preventDefault();saveDraft();lastEvaluation=evaluateForm(scenario,readForm());const fb=$('#form-feedback');fb.className=`feedback ${lastEvaluation.passed?'success':'review'}`;fb.innerHTML=`<h3>${lastEvaluation.passed?'Practice entry meets this scenario’s rubric.':'Review these entries.'}</h3><ul class="rubric-list">${lastEvaluation.checks.map(c=>`<li><strong>${c.ok?'✓':'Review'} · ${h(c.field)}</strong> ${h(c.message)}</li>`).join('')}</ul>`;};
  $('#form-export').onclick=()=>{const values=readForm();download(`91b-training-${scenario.id}.json`,JSON.stringify(trainingRecord(scenario,values,evaluateForm(scenario,values)),null,2),'application/json');};
}
function download(name,content,type) {const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}

function renderHandoff() {
  $('[data-view="handoff"]').innerHTML=`${heading('Interactive demo / The maintenance process','A fault is not finished when it is written down.','Trace the record from observation to authorized correction and reconciliation. This is a learning sequence; emergency actions, equipment restrictions, and your local work process take priority.')}
  <section class="diagram-panel"><div class="section-heading"><h2>Follow the handoff</h2><button class="button secondary" id="handoff-play" aria-pressed="false">Play handoff</button></div><div class="workflow-list" id="handoff-animation">${workflowSteps.map((s,i)=>`<button class="workflow-step ${i===handoffFrame?'active':''}" data-handoff="${i}" aria-pressed="${i===handoffFrame}"><span class="step-number">${i+1}</span><strong>${h(s.title)}</strong></button>`).join('')}</div><div class="step-card" aria-live="polite"><div><h3 id="handoff-title">${h(workflowSteps[handoffFrame].title)}</h3><p id="handoff-body">${h(workflowSteps[handoffFrame].body)}</p></div></div><p class="field-help">Playback advances every 7 seconds. Each step is also a button you can select directly.</p></section>
  <section class="card"><h2>Put the record in order</h2><p>Use Move up / Move down to arrange the simplified maintenance workflow. Reading the process above is encouraged.</p><ol id="handoff-sort" class="workflow-sort">${handoffOrder.map((idx,pos)=>`<li><span><strong>${h(workflowSteps[idx].title)}</strong></span><div class="button-row"><button class="button ghost small" data-move="${pos}" data-direction="-1" ${pos===0?'disabled':''} aria-label="Move ${h(workflowSteps[idx].title)} up">Move up</button><button class="button ghost small" data-move="${pos}" data-direction="1" ${pos===handoffOrder.length-1?'disabled':''} aria-label="Move ${h(workflowSteps[idx].title)} down">Move down</button></div></li>`).join('')}</ol><div class="button-row">${buttons('Check the sequence','handoff-check')}${buttons('Restart activity','handoff-reset',true)}</div><p class="feedback" id="handoff-feedback" role="status"></p></section>`;
  const frame=()=>{const step=workflowSteps[handoffFrame];$('#handoff-title').textContent=step.title;$('#handoff-body').textContent=step.body;$$('[data-handoff]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.handoff)===handoffFrame);b.setAttribute('aria-pressed',String(Number(b.dataset.handoff)===handoffFrame));});};
  $$('[data-handoff]').forEach(b=>b.onclick=()=>{stopAnimations();handoffFrame=Number(b.dataset.handoff);frame();});
  $('#handoff-play').onclick=()=>{if(handoffTimer){stopAnimations();return;}if(handoffFrame===workflowSteps.length-1){handoffFrame=0;frame();}$('#handoff-play').textContent='Pause handoff';$('#handoff-play').setAttribute('aria-pressed','true');handoffTimer=setInterval(()=>{if(handoffFrame===workflowSteps.length-1){stopAnimations();return;}handoffFrame++;frame();},7000);};
  $$('[data-move]').forEach(b=>b.onclick=()=>{stopAnimations();const a=Number(b.dataset.move),c=a+Number(b.dataset.direction);[handoffOrder[a],handoffOrder[c]]=[handoffOrder[c],handoffOrder[a]];renderHandoff();const focus=$(`[data-move="${c}"]:not(:disabled)`);if(focus)focus.focus();});
  $('#handoff-check').onclick=()=>{const correct=handoffOrder.every((v,i)=>v===i);$('#handoff-feedback').className=`feedback ${correct?'success':'review'}`;$('#handoff-feedback').textContent=correct?'Sequence complete. A correction must be performed and verified by the appropriate personnel before status and records are reconciled; the training sequence itself authorizes nothing.':`Review the handoff. Step ${handoffOrder.findIndex((v,i)=>v!==i)+1} should be “${workflowSteps[handoffOrder.findIndex((v,i)=>v!==i)].title}”. Compare the responsibilities above, then try again.`;};
  $('#handoff-reset').onclick=()=>{stopAnimations();handoffOrder=workflowSteps.map((_,i)=>i).reverse();renderHandoff();};
}

function resetQuiz(){quizIndex=0;quizAnswers={};quizChecked=false;quizFinished=false;}
function renderQuiz() {
  const questions=questionSet(quizQuestions,quizFilter);
  const q=questions[quizIndex];
  const result=quizResult(questions,quizAnswers);
  $('[data-view="quiz"]').innerHTML=`${heading('Knowledge checks / Practice with explanations','Understand the reason behind the step.','Choose an answer, read the explanation, and continue. These are learning checks, not a qualification exam.')}
  <label class="field"><span>Question set</span><select id="quiz-filter"><option value="all">Full course · ${quizQuestions.length} questions</option>${lessons.map(l=>`<option value="${l.id}" ${quizFilter===l.id?'selected':''}>${h(l.title)}</option>`).join('')}</select></label>
  ${quizFinished?`<section class="card"><p class="eyebrow">Practice complete</p><h2 id="quiz-result">${result.correct} / ${result.total} correct · ${result.percent}%</h2><p>${result.correct===result.total?'You answered every question correctly. Keep applying the reference-checking and documentation habits in supervised practice.':'Use the explanations below to revisit the ideas you missed.'}</p>${buttons('Practice again','quiz-restart')}<div class="quiz-review">${questions.map(x=>`<details><summary>${quizAnswers[x.id]===x.answer?'✓':'Review'} · ${h(x.prompt)}</summary><p><strong>Answer:</strong> ${h(x.options[x.answer])}</p><p>${h(x.explanation)}</p><a href="#learn/${x.lessonId}">Review the lesson →</a></details>`).join('')}</div></section>`:
  `<section class="card"><p class="eyebrow">Question ${quizIndex+1} / ${questions.length} · ${h(lessons.find(l=>l.id===q.lessonId)?.title||'')}</p><div class="progress-track quiz-progress" aria-hidden="true"><span style="width:${100*quizIndex/questions.length}%"></span></div><form id="quiz-form"><fieldset class="quiz-options"><legend id="quiz-question">${h(q.prompt)}</legend>${q.options.map((o,i)=>`<label class="option${quizChecked&&i===q.answer?' correct':''}${quizChecked&&quizAnswers[q.id]===i&&i!==q.answer?' incorrect':''}"><input type="radio" name="quiz-answer" value="${i}" ${quizAnswers[q.id]===i?'checked':''} ${quizChecked?'disabled':''}><span>${h(o)}</span></label>`).join('')}</fieldset><button class="button" ${quizChecked?'disabled':''} type="submit">Check answer</button></form><div id="quiz-feedback" class="feedback ${quizChecked?(quizAnswers[q.id]===q.answer?'success':'review'):''}" role="status">${quizChecked?`<strong>${quizAnswers[q.id]===q.answer?'Correct.':'Review this idea.'}</strong><p>${h(q.explanation)}</p><p><strong>Answer:</strong> ${h(q.options[q.answer])}</p>`:''}</div>${quizChecked?buttons(quizIndex===questions.length-1?'See results':'Next question →','quiz-next'):''}</section>`}`;
  $('#quiz-filter').onchange=e=>{quizFilter=e.target.value;resetQuiz();renderQuiz();};
  if(quizFinished){$('#quiz-restart').onclick=()=>{resetQuiz();renderQuiz();};return;}
  $('#quiz-form').onsubmit=e=>{e.preventDefault();const answer=$('input[name="quiz-answer"]:checked');if(!answer){$('#quiz-feedback').textContent='Choose an answer before checking.';return;}quizAnswers[q.id]=Number(answer.value);quizChecked=true;renderQuiz();$('#quiz-next').focus();};
  if($('#quiz-next'))$('#quiz-next').onclick=()=>{if(quizIndex===questions.length-1){quizFinished=true;if(quizFilter==='all'){progress.quizBest=Math.max(progress.quizBest??0,quizResult(questions,quizAnswers).percent);saveProgress();}}else{quizIndex++;quizChecked=false;}renderQuiz();if(!quizFinished){$('#quiz-question').setAttribute('tabindex','-1');$('#quiz-question').focus();}};
}

function renderReference() {
  $('[data-view="reference"]').innerHTML=`${heading('Desk reference / Manuals, language & records','Keep the source close to the work.','Use this page to refresh a term or find the right publication family. Verify the latest applicable instructions through your unit’s authorized publications process.')}
  <div class="callout"><strong>Source and edition note</strong><p>${h(sourceNote)}</p></div>
  <h2>Status symbols: meaning and authority</h2><p>These are orientation notes, not equipment-status decisions. The current applicable instructions define entry, clearing, and approval authority.</p><div class="card-grid">${statusSymbols.map(s=>`<article class="card"><span class="status-badge">${h(s.symbol)}</span><h3>${h(s.label)}</h3><p>${h(s.description)}</p></article>`).join('')}</div><h2>Publications &amp; official sources</h2><div class="resource-list">${references.map(r=>`<article id="ref-${r.id}"><p class="eyebrow">${h(r.kind)}</p><h3><a href="${h(r.url)}" target="_blank" rel="noopener noreferrer">${h(r.title)}</a></h3><p>${h(r.description)}</p></article>`).join('')}</div>
  <h2>Plain-language glossary</h2><label class="field"><span>Find a term</span><input type="search" id="glossary-search" placeholder="Try PMCS, discrepancy, or dispatch"></label><div id="glossary-results" class="glossary-grid">${glossary.map(g=>`<article><h3>${h(g.term)}</h3><p>${h(g.definition)}</p></article>`).join('')}</div><p class="field-help" id="glossary-count" role="status">${glossary.length} terms</p><div class="callout"><h3>A useful fault-writing pattern</h3><p>Reference → component and location → observable symptom → relevant conditions → truthful handoff. A reported symptom is evidence; a guessed failed component is not a verified diagnosis.</p><a class="button secondary" href="workbook.html">Read or print the course</a></div>`;
  $('#glossary-search').oninput=e=>{const query=e.target.value.trim().toLowerCase();const matches=glossary.filter(g=>`${g.term} ${g.definition}`.toLowerCase().includes(query));$('#glossary-results').innerHTML=matches.map(g=>`<article><h3>${h(g.term)}</h3><p>${h(g.definition)}</p></article>`).join('');$('#glossary-count').textContent=`${matches.length} terms${matches.length?'':' — try a shorter search'}`;};
}
function route(initial=false) {
  if(routeName==='forms')saveDraft();
  stopAnimations();
  let parts;try{parts=decodeURIComponent(location.hash.slice(1)).split('/');}catch{parts=['overview'];}
  let [name,id]=parts;
  if(!views.some(v=>v.dataset.view===name))name='overview';
  routeName=name;
  views.forEach(v=>v.hidden=v.dataset.view!==name);
  $$('[data-route]').forEach(a=>{if(a.dataset.route===name)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  ({overview:renderOverview,learn:()=>renderLesson(id),walkaround:renderWalkaround,leaks:renderLeaks,forms:renderForms,handoff:renderHandoff,quiz:renderQuiz,reference:renderReference})[name]();
  updateProgress();
  if(!initial){$('#main').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  if(name==='learn'&&id){$('#lesson-title').focus({preventScroll:true});$('#lesson-title').scrollIntoView({block:'start',behavior:'instant'});}
  document.title=`${{overview:'Motor Pool',learn:'Lessons',walkaround:'PMCS Walkaround',leaks:'Leak Classification',forms:'Forms Practice',handoff:'Maintenance Handoff',quiz:'Knowledge Checks',reference:'Desk Reference'}[name]} · 91B Learning Lab`;
}
window.addEventListener('hashchange',()=>route());
window.addEventListener('pagehide',stopAnimations);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAnimations();});
route(true);
$('#startup-message').hidden=true;
