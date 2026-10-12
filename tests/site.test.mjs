import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../dist/'+p,import.meta.url),'utf8');
test('local and CI defaults enable public indexing',()=>{
 const config=JSON.parse(fs.readFileSync(new URL('../site.config.json',import.meta.url),'utf8'));
 assert.equal(config.indexable,true);
 const workflow=fs.readFileSync(new URL('../.github/workflows/static-pages.yml',import.meta.url),'utf8');
 assert.ok(workflow.includes("vars.INDEXABLE || '1'"));
});
test('AI discovery links reach all localized Markdown pages with the same public content',()=>{
 const info=JSON.parse(read('build-info.json')),routes=JSON.parse(read('routes.json'));
 const index=read('llms.txt'),full=read('llms-full.txt');
 assert.equal((index.match(/index\.md\)/g)||[]).length,25);
 for(const r of routes){
  const url=info.origin+info.basePath+r.path,html=read(r.path.slice(1)+'index.html'),markdown=read(r.path.slice(1)+'index.md');
  const strings=JSON.parse(html.match(/id="page-data" type="application\/json">(.*?)<\/script>/s)[1]).strings;
  assert.ok(html.includes(`rel="alternate" type="text/markdown" href="${url}index.md"`));
  assert.ok(index.includes(`(${url}index.md)`));
  assert.ok(markdown.includes(`Source: ${url}`));
  assert.match(markdown,/^# .+/m);
  assert.ok(full.includes(markdown));
  assert.doesNotMatch(markdown,/<\/?(?:script|svg|input|button|canvas)\b/);
  if(r.page==='guide')for(const key of ['capacityText','equipmentText','compatibilityText','limitsText'])assert.ok(markdown.includes(strings['guide.'+key]));
  for(const [,href] of markdown.matchAll(/\]\((https:\/\/[^)]+)\)/g)){
   assert.ok(href.startsWith(info.origin+info.basePath+'/'),href);
   const local=href.slice((info.origin+info.basePath).length+1);
   assert.ok(fs.existsSync(new URL('../dist/'+local+(href.endsWith('/')?'index.html':''),import.meta.url)),href);
  }
 }
 assert.ok(index.includes(`(${info.origin}${info.basePath}/llms-full.txt)`));
 assert.ok(!fs.existsSync(new URL('../dist/404.md',import.meta.url)));
});
test('25 independently rendered localized pages with reciprocal SEO and valid internal links',()=>{
 const info=JSON.parse(read('build-info.json')),routes=JSON.parse(read('routes.json')),paths=new Set(routes.map(r=>info.basePath+r.path)),titles=new Set();assert.equal(routes.length,25);
 for(const r of routes){const html=read(r.path.slice(1)+'index.html');assert.ok(html.includes(`lang="${r.lang}"`));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);assert.equal((html.match(/<link rel="alternate" hreflang=/g)||[]).length,6);assert.ok(html.includes(`name="robots" content="${info.indexable?'index,follow':'noindex,nofollow'}"`));assert.ok(html.includes(`rel="canonical" href="${info.origin}${info.basePath}${r.path}"`));for(const m of html.matchAll(/<a[^>]*data-route[^>]*href="([^"]+)"/g))assert.ok(paths.has(m[1]),m[1]);JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]); }
 assert.equal((read('sitemap.xml').match(/<loc>/g)||[]).length,25);assert.ok(read('robots.txt').includes(info.indexable?'Allow: /':'Disallow: /'));assert.match(read('404.html'),/noindex/);
});
test('all five localized voice assets contain PCM audio',()=>{for(const l of ['en','it','es','de','fr']){const b=fs.readFileSync(new URL(`../dist/audio/${l}.wav`,import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');assert.ok(b.length>192000);}});
test('capture flush ends processing at exact sample boundary without duplication',()=>{
 let Processor;const messages=[];class Base{constructor(){this.port={postMessage:v=>messages.push(typeof v==='string'?v:Array.from(v))};}}
 vm.runInNewContext(read('capture.js'),{AudioWorkletProcessor:Base,registerProcessor:(_,c)=>Processor=c,Float32Array});
 for(const length of [0,128,4096,4224]){messages.length=0;const p=new Processor(),samples=Float32Array.from({length},(_,i)=>i);p.process([[samples]]);p.port.onmessage({data:'flush'});assert.equal(p.process([[new Float32Array(128)]]),false);p.port.onmessage({data:'flush'});assert.equal(messages.filter(x=>x==='flushed').length,1);assert.deepEqual(messages.filter(Array.isArray).flat(),Array.from(samples));}
});

test('stereo reference defaults and removal of the Test screen in all languages',()=>{
 const routes=JSON.parse(read('routes.json'));assert.ok(routes.every(r=>r.page!=='benchmark'));
 for(const lang of ['en','it','es','de','fr']){const prefix=lang==='en'?'':lang+'/';for(const page of ['encode','decode']){const html=read(prefix+page+'/index.html');assert.match(html,new RegExp('id="reference-'+page+'" type="checkbox" checked'));assert.ok(!html.includes('href="/'+prefix+'benchmark/"'));}}
 const app=read('app.js');assert.match(app,/reference:true,referenceDecode:true/);
});

test('static resources and manifests respect the deployment base path',()=>{
 const {basePath,origin}=JSON.parse(read('build-info.json'));
 for(const {path} of JSON.parse(read('routes.json'))){
  const html=read(path.slice(1)+'index.html');
  for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)){
   assert.ok(url.startsWith(basePath+'/'),url);
   const local=url.slice(basePath.length+1);
   assert.ok(fs.existsSync(new URL('../dist/'+local+(url.endsWith('/')?'index.html':''),import.meta.url)),url);
  }
  const data=JSON.parse(html.match(/id="page-data" type="application\/json">(.*?)<\/script>/s)[1]);
  assert.equal(data.basePath,basePath);
 }
 assert.ok(read('style.css').includes(`url('${basePath}/fonts/`));
 assert.equal(JSON.parse(read('site.webmanifest')).start_url,basePath+'/');
 assert.ok(read('sitemap.xml').includes(origin+basePath+'/it/decode/'));
});

test('public identity, structured data and voice destination agree across all locales',()=>{
 for(const {path,lang,page} of JSON.parse(read('routes.json'))){
  const html=read(path.slice(1)+'index.html');
  assert.doesNotMatch(html,/TapeVault|TAPEVAULT|tapevault\.com/);
  const graph=JSON.parse(html.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  assert.equal(graph.find(x=>x['@type']==='WebSite').name,'TapeBytes');
  assert.equal(graph.find(x=>x['@type']==='WebApplication').offers.price,'0');
  const data=JSON.parse(html.match(/id="page-data" type="application\/json">(.*?)<\/script>/s)[1]);
  assert.match(data.strings['voice.text'],/tapebytes.*lucasciacca/);
  if(page==='guide')assert.ok(html.includes(data.strings['guide.capacity']));
 }
 const info=JSON.parse(read('build-info.json'));
 if(info.origin==='https://tapebytes.lucasciacca.com')assert.equal(read('CNAME').trim(),'tapebytes.lucasciacca.com');
});
