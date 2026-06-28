// ----------------------------------------------------------------------------
// content.js — single source of truth for everything on the desk.
// Sourced from Ethan's YC application (work / builds / story) and resume
// (education, certifications, skills). Edit here to change the site.
// ----------------------------------------------------------------------------

export const IDENTITY = {
  name: "Ethan Xie",
  first: "Ethan",
  last: "Xie",
  estLine: "EST. 2009 · WILMINGTON, DE",
};

// The leather portfolio — left page is the short "who", right page is the
// money story (kept close to Ethan's own wording from the YC app).
export const ABOUT = {
  heading: "Ethan Xie",
  subhead: "16 · Wilmington, Delaware",
  lede:
    "I'm a high-school sophomore who builds software that feels physical and " +
    "runs economics research that ends up in journals. I'd rather make the " +
    "thing than talk about making the thing.",
  stats: [
    { k: "Born", v: "Sept 3, 2009" },
    { k: "School", v: "Charter School of Wilmington · 4.0 GPA" },
    { k: "Citizen", v: "United States" },
  ],
  // The headline story — featured because it's the best thing he wrote.
  storyTitle: "How I hacked my way into the labs that said no",
  story:
    "The system I hacked was getting real university research positions as a " +
    "freshman in high school. Plenty of people — including my professor father " +
    "at the University of Delaware — said it was impossible. He even forbade me " +
    "from emailing professors in his department, certain I'd embarrass us both.\n\n" +
    "So I cold-emailed over 900 professors. A zealous voice, a resume tailored " +
    "to each one. After the first internship said yes, the snowball started and " +
    "didn't stop. This fall I'm submitting one of my papers, as first author, to " +
    "the Journal of Macroeconomics.",
  signature: "Ethan",
  affiliations: [
    "Delaware Entrepreneurship League — Competitor '26 & Product Team '26–'27",
    "CSW Investment Club — Co-President '25–'29",
    "CSW Economics Club — Co-President '26–'29",
  ],
};

// Manila folders — the things he's built (YC app: "things you've built").
export const BUILDS = [
  {
    id: "moldr",
    name: "Moldr",
    role: "Co-Founder",
    when: "May 2026 — Present",
    tag: "Gesture + voice CAD",
    headline: "CAD that works like Iron Man's Jarvis.",
    body:
      "Shape 3D models with your hands and voice instead of a mouse. Pinch to " +
      "pull geometry out of nothing; speak to refine it. I wanted modeling to " +
      "feel like you were actually building the object in the air in front of you.",
    stack: ["MediaPipe hand-tracking", "Three.js", "WebGL", "Web Speech"],
    link: { label: "molda.vercel.app", href: "https://molda.vercel.app/" },
    flag: "Most impressive thing I've built",
  },
  {
    id: "respondify",
    name: "Respondify",
    role: "Co-Founder",
    when: "Jan 2026 — May 2026",
    tag: "Encrypted emergency network",
    headline: "Turning neighbors into responders.",
    body:
      "A real-time emergency-response network. Anonymous SOS reports route to " +
      "nearby trained responders by skill and location; both sides coordinate " +
      "over end-to-end encrypted chat and WebRTC voice. Pitched it at the " +
      "Delaware Entrepreneurship League and took 2nd.",
    stack: ["React", "TypeScript", "Supabase (Postgres · RLS · Realtime)", "WebRTC", "Web Crypto API"],
    link: { label: "respondify0.vercel.app", href: "https://respondify0.vercel.app/" },
    flag: null,
  },
  {
    id: "headhaven",
    name: "HeadHaven",
    role: "Technical Lead · NSF I-Corps PropelUs",
    when: "Oct 2025 — Jan 2026",
    tag: "Wearable that catches falls",
    headline: "A wearable that fires an airbag before you hit the ground.",
    body:
      "Fall-protection for seniors. A real-time ML classifier reads " +
      "accelerometer + gyroscope sensor fusion and deploys a concealed airbag " +
      "to cushion hip and torso impact. Adaptive models learn each person's " +
      "movement to cut false positives.",
    stack: ["Python", "TensorFlow / PyTorch", "IMU sensor fusion", "Embedded firmware"],
    link: { label: "$1,500 NSF grant", href: null },
    flag: "Backed by the National Science Foundation",
  },
];

