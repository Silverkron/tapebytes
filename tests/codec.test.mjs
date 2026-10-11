import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {RATE,SPB,encode,decode,wav,pack,unpack,crc32,frame,PROFILES,encodeWav,layout,capacity,payloadSize,blockLocations,retime,estimateSpeed} from '../dist/codec.js';
function file(name,bytes,type='application/octet-stream'){return new File([bytes],name,{type});}
function pcm(samples){const b=wav(samples),v=new DataView(b);return Float32Array.from({length:(b.byteLength-44)/2},(_,i)=>v.getInt16(44+2*i,true)/32768);}
function voiceSamples(){const b=fs.readFileSync(new URL('../dist/audio/en.wav',import.meta.url));assert.ok(b.length>RATE*2,'The spoken intro must contain actual audio');let pos=12;while(pos<b.length){const size=b.readUInt32LE(pos+4);if(b.toString('ascii',pos,pos+4)==='data')return Float32Array.from({length:size/2},(_,i)=>b.readInt16LE(pos+8+i*2)/32768);pos+=8+size+(size%2);}throw Error('WAV data missing');}
test('standard CRC32 test vector',()=>assert.equal(crc32(new TextEncoder().encode('123456789')),0xcbf43926));
test('complete WAV with real spoken intro restores multiple files and all byte values',async()=>{
  const originals=[file('memorie/日本語.txt','Ciao dal futuro!'),file('binary.bin',Uint8Array.from({length:256},(_,i)=>i)),file('empty',new Uint8Array())];
  const {payload}=await pack(originals),samples=pcm(encode(payload,voiceSamples())),r=await unpack(decode(samples).payload);
  for(let i=0;i<originals.length;i++){assert.equal(r[i].name,originals[i].name);assert.deepEqual(r[i].bytes,new Uint8Array(await originals[i].arrayBuffer()));}
});
test('arbitrary leading offsets, attenuation, noise and polarity inversion recover identical bytes',async()=>{
  const {payload}=await pack([file('offset.bin',Uint8Array.from({length:512},(_,i)=>(i*73)&255))]),s=encode(payload);
  for(const offset of [1,37,79,123,159,4007]){const out=new Float32Array(s.length+offset);let seed=42;for(let i=0;i<s.length;i++){seed=(seed*1664525+1013904223)>>>0;out[i+offset]=-s[i]*.3+((seed/4294967296)-.5)*.04;}assert.deepEqual(decode(out).payload,payload);}
});
test('corrupt and truncated blocks are rejected without returning files',async()=>{
 const {payload}=await pack([file('test.txt','Una memoria importante')]),s=encode(payload),first=blockLocations(payload.length)[0];s.fill(0,first.data,first.data+1280);
 assert.throws(()=>decode(s),/E_BLOCKS/);assert.throws(()=>decode(encode(payload).slice(0,first.end-800)),/E_BLOCKS/);
});
test('SHA rejects altered archive even with a newly valid transport CRC',async()=>{const {payload}=await pack([file('one.txt','contenuto')]);payload[payload.length-1]^=1;await assert.rejects(()=>unpack(decode(encode(payload)).payload),/E_SHA/);});
test('empty and malformed containers are rejected',async()=>{await assert.rejects(()=>pack([]),/E_LIMIT/);await assert.rejects(()=>unpack(new Uint8Array([255,255,255,255])),/E_ARCHIVE/);assert.throws(()=>decode(new Float32Array(RATE)),/E_SIGNAL/);});
test('input beyond the previous 16 KiB cap round-trips',async()=>{const f=file('max.bin',Uint8Array.from({length:20480},(_,i)=>i%256)),{payload}=await pack([f]);const recovered=await unpack(decode(pcm(encode(payload))).payload);assert.deepEqual(recovered[0].bytes,new Uint8Array(await f.arrayBuffer()));});

