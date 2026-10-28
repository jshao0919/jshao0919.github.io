export const STORAGE_KEY = 'mathjock.91b.progress.v1';

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

export function cleanProgress(value, lessonIds, stationIds) {
  const source = value && typeof value === 'object' ? value : {};
  const filter = (input, allowed) => Array.isArray(input) ? [...new Set(input.filter(x => typeof x === 'string' && allowed.includes(x)))] : [];
  return { lessons: filter(source.lessons, lessonIds), stations: filter(source.stations, stationIds), quizBest: Number.isInteger(source.quizBest) && source.quizBest >= 0 && source.quizBest <= 100 ? source.quizBest : null };
}

export function questionSet(questions, lessonId = 'all') {
  return questions.filter(q => lessonId === 'all' || q.lessonId === lessonId);
}

export function quizResult(questions, answers) {
  const correct = questions.filter(q => Number.isInteger(answers[q.id]) && answers[q.id] === q.answer).length;
  return { correct, total: questions.length, percent: questions.length ? Math.round(100 * correct / questions.length) : 0 };
}

export function trainingRecord(scenario, values, evaluation) {
  return {
    documentType: '91B learning exercise — NOT AN OFFICIAL MAINTENANCE RECORD',
    scenario: scenario.title,
    form: scenario.formType,
    equipment: scenario.record,
    observation: scenario.observation,
    suppliedWorkAndVerification: scenario.mode === 'correction' ? { completedWork: scenario.completedWork, verification: scenario.verification, closeout: scenario.closeout } : null,
    practiceEntries: Object.fromEntries(['item','status','fault','action','initials'].map(key => [key, String(values[key] ?? '').slice(0, 2000)])),
    feedback: evaluation,
    note: 'Fictional training only. Not a dispatch, inspection certification, repair certification, or authorization to operate.',
  };
}
