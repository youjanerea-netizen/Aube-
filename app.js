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
Object.assign(P,{cart:c(8,21,1)+c(19,21,1)+p('M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'),broom:p('m16 22-1-4','M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1','M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z','m8 22 1-4'),bulb:p('M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5','M9 18h6','M10 22h4')});
const TC={courses:['Courses','#3ddc97','cart'],menage:['Ménage','#4c8dff','broom'],cuisine:['Cuisine','#ff9a4c','utensils'],idees:['Idées','#e2b657','bulb'],oublis:['Oublis','#ff7aa2','bell']};
let tCat='oublis',taskOk=false,taskOkT=null;
const ic=n=>`<svg class="i" viewBox="0 0 24 24">${P[n]||P.sun}</svg>`;

/* Données */
function seed(){const a=[['Réveil & mobilité','Étirements doux pour ouvrir la journée.','sport','sun','06:30',15,ALL],['Réviser les mathématiques','Un bloc calme avant le reste.','studies','book','07:15',45,WK],['Marche de midi','Sortir, marcher, revenir plus léger.','sport','bike','12:30',20,ALL],['Deep work','Un créneau protégé, sans notifications.','work','briefcase','14:00',90,WK],['30 min de programmation','Avancer un projet, même un peu.','studies','code','18:00',30,ALL],['Lecture du soir','Lire papier, loin de l’écran.','personal','book','21:00',20,ALL]];
return{name:'',habits:a.map((x,i)=>({id:'h'+i,name:x[0],desc:x[1],cat:x[2],icon:x[3],time:x[4],dur:x[5],days:x[6],alarm:true,snd:''})),done:{},mood:{},prefs:{notif:false,snd:'urgent',vol:.9,snooze:10},fired:{}}}
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}S=S||seed();S.reflections=Array.isArray(S.reflections)?S.reflections:[];S.tasks=Array.isArray(S.tasks)?S.tasks:[];S.prefs=S.prefs||{};
Object.entries(S.mood||{}).forEach(([day,m])=>{if(m&&m.t&&!S.reflections.some(r=>r.day===day&&r.t===m.t))S.reflections.push({id:'legacy-'+day,date:day,m:m.m||'ok',t:m.t,day,created:0})});if(S.prefs&&(!S.prefs.snd||S.prefs.snd==='aube'))S.prefs.snd='urgent';
let saveWarned=false;
const persist=()=>{try{localStorage.setItem(K,JSON.stringify(S));return true}catch(e){return false}};
const save=()=>{if(!persist()){for(const k of[3,1,0]){slimImages(k);if(persist())break}if(!persist()&&!saveWarned){saveWarned=true;setTimeout(()=>{try{showInfoModal('Espace de stockage plein','Aube n’arrive plus à enregistrer sur cet appareil. Fais une sauvegarde (Profil → Données → Exporter), puis libère de l’espace : supprime des photos du chat ou des sons personnalisés.',{danger:true,icon:'x'})}catch(e){}},0)}}try{scheduleAlarms()}catch(e){}};
const col=h=>(CAT[h.cat]||CAT.free)[1];
const htime=(h,day)=>h.dayTimes&&h.dayTimes[day]||h.time; const hdur=(h,day)=>Number((h.dayDurs&&h.dayDurs[day])||h.dur||0);
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

/* ============================================================================
   MARA — moteur conversationnel local, 100 % hors connexion.
   Aucun appel réseau, aucun modèle distant : tout tourne dans le navigateur.
   Le moteur combine :
     - une reconnaissance d'intentions très large (des dizaines de formulations
       par demande, argot compris) avec tolérance aux fautes de frappe ;
     - une lecture fine et priorisée du planning : jour précis (aujourd'hui,
       demain, après-demain, hier, un jour nommé, « vendredi prochain »),
       segment de journée (matin/après-midi/soir/nuit), instant présent,
       activité suivante, temps restant/avant une activité nommée, créneaux
       libres (avec durée minimale), durée ou heure de départ d'une activité,
       tâches restantes, existence d'une activité un jour donné, résumé de
       semaine ;
     - une mémoire de la conversation en cours pour ne jamais répéter deux
       fois la même phrase, et une mémoire persistante des informations que
       la personne choisit de confier ;
     - des actions en langage naturel sur le planning (ajouter, décaler de
       façon relative ou absolue, supprimer, marquer une tâche comme faite
       ou non faite) ;
     - un registre émotionnel riche et une détection de crise strictement
       prioritaire sur tout le reste.
   ============================================================================ */
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
/* Tolérance aux fautes de frappe : si le mot-clé exact n’est pas trouvé tel quel,
   on compare chaque mot du message au mot-clé avec une distance de Levenshtein,
   pour attraper les fautes courantes et la frappe rapide sur mobile. */
function lev(a,b){if(a===b)return 0;const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let prev=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const cur=[i];for(let j=1;j<=n;j++)cur[j]=a[i-1]===b[j-1]?prev[j-1]:1+Math.min(prev[j-1],prev[j],cur[j-1]);prev=cur}return prev[n]}
const has=(t,...w)=>w.some(x=>{if(new RegExp('\\b'+x).test(t))return true;if(!/\s/.test(x)&&x.length>=6){const tol=x.length>=8?2:1;return t.split(' ').some(tok=>{if(tok.length<5)return false;if(Math.abs(tok.length-x.length)>tol)return false;if(x.startsWith(tok)||tok.startsWith(x))return false;return lev(tok,x)<=tol})}return false});
const hasAny=(t,arr)=>arr.some(x=>has(t,x));
const pick=(a,skip)=>{if(a.length<2)return a[0];let i=Math.floor(Math.random()*a.length);if(skip!=null&&a.length>1)while(i===skip)i=Math.floor(Math.random()*a.length);return a[i]};
const fname=()=>S.name.trim().split(' ')[0],N=()=>fname()?', '+fname():'';
const mins=t=>+t.slice(0,2)*60+ +t.slice(3),hm2=m=>{const v=((Math.trunc(m)%1440)+1440)%1440;return pad(Math.floor(v/60))+':'+pad(v%60)},dlab=m=>(m>=60?Math.floor(m/60)+' h':'')+(m%60?(m>=60?' ':'')+m%60+' min':'');
const remaining=()=>{const n=new Date(),k=key(n);return sched(n).filter(h=>!isDone(h,k))};
const light=()=>{const r=remaining().sort((a,b)=>a.dur-b.dur)[0];return r?`\n\nSi tu veux, ne garde aujourd’hui que le plus léger : « ${r.name} » (${r.dur} min). Le reste peut attendre.`:'\n\nTu as tout terminé aujourd’hui : tu peux vraiment souffler.'};
const gaps=(d,from)=>{const hs=S.habits.filter(h=>h.days.includes(d)).sort((a,b)=>htime(a,d).localeCompare(htime(b,d)));let c=Math.max(420,from||0);const o=[];for(const h of hs){const a=mins(htime(h,d));if(a-c>=30)o.push([c,a]);c=Math.max(c,a+Number(h.dur||0))}if(1320-c>=30)o.push([c,1320]);return o};

/* Mémoire locale de la conversation (persistée avec le reste des données) */
const MCTX=()=>{S.mara=S.mara||{turns:[],lastIt:'',lastIdx:{},lastTip:-1,memory:[]};S.mara.memory=S.mara.memory||[];return S.mara};

/* Détection de crise : prioritaire sur tout le reste, jamais désactivée */
const CR=['suicid','me tuer\\b','en finir avec','envie de mourir','veux mourir','me faire du mal','me blesser','plus envie de vivre','envie de disparaitre','disparaitre pour toujours','plus envie d exister','j en peux vraiment plus de vivre'];
const CRM=()=>`Merci de me le dire${N()}, et je suis vraiment là avec toi en ce moment. Ce que tu ressens compte énormément, et tu n’as pas à porter ça tout(e) seul(e).\n\nJe ne suis qu’une application : je ne peux pas remplacer une vraie personne dans un moment pareil. S’il te plaît, contacte dès maintenant le 3114 (numéro national de prévention du suicide, gratuit, 24 h/24, 7 j/7) ou le 112 en cas de danger immédiat. Parle-en aussi à quelqu’un en qui tu as confiance, ce soir si possible.`;

/* --- Résolution d'un jour à partir du texte : aujourd'hui, hier, demain,
   après-demain, jour de la semaine nommé (avec « prochain » = semaine
   suivante). Retourne null si aucun jour n'est mentionné. --- */
function dayFromText(t,base){
 const n=base||new Date();
 if(/\bapres\s*demain\b/.test(t))return{day:(n.getDay()+2)%7,label:'après-demain',rel:2};
 if(/\bdemain\b/.test(t))return{day:(n.getDay()+1)%7,label:'demain',rel:1};
 if(/\bhier\b/.test(t))return{day:(n.getDay()+6)%7,label:'hier',rel:-1};
 if(/\b(aujourd\s*hui|ajd|ce jour)\b/.test(t))return{day:n.getDay(),label:'aujourd’hui',rel:0};
 for(let i=0;i<7;i++){
  const name=norm(DL[i]);
  if(new RegExp('\\b'+name+'\\b').test(t)){
   const prochain=/\bprochain(e)?\b/.test(t);
   let diff=(i-n.getDay()+7)%7;
   if(prochain&&diff===0)diff=7;
   return{day:i,label:diff===0?'aujourd’hui':DL[i].toLowerCase(),rel:diff};
  }
 }
 return null;
}
const dayLabel=info=>!info||info.rel===0?'aujourd’hui':info.label;

/* Segments approximatifs de la journée, pour « qu'est-ce que j'ai ce matin /
   cet après-midi / ce soir ? » */
const DAYPARTS={matin:[300,720],apresmidi:[720,1080],soir:[1080,1440],nuit:[1320,1620]};
function daypartOf(t){
 if(has(t,'cet apres midi','l apres midi','dans l apres midi','en debut d apres midi','cette apres midi','mon apres midi','en fin d apres midi'))return['après-midi',DAYPARTS.apresmidi];
 if(has(t,'ce soir','en soiree','la soiree','dans la soiree','ce soire','ce soire la','ma soiree','ce soir la','tantot ce soir'))return['soir',DAYPARTS.soir];
 if(has(t,'cette nuit','en pleine nuit','tard ce soir'))return['nuit',DAYPARTS.nuit];
 if(has(t,'ce matin','demain matin','en debut de matinee','dans la matinee','tot ce matin','ma matinee','la matinee','le matin'))return['matin',DAYPARTS.matin];
 return null;
}

/* --- Trouver une habitude mentionnée librement dans une phrase (nom complet
   ou mot significatif du nom), pour des questions comme « combien de temps
   dure le sport ? » sans devoir nommer l'habitude à l'exact. --- */
function mentionedHabit(t){
 let best=null,bestLen=0;
 for(const h of S.habits){
  const hn=norm(h.name);if(!hn)continue;
  if(t.includes(hn)&&hn.length>bestLen){best=h;bestLen=hn.length;continue}
  for(const w of hn.split(' '))if(w.length>=4&&new RegExp('\\b'+w+'\\b').test(t)&&w.length>bestLen){best=h;bestLen=w.length}
 }
 return best;
}

/* --- Marqueurs de formulation pour classer une demande liée au planning --- */
function wantsNow(t){
 if(has(t,'maintenant','en ce moment','actuellement','presentement','tout de suite','a l instant','en train de faire','la tout de suite','la maintenant','activite en cours','tache en cours','activite actuelle','tache actuelle','sur quoi je suis','je suis sur quoi','je suis en train de quoi','a cet instant'))return true;
 if(/\b(fais|fait|font)\s+quoi\s+la\s*$/.test(t)||/\bc est\s+quoi\s+la\s*$/.test(t)||/\bqu est ce que\s+(je|tu)\s+fais\s+la\b/.test(t)||/\bje\s+suis\s+cense\s+faire\s+quoi\b/.test(t)||/\bje\s+dois\s+faire\s+quoi\b/.test(t))return true;
 return false;
}
function wantsNext(t){
 if(/\bapres\b(?!\s*demain)/.test(t))return true;
 return has(t,'prochaine activite','prochaine tache','prochain creneau','ensuite','la suite','qu est ce qui vient','qu est ce qui suit','et apres','c est quand la prochaine','qui arrive','ce qui vient','c est quoi la suite','ma prochaine','mon prochain','le suivant','la suivante','a suivre','apres ca','apres celle la','apres celui la');
}
function wantsSchedule(t){
 return has(t,'programme','planning','agenda','emploi du temps','au programme','quoi de prevu','qu est ce qui est prevu','mes activites','ma journee','mon journee','mes taches du jour','mes taches','on a quoi','on fait quoi','qu est ce qu on fait','qu est ce que je fais','qu est ce que j ai','qu est ce qu on a','j ai quoi','j ai quoi de prevu','c est quoi le programme','liste des activites','toutes les activites','programme complet','tout le programme','toute la journee','tous les horaires','emploi du temps complet','recapitule','fais le point','a quoi ressemble','montre moi','affiche','deroule','agenda complet','du debut a la fin','de a a z','qu est ce qui m attend','qu est ce qu il y a','y a quoi','il y a quoi','voir mes taches','voir mon planning','donne moi mon programme','dis moi ce que j ai','rappelle moi mon programme','mes trucs a faire','j ai des trucs a faire','j ai quoi comme','mon horaire','mes horaires','horaire','quoi de neuf dans mon planning','qu est ce qui est au programme','on a cours','j ai cours','mes cours','ma matinee','mon apres midi','ma soiree');
}
function wantsFree(t){return has(t,'libre','dispo','creneau','du temps libre','un trou','de la place','de temps libre','creux','me liberer','caser','glisser','temps mort','rien de prevu')}
function wantsDuration(t){return has(t,'combien de temps dure','dure combien','ca dure combien','duree de','ca prend combien de temps')}
function wantsStartTime(t){return has(t,'a quelle heure','quand commence','ca commence quand','heure de debut','debute a quelle heure','ca demarre quand')}
function wantsRemaining(t){return has(t,'il me reste','qu est ce qu il reste','qu est ce qui reste','reste a faire','pas encore fait','qu est ce que j ai pas fait','qu est ce qu il me reste')}
function wantsWeekSummary(t){return (has(t,'resume','recap','vue d ensemble','apercu')&&has(t,'semaine'))||has(t,'toute ma semaine','ma semaine complete')}
function wantsExists(t){return has(t,'est ce que j ai','ai je','j ai bien','y a t il','j aurai','est ce que j aurai')}
function wantsHelp(t){return has(t,'que peux tu faire','qu est ce que tu sais faire','tes fonctions','comment tu marches','comment ca marche','liste des commandes','tu sers a quoi','a quoi tu sers','montre moi ce que tu sais faire')&&!has(t,'comment tu vas')}
function wantsUntil(t){return has(t,'combien de temps','il me reste combien','dans combien de temps','c est dans combien de temps')}
/* Guard strict utilisé uniquement pour décider si un message doit être traité
   comme émotionnel en priorité (donc SANS ces mots, pas de collision avec
   « aujourd'hui »/« demain » qui apparaissent aussi dans des phrases purement
   émotionnelles comme « je suis fatigué aujourd'hui »). */
function explicitScheduleCue(t){
 return has(t,'programme','planning','agenda','emploi du temps','habitude','creneau','libre','dispo','prochain','rendez vous','rdv','tache','activite','horaire');
}

/* --- Détection d'intention émotionnelle/sociale : mots-clés + argot, avec
   tolérance aux fautes de frappe grâce à has(). --- */
function intent(t){
 if(hasAny(t,CR))return'crisis';
 /* Réponses très courtes : acquiescement, doute, rire */
 if(/^(ok|okay|oui|ouais|ouep|yep|non|nan|nope|d accord|dacc|daccord|bof|hmm+|mouais|peut etre|je sais pas|jsp|pas sur|aucune idee|ah ok|ah d accord|ok merci)$/.test(t))return'ack';
 if(/^(mdr+|lol+|ptdr+|haha+|hihi+|xd+|mdrr+)$/.test(t)||has(t,'trop drole','ca m a fait rire','je rigole','morte de rire','mort de rire'))return'laugh';
 if(has(t,'merci','remercie','thanks','thx','mrc'))return'thanks';
 if(hasAny(t,['au revoir','a bientot','a demain','bonne nuit','bonne soiree','bonne journee','bonne fin de journee','ciao','tchao','tchuss','a tout a l heure','a plus tard','bye\\b','je file','je vais dormir','je vais me coucher','je te laisse','je m en vais','bon week end','bonne semaine'])||/\ba plus\s*$/.test(t))return'bye';
 if(hasAny(t,['wesh','wsh\\b','yo\\b','bien ou quoi','cv\\b','coucou','hello','hey\\b','salut','bonjour','bonsoir','cc\\b','bjr\\b','slt\\b','bsr\\b','hola','yop','allo\\b','me revoila']))return'greet';
 if(has(t,'ca va\\?','comment ca va','ca va toi','ca va et toi','et toi ca va','tu vas bien','comment tu vas','comment vas tu','comment tu te sens','tu vas comment','ca roule','quoi de neuf','tu fais quoi de beau')||/^ca va$/.test(t))return'howru';
 if(hasAny(t,['comment tu t appelles','tu t appelles comment','ton nom','ton prenom','c est quoi ton nom','quel est ton nom']))return'name';
 if(hasAny(t,['qui t a cree','qui t a fait','qui t a programme','qui t a code','qui est ton createur','qui est derriere toi','tu viens d ou','d ou tu viens']))return'creator';
 if(hasAny(t,['que sais tu sur moi','qu est ce que tu sais de moi','tu sais quoi sur moi','qu est ce que tu as retenu','tu retiens quoi','tu te souviens de quoi','tu te souviens de moi','tu te rappelles de moi','ce que tu retiens','ta memoire','montre ta memoire','ce que je t ai dit']))return'memory';
 if(hasAny(t,['pourquoi tu','comment tu marches','tu es qui','t es qui','tu es quoi','es tu une ia','es tu un robot','tu es reelle','tu es humaine','tu es vivante','t es une vraie','tu es intelligente','tu es une ia','tu es un robot','tu peux apprendre','tu es intelligente']))return'about';
 if(hasAny(t,['je t aime','tu me manques','t es mignonne','tu es mignonne','tu es ma meilleure amie','ma meilleure amie','ma seule amie','t es ma pote']))return'love';
 if(hasAny(t,['blague','fais moi rire','raconte moi une histoire drole','une histoire drole','fais une blague','un truc drole','fais moi sourire']))return'joke';
 if(hasAny(t,['motive moi','motivation du jour','donne moi de la motivation','mot d encouragement','encourage moi','encouragement','booste moi','un boost','remonte moi le moral','remotive moi','citation','pousse moi','un coup de pouce moral']))return'motivate';
 if(hasAny(t,['meteo','quel temps il fait','quel temps fait','il fait quel temps','il pleut','il fait beau','il fait chaud','il fait froid','temperature dehors']))return'weather';
 if(hasAny(t,['cherche sur internet','cherche sur google','va sur internet','sur google','wikipedia','actualite','les infos','les news','resultat du match','score du match','cours de la bourse','bitcoin']))return'offline';
 if(hasAny(t,['tu es genial','tu es top','tu geres','t es la meilleure','j adore mara','tu es incroyable','trop bien mara','tu m aides beaucoup','tu es parfaite','t es au top','tu assures','t es forte','quelle efficacite','tu es la meilleure','tu es trop forte','tu es super','tu es utile','bravo mara','bien joue mara']))return'compliment';
 if(hasAny(t,['tu es nul','t es nulle','tu sers a rien','tu comprends rien','je te deteste','tu es useless','t es naze','tu es nulle','t es inutile','tu es inutile','tu es debile','tu es conne','tu es bete','tu m enerves','t es pas intelligente','ferme la','ta gueule']))return'insult';
 if(hasAny(t,['je comprends pas','j ai pas compris','c est pas clair','tu racontes quoi','ca veut dire quoi','je pige rien','je capte pas','repete','tu peux reformuler','explique mieux','j y comprends rien','hein\\?']))return'confused';
 if(hasAny(t,['desole mara','pardon mara','excuse moi de te parler comme ca','je m excuse','excuse moi mara','desole de t avoir','pardon de t avoir']))return'apology';
 if(hasAny(t,['insomnie','je dors pas','j arrive pas a dormir','arrive pas a dormir','mal dormi','nuit blanche','cauchemar','reveil difficile','je me reveille la nuit','pas dormi','trop peu dormi','je dors mal','sommeil de merde','dormi 3 heures']))return'sleep';
 if(hasAny(t,['fatigu','epuis','creve','a bout','n en peux plus','je suis vide','j ai plus la force','plus la force','dead\\b','crevee','naze','k o\\b','ko\\b','sur les rotules','plus d energie','exte nue','exte nuee','lessive','lessivee','claque','je suis casse','au bout du rouleau','plus de jus','je suis a plat','mort de fatigue','morte de fatigue','je m endors','somnolent','j ai sommeil']))return'tired';
 if(hasAny(t,['stress','angoiss','anxi','panique','pression','submerg','deborde','trop de choses','trop a faire','oppress','la pression','ca part dans tous les sens','sous l eau','pas le temps','deadline','le rush','je suis charge','trop charge','surcharge','je gere plus','j y arrive plus','je vais craquer','je craque','j ai le coeur qui bat','rumination','je rumine','je stresse']))return'stress';
 if(hasAny(t,['triste','deprim','pleur','cafard','decu','deprime','mal dans ma peau','moral a zero','moral dans les chaussettes','ca ne va pas','nul en ce moment','au fond','down\\b','ca va pas','ca va mal','envie de rien','j ai le seum','seum\\b','envie de pleurer','le blues','moral bas','pas la forme','pas bien du tout','je vais pas bien','ca me deprime','je suis mal\\b','j ai mal au coeur','le coeur lourd','vide interieur','je ressens rien','je me sens vide','malheureu','desespoir','desespere','decouragee','decourage','abattu','abattue']))return'sad';
 if(hasAny(t,['seul(e)?\\b','solitude','personne ne','abandonne','isole','personne pour','je n ai personne','j ai personne','personne m aime','personne me comprend','je me sens seul','incompris','rejete','rejetee','exclu','exclue','laisse de cote']))return'lonely';
 if(hasAny(t,['enerv','colere','frustr','agac','saoule','marre','ras le bol','exaspere','relou','saoul','soule','vener','vnr\\b','ca m enerve','insupportable','fou de rage','folle de rage','je vais exploser','trop c est trop','ca me gave','me gave','j en ai assez','ca me fait chier','me fait chier','rageant','rager','j ai la rage']))return'angry';
 if(hasAny(t,['peur','angoisse de','terrifi','inquiet','inquiete','anxieuse a l idee','flippe','flip\\b','trouille','j apprehende','apprehension','je redoute','ca me fait peur','panique a l idee','j ai la boule au ventre','boule au ventre','nerveux','nerveuse','tremble']))return'fear';
 if(hasAny(t,['procrast','motivation','flemme','pas envie','repousse','pas le courage','demotiv','decroche','j ai la flemme','nai pas la force','zero motivation','plus envie','j y arrive pas a m y mettre','j arrive pas a m y mettre','pas envie de bosser','pas envie de travailler','glande','flemmard','flemmarde','je traine','je perds mon temps','j arrive pas a me lancer','impossible de me concentrer','je me disperse','pas concentre','pas concentree','je n arrive pas a me concentrer','distrait','distraite']))return'demot';
 if(hasAny(t,['honte','culpab','echec','rate','en retard sur','j ai pas fait','pas tenu','deception envers moi','je me deteste','je suis nul','je suis nulle','je sers a rien','je suis une merde','je suis incapable','je n y arriverai jamais','j y arriverai jamais','je suis en retard','j ai tout gache','j ai foire','j ai loupe','j ai rate','je regrette','je m en veux','je suis pas a la hauteur']))return'shame';
 if(hasAny(t,['content','fier','fiere','heureu','genial','au top','motive','ca va bien','super','excellente journee','ouf\\b','grave bien','trop bien','nickel','au taquet','j ai reussi','j ai gere','victoire','je kiffe','kiff','de ouf','je suis en forme','en pleine forme','tout roule','ca se passe bien','journee de folie','trop content','trop contente','je suis soulage','soulagee','soulage','ca y est','j ai fini tout','tout est fait','j ai tout fait']))return'good';
 if(hasAny(t,['amour','amoureuse','amoureux','rupture','crush','couple','dispute avec','mon ex','pris la tete','engueule','engueulee','clash','brouille','fache avec','fachee avec','conflit avec','jaloux','jalouse','trahi','trahie','on s est disputes','plaque','plaquee','tromp']))return'relation';
 if(hasAny(t,['examen','controle','partiel','oral','entretien','competition','concours','bac\\b','brevet','soutenance','presentation demain','exposer','dst\\b','interro','evaluation','les resultats arrivent','resultats de']))return'exam';
 if(hasAny(t,['ennui','ennuie','m ennuie','rien a faire','je m emmerde','emmerde\\b','je tourne en rond','je m ennuie','trop calme','journee vide','je sais pas quoi faire de mon temps','je sais pas quoi faire de ma journee','j ai trop de temps']))return'bored';
 if(hasAny(t,['malade','fievre','mal a la tete','mal au ventre','grippe','rhume','je tousse','mal partout','migraine','nausee','mal de gorge','mal au dos','courbature','allergie','covid','gastro','angine','vomi','je suis pas bien physiquement','mal au genou','blesse','blessee','douleur','j ai mal']))return'sick';
 if(wantsHelp(t))return'help';
 return'';
}

