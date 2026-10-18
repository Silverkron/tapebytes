import test from 'node:test';
import assert from 'node:assert/strict';
import {PROFILES,RATE,encode,decodeChannels,layout,capacity,blockLocations,pack,unpack,retime} from '../src/assets/codec.js';
import {stereoDataWav} from '../src/assets/reference.js';
const payload=Uint8Array.from({length:2357},(_,i)=>(i*73+19)%251);
function channels(buffer){const v=new DataView(buffer),n=(buffer.byteLength-44)/4;assert.equal(v.getUint16(22,true),2);return [0,1].map(c=>Float32Array.from({length:n},(_,i)=>v.getInt16(44+(i*2+c)*2,true)/32768));}
function audio(bytes=payload,redundancy=1,profile='4fsk2400'){return channels(stereoDataWav(bytes,new Float32Array(),()=>{},{profile,redundancy}).wav);}
test('stereo payloads round-trip every modulation with all copy counts',()=>{
 for(const p of PROFILES)for(const redundancy of [1,2,3,5]){
  const options={profile:p.id,redundancy,stereoData:true},wav=stereoDataWav(payload,new Float32Array(),()=>{},options),pair=channels(wav.wav),result=decodeChannels(pair);
  assert.deepEqual(result.payload,payload);assert.equal(result.version,4);assert.equal(result.redundancy,redundancy);assert.equal(wav.wav.byteLength,layout(payload.length,0,options).wavBytes);assert.equal(pair[0].length/RATE,wav.duration);
 }
});
test('double copies place every block in both lanes at different times; either isolated mono lane recovers',()=>{
 const opts={profile:'4fsk2400',redundancy:2,stereoData:true},locations=blockLocations(payload.length,0,opts),pair=audio(payload,2);
 for(let i=0;i<3;i++){const copies=locations.filter(b=>b.index===i);assert.notEqual(copies[0].channel,copies[1].channel);assert.notEqual(copies[0].start,copies[1].start);}
 for(const lane of pair)assert.deepEqual(decodeChannels([lane]).payload,payload);
});
test('single-copy stereo rejects incomplete mono; two-channel downmix is not treated as a valid file',()=>{
 const pair=audio();assert.throws(()=>decodeChannels([pair[0]]),/E_STEREO_MONO/);assert.throws(()=>decodeChannels([pair[1]]),/E_STEREO_MONO/);
 const mixed=pair[0].map((x,i)=>(x+pair[1][i])/2);assert.throws(()=>decodeChannels([mixed]));
});
test('crossed copies recover complementary dropouts and reject loss of both copies',()=>{
 const opts={profile:'4fsk2400',redundancy:2,stereoData:true},loc=blockLocations(payload.length,0,opts),pair=audio(payload,2);
 for(const b of loc)if(b.copy===0)pair[b.channel].fill(0,b.start,b.end);
 assert.deepEqual(decodeChannels(pair).payload,payload);
 for(const b of loc)if(b.index===1)pair[b.channel].fill(0,b.start,b.end);
 assert.throws(()=>decodeChannels(pair),/E_BLOCKS/);
});
test('channels can be swapped, offset and independently speed corrected; mismatched archives never combine',()=>{
 const pair=audio(),shift=lane=>{const out=new Float32Array(lane.length+137);out.set(lane,137);return out;};
 assert.deepEqual(decodeChannels([shift(pair[1]),pair[0]]).payload,payload);
 assert.deepEqual(decodeChannels(pair.map(a=>retime(a,1/1.03))).payload,payload);
 const other=audio(payload.map(x=>x^0x55));assert.throws(()=>decodeChannels([pair[0],other[1]]),/E_BLOCKS/);
});
test('one file is reconstructed and verified; legacy mono remains readable',async()=>{
 const original=new File([payload],'one.bin'),packed=await pack([original]);const result=await unpack(decodeChannels(audio(packed.payload,2)).payload);assert.equal(result.length,1);assert.deepEqual(result[0].bytes,payload);
 assert.deepEqual(decodeChannels([encode(payload,new Float32Array(),()=>{},{profile:'4fsk2400'})]).payload,payload);
});
test('capacity and sample count include stereo padding and copies at block boundaries',()=>{
 for(const redundancy of [1,2,3,5])for(const bytes of [0,1,1024,1025,2048,2049,4096]){
  const options={profile:'4fsk2400',redundancy,stereoData:true},plan=layout(bytes,0,options),locations=blockLocations(bytes,0,options);assert.equal(plan.samples,Math.max(...locations.map(x=>x.end))+RATE/4);
 }
 const options={profile:'fsk300',redundancy:1,stereoData:true},c=capacity([],1800,0,options),mono=capacity([],1800,0,{profile:'fsk300',redundancy:1});assert.ok(c.budget>mono.budget*1.9);assert.ok(layout(c.budget+c.overhead,0,options).duration<=1800);assert.ok(layout(c.budget+c.overhead+1,0,options).duration>1800);
});

test('two-copy reference mode keeps the data channel compatible and verifies through the pilot',async()=>{const {referenceWav,correctReference}=await import('../src/assets/reference.js');const pair=channels(referenceWav(payload,new Float32Array(),()=>{},{profile:'4fsk2400',redundancy:2}).wav);const result=decodeChannels([correctReference(...pair).samples],()=>{},{autoSpeed:false});assert.deepEqual(result.payload,payload);assert.equal(result.version,3);assert.equal(result.redundancy,2);});
