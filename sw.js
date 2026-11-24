/* Service worker: precaches the whole app (all days, Agpeya) for offline use and keeps it up to date automatically. Day icons (img/icons/) are cached on demand and warmed in the background into a separate cache. */
const CACHE='cod-f1408c2107';
const ICONS='cod-icons-v1';
const HASHES={"./": "eb8db38c09", "app.css": "e79decabe8", "app.js": "d84425b1b2", "data/2026-11.json": "186b32a6ef", "data/2026-12.json": "476a7959fd", "data/2027-01.json": "90dba832c2", "data/2027-02.json": "73563323e0", "data/2027-03.json": "2ae0bc766b", "data/2027-04.json": "dfbd38e6d9", "data/2027-05.json": "c0faa85cb0", "data/2027-06.json": "da9ffefdc4", "data/2027-07.json": "e6b8ec01f6", "data/2027-08.json": "81cc009108", "data/2027-09.json": "ed098bb0a7", "data/2027-10.json": "fab97f962a", "data/2027-11.json": "c624214d53", "data/2027-12.json": "2a4601c8ef", "data/about.json": "1488725ea8", "data/icons.json": "560ea1b745", "data/index.json": "88b6bc125b", "data/months.json": "f40c8790fc", "data/prayers.json": "7b8c82e0ca", "fonts/NotoSansCoptic-Regular.ttf": "e70bd535d7", "icons/apple-touch-icon-180.png": "a69115bf72", "icons/favicon-32.png": "cc29ef69aa", "icons/icon-192.png": "e7cb8eebb8", "icons/icon-512.png": "427e39c813", "icons/icon-maskable-512.png": "bd78899db5", "index.html": "eb8db38c09", "manifest.webmanifest": "0498e6e73d"};
const IMGS=["img/icons/abraham-51ef97fd.webp", "img/icons/andrew-9117bc9d.webp", "img/icons/annunciation-57fb94be.webp", "img/icons/ascension-21b25a9a.webp", "img/icons/athanasius-ba4cb50a.webp", "img/icons/basil-7463f26f.webp", "img/icons/blind-baadd37e.webp", "img/icons/blind2-90aceaf0.webp", "img/icons/bridegroom-76c33089.webp", "img/icons/c_abraam_zaraa-fa863454.webp", "img/icons/c_anthony-dbedf24d.webp", "img/icons/c_archangel2-acc17d60.webp", "img/icons/c_barbara-36edc65a.webp", "img/icons/c_christ-75f99909.webp", "img/icons/c_christ2-1607953f.webp", "img/icons/c_christ3-845d3076.webp", "img/icons/c_cross-82a64a4a.webp", "img/icons/c_crucifixion-c140e576.webp", "img/icons/c_damian-8d1c89e9.webp", "img/icons/c_dioscorus-4bc7b48c.webp", "img/icons/c_dormition-e8b7bd72.webp", "img/icons/c_feeding-5cf94bfd.webp", "img/icons/c_flight-c030b1a3.webp", "img/icons/c_george-111eaab9.webp", "img/icons/c_john_baptist-e165819d.webp", "img/icons/c_john_short-5bde3664.webp", "img/icons/c_macarius-3465f193.webp", "img/icons/c_mark-7105cd3d.webp", "img/icons/c_mercurius-6dba8f39.webp", "img/icons/c_mercurius2-0fef01f8.webp", "img/icons/c_michael-35971ba5.webp", "img/icons/c_nayrouz-09c3a3a2.webp", "img/icons/c_onuphrius-630dca82.webp", "img/icons/c_pachomius-388e749b.webp", "img/icons/c_paul_anthony-08b74e47.webp", "img/icons/c_raphael-4f153132.webp", "img/icons/c_resurrection-6de2a54f.webp", "img/icons/c_severus-37cf82d8.webp", "img/icons/c_shenouda-42ca3320.webp", "img/icons/c_takla-57f945c9.webp", "img/icons/c_theophany-4657046c.webp", "img/icons/c_theotokos-b7f931d4.webp", "img/icons/c_theotokos2-ff2526d2.webp", "img/icons/calling2-368dcac8.webp", "img/icons/cana2-206a63c2.webp", "img/icons/chrysostom-63e05a24.webp", "img/icons/circumcision-68589f3f.webp", "img/icons/cleansing-142bfebc.webp", "img/icons/constantine_helen-17904091.webp", "img/icons/cosmas_damian-7469a7fb.webp", "img/icons/councils-1b3a9b0c.webp", "img/icons/cyril_alex-57d087f5.webp", "img/icons/cyril_jer-67fdccab.webp", "img/icons/daniel-42497a71.webp", "img/icons/elisha-ccb01d57.webp", "img/icons/emmaus2-4ce839f6.webp", "img/icons/entry_theotokos-0f8bb956.webp", "img/icons/ephraim-acc1e060.webp", "img/icons/epiphanius-5d39be56.webp", "img/icons/euphemia-22f0cb82.webp", "img/icons/eustathius-66837815.webp", "img/icons/ezekiel-46934db8.webp", "img/icons/forty-bd59cd07.webp", "img/icons/gabriel-5b696203.webp", "img/icons/gregory_illum-74dfbc6b.webp", "img/icons/gregory_nyssa-79e39462.webp", "img/icons/gregory_theol-2f580b81.webp", "img/icons/ignatius-f1dc6dff.webp", "img/icons/innocents-c03f2258.webp", "img/icons/isaiah-aced1d23.webp", "img/icons/james_br-9ad41ef0.webp", "img/icons/jeremiah-0c9eab72.webp", "img/icons/joachim_anna-effdcc0d.webp", "img/icons/job2-8a5b1db9.webp", "img/icons/john_beheading-68c322e6.webp", "img/icons/john_nativity-339bde69.webp", "img/icons/john_theol-9e13fd46.webp", "img/icons/jonah-387be4cc.webp", "img/icons/jude-f8d62206.webp", "img/icons/lamentation-9ff75b1d.webp", "img/icons/lazarus-c67d0ec4.webp", "img/icons/longinus-36de62c2.webp", "img/icons/luke-b12f8fe3.webp", "img/icons/magdalene-71d2eed0.webp", "img/icons/marina-18194685.webp", "img/icons/mary_egypt-19f3c9d8.webp", "img/icons/meeting-c7f10f4c.webp", "img/icons/menas-bd01fc1b.webp", "img/icons/micah-6c471515.webp", "img/icons/moses-e4f76b96.webp", "img/icons/moses_eth-fa57d8af.webp", "img/icons/nahum-b7204a5e.webp", "img/icons/nain-9c8c7891.webp", "img/icons/nativity-034b894c.webp", "img/icons/nativity2-5f2ad4d4.webp", "img/icons/nicholas-c57bd5d5.webp", "img/icons/palm-2f9eb668.webp", "img/icons/panteleimon-db34c6fb.webp", "img/icons/paralytic-4cf0243b.webp", "img/icons/pelagia-13903b6b.webp", "img/icons/pentecost-93cdb98d.webp", "img/icons/peter_paul-610ce4c8.webp", "img/icons/philip-fed50533.webp", "img/icons/poemen-35368fc7.webp", "img/icons/polycarp-7c0cde35.webp", "img/icons/samaritan_woman-fab0aa12.webp", "img/icons/samuel-cd799bf8.webp", "img/icons/sergius_bacchus-fe72ca50.webp", "img/icons/seven_sleepers-a20ad1e1.webp", "img/icons/simeon_stylite-986d54f6.webp", "img/icons/simon-93e5bdb6.webp", "img/icons/stephen-521c0079.webp", "img/icons/supper-9a7223e8.webp", "img/icons/temptation-a7b2ec56.webp", "img/icons/thecla-f23ba4d2.webp", "img/icons/theodore_strat-a8706a6b.webp", "img/icons/thomas-5057f8c0.webp", "img/icons/thomas_ap-d373265c.webp", "img/icons/timothy-b2578300.webp", "img/icons/transfiguration-aa0ddb73.webp", "img/icons/withered-accaa03e.webp"];
/* ---- auto-update core (shared by all three apps; generated by mksw — do not edit sw.js by hand) ----
   - A new deploy changes this file (CACHE/HASHES), so the browser installs the new worker on its next check.
   - install: precache every file, re-using unchanged files from the previous version's cache (per-file hash),
     fetching changed ones straight from the network (bypassing the HTTP cache) and verifying their hash;
     then skipWaiting() so the new version takes over at once.
   - activate: delete old version caches, clients.claim(); the page reloads itself on 'controllerchange'.
   - fetch: the page, app.js, app.css, manifest -> network first (3.5 s), cached copy when offline;
     version.json -> network only (no-store); data/fonts/icons -> cache first (versioned, immutable per deploy). */
