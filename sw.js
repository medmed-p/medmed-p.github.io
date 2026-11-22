// Service worker ของ MedMed: ใช้เน็ตก่อนเสมอ (ได้เวอร์ชันล่าสุด) ถ้าไม่มีเน็ตค่อยเปิดหน้าที่เก็บไว้
const CACHE = "medmed-v1";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return; // ข้อมูลจาก Supabase/Google ไม่ยุ่ง
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match("/")))
  );
});
