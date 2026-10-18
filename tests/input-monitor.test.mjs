import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {channelWav} from '../src/assets/reference.js';
const source=fs.readFileSync(new URL('../src/assets/app.js',import.meta.url),'utf8');
function harness(rate=48000,channels=1){
 const nodes=[],contexts=[],tracks=[];let requests=0,failPermission=false;
 class Node{constructor(){this.connections=new Set();this.port={onmessage:null,postMessage:()=>{this.port.onmessage?.({data:new Float32Array([.2,-.2])});this.port.onmessage?.({data:'flushed'});}};this.gain={value:1,cancelScheduledValues(){},setValueAtTime(v){this.value=v;}};nodes.push(this);}connect(n,output=0,input=0){this.connections.add(n);(this.routes??=[]).push({node:n,output,input});}disconnect(n){n?this.connections.delete(n):this.connections.clear();}}
 class Context{constructor(options={}){this.options=options;this.state='suspended';this.currentTime=0;this.sampleRate=options.sampleRate||44100;this.destination=new Node();this.audioWorklet={addModule:async()=>{}};contexts.push(this);}async resume(){this.state='running';}async close(){this.state='closed';}createMediaStreamSource(){return new Node();}createChannelSplitter(count){const n=new Node();n.outputs=count;return n;}createAnalyser(){return new Node();}createGain(){return new Node();}}
 const S={input:'',monitor:null,capture:null,listen:false,operation:null,capturedURL:null};
 const scope={S,channelWav,RATE:48000,navigator:{mediaDevices:{getUserMedia:async()=>{requests++;if(failPermission)throw new DOMException('Denied','NotAllowedError');const stream={active:true,getTracks:()=>[track],getAudioTracks:()=>[track]},track={getSettings:()=>({sampleRate:rate,channelCount:channels,echoCancellation:false,noiseSuppression:false,autoGainControl:false}),onended:null,stop(){this.stopped=true;stream.active=false;}};tracks.push(track);return stream;}}},AudioContext:Context,AudioWorkletNode:Node,Float32Array,offline:{captureURL:'capture.js'},check:s=>{if(s?.aborted)throw new DOMException('Cancelled','AbortError');},fail:code=>{throw Error(code);},controls(){},syncAudioModes(){},renderTransportMode(){},renderMonitor(){},loopVisuals(){},notify(){},t:k=>k,$:()=>null,text(){},renderCapture(){},time:x=>x,aborted:()=>new DOMException('Cancelled','AbortError'),setTimeout,clearTimeout,URL,resample:async x=>x,wav:x=>x,recover:async x=>{scope.recovered=x;},run:async(stage,fn)=>{S.operation={};try{return await fn(new AbortController().signal);}finally{S.operation=null;}}};
 const context=vm.createContext(scope);
 for(const name of ['checkAutoStop','applyInputChannels','setInputPlayback','stopMonitor','startMonitor','cleanupCapture','startCapture','stopCapture']){
  const line=source.split('\n').find(l=>l.startsWith('function '+name+'(')||l.startsWith('async function '+name+'('));assert.ok(line,name);vm.runInContext(line.replaceAll('import.meta.url',"'https://example.test/app.js'"),context);
 }
 return {S,scope,contexts,tracks,nodes,get requests(){return requests;},deny(){failPermission=true;}};
}
test('input monitoring opens a muted graph without a recorder or sample buffer',async()=>{const h=harness();await h.scope.startMonitor(new AbortController().signal);const m=h.S.monitor;assert.equal(h.requests,1);assert.equal(m.playback.gain.value,0);assert.equal(h.S.listen,false);assert.equal(h.S.capture,null);assert.equal(m.chunks,undefined);assert.ok(m.input.connections.has(m.analyser));assert.ok(m.analyser.connections.has(m.playback));});
test('Playback toggles only the output gain; capture PCM stays on a separate branch',async()=>{const h=harness();await h.scope.startCapture(new AbortController().signal);const {monitor:m,capture:c}=h.S;h.scope.setInputPlayback(true);assert.equal(m.playback.gain.value,1);c.node.port.onmessage({data:new Float32Array([.25,-.5])});h.scope.setInputPlayback(false);assert.equal(m.playback.gain.value,0);assert.deepEqual(Array.from(c.chunks[0]),[.25,-.5]);assert.ok(m.input.connections.has(c.node));assert.equal(h.requests,1);});
test('stop and decode flushes capture while monitoring and Playback remain active',async()=>{const h=harness();await h.scope.startCapture(new AbortController().signal);const m=h.S.monitor,c=h.S.capture;h.scope.setInputPlayback(true);c.node.port.onmessage({data:new Float32Array([.5])});await h.scope.stopCapture();assert.equal(h.S.capture,null);assert.equal(h.S.monitor,m);assert.equal(m.ctx.state,'running');assert.equal(h.tracks[0].stopped,undefined);assert.equal(m.playback.gain.value,1);assert.equal(h.scope.recovered.length,3);assert.ok(m.input.connections.has(m.analyser));assert.ok(!m.input.connections.has(c.node));await h.scope.startCapture(new AbortController().signal);assert.equal(h.requests,1);assert.equal(h.S.capture.size,0);});
test('disabling monitor stops tracks, closes context and resets Playback for next activation',async()=>{const h=harness();await h.scope.startMonitor(new AbortController().signal);h.scope.setInputPlayback(true);await h.scope.stopMonitor();assert.equal(h.tracks[0].stopped,true);assert.equal(h.contexts[0].state,'closed');assert.equal(h.S.monitor,null);assert.equal(h.S.listen,false);await h.scope.startMonitor(new AbortController().signal);assert.equal(h.S.monitor.playback.gain.value,0);});
test('permission denial leaves no active input or audio context',async()=>{const h=harness();h.deny();await assert.rejects(h.scope.startMonitor(new AbortController().signal),{name:'NotAllowedError'});assert.equal(h.S.monitor,null);assert.equal(h.contexts.length,0);});
test('cancelled permission response releases the acquired stream',async()=>{const h=harness(),controller=new AbortController();const original=h.scope.navigator.mediaDevices.getUserMedia;h.scope.navigator.mediaDevices.getUserMedia=async()=>{const stream=await original();controller.abort();return stream;};await assert.rejects(h.scope.startMonitor(controller.signal),{name:'AbortError'});assert.equal(h.tracks[0].stopped,true);assert.equal(h.S.monitor,null);assert.equal(h.contexts.length,0);});

