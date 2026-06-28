// ----------------------------------------------------------------------------
// main.js — wires content into the desk, opens/closes the reading sheet,
// runs the CRT, the lamp, the tidy + sound toggles, and the mobile fallback.
// ----------------------------------------------------------------------------

import {
  IDENTITY, ABOUT, BUILDS, RESEARCH, AWARDS, TERMINAL, SKILLS, EDUCATION, CONTACT,
} from "./content.js";
import { initParallax, initDrag, tidyDesk, initDust, initLamp, boot } from "./engine.js";
import { sfx, setEnabled, isEnabled } from "./audio.js";

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const paras = (s) => s.split("\n\n").map((p) => `<p>${esc(p)}</p>`).join("");
const matOf = (el) => (el && el.dataset && el.dataset.material) || "default";

// --------------------------------------------------------------- sheet content
function renderAbout() {
  return `
    <span class="s-kicker">from the desk of</span>
    <h2 class="s-title">${esc(ABOUT.heading)}</h2>
    <div class="s-meta">${esc(ABOUT.subhead)}</div>
    <p class="s-lede">${esc(ABOUT.lede)}</p>
    <div class="s-chiprow">
      ${ABOUT.stats.map((s) => `<span class="s-chip"><b>${esc(s.k)}</b> &nbsp;${esc(s.v)}</span>`).join("")}
    </div>
    <div class="s-sign">${esc(ABOUT.signature)}</div>
  `;
}

function renderBuild(id) {
  const b = BUILDS.find((x) => x.id === id);
  if (!b) return "";
  const link = b.link && b.link.href
    ? `<a class="s-link" href="${b.link.href}" target="_blank" rel="noopener">${esc(b.link.label)}</a>`
    : b.link ? `<span class="s-link" style="border:0;color:#6a5634">${esc(b.link.label)}</span>` : "";
  return `
    ${b.flag ? `<span class="s-flag">${esc(b.flag)}</span><br>` : ""}
    <span class="s-kicker">${esc(b.role)} · ${esc(b.tag)}</span>
    <h2 class="s-title">${esc(b.name)}</h2>
    <div class="s-meta">${esc(b.when)}</div>
    <p class="s-lede">${esc(b.headline)}</p>
    <div class="s-body">${paras(b.body)}</div>
    <div class="s-chiprow">${b.stack.map((s) => `<span class="s-chip">${esc(s)}</span>`).join("")}</div>
    ${link}
  `;
}

function renderResearch() {
  return `
    <span class="s-kicker">the rolodex</span>
    <h2 class="s-title">Research</h2>
    <div class="s-meta">four universities · economics, law &amp; finance</div>
    ${RESEARCH.map((r) => `
      <div class="rc">
        <span class="rc-when">${esc(r.when)}</span>
        <div class="rc-inst">${esc(r.inst)}</div>
        <div class="rc-role">${esc(r.role)}${r.pi ? " — " + esc(r.pi) : ""}</div>
        <div class="rc-pi">${esc(r.dept)}</div>
        <div class="rc-body">${esc(r.body)}</div>
      </div>`).join("")}
  `;
}

function renderAwards() {
  return `
    <span class="s-kicker">the trophy shelf</span>
    <h2 class="s-title">Awards &amp; Certifications</h2>
    <div class="s-meta">tap a place to stamp it</div>
    ${AWARDS.map((a) => {
      const cls = a.kind === "gold" ? "gold" : a.kind === "silver" ? "silver" : "";
      return `
      <div class="aw-row" data-stamp>
        <span class="aw-place ${cls}">${esc(a.place)}</span>
        <span class="aw-title">${esc(a.title)}
          ${a.detail ? `<span class="aw-detail"><br>${esc(a.detail)}</span>` : ""}</span>
        <span class="aw-year">${esc(a.year)}</span>
      </div>`;
    }).join("")}
  `;
}

