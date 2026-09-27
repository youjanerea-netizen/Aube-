if (globalThis.__AUBE_BOOTED) {
  /* already running in this tab */
} else {
globalThis.__AUBE_BOOTED = true;

const K='aube.v3',DAYS=['D','L','M','M','J','V','S'],DL=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],ALL=[0,1,2,3,4,5,6],WK=[1,2,3,4,5];
const CAT={studies:['Études','#4c8dff'],sport:['Sport','#3ddc97'],sleep:['Sommeil','#8b7cff'],work:['Travail','#ff9a4c'],personal:['Personnel','#ff7aa2'],meals:['Repas','#e2b657'],free:['Temps libre','#6b7c99']};
const $=q=>document.querySelector(q),pad=n=>String(n).padStart(2,'0'),cap=s=>s[0].toUpperCase()+s.slice(1);
const key=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`,addD=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const weekDate=(today,day)=>{const mondayOffset=(today.getDay()+6)%7;const monday=addD(today,-mondayOffset);return addD(monday,day===0?6:day-1)};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Icônes vectorielles (style Lucide) */
const p=(...a)=>a.map(d=>`<path d="${d}"/>`).join(''),c=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}"/>`;
const P={sun:c(12,12,4)+p('M12 2v2','M12 20v2','m4.93 4.93 1.41 1.41','m17.66 17.66 1.41 1.41','M2 12h2','M20 12h2','m6.34 17.66-1.41 1.41','m19.07 4.93-1.41 1.41'),
book:p('M12 7v14','M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'),
code:p('m16 18 6-6-6-6','m8 6-6 6 6 6'),dumbbell:p('M6.5 6.5v11','M17.5 6.5v11','M3.5 9v6','M20.5 9v6','M6.5 12h11'),
moon:p('M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'),briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/>'+p('M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'),
heart:p('M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'),
utensils:p('M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2','M7 2v20','M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'),
music:p('M9 18V5l12-2v13')+c(6,18,3)+c(18,16,3),brain:c(12,12,10)+c(12,12,6)+c(12,12,2),
droplet:p('M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'),
leaf:p('M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z','M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'),
bike:c(18.5,17.5,3.5)+c(5.5,17.5,3.5)+c(15,5,1)+p('M12 17.5V14l-3-3 4-3 2 3h2'),
pen:p('M12 20h9','M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z'),
languages:p('m5 8 6 6','m4 14 6-6 2-3','M2 5h12','M7 2h1','m22 22-5-10-5 10','M14 18h6'),timer:p('M10 2h4','m12 14 3-3')+c(12,14,8),
home:p('M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8','M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'),
ccheck:c(12,12,10)+p('m9 12 2 2 4-4'),cal:p('M8 2v4','M16 2v4','M3 10h18')+'<rect x="3" y="4" width="18" height="18" rx="2"/>',
bars:p('M12 20V10','M18 20V4','M6 20v-4'),user:p('M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2')+c(12,7,4),check:p('M20 6 9 17l-5-5'),plus:p('M5 12h14','M12 5v14'),
bell:p('M10.268 21a2 2 0 0 0 3.464 0','M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326'),
trash:p('M3 6h18','M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6','M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'),play:'<polygon points="6 3 20 12 6 21 6 3"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="1"/>',
flame:p('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'),
clock:c(12,12,10)+p('M12 6v6l4 2'),down:p('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4','m7 10 5 5 5-5','M12 15V3'),up:p('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4','m17 8-5-5-5 5','M12 3v12'),vol:p('M11 5 6 9H2v6h4l5 4z','M15.54 8.46a5 5 0 0 1 0 7.07','M19.07 4.93a10 10 0 0 1 0 14.14'),phone:'<rect x="5" y="2" width="14" height="20" rx="2"/>'+p('M12 18h.01'),x:p('M18 6 6 18','m6 6 12 12'),send:p('m22 2-7 20-4-9-9-4Z','M22 2 11 13'),spark:p('M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z','M19 15v4','M17 17h4'),mic:'<rect x="9" y="2" width="6" height="12" rx="3"/>'+p('M5 10a7 7 0 0 0 14 0','M12 19v3'),img:'<rect x="3" y="3" width="18" height="18" rx="2"/>'+c(9,9,2)+p('m21 15-5-5L5 21')};
const HI=['sun','book','code','dumbbell','moon','briefcase','heart','utensils','music','brain','droplet','leaf','bike','pen','languages','timer'];
const ic=n=>`<svg class="i" viewBox="0 0 24 24">${P[n]||P.sun}</svg>`;

/* Données */
function seed(){const a=[['Réveil & mobilité','Étirements doux pour ouvrir la journée.','sport','sun','06:30',15,ALL],['Réviser les mathématiques','Un bloc calme avant le reste.','studies','book','07:15',45,WK],['Marche de midi','Sortir, marcher, revenir plus léger.','sport','bike','12:30',20,ALL],['Deep work','Un créneau protégé, sans notifications.','work','briefcase','14:00',90,WK],['30 min de programmation','Avancer un projet, même un peu.','studies','code','18:00',30,ALL],['Lecture du soir','Lire papier, loin de l’écran.','personal','book','21:00',20,ALL]];
return{name:'',habits:a.map((x,i)=>({id:'h'+i,name:x[0],desc:x[1],cat:x[2],icon:x[3],time:x[4],dur:x[5],days:x[6],alarm:true,snd:''})),done:{},mood:{},prefs:{notif:false,snd:'urgent',vol:.9,snooze:10},fired:{}}}
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}S=S||seed();S.reflections=Array.isArray(S.reflections)?S.reflections:[];S.prefs=S.prefs||{};
Object.entries(S.mood||{}).forEach(([day,m])=>{if(m&&m.t&&!S.reflections.some(r=>r.day===day&&r.t===m.t))S.reflections.push({id:'legacy-'+day,date:day,m:m.m||'ok',t:m.t,day,created:0})});if(S.prefs&&(!S.prefs.snd||S.prefs.snd==='aube'))S.prefs.snd='urgent';
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}try{scheduleAlarms()}catch(e){}};
const col=h=>(CAT[h.cat]||CAT.free)[1];
const htime=(h,day)=>h.dayTimes&&h.dayTimes[day]||h.time;
const hend=(h,day)=>mins(htime(h,day))+Number(h.dur||0);
const sched=d=>S.habits.filter(h=>h.days.includes(d.getDay())).sort((a,b)=>htime(a,d.getDay()).localeCompare(htime(b,d.getDay())));
const isDone=(h,k)=>(S.done[k]||[]).includes(h.id);
const rate=d=>{const s=sched(d);return s.length?s.filter(h=>isDone(h,key(d))).length/s.length:null};
function streak(){let n=0,d=new Date();if(rate(d)!==1)d=addD(d,-1);for(let i=0;i<400;i++){const r=rate(d);if(r===null){d=addD(d,-1);continue}if(r<1)break;n++;d=addD(d,-1)}return n}

/* Sons : synthèses type app Horloge (sans fichiers lourds) + imports validés/compressés */
const BI={aube:['Aube (douce)',3000],cloche:['Cloche',2800],digital:['Digital',1600],radar:['Radar',1400],zen:['Zen',4200],urgent:['Classique',2100]};
let CS=[],ac,cur,pl='',keepAliveNode=null,decodedBuf={};
function ensureAC(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;ac=ac||new AC({latencyHint:'interactive'});if(ac.state==='suspended')ac.resume();return ac}
function unlockAudio(){ensureAC()}
addEventListener('pointerdown',unlockAudio,{passive:true});
addEventListener('keydown',unlockAudio);
const idb=()=>new Promise((ok,ko)=>{const r=indexedDB.open('aube',1);r.onupgradeneeded=()=>r.result.createObjectStore('s',{keyPath:'id'});r.onsuccess=()=>ok(r.result);r.onerror=ko});
const idbDo=async(m,f)=>{const d=await idb();return new Promise((ok,ko)=>{const t=d.transaction('s',m),q=f(t.objectStore('s'));t.oncomplete=()=>ok(q&&q.result);t.onerror=ko})};
idbDo('readonly',s=>s.getAll()).then(r=>{CS=r||[];render()}).catch(()=>{});
const sname=id=>(BI[id]||[])[0]||(CS.find(x=>x.id===id)||{}).name||'Classique';
function volNow(){const ringing=!!document.querySelector('#alarm .al')?.isConnected;return Math.max(.06,Math.min(1,(S.prefs.vol||.9)*(ringing?.98:.52)))}
function addOsc(ctx,dest,type,freq,t0,dur,peak,atk=.012,rel){rel=rel==null?Math.max(.05,dur*.28):rel;const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;if(typeof freq==='number')o.frequency.setValueAtTime(freq,t0);else if(Array.isArray(freq)){o.frequency.setValueAtTime(freq[0][1],t0+freq[0][0]);for(let i=1;i<freq.length;i++)o.frequency.linearRampToValueAtTime(freq[i][1],t0+freq[i][0])}const p=Math.max(.0008,peak);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(p,t0+atk);const hold=Math.max(atk,dur-rel);g.gain.setValueAtTime(p,t0+hold);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);o.connect(g);g.connect(dest);o.start(t0);o.stop(t0+dur+.03);return o}
function addBell(ctx,dest,f0,t0,dur,peak){const parts=[[1,1],[2.01,.38],[2.76,.22],[4.07,.12],[5.4,.08]];for(const [m,a] of parts)addOsc(ctx,dest,'sine',f0*m,t0,dur*(.55+a),peak*a,.004,dur*.9)}
function addBuzz(ctx,dest,t0,dur,peak){const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(1100,t0);f.Q.value=2.2;f.connect(dest);addOsc(ctx,f,'square',850,t0,dur,peak,.006,.05);addOsc(ctx,f,'square',1050,t0,dur,peak*.85,.006,.05);const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.setValueAtTime(9,t0);lg.gain.setValueAtTime(peak*.25,t0);lfo.connect(lg);lg.connect(f.frequency);lfo.start(t0);lfo.stop(t0+dur)}
function PAT(id,ctx,t0,dest){
 if(id==='radar'){for(let i=0;i<4;i++){const t=t0+i*.17;addOsc(ctx,dest,'sine',[[0,740],[.13,1480]],t,.14,.22,.008,.05);addOsc(ctx,dest,'sine',[[0,1110],[.13,2220]],t,.14,.12,.008,.05)}}
 else if(id==='urgent'){for(let i=0;i<4;i++)addBuzz(ctx,dest,t0+i*.52,.38,.28)}
 else if(id==='cloche'){addBell(ctx,dest,523.25,t0,1.8,.28);addBell(ctx,dest,659.25,t0+.18,1.6,.2);addBell(ctx,dest,783.99,t0+.34,1.5,.16)}
 else if(id==='digital'){[1318,1174,1318,1567,1318].forEach((f,i)=>addOsc(ctx,dest,'square',f,t0+i*.18,.11,.16,.004,.04))}
 else if(id==='zen'){addOsc(ctx,dest,'sine',196,t0,3.4,.14,.18,1.4);addOsc(ctx,dest,'sine',294,t0+.12,3.2,.1,.2,1.3);addOsc(ctx,dest,'sine',392,t0+.4,2.8,.07,.25,1.2)}
 else {const ns=[523,659,784,1046];ns.forEach((f,i)=>addOsc(ctx,dest,'sine',f,t0+i*.22,.55,.16,.02,.28))}
}
function stopSnd(){if(cur){try{cur.a&&cur.a.pause&&cur.a.pause()}catch(e){}try{cur.src&&cur.src.stop&&cur.src.stop()}catch(e){}if(cur.t)clearInterval(cur.t);if(cur.to)clearTimeout(cur.to)}cur=null;try{navigator.vibrate&&navigator.vibrate(0)}catch(e){}}
function keepAliveAudio(on){const c=ensureAC();if(!c)return;if(!on){try{keepAliveNode&&keepAliveNode.stop()}catch(e){}keepAliveNode=null;return}if(keepAliveNode)return;const o=c.createOscillator(),g=c.createGain();o.frequency.value=20;g.gain.value=.00001;o.connect(g);g.connect(c.destination);o.start();keepAliveNode=o}
async function playBuffer(buf,loop){const c=ensureAC();if(!c)return;const src=c.createBufferSource();src.buffer=buf;src.loop=!!loop;const g=c.createGain();g.gain.value=volNow();src.connect(g);g.connect(c.destination);src.start();if(!loop)src.onended=()=>{if(pl){pl='';render()}};cur={src}}
function playBuilt(id,loop){const c=ensureAC();if(!c)return;const dest=c.createGain();dest.gain.value=volNow();dest.connect(c.destination);const period=(BI[id]||BI.urgent)[1];const run=()=>{dest.gain.value=volNow();try{PAT(id,c,c.currentTime+.01,dest)}catch(e){}};run();if(loop)cur={t:setInterval(run,period)};else cur={to:setTimeout(()=>{if(pl===id){pl='';render()}},period)}}
function play(id,loop){stopSnd();try{const custom=CS.find(x=>x.id===id);if(custom){(async()=>{if(decodedBuf[id]){await playBuffer(decodedBuf[id],loop);return}const c=ensureAC();try{const buf=await c.decodeAudioData(await custom.blob.arrayBuffer());decodedBuf[id]=buf;await playBuffer(buf,loop)}catch(e){const a=new Audio(URL.createObjectURL(custom.blob));a.loop=!!loop;a.volume=S.prefs.vol;a.onended=()=>{if(pl===id){pl='';render()}};a.play().catch(()=>{});cur={a}}})();return}playBuilt(BI[id]?id:'urgent',loop)}catch(e){}}
function encodeWav(samples,rate){const n=samples.length,buf=new ArrayBuffer(44+n*2),v=new DataView(buf),w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);let o=44;for(let i=0;i<n;i++,o+=2){const s=Math.max(-1,Math.min(1,samples[i]));v.setInt16(o,s<0?s*0x8000:s*0x7fff,true)}return buf}
async function transcodeAlarm(file){const raw=await file.arrayBuffer();const tmp=new (window.AudioContext||window.webkitAudioContext)();let decoded;try{decoded=await tmp.decodeAudioData(raw.slice(0))}catch(e){try{tmp.close()}catch(x){}throw new Error('format')}const dur=Math.min(decoded.duration,8);if(dur<.12){try{tmp.close()}catch(x){}throw new Error('court')}const rate=22050,frames=Math.max(1,Math.floor(dur*rate));let samples;try{const off=new OfflineAudioContext(1,frames,rate);const src=off.createBufferSource();src.buffer=decoded;src.connect(off.destination);src.start(0);const rendered=await off.startRendering();samples=rendered.getChannelData(0)}catch(e){const ch=decoded.getChannelData(0),step=decoded.sampleRate/rate;samples=new Float32Array(frames);for(let i=0;i<frames;i++)samples[i]=ch[Math.min(ch.length-1,Math.floor(i*step))]||0}try{tmp.close()}catch(x){}return new Blob([encodeWav(samples,rate)],{type:'audio/wav'})}

