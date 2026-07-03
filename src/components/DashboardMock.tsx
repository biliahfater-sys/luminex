import { motion } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, Users, BarChart3, Settings,
  TrendingUp, ArrowUpRight, Circle
} from 'lucide-react'

const KPIS = [
  { label: 'Monthly revenue', value: '$48.2K', delta: '+12.4%', spark: 'M0 18 L8 14 L16 16 L24 10 L32 12 L40 6 L48 8 L56 2' },
  { label: 'Active users', value: '12,840', delta: '+8.1%', spark: 'M0 16 L8 15 L16 11 L24 13 L32 8 L40 9 L48 4 L56 5' },
  { label: 'Conversion', value: '4.32%', delta: '+0.6%', spark: 'M0 17 L8 12 L16 14 L24 9 L32 11 L40 7 L48 9 L56 3' },
]

const ACTIVITY = [
  { dot: 'text-fuchsia-400', text: 'Aura checkout redesign deployed', time: '2m ago' },
  { dot: 'text-violet-400', text: 'A/B test "Hero v3" reached significance', time: '18m ago' },
  { dot: 'text-amber-300', text: 'Nebula sprint review scheduled', time: '1h ago' },
  { dot: 'text-emerald-400', text: 'Pulse v2.4 passed QA on 14 devices', time: '3h ago' },
]

const PROJECT_ROWS = [
  {
    name: 'Nebula Finance', phase: 'Live', pct: 100, color: 'bg-emerald-400',
    img: '/img/nebula-finance.jpg',
  },
  {
    name: 'Aura Marketplace', phase: 'Build', pct: 72, color: 'bg-fuchsia-400',
    img: '/img/aura-market.jpg',
  },
  {
    name: 'Vertex AI', phase: 'Design', pct: 38, color: 'bg-violet-400',
    img: '/img/vertex-ai.jpg',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

/**
 * A believable LUMINEX studio dashboard rendered inside the scroll showcase:
 * sidebar, KPI cards with sparklines, an animated area chart, project rows
 * with live progress and a real activity feed + showreel tile.
 */
export default function DashboardMock() {
  return (
    <div className="w-full h-full bg-[#0c0820] rounded-2xl overflow-hidden flex flex-col text-left select-none">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#0a0719] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="mx-auto px-4 py-0.5 rounded-md bg-white/5 font-mono text-[10px] text-[#8d87b8]">
          studio.luminex.app/overview
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="hidden md:flex w-12 flex-col items-center gap-5 py-5 border-r border-white/5 bg-[#0a0719] shrink-0">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_14px_rgba(192,132,252,0.5)]" />
          <LayoutDashboard size={15} className="text-fuchsia-300" />
          <FolderKanban size={15} className="text-[#6f6b94]" />
          <Users size={15} className="text-[#6f6b94]" />
          <BarChart3 size={15} className="text-[#6f6b94]" />
          <Settings size={15} className="text-[#6f6b94] mt-auto" />
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0 p-4 md:p-5 flex flex-col gap-4 overflow-hidden">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-between shrink-0">
            <div>
              <div className="text-white font-bold text-sm md:text-base">Studio overview</div>
              <div className="text-[10px] md:text-[11px] text-[#8d87b8]">Q2 2026 · all projects</div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              <Circle size={6} className="text-emerald-400 fill-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-emerald-300">3 projects live</span>
            </div>
          </motion.div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {KPIS.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
              >
                <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-[#8d87b8] mb-1">{kpi.label}</div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <div className="text-white font-bold text-sm md:text-lg leading-none">{kpi.value}</div>
                    <div className="flex items-center gap-0.5 text-[10px] text-emerald-400 mt-1">
                      <TrendingUp size={10} /> {kpi.delta}
                    </div>
                  </div>
                  <svg width="56" height="20" viewBox="0 0 56 20" className="hidden sm:block shrink-0">
                    <motion.path
                      d={kpi.spark}
                      fill="none"
                      stroke="url(#sparkGrad)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="56" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#e879f9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Area chart */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-white/5 bg-white/[0.03] p-3 md:p-4 flex-1 min-h-0 flex flex-col"
          >
            <div className="flex items-center justify-between mb-2 shrink-0">
              <span className="text-[11px] md:text-xs font-semibold text-white">Traffic & conversions</span>
              <span className="font-mono text-[9px] text-[#8d87b8]">LAST 30 DAYS</span>
            </div>
            <svg viewBox="0 0 400 110" preserveAspectRatio="none" className="w-full flex-1 min-h-[70px]">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[28, 56, 84].map((y) => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              <motion.path
                d="M0 92 C30 84, 50 60, 80 64 C110 68, 130 38, 165 44 C200 50, 215 70, 250 58 C285 46, 300 24, 335 28 C360 31, 380 18, 400 12 L400 110 L0 110 Z"
                fill="url(#areaGrad)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.path
                d="M0 92 C30 84, 50 60, 80 64 C110 68, 130 38, 165 44 C200 50, 215 70, 250 58 C285 46, 300 24, 335 28 C360 31, 380 18, 400 12"
                fill="none"
                stroke="#c084fc"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.5, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="335" cy="28" r="3.5" fill="#e879f9"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.8, type: 'spring', stiffness: 300 }}
              />
            </svg>
          </motion.div>

          {/* Project rows */}
          <div className="hidden sm:flex flex-col gap-2 shrink-0">
            {PROJECT_ROWS.map((p, i) => (
              <motion.div
                key={p.name}
                custom={i + 5}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
              >
                <img src={p.img} alt="" className="w-8 h-8 rounded-md object-cover" loading="lazy" />
                <span className="text-xs font-medium text-white w-36 truncate">{p.name}</span>
                <span className="font-mono text-[9px] uppercase text-[#8d87b8] w-14">{p.phase}</span>
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${p.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="font-mono text-[10px] text-[#b8b3e0] w-9 text-right">{p.pct}%</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right rail: showreel + activity */}
        <div className="hidden lg:flex w-60 flex-col gap-4 border-l border-white/5 bg-[#0a0719] p-4 shrink-0">
          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-[10px] uppercase tracking-wider text-[#8d87b8] mb-2">Latest showreel</div>
            <div className="relative rounded-lg overflow-hidden border border-white/10 group">
              <video
                src="/showreel.mp4"
                muted
                loop
                autoPlay
                playsInline
                className="w-full aspect-video object-cover"
              />
              <div className="absolute bottom-1.5 left-2 flex items-center gap-1 text-[9px] font-mono text-white/90">
                <Circle size={5} className="text-rose-400 fill-rose-400 animate-pulse" /> REEL 2026
              </div>
            </div>
          </motion.div>

          <div className="flex-1 min-h-0">
            <div className="text-[10px] uppercase tracking-wider text-[#8d87b8] mb-2">Live activity</div>
            <div className="flex flex-col gap-2.5">
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={a.text}
                  custom={i + 3}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-2"
                >
                  <Circle size={6} className={`${a.dot} fill-current mt-1 shrink-0`} />
                  <div>
                    <div className="text-[11px] text-slate-200 leading-snug">{a.text}</div>
                    <div className="text-[9px] font-mono text-[#6f6b94] mt-0.5">{a.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 text-[11px] font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity">
            Open full report <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