/* --- Bibliothèque de réponses émotionnelles/sociales, plusieurs variantes
   par intention pour ne jamais répéter deux fois la même phrase --- */
const HELP_TXT=()=>`Voici ce que je sais faire, sans connexion${N()} :\n• Te dire ton programme d’aujourd’hui, de demain ou d’un autre jour\n• Te dire ce que tu as ce matin, cet après-midi, ce soir ou cette nuit\n• Te dire ce que tu fais maintenant, ou juste après\n• Te dire combien de temps il reste avant ou pendant une activité\n• Chercher tes créneaux libres, au besoin avec une durée précise\n• Te dire quand commence ou combien dure une activité\n• Te dire ce qu’il te reste à faire aujourd’hui\n• Ajouter, décaler (même de quelques minutes) ou supprimer une habitude si tu me le demandes normalement (par ex. « ajoute sport à 18h », « avance le piano de 15 min », « supprime le pomodoro »)\n• Marquer une tâche comme faite, ou revenir dessus (« j’ai fini la marche », « en fait je l’ai pas faite »)\n• Retenir une information que tu me confies (« retiens que … »)\n• Regarder tes statistiques et ta série en cours\n• Et surtout, t’écouter si tu as besoin d’en parler.\n\nParle-moi normalement, avec tes mots à toi, même en argot ou avec des fautes de frappe : je m’adapte.`;
const tomorrowFirst=()=>{const d=(new Date().getDay()+1)%7,hs=S.habits.filter(h=>h.days.includes(d)).sort((a,b)=>htime(a,d).localeCompare(htime(b,d)));return hs[0]?` Demain, ta première activité : « ${hs[0].name} » à ${htime(hs[0],d)}.`:''};
const JOKES=['Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau.','Qu’est-ce qu’un crocodile qui surveille la pharmacie ? Un Lacoste garde.','Deux poissons discutent : « Tu peux me passer le sel ? » — « Désolé, je suis d’eau douce. »','Que fait une fraise sur un cheval ? Tagada, tagada !','Pourquoi le livre de maths est triste ? Parce qu’il a trop de problèmes.','Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ? Un chat-peint de Noël.','Qu’est-ce qui est jaune et qui attend ? Jonathan.','Pourquoi les lits sont-ils si fatigués ? Parce qu’ils sont toujours sur les rotules… enfin, sur les pieds.'];
const PEP=['Tu n’as pas besoin de tout faire aujourd’hui. Tu as juste besoin de faire le prochain petit pas.','Chaque jour où tu reviens, même fatigué(e), compte plus que tu ne le crois.','Tu es en train de construire quelque chose de solide, brique par brique.','Avancer lentement, c’est encore avancer.','La constance bat l’intensité : c’est exactement ce que tu fais.','Respire. Fais la chose suivante. Puis la suivante. C’est tout.','Ce que tu as déjà accompli n’a pas disparu parce que la journée est dure.','Un mauvais jour ne défait pas les bons. Ta série continue d’exister dans ce que tu as bâti.'];
const MARA={
greet:[()=>`Wesh${N()} 💙 Je suis là. Planning, confidence, ou juste un truc à poser — vas-y.`,()=>`Salut${N()} ! Dis-moi ce qui t’occupe l’esprit, ou pose-moi une question sur tes habitudes.`,()=>`Coucou${N()}. Je t’écoute pour de vrai, pas en mode robot.`,()=>`Hey${N()} ! Ton planning, une question, ou juste papoter : je suis dispo.`,()=>{const h=new Date().getHours();return`${h<5?'Bonne nuit':h<18?'Bonjour':'Bonsoir'}${N()} 💙 Content(e) de te retrouver. Qu’est-ce que je peux faire pour toi ?`}],
ack:[()=>`D’accord${N()}. Je reste là si tu veux continuer.`,()=>`Ok. Dis-moi quand tu veux reprendre.`,()=>`Pas de souci. Je suis dispo.`,()=>`Bien reçu. Tu veux que je regarde ton planning ?`],
laugh:[()=>`Content(e) de te faire sourire 😄`,()=>`Haha, ça fait plaisir. Une bonne humeur, ça compte.`,()=>`😄 Toujours ça de pris. On continue ?`],
thanks:[()=>`Avec plaisir${N()}. Tu n’as pas besoin de me remercier, je suis là pour ça.`,()=>`De rien 💙. Je reste dans le coin si tu veux continuer.`,()=>`C’est normal${N()}. N’hésite pas si tu as besoin d’autre chose.`,()=>`Toujours là pour toi${N()}.`],
bye:[()=>{const h=new Date().getHours();return(h>=20||h<5?`Bonne nuit${N()} 💙 Dors bien.`:`À plus tard${N()} 💙`)+tomorrowFirst()},()=>`Prends soin de toi${N()}. Je reste ici quand tu reviens.${tomorrowFirst()}`,()=>`À très vite${N()} ! Bonne suite de journée.`],
howru:[()=>`Je vais bien, merci de demander. Et toi, vraiment${N()} — comment tu te sens, là ?`,()=>`Ça va de mon côté. Et toi, ça se passe comment aujourd’hui ?`,()=>`Tout roule de mon côté${N()}. Et pour toi, comment se passe ta journée ?`],
name:[()=>`Je m’appelle Mara. Je vis dans ton application Aube, entièrement sur ton appareil.`,()=>`Mara, pour te servir${N()}. Planning, habitudes, écoute : c’est mon rayon.`],
creator:[()=>`Je fais partie de l’application Aube que tu utilises. Je tourne uniquement sur ton appareil : rien de ce que tu me dis ne part sur internet.`,()=>`Je suis intégrée à Aube. Je n’envoie rien en ligne, tout reste sur ton téléphone.`],
about:[()=>`Je suis Mara. Je connais tout ton planning, tes habitudes, tes horaires, et ce que tu m’as déjà confié. Tu peux me parler comme à quelqu’un — argot, soutenu, brouillon, peu importe. Je reste un programme, pas une personne, mais je m’en souviens.`,()=>`Je suis un moteur local, entièrement intégré à l’application, sans connexion internet. Je lis ton planning en temps réel et je retiens ce que tu me dis d’une conversation à l’autre.`,()=>`Pas une vraie personne, mais une présence attentive : je comprends ton planning, ton vocabulaire du quotidien, et je garde en mémoire ce que tu me demandes de retenir.`],
love:[()=>`Ça me touche beaucoup${N()} 💙 Je reste un programme, mais je suis vraiment là pour toi. Et les personnes qui comptent pour toi méritent de l’entendre aussi.`,()=>`Merci pour cette gentillesse${N()}. Je suis contente de t’accompagner, à ma façon.`],
joke:[()=>pick(JOKES),()=>pick(JOKES)+' 😄',()=>`Allez, une pour te dérider : `+pick(JOKES)],
motivate:[()=>pick(PEP),()=>pick(PEP)+light(),()=>`Écoute ça${N()} : `+pick(PEP)],
weather:[()=>`Je fonctionne sans connexion, donc je n’ai pas accès à la météo. Regarde par la fenêtre, ou ouvre l’appli météo de ton téléphone. En revanche, je peux te dire ce que tu as de prévu dehors dans ta journée.`,()=>`Pas de météo pour moi, je suis hors ligne par conception. Mais je peux regarder si tu as une activité en extérieur.`],
offline:[()=>`Je travaille uniquement en local, sans internet : je ne peux ni chercher sur le web ni lire l’actualité. Je peux en revanche tout faire sur ton planning, tes habitudes et t’écouter.`,()=>`Pas d’accès au web de mon côté, c’est justement ce qui garde tes données privées. Pour tout ce qui concerne ton planning et ton moral, par contre, je suis là.`],
compliment:[()=>`Merci beaucoup${N()} 💙 Ça me touche, même si je reste un programme. Dis-moi si je peux t’aider sur autre chose.`,()=>`Content(e) que ça t’aide vraiment${N()}. Je continue à faire de mon mieux pour toi.`,()=>`Ça me fait plaisir de lire ça${N()}. Toi aussi tu gères, n’oublie pas de te le dire.`],
insult:[()=>`Je comprends que ça t’énerve${N()}. Dis-moi précisément ce qui n’a pas marché, j’essaie de faire mieux.`,()=>`Pas de souci, je ne le prends pas mal. Qu’est-ce que tu attendais que je fasse, exactement ? Je m’ajuste.`,()=>`Ok, j’ai sans doute raté quelque chose. Redis-moi ta demande autrement, je réessaie sérieusement.`],
confused:[()=>`Pas de souci, reformulons${N()}. Tu peux me demander par exemple « mon programme d’aujourd’hui », « je suis libre quand ? » ou « ma prochaine tâche ».`,()=>`Ok, je reprends plus simplement${N()}. Qu’est-ce que tu voudrais savoir précisément — ton planning, une activité, ou autre chose ?`,()=>`Désolée si ce n’était pas clair. Dis-moi ce que tu cherches en quelques mots, je te réponds directement.`],
apology:[()=>`Pas besoin de t’excuser${N()}, vraiment. Dis ce que tu as sur le cœur, je suis là pour ça.`,()=>`Aucun souci, tu ne m’as rien fait de mal. On reprend tranquillement.`],
sleep:[()=>`Les nuits difficiles pèsent sur tout le reste, je comprends${N()}. Ce soir, essaie d’éloigner les écrans 30 minutes avant de dormir et de garder la pièce fraîche et sombre. Et si tu es vraiment à plat demain, on allège le planning.${light()}`,()=>`Un mauvais sommeil, ça donne l’impression que tout est plus lourd. Ne te juge pas pour ça. Veux-tu que je regarde ce qui peut être allégé aujourd’hui ?`,()=>`Quand on n’arrive pas à dormir, l’esprit tourne souvent en boucle. Note en une phrase ce qui t’occupe, puis laisse-le sur le papier : ça aide à lâcher prise.`],
tired:[()=>`Ça ressemble à de la fatigue${N()}, et ton corps a raison de le signaler. Avant de te demander encore plus, vérifie les bases : as-tu bu de l’eau, mangé, fait une vraie pause aujourd’hui ?${light()}`,()=>`La fatigue, ça se respecte. Tu n’as pas à mériter le repos pour te l’autoriser. Une chose à la fois suffit pour l’instant.${light()}`,()=>`C’est un vrai signal, pas une faiblesse${N()}. Qu’est-ce qui te viderait le moins d’énergie à faire là, tout de suite ?`,()=>`Tu as dû beaucoup donner. Cinq minutes d’une vraie pause (sans écran) peuvent déjà redonner un peu de souffle.`],
stress:[()=>`Je t’entends${N()}. Quand tout arrive en même temps, le cerveau transforme facilement « beaucoup » en « tout est urgent ». On peut trier : ce qui doit être fait maintenant, ce qui peut attendre, et ce qui n’a même pas besoin d’être fait aujourd’hui.${light()}`,()=>`Respire un coup${N()}. Dis-moi ce qui te met le plus de pression en ce moment, et on le découpe en plus petits morceaux ensemble.`,()=>`La pression monte quand tout se mélange dans la tête${N()}. Si tu veux, je te dis exactement ce qu’il te reste à faire aujourd’hui, rien de plus.`,()=>`Un truc qui aide : écris les trois choses qui te préoccupent le plus, puis choisis la seule qui compte vraiment aujourd’hui. Le reste peut attendre.`],
sad:[()=>`Je suis désolée que tu traverses ça${N()}. Tu n’as pas besoin de rendre ta peine logique ou jolie pour en parler ici, je t’écoute sans juger.`,()=>`Ça a l’air lourd à porter. Qu’est-ce qui t’a fait le plus mal là-dedans ?`,()=>`Prends le temps qu’il te faut${N()}. Je suis là, sans pression, aussi longtemps que tu en as besoin.`,()=>`Merci de me le dire. Tu n’as pas à aller mieux tout de suite, ni à faire semblant.`],
lonely:[()=>`La solitude, ça pèse vraiment${N()}. Je suis là, même si je ne remplace pas une présence humaine. Y a-t-il quelqu’un que tu pourrais appeler ou revoir bientôt ?`,()=>`C’est difficile de se sentir seul(e)${N()}. Qu’est-ce qui te manque le plus, là, tout de suite ?`,()=>`Se sentir incompris(e) fait mal. Je t’écoute, et si tu veux, on peut réfléchir à une petite façon de reprendre contact avec quelqu’un.`],
angry:[()=>`Je vois la colère${N()}, et tu as le droit de la ressentir. Elle dit souvent qu’une limite a été dépassée. Contre quoi es-tu le plus énervé(e) : une personne, une situation, ou l’accumulation ?`,()=>`C’est légitime d’être agacé(e). Laisse-la retomber un instant, une marche rapide ou quelques grandes respirations aident, avant de décider quoi faire.`,()=>`Raconte-moi ce qui s’est passé${N()}, en détail si tu veux. Ça aide souvent de le sortir d’abord.`,()=>`Ça a l’air d’avoir vraiment débordé. Tu veux vider ton sac ici, sans filtre ?`],
fear:[()=>`La peur mérite d’être écoutée, sans forcément lui donner raison tout de suite. Qu’est-ce que tu crains précisément, et qu’est-ce que tu sais déjà, factuellement ?`,()=>`C’est normal d’avoir peur face à l’inconnu${N()}. On peut regarder ensemble ce qui dépend de toi, et ce qui n’en dépend pas.`,()=>`La boule au ventre avant quelque chose d’important, c’est le corps qui se prépare. Une respiration lente peut déjà l’apaiser. Tu veux qu’on la fasse ensemble ?`],
demot:[()=>`La motivation arrive souvent après le début, pas avant${N()}. Choisis une action ridiculement petite, deux minutes, une seule page, puis réévalue.${light()}`,()=>`Pas d’élan aujourd’hui, ça arrive. Donne-toi une tâche minuscule et concrète, juste pour créer un premier mouvement.`,()=>`Zéro motivation n’empêche pas un tout petit pas${N()}. Lequel serait le plus facile, là, maintenant ?`,()=>`Si la concentration file, essaie 10 minutes chrono sur une seule chose, téléphone loin de toi. Tu peux ensuite t’arrêter sans culpabilité.`],
shame:[()=>`Doucement avec toi-même${N()}. Rater quelque chose ne fait pas de toi quelqu’un de nul(le), ce ne sont pas la même phrase. Qu’est-ce qui s’est réellement passé, factuellement ?`,()=>`La culpabilité peut être utile si elle pointe vers quelque chose à réparer. Mais tu n’as pas à la garder plus longtemps que nécessaire.`,()=>`Tu parles de toi plus durement que tu ne parlerais à un(e) ami(e). Qu’est-ce que tu lui dirais, à sa place ?`],
good:[()=>{const s=streak();return`Ça fait plaisir à lire${N()} 💙 ${s>1?`${s} jours de suite, tu tiens vraiment quelque chose.`:'Savoure ce moment.'} Qu’est-ce qui a rendu cette journée meilleure ?`},()=>`Trop bien${N()} ! Profite de cette énergie, elle est précieuse.`,()=>`Bravo${N()} 💙 Prends une seconde pour être fier(e) : ça compte vraiment.`],
relation:[()=>`Les relations, ça peut être compliqué. Raconte-moi ce qui se passe, je peux t’aider à démêler les faits, ce que tu ressens, et ce que tu imagines peut-être en plus.`,()=>`Un conflit avec quelqu’un qu’on aime fait mal. Qu’est-ce qui s’est passé, et qu’est-ce que tu aimerais que l’autre comprenne ?`],
exam:[()=>`C’est normal d’avoir un peu (ou beaucoup) le trac avant ça. Tu as travaillé pour ce moment. Concentre-toi sur une révision légère et du repos plutôt que du bourrage la veille.${light()}`,()=>`Avant une épreuve, dormir compte plus qu’une dernière relecture. Prépare tes affaires la veille et garde ton énergie pour le jour J.`],
bored:[()=>`L’ennui, ça arrive${N()}. Tu veux qu’on regarde ce qu’il y a de prévu bientôt, ou tu préfères souffler un peu avant de t’y remettre ?`,()=>`Petit creux dans la journée ? Dis-le-moi si tu veux une idée, ou demande-moi directement tes créneaux libres.`,()=>`Un moment vide, c’est aussi l’occasion de faire une mini-chose que tu repousses : ranger 5 minutes, écrire un message, étirer le dos. Je peux te dire combien de temps tu as de libre.`],
sick:[()=>`Ça n’a pas l’air d’aller physiquement${N()}. Écoute ton corps avant ton planning : repose-toi, hydrate-toi, et si tu veux, je peux t’aider à alléger ta journée pour aujourd’hui.`,()=>`Prends soin de toi avant tout. Si les symptômes durent ou t’inquiètent, parle à un professionnel de santé. Je peux, en attendant, te montrer le strict minimum de ta journée.${light()}`],
memory:[()=>{const m=(S.mara&&S.mara.memory)||[];return m.length?`Voici ce que j’ai retenu${N()} :\n`+m.slice(-8).map(x=>`• ${x.fact}`).join('\n')+`\n\nDis « oublie … » pour que je retire une information.`:`Je n’ai encore rien retenu de particulier${N()}. Dis-moi « retiens que … » et je le garderai en mémoire.`}],
help:[()=>HELP_TXT()],
general:[()=>`Je t’écoute${N()}. Pose-le comme ça vient.`,()=>`Ok. Dis-m’en un peu plus, j’essaie de te suivre précisément.`,()=>`Je suis là. Qu’est-ce qui t’aiderait, là, tout de suite ?`,()=>`Continue, je ne lâche pas le fil.`,()=>`Je t’écoute, prends ton temps${N()}.`,()=>`Je ne suis pas sûre d’avoir tout saisi. Tu peux me demander ton programme, un créneau libre, ou simplement me raconter.`]};

const TIPS=['Règle des 2 minutes : lance-toi pour 2 minutes seulement. Démarrer est la vraie difficulté.','Empile tes habitudes : accroche la nouvelle à une existante (« après mon café, je révise »).','Rends-la évidente : prépare tout la veille (tenue, livre, sac). Moins de friction, plus de constance.','Commence petit : 5 minutes chaque jour battent 1 heure une fois par semaine.','Ne rate jamais deux fois de suite : un oubli arrive, c’est la reprise le lendemain qui compte vraiment.','Fête chaque petite victoire : c’est ce qui ancre une habitude dans la durée.','Attache un rituel à un lieu ou une heure fixe : le cerveau adore les repères stables.','Réduis la friction de départ : prépare le premier geste à l’avance, pas toute la tâche.','Vise la régularité avant la performance : mieux vaut 10 minutes tous les jours qu’un exploit une fois par mois.','Note tes séries : voir les jours s’enchaîner donne envie de ne pas casser la chaîne.','Un environnement calme vaut souvent plus qu’un sursaut de volonté.','Planifie le pire moment de la journée en premier : le reste paraîtra plus léger.'];

/* --- Réponse émotionnelle, avec mémoire du tour précédent pour varier --- */
function emoReply(raw){
 const t=norm(raw),ctx=MCTX(),it=intent(t);
 if(it==='crisis')return CRM();
 const bank=MARA[it&&MARA[it]?it:'general'];
 const li=ctx.lastIdx[it]!=null?ctx.lastIdx[it]:-1;
 let idx=Math.floor(Math.random()*bank.length);if(bank.length>1)while(idx===li)idx=Math.floor(Math.random()*bank.length);
 ctx.lastIdx[it]=idx;
 let r=bank[idx]();
 if(ctx.lastIt===it&&it&&!['general','help','ack','laugh','greet','thanks','bye','joke','motivate','weather','offline','name','creator','howru','confused'].includes(it))r=pick(['Tu m’en reparles, et c’est très bien. ','Toujours sur ce sujet, je reste avec toi. ',''])+r;
 ctx.lastIt=it;ctx.turns.push({u:String(raw).slice(0,300),it});if(ctx.turns.length>24)ctx.turns.shift();
 if(raw.length>140)r+=`\n\nTu m’as donné beaucoup de détails, merci pour ta confiance${N()}.`;
 save();
 return r;
}
const moodReply=m=>emoReply({good:'Je me sens plutôt bien aujourd’hui.',ok:'Ça va, une journée correcte.',mixed:'Journée mitigée aujourd’hui, ni bien ni mal.',hard:'Journée difficile aujourd’hui.',angry:'Je suis énervé(e) aujourd’hui.'}[m]);
const noteReply=(m,v)=>v?emoReply(v):moodReply(m||'ok');

