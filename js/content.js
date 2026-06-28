// ----------------------------------------------------------------------------
// content.js — single source of truth for everything on the desk.
// Primary source: Ethan's resume (Ethan Xie.pdf). Edit here to change the site.
// ----------------------------------------------------------------------------

export const IDENTITY = {
  name: "Ethan Xie",
  first: "Ethan",
  last: "Xie",
  estLine: "WILMINGTON · DELAWARE",
};

// The leather portfolio — a short, factual "who".
export const ABOUT = {
  heading: "Ethan Xie",
  subhead: "Researcher & builder · Wilmington, Delaware",
  lede:
    "I'm a sophomore at the Charter School of Wilmington who spends most of his " +
    "time on research and building things. Right now that's four university " +
    "research assistantships — labor econometrics, empirical legal research, " +
    "immigration-court data, and event-driven finance — plus a couple of " +
    "software projects on the side.",
  stats: [
    { k: "School", v: "Charter School of Wilmington · 4.0 GPA" },
    { k: "Based in", v: "Wilmington, Delaware" },
    { k: "Citizen", v: "United States" },
  ],
  signature: "Ethan",
};

// Manila folders — projects he's built.
export const BUILDS = [
  {
    id: "moldr",
    name: "Moldr",
    role: "Co-Founder",
    when: "May 2026 — Present",
    tag: "Gesture + voice CAD",
    headline: "Computer-aided design you drive with gestures and voice.",
    body:
      "Shape 3D models with your hands and voice instead of a mouse — pinch to " +
      "pull geometry out of nothing, speak to refine it. Built on MediaPipe " +
      "hand-tracking and Three.js.",
    stack: ["MediaPipe hand-tracking", "Three.js", "WebGL", "Web Speech"],
    link: { label: "molda.vercel.app", href: "https://molda.vercel.app/" },
    flag: null,
  },
  {
    id: "respondify",
    name: "Respondify",
    role: "Co-Founder",
    when: "Jan 2026 — May 2026",
    tag: "Encrypted SOS network",
    headline: "A real-time, end-to-end-encrypted emergency-response network.",
    body:
      "Anonymous SOS reports route to nearby trained responders by skill and " +
      "location; both sides coordinate over encrypted chat and WebRTC voice. " +
      "Pitched it at the Delaware Launch Competition and took 2nd.",
    stack: ["React", "TypeScript", "Supabase (Postgres · RLS · Realtime)", "WebRTC", "Web Crypto API"],
    link: { label: "respondify0.vercel.app", href: "https://respondify0.vercel.app/" },
    flag: null,
  },
  {
    id: "headhaven",
    name: "HeadHaven",
    role: "Technical Lead · NSF I-Corps",
    when: "Oct 2025 — Jan 2026",
    tag: "Wearable that catches falls",
    headline: "A wearable that fires an airbag before a fall lands.",
    body:
      "Detects falls in real time from accelerometer + gyroscope sensor fusion " +
      "with an ML classifier, then deploys a concealed airbag to cushion hip and " +
      "torso impact. Adaptive models learn each person's movement to cut false " +
      "positives.",
    stack: ["Python", "TensorFlow / PyTorch", "IMU sensor fusion", "Machine learning"],
    link: { label: "$1,500 NSF grant", href: null },
    flag: "Backed by a $1,500 NSF grant",
  },
];