test('input disconnection during capture cleanup releases the monitor',async()=>{const h=harness();await h.scope.startCapture(new AbortController().signal);h.scope.setInputPlayback(true);h.S.monitor.stream.active=false;await h.scope.stopCapture();assert.equal(h.S.monitor,null);assert.equal(h.S.listen,false);assert.equal(h.contexts[0].state,'closed');});

test("mono input keeps a single capture channel and left-only monitoring",async()=>{const h=harness();await h.scope.startCapture(new AbortController().signal);const m=h.S.monitor;assert.equal(m.splitter.outputs,2);assert.ok(m.source.connections.has(m.splitter));assert.equal(m.splitter.routes.length,1);assert.equal(m.splitter.routes[0].output,0);assert.equal(m.splitter.routes[0].node,m.input);assert.ok(m.input.connections.has(m.analyser));assert.ok(m.input.connections.has(h.S.capture.node));await h.scope.cleanupCapture(h.S.capture);await h.scope.stopMonitor();assert.equal(m.source.connections.size,0);assert.equal(m.splitter.connections.size,0);});

test("audio engine follows actual input clock instead of the default output clock",async()=>{for(const rate of [48000,44100,96000]){const h=harness(rate);await h.scope.startMonitor(new AbortController().signal);assert.equal(h.S.monitor.ctx.sampleRate,rate);assert.equal(h.S.monitor.ctx.options.latencyHint,"playback");await h.scope.stopMonitor();}});

test('reference capture records both channels upstream of mono monitoring and saves raw stereo',async()=>{const h=harness(48000,2);h.S.referenceDecode=true;await h.scope.startCapture(new AbortController().signal);const c=h.S.capture,m=h.S.monitor;assert.ok(m.source.connections.has(c.node));assert.ok(m.input.connections.has(m.analyser));const pair=[new Float32Array([.25,.5]),new Float32Array([-.1,-.3])];c.node.port.onmessage({data:pair});c.node.port.postMessage=()=>c.node.port.onmessage({data:'flushed'});await h.scope.stopCapture();const v=new DataView(h.S.captured);assert.equal(v.getUint16(22,true),2);assert.equal(v.getInt16(44,true),Math.round(.25*32767));assert.equal(v.getInt16(46,true),Math.round(pair[1][0]*32767));assert.equal(h.scope.recovered.length,2);assert.deepEqual(Array.from(h.scope.recovered[1]),Array.from(pair[1]));assert.ok(!m.source.connections.has(c.node));});

