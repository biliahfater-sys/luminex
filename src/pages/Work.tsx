import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight, Filter, ExternalLink,
  TrendingUp, Users, Layers, Play
} from 'lucide-react'
import { useProjects } from '../hooks/use-projects'
import { useT } from '@/i18n'

gsap.registerPlugin(ScrollTrigger)

// Filter values stay constant (used for matching project.filterCategory);
// only the visible label is translated via t.work.categories.
const CATEGORIES = ['All', 'WebGL', 'Brand', 'Installation', 'Commerce', 'SaaS', 'Mobile']
const APPROACH_ICONS = [<TrendingUp size={20} />, <Users size={20} />, <Layers size={20} />]

export default function Work() {
  const t = useT()
  const w = t.work
  const [filter, setFilter] = useState('All')
  const projects = useProjects()
  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.filterCategory === filter)

  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-hero-line',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="relative">
      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-[70dvh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16"
      >
        <span className="section-label mb-6">{w.label}</span>
        <h1 className="display-l text-white overflow-hidden mb-6">
          <span className="work-hero-line block">{w.heroLine1}</span>
          <span className="work-hero-line block text-gradient">{w.heroLine2}</span>
        </h1>
        <p className="body-text max-w-2xl text-lg">{w.heroSubtitle}</p>
      </section>

      {/* Filter */}
      <section className="py-8 px-6 sticky top-20 z-30">
        <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-2 p-2 rounded-full glass w-fit">
          <Filter size={14} className="text-slate-500 mr-2" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-5 py-2 rounded-full text-xs font-medium transition-all duration-300
                ${filter === cat
                  ? 'bg-fuchsia-400 text-[#070312]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {w.categories[cat] ?? cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const p = t.projects[project.id]
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group h-full"
                  >
                    <Link to="/contact" className="block h-full">
                      <div className="glass glass-hover overflow-hidden rounded-2xl h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1d1738] to-[#0c0820]">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070312] via-[#070312]/30 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/50 backdrop-blur-md text-white/90 border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-xs text-slate-400 mt-1">
                                {(p?.category ?? project.category)} · {project.year}
                              </p>
                            </div>
                            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-fuchsia-400 group-hover:border-fuchsia-400 group-hover:text-[#070312] transition-all">
                              <ArrowUpRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                          {p?.description ?? project.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div>
                            <span className="section-label text-slate-500 block text-[10px]">{p?.metricLabel ?? project.metrics.label}</span>
                            <span className="text-white font-semibold text-sm">{project.metrics.value}</span>
                          </div>
                          <button className="text-slate-400 hover:text-fuchsia-400 transition-colors flex items-center gap-1 text-xs">
                            {w.caseStudy} <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label mb-4 block">{w.approachLabel}</span>
              <h2 className="display-l text-white mb-6">{w.approachTitle}</h2>
              <p className="body-text mb-8">{w.approachP}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {w.approachItems.map((item, i) => (
                  <div key={item.label} className="glass p-4 rounded-xl">
                    <div className="text-fuchsia-400 mb-2">{APPROACH_ICONS[i]}</div>
                    <div className="text-white text-sm font-semibold mb-1">{item.label}</div>
                    <div className="text-slate-500 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass relative group">
                <video
                  src="/showreel.mp4"
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070312]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-sm">{w.showreelTitle}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{w.showreelMeta}</div>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-300 backdrop-blur-md">
                    <Play size={16} className="fill-current" />
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-xl max-w-[220px]">
                <div className="text-3xl font-bold text-fuchsia-400 mb-1">Demo</div>
                <div className="text-slate-400 text-xs">{w.ratingCaption}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="display-l text-white mb-6">{w.ctaTitle}</h2>
          <p className="body-text text-lg mb-8">{w.ctaSubtitle}</p>
          <Link to="/contact" className="btn-primary">
            {w.ctaButton} <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