// Rolodex — research positions (resume), each with its professor.
export const RESEARCH = [
  {
    inst: "University of Chicago",
    dept: "Kenneth C. Griffin Department of Economics",
    role: "Econometrics Research Assistant",
    when: "May 2026 — Present",
    pi: "Prof. Alexander Torgovitsky",
    body:
      "PhD-level replication of \"Explaining the Decline in the US " +
      "Employment-to-Population Ratio\" (Abraham & Kearney 2020, JEL). Validated " +
      "reproduced output against 1,500 published values from the paper's tables " +
      "and figures, resolving discrepancies in age-bin construction and " +
      "decomposition centering.",
  },
  {
    inst: "Northwestern University",
    dept: "Kellogg School of Management & Pritzker School of Law",
    role: "Research Assistant",
    when: "Apr 2026 — Present",
    pi: "Prof. Bernard Black",
    body:
      "Empirical legal research analyzing guardianship court cases. Automating " +
      "extraction of case data from probate court records with Python name-search " +
      "scripts, and building a data pipeline that merges multi-year court dockets " +
      "for large-scale guardianship-litigation analysis.",
  },
  {
    inst: "University of California, Merced",
    dept: "Economics",
    role: "Economics Research Assistant",
    when: "Mar 2026 — Present",
    pi: "Prof. Amuedo-Dorantes & Prof. Polo-Muro",
    body:
      "Examining adjudication outcomes across 8M+ immigration-court proceedings " +
      "spanning 1998–2024. Constructing judge- and court-level panel datasets " +
      "covering 600+ immigration judges and 70+ courts, cleaning and merging " +
      "large-scale EOIR administrative records in Stata and Python for causal " +
      "identification on adjudication disparities.",
  },
  {
    inst: "Delaware State University",
    dept: "Finance",
    role: "Finance Research Assistant",
    when: "Jan 2026 — Present",
    pi: "Dr. Zi Ning",
    body:
      "Research on corporate finance and financial markets. Using a Bloomberg " +
      "Terminal, SQL, R, Python, and Excel to analyze event-driven equity and " +
      "credit market reactions (data from FRED and Bloomberg), currently studying " +
      "the cross-market reaction to the April 2025 \"Liberation Day\" tariff " +
      "announcement.",
  },
];

// Medals / ribbons / seals — awards & certifications (resume).
export const AWARDS = [
  { kind: "silver", title: "National Personal Finance Challenge", place: "2nd Place", detail: "#2 of 7,000+ teams, national · Council for Economic Education", year: "2026" },
  { kind: "silver", title: "Delaware Launch Competition", place: "2nd Place", detail: "pitched Respondify · Delaware Entrepreneurship League", year: "2026" },
  { kind: "gold",   title: "Delaware Personal Finance Challenge", place: "1st Place", detail: "#1 of 12 teams, state · Council for Economic Education", year: "2026" },
  { kind: "seal",   title: "National Science Foundation Grant", place: "$1,500 Grant", detail: "HeadHaven · Princeton University & NSF", year: "2026" },
  { kind: "cert",   title: "Bloomberg Market Concepts (BMC)", place: "Certified", detail: "Bloomberg Terminal proficiency", year: "2025" },
  { kind: "silver", title: "BPA Financial Portfolio Management (V09)", place: "2nd Place", detail: "#2 of 250+ teams, international", year: "2025" },
];

// The CRT ticker tape + "NOW" readout.
export const TERMINAL = {
  now: [
    "replicating Abraham & Kearney (2020) for Prof. Torgovitsky",
    "building immigration-court panels at UC Merced",
    "tracking the Liberation Day tariff shock at DSU",
  ],
  ticker: [
    "1ST — DE PERSONAL FINANCE CHALLENGE",
    "2ND / 7000+ — NATIONAL PERSONAL FINANCE CHALLENGE",
    "2ND — DELAWARE LAUNCH COMPETITION",
    "$1,500 — NSF GRANT · HEADHAVEN",
    "2ND / 250+ — BPA FINANCIAL PORTFOLIO MGMT",
    "BMC — BLOOMBERG CERTIFIED",
  ],
};

// Pegboard / index card — skills (resume).
export const SKILLS = {
  Languages: ["Python", "R", "SQL", "LaTeX", "JavaScript", "OCaml"],
  "Frameworks & Libraries": ["Stata", "React", "Next.js", "Pandas", "NumPy", "Matplotlib", "TensorFlow", "PyTorch"],
  Tools: ["Bloomberg Terminal", "Excel", "Word"],
};

// Framed diploma — education + every club and activity (resume).
export const EDUCATION = [
  {
    inst: "Charter School of Wilmington",
    where: "Wilmington, DE",
    detail: "High School · GPA 4.0 / 4.0",
    when: "Aug 2025 — Jun 2029",
    activities: [
      "Student Government — Freshman Rep; Incoming Sophomore Rep",
      "Investment Club — Co-President",
      "Economics Club — Incoming Co-President",
      "Mock Trial",
      "Math League",
      "Orchestra — Concertmaster",
      "Media Team — Co-Founder",
      "Varsity Lacrosse",
      "Freshman Team Soccer",
    ],
    extra: "",
  },
  {
    inst: "University of Delaware",
    where: "Newark, DE",
    detail: "Non-degree coursework",
    when: "Jun 2025 — Jul 2026",
    activities: [],
    extra: "Finance 200 (FINC200) — 97% · Microeconomics 101 (ECON101) — Summer 2026",
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