function renderContact() {
  const links = CONTACT.links.map((l) =>
    `<div class="ct-row"><b>${esc(l.label)}</b><a class="s-link" href="${l.href}" target="_blank" rel="noopener">${esc(l.sub)}</a></div>`).join("");
  return `
    <span class="s-kicker">the card tray</span>
    <h2 class="s-title">Get in touch</h2>
    <div class="ct-row"><b>Email</b><a class="s-link" href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a></div>
    <div class="ct-row"><b>Phone</b><a class="s-link" href="tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}">${esc(CONTACT.phone)}</a></div>
    ${links}
    <div class="ct-row"><b>Where</b>${esc(CONTACT.location)}</div>
  `;
}

function renderSkills() {
  return `
    <span class="s-kicker">the index card</span>
    <h2 class="s-title">Toolbox</h2>
    ${Object.entries(SKILLS).map(([k, v]) => `
      <div class="sk-group">
        <div class="sk-h">${esc(k)}</div>
        <div class="s-chiprow">${v.map((s) => `<span class="s-chip">${esc(s)}</span>`).join("")}</div>
      </div>`).join("")}
  `;
}

function renderEducation() {
  return `
    <span class="s-kicker">the framed diploma</span>
    <h2 class="s-title">Education</h2>
    ${EDUCATION.map((e) => `
      <div class="rc">
        <span class="rc-when">${esc(e.when)}</span>
        <div class="rc-inst">${esc(e.inst)}</div>
        <div class="rc-role">${esc(e.detail)} · ${esc(e.where)}</div>
        ${e.extra ? `<div class="rc-body">${esc(e.extra)}</div>` : ""}
        ${e.activities && e.activities.length ? `
          <div class="edu-sub">Clubs &amp; Activities</div>
          <ul class="edu-list">${e.activities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
      </div>`).join("")}
  `;
}

function render(key) {
  if (key === "about") return renderAbout();
  if (key === "research") return renderResearch();
  if (key === "awards") return renderAwards();
  if (key === "contact") return renderContact();
  if (key === "skills") return renderSkills();
  if (key === "education") return renderEducation();
  if (key.startsWith("build:")) return renderBuild(key.slice(6));
  return "<p>—</p>";
}

// --------------------------------------------------------------- overlay
const overlay = $("#overlay");
const sheetBody = $("#sheetBody");
let lastMaterial = "default";

function openSheet(el) {
  const key = el.dataset.open;
  if (!key) return;
  lastMaterial = matOf(el);
  sheetBody.innerHTML = render(key);
  overlay.hidden = false;
  // force reflow so the transition runs
  void overlay.offsetWidth;
  overlay.classList.add("show");
  sfx.open(lastMaterial);
  hideHint();
  wireSheet();
}

function closeSheet() {
  if (overlay.hidden) return;
  overlay.classList.remove("show");
  sfx.close(lastMaterial);
  setTimeout(() => { overlay.hidden = true; sheetBody.innerHTML = ""; }, 420);
}

function wireSheet() {
  // award rows get a satisfying stamp on tap
  sheetBody.querySelectorAll("[data-stamp]").forEach((row) => {
    row.addEventListener("click", () => {
      if (row.classList.contains("stamped")) return;
      row.classList.add("stamped");
      const mark = document.createElement("span");
      mark.className = "stampmark";
      mark.textContent = "✶ NOTED";
      row.appendChild(mark);
      sfx.stamp();
    }, { once: true });
  });
}

$("#sheetClose").addEventListener("click", closeSheet);
$("#overlayBackdrop").addEventListener("click", closeSheet);
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

// --------------------------------------------------------------- CRT
function runTerminal() {
  // ticker: duplicate the list so the marquee loops seamlessly
  const track = $("#crtTicker");
  if (track) {
    const items = TERMINAL.ticker.map((t) => `<span>${esc(t)}</span>`).join("·");
    track.innerHTML = items + "·" + items;
  }
  // NOW: a slow typewriter cycling through current work
  const now = $("#crtNow");
  if (!now) return;
  const lines = TERMINAL.now;
  let li = 0;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  (async function loop() {
    while (true) {
      const text = lines[li % lines.length];
      now.innerHTML = "NOW &gt; <b></b>";
      const b = now.querySelector("b");
      for (let i = 0; i <= text.length; i++) { b.textContent = text.slice(0, i); await sleep(34); }
      await sleep(2600);
      for (let i = text.length; i >= 0; i--) { b.textContent = text.slice(0, i); await sleep(14); }
      await sleep(280);
      li++;
    }
  })();
}

// --------------------------------------------------------------- hint
let hintGone = false;
function hideHint() {
  if (hintGone) return;
  hintGone = true;
  const h = $("#hint");
  if (h) h.classList.add("gone");
}

// --------------------------------------------------------------- chrome
function initChrome() {
  const mute = $("#mute");
  mute.addEventListener("click", () => {
    const on = !isEnabled();
    setEnabled(on);
    mute.setAttribute("aria-pressed", String(on));   // pressed = sound on
    mute.textContent = on ? "♪ sound: on" : "♪ sound: off";
    if (on) sfx.lamp(true);
  });

  $("#tidy").addEventListener("click", () => { tidyDesk(sfx.tidy); hideHint(); });
}

// --------------------------------------------------------------- mobile
function buildMobile() {
  const root = $(".mobile-fallback");
  if (!root) return;
  const block = (h, inner) => `<div class="mf-h">${h}</div>${inner}`;
  const item = (h, when, b) =>
    `<div class="mf-item"><div class="mf-it-h">${esc(h)}${when ? `<span>${esc(when)}</span>` : ""}</div>
     <div class="mf-it-b">${b}</div></div>`;

  root.innerHTML = `
    <div class="mf-name">${esc(IDENTITY.name)}</div>
    <div class="mf-sub">${esc(IDENTITY.estLine)}</div>
    <p class="mf-lede">${esc(ABOUT.lede)}</p>
    ${block("Built", BUILDS.map((b) =>
      item(b.name, b.when,
        `${esc(b.headline)} ${esc(b.body)} ${b.link && b.link.href
          ? `<br><a href="${b.link.href}" target="_blank" rel="noopener">${esc(b.link.label)}</a>` : ""}`)).join(""))}
    ${block("Research", RESEARCH.map((r) =>
      item(r.inst, r.when, `<em>${esc(r.role)}${r.pi ? " — " + esc(r.pi) : ""}</em> — ${esc(r.body)}`)).join(""))}
    ${block("Awards & Certifications", AWARDS.map((a) =>
      item(`${a.place} — ${a.title}`, a.year, esc(a.detail))).join(""))}
    ${block("Education", EDUCATION.map((e) =>
      item(e.inst, e.when, `${esc(e.detail)} · ${esc(e.where)}`
        + (e.extra ? `<br>${esc(e.extra)}` : "")
        + (e.activities && e.activities.length ? `<br>${e.activities.map(esc).join(" · ")}` : ""))).join(""))}
    ${block("Toolbox", Object.entries(SKILLS).map(([k, v]) =>
      item(k, "", esc(v.join(" · ")))).join(""))}
    ${block("Contact",
      `<div class="mf-it-b">
        <a href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a> · ${esc(CONTACT.phone)}<br>
        ${CONTACT.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join(" · ")}
        <br>${esc(CONTACT.location)}
      </div>`)}
  `;
}

// --------------------------------------------------------------- go
initParallax();
initDrag({
  onOpen: openSheet,
  hooks: { pick: (el) => sfx.pick(matOf(el)), drop: (el) => sfx.drop(matOf(el)) },
});
initDust();
initLamp((night) => { sfx.lamp(night); hideHint(); });
runTerminal();
initChrome();
buildMobile();
boot();

// drop the hint after a while even if untouched
setTimeout(hideHint, 9000);
