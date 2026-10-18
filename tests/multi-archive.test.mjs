import test from 'node:test';
import assert from 'node:assert/strict';
import {RATE,pack,unpack,encode} from '../src/assets/codec.js';
import {decodeRecording,referenceWav,stereoDataWav} from '../src/assets/reference.js';
const options={profile:'4fsk2400',redundancy:1};
function pcm(wav){const v=new DataView(wav),n=v.getUint16(22,true);return Array.from({length:n},(_,ch)=>Float32Array.from({length:(wav.byteLength-44)/2/n},(_,i)=>v.getInt16(44+(i*n+ch)*2,true)/32768));}
function join(parts,gap=2*RATE){return parts[0].map((_,ch)=>{const out=new Float32Array(parts.reduce((n,p)=>n+p[ch].length,0)+gap*(parts.length-1));let at=0;for(const p of parts){out.set(p[ch],at);at+=p[ch].length+gap;}return out;});}
for(const mode of ['mono','reference','stereo'])test(`five consecutive single-file archives, two-second gaps: ${mode}`,async()=>{
 const parts=[],original=[];
 for(let i=0;i<5;i++){const bytes=Uint8Array.from({length:2200+i},(_,j)=>(j+i*17)%251);original.push(bytes);const {payload}=await pack([new File([bytes],`file-${i}.bin`)]);
 parts.push(mode==='mono'?[encode(payload,new Float32Array(),()=>{},options)]:pcm((mode==='reference'?referenceWav:stereoDataWav)(payload,new Float32Array(),()=>{},options).wav));}
 const archives=decodeRecording(join(parts),()=>{},{reference:mode==='reference',autoSpeed:false});assert.equal(archives.length,5);
 const files=(await Promise.all(archives.map(a=>unpack(a.payload)))).flat();assert.equal(files.length,5);
 for(let i=0;i<5;i++){assert.equal(files[i].name,`file-${i}.bin`);assert.deepEqual(files[i].bytes,original[i]);}
});
test('back-to-back archives and repeated copies do not duplicate files',async()=>{
 const {payload}=await pack([new File(['hello'],'hello.txt')]),{payload:other}=await pack([new File(['world'],'world.txt')]);
 const signal=p=>[encode(p,new Float32Array(),()=>{},{...options,redundancy:2})];
 const archives=decodeRecording(join([signal(payload),signal(payload),signal(other)],0),()=>{},{autoSpeed:false});assert.equal(archives.length,2);
});
test('silence does not produce a successful empty recovery',()=>assert.throws(()=>decodeRecording([new Float32Array(RATE)],()=>{},{autoSpeed:false}),/E_SIGNAL/));
test('worker verifies and returns every file from one capture',async()=>{
 const messages=[];globalThis.self={postMessage:message=>messages.push(message)};
 try{await import('../src/assets/worker.js');const parts=[];
 for(let i=0;i<5;i++){const {payload}=await pack([new File([`content ${i}`],`file-${i}.txt`)]);parts.push([encode(payload,new Float32Array(),()=>{},options)]);}
 await self.onmessage({data:{id:7,op:'decode',samples:join(parts)[0],autoSpeed:false,reference:false}});
 const final=messages.at(-1);assert.equal(final.error,undefined);assert.equal(final.result.files.length,5);assert.equal(final.result.archiveCount,5);
 }finally{delete globalThis.self;}
});
