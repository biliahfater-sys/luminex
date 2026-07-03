"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, TrendingUp, Users } from "lucide-react";

interface Panel {
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
  accentBorder: string;
  label: string;
  railLabel: string;
  stat: string;
  statSuffix: string;
  description: string;
  footnote: string;
}

const PANELS: Panel[] = [
  {
    icon: <Sparkles size={20} />,
    accent: "text-fuchsia-300",
    accentBg: "bg-fuchsia-500/15",
    accentBorder: "border-fuchsia-400/40",
    label: "Static by design",
    railLabel: "Privacy",
    stat: "0",
    statSuffix: "backend",
    description: "The form, case studies, and legal pages run as a static portfolio demo. No hidden API route collects visitor data.",
    footnote: "Vite build · HashRouter · no server storage",
  },
  {
    icon: <Zap size={20} />,
    accent: "text-violet-300",
    accentBg: "bg-violet-500/15",
    accentBorder: "border-violet-400/40",
    label: "Separate consent",
    railLabel: "152-FZ",
    stat: "2",
    statSuffix: "docs",
    description: "The policy and consent are separate routes, linked from the footer, cookie banner, and contact form where users need them.",
    footnote: "Privacy policy · Consent page",
  },
  {
    icon: <TrendingUp size={20} />,
    accent: "text-amber-300",
    accentBg: "bg-amber-400/15",
    accentBorder: "border-amber-300/40",
    label: "One-click launch",
    railLabel: "Windows",
    stat: "1",
    statSuffix: "cmd",
    description: "The Windows launcher installs dependencies, builds the static site, starts preview, and opens localhost for review.",
    footnote: "start.cmd · npm.cmd · local preview",
  },
  {
    icon: <Users size={20} />,
    accent: "text-pink-300",
    accentBg: "bg-pink-500/15",
    accentBorder: "border-pink-400/40",
    label: "Cinematic surface",
    railLabel: "Motion",
    stat: "Web",
    statSuffix: "GL",
    description: "A living galaxy field, Spline scene, and restrained motion system give the demo atmosphere without adding a backend.",
    footnote: "Reduced-motion support · local assets",
  },
];

/**
 * "What makes us different" — interactive expanding panels.
 * The active panel opens wide with a big stat + story; the rest collapse
 * into slim labeled rails. Driven purely by hover/click/focus (no
 * auto-play), fully keyboard accessible. On mobile it becomes an accordion.
 */
export default function DisplayCards() {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Desktop: horizontal expanding panels */}
      <div className="hidden md:flex gap-4 h-[420px]">
        {PANELS.map((panel, i) => {
          const isActive = active === i;
          return (
            <motion.button
              key={panel.label}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              animate={{ flexGrow: isActive ? 3.2 : 1 }}
              transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
              className={`relative flex-1 min-w-0 basis-0 overflow-hidden rounded-2xl border text-left cursor-pointer backdrop-blur-md transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-fuchsia-400 ${
                isActive
                  ? `${panel.accentBorder} bg-[#1d1738]/80 shadow-[0_24px_80px_rgba(124,58,237,0.18)]`
                  : "border-white/10 bg-[#151029]/60 hover:bg-[#1d1738]/50"
              }`}
              aria-expanded={isActive}
            >
              {/* Collapsed rail — always mounted, pure crossfade (no remount flicker) */}
              <motion.div
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: isActive ? 0 : 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-between py-8"
                style={{ pointerEvents: "none" }}
              >
                <span className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${panel.accentBg} ${panel.accent}`}>
                  {panel.icon}
                </span>
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300 whitespace-nowrap"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {panel.railLabel}
                </span>
                <span className={`text-lg font-bold ${panel.accent}`}>{panel.stat}{panel.statSuffix}</span>
              </motion.div>

              {/* Expanded content — always mounted, fades and slides in */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: isActive ? 0.22 : 0 }}
                className="absolute inset-0 flex flex-col justify-between p-8 w-[26rem] lg:w-[34rem]"
                style={{ pointerEvents: "none" }}
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${panel.accentBg} ${panel.accent}`}>
                    {panel.icon}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-slate-300">
                    {panel.label}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-7xl font-extrabold tracking-tight ${panel.accent}`}>{panel.stat}</span>
                    <span className={`text-3xl font-bold ${panel.accent} opacity-70`}>{panel.statSuffix}</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed max-w-md mb-3">{panel.description}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#8d87b8]">{panel.footnote}</p>
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="hidden md:flex justify-center gap-2 mt-6" aria-hidden="true">
        {PANELS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            tabIndex={-1}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
              active === i ? "w-8 bg-fuchsia-400" : "w-1.5 bg-white/15 hover:bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Mobile: vertical accordion */}
      <div className="md:hidden flex flex-col gap-3">
        {PANELS.map((panel, i) => {
          const isActive = active === i;
          return (
            <button
              key={panel.label}
              type="button"
              onClick={() => setActive(i)}
              className={`text-left rounded-2xl border p-5 transition-colors duration-300 cursor-pointer ${
                isActive ? `${panel.accentBorder} bg-[#1d1738]/80` : "border-white/10 bg-[#151029]/60"
              }`}
              aria-expanded={isActive}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${panel.accentBg} ${panel.accent}`}>
                    {panel.icon}
                  </span>
                  <span className="font-semibold text-white text-sm">{panel.label}</span>
                </div>
                <span className={`font-bold ${panel.accent}`}>{panel.stat}{panel.statSuffix}</span>
              </div>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-300 text-sm leading-relaxed pt-4">{panel.description}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#8d87b8] mt-2">{panel.footnote}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