// Rolodex — research positions.
export const RESEARCH = [
  {
    inst: "University of Chicago",
    dept: "Kenneth C. Griffin Dept. of Economics",
    role: "Economics Research Assistant",
    when: "Mar 2026 — Present",
    pi: "under Nobel laureate Dr. James Heckman",
    body:
      "Built a Python + D3.js pipeline that quantifies and visualizes U.S. K-12 " +
      "testing costs — integrating public procurement and state-checkbook APIs " +
      "and parsing 300K+ row spending exports with pandas.",
  },
  {
    inst: "University of Chicago",
    dept: "Kenneth C. Griffin Dept. of Economics",
    role: "Econometrics Research Assistant",
    when: "Feb 2026 — Present",
    pi: "for Prof. Alexander Torgovitsky",
    body:
      "A reproducible R/tidyverse pipeline replicating Abraham & Kearney (2020, " +
      "JEL) over administrative microdata in Parquet — validated against 1,500+ " +
      "published values. Now extending it to IV estimation: replicating Acemoglu " +
      "et al. (2008) and benchmarking Anderson-Hsiao, Arellano-Bond, and " +
      "Blundell-Bond estimators.",
  },
  {
    inst: "University of Michigan",
    dept: "Future of Programming Lab",
    role: "Lab Member",
    when: "Jun 2026 — Present",
    pi: "",
    body:
      "Contributing to Hazel — a live functional programming environment that " +
      "typechecks, manipulates, and runs incomplete programs. Building a " +
      "string/list primitive end-to-end across the menhir parser, the " +
      "bidirectional typechecker, and the evaluator (OCaml / ReasonML).",
  },
  {
    inst: "University of South Dakota",
    dept: "Economics",
    role: "Researcher (first author)",
    when: "Feb 2026 — Present",
    pi: "",
    body:
      "First-authoring a working paper on bank credit and post-COVID inflation. " +
      "Built a quarterly FRED/BEA macro dataset and ran VAR/VECM and " +
      "time-varying-coefficient models.",
  },
  {
    inst: "Northwestern University",
    dept: "Kellogg School of Mgmt. & Pritzker School of Law",
    role: "Research Assistant",
    when: "Apr 2026 — Present",
    pi: "for Prof. Bernard Black",
    body:
      "Empirical legal research on guardianship litigation. Built a Python " +
      "(Beautiful Soup) scraper that extracts structured case data from probate " +
      "court records, and merged multi-year dockets into analysis-ready datasets.",
  },
];

// Medals / ribbons / seals — awards & certifications. `kind` picks the object.
export const AWARDS = [
  { kind: "gold",   title: "Delaware Personal Finance Challenge", place: "1st Place", detail: "#1 of 50 teams · $2,500", year: "2026" },
  { kind: "silver", title: "National Personal Finance Challenge", place: "2nd Place", detail: "#2 of 7,000+ teams · $5,000", year: "2026" },
  { kind: "silver", title: "Delaware Entrepreneurship League (Launch)", place: "2nd Place", detail: "#2 of 20+ teams · pitched Respondify · $500", year: "2026" },
  { kind: "seal",   title: "NSF I-Corps PropelUs", place: "$1,500 Grant", detail: "for HeadHaven", year: "2025" },
  { kind: "silver", title: "BPA Financial Portfolio Management (V09)", place: "2nd Place", detail: "#2 of 200+ teams, international", year: "2025" },
  { kind: "gold",   title: "TSA Website Design", place: "1st Place", detail: "#1 of 30+ teams", year: "2025" },
  { kind: "gold",   title: "TSA Coding", place: "1st Place", detail: "#1 of 50+ teams", year: "2025" },
  { kind: "cert",   title: "Bloomberg Market Concepts", place: "Certified", detail: "Bloomberg Terminal proficiency", year: "2025" },
  { kind: "cert",   title: "ISEE", place: "99th percentile", detail: "(school offers no PSAT/SAT/ACT for my grade)", year: "" },
];

// The CRT ticker tape + "NOW" readout.
export const TERMINAL = {
  now: [
    "replicating Acemoglu (2008) IV estimators in R",
    "shipping Moldr — gesture + voice CAD",
    "submitting a first-author macro paper to J. Macroeconomics",
  ],
  ticker: [
    "1ST — DE PERSONAL FINANCE CHALLENGE",
    "2ND / 7000+ — NATIONAL PERSONAL FINANCE CHALLENGE",
    "$1,500 — NSF I-CORPS GRANT",
    "2ND — DE ENTREPRENEURSHIP LEAGUE",
    "1ST — TSA WEBSITE DESIGN",
    "1ST — TSA CODING",
    "2ND / 200+ — BPA FINANCIAL PORTFOLIO MGMT",
    "99TH %ILE — ISEE",
    "BMC — BLOOMBERG CERTIFIED",
  ],
};

// Pegboard / index card — skills.
export const SKILLS = {
  Languages: ["Python", "R", "SQL", "OCaml / ReasonML", "JavaScript / TypeScript", "LaTeX"],
  "Frameworks & Libraries": ["React", "Next.js", "Three.js", "MediaPipe", "TensorFlow", "PyTorch", "Pandas", "NumPy", "D3.js", "Tidyverse", "menhir", "Beautiful Soup"],
  "Tools & Data": ["Bloomberg Terminal", "Stata", "Parquet", "Supabase", "Excel"],
};

// Framed diploma — education.
export const EDUCATION = [
  {
    inst: "Charter School of Wilmington",
    where: "Wilmington, DE",
    detail: "High School · GPA 4.0 / 4.0",
    when: "Aug 2025 — Jun 2029",
    extra: "Student Government · Investment Club (Co-Pres) · Economics Club (Co-Pres) · Mock Trial · Math League · Orchestra (Concertmaster) · Media Team (Co-Founder) · Varsity Lacrosse",
  },
  {
    inst: "University of Delaware",
    where: "Newark, DE",
    detail: "Non-degree coursework",
    when: "Jun 2025 — Jul 2026",
    extra: "Finance 200 (FINC200) — 97% · Microeconomics 101 (ECON101) — in progress",
  },
];

// Business-card tray — contact.
export const CONTACT = {
  email: "ethanxie@udel.edu",
  phone: "(302) 666-2925",
  links: [
    { label: "LinkedIn", sub: "in/ethanxie1", href: "https://linkedin.com/in/ethanxie1" },
    { label: "GitHub", sub: "opxie1", href: "https://github.com/opxie1" },
  ],
  location: "Wilmington, Delaware",
};
