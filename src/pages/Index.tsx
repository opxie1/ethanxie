import Hero from "@/components/ui/animated-shader-hero";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import DisplayCards from "@/components/ui/display-cards";
import { Briefcase, GraduationCap, Award, Code, Mail, Globe, FlaskConical, TrendingUp, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const experienceCards = [
  {
    title: "Research Intern",
    description: "Collaborating with Prof. Amuedo-Dorantes on quasi-experimental labor economics research using staggered DiD methodology.",
    date: "Feb 2026 — Present",
    icon: <FlaskConical className="size-4 text-primary" />,
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    title: "Technical Lead — Princeton",
    description: "Developing a wearable fall-protection system using ML, accelerometers & gyroscopes. Awarded $1,500 NSF grant.",
    date: "Oct 2025 — Present",
    icon: <Code className="size-4 text-primary" />,
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    title: "Research Assistant — DSU",
    description: "Contributing to PhD-level corporate finance research using Bloomberg Terminal, SQL, R, and Python.",
    date: "Jan 2026 — Present",
    icon: <TrendingUp className="size-4 text-primary" />,
    iconClassName: "text-primary",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

const skills = [
  "Python", "R", "SQL", "TypeScript", "React", "Next.js",
  "Tailwind CSS", "TensorFlow", "PyTorch", "LaTeX", "OCaml", "Kotlin",
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
          trustBadge={{ text: "Open to opportunities", icons: ["✦"] }}
          buttons={{
            primary: { text: "View Experience", onClick: () => scrollToSection("experience") },
            secondary: { text: "Contact Me", onClick: () => scrollToSection("contact") },
          }}
        />
      </section>

      {/* 3D Interactive Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Interactive <span className="text-muted-foreground">Systems</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-muted-foreground text-lg max-w-md leading-relaxed"
          >
            From wearable fall-protection devices to labor economics research — I build systems that bridge hardware, data, and design.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-3 pt-4">
            {["Machine Learning", "WebGL", "Data Analysis"].map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </motion.div>
        </motion.div>

        <Card className="relative h-[500px] w-full bg-card/50 border-border overflow-hidden group flex items-center justify-center">
          <Spotlight className="from-primary/20 via-primary/10 to-transparent" size={400} />
          <div className="relative z-10 flex flex-col items-center gap-6 p-8">
            <Terminal className="size-16 text-primary opacity-60" />
            <div className="font-mono text-sm text-muted-foreground text-center space-y-2">
              <p><span className="text-primary">const</span> skills = [</p>
              <p className="pl-4">"ML", "Finance", "Full-Stack",</p>
              <p className="pl-4">"Data Science", "Research"</p>
              <p>];</p>
              <p className="mt-4"><span className="text-primary">export default</span> skills;</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Experience</h2>
            <div className="gradient-line" />
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-20">
            <div className="lg:w-1/2">
              <DisplayCards cards={experienceCards} />
            </div>

            <motion.div
              className="lg:w-1/3 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} custom={0}>
                <div className="glass-card p-8">
                  <GraduationCap className="size-6 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
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

              <motion.div variants={fadeInUp} custom={1}>
                <div className="glass-card p-8">
                  <Briefcase className="size-6 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Leadership</h3>
                  <p className="text-muted-foreground text-sm">
                    Co-President of Investment Club (200+ members), Freshmen Representative, CureQuest Outreach Director, Orchestra Concertmaster.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Technical Skills</h2>
            <div className="gradient-line" />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
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
      <section className="py-32 px-6 bg-secondary/20">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
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
