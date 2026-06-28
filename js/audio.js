// ----------------------------------------------------------------------------
// audio.js — tactile sound, synthesized on the fly (no asset files).
//   pick  : a soft wooden tick as you lift something
//   drop  : a low felt thud as it lands
//   open  : a paper rustle (filtered noise swell)
//   close : the rustle, reversed-ish
//   lamp  : a hard plastic click
//   stamp : a rubber-stamp thud + ink press
// Muted by default; main.js flips `enabled` via the ♪ toggle.
// ----------------------------------------------------------------------------

let ctx = null;
let enabled = false;

function ensure() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (_) { ctx = null; }
  }
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setEnabled(on) {
  enabled = on;
  if (on) ensure();
}
export function isEnabled() { return enabled; }

// short burst of pink-ish noise through a bandpass — our "paper / felt" base
function noiseBurst({ dur = 0.18, freq = 1200, q = 0.8, gain = 0.18, sweep = 0 }) {
  if (!enabled) return;
  const ac = ensure(); if (!ac) return;
  const n = Math.floor(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, n, ac.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < n; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;       // gentle low-pass → softer grain
    d[i] = last * 3.5;
  }
  const src = ac.createBufferSource(); src.buffer = buf;
  const bp = ac.createBiquadFilter(); bp.type = "bandpass";
  bp.frequency.value = freq; bp.Q.value = q;
  if (sweep) {
    bp.frequency.setValueAtTime(freq, ac.currentTime);
    bp.frequency.exponentialRampToValueAtTime(Math.max(120, freq + sweep), ac.currentTime + dur);
  }
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, ac.currentTime + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  src.connect(bp).connect(g).connect(ac.destination);
  src.start();
}

// quick pitched body for clicks / thuds
function tone({ f1 = 200, f2 = 80, dur = 0.12, gain = 0.16, type = "sine" }) {
  if (!enabled) return;
  const ac = ensure(); if (!ac) return;
  const o = ac.createOscillator(); o.type = type;
  o.frequency.setValueAtTime(f1, ac.currentTime);
  o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), ac.currentTime + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, ac.currentTime + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  o.connect(g).connect(ac.destination);
  o.start(); o.stop(ac.currentTime + dur + 0.02);
}

export const sfx = {
  pick()  { tone({ f1: 520, f2: 360, dur: 0.05, gain: 0.05, type: "triangle" }); },
  drop()  { tone({ f1: 150, f2: 60,  dur: 0.14, gain: 0.12, type: "sine" });
            noiseBurst({ dur: 0.08, freq: 500, q: 0.6, gain: 0.06 }); },
  open()  { noiseBurst({ dur: 0.26, freq: 900, q: 0.7, gain: 0.12, sweep: 1400 }); },
  close() { noiseBurst({ dur: 0.20, freq: 1500, q: 0.7, gain: 0.10, sweep: -900 }); },
  lamp()  { tone({ f1: 1700, f2: 700, dur: 0.03, gain: 0.10, type: "square" }); },
  stamp() { tone({ f1: 120, f2: 50, dur: 0.10, gain: 0.18, type: "sine" });
            noiseBurst({ dur: 0.05, freq: 2200, q: 1.2, gain: 0.08 }); },
};
