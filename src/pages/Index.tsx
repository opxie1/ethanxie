import Hero from "@/components/ui/animated-shader-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { DragAndDraw } from "@/components/ui/drag-and-draw";
import { SmokeCard } from "@/components/ui/smoke-card";
import {
  Briefcase, GraduationCap, Award, Mail, Globe,
  FlaskConical, TrendingUp, Code, DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

const experienceTimeline = [
  {
    id: 1,
    title: "Research Intern — UC Merced",
    date: "Feb 2026 — Present",
    content:
      "Collaborating with Prof. Amuedo-Dorantes on quasi-experimental labor economics research evaluating safe-zone policy effects on K–12 academic outcomes using staggered difference-in-differences methodology.",
    category: "Research",
    icon: FlaskConical,
    relatedIds: [2],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 2,
    title: "Research Assistant — DSU",
    date: "Jan 2026 — Present",
    content:
      "Contributing to PhD-level corporate finance research under Dr. Zi Ning, including analysis of fixed income securities using Bloomberg Terminal, SQL, R, and Python.",
    category: "Research",
    icon: TrendingUp,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 3,
    title: "Technical Lead — Princeton",
    date: "Oct 2025 — Present",
    content:
      "Developing a wearable fall-protection system for seniors using ML, accelerometers & gyroscopes. Awarded a $1,500 NSF grant. Currently prototyping the device.",
    category: "Engineering",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Co-President — Investment Club",
    date: "Dec 2025 — Present",
    content:
      "Leading a club with 200+ members. Teaching stock market fundamentals, diversification & risk management, stock pitches, and running paper trading competitions on Investopedia.",
    category: "Leadership",
    icon: DollarSign,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 5,
    title: "BPA — 2nd Place International",
    date: "May 2025",
    content:
      "Placed 2nd out of 250+ teams internationally in Financial Portfolio Management at Business Professionals of America.",
    category: "Award",
    icon: Award,
    relatedIds: [4],
    status: "completed" as const,
    energy: 100,
  },
];

const skills = [
  "Python", "R", "SQL", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "TensorFlow", "PyTorch", "LaTeX", "OCaml", "Kotlin",
  "Excel", "Pandas", "NumPy", "Matplotlib",
];

const awards = [
  {
    title: "BPA Financial Portfolio Management — 2nd Place International",
    description: "Placed 2nd out of 250+ teams internationally at Business Professionals of America.",
    date: "May 2025",
  },
  {
    title: "Bloomberg Market Concepts (BMC) Certification",
    description: "Interactive introduction to financial markets covering economic indicators, currencies, fixed income, and equities.",
    date: "Nov 2025",
  },
  {
    title: "Bloomberg Finance Fundamentals (BFF) Certification",
    description: "Key concepts in finance including investing, risk/reward, and portfolio management.",
    date: "Nov 2025",
  },
  {
    title: "Introduction to MS Excel — Simplilearn",
    description: "Foundational to advanced skills on Microsoft Excel (7hrs).",
    date: "Jan 2026",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <Hero
          headline={{ line1: "Ethan Xie", line2: "Finance & Engineering" }}
          subtitle="Building at the intersection of quantitative finance, machine learning, and design. Researcher. Builder. Investor."
          trustBadge={{ text: "Delaware, USA", icons: ["📍"] }}
          buttons={{
            primary: { text: "View Experience", onClick: () => scrollToSection("experience") },
            secondary: { text: "Contact Me", onClick: () => scrollToSection("contact") },
          }}
        />
      </section>

      {/* Experience — Radial Orbital Timeline */}
      <section id="experience" className="py-24 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Experience
            </h2>
            <div className="gradient-line mt-4 max-w-xs mx-auto" />
            <p className="text-muted-foreground mt-4 text-lg">
              Click on a node to explore — they're all connected.
            </p>
          </motion.div>
          <RadialOrbitalTimeline timelineData={experienceTimeline} />
        </div>
      </section>

      {/* Education & Leadership */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
          >
            <div className="glass-card p-8 h-full">
              <GraduationCap className="size-6 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground font-medium">Charter School of Wilmington</p>
                  <p className="text-sm text-muted-foreground font-mono">GPA: 4.0/4.0 · Aug 2025 – Jun 2029</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">University of Delaware</p>
                  <p className="text-sm text-muted-foreground font-mono">FINC200 Grade: 97% · Summer 2025</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={1}
          >
            <div className="glass-card p-8 h-full">
              <Briefcase className="size-6 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">Leadership & Activities</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Co-President of Investment Club (200+ members), Freshmen Representative, CureQuest Outreach Director, Orchestra Concertmaster, Mock Trial, CS Teaching Assistant, Math League, Media Team Co-Founder.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-32 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Technical Skills</h2>
            <div className="gradient-line" />
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-3 justify-center py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                variants={fadeInUp}
                custom={i}
                className="tag-pill text-foreground hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Awards & Certifications</h2>
            <div className="gradient-line" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, i) => (
              <motion.div
                key={award.title}
                className="glass-card p-8 hover:border-primary/30 transition-colors"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
              >
                <Award className="size-5 mb-4 text-primary" />
                <h3 className="font-semibold mb-2 text-foreground">{award.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{award.description}</p>
                <p className="text-xs font-mono text-muted-foreground">{award.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Canvas — Drag & Draw */}
      <section className="py-24 px-6 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Draw Something</h2>
            <p className="text-muted-foreground text-sm">Click and drag on the canvas below.</p>
          </motion.div>
          <motion.div
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <DragAndDraw width={900} height={400} />
          </motion.div>
        </div>
      </section>

      {/* Smoke Effect Card */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Smoke Effect</h2>
            <p className="text-muted-foreground text-sm">Hover over the card to generate particles.</p>
          </motion.div>
          <motion.div
            className="glass-card h-64 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SmokeCard />
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-secondary/20">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Mail className="size-8 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight mb-2">Let's Connect</h2>
              <p className="text-muted-foreground mb-8">
                Interested in research, finance, or building something together? Reach out.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ethanxie@udel.edu"
                className="px-8 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
              >
                <Mail className="size-4" /> Send an Email
              </a>
              <a
                href="https://linkedin.com/in/ethanxie1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors inline-flex items-center justify-center gap-2"
              >
                <Globe className="size-4" /> LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border text-center">
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          © 2026 Ethan Xie · Built with Precision & Ether
        </p>
      </footer>
    </main>
  );
};

export default Index;