/* MARA — moteur conversationnel local, 100 % hors ligne.
   Pas d’appel réseau : tout tourne dans le navigateur. Elle combine reconnaissance
   d’intentions, mémoire de la conversation en cours, et une bibliothèque de réponses
   variées pour éviter de répéter deux fois la même phrase. */
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
const has=(t,...w)=>w.some(x=>new RegExp('\\b'+x).test(t));
const hasAny=(t,arr)=>arr.some(x=>has(t,x));
const pick=(a,skip)=>{if(a.length<2)return a[0];let i=Math.floor(Math.random()*a.length);if(skip!=null&&a.length>1)while(i===skip)i=Math.floor(Math.random()*a.length);return a[i]};
const fname=()=>S.name.trim().split(' ')[0],N=()=>fname()?', '+fname():'';
const mins=t=>+t.slice(0,2)*60+ +t.slice(3),hm2=m=>pad(Math.floor(m/60))+':'+pad(m%60),dlab=m=>(m>=60?Math.floor(m/60)+' h':'')+(m%60?(m>=60?' ':'')+m%60+' min':'');
const remaining=()=>{const n=new Date(),k=key(n);return sched(n).filter(h=>!isDone(h,k))};
const light=()=>{const r=remaining().sort((a,b)=>a.dur-b.dur)[0];return r?`\n\nSi tu veux, ne garde aujourd’hui que le plus léger : « ${r.name} » (${r.dur} min). Le reste peut attendre.`:'\n\nTu as tout terminé aujourd’hui : tu peux vraiment souffler.'};
const lst=a=>a.map(h=>{const t=htime(h,new Date().getDay()),e=mins(t)+h.dur;return`• ${t}–${hm2(e)} · ${h.name} (${h.dur} min)`}).join('\n');
const gaps=(d,from)=>{const hs=S.habits.filter(h=>h.days.includes(d)).sort((a,b)=>htime(a,d).localeCompare(htime(b,d)));let c=Math.max(420,from||0);const o=[];for(const h of hs){const a=mins(htime(h,d));if(a-c>=30)o.push([c,a]);c=Math.max(c,a+Number(h.dur||0))}if(1320-c>=30)o.push([c,1320]);return o};

/* Mémoire locale de la conversation (persistée avec le reste des données) */
const MCTX=()=>{S.mara=S.mara||{turns:[],lastIt:'',lastIdx:{},lastTip:-1};return S.mara};

const CR=['suicid','me tuer\\b','en finir avec','envie de mourir','veux mourir','me faire du mal','me blesser','plus envie de vivre','envie de disparaitre','disparaitre pour toujours'];
const CRM=()=>`Merci de me le dire${N()}, et je suis vraiment là avec toi en ce moment. Ce que tu ressens compte énormément, et tu n’as pas à porter ça tout(e) seul(e).\n\nJe ne suis qu’une application : je ne peux pas remplacer une vraie personne dans un moment pareil. S’il te plaît, contacte dès maintenant le 3114 (numéro national de prévention du suicide, gratuit, 24 h/24, 7 j/7) ou le 112 en cas de danger immédiat. Parle-en aussi à quelqu’un en qui tu as confiance, ce soir si possible.`;

/* Détection d’intention : mots-clés + petit contexte grammatical */
function intent(t){
 if(hasAny(t,CR))return'crisis';
 if(has(t,'merci'))return'thanks';
 if(hasAny(t,['wesh','yo\\b','bien ou quoi','cv\\b','coucou','hello','hey','salut','bonjour','bonsoir','cc\\b']))return'greet';
 if(has(t,'ca va\\?','tu vas bien','comment tu vas','comment vas tu'))return'howru';
 if(hasAny(t,['pourquoi tu','comment tu marches','tu es qui','t es qui','tu es quoi','es tu une ia','es tu un robot','tu es reelle']))return'about';
 if(hasAny(t,['fatigu','epuis','creve','a bout','n en peux plus','vide','j ai plus la force','plus la force','dead\\b','crevee']))return'tired';
 if(hasAny(t,['stress','angoiss','anxi','panique','pression','submerg','deborde','trop de choses','trop a faire','oppress','la pression']))return'stress';
 if(hasAny(t,['triste','deprim','pleur','cafard','decu','deprime','mal dans ma peau','moral a zero','moral dans les chaussettes','ca ne va pas','nul en ce moment','au fond','down\\b','ca va pas','ca va mal']))return'sad';
 if(hasAny(t,['seul(e)?\\b','solitude','personne ne','abandonne','isole']))return'lonely';
 if(hasAny(t,['enerv','colere','frustr','agac','saoule','marre','ras le bol','exaspere','relou','saoul','soule']))return'angry';
 if(hasAny(t,['peur','angoisse de','terrifi','inquiet','inquiete','anxieuse a l idee']))return'fear';
 if(hasAny(t,['procrast','motivation','flemme','pas envie','repousse','pas le courage','demotiv','decroche','j ai la flemme','nai pas la force']))return'demot';
 if(hasAny(t,['honte','culpab','echec','rate','en retard sur','j ai pas fait','pas tenu','deception envers moi']))return'shame';
 if(hasAny(t,['content','fier','fiere','heureu','genial','au top','motive','ca va bien','super','excellente journee','ouf\\b','grave bien','trop bien']))return'good';
 if(hasAny(t,['amour','amoureuse','amoureux','rupture','crush','couple','dispute avec']))return'relation';
 if(hasAny(t,['examen','controle','partiel','oral','entretien','competition','concours']))return'exam';
 return'';
}

/* Bibliothèque de réponses (2 à 3 variantes par intention pour ne pas se répéter) */
const MARA={
greet:[()=>`Wesh${N()} 💙 Je suis là. Planning, confidence, ou juste un truc à poser — vas-y.`,()=>`Salut${N()} ! Dis-moi ce qui t’occupe l’esprit, ou pose-moi une question sur tes habitudes.`,()=>`Coucou${N()}. Je t’écoute pour de vrai, pas en mode robot.`],
thanks:[()=>`Avec plaisir${N()}. Tu n’as pas besoin de me remercier, je suis là pour ça.`,()=>`De rien 💙. Je reste dans le coin si tu veux continuer.`],
howru:[()=>`Je vais bien, merci de demander. Et toi, vraiment${N()} — comment tu te sens, là ?`],
about:[()=>`Je suis Mara. Je connais tout ton planning, tes habitudes, tes horaires, et ce que tu m’as déjà confié. Tu peux me parler comme à quelqu’un — argot, soutenu, brouillon, peu importe. Je reste un programme, pas une personne, mais je m’en souviens.`],
tired:[()=>`Ça ressemble à de la fatigue${N()}, et ton corps a raison de le signaler. Avant de te demander encore plus, vérifie les bases : as-tu bu de l’eau, mangé, fait une vraie pause aujourd’hui ?${light()}`,()=>`La fatigue, ça se respecte. Tu n’as pas à mériter le repos pour te l’autoriser. Une chose à la fois suffit pour l’instant.${light()}`],
stress:[()=>`Je t’entends${N()}. Quand tout arrive en même temps, le cerveau transforme facilement « beaucoup » en « tout est urgent ». On peut trier : ce qui doit être fait maintenant, ce qui peut attendre, et ce qui n’a même pas besoin d’être fait aujourd’hui.${light()}`,()=>`Respire un coup${N()}. Dis-moi ce qui te met le plus de pression en ce moment, et on le découpe en plus petits morceaux ensemble.`],
sad:[()=>`Je suis désolée que tu traverses ça${N()}. Tu n’as pas besoin de rendre ta peine logique ou jolie pour en parler ici, je t’écoute sans juger.`,()=>`Ça a l’air lourd à porter. Qu’est-ce qui t’a fait le plus mal là-dedans ?`],
lonely:[()=>`La solitude, ça pèse vraiment${N()}. Je suis là, même si je ne remplace pas une présence humaine. Y a-t-il quelqu’un que tu pourrais appeler ou revoir bientôt ?`],
angry:[()=>`Je vois la colère${N()}, et tu as le droit de la ressentir. Elle dit souvent qu’une limite a été dépassée. Contre quoi es-tu le plus énervé(e) : une personne, une situation, ou l’accumulation ?`,()=>`C’est légitime d’être agacé(e). Laisse-la retomber un instant, une marche rapide ou quelques grandes respirations aident, avant de décider quoi faire.`],
fear:[()=>`La peur mérite d’être écoutée, sans forcément lui donner raison tout de suite. Qu’est-ce que tu crains précisément, et qu’est-ce que tu sais déjà, factuellement ?`],
demot:[()=>`La motivation arrive souvent après le début, pas avant${N()}. Choisis une action ridiculement petite, deux minutes, une seule page, puis réévalue.${light()}`,()=>`Pas d’élan aujourd’hui, ça arrive. Donne-toi une tâche minuscule et concrète, juste pour créer un premier mouvement.`],
shame:[()=>`Doucement avec toi-même${N()}. Rater quelque chose ne fait pas de toi quelqu’un de nul(le), ce ne sont pas la même phrase. Qu’est-ce qui s’est réellement passé, factuellement ?`,()=>`La culpabilité peut être utile si elle pointe vers quelque chose à réparer. Mais tu n’as pas à la garder plus longtemps que nécessaire.`],
good:[()=>{const s=streak();return`Ça fait plaisir à lire${N()} 💙 ${s>1?`${s} jours de suite, tu tiens vraiment quelque chose.`:'Savoure ce moment.'} Qu’est-ce qui a rendu cette journée meilleure ?`}],
relation:[()=>`Les relations, ça peut être compliqué. Raconte-moi ce qui se passe, je peux t’aider à démêler les faits, ce que tu ressens, et ce que tu imagines peut-être en plus.`],
exam:[()=>`C’est normal d’avoir un peu (ou beaucoup) le trac avant ça. Tu as travaillé pour ce moment. Concentre-toi sur une révision légère et du repos plutôt que du bourrage la veille.${light()}`],
general:[()=>`Je t’écoute${N()}. Pose-le comme ça vient.`,()=>`Ok. Dis-m’en un peu plus, j’essaie de te suivre précisément.`,()=>`Je suis là. Qu’est-ce qui t’aiderait, là, tout de suite ?`,()=>`Continue, je ne lâche pas le fil.`]};

const TIPS=['Règle des 2 minutes : lance-toi pour 2 minutes seulement. Démarrer est la vraie difficulté.','Empile tes habitudes : accroche la nouvelle à une existante (« après mon café, je révise »).','Rends-la évidente : prépare tout la veille (tenue, livre, sac). Moins de friction, plus de constance.','Commence petit : 5 minutes chaque jour battent 1 heure une fois par semaine.','Ne rate jamais deux fois de suite : un oubli arrive, c’est la reprise le lendemain qui compte vraiment.','Fête chaque petite victoire : c’est ce qui ancre une habitude dans la durée.','Attache un rituel à un lieu ou une heure fixe : le cerveau adore les repères stables.'];

/* Réponse émotionnelle, avec mémoire du tour précédent */
function emoReply(raw){
 const t=norm(raw),ctx=MCTX(),it=intent(t);
 if(it==='crisis')return CRM();
 const bank=MARA[it&&MARA[it]?it:'general'];
 const li=ctx.lastIdx[it]!=null?ctx.lastIdx[it]:-1;
 let idx=Math.floor(Math.random()*bank.length);if(bank.length>1)while(idx===li)idx=Math.floor(Math.random()*bank.length);
 ctx.lastIdx[it]=idx;
 let r=bank[idx]();
 if(ctx.lastIt===it&&it&&it!=='general')r=pick(['Tu m’en reparles, et c’est très bien. ','Toujours sur ce sujet, je reste avec toi. ',''])+r;
 ctx.lastIt=it;ctx.turns.push({u:raw,it});if(ctx.turns.length>24)ctx.turns.shift();
 if(raw.length>140)r+=`\n\nTu m’as donné beaucoup de détails, merci pour ta confiance${N()}.`;
 save();
 return r;
}