test('stereo capture preserves right-channel PCM with reference correction OFF',async()=>{const h=harness(48000,2);h.S.decodeModeManual=true;h.S.referenceDecode=false;await h.scope.startCapture(new AbortController().signal);const c=h.S.capture,m=h.S.monitor;assert.equal(c.channels,2);assert.equal(c.reference,false);assert.ok(m.source.connections.has(c.node));assert.ok(!m.input.connections.has(c.node));const pair=[new Float32Array([.5,0,-.5]),new Float32Array([-.3,.2,.1])];c.node.port.onmessage({data:pair});c.node.port.postMessage=()=>c.node.port.onmessage({data:'flushed'});await h.scope.stopCapture();const v=new DataView(h.S.captured);assert.equal(v.getUint16(22,true),2);assert.equal(v.getUint32(40,true),12);for(let i=0;i<3;i++)for(let ch=0;ch<2;ch++)assert.equal(v.getInt16(44+(i*2+ch)*2,true),Math.round(pair[ch][i]*32767));assert.equal(m.ctx.state,'running');});
test('mono input cannot be used as a separate stereo reference',async()=>{const h=harness(48000,1);h.S.decodeModeManual=true;h.S.referenceDecode=true;await assert.rejects(h.scope.startCapture(new AbortController().signal),/E_PILOT_CHANNELS/);assert.equal(h.S.capture,null);await h.scope.stopMonitor();});

test('right spectrum uses a separate muted branch and disconnects cleanly',async()=>{const h=harness(48000,2);await h.scope.startMonitor(new AbortController().signal);const m=h.S.monitor;assert.notEqual(m.rightAnalyser,m.analyser);assert.ok(m.splitter.routes.some(r=>r.output===1&&r.node===m.rightAnalyser));assert.equal(m.rightSilent.gain.value,0);assert.ok(!m.rightAnalyser.connections.has(m.playback));h.scope.setInputPlayback(true);assert.equal(m.rightSilent.gain.value,0);await h.scope.stopMonitor();assert.equal(m.rightAnalyser.connections.size,0);assert.equal(m.rightSilent.connections.size,0);});

test('live reference estimate follows tape speed and rejects silence, noise and off-band audio',()=>{
 const context=vm.createContext({});vm.runInContext(source.split('\n').find(l=>l.startsWith('function referenceFrequency(')),context);
 for(const rate of [44100,48000,96000])for(const frequency of [2760,3000,3240]){const samples=Float32Array.from({length:8192},(_,i)=>.3*Math.sin(2*Math.PI*frequency*i/rate));assert.ok(Math.abs(context.referenceFrequency(samples,rate)-frequency)<1);}
 assert.equal(context.referenceFrequency(new Float32Array(8192),48000),null);
 for(const f of [1000,6000])assert.equal(context.referenceFrequency(Float32Array.from({length:8192},(_,i)=>.4*Math.sin(2*Math.PI*f*i/48000)),48000),null);
 let seed=3;const noise=Float32Array.from({length:8192},()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296-.5;});assert.equal(context.referenceFrequency(noise,48000),null);
});

test('explicit mono mode captures only the isolated left branch of a stereo device',async()=>{const h=harness(48000,2);h.S.decodeModeManual=true;h.S.decodeStereo=false;h.S.referenceDecode=false;await h.scope.startCapture(new AbortController().signal);assert.equal(h.S.capture.channels,1);assert.equal(h.S.capture.input,h.S.monitor.input);assert.notEqual(h.S.capture.input,h.S.monitor.source);await h.scope.stopCapture();assert.ok(h.scope.recovered instanceof Float32Array);});

