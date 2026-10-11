export const RATE=48000,BAUD=300,SPB=160,MAX_PAYLOAD=0xffffffff;
export const PROFILES=[
 {id:'fsk300',label:'FSK · 300 bit/s',rate:300,bits:1,tones:[1200,2400]},
 {id:'fsk600',label:'FSK · 600 bit/s',rate:600,bits:1,tones:[1200,2400]},
 {id:'fsk1200',label:'FSK · 1200 bit/s',rate:1200,bits:1,tones:[1200,2400]},
 {id:'4fsk1200',label:'4-FSK · 1200 bit/s',rate:1200,bits:2,tones:[1200,1800,2400,3000]},
 {id:'4fsk2400',label:'4-FSK · 2400 bit/s',rate:2400,bits:2,tones:[1200,2400,3600,4800]}
];
export function settings(options={}){const profile=PROFILES.find(p=>p.id===(options.profile||'fsk300')),redundancy=options.redundancy??1;if(!profile||![1,3,5].includes(redundancy))throw Error('E_PROFILE');return {profile,redundancy};}
export function crc32(bytes){let c=0xffffffff;for(const b of bytes){c^=b;for(let j=0;j<8;j++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^0xffffffff)>>>0;}
export function metadata(files){return files.map(f=>({name:f.webkitRelativePath||f.name,size:f.size,type:f.type||'application/octet-stream',sha256:'0'.repeat(64)}));}
export function payloadSize(files){return 4+new TextEncoder().encode(JSON.stringify(metadata(files))).length+files.reduce((n,f)=>n+f.size,0);}
export function frame(payload,options={}){const {profile,redundancy}=settings(options);const h=new Uint8Array(24),v=new DataView(h.buffer);h.set(new TextEncoder().encode('TVFSK002'));h[8]=PROFILES.indexOf(profile);h[9]=redundancy;v.setUint32(12,payload.length,true);v.setUint32(16,crc32(payload),true);v.setUint32(20,crc32(h.subarray(8,20)),true);return h;}
function wavHeader(buffer,length){const v=new DataView(buffer),str=(p,s)=>{for(let i=0;i<s.length;i++)v.setUint8(p+i,s.charCodeAt(i));};str(0,'RIFF');v.setUint32(4,36+length*2,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,RATE,true);v.setUint32(28,RATE*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,length*2,true);return v;}
export function encode(payload,intro=new Float32Array(),progress=()=>{},options={}){return synthesize(payload,intro,progress,options,false);}
export function encodeWav(payload,intro=new Float32Array(),progress=()=>{},options={}){return synthesize(payload,intro,progress,options,true);}
function detector(profile){const size=RATE*profile.bits/profile.rate,coeff=profile.tones.map(f=>2*Math.cos(2*Math.PI*f/RATE));return (samples,pos)=>{let best=-Infinity,which=0;for(let t=0;t<coeff.length;t++){let p=0,q=0;for(let i=0;i<size;i++){const n=(samples[pos+i]||0)+coeff[t]*p-q;q=p;p=n;}const power=p*p+q*q-coeff[t]*p*q;if(power>best){best=power;which=t;}}return which;};}
function readBytes(samples,start,n,profile=PROFILES[0],repeat=1,progress=()=>{}){const step=RATE*profile.bits/profile.rate,symbols=8/profile.bits;if(!Number.isSafeInteger(n)||n<0||start+n*symbols*repeat*step>samples.length)throw Error('E_TRUNCATED');const bytes=new Uint8Array(n),symbol=detector(profile);let pos=start;for(let k=0;k<n;k++){for(let b=0;b<symbols;b++){const votes=new Uint8Array(profile.tones.length);for(let r=0;r<repeat;r++){votes[symbol(samples,pos)]++;pos+=step;}let winner=0;for(let t=1;t<votes.length;t++)if(votes[t]>votes[winner])winner=t;bytes[k]=(bytes[k]<<profile.bits)|winner;}if(k%128===0)progress(k/n);}progress(1);return bytes;}
function decodeLegacy(samples,progress=()=>{}){const symbol=detector(PROFILES[0]);let sawFrame=false,lastError='E_SIGNAL';for(let phase=0;phase<SPB;phase+=SPB/4){let hi=0,lo=0;const limit=Math.min(samples.length-64*SPB,60*RATE);for(let pos=phase;pos<limit;pos+=SPB){hi=((hi<<1)|(lo>>>31))>>>0;lo=((lo<<1)|symbol(samples,pos))>>>0;if(hi!==0x54564653||![0x4b303031,0x4b303032].includes(lo))continue;sawFrame=true;try{const start=pos+SPB;let n,crc,dataStart,profile=PROFILES[0],repeat=1;if(lo===0x4b303031){const h=readBytes(samples,start,8),v=new DataView(h.buffer);n=v.getUint32(0,true);crc=v.getUint32(4,true);dataStart=start+64*SPB;}else{const h=readBytes(samples,start,16),v=new DataView(h.buffer);if(crc32(h.subarray(0,12))!==v.getUint32(12,true))throw Error('E_CRC');if(!PROFILES[h[0]]||![1,3,5].includes(h[1])||h[2]||h[3])throw Error('E_PROFILE');profile=PROFILES[h[0]];repeat=h[1];n=v.getUint32(4,true);crc=v.getUint32(8,true);dataStart=start+128*SPB;}
// Refine payload alignment independently from the fixed 300-bit/s header.
const step=RATE*profile.bits/profile.rate,offsets=[0];if(lo===0x4b303032)for(let d=step/4;d<=SPB/4;d+=step/4)offsets.push(d,-d);
let payloadError='E_CRC';for(const delta of offsets){try{const payload=readBytes(samples,dataStart+delta,n,profile,repeat,progress);if(crc32(payload)!==crc)throw Error('E_CRC');return {payload,offset:pos-63*SPB,profile:profile.id,redundancy:repeat};}catch(e){payloadError=e.message;}}throw Error(payloadError);
}catch(e){lastError=e.message;}}}throw Error(sawFrame?lastError:'E_SIGNAL');}
export function wav(samples,progress=()=>{}){if(44+samples.length*2>0xffffffff)throw Error('E_FORMAT');const data=new ArrayBuffer(44+samples.length*2),v=wavHeader(data,samples.length);for(let i=0;i<samples.length;i++){v.setInt16(44+i*2,Math.round(Math.max(-1,Math.min(1,samples[i]))*32767),true);if(i%480000===0)progress(i/samples.length);}progress(1);return data;}
export async function sha(bytes){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');}
export async function pack(files){if(!files.length)throw Error('E_LIMIT');if(payloadSize(files)>MAX_PAYLOAD)throw Error('E_FORMAT');let total=0;const entries=[];for(const f of files){const bytes=new Uint8Array(await f.arrayBuffer());total+=bytes.length;entries.push({name:f.webkitRelativePath||f.name,size:bytes.length,type:f.type||'application/octet-stream',sha256:await sha(bytes),bytes});}const manifest=new TextEncoder().encode(JSON.stringify(entries.map(({bytes,...e})=>e)));const payload=new Uint8Array(4+manifest.length+total);new DataView(payload.buffer).setUint32(0,manifest.length,true);payload.set(manifest,4);let p=4+manifest.length;for(const e of entries){payload.set(e.bytes,p);p+=e.size;}return {payload,entries};}
export async function unpack(payload){if(payload.length<4)throw Error('E_ARCHIVE');const m=new DataView(payload.buffer,payload.byteOffset,payload.byteLength).getUint32(0,true);if(m>payload.length-4)throw Error('E_ARCHIVE');const entries=JSON.parse(new TextDecoder().decode(payload.subarray(4,4+m)));if(!Array.isArray(entries)||!entries.length)throw Error('E_ARCHIVE');let pos=4+m;const files=[];for(const e of entries){if(typeof e.name!=='string'||!Number.isSafeInteger(e.size)||e.size<0||pos+e.size>payload.length)throw Error('E_META');const bytes=payload.slice(pos,pos+e.size);pos+=e.size;if(await sha(bytes)!==e.sha256)throw Error('E_SHA');files.push({...e,bytes});}if(pos!==payload.length)throw Error('E_ARCHIVE');return files;}

// TVBLK003: independent 1024-byte blocks, each with a robust 300-bit/s header.
export const BLOCK_BYTES=1024, BLOCK_HEADER_BYTES=40, BLOCK_PREAMBLE=32;
export const BLOCK_FIXED=RATE/20+(BLOCK_PREAMBLE+BLOCK_HEADER_BYTES*8)*SPB;
export function layout(bytes,introSamples=0,options={}){
 const {profile,redundancy}=settings(options);
 if(!Number.isSafeInteger(bytes)||bytes<0||bytes>MAX_PAYLOAD)throw Error('E_FORMAT');
 const blocks=Math.max(1,Math.ceil(bytes/BLOCK_BYTES)),fixed=introSamples+RATE*1.75+blocks*redundancy*BLOCK_FIXED;
 const samples=fixed+bytes*8*RATE/profile.rate*redundancy;
 return {samples,duration:samples/RATE,wavBytes:44+samples*2,fixedSeconds:fixed/RATE,bytesPerSecond:profile.rate/8/redundancy,blocks,copies:redundancy};
}
export function capacity(files,sideSeconds,introSamples=0,options={}){
 const raw=files.reduce((n,f)=>n+f.size,0),payload=payloadSize(files),overhead=payload-raw,plan=layout(payload,introSamples,options);
 // Header overhead increases at each block boundary; solve the exact discrete budget.
 let lo=0,hi=Math.min(MAX_PAYLOAD,Math.floor(sideSeconds*settings(options).profile.rate/8));
 while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(layout(mid,introSamples,options).duration<=sideSeconds)lo=mid;else hi=mid-1;}
 const budget=Math.max(0,lo-overhead);
 return {...plan,raw,payload,overhead,budget,remaining:budget-raw,remainingSeconds:sideSeconds-plan.duration,percent:plan.duration/sideSeconds*100};
}
function blockHeader(payload,chunk,index,copy,options,archiveCRC){
 const {profile,redundancy}=settings(options),h=new Uint8Array(BLOCK_HEADER_BYTES),v=new DataView(h.buffer);
 h.set(new TextEncoder().encode('TVBLK003'));h[8]=PROFILES.indexOf(profile);h[9]=redundancy;h[10]=copy;
 v.setUint32(12,payload.length,true);v.setUint32(16,archiveCRC,true);v.setUint32(20,index,true);v.setUint32(24,Math.max(1,Math.ceil(payload.length/BLOCK_BYTES)),true);v.setUint32(28,chunk.length,true);v.setUint32(32,crc32(chunk),true);v.setUint32(36,crc32(h.subarray(8,36)),true);return h;
}
export function blockLocations(bytes,introSamples=0,options={}){
 const {profile,redundancy}=settings(options),count=Math.max(1,Math.ceil(bytes/BLOCK_BYTES)),out=[];let pos=introSamples+RATE*1.5;
 for(let copy=0;copy<redundancy;copy++)for(let index=0;index<count;index++){
  const length=Math.min(BLOCK_BYTES,bytes-index*BLOCK_BYTES),data=pos+BLOCK_FIXED,end=data+length*8*RATE/profile.rate;
  out.push({copy,index,start:pos,header:pos+RATE/20+BLOCK_PREAMBLE*SPB,data,end,length});pos=end;
 }return out;
}
function synthesize(payload,intro,progress,options,pcm){
 const {profile}=settings(options),plan=layout(payload.length,intro.length,options);if(plan.wavBytes>0xffffffff)throw Error('E_FORMAT');
 const out=pcm?new ArrayBuffer(plan.wavBytes):new Float32Array(plan.samples),view=pcm?wavHeader(out,plan.samples):null,peaks=new Float32Array(640);
 let pos=0;const put=x=>{if(view)view.setInt16(44+pos*2,Math.round(Math.max(-1,Math.min(1,x))*32767),true);else out[pos]=x;const k=Math.min(639,Math.floor(pos/plan.samples*640));peaks[k]=Math.max(peaks[k],Math.abs(x));pos++;};
 const toneCache=new Map();const tonesFor=p=>{if(!toneCache.has(p.id))toneCache.set(p.id,p.tones.map(f=>Float32Array.from({length:RATE*p.bits/p.rate},(_,i)=>.5*Math.sin(2*Math.PI*f*i/RATE))));return toneCache.get(p.id);};
 const emit=(bytes,p)=>{const tones=tonesFor(p);for(const byte of bytes)for(let shift=8-p.bits;shift>=0;shift-=p.bits)for(const x of tones[(byte>>shift)&(tones.length-1)])put(x);};
 for(const x of intro)put(x);pos+=RATE/2;for(let i=0;i<RATE;i++)put(.5*Math.sin(2*Math.PI*1200*i/RATE));
 const locations=blockLocations(payload.length,intro.length,options),archiveCRC=crc32(payload),sync=tonesFor(PROFILES[0]);
 for(let j=0;j<locations.length;j++){const b=locations[j],chunk=payload.subarray(b.index*BLOCK_BYTES,b.index*BLOCK_BYTES+b.length);pos+=RATE/20;for(let k=0;k<BLOCK_PREAMBLE;k++)for(const x of sync[k%2])put(x);emit(blockHeader(payload,chunk,b.index,b.copy,options,archiveCRC),PROFILES[0]);emit(chunk,profile);progress((j+1)/locations.length,{blocks:plan.blocks,copy:b.copy+1,index:b.index+1});}
 return pcm?{wav:out,peaks,duration:plan.duration,blocks:plan.blocks}:out;
}
function blockFailure(received,total){const e=Error('E_BLOCKS');e.details={received,total};return e;}
function decodeBlocks(samples,progress=()=>{}){
 const symbol=detector(PROFILES[0]),groups=new Map();let validHeader=false,best={received:0,total:0};
 for(let phase=0;phase<SPB;phase+=SPB/4){let hi=0,lo=0;
  for(let pos=phase;pos+SPB<=samples.length;pos+=SPB){hi=((hi<<1)|(lo>>>31))>>>0;lo=((lo<<1)|symbol(samples,pos))>>>0;
   if(hi!==0x5456424c||lo!==0x4b303033)continue;
   try{
    const start=pos+SPB,h=readBytes(samples,start,BLOCK_HEADER_BYTES-8),v=new DataView(h.buffer);
    if(crc32(h.subarray(0,28))!==v.getUint32(28,true))continue;
    const profile=PROFILES[h[0]],repeat=h[1],copy=h[2],length=v.getUint32(4,true),archiveCRC=v.getUint32(8,true),index=v.getUint32(12,true),count=v.getUint32(16,true),n=v.getUint32(20,true),crc=v.getUint32(24,true);
    if(!profile||![1,3,5].includes(repeat)||copy>=repeat||h[3]||count!==Math.max(1,Math.ceil(length/BLOCK_BYTES))||index>=count||n!==Math.min(BLOCK_BYTES,length-index*BLOCK_BYTES))continue;
    validHeader=true;const key=[length,archiveCRC,profile.id,repeat].join('/');
    let g=groups.get(key);if(!g){g={chunks:new Map(),count,length,archiveCRC,profile:profile.id,redundancy:repeat,offset:pos-63*SPB,fromCopies:0};groups.set(key,g);}
    const dataStart=start+(BLOCK_HEADER_BYTES-8)*8*SPB,step=RATE*profile.bits/profile.rate,end=dataStart+n*8*RATE/profile.rate;
    if(!g.chunks.has(index)){
     const offsets=[0];for(let d=step/4;d<=SPB/4;d+=step/4)offsets.push(d,-d);
     for(const delta of offsets){try{const chunk=readBytes(samples,dataStart+delta,n,profile);if(crc32(chunk)===crc){g.chunks.set(index,chunk);if(copy>0)g.fromCopies++;break;}}catch(e){if(e.message!=='E_TRUNCATED')throw e;}}
     if(g.chunks.size>best.received)best={received:g.chunks.size,total:count};else if(!best.total)best={received:0,total:count};
     progress(g.chunks.size/count,{received:g.chunks.size,total:count});
    }
    if(g.chunks.size===count){const payload=new Uint8Array(length);for(const [i,chunk]of g.chunks)payload.set(chunk,i*BLOCK_BYTES);if(crc32(payload)!==archiveCRC)throw Object.assign(Error('E_CRC'),{archive:true});return {payload,offset:g.offset,profile:g.profile,redundancy:g.redundancy,blocks:count,recoveredCopies:g.fromCopies,version:3};}
    // Header CRC validates the length; skip the data and search the next sync.
    pos=Math.max(pos,Math.floor((end-phase)/SPB)*SPB-SPB);hi=0;lo=0;
   }catch(e){if(e.archive||!['E_TRUNCATED','E_CRC'].includes(e.message))throw e;}
  }
 }
 if(validHeader)throw blockFailure(best.received,best.total);throw Error('E_SIGNAL');
}
// Estimate a constant tape-speed offset from a sustained 1200-Hz pilot.
// Linear regression across zero crossings averages local noise; CRC validates any correction.
export function estimateSpeed(samples){
 const limit=Math.min(samples.length,60*RATE),candidates=[];
 for(let start=0;start+RATE*.4<limit;start+=2048){
  const points=[];let energy=0;const end=start+19200;
  for(let i=start;i<end;i++){const x=samples[i],y=samples[i+1];energy+=x*x;if(x<=0&&y>0){const crossing=i-x/(y-x);if(!points.length||crossing-points[points.length-1]>25)points.push(crossing);}}
  if(energy/19200<1e-6||points.length<430||points.length>540)continue;
  let sx=0,sy=0,sxx=0,sxy=0;for(let j=0;j<points.length;j++){sx+=j;sy+=points[j];sxx+=j*j;sxy+=j*points[j];}
  const n=points.length,slope=(n*sxy-sx*sy)/(n*sxx-sx*sx),intercept=(sy-slope*sx)/n,speed=40/slope;
  if(speed<.94||speed>1.06)continue;let residual=0;for(let j=0;j<n;j++)residual+=(points[j]-intercept-slope*j)**2;residual=Math.sqrt(residual/n);
  if(residual<1.5)candidates.push({speed,residual});
 }
 candidates.sort((a,b)=>a.residual-b.residual);return candidates.length?candidates[0].speed:1;
}
export function retime(samples,speed){
 if(!Number.isFinite(speed)||speed<=0)throw Error('E_FORMAT');const out=new Float32Array(Math.floor(samples.length*speed));
 for(let i=0;i<out.length;i++){const x=i/speed,j=Math.floor(x),f=x-j;out[i]=(samples[j]||0)*(1-f)+(samples[j+1]||0)*f;}return out;
}
export function decode(samples,progress=()=>{},options={}){
 const speed=options.autoSpeed===false?1:estimateSpeed(samples),attempts=Math.abs(speed-1)>.00002?[speed,1]:[1];let bestError=null;
 for(const factor of attempts){progress(0,{phase:factor===1?'scanning':'correcting',speed:(factor-1)*100});const audio=factor===1?samples:retime(samples,factor);
  try{const r=decodeBlocks(audio,progress);return {...r,offset:r.offset/factor,speedOffset:(factor-1)*100};}catch(e){if(!bestError||(e.message==='E_BLOCKS'&&(bestError.message!=='E_BLOCKS'||e.details.received>bestError.details.received)))bestError=e;if(e.message==='E_BLOCKS')continue;}
  try{const r=decodeLegacy(audio,progress);return {...r,offset:r.offset/factor,speedOffset:(factor-1)*100,version:2,blocks:1,recoveredCopies:0};}catch(e){if(bestError?.message!=='E_BLOCKS'&&e.message!=='E_SIGNAL')bestError=e;}
 }throw bestError||Error('E_SIGNAL');
}
