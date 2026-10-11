// Portable companion: all routes, translations, fonts and voices embedded.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const read=name=>fs.readFileSync(path.join(base,'dist',name),'utf8');
const js=value=>JSON.stringify(value).replace(/</g,'\\u003c');
const codec=read('codec.js')+'\n'+read('reference.js').replace(/^import .*;\n/gm,''),worker=read('worker.js').replace(/^import .*;\n/gm,''),capture=read('capture.js');
if(JSON.parse(read('build-info.json')).basePath)throw Error('Portable build requires BASE_PATH empty; run npm run build first.');
const pages=Object.fromEntries(JSON.parse(read('routes.json')).map(r=>[r.path,read(r.path.slice(1)+'index.html')]));
const voices=Object.fromEntries(['en','it','es','de','fr'].map(l=>[l,'data:audio/wav;base64,'+fs.readFileSync(path.join(base,`dist/audio/${l}.wav`)).toString('base64')]));
const url=s=>`URL.createObjectURL(new Blob([${js(s)}],{type:'text/javascript'}))`;
const setup=`window.TAPEVAULT_OFFLINE={pages:${js(pages)},voices:${js(voices)},workerURL:${url(codec+'\n'+worker)},captureURL:${url(capture)}};`;
const app=read('app.js').replace(/^import .*;\n/gm,'');
const css=read('style.css').replace('/fonts/Silkscreen-Regular.ttf','data:font/ttf;base64,'+fs.readFileSync(path.join(base,'dist/fonts/Silkscreen-Regular.ttf')).toString('base64'));
const html=read('index.html').replace('<link rel="stylesheet" href="/style.css">',`<!-- ${read('fonts/OFL.txt')} --><style>${css}</style>`).replace('<script type="module" src="/app.js"></script>',`<script>${setup}</script><script type="module">${codec}\n${app}</script>`);
fs.mkdirSync(path.join(base,'outputs'),{recursive:true});
fs.writeFileSync(path.join(base,'outputs','TapeBytes.html'),html);
// Compatibility for the existing local preview URL.
fs.writeFileSync(path.join(base,'outputs','TapeVault.html'),html);
console.log('Portable HTML ready.');
