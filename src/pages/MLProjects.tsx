import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import Navbar from "@/components/Navbar";
import {
  Network, Cpu, Database, BrainCircuit, X, ChevronRight,
  CheckCircle, Clock, FlaskConical, Target, Zap, AlertTriangle, ShieldCheck
} from "lucide-react";

/* ─── ML Project data ─── */
interface MLProject {
  id: string;
  title: string;
  type: string;
  focus: string;
  status: "Deployed" | "Training" | "Research";
  statusColor: string;
  thesis: string;
  features: string[];
  challenges: string[];
  keyMetrics: { label: string; value: string }[];
  summary: string;
}

const mlProjects: MLProject[] = [
  {
    id: "dqn-arb",
    title: "DQN Stat-Arb",
    type: "Reinforcement Learning",
    focus: "High-Frequency Trading",
    status: "Training",
    statusColor: "text-amber-400",
    thesis:
      "Utilizing Deep Q-Networks and Proximal Policy Optimization (PPO) over tick-level limit order book data. The agent dynamically identifies cointegrated pairs and executes statistical arbitrage strategies, removing human bias in microsecond-level execution.",
    features: [
      "Custom Gym environment mimicking Order Book dynamics",
      "PPO architecture for stable and continuous policy updates",
      "Sharpe ratio optimization objective function",
      "Latency-simulated execution penalization",
    ],
    challenges: [
      "Simulation-to-reality gap in market impact modeling",
      "High dimensional state space from level-3 tick data",
      "Non-stationary market conditions degrading policy",
    ],
    keyMetrics: [
      { label: "State Dims", value: "2,048" },
      { label: "Action Space", value: "Discrete" },
      { label: "Target Win Rate", value: "62.4%" },
      { label: "Sim. Sharpe", value: "2.8" },
      { label: "Ticks/Sec", value: "500k+" },
      { label: "Latency Target", value: "<1ms" },
    ],
    summary:
      "Currently in the training phase on 3 years of historical tick data. Preliminary backtests show a 62.4% win rate with a simulated Sharpe of 2.8 before trading costs. The focus next is reducing simulation-to-reality gap.",
  },
  {
    id: "finbert-llama",
    title: "BERT-LLaMA Engine",
    type: "LLMs & NLP",
    focus: "Alpha Generation",
    status: "Deployed",
    statusColor: "text-emerald-400",
    thesis:
      "A hybrid pipeline analyzing real-time earnings call transcripts. It uses custom-finetuned FinBERT heads combined with LLaMA 3 to quantify executive sentiment shifts, extracting alpha ahead of post-call price revisions.",
    features: [
      "Real-time audio-to-text transcription via Whisper",
      "FinBERT-based sentence-level sentiment polarity",
      "LLaMA 3 for context aggregation & structural summaries",
      "Automated webhook generation for downstream execution",
    ],
    challenges: [
      "Sarcasm and financial euphemism detection",
      "Managing token limits on 2-hour long transcripts",
      "Inference latency stalling execution speed",
    ],
    keyMetrics: [
      { label: "Parameters", value: "8B + 110M" },
      { label: "Latency", value: "1.2s" },
      { label: "F1 Score", value: "0.91" },
      { label: "Alpha Decay", value: "High" },
      { label: "Tokens/sec", value: "150+" },
      { label: "Accuracy", value: "89%" },
    ],
    summary:
      "Fully deployed on an A100 node. Processes live earnings calls and generates actionable sentiment vector signals just 1.2 seconds after an executive finishes their sentence.",
  },
  {
    id: "gnn-risk",
    title: "GNN Systemic Risk",
    type: "Graph ML",
    focus: "Institutional Credit",
    status: "Research",
    statusColor: "text-blue-400",
    thesis:
      "Modeling inter-corporate debt networks and supply chain dependencies as a global heterogenous graph to predict cascade-failure scenarios during macroeconomic distress or targeted idiosyncratic defaults.",
    features: [
      "Heterogenous Graph Attention Networks (HGAT)",
      "Temporal node embeddings for credit ratings over time",
      "Stress test simulation endpoints via random walks",
      "Explainable AI subgraphs indicating paths of contagion",
    ],
    challenges: [
      "Extreme data sparsity in private company disclosures",
      "Dynamic edges scaling exponentially with new entities",
      "Over-smoothing phenomena in deep GNN layers",
    ],
    keyMetrics: [
      { label: "Nodes", value: "15M+" },
      { label: "Edges", value: "142M+" },
      { label: "Graph Type", value: "Temporal" },
      { label: "AUC-ROC", value: "0.86" },
      { label: "Precision", value: "0.79" },
      { label: "Recall", value: "0.82" },
    ],
    summary:
      "A pure research project aimed at providing regulators and prime brokers a sandbox to quantify counterparty risk objectively given a shock to specific supply-chain nodes.",
  },
];