const PREFIX=CACHE.slice(0,CACHE.lastIndexOf('-')+1);
const SHELL=new Set(['./','index.html','app.js','app.css','manifest.webmanifest']);
const scopeURL=p=>new URL(p,self.registration.scope).href;
const relOf=u=>{const s=self.registration.scope; return u.startsWith(s)?(u.slice(s.length).split(/[?#]/)[0]||'./'):null};
async function sha10(buf){const d=await crypto.subtle.digest('SHA-256',buf);return [...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,10)}
async function oldEntry(p,want){
  for(const k of await caches.keys()){
    if(k===CACHE||!k.startsWith(PREFIX)) continue;
    const c=await caches.open(k), m=await c.match(scopeURL('__hashes__'));
    if(!m) continue; let h; try{h=await m.json()}catch(e){continue}
    if(h[p]===want){const r=await c.match(scopeURL(p)); if(r) return r}
  }
  return null;
}
async function precache(){
  const c=await caches.open(CACHE);
  let have={}; try{const m=await c.match(scopeURL('__hashes__')); if(m) have=await m.json()}catch(e){}
  const todo=Object.keys(HASHES); let i=0;
  async function one(){
    while(i<todo.length){
      const p=todo[i++], want=HASHES[p];
      if(have[p]===want&&await c.match(scopeURL(p))) continue;
      let r=await oldEntry(p,want);
      if(!r){
        let ok=false;
        for(let a=0;a<3&&!ok;a++){
          if(a) await new Promise(res=>setTimeout(res,1500*a));
          r=await fetch(new Request(scopeURL(p),{cache:'reload'}));
          if(!r.ok) throw new Error('precache '+p+' '+r.status);
          const b=await r.clone().arrayBuffer(); ok=(await sha10(b))===want;   // the CDN may still be rolling out the deploy
        }
        if(!ok) throw new Error('precache '+p+': content does not match this version yet');
      }
      await c.put(scopeURL(p),r);
    }
  }
  await Promise.all([one(),one(),one(),one()]);
  await c.put(scopeURL('__hashes__'),new Response(JSON.stringify(HASHES),{headers:{'Content-Type':'application/json'}}));
}
let warming=null;
function warm(){
  if(warming) return warming;
  warming=caches.open(ICONS).then(async c=>{
    const want=new Set(IMGS.map(u=>scopeURL(u)));
    for(const req of await c.keys()) if(!want.has(req.url)) await c.delete(req);
    for(const u of IMGS){ if(!(await c.match(scopeURL(u)))){ try{ const r=await fetch(u); if(r.ok) await c.put(scopeURL(u),r) }catch(e){ break } } }
  }).finally(()=>{warming=null});
  return warming;
}
self.addEventListener('install',e=>{e.waitUntil(precache().then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(PREFIX)&&k!==CACHE&&k!==ICONS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{
  if(e.data==='warm-icons') e.waitUntil(warm());
  else if(e.data==='skip-waiting') self.skipWaiting();
  else if(e.data==='version'&&e.ports&&e.ports[0]) e.ports[0].postMessage(CACHE);
});
const BLANK='<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
function fromCache(r,rel){return caches.open(CACHE).then(c=>c.match(r,{ignoreSearch:true}).then(m=>m||(rel?c.match(scopeURL(rel)):null)))}
function networkFirst(r,rel){
  return new Promise(resolve=>{
    let done=false; const fall=()=>fromCache(r,rel).then(m=>{ if(m&&!done){done=true;resolve(m)} return m });
    const t=setTimeout(fall,3500);
    fetch(r.mode==='navigate'?scopeURL(rel):r.url,{cache:'no-cache',credentials:'same-origin'}).then(res=>{
      clearTimeout(t);
      if(res.ok){ if(!done){done=true;resolve(res)} }
      else fall().then(m=>{ if(!done){done=true;resolve(m||res)} });
    }).catch(()=>{ clearTimeout(t); fall().then(m=>{ if(!done){done=true;resolve(m||Response.error())} }) });
  });
}
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  let rel=relOf(r.url); if(rel===null) return;
  if(r.mode==='navigate') rel='index.html';
  if(rel==='version.json'){ e.respondWith(fetch(r.url,{cache:'no-store'}).catch(()=>new Response('{}',{headers:{'Content-Type':'application/json'}}))); return }
  if(rel==='sw.js') return;
  if(SHELL.has(rel)){ e.respondWith(networkFirst(r,rel==='./'?'index.html':rel)); return }
  const isImg=rel.startsWith('img/icons/');
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok&&isImg){const cp=res.clone();caches.open(ICONS).then(c=>c.put(r,cp))} return res;
  }).catch(()=>r.mode==='navigate'?fromCache(r,'index.html'):isImg?new Response(BLANK,{headers:{'Content-Type':'image/svg+xml'}}):Response.error())));
});