/* Réponse pratique (planning, stats, aide) + repli sur l’émotionnel si rien ne correspond */
function answer(raw,soft){
 const t=norm(raw),n=new Date(),cur=n.getHours()*60+n.getMinutes(),td=remaining();
 if(hasAny(t,CR))return CRM();
 const acted0=tryAct(raw);if(acted0)return acted0;
 if(has(t,'respir','souffl'))return'Faisons-le ensemble, doucement :\n1. Inspire par le nez pendant 4 secondes\n2. Expire lentement par la bouche pendant 6 secondes\n3. Recommence 5 fois\n\nÀ chaque expiration, relâche un peu plus les épaules. Tu peux aussi lancer l’exercice animé dans le bilan du jour.';
 const early=intent(t);const wantsAct=has(t,'ajoute','creer','cree','decale','supprime','deplace','prevois','retiens','programme','horaire','enregistre','note que','rdv','rendez vous');
 if(early&&!wantsAct&&!has(t,'programme','planning','agenda','habitude','creneau','libre','prochain')){const acted=tryAct(raw);return acted||emoReply(raw)}

 let dy=null;if(has(t,'demain'))dy=(n.getDay()+1)%7;else if(has(t,'aujourd'))dy=n.getDay();else for(let i=0;i<7;i++)if(has(t,norm(DL[i])))dy=i;

 // Questions naturelles sur une heure précise : « je fais quoi à 12h30 ? », « suis-je libre vers midi ? »
 const clockMatch=(raw.match(/\b(\d{1,2})(?:\s*[:h]\s*(\d{2}))?\s*(?:h(?:eures?)?)?\b/i)||[]);
 let askedMinute=null;
 if(/\bmidi\b/i.test(raw))askedMinute=720;
 else if(/\bminuit\b/i.test(raw))askedMinute=0;
 else if(clockMatch.length){
   const hh=Number(clockMatch[1]),mm=clockMatch[2]==null?0:Number(clockMatch[2]);
   if(hh>=0&&hh<=23&&mm>=0&&mm<=59)askedMinute=hh*60+mm;
 }
 const asksAtTime=askedMinute!==null&&/(quoi|fais|faire|prevu|programme|cours|libre|dispo|occup|tache|activit|agenda|heure)/.test(t);
 if(asksAtTime){
   const d=dy==null?n.getDay():dy, items=S.habits.filter(h=>h.days.includes(d)).map(h=>({h,start:mins(htime(h,d)),end:mins(htime(h,d))+Number(h.dur||0)}));
   const active=items.find(x=>askedMinute>=x.start&&askedMinute<x.end);
   const when=d===n.getDay()?"aujourd’hui":DL[d].toLowerCase();
   if(active){
     const {h,start,end}=active;
     const answerAt=`À ${hm2(askedMinute)}, ${when}, tu as « ${h.name} » en cours : ça commence à ${hm2(start)} et ça se termine à ${hm2(end)}.`;
     if(has(t,'libre','dispo'))return `Non, tu es occupé(e) à ${hm2(askedMinute)} : ${h.name} (${hm2(start)}–${hm2(end)}).`;
     return answerAt;
   }
   const before=items.filter(x=>x.end<=askedMinute).sort((a,b)=>b.end-a.end)[0];
   const after=items.filter(x=>x.start>askedMinute).sort((a,b)=>a.start-b.start)[0];
   const freeEnd=after?after.start:1320, freeStart=before?before.end:420;
   if(has(t,'libre','dispo'))return `Oui, tu es libre à ${hm2(askedMinute)} ${when}${freeEnd>freeStart?` : le créneau libre autour de cette heure va de ${hm2(freeStart)} à ${hm2(freeEnd)} (${dlab(freeEnd-freeStart)}).`:'.'}`;
   return `À ${hm2(askedMinute)} ${when}, tu n’as aucune activité prévue.${after?` La prochaine est « ${after.h.name} » à ${hm2(after.start)}.`:''}`;
 }
 if(has(t,'quelle heure','heure actuelle','heure exacte','il est quelle heure','on est a quelle heure'))return`Il est ${n.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}, ${n.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}.`;
if(has(t,'prochain','ensuite','apres','maintenant','next','je fais quoi','quoi faire','a faire la')){const active=td.find(h=>mins(htime(h,n.getDay()))<=cur&&mins(htime(h,n.getDay()))+Number(h.dur||0)>cur);if(active)return`Là, tu es dans ton créneau « ${active.name} » (${htime(active,n.getDay())}–${hm2(mins(htime(active,n.getDay()))+Number(active.dur||0))}). Si tu l’as déjà terminé, tu peux passer à la suivante.`;const nx=td.find(h=>mins(htime(h,n.getDay()))>=cur)||td[0],nt=nx?htime(nx,n.getDay()):'';return nx?`Ta prochaine tâche : « ${nx.name} » à ${nt} (${nx.dur} min, jusqu’à ${hm2(mins(nt)+Number(nx.dur||0))}).${mins(nt)<cur?' Elle est un peu en retard, mais tu peux encore la faire !':''}`:'Tout est terminé pour aujourd’hui, bravo !'}
 if(has(t,'libre','dispo','creneau')){const d=dy==null?n.getDay():dy,g=gaps(d,d===n.getDay()?cur:0);return g.length?`Créneaux libres ${d===n.getDay()?'aujourd’hui':DL[d].toLowerCase()} :\n`+g.slice(0,4).map(x=>`• ${hm2(x[0])} – ${hm2(x[1])} (${dlab(x[1]-x[0])})`).join('\n'):'Pas de grand créneau libre ce jour-là (entre 7 h et 22 h).'}
 if(has(t,'serie','streak','stat','progress','m en sors','bilan','taux','resultat','performance')){const s=streak();let a=0,b=0;for(let i=0;i<7;i++){const d=addD(n,-i),x=sched(d);b+=x.length;a+=x.filter(h=>isDone(h,key(d))).length}const r=b?Math.round(a/b*100):0;return`Série en cours : ${s} jour${s>1?'s':''}.\nCes 7 derniers jours : ${r} % de tâches réalisées (${a}/${b}).\nAujourd’hui, il te reste ${td.length} tâche${td.length>1?'s':''}.${r>=80?' Excellent rythme, continue !':r>=50?' Belle régularité, tu peux encore grimper.':' Pas de panique : on repart petit à petit.'}`}
 if(has(t,'combien'))return`Tu as ${S.habits.length} habitude${S.habits.length>1?'s':''}, dont ${sched(n).length} aujourd’hui.`;
 if(dy!=null||has(t,'programme','planning','a faire','journee','agenda')){const d=dy==null?n.getDay():dy,hs=S.habits.filter(h=>h.days.includes(d)).sort((a,b)=>htime(a,d).localeCompare(htime(b,d)));return hs.length?`Programme ${d===n.getDay()?'d’aujourd’hui':'de '+DL[d].toLowerCase()} :\n`+hs.map(h=>`• ${htime(h,d)}–${hm2(hend(h,d))} · ${h.name} (${h.dur} min)`).join('\n'):`Rien de prévu ${d===n.getDay()?'aujourd’hui':DL[d].toLowerCase()}.`}
 if(has(t,'pomodoro','concentr','focus'))return'25 minutes de concentration, 5 minutes de pause, et une pause longue toutes les 4 séries. Coupe les notifications pendant le bloc.';
 if(has(t,'sommeil','dormir','coucher','reveil')&&!has(t,'fatigu'))return'Garde des horaires réguliers, coupe les écrans 30 minutes avant de dormir et garde la chambre fraîche et sombre. Ton heure de réveil compte plus que ton heure de coucher.';
 if(has(t,'alarme','sonnerie','notification')||/\bson\b/.test(t))return'Profil → Alarmes pour activer les rappels, puis « Sons d’alarme » pour choisir un son ou importer le tien.';
 if(has(t,'hors ligne','hors connexion','internet','installer'))return'Ouvre l’app une première fois en ligne, puis installe-la via le menu ⋮ de Chrome → « Installer l’application ». Ensuite, tout marche sans connexion, moi y compris.';
 if(has(t,'ajouter','creer','nouvelle habitude'))return'Onglet Habitudes, puis le bouton + en haut à droite.';
 if(has(t,'sauvegard','export','import'))return'Profil → Données : tu peux exporter ou importer une sauvegarde.';
 if(has(t,'conseil','astuce','constan','regularit','routine')&&!has(t,'comment tu')){const ctx=MCTX();let i=Math.floor(Math.random()*TIPS.length);if(TIPS.length>1)while(i===ctx.lastTip)i=Math.floor(Math.random()*TIPS.length);ctx.lastTip=i;save();return TIPS[i]}
 const it=intent(t);
 if(it)return emoReply(raw);
 return soft?`Je t’écoute${N()}. Reformule un peu si tu veux, même en argot, et je m’accroche. Tu peux me demander ton planning, un créneau libre, d’enregistrer une habitude, ou juste me raconter.` : emoReply(raw||' ');
}
const moodReply=m=>emoReply({good:'Je me sens plutôt bien aujourd’hui.',ok:'Ça va, une journée correcte.',mixed:'Journée mitigée aujourd’hui, ni bien ni mal.',hard:'Journée difficile aujourd’hui.',angry:'Je suis énervé(e) aujourd’hui.'}[m]);
const noteReply=(m,v)=>v?emoReply(v):moodReply(m||'ok');

