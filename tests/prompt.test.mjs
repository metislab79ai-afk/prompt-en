import test from 'node:test';
import assert from 'node:assert/strict';
import {countries,languages,topics,researchKeywords} from '../data.js';
import {initialState,normalizeState,buildPrompt} from '../prompt.js';
test('every country and suggested scenario produces a complete localized research brief',()=>{
 for(const c of countries) for(const topic of c.topics){
  assert.ok(topics[topic]);
  const s={...initialState(),country:c.id,language:c.language,topic,learner:'2',constraints:[0,3],goal:'A measurable pilot'};
  const prompt=buildPrompt(s),t=languages[c.language];
  for(let i=0;i<6;i++)assert.ok(prompt.includes(`[${i+1}. ${t.labels[i]}]`));
  assert.ok(prompt.includes(t.research));assert.ok(prompt.includes(t.output));assert.ok(prompt.includes(t.learners[2]));
  assert.ok(prompt.includes(t.constraints[0]));assert.ok(prompt.includes('A measurable pilot'));
  assert.ok(!prompt.includes('undefined'));assert.ok(!prompt.includes('[object Object]'));
 }
});
test('changing language replaces the template while preserving participant text',()=>{
 const s={...initialState(),country:'vn',language:'vi',topic:'custom',customProblem:'Custom problem <not HTML>',goal:'Thử nghiệm',learner:'0',constraints:[5],context:'An unknown budget',audience:'Board members',keywords:'custom key'};
 const vi=buildPrompt(s),en=buildPrompt(s,'en');
 assert.ok(vi.includes(languages.vi.role));assert.ok(en.includes(languages.en.role));
 for(const p of [vi,en])for(const text of [s.customProblem,s.goal,s.context,s.audience,s.keywords])assert.ok(p.includes(text));
 assert.ok(!en.includes(languages.vi.role));
});
test('corrupt or incomplete persisted drafts cannot unlock invalid final steps',()=>{
 assert.equal(normalizeState(null).step,0);
 assert.equal(normalizeState({country:'not-a-country',step:3}).step,0);
 assert.equal(normalizeState({country:'mn',topic:'custom',step:3,customProblem:' '}).step,1);
 assert.equal(normalizeState({country:'mn',topic:'ai',step:3,goal:'x',learner:'0',constraints:[]}).step,2);
 const s=normalizeState({country:'mn',topic:'ai',step:3,goal:'x',learner:'0',constraints:[0,0,99,'x'],language:'__proto__'});
 assert.equal(s.step,3);assert.deepEqual(s.constraints,[0]);assert.equal(s.language,'en');
 assert.equal(buildPrompt(initialState()),'');
});
test('all translated templates have every option and research requirement',()=>{
 assert.equal(countries.length,10);
 for(const [code,t] of Object.entries(languages)){
  assert.equal(researchKeywords[code].length,6);
  assert.equal(t.labels.length,13);assert.equal(t.topics.length,6);assert.equal(t.learners.length,4);assert.equal(t.constraints.length,6);
  for(const key of ['role','objective','audience','format','research','output'])assert.ok(t[key].length>10);
 }
});
