import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import Navbar from "@/components/Navbar";
import {
  TrendingUp, TrendingDown, X, ChevronRight,
  DollarSign, BarChart3, Target, Zap, ShieldCheck, AlertTriangle,
} from "lucide-react";

/* ─── pitch-deck data ─── */
interface PitchDeck {
  id: string;
  stock: string;
  ticker: string;
  order: "Long" | "Short";
  sector: string;
  targetPrice: string;
  currentPrice: string;
  upside: string;
  thesis: string;
  catalysts: string[];
  risks: string[];
  keyMetrics: { label: string; value: string }[];
  summary: string;
}

const pitchDecks: PitchDeck[] = [
  {
    id: "aapl",
    stock: "Apple Inc.",
    ticker: "AAPL",
    order: "Long",
    sector: "Technology",
    targetPrice: "$245",
    currentPrice: "$198",
    upside: "+23.7%",
    thesis:
      "Apple's services revenue flywheel — now 25% of total revenue — drives margin expansion while the Vision Pro ecosystem creates an entirely new platform revenue stream. The installed base of 2.2B active devices is an unmatched distribution moat.",
    catalysts: [
      "Vision Pro enterprise adoption accelerating in Q3 2026",
      "Apple Intelligence driving iPhone 17 super-cycle",
      "Services revenue hitting $100B run-rate by FY2027",
      "India manufacturing expansion reducing geopolitical risk",
    ],
    risks: [
      "China regulatory headwinds on App Store commissions",
      "Smartphone market saturation in developed markets",
      "AI feature parity risk with Android ecosystem",
    ],
    keyMetrics: [
      { label: "Market Cap", value: "$3.05T" },
      { label: "P/E (FWD)", value: "28.4x" },
      { label: "Revenue Growth", value: "+8.2%" },
      { label: "Gross Margin", value: "46.5%" },
      { label: "FCF Yield", value: "3.4%" },
      { label: "ROIC", value: "62.1%" },
    ],
    summary:
      "We initiate coverage with a BUY rating and a 12-month price target of $245, implying 23.7% upside. Our conviction rests on the underappreciated margin leverage from Services and the optionality embedded in the spatial computing platform.",
  },
  {
    id: "nvda",
    stock: "NVIDIA Corporation",
    ticker: "NVDA",
    order: "Long",
    sector: "Semiconductors",
    targetPrice: "$185",
    currentPrice: "$142",
    upside: "+30.3%",
    thesis:
      "NVIDIA's data center dominance is structurally durable. The Blackwell architecture extends their 2-year lead in AI training/inference silicon. Enterprise GPU-as-a-Service (DGX Cloud) creates recurring revenue that the market undervalues.",
    catalysts: [
      "Blackwell Ultra shipments ramping Q2 2026",
      "Sovereign AI infrastructure buildout ($50B+ TAM)",
      "CUDA ecosystem lock-in deepening with 5M+ developers",
      "Automotive and robotics revenue inflecting",
    ],
    risks: [
      "Customer concentration — top 4 hyperscalers = 45% of DC rev",
      "Custom silicon (TPUs, Trainium) eroding GPU share long-term",
      "Export controls limiting China TAM (~$8B headwind)",
    ],
    keyMetrics: [
      { label: "Market Cap", value: "$3.48T" },
      { label: "P/E (FWD)", value: "32.1x" },
      { label: "Revenue Growth", value: "+94%" },
      { label: "Gross Margin", value: "74.8%" },
      { label: "FCF Yield", value: "2.1%" },
      { label: "ROIC", value: "91.3%" },
    ],
    summary:
      "We rate NVDA a STRONG BUY with a $185 price target. The AI infrastructure capex cycle is early-innings, and NVIDIA's full-stack advantage (silicon + software + ecosystem) justifies a premium multiple. We model 45% EPS CAGR through FY2028.",
  },
  {
    id: "tsla",
    stock: "Tesla, Inc.",
    ticker: "TSLA",
    order: "Short",
    sector: "Automotive / Energy",
    targetPrice: "$120",
    currentPrice: "$178",
    upside: "-32.6%",
    thesis:
      "Tesla's auto margins are under secular pressure from Chinese EV competition (BYD, Xiaomi) and legacy OEM electrification. The FSD robotaxi narrative lacks regulatory clarity, and energy storage — while promising — cannot justify a $560B market cap at 65x forward earnings.",
    catalysts: [
      "Q2 deliveries miss consensus by 8-12% on demand softness",
      "FSD liability event triggering regulatory review",
      "BYD outselling Tesla globally for 3 consecutive quarters",
      "Margin compression as Model 2 launches at lower ASP",
    ],
    risks: [
      "FSD L4 approval in select geographies (catalyst for bulls)",
      "Optimus humanoid robot exceeding prototype expectations",
      "Energy storage growing 100%+ YoY masking auto weakness",
    ],
    keyMetrics: [
      { label: "Market Cap", value: "$567B" },
      { label: "P/E (FWD)", value: "65.2x" },
      { label: "Revenue Growth", value: "+3.1%" },
      { label: "Gross Margin", value: "17.8%" },
      { label: "Auto Margin", value: "14.2%" },
      { label: "FCF Yield", value: "1.8%" },
    ],
    summary:
      "We initiate with a SELL rating and $120 price target, implying 32.6% downside. The current valuation prices in flawless execution on FSD and robotaxi — a risk/reward we find deeply unfavorable. Auto fundamentals are deteriorating.",
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

/* ─── Component ─── */
const PitchDecks = () => {
  const [activeDeck, setActiveDeck] = useState<PitchDeck | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openDeck = useCallback((deck: PitchDeck) => {
    setIsTransitioning(true);
    setActiveDeck(deck);
  }, []);

  const closeDeck = useCallback(() => {
    setIsTransitioning(false);
    setTimeout(() => setActiveDeck(null), 600);
  }, []);

  const isLong = (order: string) => order === "Long";

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
            <BarChart3 className="size-4 text-primary" />
            Investment Club — Stock Pitches
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mt-4">
            Pitch Decks
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Click a deck below to explore the full investment thesis.
          </p>
        </motion.div>
      </section>

      {/* ── Spline + floating cards ── */}
      <section className="relative w-full h-[85vh] flex items-center justify-center">
        {/* Spline robot */}
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

        {/* Floating pitch deck cards — must be above Spline */}
        <div className="absolute inset-0 z-30" style={{ pointerEvents: "none" }}>
          <AnimatePresence>
            {!isTransitioning &&
              pitchDecks.map((deck, i) => (
                <motion.button
                  key={deck.id}
                  onClick={() => openDeck(deck)}
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
                    className="pitch-card-inner"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`pitch-order-badge ${
                          isLong(deck.order) ? "pitch-order-long" : "pitch-order-short"
                        }`}
                      >
                        {isLong(deck.order) ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        {deck.order}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {deck.sector}
                      </span>
                    </div>
                    <div className="pitch-card-ticker">{deck.ticker}</div>
                    <div className="text-sm text-muted-foreground">{deck.stock}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        Target: {deck.targetPrice}
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold ${
                          isLong(deck.order) ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {deck.upside}
                      </span>
                    </div>
                    <div className="pitch-card-cta">
                      <span>View Pitch</span>
                      <ChevronRight className="size-3" />
                    </div>
                  </motion.div>
                </motion.button>
              ))}
          </AnimatePresence>
        </div>

        {/* ── Full-screen deck overlay ── */}
        <AnimatePresence>
          {activeDeck && (
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
                onClick={closeDeck}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <X className="size-5" />
              </motion.button>

              {/* Deck content */}
              <motion.div
                className="pitch-deck-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isTransitioning ? 1 : 0, y: isTransitioning ? 0 : 40 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="pitch-deck-header">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                        {activeDeck.ticker}
                      </h2>
                      <span
                        className={`pitch-order-badge-lg ${
                          isLong(activeDeck.order)
                            ? "pitch-order-long"
                            : "pitch-order-short"
                        }`}
                      >
                        {isLong(activeDeck.order) ? (
                          <TrendingUp className="size-4" />
                        ) : (
                          <TrendingDown className="size-4" />
                        )}
                        {activeDeck.order}
                      </span>
                    </div>
                    <p className="text-xl text-muted-foreground">
                      {activeDeck.stock} · {activeDeck.sector}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground font-mono">
                      Price Target
                    </div>
                    <div className="text-3xl font-bold">{activeDeck.targetPrice}</div>
                    <div
                      className={`text-lg font-mono font-semibold ${
                        isLong(activeDeck.order) ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {activeDeck.upside} upside
                    </div>
                  </div>
                </div>

                <div className="gradient-line my-8" />

                {/* Key Metrics */}
                <div className="pitch-metrics-grid">
                  {activeDeck.keyMetrics.map((m) => (
                    <div key={m.label} className="pitch-metric-card">
                      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="text-xl font-semibold mt-1">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Thesis */}
                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="size-5 text-primary" />
                    <h3 className="text-xl font-semibold">Investment Thesis</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {activeDeck.thesis}
                  </p>
                </div>

                {/* Catalysts + Risks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="size-5 text-emerald-400" />
                      <h3 className="text-lg font-semibold">Catalysts</h3>
                    </div>
                    <ul className="space-y-3">
                      {activeDeck.catalysts.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <ShieldCheck className="size-4 mt-0.5 text-emerald-400 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="size-5 text-amber-400" />
                      <h3 className="text-lg font-semibold">Key Risks</h3>
                    </div>
                    <ul className="space-y-3">
                      {activeDeck.risks.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <AlertTriangle className="size-4 mt-0.5 text-amber-400 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-10 glass-card p-8 border-primary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="size-5 text-primary" />
                    <h3 className="text-xl font-semibold">Recommendation</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {activeDeck.summary}
                  </p>
                </div>

                {/* Disclaimer */}
                <p className="mt-8 text-xs text-muted-foreground/50 font-mono text-center">
                  This pitch deck is for educational purposes only and does not constitute financial advice.
                  Prepared by the CSW Investment Club.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border text-center relative z-10">
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          © 2026 Ethan Xie · Built with Precision & Ether
        </p>
      </footer>
    </main>
  );
};

export default PitchDecks;