function memStore(){S.mara=S.mara||{turns:[],lastIt:'',lastIdx:{},lastTip:-1,memory:[]};S.mara.memory=S.mara.memory||[];return S.mara.memory}
function findHabit(id,name){if(id){const h=S.habits.find(x=>x.id===id);if(h)return h}if(!name)return null;const n=norm(name);return S.habits.find(h=>norm(h.name)===n)||S.habits.find(h=>norm(h.name).includes(n)||n.includes(norm(h.name)))}
function parseHHMM(v){const m=String(v||'').match(/(\d{1,2})\s*[:hH]?\s*(\d{2})?/);if(!m)return '';const h=Math.min(23,Math.max(0,+m[1])),mi=Math.min(59,Math.max(0,+(m[2]||0)));return pad(h)+':'+pad(mi)}
function guessCat(name){const t=norm(name);if(has(t,'math','physique','chim','hist','francais','anglais','revi','cours','etud','dm\\b','exo','code','program'))return'studies';if(has(t,'sport','foot','course','muscu','yoga','marche','natation','basket'))return'sport';if(has(t,'dodo','sommeil','coucher','reveil','sieste'))return'sleep';if(has(t,'travail','boulot','deep work','reunion','mail'))return'work';if(has(t,'repas','dej','diner','petit dej','manger','cuisine'))return'meals';return'personal'}
function guessIcon(cat){return {studies:'book',sport:'dumbbell',sleep:'moon',work:'briefcase',personal:'heart',meals:'utensils',free:'sun'}[cat]||'sun'}
function applyMaraActions(actions){if(!Array.isArray(actions)||!actions.length)return [];const notes=[];for(const a of actions.slice(0,12)){try{if(a.type==='upsert_habit'){const time=parseHHMM(a.time)||'08:00',dur=Math.max(1,Math.min(600,Number(a.dur)||45));const days=Array.isArray(a.days)&&a.days.length?a.days.map(Number).filter(d=>d>=0&&d<=6):[...ALL];const cat=CAT[a.cat]?a.cat:guessCat(a.name||'');const exist=findHabit(a.id,a.name);const o=exist?exist:{id:'h'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:'',desc:'',cat,icon:guessIcon(cat),time,dur,days:[...days],dayTimes:{},alarm:true,snd:''};if(a.name)o.name=String(a.name).slice(0,60);if(a.desc!=null)o.desc=String(a.desc).slice(0,400);if(CAT[a.cat])o.cat=a.cat;if(a.icon&&P[a.icon])o.icon=a.icon;if(a.time)o.time=time;if(a.dur)o.dur=dur;if(Array.isArray(a.days)&&a.days.length)o.days=days;if(a.dayTimes&&typeof a.dayTimes==='object')o.dayTimes={...(o.dayTimes||{}),...a.dayTimes};if(typeof a.alarm==='boolean')o.alarm=a.alarm;if(!exist)S.habits.push(o);notes.push(`« ${o.name} » ${o.time} · ${o.dur} min`)}else if(a.type==='delete_habit'){const h=findHabit(a.id,a.name);if(h){S.habits=S.habits.filter(x=>x.id!==h.id);notes.push('supprimé : '+h.name)}}else if(a.type==='set_habit_time'){const h=findHabit(a.id,a.name);if(h){const time=parseHHMM(a.time);if(!time)continue;if(a.day!=null&&a.day>=0&&a.day<=6){h.dayTimes=h.dayTimes||{};h.dayTimes[a.day]=time}else h.time=time;if(a.dur)h.dur=Math.max(1,Math.min(600,Number(a.dur)));notes.push(h.name+' → '+time)}}else if(a.type==='mark_habit'){const h=findHabit(a.id,a.name);if(h){const k=key(new Date()),arr=S.done[k]||[];const on=!!a.done;S.done[k]=on?(arr.includes(h.id)?arr:[...arr,h.id]):arr.filter(x=>x!==h.id)}}else if(a.type==='remember_fact'&&a.fact){const mem=memStore();const fact=String(a.fact).slice(0,280);if(!mem.some(x=>x.fact===fact)){mem.push({t:Date.now(),cat:a.category||'vie',fact});if(mem.length>80)mem.shift()}notes.push('retenu')}else if(a.type==='forget_fact'&&a.fact){const q=norm(String(a.fact));S.mara.memory=(S.mara.memory||[]).filter(x=>!norm(x.fact).includes(q))}}catch(e){}}save();scheduleAlarms();return notes}
function tryAct(raw){const t=norm(raw);if(!t)return '';const time=parseHHMM(raw);let days=[...ALL];if(has(t,'semaine')&&!has(t,'week end','weekend'))days=[...WK];if(has(t,'week end','weekend'))days=[0,6];if(has(t,'demain')){const d=(new Date().getDay()+1)%7;days=[d]}else {for(let i=0;i<7;i++)if(has(t,norm(DL[i])))days=[i]}
 const mem=raw.match(/^(?:retiens|souviens[- ]toi|n['’]oublie pas(?: que)?|note que)\s+(.+)/i);if(mem){applyMaraActions([{type:'remember_fact',fact:mem[1].trim(),category:'vie'}]);return `C’est noté${N()}. Je m’en souviendrai : « ${mem[1].trim()} ».`}
 const del=t.match(/^(?:supprime|enleve|retire|efface)\s+(?:l habitde |l habitude |le |la |les )?(?:creneau |tache |habitude )?(.+)/);if(del&&!has(t,'souvenir','memoire')){const name=del[1].replace(/\s+(a|à|de|pour|demain|aujourd hui).*/,'').trim();const h=findHabit('',name);if(h){applyMaraActions([{type:'delete_habit',id:h.id,name:h.name}]);return `C’est retiré du planning : « ${h.name} ».`} }
 const move=raw.match(/(?:decale|deplace|passe|mets)\s+(.+?)\s+(?:a|à|vers)\s+(\d{1,2}\s*[:hH]?\s*\d{0,2})/i);if(move){const h=findHabit('',move[1]);if(h){const tm=parseHHMM(move[2]);applyMaraActions([{type:'set_habit_time',id:h.id,name:h.name,time:tm,day:days.length===1?days[0]:undefined}]);return `C’est déplacé : « ${h.name} » à ${tm}.`}}
 if(has(t,'ajoute','creer','cree','programme','prevois','mets moi','j ai cours','j ai sport','j ai prevu','rendez vous','rdv')&&(time||has(t,'habitude'))){let name=(raw.replace(/^(ajoute(?:r)?|cr[eé]e(?:r)?|programme|pr[eé]vois|mets(?: moi)?)\s+/i,'').replace(/\s+(tous les jours|chaque jour|en semaine|le matin|le soir|demain|aujourd.?hui|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche).*/i,'').replace(/\s+(à|a|vers)\s+\d.*/,'').replace(/\s+\d{1,2}\s*[:hH].*/,'').replace(/\s+\d+\s*min.*/,'').trim());name=name.replace(/^(l habitde|l habitude|un|une|le|la|les)\s+/i,'').slice(0,60);if(!name||name.length<2)name='Nouveau créneau';const durM=raw.match(/(\d{1,3})\s*min/);const dur=durM?Math.max(1,+durM[1]):45;applyMaraActions([{type:'upsert_habit',name,time:time||'08:00',dur,days,cat:guessCat(name),alarm:true}]);return `C’est enregistré${N()} : « ${name} » à ${time||'08:00'} (${dur} min), ${days.length===7?'tous les jours':days.map(d=>DL[d]).join(', ')}.`;}
 return ''}
function maraSnapshot(){const n=new Date();return{now:n.toISOString(),locale:n.toLocaleString('fr-FR'),weekday:DL[n.getDay()],firstName:fname(),habits:S.habits.map(h=>({id:h.id,name:h.name,desc:h.desc,cat:h.cat,icon:h.icon,time:h.time,dur:h.dur,days:(h.days||[]).map(d=>DL[d]),dayTimes:h.dayTimes||{},alarm:!!h.alarm,today:`${htime(h,n.getDay())}–${hm2(hend(h,n.getDay()))}`,doneToday:isDone(h,key(n))})),today:sched(n).map(h=>({name:h.name,start:htime(h,n.getDay()),end:hm2(hend(h,n.getDay())),dur:h.dur,done:isDone(h,key(n)),cat:(CAT[h.cat]||CAT.free)[0]})),week:[0,1,2,3,4,5,6].map(d=>({day:DL[d],items:S.habits.filter(h=>h.days.includes(d)).sort((a,b)=>htime(a,d).localeCompare(htime(b,d))).map(h=>({name:h.name,start:htime(h,d),end:hm2(hend(h,d)),dur:h.dur}))})),streak:streak(),moodToday:S.mood[key(n)]||null,memory:(S.mara&&S.mara.memory)||[],remaining:remaining().map(h=>h.name)}}

const QS=['Ma prochaine tâche ?','Quand suis-je libre aujourd’hui ?','Comment je m’en sors ?','Un conseil pour être constant(e)','Je suis fatigué(e)'];
const bub=m=>`<div class="bu ${m.r}">${esc(m.t).replace(/\n/g,'<br>')}${m.img?`<br><img src="${m.img}" style="max-width:100%;border-radius:12px;margin-top:6px">`:''}</div>`;
let typing='';
const chatBox=(arr,id,ph,hi)=>`<div class="chat" id="${id}box">${arr.length?arr.map(bub).join(''):bub({r:'a',t:hi})}${typing===id?'<div class="typ"><i></i><i></i><i></i></div>':''}</div><div id="${id}imgp"></div><div class="cin"><textarea id="${id}i" data-enter="${id}" rows="2" placeholder="${ph}" maxlength="2000" autocomplete="off" name="mara-message" autocapitalize="sentences" spellcheck="true" enterkeyhint="enter" inputmode="text" aria-label="Message à Mara"></textarea><button class="fab" data-a="cs" data-id="${id}" aria-label="Envoyer">${ic('send')}</button></div><div class="chat-tools"><label class="btn g chat-image-pick" style="cursor:pointer" aria-label="Joindre une image" title="Joindre une image">${ic('img')}<input type="file" accept="image/*" data-a="ai" data-id="${id}" hidden></label><button type="button" data-a="voice" data-id="${id}" class="${voiceRec===id?'rec':''}">${ic('mic')} ${voiceRec===id?'Écoute…':'Vocal'}</button></div>`;
const assistant=()=>`<section class="card"><div class="mara-head"><span class="mara-avatar">${ic('spark')}</span><div><h2>Mara</h2><small class="mu">Elle connaît tout ton planning</small></div></div><div class="qs">${QS.map(q=>`<button data-a="cq" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>${chatBox(S.chat||[],'pc','Pose-moi une question…',`Salut${N()} ! Je retiens tes habitudes et tes horaires. Demande-moi ta journée, un créneau libre, d’ajouter un rdv… ou parle-moi normalement.`)}${(S.chat||[]).length?`<button class="btn d" style="height:40px;margin-top:6px" data-a="cc">Effacer la conversation</button>`:''}</section>`;
const thr=id=>{if(id==='pc')return S.chat=S.chat||[];const k=key(new Date());S.mood[k]=S.mood[k]||{m:'',t:'',th:[]};return S.mood[k].th=S.mood[k].th||[]};
const pendingImg={};
function sendTo(id,tx,img){tx=(tx||'').trim();if(!tx&&!img)return;const a=thr(id);a.push({r:'u',t:tx||'(photo envoyée)',img});save();rf=id;typing=id;render();
 setTimeout(()=>{typing='';let reply;try{reply=img&&!tx?`Merci pour la photo${N()} 💙 Décris-moi ce qu’elle montre et on en parle.`:(tryAct(tx)||answer(tx,id==='sc'))}catch(err){reply=`J’ai rencontré un petit souci en préparant ma réponse${N()}. Réessaie en reformulant, ou demande-moi directement l’heure, la prochaine activité ou tes créneaux libres.`}
 a.push({r:'a',t:reply});if(a.length>80)a.splice(0,a.length-80);save();rf=id;render()},180)}
let voiceRec='';
function startVoice(id){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){alert('La reconnaissance vocale n’est pas proposée par ce navigateur.');return}
 try{const r=new SR();r.lang='fr-FR';r.interimResults=false;r.maxAlternatives=1;voiceRec=id;render();
 r.onresult=e=>{const el=$('#'+id+'i');if(el)el.value=e.results[0][0].transcript};
 r.onerror=()=>{voiceRec='';render()};r.onend=()=>{voiceRec='';render()};r.start()}catch(e){voiceRec='';alert('Micro indisponible. Sur certains navigateurs, la reconnaissance vocale a aussi besoin d’une connexion.')}}
function handleImage(id,file){if(!file)return;const r=new FileReader();r.onload=()=>{const el=$('#'+id+'imgp');if(el)el.innerHTML=`<div class="attach-preview"><img src="${r.result}" alt=""><span>Image prête à envoyer.</span><button data-a="rmimg" data-id="${id}" aria-label="Retirer">${ic('x')}</button></div>`;pendingImg[id]=r.result};r.readAsDataURL(file)}



/* Vues */
const seg=(x,cls='')=>x;
const hcard=(h,k,menu,day=new Date().getDay())=>{const d=isDone(h,k),t=htime(h,day),end=hm2(mins(t)+Number(h.dur||0));return`<div class="hc ${d?'dn':''}" style="--c:${col(h)}"><span class="ib">${ic(h.icon)}</span><div class="mt" data-a="edit" data-id="${h.id}"><b>${esc(h.name)}</b><small>${ic('clock')}${t}–${end} · ${h.dur} min<i class="bg">${CAT[h.cat][0]}</i>${h.alarm?ic('bell'):''}</small></div>${menu?'':`<button class="ck" data-a="tog" data-id="${h.id}" aria-label="Terminer">${ic('check')}</button>`}</div>`};
let tab='todo',pd=new Date().getDay(),dr=null,br=false,rf='',scheduleMode=false;
const ring=(pc,cap)=>`<svg viewBox="0 0 200 200" class="rg"><circle cx="100" cy="100" r="80" class="rb"/><circle cx="100" cy="100" r="80" class="rf" stroke-dasharray="502.65" stroke-dashoffset="${502.65*(1-pc)}" transform="rotate(-90 100 100)"/><text x="100" y="108" class="n">${Math.round(pc*100)}%</text><text x="100" y="128" class="l">AUJOURD’HUI</text><text x="100" y="148" class="c">${cap}</text></svg>`;
function maraStatus(){
 const online=typeof navigator==='undefined'||navigator.onLine!==false;
 return `<div class="mara-status"><span class="dot ${online?'':'off'}"></span><span>Moteur local actif · ${online?'prête':'hors ligne'}</span></div>`;
}
const V={
today(){const n=new Date(),k=key(n),s=sched(n),dn=s.filter(h=>isDone(h,k)),td=s.filter(h=>!isDone(h,k)),pc=s.length?dn.length/s.length:0,hr=n.getHours(),g=hr<5?'Bonne nuit':hr<18?'Bonjour':'Bonsoir',fn=S.name.trim().split(' ')[0],m=S.mood[k],st=streak();

return`<header class="rise" style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px"><div><p class="cap">${cap(n.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}))}</p><h1>${g}${fn?', '+esc(fn):''}</h1>${st?`<p class="mu" style="margin-top:4px;font-size:.9rem;color:#ff9a4c;display:flex;gap:4px;align-items:center">${ic('flame')}${st} jour${st>1?'s':''} de suite</p>`:''}</div><div style="display:flex;gap:8px;flex:none"><button class="fab" data-a="openMara" aria-label="Parler à Mara" title="Parler à Mara" style="width:48px;height:48px">${ic('spark')}</button><button class="fab" data-a="journal" aria-label="Mes notes" title="Mes notes enregistrées" style="width:48px;height:48px">${ic('book')}</button></div></header>
${S.name?'':`<section class="card rise"><h2>Bienvenue</h2><p class="mu" style="font-size:.9rem;margin-top:2px">Comment dois-je t’appeler ?</p><input id="nm" placeholder="Ton prénom" maxlength="30"><button class="btn" data-a="name">Continuer</button></section>`}
<section class="card rise">${ring(pc,`${dn.length} / ${s.length} tâches terminées`)}<div class="st"><div><small>Prévues</small><b>${s.length}</b></div><div><small>Terminées</small><b>${dn.length}</b></div><div><small>Restantes</small><b>${td.length}</b></div></div></section>
<section class="card rise"><h2>Comment tu vas${N()} ?</h2><p class="mu" style="font-size:.9rem;margin-top:2px">Choisis ton humeur et note une petite chose à retenir.</p><div class="mood-strip">${[['good','😊','Bien'],['ok','🙂','Ça va'],['mixed','😐','Mitigé'],['hard','😔','Dur'],['angry','😤','Énervé']].map(x=>`<button data-a="mood" data-v="${x[0]}" class="${m&&m.m===x[0]?'a':''}">${x[1]}<span>${x[2]}</span></button>`).join('')}</div><input id="note" placeholder="Une chose à améliorer demain…" value="${m?esc(m.t||''):''}" maxlength="200"><button class="btn g" data-a="note">Enregistrer</button></section>`},
mara(){const k=key(new Date()),m=S.mood[k];return`<div class="mara-screen rise"><header class="mara-top"><div class="mara-head"><span class="mara-avatar">${ic('spark')}</span><div><h1 style="font-size:1.55rem;margin:0">Mara</h1><small class="mu">Planning, habitudes et écoute — réunis</small>${maraStatus()}</div></div></header><section class="mara-thread">${chatBox(S.chat||[],'pc','Parle-moi de ton planning ou de ta journée…',`Je peux t’aider avec ton planning, chercher des heures libres, enregistrer une habitude, ou simplement t’écouter${N()}. Tu peux parler naturellement, avec tes expressions habituelles.`)}<button class="btn g mara-breathe" data-a="br">${ic('leaf')} ${br?'Arrêter':'Respirer 1 minute'}</button>${br?'<div class="br"><div class="bc"></div></div>':''}</section></div>`},
habits(){return`<div class="top rise"><div><p class="cap">Ma routine</p><h1>Habitudes</h1></div><div style="display:flex;gap:8px"><button class="fab" data-a="organize" aria-label="Assistant d’organisation" title="Assistant d’organisation">${ic('spark')}</button><button class="fab" data-a="new" aria-label="Nouvelle habitude">${ic('plus')}</button></div></div><p class="mu" style="margin-top:6px;font-size:.9rem">${S.habits.length} habitude${S.habits.length>1?'s':''} · touche pour modifier</p>${S.habits.slice().sort((a,b)=>mins(htime(a,new Date().getDay()))-mins(htime(b,new Date().getDay()))).map(h=>hcard(h,key(new Date()),0)).join('')||`<div class="empty"><h2>Aucune habitude</h2><p>Crée la première avec le bouton +.</p></div>`}`},
form(){const d=dr,fr=d.freq;return`<p class="cap">${d.id?'Modifier':'Nouvelle ligne'}</p><h1>${d.id?'Modifier l’habitude':'Créer une habitude'}</h1>
<label class="f">Nom<input data-in="name" placeholder="Apprendre HTML" value="${esc(d.name)}" maxlength="60"></label>
<label class="f">Description<textarea data-in="desc" placeholder="Pourquoi cette habitude compte.">${esc(d.desc)}</textarea></label>
<label class="f">Icône</label><div class="ipk">${HI.map(n=>`<button data-a="fi" data-v="${n}" class="${d.icon===n?'a':''}" aria-label="${n}">${ic(n)}</button>`).join('')}</div>
<label class="f">Catégorie</label><div class="opt">${Object.entries(CAT).map(([i,x])=>`<button data-a="fc" data-v="${i}" class="${d.cat===i?'a':''}" style="--c:${x[1]}"><i></i>${x[0]}</button>`).join('')}</div>
<label class="f">Fréquence<select data-a="ff"><option value="daily" ${fr==='daily'?'selected':''}>Tous les jours</option><option value="weekdays" ${fr==='weekdays'?'selected':''}>Jours de semaine</option><option value="custom" ${fr==='custom'?'selected':''}>Certains jours</option></select></label>
${fr==='custom'?`<div class="days">${[1,2,3,4,5,6,0].map(x=>`<button data-a="fd" data-v="${x}" class="${d.days.includes(x)?'a':''}">${DAYS[x]}</button>`).join('')}</div>`:''}${d.days.length>1?`<details style="margin:8px 0 14px"><summary class="mu">Horaires différents selon les jours</summary><div class="days" style="display:grid;grid-template-columns:repeat(2,1fr)">${d.days.map(x=>`<label class="f">${DL[x]}<input type="time" data-daytime="${x}" value="${(d.dayTimes&&d.dayTimes[x])||d.time}"></label>`).join('')}</div><small class="mu">Laisse les heures identiques si tu veux garder le même horaire.</small></details>`:''}
<div class="two"><label class="f">Heure<input type="time" data-in="time" value="${d.time}"></label><label class="f">Durée (min)<input type="number" inputmode="numeric" min="1" max="600" data-in="dur" value="${d.dur}"></label></div>
<section class="card" style="margin-top:20px;padding:6px 16px"><label class="tg"><span>Rappel sonore</span><input type="checkbox" class="sw" data-a="fa" ${d.alarm?'checked':''}></label>${d.alarm?`<label class="tg"><span>Son</span><select data-a="fs" style="width:auto;margin:0;max-width:60%"><option value="">Par défaut (${esc(sname(S.prefs.snd))})</option>${Object.entries(BI).map(([i,x])=>`<option value="${i}" ${d.snd===i?'selected':''}>${x[0]}</option>`).join('')}${CS.map(x=>`<option value="${x.id}" ${d.snd===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>`:''}</section>
<button class="btn" data-a="sv">${d.id?'Enregistrer':'Créer l’habitude'}</button>${d.id?`<button class="btn d" data-a="del">${ic('trash')} Supprimer</button>`:''}<button class="btn g" data-a="back">Annuler</button>`},
plan(){const n=new Date(),hs=S.habits.filter(h=>h.days.includes(pd)).sort((a,b)=>mins(htime(a,pd))-mins(htime(b,pd)));
return`<header class="rise" style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px"><div><p class="cap">Ma semaine</p><h1>Planning</h1></div><div style="display:flex;gap:8px"><button class="fab" data-a="scheduleView" aria-label="Voir l’emploi du temps du jour" title="Emploi du temps du jour">${ic('cal')}</button><button class="fab" data-a="openMara" aria-label="Parler à Mara" title="Parler à Mara">${ic('spark')}</button></div></header><div class="pills">${[1,2,3,4,5,6,0].map(x=>`<button data-a="pd" data-v="${x}" class="${x===pd?'a':''} ${x===n.getDay()?'t':''}">${DAYS[x]}<b>${weekDate(n,x).getDate()}</b></button>`).join('')}</div>
<h2 style="margin-top:22px">${DL[pd]}</h2><div class="tl">${hs.length?hs.map(h=>`<div class="it" style="--c:${col(h)}"><span class="tm">${htime(h,pd)}</span><span class="ln"></span>${hcard(h,'x',1,pd).replace('<div class="hc ','<div class="hc plan-drag" data-plan-id="'+h.id+'" title="Maintenir appuyé puis déplacer" ')}</div>`).join(''):'<div class="empty"><h2>Journée libre</h2><p>Aucune habitude ce jour-là.</p></div>'}</div>`},
journal(){const rows=S.reflections.slice().reverse();return`<header class="rise" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><p class="cap">Espace personnel</p><h1>Mes notes</h1></div><button class="fab" data-a="backHome" aria-label="Retour à l’accueil">${ic('home')}</button></header><p class="mu" style="margin-top:8px">Tes pensées et petites choses à améliorer, conservées sur cet appareil.</p>${rows.length?rows.map(r=>`<section class="card"><div style="display:flex;justify-content:space-between;gap:10px"><small>${esc(r.date||'')}</small><button class="ib2" data-a="deleteReflection" data-id="${esc(r.id)}" aria-label="Supprimer cette note">${ic('trash')}</button></div><h2 style="margin-top:8px">${esc(({good:'😊 Bien',ok:'🙂 Ça va',mixed:'😐 Mitigé',hard:'😔 Difficile',angry:'😤 Énervé'})[r.m]||'Note')}</h2><p style="margin-top:8px;white-space:pre-wrap">${esc(r.t)}</p></section>`).join(''):`<section class="card"><h2>Ton espace est encore vide</h2><p class="mu" style="margin-top:8px">Enregistre une petite note depuis la barre d’humeur de l’accueil : elle apparaîtra ici.</p><button class="btn" data-a="backHome">Retour à l’accueil</button></section>`}`},
timetable(){const n=new Date(),hs=S.habits.filter(h=>h.days.includes(pd)).sort((a,b)=>mins(htime(a,pd))-mins(htime(b,pd)));return`<header class="rise" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px"><div><p class="cap">Vue d’ensemble</p><h1>Emploi du temps</h1><p class="mu" style="margin-top:5px">${DL[pd]} · toutes les activités prévues</p></div><button class="fab" data-a="backPlan" aria-label="Retour au planning">${ic('cal')}</button></header><div class="pills">${[1,2,3,4,5,6,0].map(x=>`<button data-a="pd" data-v="${x}" class="${x===pd?'a':''} ${x===n.getDay()?'t':''}">${DAYS[x]}<b>${weekDate(n,x).getDate()}</b></button>`).join('')}</div><section class="card timetable-card"><div class="timetable-head"><b>${DL[pd]}</b><button class="btn g" style="width:auto;margin:0;padding:9px 12px" data-a="exportTimetable">${ic('down')} Exporter l’image</button></div>${hs.length?`<div class="timetable-columns"><span>Horaire</span><span>Activité</span></div><div class="timetable-list">${hs.map(h=>`<div class="timetable-row" style="--c:${col(h)}"><div class="timetable-time">${htime(h,pd)}<small>${hm2(hend(h,pd))}</small></div><div class="timetable-bar"><span>${ic(h.icon)}</span><div><b>${esc(h.name)}</b><small>${h.dur} min${h.desc?` · ${esc(h.desc)}`:''}</small></div></div></div>`).join('')}</div>`:`<div class="empty"><h2>Journée libre</h2><p>Aucune habitude prévue ce jour-là.</p></div>`}</section><p class="mu" style="font-size:.82rem;margin:10px 4px">Cette vue est une lecture visuelle de ton planning : les modifications se font toujours dans l’écran Planning habituel.</p>`},
stats(){const n=new Date();let tot=0,pn=0;for(let i=0;i<30;i++){const d=addD(n,-i),s=sched(d);pn+=s.length;tot+=s.filter(h=>isDone(h,key(d))).length}
const w=[...Array(7)].map((_,i)=>{const d=addD(n,i-6),r=rate(d)||0;return`<div><i style="height:${r*80}px;opacity:${r?1:.3}"></i>${DAYS[d.getDay()]}</div>`}).join('');
const start=addD(n,-83-((n.getDay()+6)%7));const hm=[...Array(84)].map((_,i)=>{const d=addD(start,i);if(d>n)return'<i style="opacity:0"></i>';const r=rate(d);return`<i style="${r===null?'':`background:rgba(61,139,255,${.15+r*.85})`}"></i>`}).join('');
return`<header class="rise"><p class="cap">Progression</p><h1>Statistiques</h1></header><section class="card rise"><div class="st" style="margin:0"><div><small>Série</small><b>${streak()}</b></div><div><small>30 jours</small><b>${pn?Math.round(tot/pn*100):0}%</b></div><div><small>Réalisées</small><b>${tot}</b></div></div></section><section class="card"><h2>7 derniers jours</h2><div class="bars">${w}</div></section><section class="card"><h2>12 dernières semaines</h2><div class="hm">${hm}</div></section>`},
me(){const sn=(id,nm,cu)=>`<div class="sn ${S.prefs.snd===id?'a':''}"><button class="pb" data-a="pv" data-id="${id}" aria-label="Écouter">${ic(pl===id?'stop':'play')}</button><span class="nm" data-a="ps" data-id="${id}">${esc(nm)}</span>${S.prefs.snd===id?ic('check'):''}${cu?`<button class="ib2" data-a="ds" data-id="${id}" aria-label="Supprimer">${ic('trash')}</button>`:''}</div>`;
return`<header class="rise"><p class="cap">Réglages</p><h1>Profil</h1></header>
<section class="card"><label class="f" style="margin:0">Ton prénom<input id="nm" value="${esc(S.name)}" maxlength="30" placeholder="Comment t’appeler ?"></label><button class="btn g" data-a="name">Enregistrer</button></section>
<section class="card" style="padding-bottom:8px"><h2>Alarmes</h2><label class="tg"><span>Rappels activés</span><input type="checkbox" class="sw" data-a="pn" ${S.prefs.notif?'checked':''}></label><label class="tg"><span>Report</span><select data-a="psn" style="width:auto;margin:0">${[5,10,15,30].map(x=>`<option value="${x}" ${x===S.prefs.snooze?'selected':''}>${x} min</option>`).join('')}</select></label><label class="tg" style="display:block"><span style="display:flex;justify-content:space-between"><span>Volume</span><small>${Math.round(S.prefs.vol*100)}%</small></span><input type="range" min="10" max="100" value="${S.prefs.vol*100}" data-a="pvol"></label><p class="mu" style="font-size:.78rem;margin:0 0 8px">Sonnerie type app Horloge. L’alarme continue en arrière-plan tant que l’app reste ouverte ou installée, avec une notification.</p></section>
<section class="card"><h2>Rappels de tes notes</h2><p class="mu" style="font-size:.85rem;margin:4px 0 10px">Aube peut te rappeler une note enregistrée une fois par semaine, à un moment variable. Les notifications doivent être autorisées.</p><label class="tg"><span>Rappel hebdomadaire</span><input type="checkbox" class="sw" data-a="reflectionNotify" ${S.prefs.reflectionNotify?'checked':''}></label></section><section class="card"><h2>Sons d’alarme</h2><p class="mu" style="font-size:.85rem;margin:2px 0 8px">Touche un nom pour le choisir par défaut. Chaque habitude peut aussi avoir son propre son.</p>${Object.entries(BI).map(([i,x])=>sn(i,x[0])).join('')}${CS.map(x=>sn(x.id,x.name,1)).join('')}<label class="btn g" style="cursor:pointer;color:var(--fg)">${ic('up')} Ajouter mon propre son<input type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.caf" data-a="as" hidden></label><p class="mu" style="font-size:.78rem;margin-top:8px">MP3, WAV, M4A, OGG… chaque fichier est vérifié et compressé (8 s, mono) pour rester léger. Les sons restent sur ton appareil.</p></section>

<section class="card"><h2>Données</h2><p class="mu" style="font-size:.85rem;margin-top:2px">Tout reste sur ton appareil.</p><button class="btn g" data-a="exp">${ic('down')} Exporter une sauvegarde</button><label class="btn g" style="cursor:pointer;color:var(--fg)">${ic('up')} Importer une sauvegarde<input type="file" accept="application/json" data-a="imp" hidden></label><button class="btn d" data-a="rst">Tout réinitialiser</button></section>`}
};
function exportTimetableImage(){
 const hs=S.habits.filter(h=>h.days.includes(pd)).slice().sort((a,b)=>mins(htime(a,pd))-mins(htime(b,pd)));
 const title=DL[pd],W=1000,rowH=92,H=240+Math.max(1,hs.length)*rowH;
 const xml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
 const rows=hs.length?hs.map(h=>{const y=150+hs.indexOf(h)*rowH;return `<rect x="40" y="${y}" width="920" height="76" rx="16" fill="#121a2a" stroke="#293449"/><rect x="40" y="${y}" width="8" height="76" rx="4" fill="${col(h)}"/><text x="70" y="${y+31}" fill="#9aa8bd" font-size="20" font-family="Arial">${xml(htime(h,pd))} – ${xml(hm2(hend(h,pd)))}</text><text x="310" y="${y+34}" fill="#f0f2f5" font-size="25" font-family="Arial" font-weight="600">${xml(h.name)}</text><text x="310" y="${y+59}" fill="#9aa8bd" font-size="16" font-family="Arial">${xml(h.dur+' min'+(h.desc?' · '+h.desc:''))}</text>`}).join(''):`<text x="500" y="240" fill="#9aa8bd" text-anchor="middle" font-size="24" font-family="Arial">Aucune activité prévue</text>`;
 const rowsLight=hs.length?hs.map((h,i)=>{const y=210+i*rowH,fill=['#fce4ef','#e0f5f0','#fff0e6','#e9e5fb','#e1efff'][i%5];return `<rect x="42" y="${y}" width="916" height="76" rx="8" fill="#fff" stroke="#30323a" stroke-width="1.5"/><rect x="42" y="${y}" width="210" height="76" rx="5" fill="${fill}"/><text x="147" y="${y+45}" fill="#20232a" text-anchor="middle" font-size="24" font-family="Georgia">${xml(htime(h,pd))} – ${xml(hm2(hend(h,pd)))}</text><text x="285" y="${y+34}" fill="#20232a" font-size="25" font-family="Georgia">${xml(h.name)}</text><text x="285" y="${y+59}" fill="#656975" font-size="16" font-family="Arial">${xml(h.dur+' min'+(h.desc?' · '+h.desc:''))}</text>`}).join(''):`<text x="500" y="240" fill="#555" text-anchor="middle" font-size="24" font-family="Georgia">Aucune activité prévue</text>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" rx="20" fill="#fffafd"/><path d="M0 0H1000V135H0Z" fill="#fbe8f0"/><g fill="#e89ab8" opacity=".55"><circle cx="48" cy="42" r="23"/><circle cx="75" cy="35" r="13"/><circle cx="950" cy="42" r="23"/><circle cx="925" cy="35" r="13"/></g><text x="500" y="52" fill="#30323a" text-anchor="middle" font-size="18" letter-spacing="3" font-family="Arial">AUBE · MON EMPLOI DU TEMPS</text><text x="500" y="108" fill="#30323a" text-anchor="middle" font-size="44" font-family="Georgia" font-style="italic">${xml(title)}</text><rect x="42" y="145" width="916" height="48" fill="#f8dce8" stroke="#30323a" stroke-width="1.5"/><text x="147" y="176" fill="#20232a" text-anchor="middle" font-size="22" font-family="Georgia" font-style="italic">Horaire</text><text x="605" y="176" fill="#20232a" text-anchor="middle" font-size="22" font-family="Georgia" font-style="italic">Programme</text>${rowsLight}<text x="50" y="${H-25}" fill="#777" font-size="14" font-family="Arial">Créé depuis ton planning Aube</text></svg>`;
 const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),img=new Image();img.onload=()=>{try{const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);canvas.toBlob(png=>{if(!png)throw new Error('png');const out=URL.createObjectURL(png),a=document.createElement('a');a.href=out;a.download='aube-emploi-du-temps-'+norm(title).replace(/\s+/g,'-')+'.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(out),2000)},'image/png')}catch(e){downloadSVG()};URL.revokeObjectURL(url)};img.onerror=()=>downloadSVG();img.src=url;function downloadSVG(){const a=document.createElement('a');a.href=url;a.download='aube-emploi-du-temps-'+norm(title).replace(/\s+/g,'-')+'.svg';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
}
function checkReflectionReminder(){
 if(!S.prefs.reflectionNotify||!S.reflections?.length||!('Notification'in window)||Notification.permission!=='granted')return;
 const now=new Date(),week=(()=>{const d=new Date(now);d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return key(d)})();
 if(S.prefs.reflectionSentWeek===week||now.getDay()===0||now.getHours()<9||now.getHours()>20)return;
 const entry=S.reflections[Math.floor(Math.random()*S.reflections.length)];
 try{new Notification('Aube · Un petit rappel pour toi',{body:entry.t,tag:'aube-reflection-'+week,icon:'icon-192.png'});S.prefs.reflectionSentWeek=week;save()}catch(e){}
}
const NAV=[['today','home','Accueil'],['habits','ccheck','Habitudes'],['plan','cal','Planning'],['stats','bars','Stats'],['me','user','Profil']];
function render(){const h=(location.hash||'#today').slice(1),[r,id]=h.split('/');let v=V[r]?r:'today';
if(r==='new'||r==='edit'){if(!dr||dr.id!==(id||'')){const o=S.habits.find(x=>x.id===id);dr=o?{...o,days:[...o.days],dayTimes:{...(o.dayTimes||{})},freq:o.days.length===7?'daily':o.days.length===5&&WK.every(x=>o.days.includes(x))?'weekdays':'custom'}:{id:'',name:'',desc:'',cat:'personal',icon:'sun',time:'08:00',dayTimes:{},dur:20,days:[...ALL],freq:'daily',alarm:true,snd:''}}v='form'}else dr=null;
$('#v').innerHTML=V[v]();const nv=v==='form'?'habits':v==='timetable'?'plan':v;$('#nav').innerHTML=NAV.map(x=>`<a href="#${x[0]}" class="${x[0]===nv?'a':''}">${ic(x[1])}${x[2]}</a>`).join('');document.querySelectorAll('.chat').forEach(c=>c.scrollTop=c.scrollHeight);if(rf){const e=$('#'+rf+'i');rf='';e&&e.focus()}}
addEventListener('hashchange',()=>{render();scrollTo(0,0)});addEventListener('online',()=>render());addEventListener('offline',()=>render());

/* Alarme */
function stopAl(){stopSnd();$('#alarm').innerHTML=''}
function nextAlarms(){const out=[],now=new Date();for(let d=0;d<2;d++){const dt=addD(now,d),k=key(dt);for(const h of sched(dt)){if(!h.alarm||isDone(h,k))continue;const t=htime(h,dt.getDay()),when=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),+t.slice(0,2),+t.slice(3),0,0).getTime();if(when>now.getTime()-5000)out.push({id:h.id,name:h.name,time:t,when,dur:h.dur,snd:h.snd||S.prefs.snd||'urgent'})}}return out.sort((a,b)=>a.when-b.when)}
let alarmTimer=null,wakeLock=null;
async function holdWake(on){try{if(!on){await wakeLock?.release();wakeLock=null;return}if('wakeLock'in navigator&&S.prefs.notif)wakeLock=await navigator.wakeLock.request('screen')}catch(e){}}
function scheduleAlarms(){const list=S.prefs.notif?nextAlarms():[];clearTimeout(alarmTimer);const n=list[0];if(n){const wait=Math.max(400,Math.min(n.when-Date.now(),60000));alarmTimer=setTimeout(()=>{tick();scheduleAlarms()},wait)}keepAliveAudio(!!S.prefs.notif);holdWake(!!S.prefs.notif);try{navigator.serviceWorker?.ready.then(reg=>{reg.active?.postMessage({type:'aube-schedule',alarms:list});if(S.prefs.notif&&reg.periodicSync)reg.periodicSync.register('aube-alarms',{minInterval:60000}).catch(()=>{})})}catch(e){}}
function ringAl(h){$('#alarm').innerHTML=`<div class="al" style="--c:${col(h)}"><span class="ib">${ic(h.icon)}</span><p class="cap">${htime(h,new Date().getDay())} · ${h.dur} min</p><h1 style="margin-bottom:22px">${esc(h.name)}</h1><button class="btn" data-a="astart" data-id="${h.id}">${ic('play')} Je commence</button><button class="btn g" data-a="atog" data-id="${h.id}">${ic('check')} C’est terminé</button><button class="btn g" data-a="asn" data-id="${h.id}">Reporter de ${S.prefs.snooze} min</button><button class="btn d" data-a="adm">Ignorer</button></div>`;
unlockAudio();play(h.snd||S.prefs.snd||'urgent',true);navigator.vibrate&&navigator.vibrate([900,250,900,250,900,250,900,250,900]);
try{if(Notification.permission==='granted'){const t=htime(h,new Date().getDay());const o={body:`${t}–${hm2(mins(t)+Number(h.dur||0))} · ${h.dur} min · Touche pour ouvrir`,icon:'/icon-192.png',tag:h.id,renotify:true,requireInteraction:true,silent:false,vibrate:[900,250,900,250,900]};navigator.serviceWorker&&navigator.serviceWorker.ready?navigator.serviceWorker.ready.then(r=>r.showNotification('Aube · '+h.name,o)):new Notification('Aube · '+h.name,o)}}catch(e){}}
function tick(){if(!S.prefs.notif||$('#alarm').innerHTML)return;const n=new Date(),k=key(n),cur=n.getHours()*60+n.getMinutes();
for(const h of sched(n)){if(!h.alarm||isDone(h,k))continue;const id=h.id+k,m=mins(htime(h,n.getDay())),sn=S.fired[id+'s'];if(sn?cur>=sn:(cur>=m&&cur-m<=8&&!S.fired[id])){S.fired[id]=1;delete S.fired[id+'s'];save();ringAl(h);scheduleAlarms();return}}}
let activeDayKey=key(new Date());setInterval(()=>{const todayKey=key(new Date());if(todayKey!==activeDayKey){activeDayKey=todayKey;render();scheduleAlarms()}tick();checkReflectionReminder();if(document.hidden&&S.prefs.notif){try{navigator.serviceWorker?.controller?.postMessage({type:'aube-ping',now:Date.now(),alarms:nextAlarms()})}catch(e){}}},document.hidden?15000:1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){unlockAudio();tick();scheduleAlarms();render();holdWake(!!S.prefs.notif)}});
if('serviceWorker'in navigator)navigator.serviceWorker.addEventListener('message',e=>{if(e.data&&e.data.type==='aube-alarm'){tick();if(!$('#alarm').innerHTML){const id=e.data.payload&&e.data.payload.id,h=S.habits.find(x=>x.id===id);if(h)ringAl(h)}}});

/* Actions */
const doTog=id=>{const k=key(new Date()),a=S.done[k]||[];S.done[k]=a.includes(id)?a.filter(x=>x!==id):[...a,id];save();render()};
const go=h=>{location.hash=h};

function dayConflicts(day){
 const arr=sched({getDay:()=>day}).slice().sort((a,b)=>mins(htime(a,day))-mins(htime(b,day)));
 const conflicts=[];
 for(let i=0;i<arr.length;i++){
   const a=arr[i],as=mins(htime(a,day)),ae=as+Number(a.dur||0);
   for(let j=i+1;j<arr.length;j++){
     const b=arr[j],bs=mins(htime(b,day)),be=bs+Number(b.dur||0);
     if(bs>=ae)break;
     if(as<be&&bs<ae)conflicts.push({a,b,as,ae,bs,be});
   }
 }
 return conflicts;
}
function openOrganizer(){
 const day=pd,bad=dayConflicts(day);
 document.getElementById('organizer-modal')?.remove();
 const overlay=document.createElement('div');overlay.id='organizer-modal';
 overlay.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(3,7,18,.72);display:flex;align-items:center;justify-content:center;padding:18px;backdrop-filter:blur(5px)';
 const panel=document.createElement('section');panel.className='card';panel.style.cssText='width:min(100%,520px);max-height:82vh;overflow:auto;border:1px solid var(--bd);box-shadow:0 24px 70px #0008;padding:22px';
 const safe=txt=>esc(String(txt));
 const list=bad.length?bad.map(c=>`<div style="padding:12px;border:1px solid var(--bd);background:var(--el);border-radius:14px;margin-top:9px"><b>${safe(c.a.name)}</b> <span class="mu">${hm2(c.as)}–${hm2(c.ae)}</span><div class="mu" style="font-size:.8rem;margin:3px 0">chevauche</div><b>${safe(c.b.name)}</b> <span class="mu">${hm2(c.bs)}–${hm2(c.be)}</span></div>`).join(''):'<div style="padding:14px;border-radius:14px;background:var(--el);margin-top:12px">Aucun chevauchement détecté. Les horaires et durées de cette journée sont cohérents. ✨</div>';
 panel.innerHTML=`<div style="display:flex;align-items:flex-start;gap:12px"><span class="mara-avatar">${ic('spark')}</span><div style="flex:1"><p class="cap" style="margin-bottom:4px">Assistant d’organisation</p><h2 style="margin:0 0 6px">${bad.length?'J’ai repéré des chevauchements':'Tout est bien organisé'}</h2><p class="mu" style="font-size:.9rem">Vérification du ${DL[day]} · ${bad.length} conflit${bad.length>1?'s':''}</p></div></div>
 ${bad.length?`<p style="margin-top:16px">Certaines activités se déroulent en même temps. Je peux décaler automatiquement les activités qui se chevauchent, en gardant leurs durées et en cherchant des horaires libres.</p><div>${list}</div><p class="mu" style="font-size:.82rem;margin-top:12px">Rien ne sera modifié sans ton accord.</p><button class="btn" data-a="orgApply">${ic('spark')} Résoudre les chevauchements</button>`:`${list}`}
 <button class="btn" data-a="orgManual" style="margin-top:10px">Corriger les horaires manuellement</button><button class="btn g" data-a="orgClose">${bad.length?'Pas maintenant':'Fermer'}</button>`;
 overlay.appendChild(panel);overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove()});document.body.appendChild(overlay);
}
let pendingOrganizerPlan=null;
function buildOrganizerPlan(day){
 const arr=sched({getDay:()=>day}).slice().sort((a,b)=>mins(htime(a,day))-mins(htime(b,day)));
 const placed=[],changes=[],failed=[];
 for(const h of arr){
   const original=mins(htime(h,day)),dur=Math.max(1,Number(h.dur||1));
   const fits=at=>at>=0&&at+dur<=1440&&!placed.some(x=>at<x.end&&x.start<at+dur);
   let target=original;
   if(!fits(target)){
     target=-1;
     // Cherche d’abord le prochain créneau libre, sans dépasser minuit.
     for(let t=original+1;t+dur<=1440;t++){if(fits(t)){target=t;break}}
     // Si la journée est trop remplie après l’heure initiale, cherche un trou avant.
     if(target<0)for(let t=0;t<original;t++){if(fits(t)){target=t;break}}
   }
   if(target<0){failed.push(h);continue}
   placed.push({h,start:target,end:target+dur});
   if(target!==original)changes.push({h,from:original,to:target,dur});
 }
 return {day,placed,changes,failed};
}
function applyOrganizer(){
 const day=pd, bad=dayConflicts(day);
 if(!bad.length){document.getElementById('organizer-modal')?.remove();openOrganizer();return}
 const plan=buildOrganizerPlan(day);
 pendingOrganizerPlan=plan;
 const overlay=document.getElementById('organizer-modal');
 const panel=overlay?.querySelector('section');if(!panel)return;
 const rows=plan.changes.map(c=>`<p style="padding:10px;background:var(--el);border-radius:10px;margin:6px 0"><b>${esc(c.h.name)}</b><br><span class="mu">${hm2(c.from)}–${hm2(c.from+c.dur)} → ${hm2(c.to)}–${hm2(c.to+c.dur)}</span></p>`).join('');
 if(plan.failed.length){panel.innerHTML=`<div class="mara-head"><span class="mara-avatar">${ic('alert')}</span><div><h2 style="margin:0">Planning trop chargé</h2><small class="mu">${DL[day]}</small></div></div><p>J’ai essayé de garder les durées et de trouver des créneaux libres, y compris avant l’heure initiale. Il reste ${plan.failed.length} activité(s) impossible(s) à placer sans dépasser minuit :</p>${plan.failed.map(h=>`<p>${esc(h.name)} · ${h.dur} min</p>`).join('')}<p class="mu">Aucun changement n’a été appliqué. Tu peux corriger les heures manuellement, sans quitter cet écran.</p><button class="btn" data-a="orgManual">Corriger manuellement</button><button class="btn g" data-a="orgClose">Fermer</button>`;return}
 panel.innerHTML=`<div class="mara-head"><span class="mara-avatar">${ic('spark')}</span><div><h2 style="margin:0">Voici ma proposition</h2><small class="mu">${DL[day]} · ${plan.changes.length} horaire(s) à déplacer</small></div></div><p>J’ai trouvé une organisation qui conserve toutes les durées et supprime les chevauchements. Vérifie les changements avant de les appliquer :</p>${rows||'<p>Aucun déplacement nécessaire.</p>'}<p class="mu" style="font-size:.82rem">Rien n’est modifié tant que tu ne confirmes pas.</p><button class="btn" data-a="orgConfirm">${ic('check')} Appliquer cette organisation</button><button class="btn g" data-a="orgClose">Pas maintenant</button>`;
}
function confirmOrganizerPlan(){
 const plan=pendingOrganizerPlan;if(!plan)return;
 if(plan.failed.length){alert('Certaines activités ne peuvent pas être placées.');return}
 for(const c of plan.changes){c.h.dayTimes=c.h.dayTimes||{};c.h.dayTimes[plan.day]=hm2(c.to)}
 save();pendingOrganizerPlan=null;document.getElementById('organizer-modal')?.remove();render();
 const done=document.createElement('div');done.id='organizer-modal';done.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(3,7,18,.72);display:flex;align-items:center;justify-content:center;padding:18px';
 done.innerHTML=`<section class="card" style="width:min(100%,520px);max-height:82vh;overflow:auto;padding:22px"><div class="mara-head"><span class="mara-avatar">${ic('check')}</span><div><h2 style="margin:0">Planning réorganisé</h2><small class="mu">${DL[plan.day]}</small></div></div><p style="margin-top:14px">Les chevauchements sont corrigés. Les durées ont été conservées.</p>${plan.changes.length?plan.changes.map(c=>`<p style="padding:10px;background:var(--el);border-radius:10px;margin:6px 0"><b>${esc(c.h.name)}</b><br>${hm2(c.from)} → ${hm2(c.to)}</p>`).join(''):'Aucun horaire n’a dû changer.'}<button class="btn" data-a="orgClose">Terminé</button></section>`;document.body.appendChild(done);
}


