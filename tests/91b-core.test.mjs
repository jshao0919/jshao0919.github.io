import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanProgress, escapeHtml, questionSet, quizResult, trainingRecord } from '../91b/course-core.js';

test('restored progress rejects corrupt data and obsolete IDs without inventing completion',()=>{
  assert.deepEqual(cleanProgress({lessons:['a','a','unknown',null],stations:['s',1],quizBest:101},['a','b'],['s']),{lessons:['a'],stations:['s'],quizBest:null});
  assert.deepEqual(cleanProgress(null,['a'],['s']),{lessons:[],stations:[],quizBest:null});
  assert.deepEqual(cleanProgress({lessons:{a:true},stations:'s',quizBest:'100'},['a'],['s']),{lessons:[],stations:[],quizBest:null});
});
test('valid learning progress survives normalization',()=>{
  const saved={lessons:['b','a'],stations:['s'],quizBest:76};
  assert.deepEqual(cleanProgress(saved,['a','b'],['s']),saved);
});
test('quiz scoring does not treat an unanswered question as answer zero',()=>{
  const questions=[{id:'a',lessonId:'l1',answer:0},{id:'b',lessonId:'l2',answer:2}];
  assert.deepEqual(quizResult(questions,{}),{correct:0,total:2,percent:0});
  assert.deepEqual(quizResult(questions,{a:0,b:1}),{correct:1,total:2,percent:50});
  assert.equal(quizResult(questions,{a:'0',b:2}).correct,1);
  assert.deepEqual(questionSet(questions,'l1'),[questions[0]]);
  assert.equal(questionSet(questions).length,2);
});
test('HTML metacharacters in free text are escaped',()=>{
  assert.equal(escapeHtml('<img src=x onerror="bad()"> & \'text\''),'&lt;img src=x onerror=&quot;bad()&quot;&gt; &amp; &#39;text&#39;');
});
test('downloaded records are clearly training-only and do not include arbitrary input keys',()=>{
  const exported=trainingRecord({title:'Fictional tire',formType:'2404',record:{identifier:'TRAINING-01'},observation:'A visible cut.'},{fault:'x'.repeat(2100),item:'T-A01',password:'secret'}, {passed:false});
  assert.match(exported.documentType,/NOT AN OFFICIAL/);
  assert.match(exported.note,/Not a dispatch/);
  assert.equal(exported.practiceEntries.fault.length,2000);
  assert.equal(exported.practiceEntries.password,undefined);
  assert.equal(exported.practiceEntries.initials,'');
});