/* ─── Card positions around the robot ─── */
const cardPositions = [
  { x: "-38%", y: "-15%", delay: 0 },
  { x: "38%", y: "-20%", delay: 0.15 },
  { x: "-42%", y: "25%", delay: 0.3 },
];

/* ─── floating animation for each card ─── */
const floatVariants = (i: number) => ({
  animate: {
    opacity: 1,
    scale: 1,
    y: [0, -14, 0, 10, 0],
    x: [0, i % 2 === 0 ? 6 : -6, 0],
    transition: {
      opacity: { duration: 0.6, delay: 0.5 + i * 0.15 },
      scale: { duration: 0.6, delay: 0.5 + i * 0.15 },
      y: { duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 + i * 0.15 },
      x: { duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 + i * 0.15 },
    },
  },
});

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "Deployed") return <CheckCircle className="size-3" />;
  if (status === "Training") return <Clock className="size-3" />;
  return <FlaskConical className="size-3" />;
};

/* ─── Component ─── */
const MLProjects = () => {
  const [activeProject, setActiveProject] = useState<MLProject | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openProject = useCallback((project: MLProject) => {
    setIsTransitioning(true);
    setActiveProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setIsTransitioning(false);
    setTimeout(() => setActiveProject(null), 600);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      <Navbar />

      {/* ── Hero header ── */}
      <section className="pt-32 pb-8 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 backdrop-blur-md text-sm text-foreground mb-6">
            <Network className="size-4 text-primary" />
            Machine Learning Engineering
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mt-4">
            ML Projects
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Explore highly-advanced algorithmic systems at the intersection of AI and Finance.
          </p>
        </motion.div>
      </section>

      {/* ── Spline + floating cards ── */}
      <section className="relative w-full h-[85vh] flex items-center justify-center">
        {/* Spline robot reused for AI theme */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ pointerEvents: "none" }}
          animate={{
            opacity: isTransitioning ? 0.15 : 1,
            filter: isTransitioning ? "blur(12px)" : "blur(0px)",
            scale: isTransitioning ? 1.05 : 1,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>

        {/* Floating project cards */}
        <div className="absolute inset-0 z-30" style={{ pointerEvents: "none" }}>
          <AnimatePresence>
            {!isTransitioning &&
              mlProjects.map((project, i) => (
                <motion.button
                  key={project.id}
                  onClick={() => openProject(project)}
                  className="pitch-card-float"
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${cardPositions[i].x})`,
                    top: `calc(50% + ${cardPositions[i].y})`,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "auto",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate="animate"
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                  variants={floatVariants(i)}
                  whileHover={{ scale: 1.08, zIndex: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + cardPositions[i].delay, duration: 0.5 }}
                    className="pitch-card-inner !border-primary/20 backdrop-blur-xl bg-background/60"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded tracking-wide text-[10px] font-bold uppercase ${project.statusColor} bg-black/40 border border-white/5`}
                      >
                        <StatusIcon status={project.status} />
                        {project.status}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono truncate max-w-[100px]">
                        {project.focus}
                      </span>
                    </div>
                    <div className="text-xl font-bold tracking-tight text-foreground">{project.title}</div>
                    <div className="text-sm text-primary mb-3 mt-1 flex items-center gap-2">
                      <BrainCircuit className="size-3 opacity-70" /> {project.type}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest opacity-80">
                        {project.keyMetrics[0].label}: {project.keyMetrics[0].value}
                      </span>
                    </div>
                    <div className="pitch-card-cta flex items-center gap-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>Examine Architecture</span>
                      <ChevronRight className="size-3" />
                    </div>
                  </motion.div>
                </motion.button>
              ))}
          </AnimatePresence>
        </div>

        {/* ── Full-screen project overlay ── */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              className="pitch-overlay"
              initial={{ opacity: 0, scale: 0.6, borderRadius: "1.5rem" }}
              animate={{
                opacity: isTransitioning ? 1 : 0,
                scale: isTransitioning ? 1 : 0.6,
                borderRadius: isTransitioning ? "0rem" : "1.5rem",
              }}
              exit={{ opacity: 0, scale: 0.6, borderRadius: "1.5rem" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close button */}
              <motion.button
                className="pitch-close-btn"
                onClick={closeProject}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <X className="size-5" />
              </motion.button>

              {/* Project content */}
              <motion.div
                className="pitch-deck-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isTransitioning ? 1 : 0, y: isTransitioning ? 0 : 40 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="pitch-deck-header flex-col md:flex-row gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                        {activeProject.title}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold uppercase ${activeProject.statusColor} bg-black/30 border border-white/5`}
                      >
                        <StatusIcon status={activeProject.status} />
                        {activeProject.status}
                      </span>
                    </div>
                    <p className="text-xl text-primary mt-2">
                      {activeProject.type} · {activeProject.focus}
                    </p>
                  </div>
                </div>

                <div className="gradient-line my-8" />

                {/* Key Metrics */}
                <div className="pitch-metrics-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {activeProject.keyMetrics.map((m) => (
                    <div key={m.label} className="pitch-metric-card p-4 rounded-xl bg-secondary/20 border border-white/5 text-center">
                      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="text-xl font-semibold mt-2 text-foreground">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Thesis */}
                <div className="mt-12">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="size-6 text-primary" />
                    <h3 className="text-2xl font-bold">Architecture & Objective</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg border-l-2 border-primary/30 pl-4 py-1">
                    {activeProject.thesis}
                  </p>
                </div>

                {/* Features + Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  <div className="glass-card p-8 bg-gradient-to-br from-emerald-500/5 to-transparent">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="size-6 text-emerald-400" />
                      <h3 className="text-xl font-bold">Key Technical Features</h3>
                    </div>
                    <ul className="space-y-4">
                      {activeProject.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[15px] text-muted-foreground"
                        >
                          <ShieldCheck className="size-5 mt-0.5 text-emerald-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card p-8 bg-gradient-to-br from-amber-500/5 to-transparent">
                    <div className="flex items-center gap-3 mb-6">
                      <AlertTriangle className="size-6 text-amber-400" />
                      <h3 className="text-xl font-bold">Engineering Challenges</h3>
                    </div>
                    <ul className="space-y-4">
                      {activeProject.challenges.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[15px] text-muted-foreground"
                        >
                          <AlertTriangle className="size-5 mt-0.5 text-amber-400 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-12 glass-card p-8 border-primary/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <Database className="size-6 text-primary" />
                    <h3 className="text-xl font-bold">Project Status</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg relative z-10">
                    {activeProject.summary}
                  </p>
                </div>

                {/* Footer Disclaimer */}
                <p className="mt-12 text-xs text-muted-foreground/40 font-mono text-center mb-8">
                  Data, weights, and private repos are withheld for IP protection. Architecture diagrams available upon request.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border text-center relative z-10 bg-background">
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          © 2026 Ethan Xie · Built with Precision & Algorithms
        </p>
      </footer>
    </main>
  );
};

export default MLProjects;