/* Résolution explicite des conflits : les horaires affichés sont ceux réellement enregistrés pour le jour choisi. */
let pendingHabitDraft=null;
function conflictsForHabit(o){
 const out=[];
 for(const day of o.days||[]){
  const start=mins(htime(o,day)),end=start+Math.max(1,Number(o.dur||1));
  for(const h of S.habits){
   if(h.id===o.id||!h.days.includes(day))continue;
   const hs=mins(htime(h,day)),he=hs+Math.max(1,Number(h.dur||1));
   if(start<he&&hs<end)out.push({day,h,start,end,hs,he});
  }
 }
 return out;
}
function commitHabitDraft(o){
 const i=S.habits.findIndex(h=>h.id===o.id);
 if(i<0)S.habits.push(o);else S.habits[i]=o;
 save();pendingHabitDraft=null;dr=null;
 document.getElementById('habit-conflict-overlay')?.remove();
 go('#habits');
}
function showHabitConflicts(o,conflicts){
 pendingHabitDraft=o;
 document.getElementById('habit-conflict-overlay')?.remove();
 const modal=document.createElement('div');modal.id='habit-conflict-overlay';
 modal.style.cssText='position:fixed;inset:0;z-index:10001;background:rgba(3,7,18,.82);display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(7px)';
 const days=[...new Set(conflicts.map(c=>c.day))];
 const rows=days.map(day=>{
  const relevant=conflicts.filter(c=>c.day===day);
  const first=relevant[0];
  return `<div style="padding:14px;border:1px solid var(--bd);background:var(--el);border-radius:15px;margin-top:10px">
   <div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><b>${DL[day]}</b><span class="mu">${relevant.length} conflit${relevant.length>1?'s':''}</span></div>
   ${relevant.map(c=>`<div style="margin-top:10px;padding:10px;border-radius:10px;background:var(--s)">
    <b>${esc(c.h.name)}</b><div class="mu" style="font-size:.88rem">${hm2(c.hs)}–${hm2(c.he)} · ${c.h.dur} min</div>
    <div class="mu" style="font-size:.8rem;margin-top:3px">Chevauche ${esc(o.name)} (${hm2(c.start)}–${hm2(c.end)})</div>
   </div>`).join('')}
   <label class="f" style="margin-top:12px">Nouvel horaire de « ${esc(o.name)} » · ${DL[day]}
    <input type="time" data-conflict-day="${day}" value="${htime(o,day)}">
   </label>
  </div>`;
 }).join('');
 modal.innerHTML=`<section class="card" style="width:min(100%,520px);max-height:88vh;overflow:auto;padding:20px;border:1px solid var(--bd);box-shadow:0 24px 70px #0008">
 <div class="mara-head"><span class="mara-avatar">${ic('alert')}</span><div><p class="cap" style="margin-bottom:3px">Vérification des horaires</p><h2 style="margin:0">Chevauchement détecté</h2><small class="mu">Rien n’a été enregistré pour le moment.</small></div></div>
 <p style="margin-top:14px">Voici les activités réellement concernées. Modifie l’heure ci-dessous pour chaque jour, puis vérifie à nouveau.</p>
 ${rows}
 <button class="btn" style="margin-top:16px" data-a="habitConflictApply">${ic('check')} Vérifier et enregistrer</button>
 <button class="btn g" data-a="habitConflictCancel">Retour à la modification</button>
 </section>`;
 document.body.appendChild(modal);
}
function applyHabitConflictDraft(){
 const modal=document.getElementById('habit-conflict-overlay');if(!modal||!pendingHabitDraft)return;
 const o=pendingHabitDraft;
 modal.querySelectorAll('[data-conflict-day]').forEach(input=>{
  if(input.value)o.dayTimes[input.dataset.conflictDay]=input.value;
 });
 const conflicts=conflictsForHabit(o);
 if(conflicts.length){showHabitConflicts(o,conflicts);return}
 commitHabitDraft(o);
}
function showOrganizerManual(){
 const day=pd,arr=sched({getDay:()=>day}).slice().sort((a,b)=>mins(htime(a,day))-mins(htime(b,day)));
 const old=document.getElementById('organizer-modal');old?.remove();
 const overlay=document.createElement('div');overlay.id='organizer-modal';
 overlay.style.cssText='position:fixed;inset:0;z-index:10000;background:rgba(3,7,18,.82);display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(7px)';
 const panel=document.createElement('section');panel.className='card';panel.style.cssText='width:min(100%,520px);max-height:88vh;overflow:auto;border:1px solid var(--bd);box-shadow:0 24px 70px #0008;padding:20px';
 const rows=arr.map(h=>`<div style="display:grid;grid-template-columns:minmax(0,1fr) 112px;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid var(--bd)">
  <div><b>${esc(h.name)}</b><div class="mu" style="font-size:.84rem">${htime(h,day)}–${hm2(mins(htime(h,day))+Number(h.dur||0))} · ${h.dur} min</div></div>
  <label class="f" style="margin:0">Heure<input type="time" data-manual-id="${h.id}" value="${htime(h,day)}"></label>
 </div>`).join('');
 const bad=dayConflicts(day);
 const conflicts=bad.length?`<div style="margin-top:14px;padding:12px;border-radius:12px;background:rgba(240,113,120,.1);border:1px solid rgba(240,113,120,.35)"><b style="color:var(--dg)">À corriger : ${bad.length} chevauchement${bad.length>1?'s':''}</b>${bad.map(c=>`<div style="margin-top:8px;font-size:.9rem"><b>${esc(c.a.name)}</b> ${hm2(c.as)}–${hm2(c.ae)} <span class="mu">avec</span> <b>${esc(c.b.name)}</b> ${hm2(c.bs)}–${hm2(c.be)}</div>`).join('')}</div>`:`<div style="margin-top:14px;padding:12px;border-radius:12px;background:rgba(61,220,151,.09);color:var(--ok)">Aucun chevauchement pour ${DL[day]}.</div>`;
 panel.innerHTML=`<div class="mara-head"><span class="mara-avatar">${ic('calendar')}</span><div><p class="cap" style="margin-bottom:3px">Correction manuelle</p><h2 style="margin:0">Horaires du ${DL[day]}</h2><small class="mu">Les durées restent inchangées.</small></div></div>
 <p style="margin-top:12px">Ajuste directement les heures. La liste ci-dessous correspond aux habitudes prévues ce jour-là.</p>
 ${rows||'<p class="mu">Aucune habitude ce jour-là.</p>'}
 <div id="manual-conflicts">${conflicts}</div>
 <button class="btn" style="margin-top:14px" data-a="orgManualApply">Vérifier et enregistrer</button>
 <button class="btn g" data-a="orgClose">Annuler</button>`;
 overlay.appendChild(panel);document.body.appendChild(overlay);
}
function applyOrganizerManual(){
 const overlay=document.getElementById('organizer-modal');if(!overlay)return;
 const day=pd,arr=sched({getDay:()=>day});
 const proposed=new Map([...overlay.querySelectorAll('[data-manual-id]')].map(i=>[i.dataset.manualId,i.value]));
 const conflicts=[];
 for(const h of arr){
  const st=proposed.get(h.id)||htime(h,day),a=mins(st),e=a+Math.max(1,Number(h.dur||1));
  for(const o of arr){
   if(o.id<=h.id)continue;
   const ot=proposed.get(o.id)||htime(o,day),b=mins(ot),f=b+Math.max(1,Number(o.dur||1));
   if(a<f&&b<e)conflicts.push({a:h,b:o,as:a,ae:e,bs:b,be:f});
  }
 }
 const box=overlay.querySelector('#manual-conflicts');
 if(conflicts.length){
  box.innerHTML=`<div style="margin-top:14px;padding:12px;border-radius:12px;background:rgba(240,113,120,.1);border:1px solid rgba(240,113,120,.35)"><b style="color:var(--dg)">Il reste ${conflicts.length} chevauchement${conflicts.length>1?'s':''}</b>${conflicts.map(c=>`<div style="margin-top:8px;font-size:.9rem"><b>${esc(c.a.name)}</b> ${hm2(c.as)}–${hm2(c.ae)} <span class="mu">avec</span> <b>${esc(c.b.name)}</b> ${hm2(c.bs)}–${hm2(c.be)}</div>`).join('')}<p class="mu" style="margin-bottom:0">Modifie les heures ci-dessus, puis relance la vérification.</p></div>`;
  return;
 }
 for(const h of arr){h.dayTimes=h.dayTimes||{};h.dayTimes[day]=proposed.get(h.id)||htime(h,day)}
 save();overlay.remove();render();
}
function showDeleteHabit(){
 document.getElementById('habit-delete-overlay')?.remove();
 const modal=document.createElement('div');modal.id='habit-delete-overlay';
 modal.style.cssText='position:fixed;inset:0;z-index:10001;background:rgba(3,7,18,.82);display:flex;align-items:center;justify-content:center;padding:18px;backdrop-filter:blur(7px)';
 modal.innerHTML=`<section class="card" style="width:min(100%,420px);padding:22px;border:1px solid var(--bd);box-shadow:0 24px 70px #0008"><div class="mara-head"><span class="mara-avatar" style="color:var(--dg)">${ic('trash')}</span><div><p class="cap" style="margin-bottom:3px">Suppression</p><h2 style="margin:0">Supprimer cette habitude ?</h2></div></div><p style="margin:14px 0">« ${esc(dr?.name||'Cette habitude')} » sera retirée de ta routine. Cette action ne peut pas être annulée.</p><button class="btn d" data-a="delConfirm">Supprimer l’habitude</button><button class="btn g" data-a="delCancel">Garder l’habitude</button></section>`;
 document.body.appendChild(modal);
}