test('every profile and repetition factor survives PCM quantization and arbitrary offsets',async()=>{
 const {payload}=await pack([file('test.bin',Uint8Array.from({length:64},(_,i)=>i*3))]);
 for(const p of PROFILES)for(const redundancy of [1,3,5]){const options={profile:p.id,redundancy},s=pcm(encode(payload,new Float32Array(),()=>{},options));for(const offset of [0,13,37,79,123]){const shifted=new Float32Array(s.length+offset);for(let i=0;i<s.length;i++)shifted[i+offset]=-s[i]*.4;const r=decode(shifted);assert.deepEqual(r.payload,payload,`${p.id}/${redundancy}/${offset}`);assert.equal(r.profile,p.id);assert.equal(r.redundancy,redundancy);}}
});
test('copies recover complementary damaged blocks and headers',()=>{
 const payload=Uint8Array.from({length:2600},(_,i)=>i%251);
 for(const profile of ['fsk300','4fsk2400']){const options={profile,redundancy:3},s=encode(payload,new Float32Array(),()=>{},options),locations=blockLocations(payload.length,0,options);
 for(const b of locations)if(b.copy===0&&b.index===0||b.copy===1&&b.index===1||b.copy===2&&b.index===2)s.fill(0,b.data+3000,Math.min(b.end,b.data+9000));
 const r=decode(s);assert.deepEqual(r.payload,payload);assert.equal(r.blocks,3);assert.equal(r.recoveredCopies,1);
 const headerLost=encode(payload,new Float32Array(),()=>{},options);headerLost.fill(0,locations[0].header,locations[0].data);assert.deepEqual(decode(headerLost).payload,payload);
 }
});
test('missing blocks report exact counts and never return incomplete data',()=>{
 const payload=new Uint8Array(2600),options={profile:'4fsk2400',redundancy:3},s=encode(payload,new Float32Array(),()=>{},options);
 for(const b of blockLocations(payload.length,0,options))if(b.index===1)s.fill(0,b.data,b.end);
 // Nonzero content is required so silence cannot accidentally encode the correct bytes.
 const patterned=Uint8Array.from({length:2600},(_,i)=>i%251),damaged=encode(patterned,new Float32Array(),()=>{},options);
 for(const b of blockLocations(patterned.length,0,options))if(b.index===1)damaged.fill(0,b.data,b.end);
 assert.throws(()=>decode(damaged),e=>e.message==='E_BLOCKS'&&e.details.received===2&&e.details.total===3);
});
test('constant speed correction handles ±5%, noise, offset and reversed polarity',()=>{
 const payload=Uint8Array.from({length:2500},(_,i)=>(i*73+11)%256);
 for(const profile of ['fsk300','4fsk2400'])for(const speed of [.95,.97,1.03,1.05]){const s=encode(payload,new Float32Array(),()=>{},{profile,redundancy:1}),shifted=retime(s,1/speed);let seed=42;const input=new Float32Array(shifted.length+123);
 for(let i=0;i<shifted.length;i++){seed=(1664525*seed+1013904223)>>>0;input[i+123]=-shifted[i]*.65+(seed/4294967296-.5)*.08;}
 const r=decode(input);assert.deepEqual(r.payload,payload,profile+'/'+speed);assert.ok(Math.abs(r.speedOffset-(speed-1)*100)<.01);
 }
 const altered=retime(encode(payload,new Float32Array(),()=>{},{profile:'4fsk2400'}),1/1.03);assert.throws(()=>decode(altered,()=>{},{autoSpeed:false}));
});
test('capacity accounts for each block header and exact boundaries',()=>{
 for(const profile of PROFILES)for(const redundancy of [1,3,5]){const options={profile:profile.id,redundancy},files=[{name:'test',size:1024,type:''}],c=capacity(files,900,0,options);assert.ok(layout(c.budget+c.overhead,0,options).duration<=900);assert.ok(layout(c.budget+c.overhead+1,0,options).duration>900);}
});
test('size-only capacity matches actual archives and generated WAV exactly',async()=>{
 const files=[file('日本語/notes.txt','hello'),file('zero',new Uint8Array())],{payload}=await pack(files);assert.equal(payloadSize(files),payload.length);
 for(const p of PROFILES)for(const redundancy of [1,3,5]){const options={profile:p.id,redundancy},intro=new Float32Array(271211),c=capacity(files,900,intro.length,options),r=encodeWav(payload,intro,()=>{},options);assert.equal(c.wavBytes,r.wav.byteLength);assert.equal(c.duration,r.duration);assert.deepEqual(new Uint8Array(r.wav),new Uint8Array(wav(encode(payload,intro,()=>{},options))));assert.equal(c.remaining,c.budget-5);}
 const large=[{name:'large',type:'',size:1000000}];assert.ok(capacity(large,900).remaining<0);assert.ok(layout(0xffffffff).wavBytes>0xffffffff); 
});
test('more than 32 files are accepted and legacy TVFSK001 WAV remains readable',async()=>{
 const files=Array.from({length:40},(_,i)=>file(`${i}.txt`,String(i))),{payload}=await pack(files);assert.equal((await unpack(payload)).length,40);
 const b=fs.readFileSync(new URL('./fixtures/legacy.wav',import.meta.url)),s=Float32Array.from({length:(b.length-44)/2},(_,i)=>b.readInt16LE(44+i*2)/32768);assert.equal(new TextDecoder().decode((await unpack(decode(s).payload))[0].bytes),'legacy compatibility');
});

test('legacy TVFSK002 with symbol repetition remains readable, including speed correction',async()=>{
 const b=fs.readFileSync(new URL('./fixtures/v2.wav',import.meta.url)),s=Float32Array.from({length:(b.length-44)/2},(_,i)=>b.readInt16LE(44+i*2)/32768);
 for(const speed of [1,1.03]){const r=decode(retime(s,1/speed));assert.equal(new TextDecoder().decode((await unpack(r.payload))[0].bytes),'version two redundancy');assert.equal(r.redundancy,3);}
});