/* --- Réponses ponctuelles construites dynamiquement à partir du planning --- */
function dayScheduleReply(day,info){
 const n=new Date(),label=dayLabel(info);
 const hs=S.habits.filter(h=>h.days.includes(day)).sort((a,b)=>htime(a,day).localeCompare(htime(b,day)));
 if(!hs.length)return pick([`Rien de prévu ${label==='aujourd’hui'?'aujourd’hui':label}. Une belle case vide dans ton planning.`,`Aucune activité programmée ${label==='aujourd’hui'?'aujourd’hui':label}.`,`Le planning est vide ${label==='aujourd’hui'?'aujourd’hui':label} : rien à faire de ce côté.`]);
 const lines=hs.map(h=>`• ${htime(h,day)}–${hm2(hend(h,day))} · ${h.name} (${h.dur} min)${day===n.getDay()&&isDone(h,key(n))?' ✓':''}`).join('\n');
 const intro=pick([`Programme ${label==='aujourd’hui'?'d’aujourd’hui':'de '+label} (${hs.length} activité${hs.length>1?'s':''}) :`,`Voici ce qui est prévu ${label==='aujourd’hui'?'aujourd’hui':label} :`,`${cap(label)}, au programme :`]);
 return `${intro}\n${lines}`;
}
function nextTaskReply(day,info,cur){
 const n=new Date(),sameDay=day===n.getDay();
 const items=S.habits.filter(h=>h.days.includes(day)).map(h=>({h,start:mins(htime(h,day)),end:mins(htime(h,day))+Number(h.dur||0)})).sort((a,b)=>a.start-b.start);
 const from=sameDay?cur:0;
 const next=items.find(x=>x.start>=from&&!(sameDay&&isDone(x.h,key(n))));
 if(!next)return sameDay?pick(['Il ne reste plus rien de prévu aujourd’hui, tu peux souffler.','Ta journée est terminée niveau planning, bravo pour ce que tu as fait jusqu’ici.']):`Rien de prévu après ça ${dayLabel(info)==='aujourd’hui'?'':dayLabel(info)}.`.trim();
 return pick([`Ta prochaine activité${sameDay?'':' ce jour-là'} : « ${next.h.name} » à ${hm2(next.start)} (${next.h.dur} min, jusqu’à ${hm2(next.end)}).`,`Ensuite, il y a « ${next.h.name} » à ${hm2(next.start)}, pour ${next.h.dur} minutes.`,`Après ça : « ${next.h.name} », dès ${hm2(next.start)}.`]);
}
function maraNowReply(n,cur){
 const d=n.getDay(),k=key(n),items=sched(n).map(h=>({h,start:mins(htime(h,d)),end:mins(htime(h,d))+Number(h.dur||0),done:isDone(h,k)}));
 const active=items.find(x=>!x.done&&cur>=x.start&&cur<x.end);
 const next=items.find(x=>!x.done&&x.start>cur);
 const upcoming=active?items.find(x=>!x.done&&x.start>=active.end):next;
 if(active){
  const left=active.end-cur;
  return `Là, tu es dans « ${active.h.name} » (${hm2(active.start)}–${hm2(active.end)}). Il reste environ ${dlab(left)}.`+(upcoming?` Ensuite : « ${upcoming.h.name} » à ${hm2(upcoming.start)} (${upcoming.h.dur} min).`:' C’est ta dernière activité prévue aujourd’hui.');
 }
 if(next){
  const gap=next.start-cur;
  return `Là, tu n’as pas d’activité prévue : tu es libre jusqu’à ${hm2(next.start)} (environ ${dlab(gap)}). Ensuite, tu as « ${next.h.name} » de ${hm2(next.start)} à ${hm2(next.end)}.`;
 }
 const planned=items.length;
 return planned?`Il n’y a plus d’activité à venir dans ton planning aujourd’hui. Tu peux souffler${N()} 💙`:`Tu n’as rien de prévu aujourd’hui dans ton planning.`;
}
function daypartReply(t,dayInfo,n){
 const dp=daypartOf(t),d=dayInfo?dayInfo.day:n.getDay();
 const [lo,hi]=dp[1];
 const items=S.habits.filter(h=>h.days.includes(d)).map(h=>({h,start:mins(htime(h,d)),end:hend(h,d)})).filter(x=>x.start<hi&&x.end>lo).sort((a,b)=>a.start-b.start);
 const when=dayLabel(dayInfo)==='aujourd’hui'?'aujourd’hui':dayLabel(dayInfo);
 return items.length?`Ce que tu as prévu ${when} (${dp[0]}) :\n`+items.map(x=>`• ${hm2(x.start)}–${hm2(x.end)} · ${x.h.name} (${x.h.dur} min)`).join('\n'):`Rien de prévu ${when} pour ${dp[0]==='soir'?'la soirée':'ce moment-là'}.`;
}
function untilReply(raw,cur,n){
 const m2=raw.match(/(?:avant|jusqu.?a|pour)\s+(.+)/i)||raw.match(/(?:dans combien de temps|combien de temps)\s+(.+)/i);
 let name=m2?m2[1].replace(/[?!.]+$/,'').trim():'';
 name=name.replace(/^(la |le |les |l.|mon |ma |mes |du |de la |des )/i,'').trim();
 const d=n.getDay(),items=S.habits.filter(h=>h.days.includes(d)).map(h=>({h,start:mins(htime(h,d)),end:hend(h,d)}));
 let target=null;
 if(name){
  const nq=norm(name);
  target=items.find(x=>{const nh=norm(x.h.name);return nh.includes(nq)||nq.includes(nh)||nh.split(' ').some(w=>w.length>=4&&nq.split(' ').includes(w))});
 }
 if(!target)target=items.find(x=>x.start<=cur&&x.end>cur)||items.filter(x=>x.start>cur).sort((a,b)=>a.start-b.start)[0];
 if(!target)return name?`Je ne trouve pas « ${name} » dans le programme d’aujourd’hui.`:`Il n’y a plus rien de prévu aujourd’hui.`;
 if(target.start>cur)return `« ${target.h.name} » commence dans ${dlab(target.start-cur)} (à ${hm2(target.start)}).`;
 if(target.end>cur)return `« ${target.h.name} » est en cours, il reste ${dlab(target.end-cur)}.`;
 return `« ${target.h.name} » est déjà terminé(e) depuis ${dlab(cur-target.end)}.`;
}
function freeSlotReply(day,info,t){
 const n=new Date(),sameDay=day===n.getDay();
 const from=sameDay?n.getHours()*60+n.getMinutes():0;
 let g=gaps(day,from);
 const durM=t.match(/(\d{1,3})\s*min/);
 const wantDur=durM?+durM[1]:null;
 if(wantDur)g=g.filter(x=>x[1]-x[0]>=wantDur);
 const label=dayLabel(info);
 if(!g.length)return wantDur?`Pas de créneau d’au moins ${wantDur} min ${label==='aujourd’hui'?'aujourd’hui':label} (entre 7 h et 22 h).`:`Pas de grand créneau libre ${label==='aujourd’hui'?'aujourd’hui':label} (entre 7 h et 22 h).`;
 return `Créneaux libres ${label==='aujourd’hui'?'aujourd’hui':label} :\n`+g.slice(0,5).map(x=>`• ${hm2(x[0])} – ${hm2(x[1])} (${dlab(x[1]-x[0])})`).join('\n');
}
function habitDurationReply(h){return pick([`« ${h.name} » dure ${h.dur} minutes.`,`Ça dure ${h.dur} min : « ${h.name} ».`,`Compte ${h.dur} minutes pour « ${h.name} ».`])}
function habitStartReply(h,day){const d=day==null?new Date().getDay():day;return pick([`« ${h.name} » commence à ${htime(h,d)} et se termine à ${hm2(hend(h,d))}.`,`Ça débute à ${htime(h,d)}, pour ${h.dur} minutes.`,`Départ à ${htime(h,d)} pour « ${h.name} ».`])}
function remainingReply(){
 const r=remaining();
 if(!r.length)return pick(['Tout est fait pour aujourd’hui, il ne reste rien.','Rien ne traîne : ta liste du jour est vide, bien joué.','Zéro tâche en attente aujourd’hui.']);
 return `Il te reste ${r.length} tâche${r.length>1?'s':''} aujourd’hui :\n`+r.map(h=>`• ${htime(h,new Date().getDay())} · ${h.name} (${h.dur} min)`).join('\n');
}
function weekSummaryReply(){
 const order=[1,2,3,4,5,6,0];
 const lines=order.map(d=>{const hs=S.habits.filter(h=>h.days.includes(d));return `${DL[d]} : ${hs.length} activité${hs.length>1?'s':''}`});
 return `Vue d’ensemble de la semaine :\n`+lines.join('\n');
}
function habitExistsReply(h,day,info){
 const d=day==null?new Date().getDay():day,label=dayLabel(info);
 if(h.days.includes(d))return `Oui, tu as « ${h.name} » ${label==='aujourd’hui'?'aujourd’hui':label} à ${htime(h,d)}.`;
 return `Non, « ${h.name} » n’est pas prévu ${label==='aujourd’hui'?'aujourd’hui':label}.`;
}

function memStore(){S.mara=S.mara||{turns:[],lastIt:'',lastIdx:{},lastTip:-1,memory:[]};S.mara.memory=S.mara.memory||[];return S.mara.memory}
function findHabit(id,name){if(id){const h=S.habits.find(x=>x.id===id);if(h)return h}if(!name)return null;const n=norm(name);return S.habits.find(h=>norm(h.name)===n)||S.habits.find(h=>norm(h.name).includes(n)||n.includes(norm(h.name)))}
function parseHHMM(v){const m=String(v||'').match(/(\d{1,2})\s*[:hH]?\s*(\d{2})?/);if(!m)return '';const h=Math.min(23,Math.max(0,+m[1])),mi=Math.min(59,Math.max(0,+(m[2]||0)));return pad(h)+':'+pad(mi)}
function guessCat(name){const t=norm(name);if(has(t,'math','physique','chim','hist','francais','anglais','revi','cours','etud','dm\\b','exo','code','program'))return'studies';if(has(t,'sport','foot','course','muscu','yoga','marche','natation','basket'))return'sport';if(has(t,'dodo','sommeil','coucher','reveil','sieste'))return'sleep';if(has(t,'travail','boulot','deep work','reunion','mail'))return'work';if(has(t,'repas','dej','diner','petit dej','manger','cuisine'))return'meals';return'personal'}
function guessIcon(cat){return {studies:'book',sport:'dumbbell',sleep:'moon',work:'briefcase',personal:'heart',meals:'utensils',free:'sun'}[cat]||'sun'}
function isProgramRewrite(t){return /\b(programme a change|le programme change|nouveau programme|nouvel emploi du temps|nouvel emploi de temps|change de metier|change de boulot|j ai change de metier|je change de metier|desormais|a la place|nouveau planning|reorganis|re organis|tout (?:a |est )?change|contenu (?:a )?change|metier a change|nouvelle routine|nouvelle vie|repars? de zero|efface(?:r)? tout|supprime tout|remplace(?:r)? (?:tout|mon planning|le planning|le programme|mes habitudes))\b/.test(t)||(/\b(remplace|remplacer)\b/.test(t)&&/\b(planning|programme|emploi du temps|routine|habitudes)\b/.test(t))}
function applyMaraActions(actions){if(!Array.isArray(actions)||!actions.length)return [];const notes=[];for(const a of actions.slice(0,12)){try{if(a.type==='upsert_habit'){const time=parseHHMM(a.time)||'08:00',dur=Math.max(1,Math.min(600,Number(a.dur)||45));const days=Array.isArray(a.days)&&a.days.length?a.days.map(Number).filter(d=>d>=0&&d<=6):[...ALL];const cat=CAT[a.cat]?a.cat:guessCat(a.name||'');const exist=findHabit(a.id,a.name);const o=exist?exist:{id:'h'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:'',desc:'',cat,icon:guessIcon(cat),time,dur,days:[...days],dayTimes:{},dayDurs:{},alarm:true,snd:''};if(a.name)o.name=String(a.name).slice(0,60);if(a.desc!=null)o.desc=String(a.desc).slice(0,400);if(CAT[a.cat])o.cat=a.cat;if(a.icon&&P[a.icon])o.icon=a.icon;if(a.time)o.time=time;if(a.dur)o.dur=dur;if(Array.isArray(a.days)&&a.days.length)o.days=days;if(a.dayTimes&&typeof a.dayTimes==='object')o.dayTimes={...(o.dayTimes||{}),...a.dayTimes};if(a.dayDurs&&typeof a.dayDurs==='object')o.dayDurs={...(o.dayDurs||{}),...a.dayDurs};if(typeof a.alarm==='boolean')o.alarm=a.alarm;if(!exist)S.habits.push(o);notes.push(`« ${o.name} » ${o.time} · ${o.dur} min`)}else if(a.type==='delete_habit'){const h=findHabit(a.id,a.name);if(h){S.habits=S.habits.filter(x=>x.id!==h.id);notes.push('supprimé : '+h.name)}}else if(a.type==='set_habit_time'){const h=findHabit(a.id,a.name);if(h){const time=parseHHMM(a.time);if(!time)continue;if(a.day!=null&&a.day>=0&&a.day<=6){h.dayTimes=h.dayTimes||{};h.dayTimes[a.day]=time}else h.time=time;if(a.dur)h.dur=Math.max(1,Math.min(600,Number(a.dur)));try{silentPackDays(a.day!=null?[a.day]:h.days)}catch(x){}notes.push(h.name+' → '+time)}}else if(a.type==='mark_habit'){const h=findHabit(a.id,a.name);if(h){const k=key(new Date()),arr=S.done[k]||[];const on=!!a.done;S.done[k]=on?(arr.includes(h.id)?arr:[...arr,h.id]):arr.filter(x=>x!==h.id)}}else if(a.type==='remember_fact'&&a.fact){const mem=memStore();const fact=String(a.fact).slice(0,280);if(!mem.some(x=>x.fact===fact)){mem.push({t:Date.now(),cat:a.category||'vie',fact});if(mem.length>80)mem.shift()}notes.push('retenu')}else if(a.type==='forget_fact'&&a.fact){const q=norm(String(a.fact));S.mara.memory=(S.mara.memory||[]).filter(x=>!norm(x.fact).includes(q))}}catch(e){}}save();scheduleAlarms();return notes}

/* --- Actions en langage naturel : ajouter / décaler (absolu ou relatif) /
   supprimer / marquer comme fait ou non fait / se souvenir ou oublier une
   information. Tout est vérifié sur le texte normalisé (accents retirés),
   afin que « décale », « déplace » ou toute variante accentuée fonctionne
   aussi bien qu’une version sans accent. --- */
