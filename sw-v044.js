const BUILD='0344';
const C='levabota-v038-ui344';
const CORE=['./manifest-v038.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./levabota-brand.png','./splash-levabota.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(async x=>{try{const r=await fetch(x+'?v='+BUILD,{cache:'reload'});if(r.ok)await c.put(x,r)}catch(_){}}))))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k.startsWith('levabota-')&&k!==C).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(async r=>{if(r.ok){const c=await caches.open(C);await c.put('./index.html',r.clone())}return r}).catch(()=>caches.match('./index.html')));return}if(u.origin===self.location.origin)e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));});