function showResetConfirm(){
 document.getElementById('reset-overlay')?.remove();
 const modal=document.createElement('div');modal.id='reset-overlay';modal.className='chat-delete-overlay';
 modal.innerHTML=`<section class="chat-delete-dialog reset-dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title"><span class="reset-mark">${ic('trash')}</span><h2 id="reset-title">Réinitialiser Aube ?</h2><p>Cette action effacera tes habitudes, ton planning, tes notes et tes préférences enregistrées sur cet appareil. Elle ne peut pas être annulée.</p><div class="chat-delete-actions"><button class="btn d" data-a="resetConfirm">Tout effacer</button><button class="btn g" data-a="resetCancel">Garder mes données</button></div></section>`;
 document.body.appendChild(modal);
}

const A={
tog(t){navigator.vibrate&&navigator.vibrate(25);doTog(t.dataset.id)},
tab(t){tab=t.dataset.v;render()},edit(t){go('#edit/'+t.dataset.id)},new(){go('#new')},back(){history.length>1?history.back():go('#habits')},
fi(t){dr.icon=t.dataset.v;render()},fc(t){dr.cat=t.dataset.v;render()},fd(t){const v=+t.dataset.v;dr.days=dr.days.includes(v)?dr.days.filter(x=>x!==v):[...dr.days,v];render()},
ff(t){dr.freq=t.value;dr.days=t.value==='daily'?[...ALL]:t.value==='weekdays'?[...WK]:dr.days.length&&dr.days.length<7?dr.days:[...WK];render()},fa(t){dr.alarm=t.checked;render()},fs(t){dr.snd=t.value},
sv(){if(!dr.name.trim()){$('[data-in=name]').focus();return}if(!dr.days.length){alert('Choisis au moins un jour.');return}const o={id:dr.id||'h'+Date.now().toString(36),name:dr.name.trim(),desc:dr.desc,cat:dr.cat,icon:dr.icon,time:dr.time||'08:00',dayTimes:{...(dr.dayTimes||{})},dur:Math.max(1,+dr.dur||15),days:[...dr.days],alarm:dr.alarm,snd:dr.snd};const conflicts=conflictsForHabit(o);if(conflicts.length){showHabitConflicts(o,conflicts);return}commitHabitDraft(o)},

organize(){openOrganizer()},orgApply(){applyOrganizer()},orgConfirm(){confirmOrganizerPlan()},orgManual(){showOrganizerManual()},orgManualApply(){applyOrganizerManual()},orgClose(){pendingOrganizerPlan=null;document.getElementById('organizer-modal')?.remove()},
habitConflictApply(){applyHabitConflictDraft()},habitConflictCancel(){pendingHabitDraft=null;document.getElementById('habit-conflict-overlay')?.remove()},
del(){showDeleteHabit()},delConfirm(){if(!dr)return;S.habits=S.habits.filter(h=>h.id!==dr.id);save();dr=null;document.getElementById('habit-delete-overlay')?.remove();go('#habits')},delCancel(){document.getElementById('habit-delete-overlay')?.remove()}, openMara(){go('#mara')},journal(){go('#journal')},backHome(){go('#today')},backPlan(){go('#plan')},scheduleView(){go('#timetable')},exportTimetable(){exportTimetableImage()},deleteReflection(t){S.reflections=S.reflections.filter(r=>r.id!==t.dataset.id);save();render()},

pd(t){pd=+t.dataset.v;render()},
mood(t){const k=key(new Date()),o=S.mood[k]||{th:[]},m=t.dataset.v,ch=o.m!==m;o.th=o.th||[];o.m=m;o.t=($('#note')||{}).value||o.t||'';S.mood[k]=o;if(ch)o.th.push({r:'a',t:moodReply(m)});save();render()},
note(){const k=key(new Date()),o=S.mood[k]||{m:'',th:[]},v=$('#note').value.trim();o.th=o.th||[];o.t=v;S.mood[k]=o;if(v){o.th.push({r:'u',t:v},{r:'a',t:noteReply(o.m,v)});S.reflections=S.reflections||[];S.reflections.push({id:'r'+Date.now().toString(36),date:new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}),day:k,m:o.m||'ok',t:v,created:Date.now()});}save();render()},
cs(t){const id=t.dataset.id,img=pendingImg[id];delete pendingImg[id];sendTo(id,$('#'+id+'i').value,img)},cq(t){sendTo('pc',t.dataset.q)},cc(){showChatDelete('pc',-1)},chatDelOne(){if(!pendingChatDelete)return;const {id,idx}=pendingChatDelete,arr=chatThread(id);if(idx>=0&&idx<arr.length)arr.splice(idx,1);pendingChatDelete=null;document.getElementById('chat-delete-overlay')?.remove();persistChat(id,arr)},chatDelAll(){if(!pendingChatDelete)return;const id=pendingChatDelete.id;pendingChatDelete=null;document.getElementById('chat-delete-overlay')?.remove();persistChat(id,[])},chatDelCancel(){pendingChatDelete=null;document.getElementById('chat-delete-overlay')?.remove()},br(){br=!br;render()},
ai(t){const f=t.files&&t.files[0];if(f)handleImage(t.dataset.id,f)},rmimg(t){delete pendingImg[t.dataset.id];const el=$('#'+t.dataset.id+'imgp');if(el)el.innerHTML=''},voice(t){startVoice(t.dataset.id)},
name(){S.name=$('#nm').value.trim();save();render()},
pv(t){const id=t.dataset.id;if(pl===id){pl='';stopSnd()}else{pl=id;play(id,false)}render()},ps(t){S.prefs.snd=t.dataset.id;save();play(t.dataset.id,false);pl=t.dataset.id;render()},
async ds(t){const id=t.dataset.id;if(!confirm('Supprimer ce son ?'))return;stopSnd();pl='';delete decodedBuf[id];try{await idbDo('readwrite',s=>s.delete(id))}catch(e){}CS=CS.filter(x=>x.id!==id);if(S.prefs.snd===id)S.prefs.snd='urgent';S.habits.forEach(h=>{if(h.snd===id)h.snd=''});save();render()},
astart(){stopAl();render()},atog(t){stopAl();const k=key(new Date());(S.done[k]||[]).includes(t.dataset.id)?render():doTog(t.dataset.id)},
asn(t){stopAl();const n=new Date();S.fired[t.dataset.id+key(n)+'s']=n.getHours()*60+n.getMinutes()+S.prefs.snooze;save()},adm(){stopAl()},
install(){window.dip&&window.dip.prompt()},
exp(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));a.download='aube-sauvegarde-'+key(new Date())+'.json';a.click()},
rst(){showResetConfirm()},resetConfirm(){S=seed();save();document.getElementById('reset-overlay')?.remove();go('#today')},resetCancel(){document.getElementById('reset-overlay')?.remove()}
};

