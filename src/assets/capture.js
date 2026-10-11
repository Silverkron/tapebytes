class PCMRecorder extends AudioWorkletProcessor{
  constructor(options){super();this.channels=options?.processorOptions?.channels===2?2:1;this.buffers=Array.from({length:this.channels},()=>new Float32Array(4096));this.pos=0;this.stopped=false;this.port.onmessage=({data})=>{if(data==='flush'&&!this.stopped){this.stopped=true;if(this.pos)this.send();this.port.postMessage('flushed');}};}
  send(){const chunks=this.buffers.map(b=>b.slice(0,this.pos));this.port.postMessage(this.channels===1?chunks[0]:chunks,chunks.map(c=>c.buffer));this.pos=0;}
  process(inputs){if(this.stopped)return false;const channels=inputs[0],data=channels?.[0];if(!data)return true;if(this.channels===2&&!channels[1]){this.stopped=true;this.port.postMessage('missing-channel');return false;}for(let i=0;i<data.length;i++){for(let c=0;c<this.channels;c++)this.buffers[c][this.pos]=channels[c][i];if(++this.pos===4096)this.send();}return true;}
}
registerProcessor('pcm-recorder',PCMRecorder);
