import test from 'node:test';
import assert from 'node:assert/strict';
import { formScenarios, formGuides, statusSymbols, evaluateForm } from '../91b/forms.js';

test('all eight synthetic reporting and correction examples meet their stated practice rubric', () => {
  assert.equal(formScenarios.length, 8);
  for (const scenario of formScenarios) {
    assert.equal(evaluateForm(scenario, scenario.expected).passed, true, scenario.id);
    assert.match(scenario.record.tmReference, /^TRAINING CARD [ABCD]/);
    assert.match(scenario.expected.item, /^T-[ABCD]\d\d$/);
    assert.equal(scenario.expected.initials, scenario.mode === 'correction' ? 'TR' : '');
  }
});

test('an empty form cannot pass or imply that an inspection was completed', () => {
  const result = evaluateForm(formScenarios[0], {});
  assert.equal(result.passed, false);
  assert.deepEqual(result.checks.filter(check => !check.ok).map(check => check.field), ['item', 'status', 'fault', 'action']);
});

test('fault writing requires the location, component, and observed symptom', () => {
  const scenario = formScenarios[0];
  for (const fault of ['Bad tire', 'Right rear tire needs replacement', 'Tire sidewall has a cut', 'Right rear mirror is cracked']) {
    assert.equal(evaluateForm(scenario, { ...scenario.expected, fault }).checks.find(check => check.field === 'fault').ok, false, fault);
  }
  assert.equal(evaluateForm(scenario, { ...scenario.expected, fault: 'Visible split in the sidewall of the right rear tyre.' }).passed, true);
});

test('a contradictory side or negated finding is not accepted merely for matching keywords', () => {
  const scenario = formScenarios[0];
  for (const fault of ['Right rear tire sidewall has no visible cut.', 'Right rear tire sidewall has a cut on the left side.']) {
    assert.equal(evaluateForm(scenario, { ...scenario.expected, fault }).checks.find(check => check.field === 'fault').ok, false);
  }
});

test('item and status must match supplied training instructions', () => {
  const scenario = formScenarios[0];
  assert.equal(evaluateForm(scenario, { ...scenario.expected, item: 'Fault 105' }).passed, false);
  for (const status of ['/', '-', 'circled X', 'ready']) {
    assert.equal(evaluateForm(scenario, { ...scenario.expected, status }).checks.find(check => check.field === 'status').ok, false);
  }
});

test('completion claims cannot be hidden inside an otherwise valid handoff', () => {
  const scenario = formScenarios[0];
  for (const action of ['Reported to supervisor; no repair performed. Replaced tire.', 'Repaired and returned to service.', 'Reported to supervisor; repair completed.']) {
    assert.equal(evaluateForm(scenario, { ...scenario.expected, action }).checks.find(check => check.field === 'action').ok, false, action);
  }
  assert.equal(evaluateForm(scenario, { ...scenario.expected, action: 'Notified maintenance supervisor; awaiting evaluation.' }).passed, true);
});

test('reporting and pending work are both required and initials remain blank', () => {
  const scenario = formScenarios[1];
  for (const action of ['Reported to supervisor.', 'No repair performed.', 'Not reported to supervisor; no repair performed.']) {
    assert.equal(evaluateForm(scenario, { ...scenario.expected, action }).passed, false);
  }
  assert.equal(evaluateForm(scenario, { ...scenario.expected, initials: 'JD' }).checks.find(check => check.field === 'initials').ok, false);
});

test('sensible report-note paraphrases are accepted without claiming a correction', () => {
  const scenario = formScenarios[0];
  for (const action of [
    'Supervisor notified; no repairs performed.',
    'Informed the supervisor; no corrective work was performed.',
    'Reported to supervisor; tire not yet repaired.',
    'Advised supervisor; no repairs have been completed.'
  ]) {
    assert.equal(evaluateForm(scenario, { ...scenario.expected, action }).passed, true, action);
  }
});

test('no scenario accepts a false release, status clearing, or record closure', () => {
  for (const scenario of formScenarios) {
    for (const claim of ['Vehicle approved for operation.', 'Vehicle is serviceable.', 'Returned to service.', 'Status cleared.', 'Electronic fault closed.', 'Updated the electronic record.']) {
      const result = evaluateForm(scenario, { ...scenario.expected, action: `${scenario.expected.action} ${claim}` });
      assert.equal(result.checks.find(check => check.field === 'action').ok, false, `${scenario.id}: ${claim}`);
    }
  }
});

test('correction entries require completed work and the supplied verification', () => {
  const scenario = formScenarios.find(item => item.id === 'lens-correction');
  for (const action of [
    'Replaced right rear lamp lens per TRAINING CARD C.',
    'Replaced right rear lamp lens per TRAINING CARD C; secure installation verified.',
    'Right rear lamp lens is cracked; report to supervisor.',
    'Replaced right rear lamp lens per TRAINING CARD C; secure installation and lamp function not verified.'
  ]) {
    assert.equal(evaluateForm(scenario, { ...scenario.expected, action }).passed, false, action);
  }
  assert.equal(evaluateForm(scenario, { ...scenario.expected, action: 'Installed replacement right rear lamp lens using TRAINING CARD C. Confirmed secure installation and correct lamp operation.' }).passed, true);
});

test('correction initials must identify the supplied fictional corrector', () => {
  for (const scenario of formScenarios.filter(item => item.mode === 'correction')) {
    for (const initials of ['', 'JD', 'TR / JD', 'tr']) {
      assert.equal(evaluateForm(scenario, { ...scenario.expected, initials }).checks.find(check => check.field === 'initials').ok, false, initials);
    }
    assert.equal(evaluateForm(scenario, scenario.expected).passed, true);
  }
});

test('completed physical maintenance does not imply a reconciled 5988-E electronic record', () => {
  const scenario = formScenarios.find(item => item.id === 'mirror-correction');
  assert.equal(evaluateForm(scenario, { ...scenario.expected, action: 'Replaced right exterior mirror housing per TRAINING CARD D; secure installation and mirror adjustment verified.' }).passed, false);
  assert.equal(evaluateForm(scenario, { ...scenario.expected, action: `${scenario.expected.action} Electronic fault closed.` }).passed, false);
  assert.equal(evaluateForm(scenario, { ...scenario.expected, action: 'Replaced right exterior mirror housing per TRAINING CARD D; secure installation and mirror adjustment verified. Electronic record not yet updated.' }).passed, true);
});

test('an overdue inspection example does not require inventing a broken component', () => {
  const scenario = formScenarios.find(item => item.id === 'inspection-due');
  assert.equal(evaluateForm(scenario, scenario.expected).passed, true);
  assert.equal(evaluateForm(scenario, { ...scenario.expected, fault: 'Battery hold-down inspection is completed.' }).passed, false);
});

test('unknown scenario IDs cannot bypass the established rubric', () => {
  assert.throws(() => evaluateForm({ id: 'invented', expected: {} }, {}), TypeError);
  const scenario = formScenarios[0];
  const forged = { ...scenario, expected: { ...scenario.expected, status: 'ready' } };
  assert.equal(evaluateForm(forged, { ...scenario.expected, status: 'ready' }).passed, false);
});

test('guides distinguish maintenance, dispatch, and uncorrected fault records', () => {
  assert.deepEqual(formGuides.map(guide => guide.id), ['2404', '5988', 'dispatch', '2408-14']);
  assert.deepEqual(statusSymbols.map(symbol => symbol.symbol), ['X', '/', '-', 'circled X']);
  assert.ok(formGuides.every(guide => guide.fields.length >= 4 && guide.workflow.length >= 4 && guide.pitfalls.length >= 3));
});