/* Planning : déplacement par appui long, sans boutons visibles */
let planPress=null,planDrag=null,planTarget=null,suppressPlanClick=false;
const planCard=e=>e.target.closest('.tl .hc.plan-drag');
function planClear(){
 if(planPress&&planPress.timer)clearTimeout(planPress.timer);
 document.querySelectorAll('.tl .hc.dragging').forEach(x=>x.classList.remove('dragging'));
 document.querySelectorAll('.tl .it.drop-target').forEach(x=>x.classList.remove('drop-target'));
 planPress=null;planDrag=null;planTarget=null;
}
function planDropAt(x,y){
 const el=document.elementFromPoint(x,y),it=el&&el.closest('.tl .it');
 document.querySelectorAll('.tl .it.drop-target').forEach(x=>x.classList.remove('drop-target'));
 if(it&&planDrag&&it!==planDrag.closest('.it')){it.classList.add('drop-target');planTarget=it}else planTarget=null;
}
document.addEventListener('pointerdown',e=>{
 const card=planCard(e);if(!card||e.button!==0)return;
 planPress={card,x:e.clientX,y:e.clientY,timer:setTimeout(()=>{
   planDrag=card;planDrag.classList.add('dragging');suppressPlanClick=true;
   if(navigator.vibrate)navigator.vibrate(25);
 },430)};
},{passive:true});
document.addEventListener('pointermove',e=>{
 if(!planPress)return;
 if(!planDrag){
   if(Math.abs(e.clientX-planPress.x)>10||Math.abs(e.clientY-planPress.y)>10){clearTimeout(planPress.timer);planPress=null}
   return;
 }
 e.preventDefault();planDropAt(e.clientX,e.clientY);
},{passive:false});
document.addEventListener('pointerup',e=>{
 if(!planPress)return;
 const source=planDrag, target=planTarget, day=pd;
 if(source&&target){
   const a=S.habits.find(h=>h.id===source.dataset.planId);
   const b=S.habits.find(h=>h.id===target.querySelector('.hc.plan-drag')?.dataset.planId);
   if(a&&b&&a.id!==b.id){
     const ta=htime(a,day),tb=htime(b,day);
     a.dayTimes=a.dayTimes||{};b.dayTimes=b.dayTimes||{};
     a.dayTimes[day]=tb;b.dayTimes[day]=ta;
     const conflict=[a,b].some(h=>S.habits.some(o=>o.id!==h.id&&o.days.includes(day)&&mins(htime(h,day))<hend(o,day)&&mins(htime(o,day))<hend(h,day)));
     if(conflict&&!confirm('Cet échange crée un chevauchement avec une autre activité. Veux-tu quand même échanger les horaires ?')){
       a.dayTimes[day]=ta;b.dayTimes[day]=tb;
     }else save();
     render();
   }
 }
 planClear();
 setTimeout(()=>{suppressPlanClick=false},80);
},{passive:true});
document.addEventListener('pointercancel',planClear,{passive:true});
document.addEventListener('click',e=>{
 if(suppressPlanClick){e.preventDefault();e.stopImmediatePropagation();suppressPlanClick=false}
},true);


