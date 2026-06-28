// ----------------------------------------------------------------------------
// engine.js — the tactile layer.
//   • cursor-driven parallax tilt of the desk
//   • weight-aware dragging (objects lag and bank in the direction you sling them)
//   • click-vs-drag discrimination so a tap opens but a drag moves
//   • drifting dust, the day/night lamp toggle, and the boot drop-in
// No dependencies. requestAnimationFrame for everything that moves.
// ----------------------------------------------------------------------------

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// shared flag: while an object is being dragged, freeze the desk parallax so the
// 3D-tilting preserve-3d tree isn't re-composited on every pointer move.
let anyDragging = false;

// ---------------------------------------------------------------- parallax
export function initParallax() {
  const desk = document.getElementById("desk");
  if (!desk) return;
  let tx = 0, ty = 0, cur = 0, cury = 0, raf = null;

  function loop() {
    if (anyDragging) { raf = null; return; }   // hold still while dragging
    cur += (tx - cur) * 0.08;
    cury += (ty - cury) * 0.08;
    desk.style.setProperty("--tiltY", cur.toFixed(3) + "deg");
    desk.style.setProperty("--tiltX", cury.toFixed(3) + "deg");
    if (Math.abs(tx - cur) > 0.01 || Math.abs(ty - cury) > 0.01) {
      raf = requestAnimationFrame(loop);
    } else { raf = null; }
  }
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch" || anyDragging) return;
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    tx = nx * 5.5;          // gentle — depth, not seasickness
    ty = -ny * 3.5;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
}

// ---------------------------------------------------------------- dragging
// onOpen(el) is called when an object is tapped (not dragged).
// hooks: { pick, drop } are optional sound callbacks.
export function initDrag({ onOpen, hooks = {} } = {}) {
  const objs = document.querySelectorAll(".obj[data-drag]");
  let zTop = 40;

  objs.forEach((el) => {
    let dx = 0, dy = 0;          // accumulated offset from home
    let lastX = 0, lastY = 0;    // previous pointer position
    let vx = 0;                  // horizontal velocity (for banking)
    let moved = 0;               // total movement this gesture
    let dragging = false;
    let pid = null;

    el.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      pid = e.pointerId;
      dragging = true; anyDragging = true; moved = 0; vx = 0;
      lastX = e.clientX; lastY = e.clientY;
      el.classList.add("grabbing");
      el.style.setProperty("--lift", "1");   // set once on pick-up, not per frame
      el.style.zIndex = ++zTop;
      el.setPointerCapture(pid);
      hooks.pick && hooks.pick(el);
      e.preventDefault();
    });

    el.addEventListener("pointermove", (e) => {
      if (!dragging || e.pointerId !== pid) return;
      const mvx = e.clientX - lastX;
      const mvy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      dx += mvx; dy += mvy;
      moved += Math.abs(mvx) + Math.abs(mvy);
      vx = vx * 0.7 + mvx * 0.3;
      el.style.setProperty("--dx", dx + "px");
      el.style.setProperty("--dy", dy + "px");
      el.style.setProperty("--rot", clamp(vx * 0.55, -9, 9).toFixed(2) + "deg");
    });

    function release(e) {
      if (!dragging || e.pointerId !== pid) return;
      dragging = false; anyDragging = false;
      el.classList.remove("grabbing");
      el.style.removeProperty("--lift");   // let CSS ease lift back down
      el.style.setProperty("--rot", "0deg"); // banks back upright (eased by CSS)
      try { el.releasePointerCapture(pid); } catch (_) {}
      if (moved < 7) {
        // it was a tap, not a sling → open it
        onOpen && onOpen(el);
      } else {
        hooks.drop && hooks.drop(el);
        el.dataset.moved = "1";  // remember it was repositioned (for tidy)
      }
    }
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);

    // suppress the synthetic click that follows a drag; allow keyboard activation
    el.addEventListener("click", (e) => {
      if (moved >= 7) { e.preventDefault(); e.stopImmediatePropagation(); }
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen && onOpen(el); }
    });

    // store a resetter for "tidy desk"
    el._reset = () => {
      dx = 0; dy = 0;
      el.style.setProperty("--dx", "0px");
      el.style.setProperty("--dy", "0px");
      el.style.setProperty("--rot", "0deg");
      el.style.zIndex = "";
      delete el.dataset.moved;
    };
  });

  // non-draggable openers (the framed diploma) still open on click/keyboard
  document.querySelectorAll(".obj[data-open]:not([data-drag])").forEach((el) => {
    el.addEventListener("click", () => onOpen && onOpen(el));
  });
}

export function tidyDesk(hook) {
  document.querySelectorAll(".obj[data-drag]").forEach((el) => el._reset && el._reset());
  hook && hook();
}

// ---------------------------------------------------------------- dust
export function initDust(count = 34) {
  const layer = document.querySelector(".dust");
  if (!layer) return;
  // jittered grid so the field always spreads and never clumps
  for (let i = 0; i < count; i++) {
    const m = document.createElement("span");
    m.className = "mote";
    const size = 1 + Math.random() * 3;
    const base = ((i + 0.5) / count) * 100;          // even column per mote
    const jitter = (Math.random() - 0.5) * (100 / count); // ± half a cell
    m.style.left = (base + jitter).toFixed(2) + "vw";
    m.style.width = m.style.height = size.toFixed(1) + "px";
    m.style.setProperty("--mx", (Math.random() * 80 - 40).toFixed(0) + "px");
    m.style.animationDuration = (16 + Math.random() * 26).toFixed(1) + "s";
    m.style.animationDelay = (-Math.random() * 30).toFixed(1) + "s";
    layer.appendChild(m);
  }
}

// ---------------------------------------------------------------- lamp
export function initLamp(onToggle) {
  const lamp = document.getElementById("lamp");
  if (!lamp) return;
  // Touch anywhere on the lamp toggles it. The pull-chain is a <button> inside,
  // so its click (and keyboard Enter) bubbles up here too — one handler covers all.
  lamp.addEventListener("click", () => {
    const body = document.body;
    const night = body.classList.toggle("mode-night");
    body.classList.toggle("mode-day", !night);
    onToggle && onToggle(night);
  });
}

// ---------------------------------------------------------------- boot
export function boot() {
  const go = () => {
    // a beat so fonts settle, then drop the objects onto the desk
    setTimeout(() => document.body.classList.remove("is-loading"), 120);
  };
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(go);
  } else {
    window.addEventListener("load", go, { once: true });
  }
}
