import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORD = 'LUMINEX'

/**
 * Custom first-load intro: orbit rings around a star core, the wordmark
 * assembling letter by letter, and a progress counter — then a smooth
 * wipe reveals the site. Skipped almost instantly for reduced motion.
 */
export default function IntroLoader() {
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [progress, setProgress] = useState(() => reduceMotion ? 100 : 0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      const t = setTimeout(() => setDone(true), 250)
      return () => clearTimeout(t)
    }

    document.documentElement.style.overflow = 'hidden'
    let value = 0
    const interval = setInterval(() => {
      // Ease towards 100 with organic, uneven steps
      value += Math.max(1, Math.round((100 - value) * 0.09 + Math.random() * 4))
      if (value >= 100) {
        value = 100
        clearInterval(interval)
        setTimeout(() => setDone(true), 350)
      }
      setProgress(value)
    }, 90)

    return () => {
      clearInterval(interval)
      document.documentElement.style.overflow = ''
    }
  }, [reduceMotion])

  useEffect(() => {
    if (done) document.documentElement.style.overflow = ''
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#070312]"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          aria-label="Loading"
          role="status"
        >
          {/* Orbit system */}
          <div className="relative w-36 h-36 mb-10">
            <div className="absolute inset-0 rounded-full border border-fuchsia-400/20 animate-orbit-spin">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.9)]" />
            </div>
            <div className="absolute inset-4 rounded-full border border-violet-400/25 animate-orbit-spin-reverse">
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500"
                animate={reduceMotion ? {} : { scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 32px rgba(192, 132, 252, 0.8)' }}
              />
            </div>
          </div>

          {/* Wordmark */}
          <div className="flex overflow-hidden mb-8" aria-hidden="true">
            {WORD.split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl font-extrabold tracking-[0.3em] text-white"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Progress */}
          <div className="w-56 sm:w-72">
            <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8d87b8]">
              <span>Entering orbit</span>
              <span className="text-fuchsia-300">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