/* Suppression par appui long dans les conversations de Mara */
let chatHold=null,chatHoldFired=false,pendingChatDelete=null;
function showChatDelete(id,idx=-1){pendingChatDelete={id,idx};document.getElementById('chat-delete-overlay')?.remove();const modal=document.createElement('div');modal.id='chat-delete-overlay';modal.className='chat-delete-overlay';modal.innerHTML=`<section class="chat-delete-dialog"><h2>${idx>=0?'Message sélectionné':'Effacer la discussion ?'}</h2><p>${idx>=0?'Tu peux retirer ce message ou effacer toute la conversation.':'Cette action supprimera les messages de cette discussion.'}</p><div class="chat-delete-actions">${idx>=0?'<button class="btn d" data-a="chatDelOne">Supprimer ce message</button>':''}<button class="btn d" data-a="chatDelAll">Effacer la discussion</button><button class="btn g" data-a="chatDelCancel">Annuler</button></div></section>`;document.body.appendChild(modal)}
function chatThread(id){if(id==='pc')return S.chat=S.chat||[];const k=key(new Date());S.mood[k]=S.mood[k]||{m:'',t:'',th:[]};return S.mood[k].th=S.mood[k].th||[]}
function persistChat(id,arr){if(id==='pc')S.chat=arr;else{const k=key(new Date());S.mood[k]=S.mood[k]||{m:'',t:'',th:[]};S.mood[k].th=arr}save();render()}
document.addEventListener('pointerdown',e=>{
 const bubble=e.target.closest('.chat .bu');const box=e.target.closest('.chat');if(!box)return;
 chatHoldFired=false;chatHold={box,bubble,id:box.id.replace('box','')};
 chatHold.timer=setTimeout(()=>{chatHoldFired=true;const id=chatHold.id,arr=chatThread(id);
   if(bubble){const idx=[...box.querySelectorAll('.bu')].indexOf(bubble);showChatDelete(id,idx)}else showChatDelete(id,-1);
 },650);
},{passive:true});
document.addEventListener('pointerup',()=>{if(chatHold&&chatHold.timer)clearTimeout(chatHold.timer);chatHold=null},{passive:true});
document.addEventListener('pointercancel',()=>{if(chatHold&&chatHold.timer)clearTimeout(chatHold.timer);chatHold=null},{passive:true});

document.addEventListener('focusin',e=>{if(e.target.matches('.mara-screen .cin textarea'))document.body.classList.add('chat-keyboard')});
document.addEventListener('focusout',e=>{if(e.target.matches('.mara-screen .cin textarea'))setTimeout(()=>{if(!document.activeElement?.matches('.mara-screen .cin textarea'))document.body.classList.remove('chat-keyboard')},180)});
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||/^(INPUT|SELECT)$/.test(t.tagName)||!A[t.dataset.a])return;A[t.dataset.a](t)});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.in&&dr){dr[t.dataset.in]=t.value}else if(t.dataset.daytime&&dr){dr.dayTimes=dr.dayTimes||{};dr.dayTimes[t.dataset.daytime]=t.value}else if(t.dataset.a==='pvol'){S.prefs.vol=t.value/100;save();if(cur&&cur.a)cur.a.volume=S.prefs.vol}});
document.addEventListener('change',async e=>{const t=e.target,a=t.dataset.a;if(!a)return;
if(a==='reflectionNotify'){if(t.checked){try{if(!('Notification'in window)){throw new Error('no-notification')}if(Notification.permission==='default')await Notification.requestPermission()}catch(x){}if(!('Notification'in window)||Notification.permission!=='granted'){t.checked=false;alert('Autorise les notifications dans les réglages du navigateur pour activer ce rappel.');return}}S.prefs.reflectionNotify=t.checked;save();render();return}
if(a==='pn'){unlockAudio();if(t.checked){try{if(Notification.permission==='default')await Notification.requestPermission()}catch(x){}}S.prefs.notif=t.checked;keepAliveAudio(t.checked);holdWake(t.checked);scheduleAlarms()}
else if(a==='psn')S.prefs.snooze=+t.value;else if(a==='pvol'){render();return}
else if(a==='ff'||a==='fa'||a==='fs'){A[a](t);return}
else if(a==='ai'){A.ai(t);return}
else if(a==='as'&&t.files[0]){const f=t.files[0];if(f.size>6e6){alert('Fichier trop lourd (6 Mo max).');return}if(CS.length>=8){alert('Espace limité : 8 sons perso max. Supprime-en un d’abord.');return}try{const blob=await transcodeAlarm(f);const id='c'+Date.now();const name=f.name.replace(/\.[^.]+$/,'')||'Mon son';await idbDo('readwrite',s=>s.put({id,name,blob}));CS.push({id,name,blob});delete decodedBuf[id];S.prefs.snd=id;save();render();pl=id;play(id,false)}catch(x){alert(x&&x.message==='court'?'Ce son est trop court.':'Impossible de lire ce fichier. Essaie un MP3, WAV, M4A ou AAC.')}return}
else if(a==='imp'&&t.files[0]){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.habits))throw 0;S=d;save();render();alert('Sauvegarde importée')}catch(x){alert('Fichier invalide')}};r.readAsText(t.files[0]);return}
save();render()});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)&&e.target.dataset&&e.target.dataset.enter){e.preventDefault();A.cs({dataset:{id:e.target.dataset.enter}})}});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window.dip=e;render()});addEventListener('appinstalled',()=>{window.dip=null;render()});
if('serviceWorker'in navigator&&/^https?:/.test(location.protocol)){
 navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(()=>navigator.serviceWorker.register('/aube/sw.js').catch(()=>{}));
}
addEventListener('online',()=>{if(location.hash==='#mood'||location.hash==='#habits'||location.hash==='#mara'||location.hash==='#plan')render()});addEventListener('offline',()=>{if(location.hash==='#mood'||location.hash==='#habits'||location.hash==='#mara'||location.hash==='#plan')render()});render();tick();scheduleAlarms();checkReflectionReminder();

}