test('input channel detection selects mono or stereo with reference automatically',async()=>{for(const channels of [1,2]){const h=harness(48000,channels);await h.scope.startMonitor(new AbortController().signal);assert.equal(h.S.decodeStereo,channels===2);assert.equal(h.S.referenceDecode,channels===2);}});
test('manual channel selection and reference choice survive automatic detection',async()=>{const h=harness(48000,2);h.S.decodeModeManual=true;h.S.decodeStereo=false;h.S.referenceDecode=false;await h.scope.startMonitor(new AbortController().signal);assert.equal(h.S.decodeStereo,false);assert.equal(h.S.referenceDecode,false);});
test('unknown channel count leaves the existing selection unchanged',()=>{const h=harness();h.S.decodeStereo=true;h.S.referenceDecode=true;h.scope.applyInputChannels(undefined);assert.equal(h.S.decodeStereo,true);assert.equal(h.S.referenceDecode,true);});

function autoStopHarness(channels=1){const h=harness(48000,channels);h.S.autoStop=true;h.S.autoStopSeconds=5;const c={ctx:{sampleRate:48000},stopping:false};h.S.capture=c;let stops=0;h.scope.stopCapture=()=>{stops++;};const block=(level=0)=>Float32Array.from({length:4800},(_,i)=>level*Math.sin(2*Math.PI*1200*i/48000));return {h,c,feed:(levels,n)=>{for(let i=0;i<n;i++)h.scope.checkAutoStop(c,levels.length===1?block(levels[0]):levels.map(block));},stops:()=>stops};}
test('auto stop waits for sustained signal, ignores initial silence and short interruptions, then triggers once',()=>{const a=autoStopHarness();a.feed([0],100);assert.equal(a.stops(),0);a.feed([.1],1);a.feed([0],60);assert.equal(a.stops(),0);a.feed([.1],3);a.feed([0],30);assert.equal(a.stops(),0);a.feed([.1],1);a.feed([0],49);assert.equal(a.stops(),0);a.feed([0],2);assert.equal(a.stops(),1);a.feed([0],100);assert.equal(a.stops(),1);});
test('auto stop considers both channels and respects disabled state and configured duration',()=>{const a=autoStopHarness(2);a.h.S.autoStopSeconds=3;a.feed([0,.1],60);assert.equal(a.stops(),0);a.feed([0,0],31);assert.equal(a.stops(),1);const b=autoStopHarness();b.h.S.autoStop=false;b.feed([.1],5);b.feed([0],100);assert.equal(b.stops(),0);});
test('auto stop follows the normal flush, WAV and decode path without dropping received chunks',async()=>{const h=harness();h.S.autoStop=true;h.S.autoStopSeconds=3;await h.scope.startCapture(new AbortController().signal);const c=h.S.capture,realStop=h.scope.stopCapture;let finished;h.scope.stopCapture=()=>finished=realStop();const tone=Float32Array.from({length:4800},(_,i)=>.1*Math.sin(2*Math.PI*1200*i/48000));for(let i=0;i<3;i++)c.node.port.onmessage({data:tone});for(let i=0;i<31&&!c.stopping;i++)c.node.port.onmessage({data:new Float32Array(4800)});assert.ok(finished);const received=c.size;await finished;assert.equal(h.S.capture,null);assert.equal(h.scope.recovered.length,received);assert.ok(h.S.monitor);});

 test('manual reference OFF survives device selection, refresh and capture startup',async()=>{
 const h=harness(48000,2);h.S.decodeStereo=true;h.S.referenceDecode=true;
 h.scope.on=(id,event,callback)=>{h.scope[id]=callback;};
 for(const id of ['reference-decode','input']){
  const start=source.indexOf("on('"+id+"','change',");
  const handler=source.slice(start,source.indexOf("on('",start+4));
  vm.runInNewContext(handler,h.scope);
 }
 h.scope['reference-decode']({target:{checked:false}});
 h.scope.input({target:{value:'fasttrack'}});
 h.scope.navigator.mediaDevices.enumerateDevices=async()=>[];
 h.scope.renderDevices=()=>{};
 vm.runInNewContext(source.split('\n').find(l=>l.startsWith('async function devices(')),h.scope);
 await h.scope.devices('audioinput',new AbortController().signal);
 await h.scope.startCapture(new AbortController().signal);
 assert.equal(h.S.decodeStereo,true);
 assert.equal(h.S.referenceDecode,false);
 assert.equal(h.S.capture.reference,false);
 assert.equal(h.S.capture.channels,2);
 await h.scope.cleanupCapture(h.S.capture);await h.scope.stopMonitor();
 });
