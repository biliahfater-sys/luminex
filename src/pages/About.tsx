import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BackgroundPaths } from '../components/ui/background-paths'
import TextScramble from '../components/TextScramble'
import RadialOrbitalTimeline from '../components/OrbitalTimeline'
import { useT } from '@/i18n'
import {
  Code2, Box, Palette, Zap, Globe, Layers,
  Award, Users, Lightbulb, Target
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Skill names are technologies — same in both languages.
const SKILLS = [
  { name: 'React / Next.js', value: 95, icon: <Code2 size={16} /> },
  { name: 'Three.js / WebGL', value: 92, icon: <Box size={16} /> },
  { name: 'UI/UX Design', value: 90, icon: <Palette size={16} /> },
  { name: 'Motion Design', value: 88, icon: <Zap size={16} /> },
  { name: 'Creative Direction', value: 85, icon: <Target size={16} /> },
  { name: 'Brand Systems', value: 82, icon: <Globe size={16} /> },
]

const VALUE_ICONS = [
  <Lightbulb size={24} />,
  <Target size={24} />,
  <Users size={24} />,
  <Award size={24} />,
]

function SkillBar({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-[#FDFDFD]">
          <span className="text-[#c084fc]">{skill.icon}</span>
          <span className="font-mono text-[13px] uppercase tracking-wider">{skill.name}</span>
        </div>
        <span className="font-mono text-[12px] text-[#b8b3e0]">{skill.value}%</span>
      </div>
      <div className="h-1 bg-[rgba(184,179,224,0.1)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-[#c084fc] to-[#e879f9] rounded-full"
        />
      </div>
    </motion.div>
  )
}

export default function About() {
  const t = useT()
  const a = t.about
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-hero-line',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="relative">
      {/* Hero with BackgroundPaths */}
      <BackgroundPaths className="min-h-[80dvh] flex items-center">
        <div
          ref={heroRef}
          className="w-full flex flex-col justify-center items-center text-center px-6"
          style={{ minHeight: '80dvh', paddingTop: 100 }}
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0] mb-6">
            {a.label}
          </span>
          <h1 className="font-space font-bold uppercase text-[#FDFDFD] overflow-hidden" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: 0.85 }}>
            <span className="about-hero-line block">{a.heroLine1}</span>
            <span className="about-hero-line block text-[#c084fc]">{a.heroLine2}</span>
          </h1>
          <p className="font-inter text-[16px] text-[#b8b3e0] max-w-[700px] mt-8 leading-relaxed">
            {a.heroSubtitle}
          </p>
        </div>
      </BackgroundPaths>

      {/* Story Section */}
      <section style={{ padding: '8rem 24px', zIndex: 10, position: 'relative' }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ maxWidth: 1400 }}>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0]">
                {a.storyLabel}
              </span>
              <div style={{ height: 1, flex: 1, backgroundColor: 'rgba(184, 179, 224, 0.15)' }} />
            </div>
            <h2 className="font-space font-bold text-[#FDFDFD] mb-6" style={{ fontSize: '2.5rem', lineHeight: 1.05, textTransform: 'uppercase' }}>
              <TextScramble text={a.storyTitle} triggerOnView />
            </h2>
            <div className="space-y-4 text-[#b8b3e0] leading-relaxed">
              <p>{a.storyP1}</p>
              <p>{a.storyP2}</p>
              <p>{a.storyP3}</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1d1738] to-[#0c0820]">
              <img
                src="/img/team-studio.jpg"
                alt="LUMINEX studio team at work"
                loading="lazy"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070312]/70 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -left-6 frost-glass p-6 max-w-[240px]">
              <div className="font-space text-3xl font-bold text-[#c084fc]">Demo</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#b8b3e0]">
                {a.yearsBadge}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '8rem 24px', zIndex: 10, position: 'relative' }}>
        <div className="mx-auto" style={{ maxWidth: 1400 }}>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0]">
              {a.principlesLabel}
            </span>
            <div style={{ height: 1, flex: 1, backgroundColor: 'rgba(184, 179, 224, 0.15)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {a.values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="frost-glass frost-glass-hover p-8"
              >
                <div className="text-[#c084fc] mb-4">{VALUE_ICONS[i]}</div>
                <h3 className="font-space text-[20px] font-bold text-[#FDFDFD] uppercase mb-3">{value.title}</h3>
                <p className="text-[#b8b3e0] leading-relaxed text-[14px]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Orbital Timeline */}
      <section style={{ padding: '8rem 24px', zIndex: 10, position: 'relative' }}>
        <div className="mx-auto" style={{ maxWidth: 1400 }}>
          <div className="text-center mb-12">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0]">
              {a.timelineLabel}
            </span>
            <h2 className="font-space font-bold text-[#FDFDFD] mb-4" style={{ fontSize: '2.5rem', lineHeight: 1.05, textTransform: 'uppercase' }}>
              {a.timelineTitle}
            </h2>
          </div>
          <RadialOrbitalTimeline />
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: '8rem 24px', zIndex: 10, position: 'relative' }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16" style={{ maxWidth: 1400 }}>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#b8b3e0]">
                {a.expertiseLabel}
              </span>
              <div style={{ height: 1, flex: 1, backgroundColor: 'rgba(184, 179, 224, 0.15)' }} />
            </div>
            <h2 className="font-space font-bold text-[#FDFDFD] mb-8" style={{ fontSize: '2.5rem', lineHeight: 1.05, textTransform: 'uppercase' }}>
              {a.skillsTitle}
            </h2>
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <div className="frost-glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-[#c084fc]" size={24} />
                <h3 className="font-space text-[20px] font-bold text-[#FDFDFD] uppercase">{a.techStackTitle}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Three.js', 'WebGL', 'GLSL', 'GSAP', 'Framer Motion', 'Tailwind', 'Node.js', 'Figma', 'Blender'].map((tech) => (
                  <span key={tech} className="font-mono text-[12px] uppercase tracking-wider px-3 py-2 rounded-full border border-[rgba(184,179,224,0.2)] text-[#b8b3e0]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center text-center" style={{ padding: '6rem 24px 10rem', zIndex: 10, position: 'relative' }}>
        <h2 className="display-l text-[#FDFDFD]">{a.ctaTitle}</h2>
        <p className="font-inter text-[16px] text-[#b8b3e0] max-w-[500px] mt-4 mb-8">
          {a.ctaSubtitle}
        </p>
        <Link to="/contact" className="btn-primary">
          {a.ctaButton}
        </Link>
      </section>
    </div>
  )
}
