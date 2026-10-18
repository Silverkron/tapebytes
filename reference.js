import {RATE,encodeWav,encode,layout,decodeAllChannels} from './codec.js';
export const REFERENCE_HZ=3000;
// Stereo transport wraps the existing mono format; the data channel is unchanged.
export function referenceWav(payload,intro,progress,options){
 const r=encodeWav(payload,intro,progress,options),mono=new DataView(r.wav),length=(r.wav.byteLength-44)/2;
 const channels=[new Float32Array(length),new Float32Array(length)];
 for(let i=0;i<length;i++){channels[0][i]=mono.getInt16(44+i*2,true)/32767;channels[1][i]=.3*Math.sin(2*Math.PI*REFERENCE_HZ*i/RATE);}
 return {...r,wav:channelWav(channels),channels:2};
}
export function channelWav(channels){
 const count=channels.length,length=channels[0]?.length;if(!length||![1,2].includes(count)||channels.some(c=>c.length!==length))throw Error('E_AUDIO');
 const size=44+length*2*count;if(size>0xffffffff)throw Error('E_FORMAT');const out=new ArrayBuffer(size),v=new DataView(out),str=(p,s)=>{for(let i=0;i<s.length;i++)v.setUint8(p+i,s.charCodeAt(i));};
 str(0,'RIFF');v.setUint32(4,size-8,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,count,true);v.setUint32(24,RATE,true);v.setUint32(28,RATE*count*2,true);v.setUint16(32,count*2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,size-44,true);
 for(let i=0;i<length;i++)for(let c=0;c<count;c++)v.setInt16(44+(i*count+c)*2,Math.round(Math.max(-1,Math.min(1,channels[c][i]))*32767),true);return out;
}
// Track positive crossings of the dedicated pilot, never filter the data channel.
// Reject unreliable references instead of silently inventing missing timing.
export function correctReference(data,pilot,progress=()=>{}){
 if(!pilot||pilot.length!==data.length)throw Error('E_PILOT_CHANNELS');
 const period=RATE/REFERENCE_HZ,points=[];let energy=0;
 for(let i=0;i<pilot.length-1;i++){const x=pilot[i],y=pilot[i+1];energy+=x*x;if(x<=0&&y>0)points.push(i-x/(y-x));}
 if(energy/pilot.length<1e-7||points.length<1500)throw Error('E_PILOT');
 // Locate sustained pilot, ignoring silence/noise before and after the recording.
 const valid=i=>{const d=points[i]-points[i-1];return d>=period/1.25&&d<=period/.75;};
 let first=-1,last=-1,run=0;for(let i=1;i<points.length;i++){run=valid(i)?run+1:0;if(run>=1500){if(first<0)first=i-run;last=i;}}
 if(first<0||last<=first)throw Error('E_PILOT');
 for(let i=first+1;i<=last;i++)if(!valid(i))throw Error('E_PILOT');
 // Confirm a sinusoidal reference; speech, broadband noise and mixed channels fail.
 let signal=0,error=0;for(let k=first;k<last;k+=8){const a=points[k],b=points[k+1],step=b-a;let dot=0,power=0,norm=0;
  for(let i=Math.ceil(a);i<b;i++){const s=Math.sin(2*Math.PI*(i-a)/step);dot+=pilot[i]*s;power+=pilot[i]**2;norm+=s*s;}
  signal+=power;error+=Math.max(0,power-dot*dot/(norm||1));
 }
 if(!signal||error/signal>.12)throw Error('E_PILOT');
 const length=Math.floor((last-first)*period);if(length>data.length*1.3)throw Error('E_PILOT');const out=new Float32Array(length);
 for(let i=0;i<length;i++){const cycle=i/period,k=Math.floor(cycle)+first,q=cycle-Math.floor(cycle),x=points[k]*(1-q)+points[k+1]*q,j=Math.floor(x),f=x-j;out[i]=data[j]*(1-f)+(data[j+1]||0)*f;if(i%480000===0)progress(i/length);}
 progress(1);return {samples:out,meanSpeed:(length/(points[last]-points[first])-1)*100};
}

export function stereoDataWav(payload,intro=new Float32Array(),progress=()=>{},options={}){
 const opts={...options,stereoData:true},plan=layout(payload.length,intro.length,opts);
 if(plan.wavBytes>0xffffffff)throw Error('E_FORMAT');
 const channels=[0,1].map(lane=>encode(payload,intro,v=>progress((lane+v)/2),{...opts,lane}));
 const peaks=new Float32Array(640);
 for(let i=0;i<channels[0].length;i++){const k=Math.min(639,Math.floor(i/channels[0].length*640));peaks[k]=Math.max(peaks[k],Math.abs(channels[0][i]),Math.abs(channels[1][i]));}
 return {wav:channelWav(channels),peaks,duration:plan.duration,blocks:plan.blocks,channels:2,stereoData:true};
}

// Split only sustained quiet in the reference channel. Never interpolate timing
// across a gap between independent recordings; each pilot is validated separately.
export function decodeRecording(channels,progress=()=>{},options={}){
 if(!options.reference)return decodeAllChannels(channels,progress,options);
 const [data,pilot]=channels;if(!pilot||pilot.length!==data.length)throw Error('E_PILOT_CHANNELS');
 const spans=[];const window=480;let start=0,quiet=-1;
 for(let i=0;i<pilot.length;i+=window){
  let power=0;const end=Math.min(i+window,pilot.length);for(let j=i;j<end;j++)power+=pilot[j]*pilot[j];
  if(power/(end-i)<1e-5){if(quiet<0)quiet=i;}
  else{if(quiet>=0&&i-quiet>=RATE*.25){if(quiet-start>=RATE*.5)spans.push([start,quiet]);start=i;}quiet=-1;}
 }
 const end=quiet>=0&&pilot.length-quiet>=RATE*.25?quiet:pilot.length;
 if(end-start>=RATE*.5)spans.push([start,end]);
 if(!spans.length)throw Error('E_PILOT');
 const results=[];
 for(const [start,end] of spans){
  const corrected=correctReference(data.subarray(start,end),pilot.subarray(start,end));
  const decoded=decodeAllChannels([corrected.samples],progress,{autoSpeed:false});
  for(const r of decoded)results.push({...r,offset:r.offset+start,reference:true,referenceSpeed:corrected.meanSpeed});
 }
 return results;
}
