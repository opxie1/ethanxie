// ----------------------------------------------------------------------------
// audio.js — tactile sound, synthesized on the fly (no asset files).
// Every object has a MATERIAL, and pick / drop / open / close sound different
// per material, with a touch of pitch + level jitter so no two are identical:
//   leather   → soft creak            (the portfolio)
//   paper     → rustle / flap         (folders, cards)
//   card      → riffle of index cards (the rolodex)
//   metal     → clink + ring          (the medals)
//   electronic→ power-on chirp + hum  (the CRT terminal)
//   glass     → a clean ting          (the framed diploma)
// Plus: lamp chain, award stamp, and a desk "tidy" shuffle.
// Muted by default; main.js flips `enabled` via the ♪ toggle.
// ----------------------------------------------------------------------------

let ctx = null;
let master = null;
let NOISE = null;
let enabled = false;

function ensure() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      // a couple of seconds of soft (low-passed) white noise, reused everywhere
      const n = ctx.sampleRate * 2;
      NOISE = ctx.createBuffer(1, n, ctx.sampleRate);
      const d = NOISE.getChannelData(0);
      let last = 0;
      for (let i = 0; i < n; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + 0.025 * w) / 1.025;
        d[i] = last * 3.2;
      }
    } catch (_) { ctx = null; }
  }
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setEnabled(on) { enabled = on; if (on) ensure(); }
export function isEnabled() { return enabled; }

const rand = (a, b) => a + Math.random() * (b - a);
const jit = () => Math.pow(2, rand(-0.045, 0.045)); // ±~55 cents

// a pitched body (clicks, thuds, rings)
function blip({ type = "sine", f = 440, to = null, dur = 0.12, peak = 0.16, delay = 0 }) {
  if (!enabled) return; const ac = ensure(); if (!ac) return;
  const t = ac.currentTime + delay;
  const o = ac.createOscillator(); o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.03);
}

