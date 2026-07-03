import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useInView } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter'
import MagneticButton from '../components/MagneticButton'
import DisplayCards from '../components/DisplayCards'
import { ContainerScroll } from '../components/ContainerScroll'
import { MouseSpotlight } from '../components/Spotlight'
import { SplineScene } from '../components/SplineScene'
import DashboardMock from '../components/DashboardMock'
import { useProjects } from '../hooks/use-projects'
import { useT } from '@/i18n'

import {
  ArrowUpRight, Sparkles,
  Quote, MessageCircle, Zap, ArrowRight, ChevronDown,
  Monitor, Smartphone, PenTool, BarChart3, Star
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Visual metadata that does not change between languages.
const SERVICE_META = [
  { icon: <Monitor size={24} />, color: 'cyan' },
  { icon: <Smartphone size={24} />, color: 'violet' },
  { icon: <PenTool size={24} />, color: 'rose' },
  { icon: <BarChart3 size={24} />, color: 'lime' },
]
const PROCESS_NUMBERS = ['01', '02', '03', '04']
const PLAN_META = [
  { price: '$4,900', popular: false },
  { price: '$12,900', popular: true },
  { price: '$24,900+', popular: false },
]
const STAT_META = [
  { value: 6, suffix: '' },
  { value: 2, suffix: '' },
  { value: 0, suffix: '' },
  { value: 0, suffix: '' },
]
const CLIENTS = ['Nebula', 'Aura', 'Pulse', 'Vertex', 'Meridian', 'Flux', 'Orbit', 'Echo']

// --- Animation helpers ---

function FadeIn({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const t = useT()
  const h = t.home
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const homeProjects = useProjects().slice(0, 4)
  const [showHeroVisual, setShowHeroVisual] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => setShowHeroVisual(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      const heroVisual = pageRef.current?.querySelector('.hero-visual')
      const heroBadges = pageRef.current?.querySelectorAll('.hero-badge')

      tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .fromTo('.hero-title span', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1, stagger: 0.08 }, 0.35)
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
        .fromTo('.hero-social', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1)
        .fromTo('.scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.1)

      if (heroVisual) {
        tl.fromTo(heroVisual, { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 1.2 }, 0.5)
      }

      if (heroBadges?.length) {
        tl.fromTo(heroBadges, { opacity: 0, y: 20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15 }, 1.1)
      }

      const scrollFade = (selector: string, trigger: string) =>
        gsap.fromTo(selector, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger, start: 'top 85%', once: true },
        })

      scrollFade('.stat-card', '.stats-section')
      scrollFade('.project-card', '.projects-section')
      scrollFade('.service-card', '.services-section')
      scrollFade('.process-step', '.process-section')
      scrollFade('.pricing-card', '.pricing-section')
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="relative">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-center px-6 pt-28 pb-12"
      >
        <div
          ref={heroContentRef}
          className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-12"
        >
          <div>
            <div className="hero-label opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              <span className="section-label">{h.badge}</span>
            </div>

            <h1 className="hero-title display-xl text-white mb-8 overflow-hidden">
              <span className="block opacity-0">{h.heroTitle1}</span>
              <span className="block opacity-0 text-gradient pb-2">{h.heroTitle2}</span>
            </h1>

            <p className="hero-subtitle opacity-0 body-text max-w-2xl text-lg mb-10">
              {h.heroSubtitle}
            </p>

            <div className="hero-cta opacity-0 flex flex-wrap items-center gap-4 mb-16">
              <MagneticButton>
                <Link to="/contact" className="btn-primary">
                  {h.startProject} <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/work" className="btn-secondary">
                  {h.viewWork} <ArrowUpRight size={18} />
                </Link>
              </MagneticButton>
            </div>

            <div className="hero-social opacity-0 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
              <div className="flex -space-x-3">
                {['/img/avatar-1.jpg', '/img/avatar-2.jpg', '/img/avatar-3.jpg', '/img/avatar-4.jpg'].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-[#070312] object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-white font-semibold">
                  <Sparkles size={14} className="text-fuchsia-400" />
                  {h.trustedBy}
                </div>
                <p className="text-sm text-slate-400">{h.avgRating}</p>
              </div>
            </div>
          </div>

          {showHeroVisual && (
            <div className="hero-visual opacity-0 relative hidden lg:block h-[560px]">
              <div
                className="absolute inset-8 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 45%, rgba(168, 85, 247, 0.22) 0%, rgba(217, 70, 239, 0.08) 45%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />

              <div className="hero-badge opacity-0 absolute top-12 -left-2 glass px-4 py-3 animate-float">
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  <Star size={14} className="text-amber-300 fill-amber-300" /> {h.badgeRating}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{h.badgeRatingSub}</p>
              </div>

              <div className="hero-badge opacity-0 absolute bottom-16 right-0 glass px-4 py-3 animate-float-slow">
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  <Zap size={14} className="text-fuchsia-400" /> {h.badgeWeeks}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{h.badgeWeeksSub}</p>
              </div>
            </div>
          )}
        </div>

        <div className="scroll-hint opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-[11px] uppercase tracking-widest">{h.scroll}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-12 border-y border-white/5 overflow-hidden">
        <div className="flex items-center justify-center gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <span
              key={i}
              className="text-2xl sm:text-3xl font-bold text-slate-600 uppercase tracking-wider"
            >
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section py-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_META.map((stat, i) => (
            <div key={i} className="stat-card glass glass-hover p-6 text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="section-label text-slate-400">{h.statsLabels[i]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Work */}
      <section className="projects-section py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <span className="section-label mb-4 block">{h.selectedWorkLabel}</span>
                <h2 className="display-l text-white">{h.selectedWorkTitle}</h2>
              </div>
              <Link to="/work" className="btn-secondary self-start sm:self-auto">
                {h.allProjects} <ArrowUpRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {homeProjects.map((project) => {
              const p = t.projects[project.id]
              return (
                <Link
                  key={project.title}
                  to="/work"
                  className="project-card group flex flex-col h-full overflow-hidden rounded-2xl glass glass-hover"
                >
                  <div className="relative aspect-[16/10] overflow-hidden shrink-0 bg-gradient-to-br from-[#1d1738] to-[#0c0820]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070312] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/40 backdrop-blur-md text-white/90 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-fuchsia-300 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-300">{p?.category ?? project.category}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-fuchsia-400 group-hover:border-fuchsia-400 group-hover:text-[#070312] transition-all">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                      {p?.description ?? project.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm pt-4 border-t border-white/5">
                      <div>
                        <span className="section-label text-slate-500 block">{h.usersLabel}</span>
                        <span className="font-semibold text-white">{project.stats.users}</span>
                      </div>
                      <div>
                        <span className="section-label text-slate-500 block">{h.growthLabel}</span>
                        <span className="font-semibold text-amber-300">{project.stats.growth}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl relative overflow-hidden">
          <MouseSpotlight />
          <FadeIn className="text-center mb-16">
            <span className="section-label mb-4 block">{h.servicesLabel}</span>
            <h2 className="display-l text-white max-w-3xl mx-auto">{h.servicesTitle}</h2>
            <p className="body-text max-w-2xl mx-auto mt-6">{h.servicesSubtitle}</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.services.map((service, i) => {
              const meta = SERVICE_META[i]
              return (
                <div
                  key={service.title}
                  className={`service-card glass glass-hover p-6 group ${meta.color === 'cyan' ? 'hover:border-fuchsia-400/30' : meta.color === 'violet' ? 'hover:border-violet-400/30' : meta.color === 'rose' ? 'hover:border-rose-400/30' : 'hover:border-amber-300/30'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                    meta.color === 'cyan' ? 'bg-fuchsia-400/10 text-fuchsia-400 group-hover:bg-fuchsia-400/20' :
                    meta.color === 'violet' ? 'bg-violet-400/10 text-violet-400 group-hover:bg-violet-400/20' :
                    meta.color === 'rose' ? 'bg-rose-400/10 text-rose-400 group-hover:bg-rose-400/20' :
                    'bg-amber-300/10 text-amber-300 group-hover:bg-amber-300/20'
                  }`}>
                    {meta.icon}
                  </div>
                  <h3 className="heading-2 text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Display Cards */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16">
            <span className="section-label mb-4 block">{h.highlightsLabel}</span>
            <h2 className="display-l text-white">{h.highlightsTitle}</h2>
          </FadeIn>
          <div className="flex justify-center">
            <DisplayCards />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16">
            <span className="section-label mb-4 block">{h.processLabel}</span>
            <h2 className="display-l text-white">{h.processTitle}</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.process.map((step, i) => (
              <div
                key={PROCESS_NUMBERS[i]}
                className="process-step glass glass-hover p-6 relative overflow-hidden group"
              >
                <span className="absolute -top-4 -right-4 text-8xl font-bold text-white/[0.03] select-none">
                  {PROCESS_NUMBERS[i]}
                </span>
                <span className="section-label text-slate-500 block mb-4">{PROCESS_NUMBERS[i]}</span>
                <h3 className="heading-2 text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section py-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-5xl relative">
          <FadeIn className="text-center mb-16">
            <span className="section-label mb-4 block">{h.pricingLabel}</span>
            <h2 className="display-l text-white">{h.pricingTitle}</h2>
            <p className="body-text max-w-2xl mx-auto mt-6">{h.pricingSubtitle}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {h.plans.map((plan, i) => {
              const meta = PLAN_META[i]
              return (
                <div
                  key={plan.name}
                  className={`pricing-card relative rounded-2xl border p-6 flex flex-col ${
                    meta.popular
                      ? 'border-fuchsia-400/40 bg-gradient-to-b from-fuchsia-400/8 to-transparent'
                      : 'border-white/8 bg-white/[0.02]'
                  }`}
                >
                  {meta.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-fuchsia-400 text-[#070312] text-xs font-bold">
                      {h.mostPopular}
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="heading-2 text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{meta.price}</span>
                    {plan.name !== 'Enterprise' && <span className="text-slate-500 text-sm ml-1">{h.perProject}</span>}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                        <Zap size={16} className="text-fuchsia-400 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={meta.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}
                  >
                    {h.getStarted}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Scroll Animation */}
      <section className="py-24 px-6">
        <ContainerScroll
          titleComponent={
            <div className="mb-12">
              <span className="section-label mb-4 block">{h.showcaseLabel}</span>
              <h2 className="display-l text-white">
                {h.showcaseTitle1}<span className="text-gradient">{h.showcaseAccent}</span>
              </h2>
            </div>
          }
        >
          <DashboardMock />
        </ContainerScroll>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16">
            <span className="section-label mb-4 block">{h.testimonialsLabel}</span>
            <h2 className="display-l text-white">{h.testimonialsTitle}</h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h.testimonials.map((tm) => (
              <StaggerItem key={tm.author}>
                <div className="glass glass-hover p-8 h-full flex flex-col">
                  <Quote size={24} className="text-fuchsia-400 mb-4" />
                  <p className="text-slate-300 leading-relaxed flex-1 mb-6">
                    "{tm.quote}"
                  </p>
                  {tm.stats && (
                    <div className="mb-4 px-3 py-2 rounded-lg bg-amber-300/10 border border-amber-300/20">
                      <span className="text-amber-300 text-sm font-semibold">{tm.stats}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                      {tm.author.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{tm.author}</div>
                      <div className="text-slate-500 text-xs">{tm.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center mb-16">
            <span className="section-label mb-4 block">{h.faqLabel}</span>
            <h2 className="display-l text-white">{h.faqTitle}</h2>
          </FadeIn>

          <StaggerContainer className="space-y-4">
            {h.faqs.map((faq) => (
              <StaggerItem key={faq.question}>
                <details className="glass glass-hover group rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-white pr-4">{faq.question}</span>
                    <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-fuchsia-400/40 group-hover:text-fuchsia-400 transition-colors flex-shrink-0">
                      <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative">
          <FadeIn>
            <h2 className="display-l text-white mb-6">
              {h.ctaTitle1}<span className="text-gradient">{h.ctaAccent}</span>
            </h2>
            <p className="body-text text-lg max-w-2xl mx-auto mb-10">{h.ctaSubtitle}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Link to="/contact" className="btn-primary">
                  <MessageCircle size={18} />
                  {h.ctaBook}
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/work" className="btn-secondary">
                  {h.ctaExplore}
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
