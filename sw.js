/* Aube — service worker d'alarmes (portée racine) */
const C = "aube-root-v3";

self.addEventListener("install", (e) => {
  e.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = e.notification.data?.url || "/";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ("focus" in c) {
          c.postMessage({ type: "aube-alarm", payload: e.notification.data || {} });
          return c.focus();
        }
      }
      return self.clients.openWindow(url);
    }),
  );
});

self.addEventListener("message", (e) => {
  const d = e.data || {};
  if (d.type === "aube-schedule") {
    e.waitUntil(scheduleAlarms(d.alarms || []));
  }
  if (d.type === "aube-ping") {
    e.waitUntil(checkDue(d.now || Date.now(), d.alarms || []));
  }
});

self.addEventListener("periodicsync", (e) => {
  if (e.tag === "aube-alarms") e.waitUntil(checkStored());
});

async function storeAlarms(alarms) {
  const cache = await caches.open(C);
  await cache.put(
    "/__aube-alarms.json",
    new Response(JSON.stringify({ alarms, saved: Date.now() }), {
      headers: { "Content-Type": "application/json" },
    }),
  );
}

async function loadAlarms() {
  try {
    const cache = await caches.open(C);
    const res = await cache.match("/__aube-alarms.json");
    if (!res) return [];
    const j = await res.json();
    return Array.isArray(j.alarms) ? j.alarms : [];
  } catch {
    return [];
  }
}

async function scheduleAlarms(alarms) {
  await storeAlarms(alarms);
  const regs = await self.registration.getNotifications();
  await Promise.all(
    regs
      .filter((n) => String(n.tag || "").startsWith("aube-at-"))
      .map((n) => n.close()),
  );
  const Trigger = self.TimestampTrigger;
  if (!Trigger || typeof Notification === "undefined" || !("showTrigger" in Notification.prototype)) {
    return;
  }
  const now = Date.now();
  for (const a of alarms.slice(0, 16)) {
    if (!a || !a.when || a.when <= now) continue;
    try {
      await self.registration.showNotification("Aube · " + (a.name || "Rappel"), {
        tag: "aube-at-" + a.id + "-" + a.when,
        body: (a.time || "") + " · " + (a.dur || "") + " min",
        icon: "/aube/icon-192.png",
        badge: "/aube/icon-192.png",
        data: { url: "/", id: a.id, when: a.when },
        requireInteraction: true,
        renotify: true,
        showTrigger: new Trigger(a.when),
      });
    } catch {
      /* TimestampTrigger indisponible */
    }
  }
}

async function checkDue(now, alarms) {
  const list = alarms.length ? alarms : await loadAlarms();
  const due = list.filter((a) => a && a.when && now >= a.when && now - a.when < 120000);
  for (const a of due) {
    try {
      await self.registration.showNotification("Aube · " + (a.name || "Rappel"), {
        tag: "aube-due-" + a.id,
        body: (a.time || "") + " · touche pour ouvrir",
        icon: "/aube/icon-192.png",
        badge: "/aube/icon-192.png",
        data: { url: "/", id: a.id, when: a.when },
        requireInteraction: true,
        renotify: true,
        vibrate: [900, 250, 900, 250, 900],
      });
    } catch {
      /* ignore */
    }
  }
}

async function checkStored() {
  await checkDue(Date.now(), await loadAlarms());
}