// a band of filtered noise (rustles, creaks, clicks)
function hit({ ftype = "bandpass", f = 1000, q = 1, to = null, dur = 0.15, peak = 0.12, delay = 0 }) {
  if (!enabled) return; const ac = ensure(); if (!ac) return;
  const t = ac.currentTime + delay;
  const s = ac.createBufferSource(); s.buffer = NOISE;
  s.playbackRate.value = rand(0.85, 1.15);
  const filt = ac.createBiquadFilter(); filt.type = ftype;
  filt.frequency.setValueAtTime(f, t); filt.Q.value = q;
  if (to) filt.frequency.exponentialRampToValueAtTime(Math.max(80, to), t + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(filt).connect(g).connect(master); s.start(t); s.stop(t + dur + 0.05);
}

export const sfx = {
  pick(material) {
    const j = jit();
    switch (material) {
      case "leather":    hit({ ftype: "lowpass",  f: 380 * j, dur: 0.07, peak: 0.05 }); break;
      case "paper":      hit({ ftype: "highpass", f: 2600 * j, dur: 0.05, peak: 0.05 }); break;
      case "card":       hit({ ftype: "bandpass", f: 2200 * j, q: 0.8, dur: 0.04, peak: 0.06 }); break;
      case "metal":      blip({ type: "triangle", f: 1500 * j, to: 1100, dur: 0.05, peak: 0.05 });
                         hit({ ftype: "highpass", f: 4200, dur: 0.03, peak: 0.03 }); break;
      case "electronic": blip({ type: "square", f: 880 * j, dur: 0.03, peak: 0.04 }); break;
      case "glass":      blip({ type: "sine", f: 2050 * j, to: 1650, dur: 0.06, peak: 0.04 }); break;
      default:           blip({ type: "triangle", f: 520 * j, to: 380, dur: 0.05, peak: 0.05 });
    }
  },
  drop(material) {
    const j = jit();
    switch (material) {
      case "leather":    blip({ type: "sine", f: 150 * j, to: 58, dur: 0.14, peak: 0.12 });
                         hit({ ftype: "lowpass", f: 420, dur: 0.08, peak: 0.05 }); break;
      case "paper":      hit({ ftype: "bandpass", f: 950 * j, q: 0.6, to: 300, dur: 0.1, peak: 0.09 }); break;
      case "card":       hit({ ftype: "bandpass", f: 1500 * j, dur: 0.06, peak: 0.07 });
                         blip({ type: "sine", f: 200, to: 120, dur: 0.06, peak: 0.05 }); break;
      case "metal":      blip({ type: "triangle", f: 900 * j, to: 280, dur: 0.12, peak: 0.08 });
                         blip({ type: "sine", f: 2400 * j, to: 1900, dur: 0.2, peak: 0.03, delay: 0.006 }); break;
      case "electronic": blip({ type: "sine", f: 180 * j, to: 78, dur: 0.1, peak: 0.08 }); break;
      case "glass":      blip({ type: "sine", f: 1850 * j, to: 1450, dur: 0.22, peak: 0.05 }); break;
      default:           blip({ type: "sine", f: 160 * j, to: 60, dur: 0.13, peak: 0.1 });
                         hit({ ftype: "lowpass", f: 520, dur: 0.07, peak: 0.05 });
    }
  },
  open(material) {
    const j = jit();
    switch (material) {
      case "leather":    hit({ ftype: "bandpass", f: 300 * j, q: 3, to: 620, dur: 0.34, peak: 0.08 });
                         blip({ type: "sine", f: 92, to: 72, dur: 0.3, peak: 0.05 }); break;
      case "paper":      hit({ ftype: "highpass", f: 1800 * j, to: 3300, dur: 0.28, peak: 0.1 }); break;
      case "card":       for (let i = 0; i < 6; i++)
                           hit({ ftype: "bandpass", f: 1700 + Math.random() * 1300, q: 1.6,
                                 dur: 0.03, peak: 0.05, delay: i * 0.045 }); break;
      case "metal":      blip({ type: "sine", f: 1320 * j, dur: 0.5, peak: 0.06 });
                         blip({ type: "sine", f: 1980 * j, dur: 0.5, peak: 0.03 }); break;
      case "electronic": blip({ type: "square", f: 200 * j, to: 1240, dur: 0.18, peak: 0.05 });
                         blip({ type: "sawtooth", f: 120, dur: 0.45, peak: 0.02, delay: 0.05 }); break;
      case "glass":      blip({ type: "sine", f: 2200 * j, dur: 0.45, peak: 0.05 });
                         blip({ type: "sine", f: 3300 * j, dur: 0.3, peak: 0.02 }); break;
      default:           hit({ ftype: "bandpass", f: 1200 * j, to: 2000, dur: 0.26, peak: 0.09 });
    }
  },
  close(material) {
    if (material === "electronic") { blip({ type: "square", f: 900, to: 120, dur: 0.16, peak: 0.05 }); return; }
    if (material === "leather")    { hit({ ftype: "lowpass", f: 600, to: 220, dur: 0.22, peak: 0.06 });
                                     blip({ type: "sine", f: 84, dur: 0.12, peak: 0.05 }); return; }
    hit({ ftype: "lowpass", f: 1700, to: 520, dur: 0.2, peak: 0.07 });
  },
  lamp(on) {
    blip({ type: "square", f: 1700, to: 700, dur: 0.03, peak: 0.09 });   // the chain click
    if (on) blip({ type: "sine", f: 120, dur: 0.55, peak: 0.04, delay: 0.02 }); // filament hum coming up
    else    hit({ ftype: "lowpass", f: 320, to: 130, dur: 0.18, peak: 0.03 });  // dull thunk off
  },
  stamp() {
    blip({ type: "sine", f: 130 * jit(), to: 48, dur: 0.1, peak: 0.17 });
    hit({ ftype: "bandpass", f: 2400, q: 1.4, dur: 0.05, peak: 0.07 });
  },
  tidy() {
    for (let i = 0; i < 5; i++)
      hit({ ftype: "bandpass", f: 700 + Math.random() * 1500, q: 0.8, dur: 0.06, peak: 0.05, delay: i * 0.06 });
    blip({ type: "sine", f: 165, to: 80, dur: 0.12, peak: 0.06, delay: 0.32 });
  },
};