function tryAct(raw){
 const t=norm(raw);if(!t)return '';
 const time=parseHHMM(raw);
 let days=[...ALL];
 if(has(t,'semaine')&&!has(t,'week end','weekend'))days=[...WK];
 if(has(t,'week end','weekend'))days=[0,6];
 if(has(t,'apres demain')){const d=(new Date().getDay()+2)%7;days=[d]}
 else if(has(t,'demain')){const d=(new Date().getDay()+1)%7;days=[d]}
 else {for(let i=0;i<7;i++)if(has(t,norm(DL[i])))days=[i]}

 if(isProgramRewrite(t)){
  const becomes=raw.match(/^(.{2,70}?)\s+(?:devient|c['’]est maintenant|est remplac[ée]e? par|se transforme en)\s+(.{2,70})$/i)
   ||raw.match(/(?:à la place de|a la place de|remplace)\s+(.{2,70}?)\s+(?:par|c['’]est|:|→)\s+(.{2,70})$/i);
  if(becomes){
   const oldN=becomes[1].replace(/\s+(à|a|vers|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche).*/i,'').trim();
   const newN=becomes[2].replace(/\s+(à|a|vers)\s+\d.*/i,'').replace(/\s+\d{1,2}\s*[:hH].*/,'').trim().slice(0,60);
   const h=findHabit('',oldN);
   if(h&&newN.length>=2){
    const prev=h.name,cat=guessCat(newN);
    applyMaraActions([{type:'upsert_habit',id:h.id,name:newN,cat,icon:guessIcon(cat),time:h.time,dur:h.dur,days:h.days,dayTimes:h.dayTimes,dayDurs:h.dayDurs}]);
    return `C’est noté${N()} : « ${prev} » s’appelle maintenant « ${newN} ». Durée et horaires inchangés — dis-moi seulement si une heure doit vraiment changer.`;
   }
  }
  return `D’accord${N()}. Colle-moi le nouveau programme (les noms des activités, dans l’ordre). Je change le contenu, je garde les durées, je déplace ce qu’il faut et j’évite les chevauchements. Je ne te redemanderai pas de rectifier les heures : indique un horaire seulement s’il change vraiment.`;
 }

 /* Annuler une tâche marquée par erreur */
 const undoneM=t.match(/^(?:j ai pas|je n ai pas)\s+(?:fait|termine|fini)\s+(.+)/)||t.match(/^decoche\s+(.+)/);
 if(undoneM){const name=undoneM[1].replace(/\s+(a|de)\s+(demain|aujourd hui|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|\d{1,2}).*/,'').trim();const h=findHabit('',name);if(h){applyMaraActions([{type:'mark_habit',id:h.id,name:h.name,done:false}]);return `D’accord, « ${h.name} » n’est plus marqué comme fait.`}}

 /* Marquer une tâche comme faite */
 const doneM=t.match(/^j ai\s+(?:fait|termine|fini)\s+(.+)/)||t.match(/^(?:marque|coche)\s+(.+?)(?:\s+comme (?:fait|termine))?$/)||t.match(/^(.+?)\s+(?:c est fait|c est termine|c est bon)$/);
 if(doneM){const name=doneM[1].replace(/\s+(a|de)\s+(demain|aujourd hui|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|\d{1,2}).*/,'').trim();const h=findHabit('',name);if(h){applyMaraActions([{type:'mark_habit',id:h.id,name:h.name,done:true}]);return pick([`Coché comme fait${N()} : « ${h.name} ». Bravo !`,`Top, « ${h.name} » est marqué comme fait${N()} ✓`,`C’est noté, « ${h.name} » est terminé ✓`])}}

 /* Se souvenir d'une information */
 const mem=raw.match(/^(?:retiens|souviens[- ]toi|n['’]oublie pas(?: que)?|note que)\s+(.+)/i);
 if(mem){applyMaraActions([{type:'remember_fact',fact:mem[1].trim(),category:'vie'}]);return `C’est noté${N()}. Je m’en souviendrai : « ${mem[1].trim()} ».`}

 /* Oublier une information retenue */
 const forget=t.match(/^oublie(?: tout| que| ce que)?\s*(.*)$/);
 if(forget){if(has(t,'tout')&&!forget[1]){S.mara=S.mara||{};S.mara.memory=[];save();return `C’est fait${N()}, j’ai tout oublié de ce que tu m’avais demandé de retenir.`}if(forget[1]){const before=((S.mara&&S.mara.memory)||[]).length;applyMaraActions([{type:'forget_fact',fact:forget[1]}]);const after=((S.mara&&S.mara.memory)||[]).length;return before>after?`C’est oublié${N()}.`:`Je n’avais rien retenu qui ressemble à ça.`}}

 /* Supprimer une habitude */
 const del=t.match(/^(?:supprime|enleve|retire|efface|annule)\s+(?:l habitde |l habitude |le |la |les )?(?:creneau |tache |habitude )?(.+)/);
 if(del&&!has(t,'souvenir','memoire')){const name=del[1].replace(/\s+(a|de)\s+(demain|aujourd hui|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|\d{1,2}).*/,'').trim();const h=findHabit('',name);if(h){applyMaraActions([{type:'delete_habit',id:h.id,name:h.name}]);return `C’est retiré du planning : « ${h.name} ».`}}

 /* Décalage relatif : « décale/avance/retarde X de N minutes » */
 const shift=t.match(/(?:decale|deplace|avance|retarde)\s+(.+?)\s+de\s+(\d{1,3})\s*(?:min|minutes?)\b/);
 if(shift){
  const h=findHabit('',shift[1]);
  if(h){
   const delta=+shift[2];
   const backward=/avance/.test(shift[0])||has(t,'plus tot','en avance');
   const day=days.length===1?days[0]:new Date().getDay();
   const base=mins(htime(h,day));
   const tm=hm2(backward?base-delta:base+delta);
   applyMaraActions([{type:'set_habit_time',id:h.id,name:h.name,time:tm,day:days.length===1?day:undefined}]);
   return pick([`C’est décalé : « ${h.name} » passe à ${tm}.`,`Voilà, « ${h.name} » est maintenant à ${tm}.`]);
  }
 }

 /* Décalage absolu : « décale/mets X à HHhMM » */
 const move=t.match(/(?:decale|deplace|passe|mets)\s+(.+?)\s+(?:a|vers)\s+(\d{1,2}\s*h?\s*\d{0,2})/);
 if(move){const h=findHabit('',move[1]);if(h){const tm=parseHHMM(move[2]);applyMaraActions([{type:'set_habit_time',id:h.id,name:h.name,time:tm,day:days.length===1?days[0]:undefined}]);return `C’est déplacé : « ${h.name} » à ${tm}.`}}

 /* Ajouter une nouvelle habitude, avec une heure par défaut si l'on précise
    seulement « le matin », « à midi », « l'après-midi », « le soir » ou
    « la nuit » sans heure exacte. */
 if(has(t,'ajoute','creer','cree','programme','prevois','mets moi','j ai cours','j ai sport','j ai prevu','rendez vous','rdv')&&(time||has(t,'habitude','matin','midi','apres midi','soir','nuit'))){
  let name=(raw.replace(/^(ajoute(?:r)?|cr[eé]e(?:r)?|programme|pr[eé]vois|mets(?: moi)?)\s+/i,'')
   .replace(/\s+(tous les jours|chaque jour|en semaine|le matin|le midi|l apres[ -]midi|le soir|la nuit|demain|apres[ -]demain|aujourd.?hui|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche).*/i,'')
   .replace(/\s+(à|a|vers)\s+\d.*/,'')
   .replace(/\s+\d{1,2}\s*[:hH].*/,'')
   .replace(/\s+\d+\s*min.*/,'')
   .trim());
  name=name.replace(/^(l habitde|l habitude|un|une|le|la|les)\s+/i,'').slice(0,60);
  if(!name||name.length<2)name='Nouveau créneau';
  const durM=raw.match(/(\d{1,3})\s*min/);
  const dur=durM?Math.max(1,+durM[1]):45;
  let todDefault='';
  if(has(t,'apres midi'))todDefault='14:00';
  else if(has(t,'matin'))todDefault='08:00';
  else if(has(t,'midi'))todDefault='12:00';
  else if(has(t,'soir'))todDefault='19:00';
  else if(has(t,'nuit'))todDefault='22:00';
  const finalTime=time||todDefault||'08:00';
  applyMaraActions([{type:'upsert_habit',name,time:finalTime,dur,days,cat:guessCat(name),alarm:true}]);
  return `C’est enregistré${N()} : « ${name} » à ${finalTime} (${dur} min), ${days.length===7?'tous les jours':days.map(d=>DL[d]).join(', ')}.`;
 }
 return ''
}

function maraSnapshot(){const n=new Date();return{now:n.toISOString(),locale:n.toLocaleString('fr-FR'),weekday:DL[n.getDay()],firstName:fname(),habits:S.habits.map(h=>({id:h.id,name:h.name,desc:h.desc,cat:h.cat,icon:h.icon,time:h.time,dur:h.dur,days:(h.days||[]).map(d=>DL[d]),dayTimes:h.dayTimes||{},alarm:!!h.alarm,today:`${htime(h,n.getDay())}–${hm2(hend(h,n.getDay()))}`,doneToday:isDone(h,key(n))})),today:sched(n).map(h=>({name:h.name,start:htime(h,n.getDay()),end:hm2(hend(h,n.getDay())),dur:h.dur,done:isDone(h,key(n)),cat:(CAT[h.cat]||CAT.free)[0]})),week:[0,1,2,3,4,5,6].map(d=>({day:DL[d],items:S.habits.filter(h=>h.days.includes(d)).sort((a,b)=>htime(a,d).localeCompare(htime(b,d))).map(h=>({name:h.name,start:htime(h,d),end:hm2(hend(h,d)),dur:h.dur}))})),streak:streak(),moodToday:S.mood[key(n)]||null,memory:(S.mara&&S.mara.memory)||[],remaining:remaining().map(h=>h.name)}}

/* --- Réponse pratique (planning, stats, aide), avec repli sur l'émotionnel
   si rien de plus spécifique ne correspond. L'ordre des vérifications est
   volontairement précis : une phrase purement émotionnelle (« je suis
   fatigué aujourd'hui ») est traitée par emoReply avant même d'atteindre la
   logique de planning, pour ne jamais répondre par une liste d'horaires à
   quelqu'un qui exprime une émotion — et une demande claire de programme du
   jour (« qu'est-ce qu'on fait aujourd'hui ? ») donne bien la liste complète
   de ce jour-là, sans être confondue avec « qu'est-ce que je fais là,
   maintenant ? ». --- */
function answer(raw,soft){
 const t=norm(raw),n=new Date(),cur=n.getHours()*60+n.getMinutes();
 if(hasAny(t,CR))return CRM();
 const acted0=tryAct(raw);if(acted0)return acted0;
 if(has(t,'respir','souffl'))return'Faisons-le ensemble, doucement :\n1. Inspire par le nez pendant 4 secondes\n2. Expire lentement par la bouche pendant 6 secondes\n3. Recommence 5 fois\n\nÀ chaque expiration, relâche un peu plus les épaules. Tu peux aussi lancer l’exercice animé juste en dessous.';

 /* Message clairement émotionnel/social et sans mot de planning explicite :
    réponse émotionnelle immédiate, sans passer par la logique d'horaires. */
 const it0=intent(t);
 if(it0&&it0!=='crisis'&&it0!=='help'&&!explicitScheduleCue(t))return emoReply(raw);

 const dayInfo=dayFromText(t,n);
 const habit=mentionedHabit(t);

 /* Segment de journée : « qu'est-ce que j'ai ce matin / cet après-midi / ce
    soir / cette nuit ? » */
 if(daypartOf(t))return daypartReply(t,dayInfo,n);

 /* Instant présent : priorité dès qu'un marqueur explicite de « maintenant »
    est présent, peu importe qu'un jour soit aussi cité. */
 if(wantsNow(t))return maraNowReply(n,cur);

 /* Activité suivante */
 if(wantsNext(t))return nextTaskReply(dayInfo?dayInfo.day:n.getDay(),dayInfo,cur);

 /* Durée ou heure de début d'une activité nommée : vérifié avant la lecture
    d'heure précise ci-dessous, car le nom d'une activité peut contenir un mot
    comme « midi » (ex. « Marche de midi ») sans que la question porte sur midi. */
 if(wantsDuration(t)&&habit)return habitDurationReply(habit);
 if(wantsStartTime(t)&&habit)return habitStartReply(habit,dayInfo?dayInfo.day:n.getDay());

 /* « Combien de temps avant/depuis X ? » */
 if(wantsUntil(t))return untilReply(raw,cur,n);

 /* Question sur une heure précise : « je fais quoi à 12h30 ? », « libre vers midi ? » */
 const clockMatch=(raw.match(/\b(\d{1,2})(?:\s*[:h]\s*(\d{2}))?\s*(?:h(?:eures?)?)?\b/i)||[]);
 let askedMinute=null;
 if(/\bmidi\b/i.test(raw))askedMinute=720;
 else if(/\bminuit\b/i.test(raw))askedMinute=0;
 else if(clockMatch.length){const hh=Number(clockMatch[1]),mm=clockMatch[2]==null?0:Number(clockMatch[2]);if(hh>=0&&hh<=23&&mm>=0&&mm<=59)askedMinute=hh*60+mm}
 const asksAtTime=askedMinute!==null&&/(quoi|fais|faire|prevu|programme|cours|libre|dispo|occup|tache|activit|agenda|heure)/.test(t);
 if(asksAtTime){
  const d=dayInfo?dayInfo.day:n.getDay();
  const items=S.habits.filter(h=>h.days.includes(d)).map(h=>({h,start:mins(htime(h,d)),end:mins(htime(h,d))+Number(h.dur||0)}));
  const active=items.find(x=>askedMinute>=x.start&&askedMinute<x.end);
  const when=dayLabel(dayInfo)==='aujourd’hui'?"aujourd’hui":dayLabel(dayInfo);
  if(active){
   const {h,start,end}=active;
   if(has(t,'libre','dispo'))return `Non, tu es occupé(e) à ${hm2(askedMinute)} : ${h.name} (${hm2(start)}–${hm2(end)}).`;
   return `À ${hm2(askedMinute)}, ${when}, tu as « ${h.name} » en cours : ça commence à ${hm2(start)} et ça se termine à ${hm2(end)}.`;
  }
  const before=items.filter(x=>x.end<=askedMinute).sort((a,b)=>b.end-a.end)[0];
  const after=items.filter(x=>x.start>askedMinute).sort((a,b)=>a.start-b.start)[0];
  const freeEnd=after?after.start:1320,freeStart=before?before.end:420;
  if(has(t,'libre','dispo'))return `Oui, tu es libre à ${hm2(askedMinute)} ${when}${freeEnd>freeStart?` : le créneau libre autour de cette heure va de ${hm2(freeStart)} à ${hm2(freeEnd)} (${dlab(freeEnd-freeStart)}).`:'.'}`;
  return `À ${hm2(askedMinute)} ${when}, tu n’as aucune activité prévue.${after?` La prochaine est « ${after.h.name} » à ${hm2(after.start)}.`:''}`;
 }

 /* Créneaux libres, avec durée minimale optionnelle */
 if(wantsFree(t))return freeSlotReply(dayInfo?dayInfo.day:n.getDay(),dayInfo,t);

 /* Ce qu'il reste à faire aujourd'hui */
 if(wantsRemaining(t))return remainingReply();

 /* Résumé de la semaine */
 if(wantsWeekSummary(t))return weekSummaryReply();

 /* Nombre total d'habitudes */
 if(has(t,'combien')&&!habit)return`Tu as ${S.habits.length} habitude${S.habits.length>1?'s':''}, dont ${sched(n).length} aujourd’hui.`;

 /* Existence d'une activité un jour donné (oui/non) */
 if(wantsExists(t)&&habit)return habitExistsReply(habit,dayInfo?dayInfo.day:n.getDay(),dayInfo);

 /* Programme complet d'un jour (aujourd'hui par défaut) — c'est la demande
    la plus fréquente : « qu'est-ce qu'on fait aujourd'hui ? », « on a quoi
    demain ? », « mon planning de vendredi »… */
 if(dayInfo||wantsSchedule(t))return dayScheduleReply(dayInfo?dayInfo.day:n.getDay(),dayInfo);

 /* Heure ou date actuelle (uniquement si rien de plus précis n'a été demandé) */
 if(has(t,'quelle heure','heure actuelle','heure exacte','il est quelle heure','on est a quelle heure','savoir l heure','l heure qu il est','tu as l heure','donne moi l heure','dis moi l heure','c est quelle heure','on est quelle heure','l heure stp','l heure svp'))return`Il est ${n.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}, ${n.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}.`;
 if(has(t,'quel jour','quelle date','on est quel jour','quel jour on est'))return`On est ${n.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}.`;

 /* Statistiques / série en cours */
 if(has(t,'serie','streak','stat','progress','m en sors','bilan','taux','resultat','performance','avancement','sur la bonne voie','ou j en suis','mes chiffres')){
  const s=streak();let a=0,b=0;
  for(let i=0;i<7;i++){const d=addD(n,-i),x=sched(d);b+=x.length;a+=x.filter(h=>isDone(h,key(d))).length}
  const r=b?Math.round(a/b*100):0;
  return`Série en cours : ${s} jour${s>1?'s':''}.\nCes 7 derniers jours : ${r} % de tâches réalisées (${a}/${b}).\nAujourd’hui, il te reste ${remaining().length} tâche${remaining().length>1?'s':''}.${r>=80?' Excellent rythme, continue !':r>=50?' Belle régularité, tu peux encore grimper.':' Pas de panique : on repart petit à petit.'}`;
 }

 if(has(t,'pomodoro','concentr','focus'))return'25 minutes de concentration, 5 minutes de pause, et une pause longue toutes les 4 séries. Coupe les notifications pendant le bloc.';
 if(has(t,'sommeil','dormir','coucher','reveil')&&!has(t,'fatigu'))return'Garde des horaires réguliers, coupe les écrans 30 minutes avant de dormir et garde la chambre fraîche et sombre. Ton heure de réveil compte plus que ton heure de coucher.';
 if(has(t,'alarme','sonnerie','notification')||/\bson\b/.test(t))return'Profil → Alarmes pour activer les rappels, puis « Sons d’alarme » pour choisir un son ou importer le tien.';
 if(has(t,'hors ligne','hors connexion','internet','installer'))return'Ouvre l’app une première fois en ligne, puis installe-la via le menu ⋮ de Chrome → « Installer l’application ». Ensuite, tout marche sans connexion, moi y compris.';
 if(has(t,'ajouter','creer','nouvelle habitude'))return'Onglet Habitudes, puis le bouton + en haut à droite. Tu peux aussi juste me dire « ajoute [nom] à [heure] » ici, je m’en occupe directement.';
 if(has(t,'sauvegard','export','import'))return'Profil → Données : tu peux exporter une sauvegarde, ou importer un fichier (sauvegarde .json/.zip, emploi du temps, photo…, 10 Mo max) avec une barre de progression.';
 if(has(t,'conseil','astuce','constan','regularit','routine')&&!has(t,'comment tu')){const ctx=MCTX();let i=Math.floor(Math.random()*TIPS.length);if(TIPS.length>1)while(i===ctx.lastTip)i=Math.floor(Math.random()*TIPS.length);ctx.lastTip=i;save();return TIPS[i]}

 const it=intent(t);
 if(it)return emoReply(raw);
 return soft?pick([`Je t’écoute${N()}. Reformule un peu si tu veux, même en argot, et je m’accroche. Tu peux me demander ton planning, un créneau libre, d’enregistrer une habitude, ou juste me raconter.`,`Dis-le comme tu veux${N()}, je m’adapte. Ton programme du jour, une heure précise, ou juste discuter — comme tu préfères.`]):emoReply(raw||' ');
}


const QS=['Qu’est-ce qu’on fait aujourd’hui ?','Je fais quoi maintenant ?','Ma prochaine tâche ?','Ajouter mon emploi du temps','Quand suis-je libre aujourd’hui ?','Mon programme de demain','Il me reste quoi à faire ?','Comment je m’en sors ?','Un conseil pour être constant(e)','Je suis fatigué(e)','Raconte-moi une blague'];
const bub=m=>`<div class="bu ${m.r}">${esc(m.t).replace(/\n/g,'<br>')}${m.img?`<br><img src="${m.img}" style="max-width:100%;border-radius:12px;margin-top:6px">`:''}</div>`;
let typing='';
const chatBox=(arr,id,ph,hi)=>`<div class="chat" id="${id}box">${arr.length?arr.map(bub).join(''):bub({r:'a',t:hi})}${typing===id?'<div class="typ"><i></i><i></i><i></i></div>':''}</div><div id="${id}imgp"></div><div class="cin"><textarea id="${id}i" data-enter="${id}" rows="2" placeholder="${ph}" autocomplete="off" name="mara-message" autocapitalize="sentences" spellcheck="true" enterkeyhint="enter" inputmode="text" aria-label="Message à Mara"></textarea><button class="fab" data-a="cs" data-id="${id}" aria-label="Envoyer">${ic('send')}</button></div><div class="chat-tools"><label class="btn g chat-image-pick" style="cursor:pointer" aria-label="Joindre une image" title="Joindre une image">${ic('img')}<input type="file" accept="image/*" data-a="ai" data-id="${id}" hidden></label><button type="button" data-a="voice" data-id="${id}" class="${voiceRec===id?'rec':''}">${ic('mic')} ${voiceRec===id?'Écoute…':'Vocal'}</button></div>`;
const assistant=()=>`<section class="card"><div class="mara-head"><span class="mara-avatar">${ic('spark')}</span><div><h2>Mara</h2><small class="mu">Elle connaît tout ton planning</small></div></div><div class="qs">${QS.map(q=>`<button data-a="cq" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>${chatBox(S.chat||[],'pc','Pose une question ou colle ton emploi du temps…',`Salut${N()} ! Je retiens tes habitudes et tes horaires. Demande-moi ta journée, un créneau libre, d’ajouter un rdv… ou parle-moi normalement.`)}${(S.chat||[]).length?`<button class="btn d" style="height:40px;margin-top:6px" data-a="cc">Effacer la conversation</button>`:''}</section>`;
const thr=id=>{if(id==='pc')return S.chat=S.chat||[];const k=key(new Date());S.mood[k]=S.mood[k]||{m:'',t:'',th:[]};return S.mood[k].th=S.mood[k].th||[]};
const pendingImg={};
function sendTo(id,tx,img){tx=(tx||'').trim();if(!tx&&!img)return;const a=thr(id);
 const shown=tx.length>700?tx.slice(0,500)+`…\n(+${tx.length-500} caractères de texte collé)`:tx;
 a.push({r:'u',t:shown||'(photo envoyée)',img});save();rf=id;typing=id;render();
 setTimeout(async()=>{let reply,after=null;
  try{const r=await maraSchedule(tx,img,id);if(r){reply=r.reply;after=r.after}else reply=tryAct(tx)||answer(tx,id==='sc')}
  catch(err){reply=`J’ai rencontré un petit souci en préparant ma réponse${N()}. Réessaie en reformulant, ou demande-moi directement l’heure, la prochaine activité ou tes créneaux libres.`}
  typing='';a.push({r:'a',t:reply});if(a.length>80)a.splice(0,a.length-80);save();rf=id;render();if(after)setTimeout(after,60)},180)}
let voiceRec='';
function startVoice(id){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){alert('La reconnaissance vocale n’est pas proposée par ce navigateur.');return}
 try{const r=new SR();r.lang='fr-FR';r.interimResults=false;r.maxAlternatives=1;voiceRec=id;render();
 r.onresult=e=>{const el=$('#'+id+'i');if(el)el.value=e.results[0][0].transcript};
 r.onerror=()=>{voiceRec='';render()};r.onend=()=>{voiceRec='';render()};r.start()}catch(e){voiceRec='';alert('Micro indisponible. Sur certains navigateurs, la reconnaissance vocale a aussi besoin d’une connexion.')}}
function handleImage(id,file){if(!file)return;if(file.size>10*1024*1024){alert('Image trop lourde (10 Mo max).');return}
 const el=$('#'+id+'imgp');if(el)el.innerHTML='<div class="attach-preview"><span>Préparation de l’image…</span></div>';
 readDataUrl(file).then(u=>shrinkDataUrl(u,1600,.82)).then(url=>{pendingImg[id]=url;const e2=$('#'+id+'imgp');if(e2)e2.innerHTML=`<div class="attach-preview"><img src="${url}" alt=""><span>Image prête à envoyer.</span><button data-a="rmimg" data-id="${id}" aria-label="Retirer">${ic('x')}</button></div>`}).catch(()=>{const e2=$('#'+id+'imgp');if(e2)e2.innerHTML='';alert('Impossible de lire cette image.')})}



/* Vues */
const seg=(x,cls='')=>x;
const hcard=(h,k,menu,day=new Date().getDay())=>{const d=isDone(h,k),t=htime(h,day),end=hm2(mins(t)+hdur(h,day)),vary=(h.dayTimes&&Object.keys(h.dayTimes).length)||(h.dayDurs&&Object.keys(h.dayDurs).length);return`<div class="hc ${d?'dn':''}" style="--c:${col(h)}"><span class="ib">${ic(h.icon)}</span><div class="mt" data-a="edit" data-id="${h.id}"><b>${esc(h.name)}</b><small>${ic('clock')}${t}–${end} · ${hdur(h,day)} min<i class="bg">${CAT[h.cat][0]}</i>${vary?'<i class="bg">Horaires variables</i>':''}${h.alarm?ic('bell'):''}</small></div>${menu?'':`<button class="ck" data-a="tog" data-id="${h.id}" aria-label="Terminer">${ic('check')}</button>`}</div>`};
let tab='todo',pd=new Date().getDay(),dr=null,br=false,rf='',scheduleMode=false;
const ring=(pc,cap)=>`<svg viewBox="0 0 200 200" class="rg"><circle cx="100" cy="100" r="80" class="rb"/><circle cx="100" cy="100" r="80" class="rf" stroke-dasharray="502.65" stroke-dashoffset="${502.65*(1-pc)}" transform="rotate(-90 100 100)"/><text x="100" y="108" class="n">${Math.round(pc*100)}%</text><text x="100" y="128" class="l">AUJOURD’HUI</text><text x="100" y="148" class="c">${cap}</text></svg>`;
function maraStatus(){
 const online=typeof navigator==='undefined'||navigator.onLine!==false;
 return `<div class="mara-status"><span class="dot ${online?'':'off'}"></span><span>Moteur local actif · ${online?'prête':'hors ligne'}</span></div>`;
}
/* Carte humeur / tâches : deux faces d'une même carte (flip). Le stockage reste
   séparé (S.mood pour l'humeur, S.tasks pour les tâches) ; seule l'interface
   est unifiée. Les actions de cette carte ne relancent PAS render() : elles
   mettent à jour uniquement la carte, ce qui supprime le clignotement à chaque
   toucher d'émoticône ou de tâche. */
function moodFrontHTML(){
 const k=key(new Date()),m=S.mood[k];
 return `<h2>Comment tu vas${N()} ?</h2><p class="mu" style="font-size:.9rem;margin-top:2px">Choisis ton humeur et note une petite chose à retenir.</p><div class="mood-strip">${[['good','😊','Bien'],['ok','🙂','Ça va'],['mixed','😐','Mitigé'],['hard','😔','Dur'],['angry','😤','Énervé']].map(x=>`<button data-a="mood" data-v="${x[0]}" class="${m&&m.m===x[0]?'a':''}">${x[1]}<span>${x[2]}</span></button>`).join('')}</div><input id="note" placeholder="Une chose à améliorer demain…" value="${m?esc(m.t||''):''}" maxlength="200"><button class="btn g" data-a="note">Enregistrer</button>`;
}
function moodBackHTML(){
 return `<h2 style="margin:0 0 6px">Ajouter une tâche</h2><p class="mu" style="font-size:.85rem;margin:0">Choisis un logo, écris la tâche : elle est rangée dans Mes tâches (icône livre).</p><div class="mood-strip tcat">${Object.keys(TC).map(k=>`<button data-a="taskCat" data-v="${k}" class="${k===tCat?'a':''}" style="--c:${TC[k][1]}">${ic(TC[k][2])}<span>${TC[k][0]}</span></button>`).join('')}</div><div style="display:flex;gap:8px;align-items:stretch;margin-top:10px"><input id="taskDraft" placeholder="Ex. préparer mon sac" maxlength="160" style="min-width:0;flex:1;margin-top:0"><button class="btn g" data-a="taskAdd" style="width:auto;flex:none;padding:0 16px;margin-top:0">Ajouter</button></div>${taskOk?`<p id="taskOk" class="mu" style="font-size:.85rem;margin:10px 0 0">✓ Ajoutée dans Mes tâches (icône livre). <button data-a="openTasks" style="background:none;border:0;padding:0;color:var(--pr);font:inherit;text-decoration:underline;cursor:pointer">Voir</button></p>`:''}`;
}
function taskStoreHTML(){
 const a=S.tasks||[],row=x=>{const T=TC[x.c]||TC.oublis;return`<div class="hc tk ${x.done?'dn':''}" style="--c:${T[1]}"><span class="ib">${ic(T[2])}</span><div class="mt"><b>${esc(x.t)}</b><small><i class="bg">${T[0]}</i></small></div><button class="tx" data-a="taskDelete" data-id="${x.id}" aria-label="Supprimer la tâche">${ic('trash')}</button><button class="ck" data-a="taskTog" data-id="${x.id}" aria-label="Terminer">${ic('check')}</button></div>`};
 return a.length?`<p class="mu" style="margin-top:8px">Tes tâches rangées depuis l’accueil, conservées sur cet appareil.</p>${a.filter(x=>!x.done).concat(a.filter(x=>x.done)).map(row).join('')}`:`<section class="card" style="margin-top:14px"><h2>Ton espace est encore vide</h2><p class="mu" style="margin:6px 0 14px">Ajoute une tâche depuis la carte « Mes tâches » de l’accueil : elle apparaîtra ici.</p><button class="btn" data-a="backHome">Retour à l’accueil</button></section>`;
}
function moodFaceSegHTML(){
 const face=S.prefs.moodFace==='tasks'?'tasks':'mood',pending=(S.tasks||[]).filter(x=>!x.done).length;
 return `<button data-a="moodFace" data-v="mood" class="${face==='mood'?'a':''}">${ic('heart')} Mon humeur</button><button data-a="moodFace" data-v="tasks" class="${face==='tasks'?'a':''}">${ic('ccheck')} Mes tâches${pending?` (${pending})`:''}</button>`;
}
function moodCardHTML(){
 const flipped=S.prefs.moodFace==='tasks';
 return `<section class="card rise flip-card" id="moodFlipCard"><div class="flip-seg" id="moodFaceSeg">${moodFaceSegHTML()}</div><div class="flip-inner ${flipped?'flipped':''}" id="moodFlipInner" style="transition:none"><div class="flip-face flip-front" id="moodFrontContent">${moodFrontHTML()}</div><div class="flip-face flip-back" id="moodBackContent">${moodBackHTML()}</div></div></section>`;
}

/* La face arrière est en position absolue : on fixe la hauteur de la carte sur
   la plus grande des deux faces pour que rien ne soit coupé. */
function syncFlipHeight(){
 const inner=document.getElementById('moodFlipInner'),f=document.getElementById('moodFrontContent'),b=document.getElementById('moodBackContent');
 if(!inner||!f||!b)return;
 inner.style.height='';
 const h=Math.max(f.scrollHeight,b.scrollHeight);
 inner.style.height=h+'px';
 if(inner.style.transition==='none')requestAnimationFrame(()=>requestAnimationFrame(()=>{inner.style.transition=''}));
}
function refreshMoodCard(){
 const f=document.getElementById('moodFrontContent'),b=document.getElementById('moodBackContent'),s=document.getElementById('moodFaceSeg');
 if(!f||!b){render();return}
 const noteEl=document.getElementById('note'),draftEl=document.getElementById('taskDraft'),hadDraft=draftEl&&document.activeElement===draftEl;
 f.innerHTML=moodFrontHTML();b.innerHTML=moodBackHTML();if(s)s.innerHTML=moodFaceSegHTML();
 syncFlipHeight();
 if(hadDraft){const d=document.getElementById('taskDraft');d&&d.focus()}
}

const V={
today(){const n=new Date(),k=key(n),s=sched(n),dn=s.filter(h=>isDone(h,k)),td=s.filter(h=>!isDone(h,k)),pc=s.length?dn.length/s.length:0,hr=n.getHours(),g=hr<5?'Bonne nuit':hr<18?'Bonjour':'Bonsoir',fn=S.name.trim().split(' ')[0],m=S.mood[k],st=streak();

return`<header class="rise" style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px"><div><p class="cap">${cap(n.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}))}</p><h1>${g}${fn?', '+esc(fn):''}</h1>${st?`<p class="mu" style="margin-top:4px;font-size:.9rem;color:#ff9a4c;display:flex;gap:4px;align-items:center">${ic('flame')}${st} jour${st>1?'s':''} de suite</p>`:''}</div><div style="display:flex;gap:8px;flex:none"><button class="fab" data-a="openMara" aria-label="Parler à Mara" title="Parler à Mara" style="width:48px;height:48px">${ic('spark')}</button><button class="fab" data-a="journal" aria-label="Mes notes" title="Mes notes enregistrées" style="width:48px;height:48px">${ic('book')}</button></div></header>
${S.name?'':`<section class="card rise"><h2>Bienvenue</h2><p class="mu" style="font-size:.9rem;margin-top:2px">Comment dois-je t’appeler ?</p><input id="nm" placeholder="Ton prénom" maxlength="30"><button class="btn" data-a="name">Continuer</button></section>`}
<section class="card rise">${ring(pc,`${dn.length} / ${s.length} tâches terminées`)}<div class="st"><div><small>Prévues</small><b>${s.length}</b></div><div><small>Terminées</small><b>${dn.length}</b></div><div><small>Restantes</small><b>${td.length}</b></div></div></section>
${moodCardHTML()}`},
mara(){const k=key(new Date()),m=S.mood[k];return`<div class="mara-screen rise"><header class="mara-top"><div class="mara-head"><span class="mara-avatar">${ic('spark')}</span><div><h1 style="font-size:1.55rem;margin:0">Mara</h1><small class="mu">Planning, habitudes et écoute — réunis</small>${maraStatus()}</div><button class="fab" data-a="maraBack" aria-label="Retour" title="Retour" style="margin-left:auto;flex:none">${ic(maraFrom==='#plan'?'cal':'home')}</button></div></header><section class="mara-thread">${chatBox(S.chat||[],'pc','Parle-moi de ton planning ou de ta journée…',`Je peux t’aider avec ton planning, chercher des heures libres, enregistrer une habitude, ou simplement t’écouter${N()}. Tu peux parler naturellement, avec tes expressions habituelles.`)}<button class="btn g mara-breathe" data-a="br">${ic('leaf')} ${br?'Arrêter':'Respirer 1 minute'}</button>${br?'<div class="br"><div class="bc"></div></div>':''}</section></div>`},
journal(){const tab=S.prefs.journalTab==='tasks'?'tasks':'notes',n=(S.tasks||[]).filter(x=>!x.done).length,base=V.journalNotes(),o=base.match(/^<header[\s\S]*?<\/header>/)[0],rest=base.slice(o.length);return o.replace('Mes notes',tab==='tasks'?'Mes tâches':'Mes notes')+`<div class="flip-seg" style="margin-top:14px"><button data-a="jtab" data-v="notes" class="${tab==='notes'?'a':''}">${ic('heart')} Mes notes</button><button data-a="jtab" data-v="tasks" class="${tab==='tasks'?'a':''}">${ic('ccheck')} Mes tâches${n?` (${n})`:''}</button></div>`+(tab==='tasks'?taskStoreHTML():rest)},
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
journalNotes(){const rows=S.reflections.slice().reverse();return`<header class="rise" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><p class="cap">Espace personnel</p><h1>Mes notes</h1></div><button class="fab" data-a="backHome" aria-label="Retour à l’accueil">${ic('home')}</button></header><p class="mu" style="margin-top:8px">Tes pensées et petites choses à améliorer, conservées sur cet appareil.</p>${rows.length?rows.map(r=>`<section class="card"><div style="display:flex;justify-content:space-between;gap:10px"><small>${esc(r.date||'')}</small><button class="ib2" data-a="deleteReflection" data-id="${esc(r.id)}" aria-label="Supprimer cette note">${ic('trash')}</button></div><h2 style="margin-top:8px">${esc(({good:'😊 Bien',ok:'🙂 Ça va',mixed:'😐 Mitigé',hard:'😔 Difficile',angry:'😤 Énervé'})[r.m]||'Note')}</h2><p style="margin-top:8px;white-space:pre-wrap">${esc(r.t)}</p></section>`).join(''):`<section class="card"><h2>Ton espace est encore vide</h2><p class="mu" style="margin-top:8px">Enregistre une petite note depuis la barre d’humeur de l’accueil : elle apparaîtra ici.</p><button class="btn" data-a="backHome">Retour à l’accueil</button></section>`}`},
timetable(){const n=new Date(),hs=S.habits.filter(h=>h.days.includes(pd)).sort((a,b)=>mins(htime(a,pd))-mins(htime(b,pd)));return`<header class="rise" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px"><div><p class="cap">Vue d’ensemble</p><h1>Emploi du temps</h1><p class="mu" style="margin-top:5px">${DL[pd]} · toutes les activités prévues</p></div><button class="fab" data-a="backPlan" aria-label="Retour au planning">${ic('cal')}</button></header><div class="pills">${[1,2,3,4,5,6,0].map(x=>`<button data-a="pd" data-v="${x}" class="${x===pd?'a':''} ${x===n.getDay()?'t':''}">${DAYS[x]}<b>${weekDate(n,x).getDate()}</b></button>`).join('')}</div><section class="card timetable-card"><div class="timetable-head"><b>${DL[pd]}</b><button class="btn g" style="width:auto;margin:0;padding:9px 12px" data-a="exportTimetable">${ic('down')} Exporter l’image</button></div>${hs.length?`<div class="timetable-columns"><span>Horaire</span><span>Activité</span></div><div class="timetable-list">${hs.map(h=>`<div class="timetable-row" style="--c:${col(h)}"><div class="timetable-time">${htime(h,pd)}<small>${hm2(hend(h,pd))}</small></div><div class="timetable-bar"><span>${ic(h.icon)}</span><div><b>${esc(h.name)}</b><small>${h.dur} min${h.desc?` · ${esc(h.desc)}`:''}</small></div></div></div>`).join('')}</div>`:`<div class="empty"><h2>Journée libre</h2><p>Aucune habitude prévue ce jour-là.</p></div>`}</section><p class="mu" style="font-size:.82rem;margin:10px 4px">Cette vue est une lecture visuelle de ton planning : les modifications se font toujours dans l’écran Planning habituel.</p>`},
stats(){const n=new Date();let tot=0,pn=0;for(let i=0;i<30;i++){const d=addD(n,-i),s=sched(d);pn+=s.length;tot+=s.filter(h=>isDone(h,key(d))).length}
const w=[...Array(7)].map((_,i)=>{const d=addD(n,i-6),r=rate(d)||0;return`<div><i style="height:${r*80}px;opacity:${r?1:.3}"></i>${DAYS[d.getDay()]}</div>`}).join('');
const start=addD(n,-83-((n.getDay()+6)%7));const hm=[...Array(84)].map((_,i)=>{const d=addD(start,i);if(d>n)return'<i style="opacity:0"></i>';const r=rate(d);return`<i style="${r===null?'':`background:rgba(61,139,255,${.15+r*.85})`}"></i>`}).join('');
return`<header class="rise"><p class="cap">Progression</p><h1>Statistiques</h1></header><section class="card rise"><div class="st" style="margin:0"><div><small>Série</small><b>${streak()}</b></div><div><small>30 jours</small><b>${pn?Math.round(tot/pn*100):0}%</b></div><div><small>Réalisées</small><b>${tot}</b></div></div></section><section class="card"><h2>7 derniers jours</h2><div class="bars">${w}</div></section><section class="card"><h2>12 dernières semaines</h2><div class="hm">${hm}</div></section>`},
me(){const sn=(id,nm,cu)=>`<div class="sn ${S.prefs.snd===id?'a':''}"><button class="pb" data-a="pv" data-id="${id}" aria-label="Écouter">${ic(pl===id?'stop':'play')}</button><span class="nm" data-a="ps" data-id="${id}">${esc(nm)}</span>${S.prefs.snd===id?ic('check'):''}${cu?`<button class="ib2" data-a="ds" data-id="${id}" aria-label="Supprimer">${ic('trash')}</button>`:''}</div>`;
return`<header class="rise"><p class="cap">Réglages</p><h1>Profil</h1></header>
<section class="card"><label class="f" style="margin:0">Ton prénom<input id="nm" value="${esc(S.name)}" maxlength="30" placeholder="Comment t’appeler ?"></label><button class="btn g" data-a="name">Enregistrer</button></section>
<section class="card" style="padding-bottom:8px"><h2>Alarmes</h2><label class="tg"><span>Rappels activés</span><input type="checkbox" class="sw" data-a="pn" ${S.prefs.notif?'checked':''}></label><label class="tg"><span>Report</span><select data-a="psn" style="width:auto;margin:0">${[5,10,15,30].map(x=>`<option value="${x}" ${x===S.prefs.snooze?'selected':''}>${x} min</option>`).join('')}</select></label><label class="tg" style="display:block"><span style="display:flex;justify-content:space-between"><span>Volume</span><small>${Math.round(S.prefs.vol*100)}%</small></span><input type="range" min="10" max="100" value="${S.prefs.vol*100}" data-a="pvol"></label><p class="mu" style="font-size:.78rem;margin:0 0 8px">Sonnerie type app Horloge. L’alarme continue en arrière-plan tant que l’app reste ouverte ou installée, avec une notification.</p></section>
<section class="card"><h2>Rappels de tes notes et tâches</h2><p class="mu" style="font-size:.85rem;margin:4px 0 10px">Aube peut t’envoyer un rappel aléatoire d’une note enregistrée ou d’une tâche en attente. Autorise les notifications pour les recevoir.</p><label class="tg"><span>Rappels aléatoires</span><input type="checkbox" class="sw" data-a="reflectionNotify" ${S.prefs.reflectionNotify?'checked':''}></label></section><section class="card"><h2>Sons d’alarme</h2><p class="mu" style="font-size:.85rem;margin:2px 0 8px">Touche un nom pour le choisir par défaut. Chaque habitude peut aussi avoir son propre son.</p>${Object.entries(BI).map(([i,x])=>sn(i,x[0])).join('')}${CS.map(x=>sn(x.id,x.name,1)).join('')}<label class="btn g" style="cursor:pointer;color:var(--fg)">${ic('up')} Ajouter mon propre son<input type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.caf" data-a="as" hidden></label><p class="mu" style="font-size:.78rem;margin-top:8px">MP3, WAV, M4A, OGG… chaque fichier est vérifié et compressé (8 s, mono) pour rester léger. Les sons restent sur ton appareil.</p></section>

<section class="card"><h2>Données</h2><p class="mu" style="font-size:.85rem;margin-top:2px">Tout reste sur ton appareil.</p><button class="btn g" data-a="exp">${ic('down')} Exporter une sauvegarde</button><label class="btn g" style="cursor:pointer;color:var(--fg)">${ic('up')} Importer un fichier<input type="file" data-a="impf" hidden></label><p class="mu" style="font-size:.78rem;margin:8px 0 2px">Jusqu’à 10 Mo. Sauvegarde Aube (.json ou .zip) : tout est restauré dans Habitudes, Tâches, Notes… avec une barre de progression. Emploi du temps (.txt, .csv, .ics, .docx), photo d’emploi du temps ou son d’alarme aussi.</p><button class="btn d" data-a="rst">Tout réinitialiser</button></section><p class="mu" style="text-align:center;font-size:.72rem;margin:14px 0 4px">Aube · version ${BUILD}</p>`}
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
 if(!S.prefs.reflectionNotify||!('Notification'in window)||Notification.permission!=='granted')return;
 const now=new Date(),day=key(now),minute=now.getHours()*60+now.getMinutes();
 if(minute<9*60||minute>21*60)return;
 const pool=[];
 (S.reflections||[]).filter(x=>x&&x.t).forEach(x=>pool.push({kind:'note',text:x.t}));
 (S.tasks||[]).filter(x=>x&&!x.done&&x.t).forEach(x=>pool.push({kind:'task',text:x.t}));
 if(!pool.length)return;
 if(S.prefs.reminderSentDay===day)return;
 if(S.prefs.reminderDay!==day){
   S.prefs.reminderDay=day;
   S.prefs.reminderAt=20*60;
   save();
 }
 if(minute<S.prefs.reminderAt)return;
 const entry=pool[Math.floor(Math.random()*pool.length)];
 try{
   const title=entry.kind==='task'?'Aube · Petit rappel de tâche':'Aube · Un rappel pour toi';
   const body=entry.kind==='task'?'À faire : '+entry.text:entry.text;
   if(navigator.serviceWorker&&navigator.serviceWorker.controller){
     navigator.serviceWorker.ready.then(reg=>reg.showNotification(title,{body,tag:'aube-reminder-'+day,icon:'/icon-192.png',data:{url:'/'}})).catch(()=>{});
   }else new Notification(title,{body,tag:'aube-reminder-'+day,icon:'icon-192.png'});
   S.prefs.reminderSentDay=day;save();
 }catch(e){}
}
const NAV=[['today','home','Accueil'],['habits','ccheck','Habitudes'],['plan','cal','Planning'],['stats','bars','Stats'],['me','user','Profil']];
var lastRt;function render(){const h=(location.hash||'#today').slice(1),[r,id]=h.split('/');let v=V[r]?r:'today';
if(r==='new'||r==='edit'){if(!dr||dr.id!==(id||'')){const o=S.habits.find(x=>x.id===id);dr=o?{...o,days:[...o.days],dayTimes:{...(o.dayTimes||{})},freq:o.days.length===7?'daily':o.days.length===5&&WK.every(x=>o.days.includes(x))?'weekdays':'custom'}:{id:'',name:'',desc:'',cat:'personal',icon:'sun',time:'08:00',dayTimes:{},dur:20,days:[...ALL],freq:'daily',alarm:true,snd:''}}v='form'}else dr=null;
{const vv=$('#v');vv.classList.toggle('norise',h===lastRt);lastRt=h}$('#v').innerHTML=V[v]();if(v==='today')syncFlipHeight();const nv=v==='form'?'habits':v==='timetable'?'plan':v;$('#nav').innerHTML=NAV.map(x=>`<a href="#${x[0]}" class="${x[0]===nv?'a':''}">${ic(x[1])}${x[2]}</a>`).join('');document.querySelectorAll('.chat').forEach(c=>c.scrollTop=c.scrollHeight);if(rf){const e=$('#'+rf+'i');rf='';e&&e.focus()}}
addEventListener('hashchange',()=>{render();scrollTo(0,0)});
let lastHash=location.hash||'#today',maraFrom='#today';addEventListener('hashchange',()=>{const h=location.hash;if(h==='#mara'&&lastHash!=='#mara')maraFrom=/^#(plan|timetable)/.test(lastHash)?'#plan':'#today';lastHash=h});addEventListener('online',()=>render());addEventListener('offline',()=>render());

/* Alarme */
function stopAl(){stopSnd();$('#alarm').innerHTML=''}
function nextAlarms(){const out=[],now=new Date();for(let d=0;d<2;d++){const dt=addD(now,d),k=key(dt);for(const h of sched(dt)){if(!h.alarm||isDone(h,k))continue;const t=htime(h,dt.getDay()),when=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),+t.slice(0,2),+t.slice(3),0,0).getTime();if(when>now.getTime()-5000)out.push({id:h.id,name:h.name,time:t,when,dur:h.dur,snd:h.snd||S.prefs.snd||'urgent'})}}return out.sort((a,b)=>a.when-b.when)}
let alarmTimer=null,wakeLock=null;
async function holdWake(on){try{if(!on){await wakeLock?.release();wakeLock=null;return}if('wakeLock'in navigator&&S.prefs.notif)wakeLock=await navigator.wakeLock.request('screen')}catch(e){}}

/* Appui long sur une habitude → demande de suppression (même design que le reste) */
let lpT=null,lpFired=false,lpX=0,lpY=0;
function showDeleteHabitLP(h){document.getElementById('habit-delete-overlay')?.remove();const m=document.createElement('div');m.id='habit-delete-overlay';m.style.cssText='position:fixed;inset:0;z-index:10001;background:rgba(3,7,18,.82);display:flex;align-items:center;justify-content:center;padding:18px;backdrop-filter:blur(7px)';m.innerHTML=`<section class="card" style="width:min(100%,420px);padding:22px;border:1px solid var(--bd);box-shadow:0 24px 70px #0008;margin:0"><div class="mara-head"><span class="mara-avatar" style="color:var(--dg)">${ic('trash')}</span><div><p class="cap" style="margin-bottom:3px">Suppression</p><h2 style="margin:0">Supprimer cette habitude ?</h2></div></div><p style="margin:14px 0">« ${esc(h.name)} » sera retirée de ta routine. Cette action ne peut pas être annulée.</p><button class="btn" id="lpYes" style="background:var(--dg)">Supprimer</button><button class="btn g" id="lpNo">Garder</button></section>`;document.body.appendChild(m);m.querySelector('#lpNo').onclick=()=>m.remove();m.onclick=e=>{if(e.target===m)m.remove()};m.querySelector('#lpYes').onclick=()=>{S.habits=S.habits.filter(x=>x.id!==h.id);save();scheduleAlarms();m.remove();render()}}
document.addEventListener('pointerdown',e=>{const c=e.target.closest('.hc');if(!c||c.classList.contains('plan-drag')||e.target.closest('.ck,button,input'))return;const el=c.querySelector('[data-id]'),h=el&&S.habits.find(x=>x.id===el.dataset.id);if(!h)return;lpX=e.clientX;lpY=e.clientY;clearTimeout(lpT);lpT=setTimeout(()=>{lpFired=true;navigator.vibrate&&navigator.vibrate(30);showDeleteHabitLP(h)},550)},{passive:true});
document.addEventListener('pointermove',e=>{if(lpT&&(Math.abs(e.clientX-lpX)>10||Math.abs(e.clientY-lpY)>10)){clearTimeout(lpT);lpT=null}},{passive:true});
['pointerup','pointercancel'].forEach(t=>document.addEventListener(t,()=>{clearTimeout(lpT);lpT=null;setTimeout(()=>{lpFired=false},350)},{passive:true}));
document.addEventListener('click',e=>{if(lpFired){e.preventDefault();e.stopImmediatePropagation();lpFired=false}},true);
document.addEventListener('contextmenu',e=>{if(e.target.closest('.hc'))e.preventDefault()});
/* ── Import d'un emploi du temps : texte collé (ou lu par Google Lens depuis une image) ──
   Rien n'est enregistré sans vérification : l'utilisatrice contrôle chaque ligne. */
const IMP_STOP=/^(horaires?|heures?|activites?|jours?|jour|emploi du temps|emploi de temps|planning|programme|agenda|matieres?|taches?|habitudes?|debut|fin|duree|nom|titre|semaine type|ma semaine|mon planning|mon emploi du temps|voici|voila)$/;
const DAY_WORDS={lundi:1,lun:1,mardi:2,mar:2,mercredi:3,mer:3,jeudi:4,jeu:4,vendredi:5,ven:5,samedi:6,sam:6,dimanche:0,dim:0};
const DAY_RE='(?:lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|lun|mar|mer|jeu|ven|sam|dim)';
function parseSchedule(text){
 const toM=(h,m)=>Number(h)*60+Number(m||0);
 const okT=(h,m)=>Number(h)<24&&Number(m||0)<60;
 /* Nettoyage global : tirets/flèches → "-", « à / jusqu'à / au » entre deux heures → "-", emojis et puces retirés */
 let src=String(text||'').replace(/\r/g,'\n').replace(/\u00a0|\u202f/g,' ')
  .replace(/[–—−‒―→➜➔➡⇒⟶~]/g,'-').replace(/\s*(?:>|=>)\s*(?=\d)/g,' - ')
  .replace(/(\d)\s*(?:h|:|H)\s*(\d{2})?\s*(?:à|a|jusqu['’ ]?à|jusqu['’ ]?a|au|jusqu['’ ]?au|until|to)\s*(?=\d)/gi,(m,a,b)=>a+'h'+(b||'')+' - ')
  .replace(/\bde\s+(?=\d{1,2}\s*(?:h|:))/gi,'')
  .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,' ');
 /* Horaire : 5h, 05h00, 5 h 30, 05:00, 5H */
 const TS='(\\d{1,2})\\s*(?:h|H|:)\\s*(\\d{2})?(?!\\d)';
 const RANGE=new RegExp(TS+'\\s*-\\s*'+TS);
 const ONE=new RegExp(TS);
 const DUR=/\(?\b(?:pendant|durée|duree|dur\.?|pour)?\s*:?\s*(\d{1,3})\s*(?:min|mn|minutes?)\b\)?|\(?\b(?:pendant|durée|duree|dur\.?)\s*:?\s*(\d{1,2})\s*h(?:eures?)?\s*(\d{2})?\b\)?|\((\d{1,2})\s*h\s*(\d{2})?\)/i;
 const norm2=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
 /* Jours cités dans un fragment : « lundi, mercredi et vendredi », « du lundi au vendredi », « tous les jours », « week-end »… */
 const parseDays=frag=>{
  const n=norm2(frag);if(!n)return null;
  if(/\b(tous les jours|chaque jour|quotidien|7 ?j ?7|toute la semaine)\b/.test(n))return[0,1,2,3,4,5,6];
  if(/\b(week ?end|weekend|we)\b/.test(n)&&!new RegExp('\\b'+DAY_RE+'\\b').test(n))return[6,0];
  if(/\b(en semaine|jours ouvres|jours de semaine)\b/.test(n))return[1,2,3,4,5];
  const rg=new RegExp('\\b(?:du\\s+)?('+DAY_RE+')\\s+(?:au|a|->|-)\\s+('+DAY_RE+')\\b').exec(n);
  if(rg){const a=DAY_WORDS[rg[1]],b=DAY_WORDS[rg[2]],out=[];let d=a,g=0;while(g++<8){out.push(d);if(d===b)break;d=(d+1)%7}return out}
  const out=[];const re=new RegExp('\\b('+DAY_RE+')s?\\b','g');let m;
  while((m=re.exec(n))){const d=DAY_WORDS[m[1]];if(d!=null&&!out.includes(d))out.push(d)}
  return out.length?out:null;
 };
 /* Une ligne « jour seul » : ne contient (presque) que des noms de jours, date éventuelle, ponctuation */
 const dayOnly=line=>{
  const n=norm2(line);if(!n)return null;
  const stripped=n.replace(new RegExp('\\b'+DAY_RE+'s?\\b','g'),' ').replace(/\b(du|au|a|et|le|les|de|chaque|tous|jours|jour|semaine|en|week|end|weekend|ouvres|toute|la|planning|programme|emploi|temps|matin|soir|apres|midi|\d{1,2}|janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\b/g,' ').replace(/\s+/g,' ').trim();
  if(stripped)return null;
  return parseDays(line);
 };
 const clean=x=>x.replace(/\(\s*-?\s*\)/g,' ').replace(/^\s*\d+[.)]\s+/,'')
  .replace(/^[^:]{0,40}\b(?:planning|emploi du temps|emploi de temps|programme|horaires|agenda|journée|journee|semaine)\b[^:]*:\s*/i,'')
  .replace(/\b(de|du|d|entre|vers|à|a|le|la|les|pour|pendant|dès|des|jusqu|jusque)\s*$/i,'').replace(/^(?:à|vers|dès)\s+/i,'')
  .replace(/^[\s:,;.\-–|/\\()]+|[\s:,;.\-–|/\\()]+$/g,'').replace(/\s+/g,' ').trim();
 const rows=[],pT=[],pN=[];let days=null,first=null,dayless=0;
 const push=(name,s,e,d,dur,meta={})=>{
  if(dur&&e==null)e=s+dur;
  rows.push({name,s,e,days:d&&d.length?[...d]:null,icon:meta.icon||'',desc:meta.desc||''})
 };
 const metaOf=line=>{
  let icon='',desc='';
  const im=/(?:ic[oô]ne)\s*[:=]?\s*(?:une?\s+)?(goutte(?:\s+d['’ ]eau)?|eau|coeur|cœur|livre|lecture|soleil|sport|velo|vélo|code|musique|feuille|cerveau|repas|lune|personnel|dumbbell|droplet|book|sun|heart)(?=\s|$|[,.)])/i.exec(line);
  if(im){const v=norm2(im[1]);icon=/goutte|eau|droplet/.test(v)?'droplet':/coeur|cœur|heart/.test(v)?'heart':/livre|lecture|book/.test(v)?'book':/soleil|sun/.test(v)?'sun':/sport|dumbbell/.test(v)?'dumbbell':/velo|vélo/.test(v)?'bike':/code/.test(v)?'code':/musique/.test(v)?'music':/feuille/.test(v)?'leaf':/cerveau/.test(v)?'brain':/repas/.test(v)?'utensils':/lune/.test(v)?'moon':'';line=line.replace(im[0],' ')}
  const dm=/(?:description|d[eé]tails?)\s*[:=]\s*(.+)$/i.exec(line);
  if(dm){desc=dm[1].trim().replace(/[.)]+$/,'');line=line.slice(0,dm.index)}
  else {const tail=/\)\s*-\s*(.+)$/.exec(line);if(tail){desc=tail[1].trim().replace(/[.)]+$/,'');line=line.slice(0,tail.index+1)}}
  return{line,icon,desc};
 };
 const flush=()=>{while(pT.length&&pN.length){const t=pT.shift();push(pN.shift(),t[0],t[1],days,t[2])}};
 const durOf=line=>{
  const m=DUR.exec(line);if(!m)return{line,dur:0};
  let d=0;if(m[1])d=+m[1];else if(m[2])d=+m[2]*60+Number(m[3]||0);else if(m[4])d=+m[4]*60+Number(m[5]||0);
  if(!d||d>1000)return{line,dur:0};
  return{line:line.replace(m[0],' '),dur:d};
 };
 /* Découpe : si tout est sur une seule ligne, on coupe avant chaque horaire ou jour */
 if(!/\n/.test(src.trim())){
  src=src.replace(new RegExp('(?<=\\S)\\s+(?=(?:'+DAY_RE+')\\b\\s*:?)','gi'),'\n').replace(new RegExp('(?<=[^\\d\\s\\-])\\s+(?='+TS+'\\s*-\\s*'+TS+')','gi'),'\n');
 }
 /* Tableaux / CSV : « | » et tabulations en séparateurs ; « ; » aussi. On garde les virgules dans les noms. */
 const lines=src.split(/\n+/).map(l=>l.replace(/\t+/g,' | ').replace(/;/g,' | ').replace(/[•·▪●◦■□☐☑✔✓✅❌*_#>]/g,' ').replace(/\s+/g,' ').trim()).filter(Boolean);
 for(let li=0;li<lines.length;li++){
  let line=lines[li];
  let cells=line.split('|').map(x=>x.trim()).filter(Boolean);
  /* En-têtes de tableau / lignes de séparation */
  if(!cells.length||/^[-\s|:=+]+$/.test(line))continue;
  const n=norm2(line);
  if(IMP_STOP.test(n))continue;
  if(cells.length>1&&cells.every(c=>IMP_STOP.test(norm2(c))||new RegExp('^'+DAY_RE+'$').test(norm2(c))))continue;
  /* Ligne de jour(s) seule(s) */
  const dOnly=dayOnly(line.replace(/[|:]+/g,' '));
  if(dOnly){days=dOnly;first=first||dOnly;flush();continue}
  /* Jour(s) en début de ligne suivis d'autre chose : « Lundi : 05h-06h Sport », « Lundi | 05:00 | 06:00 | Sport » */
  let lineDays=null;
  const lead=new RegExp('^\\s*((?:(?:du\\s+)?'+DAY_RE+'s?(?:\\s*(?:,|/|et|au|-|&)\\s*)?)+)\\s*(?::|\\||-)?\\s*(?=\\S)','i').exec(line);
  if(lead&&/\d/.test(line.slice(lead[0].length))){lineDays=parseDays(lead[1]);line=line.slice(lead[0].length)}
  else{
   const tail=new RegExp('\\(?\\s*((?:'+DAY_RE+'s?(?:\\s*(?:,|/|et|&)\\s*)?)+)\\s*\\)?\\s*$','i').exec(line);
   if(tail&&/\d/.test(line.slice(0,tail.index))&&tail.index>3){lineDays=parseDays(tail[1]);line=line.slice(0,tail.index)}
   else{const ev=/\b(tous les jours|chaque jour|en semaine|week-?end|du\s+\w+\s+au\s+\w+)\b/i.exec(line);if(ev&&/\d/.test(line)){lineDays=parseDays(ev[0]);line=line.replace(ev[0],' ')}}
  }
  cells=line.split('|').map(x=>x.trim()).filter(Boolean);
  line=cells.join(' ').replace(/\s+/g,' ').trim();
  const eff=lineDays||days;
  /* Cas CSV « 05:00 | 06:00 | Sport » : deux heures isolées en cellules */
  if(cells.length>=3&&cells.length<=5){
   const tt=cells.map(c=>new RegExp('^'+TS+'$').exec(c));
   if(tt[0]&&tt[1]&&okT(tt[0][1],tt[0][2])&&okT(tt[1][1],tt[1][2])){
    const name=clean(cells.slice(2).join(' '));
    if(name){push(name,toM(tt[0][1],tt[0][2]),toM(tt[1][1],tt[1][2]),eff);continue}
   }
  }
  /* Plusieurs plages sur une même ligne (« 5h-6h Sport, 6h-6h10 Douche ») : on découpe aux virgules */
  const nGroups=(line.match(new RegExp(TS+'\\s*-\\s*'+TS+'|'+TS,'g'))||[]).length;
  const parts=[];
  if(nGroups>=2){
   const timed=c=>new RegExp(TS).test(c);
   if(cells.length>=2&&cells.every(timed))cells.forEach(c=>parts.push(c));
   else line.split(/\s*,\s*|\s+et\s+(?=(?:de\s+)?\d)/i).forEach(p=>{if(!p)return;if(parts.length&&!timed(p))parts[parts.length-1]+=', '+p;else parts.push(p)})
  }
  else parts.push(line);
  let handled=false;
  for(let part of parts){
   const meta=metaOf(part);part=meta.line;
   const dd=durOf(part);part=dd.line;
   const stripT=x=>x.replace(new RegExp('(?:jusqu\\S*\\s+|à\\s+|vers\\s+)?'+TS,'gi'),' ');
   const r=RANGE.exec(part);
   if(r&&okT(r[1],r[2])&&okT(r[3],r[4])){
    const name=clean(stripT(part.slice(0,r.index)+' '+part.slice(r.index+r[0].length)));
    const s=toM(r[1],r[2]);let e=toM(r[3],r[4]);
    if(name)push(name,s,e,eff,dd.dur,meta);else{pT.push([s,e,dd.dur,meta]);if(lineDays)days=lineDays;flush()}
    handled=true;continue;
   }
   const t=ONE.exec(part);
   if(t&&okT(t[1],t[2])){
    const name=clean(stripT(part));
    if(name)push(name,toM(t[1],t[2]),null,eff,dd.dur,meta);
    else{pT.push([toM(t[1],t[2]),null,dd.dur,meta]);if(lineDays)days=lineDays;flush()}
    handled=true;continue;
   }
  }
  if(handled)continue;
  /* Ligne de texte sans heure : nom en attente si elle est courte et suivie d'une ligne d'heure ; sinon consigne ignorée */
  if(/[a-zà-ÿ]/i.test(line)){
   const nxt=lines.slice(li+1,li+3).some(l=>new RegExp(TS).test(l));
   const intro=/^(voici|voila|je (?:voudrais|veux|souhaite)|peux[- ]tu|pouvez|ajoute|ajouter|cree|creer|genere|generer|mets|mettre|importe|merci|s il te plait|stp|svp|salut|bonjour|coucou|mara|hello|hey)/.test(n)||n.split(' ').length>9;
   if(nxt&&!intro&&line.length<=70){pN.push(clean(line));if(lineDays)days=lineDays;flush()}
  }
 }
 /* Heures uniques sans fin : la fin = début de l'entrée suivante du même jour (dans la limite de 3 h), sinon 30 min */
 const byDay={};
 rows.forEach((r,i)=>{(r.days||[-1]).forEach(d=>{(byDay[d]=byDay[d]||[]).push(i)})});
 rows.forEach((r,i)=>{if(r.e!=null)return;let best=null;(r.days||[-1]).forEach(d=>{(byDay[d]||[]).forEach(j=>{const o=rows[j];if(j!==i&&o.s>r.s&&(best==null||o.s<best))best=o.s})});
  r.e=best!=null&&best-r.s<=180?best:r.s+30;r.autoEnd=true});
 rows.forEach(r=>{if(!r.days)dayless++});
 return{rows,days:first,leftover:pT.length+pN.length,dayless};
}

/* ══════════════ IMPORT DE FICHIERS · RESTAURATION · EMPLOI DU TEMPS (v5) ══════════════ */
const BUILD='29/09/2026 · import v7';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const fmtSize=n=>n>=1048576?(n/1048576).toFixed(1).replace('.',',')+' Mo':Math.max(1,Math.round(n/1024))+' Ko';
const daysLabel=ds=>{ds=[...new Set(ds)].sort((a,b)=>((a+6)%7)-((b+6)%7));return ds.length===7?'tous les jours':(ds.length===5&&!ds.includes(0)&&!ds.includes(6))?'lun–ven':(ds.length===2&&ds.includes(0)&&ds.includes(6))?'week-end':ds.map(d=>DL[d].slice(0,3)).join(' ')};
(()=>{const s=document.createElement('style');s.textContent='.fbar{height:10px;border-radius:99px;background:var(--s2);overflow:hidden;margin:14px 0 6px}.fbar i{display:block;height:100%;border-radius:99px;background:var(--pr);transition:width .25s ease}.fsteps{list-style:none;margin:10px 0 0;padding:0;font-size:.88rem}.fsteps li{padding:3px 0;color:var(--mu)}.fsteps li.on{color:var(--fg);font-weight:500}.fsteps li.ok{color:var(--ok)}.flist{margin:10px 0 0;padding:0 0 0 18px;font-size:.88rem;max-height:32dvh;overflow:auto}.flist li{margin:3px 0}.fchips{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0}.fchips button{flex:1;min-width:36px;height:38px;border-radius:12px;border:1px solid var(--bd);background:var(--el);color:var(--fg);cursor:pointer;font:inherit}.fchips button.a{background:var(--pr);color:#06101f;border-color:transparent}.imgwrap{position:sticky;top:-18px;z-index:2;background:var(--s);padding:6px 0;margin:8px 0}.imgwrap img{width:100%;max-height:30dvh;object-fit:contain;border-radius:12px;background:#000;display:block}.imgwrap.big img{max-height:70dvh}';document.head.appendChild(s)})();

/* ── Stockage : jamais d'échec silencieux ── */
function slimImages(keep){const it=[];(S.chat||[]).forEach(m=>{if(m&&m.img)it.push(m)});Object.keys(S.mood||{}).sort().forEach(k=>((S.mood[k]||{}).th||[]).forEach(m=>{if(m&&m.img)it.push(m)}));it.slice(0,Math.max(0,it.length-keep)).forEach(m=>{delete m.img});return it.length>keep}
function shrinkDataUrl(url,max,q){return new Promise(res=>{try{const im=new Image();im.onload=()=>{try{const sc=Math.min(1,max/Math.max(im.width,im.height)),w=Math.max(1,Math.round(im.width*sc)),h=Math.max(1,Math.round(im.height*sc)),cv=document.createElement('canvas');cv.width=w;cv.height=h;const cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,w,h);cx.drawImage(im,0,0,w,h);res(cv.toDataURL('image/jpeg',q))}catch(e){res(url)}};im.onerror=()=>res(url);im.src=url}catch(e){res(url)}})}
const readDataUrl=f=>new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(String(r.result));r.onerror=()=>ko(r.error||new Error('lecture'));r.readAsDataURL(f)});
const readBuf=(f,onp)=>new Promise((ok,ko)=>{const r=new FileReader();r.onprogress=e=>{if(e.lengthComputable&&onp)onp(e.loaded/e.total)};r.onload=()=>ok(r.result);r.onerror=()=>ko(r.error||new Error('lecture'));r.readAsArrayBuffer(f)});

/* ── Lecture d'un zip (sans bibliothèque) : .zip de sauvegarde, .docx ── */
async function unzipEntries(buf){
 const dv=new DataView(buf),u8=new Uint8Array(buf);let e=-1;
 for(let i=u8.length-22;i>=Math.max(0,u8.length-66000);i--){if(dv.getUint32(i,true)===0x06054b50){e=i;break}}
 if(e<0)throw new Error('zip');
 const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const out=[];
 for(let k=0;k<n;k++){if(dv.getUint32(p,true)!==0x02014b50)break;const meth=dv.getUint16(p+10,true),csz=dv.getUint32(p+20,true),usz=dv.getUint32(p+24,true),fl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lo=dv.getUint32(p+42,true);out.push({name:new TextDecoder().decode(u8.subarray(p+46,p+46+fl)),meth,csz,usz,lo});p+=46+fl+xl+cl}
 out.read=async en=>{const lp=en.lo,lf=dv.getUint16(lp+26,true),lx=dv.getUint16(lp+28,true),st=lp+30+lf+lx,data=u8.subarray(st,st+en.csz);if(en.meth===0)return data;if(en.meth===8&&typeof DecompressionStream!=='undefined'){const ds=new DecompressionStream('deflate-raw');return new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(ds)).arrayBuffer())}throw new Error('zipmeth')};
 return out;
}
function decodeText(u8){let t;try{t=new TextDecoder('utf-8',{fatal:true}).decode(u8)}catch(e){try{t=new TextDecoder('windows-1252').decode(u8)}catch(x){t=new TextDecoder('utf-8').decode(u8)}}return t.replace(/^\uFEFF/,'')}

/* ── Calendrier .ics → lignes « Lundi 05h00 - 06h00 Nom » ── */
function icsToText(txt){
 const raw=txt.replace(/\r/g,'').replace(/\n[ \t]/g,'');const out=[];const ev=raw.split('BEGIN:VEVENT').slice(1,501);
 const pd=v=>{const m=/(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?/.exec(v||'');if(!m)return null;if(m[4]==null)return null;return m[7]?new Date(Date.UTC(+m[1],+m[2]-1,+m[3],+m[4],+m[5])):new Date(+m[1],+m[2]-1,+m[3],+m[4],+m[5])};
 const map={MO:1,TU:2,WE:3,TH:4,FR:5,SA:6,SU:0};
 ev.forEach(b=>{const g=k=>{const m=new RegExp('^'+k+'[^:\\n]*:(.*)$','m').exec(b);return m?m[1].trim():''};const s=pd(g('DTSTART')),e=pd(g('DTEND')),name=g('SUMMARY').replace(/\\,/g,',').replace(/\\n/g,' ');if(!s||!name)return;
  const by=/BYDAY=([A-Z,0-9-]+)/.exec(g('RRULE'));let days=by?by[1].split(',').map(x=>map[x.replace(/[^A-Z]/g,'')]).filter(x=>x!=null):[s.getDay()];
  const f=d=>d.getHours()+'h'+pad(d.getMinutes());out.push(days.map(d=>DL[d]).join(', ')+' '+f(s)+(e?' - '+f(e):'')+' '+name)});
 return out.join('\n');
}

/* ── Lecture d'une photo : détecteur de texte du navigateur s'il existe (sinon saisie guidée) ── */
async function tryOcr(dataUrl){
 try{if(!('TextDetector' in window))return '';const det=new window.TextDetector();const im=await new Promise((ok,ko)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=ko;i.src=dataUrl});const res=await det.detect(im);if(!res||!res.length)return '';
  const it=res.map(r=>({t:r.rawValue||'',x:r.boundingBox.x,y:r.boundingBox.y+r.boundingBox.height/2,h:r.boundingBox.height||10})).filter(r=>r.t).sort((a,b)=>a.y-b.y);
  const lines=[];it.forEach(r=>{const l=lines[lines.length-1];if(l&&Math.abs(l.y-r.y)<Math.max(l.h,r.h)*.6){l.p.push(r);l.y=(l.y+r.y)/2}else lines.push({y:r.y,h:r.h,p:[r]})});
  return lines.map(l=>l.p.sort((a,b)=>a.x-b.x).map(p=>p.t).join(' ')).join('\n');
 }catch(e){return ''}
}

/* ── Nettoyage / validation d'une sauvegarde : plus rien ne peut faire planter l'affichage ── */
const _tm=v=>{const m=/^\s*(\d{1,2})\s*[:hH]\s*(\d{1,2})?\s*$/.exec(String(v==null?'':v));if(!m||+m[1]>23||+(m[2]||0)>59)return '';return pad(+m[1])+':'+pad(+(m[2]||0))};
function normHabit(h,i,used){
 if(!h||typeof h!=='object')return null;const name=String(h.name||h.nom||h.title||'').trim().slice(0,60);if(!name)return null;
 const time=_tm(h.time)||_tm(h.heure)||_tm(h.start)||'08:00';
 let days=Array.isArray(h.days)?[...new Set(h.days.map(Number).filter(d=>Number.isInteger(d)&&d>=0&&d<=6))]:[];if(!days.length)days=[...ALL];
 const dayTimes={};if(h.dayTimes&&typeof h.dayTimes==='object'&&!Array.isArray(h.dayTimes))for(const[k,v]of Object.entries(h.dayTimes)){const t=_tm(v);if(t&&+k>=0&&+k<=6)dayTimes[k]=t}
 let id=String(h.id||'');if(!id||used.has(id))id='h'+Date.now().toString(36)+i+Math.random().toString(36).slice(2,4);used.add(id);
 const cat=CAT[h.cat]?h.cat:guessCat(name),icon=P[h.icon]?h.icon:guessIcon(cat),dur=Math.max(1,Math.min(1440,Math.round(Number(h.dur)||30)));
 return{...h,id,name,desc:String(h.desc||'').slice(0,400),cat,icon,time,dayTimes,dur,days,alarm:h.alarm!==false,snd:typeof h.snd==='string'?h.snd:''};
}
function normState(d){
 if(d&&d.data&&typeof d.data==='object'&&!Array.isArray(d.habits))d=d.data;
 if(Array.isArray(d))d={habits:d};
 if(!d||typeof d!=='object')throw new Error('format');
 const isO=x=>x&&typeof x==='object'&&!Array.isArray(x);
 const used=new Set(),habits=(Array.isArray(d.habits)?d.habits:[]).map((h,i)=>normHabit(h,i,used)).filter(Boolean);
 const done={};if(isO(d.done))for(const[k,v]of Object.entries(d.done))if(Array.isArray(v))done[k]=v.map(String);
 const mood={};if(isO(d.mood))for(const[k,v]of Object.entries(d.mood))if(isO(v)){mood[k]={...v,m:String(v.m||''),t:String(v.t||''),th:Array.isArray(v.th)?v.th.filter(x=>x&&typeof x==='object'&&typeof x.t==='string').map(x=>({...x,r:x.r==='u'?'u':'a'})):[]}}
 const tasks=(Array.isArray(d.tasks)?d.tasks:[]).filter(t=>t&&typeof t==='object'&&String(t.t||'').trim()).map((t,i)=>({...t,id:String(t.id||'task-'+Date.now().toString(36)+i),t:String(t.t),c:TC[t.c]?t.c:'oublis',done:!!t.done,created:Number(t.created)||0}));
 const reflections=(Array.isArray(d.reflections)?d.reflections:[]).filter(r=>r&&typeof r==='object'&&String(r.t||'').trim());
 const notes=Array.isArray(d.notes)?d.notes.filter(x=>x!=null):[];
 const chat=(Array.isArray(d.chat)?d.chat:[]).filter(m=>m&&typeof m==='object'&&typeof m.t==='string').map(m=>({...m,r:m.r==='u'?'u':'a'})).slice(-80);
 const mara=isO(d.mara)?{...d.mara,turns:Array.isArray(d.mara.turns)?d.mara.turns.filter(x=>x&&typeof x==='object'):[],lastIdx:isO(d.mara.lastIdx)?d.mara.lastIdx:{},memory:Array.isArray(d.mara.memory)?d.mara.memory.filter(x=>x&&x.fact):[]}:undefined;
 const o={...d,name:typeof d.name==='string'?d.name.slice(0,30):'',habits,done,mood,tasks,reflections,notes,chat,prefs:isO(d.prefs)?d.prefs:{},fired:isO(d.fired)?d.fired:{}};
 if(mara)o.mara=mara;else delete o.mara;
 return o;
}
function mergeState(cur,inc){
 const o=JSON.parse(JSON.stringify(cur));o.habits=o.habits||[];o.tasks=o.tasks||[];o.reflections=o.reflections||[];o.done=o.done||{};o.mood=o.mood||{};
 const sig=h=>norm(h.name)+'|'+h.time+'|'+[...h.days].sort().join(''),have=new Set(o.habits.map(sig)),ids=new Set(o.habits.map(h=>h.id));
 inc.habits.forEach(h=>{if(have.has(sig(h)))return;let id=h.id;if(ids.has(id))id=h.id+'-'+Math.random().toString(36).slice(2,5);o.habits.push({...h,id});ids.add(id);have.add(sig(h))});
 const tk=new Set(o.tasks.map(t=>t.t+'|'+t.c));inc.tasks.forEach(t=>{const k=t.t+'|'+t.c;if(!tk.has(k)){o.tasks.push(t);tk.add(k)}});
 const rk=new Set(o.reflections.map(r=>(r.day||r.date||'')+'|'+r.t));inc.reflections.forEach(r=>{const k=(r.day||r.date||'')+'|'+r.t;if(!rk.has(k)){o.reflections.push(r);rk.add(k)}});
 Object.entries(inc.done).forEach(([k,a])=>{o.done[k]=[...new Set([...(o.done[k]||[]),...a])]});
 Object.entries(inc.mood).forEach(([k,v])=>{if(!o.mood[k])o.mood[k]=v});
 if(!o.name&&inc.name)o.name=inc.name;
 if(inc.mara&&inc.mara.memory&&inc.mara.memory.length){o.mara=o.mara||{turns:[],lastIt:'',lastIdx:{},lastTip:-1,memory:[]};o.mara.memory=o.mara.memory||[];inc.mara.memory.forEach(f=>{if(!o.mara.memory.some(x=>x.fact===f.fact))o.mara.memory.push(f)})}
 return o;
}
const countState=d=>({habits:(d.habits||[]).length,days:Object.keys(d.done||{}).filter(k=>(d.done[k]||[]).length).length,tasks:(d.tasks||[]).length,notes:(d.reflections||[]).length+(d.notes||[]).length});
const countLines=c=>[`• ${c.habits} habitude${c.habits>1?'s':''}`,c.days?`• ${c.days} jour${c.days>1?'s':''} de suivi (cases cochées)`:'',c.tasks?`• ${c.tasks} tâche${c.tasks>1?'s':''}`:'',c.notes?`• ${c.notes} note${c.notes>1?'s':''} / réflexion${c.notes>1?'s':''}`:''].filter(Boolean);

/* ── Fenêtre d'import (barre de progression, étapes, boutons) ── */
function fiShow(o){
 let m=document.getElementById('fimp');if(!m){m=document.createElement('div');m.id='fimp';m.className='chat-delete-overlay';m.style.zIndex=10002;document.body.appendChild(m)}
 m._h=o.on||{};
 const btn=(o.buttons||[]).map(b=>`<button class="btn ${b[2]||'g'}" data-f="${b[0]}">${esc(b[1])}</button>`).join('');
 m.innerHTML=`<section class="chat-delete-dialog reset-dialog" role="dialog" aria-modal="true" aria-live="polite" style="max-height:90dvh;overflow:auto"><span class="reset-mark" style="${o.danger?'':'background:color-mix(in srgb,var(--pr) 15%,transparent);color:var(--pr)'}">${ic(o.icon||'up')}</span><h2>${esc(o.title||'')}</h2>${o.text?`<p>${esc(o.text).replace(/\n/g,'<br>')}</p>`:''}${o.html||''}${o.pct!=null?`<div class="fbar"><i style="width:${Math.max(3,Math.min(100,o.pct))}%"></i></div><small class="mu" id="fimpl">${esc(o.label||'')}</small>`:''}${o.steps?`<ul class="fsteps">${o.steps.map((s,i)=>`<li class="${i<o.cur?'ok':i===o.cur?'on':''}">${i<o.cur?'✓':i===o.cur?'…':'○'} ${esc(s)}</li>`).join('')}</ul>`:''}<div class="chat-delete-actions">${btn}</div></section>`;
 m.onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;const f=b.dataset.f;if(f==='close'){m.remove();return}const fn=m._h[f];if(fn)fn(b)};
 return m;
}
const fiBar=(pct,label)=>{const i=document.querySelector('#fimp .fbar i'),l=document.getElementById('fimpl');if(i)i.style.width=Math.max(3,Math.min(100,pct))+'%';if(l&&label!=null)l.textContent=label};
const fiAlive=()=>!!document.getElementById('fimp');

/* ── Ajout d'un emploi du temps (sans validation ligne par ligne, avec « Annuler ») ── */
function applyScheduleRows(rows,o){
 o=o||{};const snap=JSON.stringify(S.habits),def=(o.defDays&&o.defDays.length)?o.defDays:[...ALL],items=[];
 rows.forEach(r=>{const name=String(r.name||'').trim();if(!name)return;const s=Math.max(0,Math.min(1439,r.s));let dur=r.e!=null?(r.e>s?r.e-s:(r.e+1440-s)):30;if(!(dur>0))dur=30;items.push({name:name.slice(0,60),s,dur:Math.min(720,dur),days:(r.days&&r.days.length?r.days:def)})});
 const aff=new Set();items.forEach(x=>x.days.forEach(d=>aff.add(d)));
 if(o.replace)S.habits=S.habits.map(h=>({...h,days:h.days.filter(d=>!aff.has(d))})).filter(h=>h.days.length);
 const g={};items.forEach(x=>{const k=norm(x.name)+'|'+x.s+'|'+x.dur;(g[k]=g[k]||{x,d:new Set()});x.days.forEach(d=>g[k].d.add(d))});
 const added=[];let dup=0,over=0;
 Object.values(g).forEach((v,i)=>{
  const ex=S.habits.find(h=>norm(h.name)===norm(v.x.name)&&mins(h.time)===v.x.s);
  if(ex){const nd=[...v.d].filter(d=>!ex.days.includes(d));if(!nd.length){dup++;return}ex.days=[...ex.days,...nd].sort();added.push({name:ex.name,s:v.x.s,dur:ex.dur,days:nd});return}
  const cat=guessCat(v.x.name),days=[...v.d].sort((a,b)=>a-b);
  if(days.some(d=>S.habits.some(h=>h.days.includes(d)&&mins(htime(h,d))<v.x.s+v.x.dur&&v.x.s<hend(h,d))))over++;
  const h={id:'h'+Date.now().toString(36)+i+Math.random().toString(36).slice(2,4),name:v.x.name,desc:String(v.x.desc||'').slice(0,400),cat,icon:P[v.x.icon]?v.x.icon:guessIcon(cat),time:hm2(v.x.s),dayTimes:{},dur:v.x.dur,days,alarm:true,snd:''};
  S.habits.push(h);added.push({name:h.name,s:v.x.s,dur:h.dur,days});
 });
 save();try{scheduleAlarms()}catch(e){}
 return{added,dup,over,snap,defUsed:rows.some(r=>!(r.days&&r.days.length))};
}
function showRecap(res,text){
 const n=res.added.length,list=res.added.slice().sort((a,b)=>a.s-b.s),shown=list.slice(0,12).map(x=>`<li><b>${hm2(x.s)}</b> · ${esc(x.name)} <span class="mu">(${dlab(x.dur)} · ${daysLabel(x.days)})</span></li>`).join('');
 const notes=[res.dup?`${res.dup} ligne${res.dup>1?'s':''} déjà présente${res.dup>1?'s':''} (ignorée${res.dup>1?'s':''})`:'',res.over?`${res.over} habitude${res.over>1?'s':''} chevauche${res.over>1?'nt':''} une autre : l’assistant d’organisation (✨ dans Habitudes) peut t’aider`:'',res.defUsed?'Sans jour précisé, j’ai mis « tous les jours » : modifie une habitude pour changer ça':''].filter(Boolean);
 fiShow({icon:n?'check':'x',danger:!n,title:n?`${n} habitude${n>1?'s':''} ajoutée${n>1?'s':''}`:'Rien de nouveau à ajouter',text:n?'':'Tout ce que j’ai lu existait déjà dans ton planning.',html:(n?`<ul class="flist">${shown}${list.length>12?`<li class="mu">… et ${list.length-12} autre${list.length-12>1?'s':''}</li>`:''}</ul>`:'')+(notes.length?`<p class="mu" style="font-size:.82rem;margin:10px 0 0">${notes.map(esc).join('<br>')}</p>`:''),
  buttons:[['go','Voir mes habitudes','' ],...(n&&text?[['edit','Vérifier / modifier les lignes','g']]:[]),...(n?[['undo','Annuler cet ajout','d']]:[]),['close','Fermer','g']],
  on:{go(){document.getElementById('fimp')?.remove();location.hash='#habits';render()},edit(){document.getElementById('fimp')?.remove();S.habits=JSON.parse(res.snap);save();render();openImport(text)},undo(){S.habits=JSON.parse(res.snap);save();render();document.getElementById('fimp')?.remove();showInfoModal('Ajout annulé','Ton planning est revenu comme avant.',{icon:'check'})}}});
}

/* ── Import d'un fichier depuis Profil (10 Mo max) ── */
async function openFileImport(file){
 if(!file)return;const MAX=10*1024*1024,nm=file.name||'fichier';
 const fail=(t,x)=>fiShow({icon:'x',danger:true,title:t,text:x,buttons:[['close','Fermer']]});
 if(file.size>MAX){fail('Fichier trop lourd',`« ${nm} » fait ${fmtSize(file.size)}. La limite est de 10 Mo.`);return}
 if(!file.size){fail('Fichier vide',`« ${nm} » ne contient rien.`);return}
 fiShow({icon:'up',title:'Lecture du fichier…',text:`${nm} · ${fmtSize(file.size)}`,pct:4,label:'Ouverture…',buttons:[['close','Annuler']]});
 let buf;try{buf=await readBuf(file,p=>fiBar(4+p*36,Math.round(p*100)+' %'))}catch(e){fail('Lecture impossible','Le fichier n’a pas pu être lu. Réessaie, ou choisis-le depuis ton dossier Téléchargements.');return}
 if(!fiAlive())return;fiBar(42,'Analyse du contenu…');await pause(200);
 const ext=(nm.split('.').pop()||'').toLowerCase(),ty=file.type||'',u8=new Uint8Array(buf);
 try{
  if(/^image\//.test(ty)||['png','jpg','jpeg','webp','gif','bmp','heic','heif'].includes(ext)){
   fiBar(60,'Préparation de la photo…');let url=await readDataUrl(file);url=await shrinkDataUrl(url,1600,.82);if(!fiAlive())return;
   fiBar(80,'Recherche de texte dans l’image…');const txt=await tryOcr(url);if(!fiAlive())return;document.getElementById('fimp')?.remove();
   if(txt&&parseSchedule(txt).rows.length){textFlow(txt,url)}else openImport(txt||'',url);return}
  if(/^audio\//.test(ty)||['mp3','wav','m4a','aac','ogg','oga','opus','caf','flac'].includes(ext)){
   fiBar(60,'Compression du son (8 s max)…');const ok=await addSoundFile(file);if(!fiAlive())return;fiShow(ok?{icon:'check',title:'Son ajouté',text:'Il est maintenant dans « Sons d’alarme » et sélectionné par défaut.',buttons:[['close','Compris']]}:{icon:'x',danger:true,title:'Son non ajouté',text:'Fichier illisible, trop court, ou 8 sons perso déjà enregistrés.',buttons:[['close','Fermer']]});return}
  if(ext==='pdf'||(u8[0]===0x25&&u8[1]===0x50&&u8[2]===0x44&&u8[3]===0x46)){fail('PDF non lisible hors connexion','Aube ne peut pas lire le texte d’un PDF sans internet. Ouvre-le, copie le texte de ton emploi du temps, puis colle-le à Mara. Ou fais une capture d’écran et importe l’image.');return}
  let text='',inner='';
  if(u8[0]===0x50&&u8[1]===0x4b&&u8[2]===3&&u8[3]===4){
   fiBar(50,'Ouverture de l’archive…');const ents=await unzipEntries(buf);
   const dx=ents.find(e=>e.name==='word/document.xml');
   if(dx){const xml=decodeText(await ents.read(dx));text=xml.replace(/<\/w:p>/g,'\n').replace(/<w:tab\/>/g,'\t').replace(/<w:br\/>/g,'\n').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'")}
   else if(ents.find(e=>e.name==='xl/workbook.xml')){fail('Excel non lisible','Enregistre ton tableau en « CSV » (Fichier → Enregistrer sous) puis importe le .csv.');return}
   else{const cand=ents.filter(e=>e.name&&!e.name.endsWith('/')&&!/(^|\/)(__MACOSX|\.)/.test(e.name)&&/\.(json|txt|csv|tsv|ics|md)$/i.test(e.name)&&e.usz<=20e6);
    if(!cand.length){fail('Aucune sauvegarde dans ce zip','Je n’ai trouvé aucun fichier .json, .txt, .csv ou .ics à l’intérieur. Pour restaurer, exporte une sauvegarde depuis Profil → Données.');return}
    cand.sort((a,b)=>(/sauvegarde|backup|aube/i.test(b.name)-/sauvegarde|backup|aube/i.test(a.name))||b.usz-a.usz);inner=cand[0].name;text=decodeText(await ents.read(cand[0]))}
  }else{if(u8.subarray(0,4000).includes(0)){fail('Type de fichier non pris en charge','Je sais lire : sauvegardes Aube (.json, .zip), emplois du temps (.txt, .csv, .ics, .docx), photos et sons d’alarme.');return}text=decodeText(u8)}
  if(!fiAlive())return;fiBar(55,'Vérification…');await pause(150);
  const tr=text.trim();let js=null;
  if(tr[0]==='{'||tr[0]==='['){try{js=JSON.parse(tr)}catch(e){}}
  if(js){
   const d=(js&&js.data&&typeof js.data==='object'&&!Array.isArray(js.habits))?js.data:js;
   const ok=Array.isArray(d)?d.length&&d.every(x=>x&&typeof x==='object'&&(x.name||x.nom||x.title)):(d&&typeof d==='object'&&(Array.isArray(d.habits)||Array.isArray(d.tasks)||Array.isArray(d.reflections)||d.done||d.mood));
   if(ok){const inc=normState(d);restoreFlow(inc,nm,inner,file.size);return}
  }
  if(/BEGIN:VCALENDAR/.test(text))text=icsToText(text);
  if(parseSchedule(text).rows.length){document.getElementById('fimp')?.remove();textFlow(text,null);return}
  fail('Je n’ai rien reconnu dedans','Ce fichier n’est ni une sauvegarde Aube, ni un emploi du temps avec des horaires (ex. « 05h00 – 06h00 Séance de sport »). Vérifie le fichier ou colle son texte directement à Mara.');
 }catch(e){fail('Import impossible','Une erreur est survenue en lisant « '+nm+' ». Vérifie que le fichier n’est pas abîmé, puis réessaie.')}
}
async function addSoundFile(f){
 try{if(f.size>6e6||CS.length>=8)return false;const blob=await transcodeAlarm(f),id='c'+Date.now(),name=f.name.replace(/\.[^.]+$/,'')||'Mon son';await idbDo('readwrite',s=>s.put({id,name,blob}));CS.push({id,name,blob});delete decodedBuf[id];S.prefs.snd=id;save();render();return true}catch(e){return false}
}

/* ── Emploi du temps trouvé dans un fichier / une photo ── */
function textFlow(text,img){
 const p=parseSchedule(text),st={chips:new Set(),rep:false},need=p.dayless>0;
 const draw=()=>{const list=p.rows.slice(0,8).map(r=>`<li><b>${hm2(r.s)}</b> · ${esc(r.name)} <span class="mu">(${dlab((r.e>r.s?r.e-r.s:30))}${r.days?' · '+daysLabel(r.days):''})</span></li>`).join('');
  fiShow({icon:'cal',title:`${p.rows.length} activité${p.rows.length>1?'s':''} trouvée${p.rows.length>1?'s':''}`,text:need?'Certaines lignes n’ont pas de jour. Choisis les jours à leur appliquer :':'',
   html:(need?`<div class="fchips">${[1,2,3,4,5,6,0].map(d=>`<button data-f="d${d}" class="${st.chips.has(d)?'a':''}">${DAYS[d]}</button>`).join('')}</div>`:'')+`<ul class="flist">${list}${p.rows.length>8?`<li class="mu">… et ${p.rows.length-8} autres</li>`:''}</ul>`,
   buttons:[['add',need&&!st.chips.size?'Ajouter (tous les jours)':'Ajouter à mes habitudes',''],['edit','Vérifier / modifier d’abord','g'],['close','Annuler','d']],
   on:{...Object.fromEntries([0,1,2,3,4,5,6].map(d=>['d'+d,()=>{st.chips.has(d)?st.chips.delete(d):st.chips.add(d);draw()}])),
    add(){const res=applyScheduleRows(p.rows,{defDays:[...st.chips],replace:false});render();showRecap(res,text)},edit(){document.getElementById('fimp')?.remove();openImport(text,img)}}})};
 draw();
}

/* ── Restauration d'une sauvegarde : confirmation → barre de progression → résumé ── */
function restoreFlow(inc,nm,inner,size){
 const c=countState(inc);
 if(!c.habits&&!c.tasks&&!c.notes&&!c.days){fiShow({icon:'x',danger:true,title:'Sauvegarde vide',text:'Ce fichier ne contient ni habitudes, ni tâches, ni notes.',buttons:[['close','Fermer']]});return}
 fiShow({icon:'up',title:'Sauvegarde détectée',text:`${nm}${inner?' → '+inner:''} · ${fmtSize(size)}\n\n${countLines(c).join('\n')}\n\nQue veux-tu faire ?`,
  buttons:[['rep','Remplacer mes données par celles-ci',''],['mer','Fusionner avec ce que j’ai déjà','g'],['close','Annuler','d']],
  on:{rep(){runRestore(inc,'replace',nm)},mer(){runRestore(inc,'merge',nm)}}});
}
async function runRestore(inc,mode,nm){
 const steps=['Vérification du fichier','Reconstruction des habitudes et du suivi','Optimisation des images','Enregistrement sur l’appareil','Actualisation de l’application'];
 const show=(cur,pct,label)=>fiShow({icon:'up',title:'Restauration en cours…',text:nm,pct,label,steps,cur,buttons:[]});
 let prevStr='';try{prevStr=JSON.stringify(S)}catch(e){}
 try{
  show(0,8,'Vérification…');await pause(350);
  show(1,30,'Reconstruction…');await pause(350);
  let next=mode==='merge'?mergeState(S,inc):{...inc,prefs:{...(S.prefs||{}),...(inc.prefs||{})}};
  if(!next.habits.length&&mode==='replace')next.habits=S.habits;
  next.mood=next.mood||{};next.done=next.done||{};next.reflections=next.reflections||[];next.tasks=next.tasks||[];
  show(2,52,'Images…');await pause(150);
  const imgs=[];[...(next.chat||[])].forEach(m=>{if(m&&m.img&&m.img.length>300000)imgs.push(m)});Object.values(next.mood).forEach(v=>(v.th||[]).forEach(m=>{if(m&&m.img&&m.img.length>300000)imgs.push(m)}));
  for(let i=0;i<imgs.length;i++){imgs[i].img=await shrinkDataUrl(imgs[i].img,1000,.7);fiBar(52+18*(i+1)/imgs.length,`Image ${i+1} / ${imgs.length}`)}
  show(3,78,'Écriture…');await pause(300);
  try{localStorage.setItem(K+'.avant-import',prevStr)}catch(e){}
  S=next;S.reflections=Array.isArray(S.reflections)?S.reflections:[];S.tasks=Array.isArray(S.tasks)?S.tasks:[];S.prefs=S.prefs||{};
  let saved=true;
  try{localStorage.setItem(K,JSON.stringify(S))}catch(e){saved=false}
  if(!saved){for(const keep of[3,1,0]){slimImages(keep);try{localStorage.setItem(K,JSON.stringify(S));saved=true;break}catch(e){}}}
  let verified=false;try{const back=JSON.parse(localStorage.getItem(K)||'null');verified=!!back&&back.habits.length===S.habits.length}catch(e){}
  show(4,94,'Actualisation…');await pause(300);
  try{scheduleAlarms()}catch(e){}
  render();fiBar(100,'Terminé');await pause(250);
  const c=countState(S);
  fiShow({icon:'check',title:'Restauration terminée ✓',text:(saved&&verified?'Tout est enregistré sur cet appareil et affiché dans l’app :':'Les données sont affichées mais l’espace de stockage est presque plein — fais une sauvegarde (Exporter) dès maintenant :')+'\n\n'+countLines(c).join('\n'),
   buttons:[['go','Voir mes habitudes',''],['undo','Annuler la restauration','g'],['close','Fermer','g']],
   on:{go(){document.getElementById('fimp')?.remove();location.hash='#habits';render()},undo(){try{const b=JSON.parse(prevStr);if(b&&Array.isArray(b.habits)){S=b;save();render();document.getElementById('fimp')?.remove();showInfoModal('Restauration annulée','Tes données d’avant l’import ont été rétablies.',{icon:'check'})}}catch(e){}}}});
 }catch(e){
  try{const b=JSON.parse(prevStr);if(b&&Array.isArray(b.habits)){S=b}}catch(x){}
  try{render()}catch(x){}
  fiShow({icon:'x',danger:true,title:'La restauration a échoué',text:'Une erreur est survenue. Tes données actuelles ont été conservées telles quelles.',buttons:[['close','Fermer']]});
 }
}

/* ── Envoi d'un message à Mara : emploi du temps collé → habitudes créées automatiquement ── */
async function maraSchedule(text,img,id){
 let src=text,p=null,ocr=false;
 if(img){const o=await tryOcr(img);if(o){src=(text?text+'\n':'')+o;ocr=true}}
 try{p=src?parseSchedule(src):{rows:[],dayless:0}}catch(e){p={rows:[],dayless:0}}
 const t=norm(src||''),kw=has(t,'emploi du temps','emploi de temps','edt','horaires','planning','agenda','importe','habitudes','programme','routine','semaine'),multi=/\n/.test(src)||src.length>160;
 const isSched=p.rows.length>=3||(p.rows.length>=2&&(kw||multi))||(p.rows.length>=1&&kw&&multi);
 if(isSched){
  const replace=/\b(remplace|remplacer|efface|effacer|supprime tout|repars? de zero|nouveau planning|a la place)\b/.test(t);
  const res=applyScheduleRows(p.rows,{defDays:[],replace});
  const n=res.added.length;
  const reply=n?`C’est fait${N()} : j’ai lu ${p.rows.length} ligne${p.rows.length>1?'s':''} d’horaires et créé ${n} habitude${n>1?'s':''}${ocr?' (texte lu dans ta photo)':''}. ${res.defUsed?'Aucun jour n’était précisé pour certaines : je les ai mises tous les jours. ':''}Tu les retrouves dans Habitudes, et tu peux annuler ou vérifier dans la fenêtre qui s’ouvre.`:`J’ai bien lu ${p.rows.length} ligne${p.rows.length>1?'s':''} d’horaires${N()}, mais elles existent déjà dans ton planning : je n’ai rien ajouté en double.`;
  return{reply,after:()=>{render();showRecap(res,src)}};
 }
 if(img&&(!text||kw)){
  return{reply:`J’ai bien reçu ta photo${N()}. Sans internet, je n’ai pas de lecteur d’image dans ce navigateur : je ne peux donc pas déchiffrer le texte toute seule. Je t’ouvre la photo à côté d’une saisie rapide : tu tapes les lignes en la regardant et je crée les habitudes. Astuce : dans ta galerie, « Copier le texte de l’image » (Google Lens) puis colle-le ici, et je fais tout en un coup.`,after:()=>openImport(text||'',img)};
 }
 if(!img&&p.rows.length===0&&kw&&/(ajout|import|colle|renseign|donner|envoy|enregistr|cree|genere|mettre|mets)/.test(t)&&src.length<120){
  return{reply:`Avec plaisir${N()} ! Colle ton emploi du temps dans la fenêtre qui s’ouvre (ou directement ici, en entier, sans limite de longueur). Je reconnais « 05h00 – 06h00 Séance de sport », les jours (Lundi…), les tableaux, les listes, « du lundi au vendredi »… et je crée les habitudes.`,after:()=>openImport('',null)};
 }
 return null;
}

let impState=null;
function openImport(text,img){
 document.getElementById('imp-overlay')?.remove();
 const m=document.createElement('div');m.id='imp-overlay';m.style.cssText='position:fixed;inset:0;z-index:10001;background:rgba(3,7,18,.85);display:flex;align-items:center;justify-content:center;padding:14px;backdrop-filter:blur(7px)';
 const st=impState={rows:[],chips:new Set(),rep:false,img,leftover:0};
 const dl=r=>r.days&&r.days.length?r.days:[...st.chips];
 const clash=(r,i)=>{if(!r.on)return'';if(!r.name.trim())return'Nom manquant';if(r.e==null||r.e<=r.s)return'Fin après le début';const ds=dl(r);if(!ds.length)return'Choisis un jour';
  for(const d of ds){if(!st.rep){const h=S.habits.find(h=>h.days.includes(d)&&mins(htime(h,d))<r.e&&r.s<hend(h,d));if(h)return`Chevauche « ${h.name} » (${DL[d]})`}
   const o=st.rows.findIndex((x,j)=>j!==i&&x.on&&x.e!=null&&dl(x).includes(d)&&x.s<r.e&&r.s<x.e);if(o>=0)return`Chevauche la ligne ${o+1}`}return''};
 const recalc=()=>{let bad=0;st.rows.forEach((r,i)=>{const c=clash(r,i);if(c)bad++;const el=m.querySelector(`[data-b="${i}"]`);if(el)el.textContent=c?'⚠ '+c:''});const n=st.rows.filter(r=>r.on).length,b=m.querySelector('#impSave');if(b){b.disabled=!n||bad>0;b.style.opacity=b.disabled?.5:1;b.textContent=bad?`Corrige ${bad} ligne${bad>1?'s':''} en rouge`:`Ajouter ${n} habitude${n>1?'s':''}`}};
 const draw=()=>{m.innerHTML=`<section class="card" style="width:min(100%,460px);max-height:92dvh;overflow:auto;padding:18px;margin:0"><p class="cap">Import</p><h2 style="margin:0">Ajouter un emploi du temps</h2>${img?`<div class="imgwrap" id="impImgW"><img id="impImg" src="${img}" alt="Ton emploi du temps" title="Touche pour agrandir"></div>`:''}<p class="mu" style="font-size:.82rem;margin:8px 0">${img?'Sans internet, je ne peux pas déchiffrer une image toute seule. Regarde ta photo (touche-la pour l’agrandir) et tape les lignes avec « + Ajouter une ligne », ou colle ci-dessous le texte copié depuis Google Lens / « Copier le texte de l’image ».':'Colle ton emploi du temps ici, aussi long que tu veux : jours, heures, tableaux, listes… je range tout et tu peux vérifier chaque ligne avant d’enregistrer.'}</p><textarea id="impT" placeholder="05h00 – 06h00 Séance de sport&#10;06h00 – 06h10 Douche" style="min-height:90px">${esc(st.text||'')}</textarea><button class="btn g" id="impGo">Analyser le texte collé</button><button class="btn g" id="impAdd">+ Ajouter une ligne à la main</button>${(st.rows.length||st.manual)?`<div class="days" style="margin-top:12px">${[1,2,3,4,5,6,0].map(d=>`<button data-d="${d}" class="${st.chips.has(d)?'a':''}">${DAYS[d]}</button>`).join('')}</div><small class="mu">Jours appliqués aux lignes sans jour précis.</small>${st.rows.map((r,i)=>`<div style="border:1px solid var(--bd);border-radius:14px;padding:8px;margin-top:8px"><div style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-o="${i}" ${r.on?'checked':''} style="width:20px;height:20px;margin:0;flex:none"><input data-n="${i}" value="${esc(r.name)}" maxlength="60" style="margin:0"></div><div style="display:flex;gap:8px;margin-top:6px"><input type="time" data-s="${i}" value="${hm2(r.s)}" style="margin:0"><input type="time" data-e="${i}" value="${r.e==null?'':hm2(r.e)}" style="margin:0"></div><small data-b="${i}" style="color:var(--dg);display:block;margin-top:4px"></small></div>`).join('')}${st.leftover?`<p class="mu" style="font-size:.8rem;margin-top:8px">${st.leftover} ligne(s) non appariée(s) ignorée(s).</p>`:''}<label class="tg" style="font-size:.85rem"><span>Remplacer mon planning existant sur ces jours</span><input type="checkbox" class="sw" id="impRep" ${st.rep?'checked':''}></label>`:''}<button class="btn" id="impSave" ${st.rows.length?'':'disabled style="opacity:.5"'}>Ajouter</button><button class="btn g" id="impNo">Fermer</button></section>`;recalc()};
 m.onclick=e=>{const t=e.target;if(t===m||t.id==='impNo'){m.remove();return}
  if(t.id==='impGo'){st.text=m.querySelector('#impT').value;const p=parseSchedule(st.text);st.rows=p.rows.map(r=>({...r,on:true}));st.leftover=p.leftover;st.chips=new Set(p.days||[]);if(!st.rows.length)alert('Je n’ai trouvé aucune ligne « heure + activité ». Vérifie le texte collé.');draw();return}
  if(t.id==='impImg'){m.querySelector('#impImgW').classList.toggle('big');return}
  if(t.id==='impAdd'){const ta=m.querySelector('#impT');if(ta)st.text=ta.value;st.manual=true;st.rows.push({name:'',s:480,e:540,days:null,on:true});draw();const ins=m.querySelectorAll('[data-n]');const l=ins[ins.length-1];if(l){l.scrollIntoView({block:'center'});l.focus()}return}
  if(t.dataset.d!==undefined){const d=+t.dataset.d;st.chips.has(d)?st.chips.delete(d):st.chips.add(d);draw();return}
  if(t.id==='impRep'){st.rep=t.checked;recalc();return}
  if(t.dataset.o!==undefined){st.rows[+t.dataset.o].on=t.checked;recalc();return}
  if(t.id==='impSave'&&!t.disabled){const sel=st.rows.filter(r=>r.on),aff=new Set();sel.forEach(r=>dl(r).forEach(d=>aff.add(d)));
   if(st.rep)S.habits=S.habits.map(h=>({...h,days:h.days.filter(d=>!aff.has(d))})).filter(h=>h.days.length);
   const g={};sel.forEach(r=>{const k=norm(r.name)+'|'+r.s+'|'+(r.e-r.s);(g[k]=g[k]||{r,d:new Set()});dl(r).forEach(d=>g[k].d.add(d))});
   const list=Object.values(g);list.forEach((x,i)=>{const cat=guessCat(x.r.name);S.habits.push({id:'h'+Date.now().toString(36)+i,name:x.r.name.trim(),desc:String(x.r.desc||'').slice(0,400),cat,icon:P[x.r.icon]?x.r.icon:guessIcon(cat),time:hm2(x.r.s),dayTimes:{},dur:x.r.e-x.r.s,days:[...x.d].sort(),alarm:true,snd:''})});
   S.chat=S.chat||[];S.chat.push({r:'a',t:`C’est fait${N()} : ${list.length} habitude${list.length>1?'s':''} ajoutée${list.length>1?'s':''} depuis ton emploi du temps, avec les horaires que tu as validés.`});save();scheduleAlarms();m.remove();render()}};
 m.oninput=e=>{const t=e.target,D=t.dataset;if(D.n!==undefined)st.rows[+D.n].name=t.value;else if(D.s!==undefined||D.e!==undefined){const i=+(D.s??D.e),v=t.value,mm=v?mins(v):null;if(D.s!==undefined){const dur=st.rows[i].e!=null?st.rows[i].e-st.rows[i].s:30;st.rows[i].s=mm??0;if(!st.rows[i].manualE)st.rows[i].e=st.rows[i].s+dur}else{st.rows[i].e=mm;st.rows[i].manualE=true}}else return;recalc()};
 document.body.appendChild(m);st.text=text||'';const p=text?parseSchedule(text):{rows:[]};if(p.rows.length){st.rows=p.rows.map(r=>({...r,on:true}));st.leftover=p.leftover;st.chips=new Set(p.days||[])}draw();
}

function scheduleAlarms(){const list=S.prefs.notif?nextAlarms():[];clearTimeout(alarmTimer);const n=list[0];if(n){const wait=Math.max(400,Math.min(n.when-Date.now(),60000));alarmTimer=setTimeout(()=>{tick();scheduleAlarms()},wait)}keepAliveAudio(!!S.prefs.notif);holdWake(!!S.prefs.notif);try{navigator.serviceWorker?.ready.then(reg=>{reg.active?.postMessage({type:'aube-schedule',alarms:list});if(S.prefs.notif&&reg.periodicSync)reg.periodicSync.register('aube-alarms',{minInterval:60000}).catch(()=>{})})}catch(e){}}
function ringAl(h){$('#alarm').innerHTML=`<div class="al" style="--c:${col(h)}"><span class="ib">${ic(h.icon)}</span><p class="cap">${htime(h,new Date().getDay())} · ${h.dur} min</p><h1 style="margin-bottom:22px">${esc(h.name)}</h1><button class="btn" data-a="astart" data-id="${h.id}">${ic('play')} Je commence</button><button class="btn g" data-a="atog" data-id="${h.id}">${ic('check')} C’est terminé</button><button class="btn g" data-a="asn" data-id="${h.id}">Reporter de ${S.prefs.snooze} min</button><button class="btn d" data-a="adm">Ignorer</button></div>`;
unlockAudio();play(h.snd||S.prefs.snd||'urgent',true);navigator.vibrate&&navigator.vibrate([900,250,900,250,900,250,900,250,900]);
try{if(Notification.permission==='granted'){const t=htime(h,new Date().getDay());const o={body:`${t}–${hm2(mins(t)+Number(h.dur||0))} · ${h.dur} min · Touche pour ouvrir`,icon:'/icon-192.png',tag:h.id,renotify:true,requireInteraction:true,silent:false,vibrate:[900,250,900,250,900]};navigator.serviceWorker&&navigator.serviceWorker.ready?navigator.serviceWorker.ready.then(r=>r.showNotification('Aube · '+h.name,o)):new Notification('Aube · '+h.name,o)}}catch(e){}}
function tick(){if(!S.prefs.notif||$('#alarm').innerHTML)return;const n=new Date(),k=key(n),cur=n.getHours()*60+n.getMinutes();
for(const h of sched(n)){if(!h.alarm||isDone(h,k))continue;const id=h.id+k,m=mins(htime(h,n.getDay())),sn=S.fired[id+'s'];if(sn?cur>=sn:(cur>=m&&cur-m<=8&&!S.fired[id])){S.fired[id]=1;delete S.fired[id+'s'];save();ringAl(h);scheduleAlarms();return}}}
let activeDayKey=key(new Date());setInterval(()=>{const todayKey=key(new Date());if(todayKey!==activeDayKey){activeDayKey=todayKey;render();scheduleAlarms()}tick();checkReflectionReminder();if(document.hidden&&S.prefs.notif){try{navigator.serviceWorker?.controller?.postMessage({type:'aube-ping',now:Date.now(),alarms:nextAlarms()})}catch(e){}}},document.hidden?15000:1000);
/* Android : le sélecteur de fichiers masque la page ; au retour, ne pas redessiner tout de suite (sinon le champ fichier est détruit et le choix est perdu) */
let filePicking=false;
document.addEventListener('click',e=>{const l=e.target.closest&&e.target.closest('label');if((e.target.matches&&e.target.matches('input[type=file]'))||(l&&l.querySelector('input[type=file]')))filePicking=true},true);
document.addEventListener('change',e=>{if(e.target&&e.target.type==='file')setTimeout(()=>{filePicking=false},2500)},true);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){unlockAudio();tick();scheduleAlarms();if(filePicking){setTimeout(()=>{filePicking=false},2500)}else render();holdWake(!!S.prefs.notif)}});
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

/* Fenêtre d'information intégrée, stylisée comme le reste de l'app — remplace
   les alert() natifs du navigateur (moches et non personnalisables). */
function showInfoModal(title,body,opts){
 opts=opts||{};
 document.getElementById('info-modal')?.remove();
 const modal=document.createElement('div');modal.id='info-modal';modal.className='chat-delete-overlay';
 modal.innerHTML=`<section class="chat-delete-dialog reset-dialog" role="dialog" aria-modal="true" aria-labelledby="info-title"><span class="reset-mark" style="${opts.danger?'':'background:color-mix(in srgb,var(--pr) 15%,transparent);color:var(--pr)'}">${ic(opts.icon||'bell')}</span><h2 id="info-title">${esc(title)}</h2><p>${esc(body)}</p><div class="chat-delete-actions">${opts.secondaryLabel?`<button class="btn g" data-a="${opts.secondaryAction||'infoClose'}">${esc(opts.secondaryLabel)}</button>`:''}<button class="btn g" data-a="${opts.okAction||'infoClose'}">${esc(opts.okLabel||'Compris')}</button></div></section>`;
 document.body.appendChild(modal);
}

function showResetConfirm(){
 document.getElementById('reset-overlay')?.remove();
 const modal=document.createElement('div');modal.id='reset-overlay';modal.className='chat-delete-overlay';
 modal.innerHTML=`<section class="chat-delete-dialog reset-dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title"><span class="reset-mark">${ic('trash')}</span><h2 id="reset-title">Réinitialiser Aube ?</h2><p>Cette action effacera tes habitudes, ton planning, tes notes et tes préférences enregistrées sur cet appareil. Elle ne peut pas être annulée.</p><div class="chat-delete-actions"><button class="btn d" data-a="resetConfirm">Tout effacer</button><button class="btn g" data-a="resetCancel">Garder mes données</button></div></section>`;
 document.body.appendChild(modal);
}

const A={
jtab(t){S.prefs.journalTab=t.dataset.v==='tasks'?'tasks':'notes';save();render()},maraBack(){go(maraFrom)},
tog(t){navigator.vibrate&&navigator.vibrate(25);doTog(t.dataset.id)},
tab(t){tab=t.dataset.v;render()},edit(t){go('#edit/'+t.dataset.id)},new(){go('#new')},back(){history.length>1?history.back():go('#habits')},
fi(t){dr.icon=t.dataset.v;render()},fc(t){dr.cat=t.dataset.v;render()},fd(t){const v=+t.dataset.v;dr.days=dr.days.includes(v)?dr.days.filter(x=>x!==v):[...dr.days,v];render()},
ff(t){dr.freq=t.value;dr.days=t.value==='daily'?[...ALL]:t.value==='weekdays'?[...WK]:dr.days.length&&dr.days.length<7?dr.days:[...WK];render()},fa(t){dr.alarm=t.checked;render()},fs(t){dr.snd=t.value},
sv(){if(!dr.name.trim()){$('[data-in=name]').focus();return}if(!dr.days.length){alert('Choisis au moins un jour.');return}const o={id:dr.id||'h'+Date.now().toString(36),name:dr.name.trim(),desc:dr.desc,cat:dr.cat,icon:dr.icon,time:dr.time||'08:00',dayTimes:{...(dr.dayTimes||{})},dur:Math.max(1,+dr.dur||15),days:[...dr.days],alarm:dr.alarm,snd:dr.snd};const conflicts=conflictsForHabit(o);if(conflicts.length){showHabitConflicts(o,conflicts);return}commitHabitDraft(o)},

organize(){openOrganizer()},orgApply(){applyOrganizer()},orgConfirm(){confirmOrganizerPlan()},orgManual(){showOrganizerManual()},orgManualApply(){applyOrganizerManual()},orgClose(){pendingOrganizerPlan=null;document.getElementById('organizer-modal')?.remove()},
habitConflictApply(){applyHabitConflictDraft()},habitConflictCancel(){pendingHabitDraft=null;document.getElementById('habit-conflict-overlay')?.remove()},
del(){showDeleteHabit()},delConfirm(){if(!dr)return;S.habits=S.habits.filter(h=>h.id!==dr.id);save();dr=null;document.getElementById('habit-delete-overlay')?.remove();go('#habits')},delCancel(){document.getElementById('habit-delete-overlay')?.remove()}, openMara(){go('#mara')},journal(){go('#journal')},backHome(){go('#today')},backPlan(){go('#plan')},scheduleView(){go('#timetable')},exportTimetable(){exportTimetableImage()},deleteReflection(t){S.reflections=S.reflections.filter(r=>r.id!==t.dataset.id);save();render()},

pd(t){pd=+t.dataset.v;render()},
mood(t){const k=key(new Date()),o=S.mood[k]||{th:[]},m=t.dataset.v,ch=o.m!==m;o.th=o.th||[];o.m=m;o.t=($('#note')||{}).value||o.t||'';S.mood[k]=o;if(ch)o.th.push({r:'a',t:moodReply(m)});save();
 /* Mise à jour ciblée : on change seulement l'état des boutons, sans reconstruire la page (plus de clignotement). */
 const strip=t.closest('.mood-strip');if(strip)strip.querySelectorAll('button').forEach(b=>b.classList.toggle('a',b===t));else refreshMoodCard()},
note(){const k=key(new Date()),o=S.mood[k]||{m:'',th:[]},v=($('#note')||{}).value?.trim()||'';o.th=o.th||[];S.mood[k]=o;if(v){o.th.push({r:'u',t:v},{r:'a',t:noteReply(o.m,v)});S.reflections=S.reflections||[];S.reflections.push({id:'r'+Date.now().toString(36),date:new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}),day:k,m:o.m||'ok',t:v,created:Date.now()});}o.t='';save();refreshMoodCard()},
taskAdd(){const el=$('#taskDraft'),t=(el?.value||'').trim();if(!t)return;S.tasks=S.tasks||[];S.tasks.unshift({id:'task-'+Date.now().toString(36),t,c:tCat,done:false,created:Date.now()});save();taskOk=true;clearTimeout(taskOkT);taskOkT=setTimeout(()=>{taskOk=false;document.getElementById('taskOk')?.remove();syncFlipHeight()},3500);refreshMoodCard();const d=$('#taskDraft');d&&d.focus()},
taskCat(t){tCat=TC[t.dataset.v]?t.dataset.v:'oublis';t.closest('.mood-strip').querySelectorAll('button').forEach(b=>b.classList.toggle('a',b===t))},
taskTog(t){const x=(S.tasks||[]).find(x=>x.id===t.dataset.id);if(x){x.done=!x.done;x.completed=x.done?Date.now():null;save();navigator.vibrate&&navigator.vibrate(25);render()}},
openTasks(){S.prefs.journalTab='tasks';save();go('#journal')},
taskToggle(t){const x=(S.tasks||[]).find(x=>x.id===t.dataset.id);if(x){x.done=!!t.checked;x.completed=x.done?Date.now():null;save();refreshMoodCard()}},
taskDelete(t){S.tasks=(S.tasks||[]).filter(x=>x.id!==t.dataset.id);save();render()},
moodFace(t){const v=t.dataset.v==='tasks'?'tasks':'mood';if((S.prefs.moodFace||'mood')===v)return;S.prefs.moodFace=v;save();const inner=document.getElementById('moodFlipInner');if(inner){inner.style.transition='';inner.classList.toggle('flipped',v==='tasks')}const seg=document.getElementById('moodFaceSeg');if(seg)seg.innerHTML=moodFaceSegHTML();syncFlipHeight()},
cs(t){const id=t.dataset.id,img=pendingImg[id];delete pendingImg[id];sendTo(id,$('#'+id+'i').value,img)},cq(t){sendTo('pc',t.dataset.q)},cc(){showChatDelete('pc',-1)},chatDelOne(){if(!pendingChatDelete)return;const {id,idx}=pendingChatDelete,arr=chatThread(id);if(idx>=0&&idx<arr.length)arr.splice(idx,1);pendingChatDelete=null;document.getElementById('chat-delete-overlay')?.remove();persistChat(id,arr)},chatDelAll(){if(!pendingChatDelete)return;const id=pendingChatDelete.id;pendingChatDelete=null;document.getElementById('chat-delete-overlay')?.remove();persistChat(id,[])},chatDelCancel(){pendingChatDelete=null;document.getElementById('chat-delete-overlay')?.remove()},br(){br=!br;render()},
ai(t){const f=t.files&&t.files[0];if(f)handleImage(t.dataset.id,f)},rmimg(t){delete pendingImg[t.dataset.id];const el=$('#'+t.dataset.id+'imgp');if(el)el.innerHTML=''},voice(t){startVoice(t.dataset.id)},
name(){S.name=$('#nm').value.trim();save();render()},
pv(t){const id=t.dataset.id;if(pl===id){pl='';stopSnd()}else{pl=id;play(id,false)}render()},ps(t){S.prefs.snd=t.dataset.id;save();play(t.dataset.id,false);pl=t.dataset.id;render()},
async ds(t){const id=t.dataset.id;if(!confirm('Supprimer ce son ?'))return;stopSnd();pl='';delete decodedBuf[id];try{await idbDo('readwrite',s=>s.delete(id))}catch(e){}CS=CS.filter(x=>x.id!==id);if(S.prefs.snd===id)S.prefs.snd='urgent';S.habits.forEach(h=>{if(h.snd===id)h.snd=''});save();render()},
astart(){stopAl();render()},atog(t){stopAl();const k=key(new Date());(S.done[k]||[]).includes(t.dataset.id)?render():doTog(t.dataset.id)},
asn(t){stopAl();const n=new Date();S.fired[t.dataset.id+key(n)+'s']=n.getHours()*60+n.getMinutes()+S.prefs.snooze;save()},adm(){stopAl()},
install(){window.dip&&window.dip.prompt()},
exp(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));a.download='aube-sauvegarde-'+key(new Date())+'.json';a.click()},
rst(){showResetConfirm()},resetConfirm(){S=seed();save();document.getElementById('reset-overlay')?.remove();go('#today')},resetCancel(){document.getElementById('reset-overlay')?.remove()},
infoClose(){document.getElementById('info-modal')?.remove()}
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
if(a==='taskToggle'){A.taskToggle(t);return}
if(a==='reflectionNotify'){if(t.checked){try{if(!('Notification'in window)){throw new Error('no-notification')}if(Notification.permission==='denied'){t.checked=false;showInfoModal('Notifications bloquées','Tu as déjà refusé les notifications pour Aube dans ton navigateur. Pour activer ce rappel, autorise-les depuis les réglages du site (l’icône ⓘ ou 🔒 à côté de l’adresse), puis reviens ici.',{danger:true,icon:'bell'});return}if(Notification.permission==='default')await Notification.requestPermission()}catch(x){}if(!('Notification'in window)||Notification.permission!=='granted'){t.checked=false;showInfoModal('Notifications indisponibles','Ton navigateur n’a pas autorisé les notifications ici. Réessaie depuis les réglages du site, ou vérifie que ton navigateur les prend en charge.',{danger:true,icon:'bell'});return}}S.prefs.reflectionNotify=t.checked;save();render();return}
if(a==='pn'){unlockAudio();if(t.checked){if(!('Notification'in window)||!window.isSecureContext){t.checked=false;S.prefs.notif=false;save();render();showInfoModal('Notifications non prises en charge','Les notifications nécessitent une version installée ou un site sécurisé (HTTPS) dans un navigateur compatible. Ouvre Aube depuis son adresse HTTPS dans Chrome, puis installe-la et réessaie.',{danger:true,icon:'bell'});return}try{if(Notification.permission==='default'){const permission=await Notification.requestPermission();if(permission!=='granted'){t.checked=false;S.prefs.notif=false;save();render();showInfoModal('Autorisation refusée','Autorise les notifications dans les réglages du site, puis réessaie.',{danger:true,icon:'bell'});return}}}catch(x){t.checked=false;S.prefs.notif=false;save();render();showInfoModal('Notifications indisponibles','Ce navigateur ou son mode intégré ne permet pas de demander les notifications. Ouvre Aube dans Chrome depuis son adresse HTTPS.',{danger:true,icon:'bell'});return}}S.prefs.notif=t.checked;keepAliveAudio(t.checked);holdWake(t.checked);scheduleAlarms()}
else if(a==='psn')S.prefs.snooze=+t.value;else if(a==='pvol'){render();return}
else if(a==='ff'||a==='fa'||a==='fs'){A[a](t);return}
else if(a==='ai'){A.ai(t);return}
else if(a==='as'&&t.files[0]){const f=t.files[0];if(f.size>6e6){alert('Fichier trop lourd (6 Mo max).');return}if(CS.length>=8){alert('Espace limité : 8 sons perso max. Supprime-en un d’abord.');return}try{const blob=await transcodeAlarm(f);const id='c'+Date.now();const name=f.name.replace(/\.[^.]+$/,'')||'Mon son';await idbDo('readwrite',s=>s.put({id,name,blob}));CS.push({id,name,blob});delete decodedBuf[id];S.prefs.snd=id;save();render();pl=id;play(id,false)}catch(x){alert(x&&x.message==='court'?'Ce son est trop court.':'Impossible de lire ce fichier. Essaie un MP3, WAV, M4A ou AAC.')}return}
else if((a==='imp'||a==='impf')&&t.files[0]){const f=t.files[0];try{t.value=''}catch(x){}openFileImport(f);return}
save();render()});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)&&e.target.dataset&&e.target.dataset.enter){e.preventDefault();A.cs({dataset:{id:e.target.dataset.enter}})}});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window.dip=e;render()});addEventListener('appinstalled',()=>{window.dip=null;render()});
if('serviceWorker'in navigator&&/^https?:/.test(location.protocol)){
 navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(()=>navigator.serviceWorker.register('/aube/sw.js').catch(()=>{}));
}
addEventListener('online',()=>{if(location.hash==='#mood'||location.hash==='#habits'||location.hash==='#mara'||location.hash==='#plan')render()});addEventListener('offline',()=>{if(location.hash==='#mood'||location.hash==='#habits'||location.hash==='#mara'||location.hash==='#plan')render()});render();tick();scheduleAlarms();checkReflectionReminder();

}
