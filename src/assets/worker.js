import {referenceWav,correctReference,REFERENCE_HZ} from './reference.js';
import {encode,encodeWav,decode,wav,pack,unpack,payloadSize,layout,retime,blockLocations} from './codec.js';
self.onmessage=async({data:d})=>{
 const report=(stage,value=null,extra={})=>self.postMessage({id:d.id,progress:{stage,value,...extra}});
 try{
  let result;
  if(d.op==='encode'){
   report('preparing');if(layout(payloadSize(d.files),d.intro?.length||0,d.options).wavBytes*(d.options?.reference?2:1)>0xffffffff)throw Error('E_FORMAT');const p=await pack(d.files);report('encoding',0);
   const encoded=(d.options?.reference?referenceWav:encodeWav)(p.payload,d.intro,v=>report('encoding',v),d.options);
   result={...encoded,entries:p.entries.map(({bytes,...e})=>e)};
   self.postMessage({id:d.id,result},[encoded.wav,encoded.peaks.buffer]);return;
  }
  if(d.op==='decode'){
   let samples=d.samples,pilotResult=null;if(d.reference){report('correcting');pilotResult=correctReference(samples,d.pilot,v=>report('correcting',v));samples=pilotResult.samples;}report('scanning');const r=decode(samples,(v,detail={})=>report(detail.phase||'decoding',detail.phase?null:v,detail),{autoSpeed:!d.reference&&d.autoSpeed!==false});report('verifying');
   result={files:await unpack(r.payload),offset:r.offset,profile:r.profile,redundancy:r.redundancy,blocks:r.blocks,recoveredCopies:r.recoveredCopies,speedOffset:r.speedOffset,version:r.version,reference:!!pilotResult,referenceSpeed:pilotResult?.meanSpeed};
  }
  if(d.op==='benchmark'){
   const p=await pack(d.files),original=encode(p.payload,new Float32Array(),()=>{},d.options),cases=[{key:'clean'},{key:'noise',noise:.3},{key:'slow',speed:.97},{key:'fast',speed:1.03},{key:'dropout',dropout:true},{key:'combined',speed:1.03,noise:.1}],rows=[];
   let seed=42;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
   for(let i=0;i<cases.length;i++){
    report('benchmark',i/cases.length,{current:i+1,total:cases.length});
    const c=cases[i];let s=original.map(x=>x*.65+(random()-.5)*(c.noise||0));
    if(c.dropout){const first=blockLocations(p.payload.length,0,d.options)[0];s.fill(0,first.data+200,Math.min(first.end,first.data+200+1920));}
    let pilot=d.options?.reference?Float32Array.from({length:original.length},(_,j)=>.3*Math.sin(2*Math.PI*REFERENCE_HZ*j/48000)):null;if(c.speed){s=retime(s,1/c.speed);if(pilot)pilot=retime(pilot,1/c.speed);}let ok=false,details=null;
    try{const corrected=pilot?correctReference(s,pilot):null;const decoded=decode(corrected?corrected.samples:s,()=>{},{autoSpeed:!pilot});await unpack(decoded.payload);ok=true;details={speedOffset:decoded.speedOffset,recoveredCopies:decoded.recoveredCopies};}catch{}
    const row={key:c.key,ok,...details};rows.push(row);report('benchmark',(i+1)/cases.length,{row,current:i+1,total:cases.length});
   }result={rows};
  }
  self.postMessage({id:d.id,result});
 }catch(e){self.postMessage({id:d.id,details:e.details,error:e instanceof RangeError?'E_MEMORY':/^E_/.test(e.message)?e.message:'E_ARCHIVE'});}
};
