import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  depth: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

/**
 * One seamless living background for the whole site:
 * canvas starfield with parallax drift, twinkling and shooting stars,
 * plus slow-drifting nebula blobs. Fixed behind all pages, so there
 * are no visible seams between sections or routes.
 */
export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let shooting: ShootingStar[] = []
    let raf = 0
    let lastSpawn = 0
    let nextSpawnDelay = 4000 + Math.random() * 5000
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = width < 768 ? 110 : 240
      stars = Array.from({ length: count }, () => {
        const depth = 0.3 + Math.random() * 0.7
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: depth * (Math.random() * 1.3 + 0.4),
          depth,
          baseAlpha: 0.2 + Math.random() * 0.6,
          twinkleSpeed: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
        }
      })
    }

    const drawStars = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        const twinkle = reduceMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(t * 0.001 * s.twinkleSpeed + s.phase)
        const alpha = s.baseAlpha * twinkle
        // Soft violet-white stars; the brightest get a faint halo
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(226, 217, 255, ${alpha})`
        ctx.fill()
        if (s.r > 1.2) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(192, 132, 252, ${alpha * 0.12})`
          ctx.fill()
        }
        if (!reduceMotion) {
          s.x += 0.012 * s.depth
          s.y -= 0.006 * s.depth
          if (s.x > width + 4) s.x = -4
          if (s.y < -4) s.y = height + 4
        }
      }
    }

    const drawShooting = (t: number, dt: number) => {
      if (reduceMotion) return
      if (t - lastSpawn > nextSpawnDelay && shooting.length < 2) {
        lastSpawn = t
        nextSpawnDelay = 5000 + Math.random() * 7000
        const fromLeft = Math.random() > 0.5
        shooting.push({
          x: fromLeft ? Math.random() * width * 0.4 : width * (0.6 + Math.random() * 0.4),
          y: Math.random() * height * 0.4,
          vx: (fromLeft ? 1 : -1) * (0.45 + Math.random() * 0.35),
          vy: 0.22 + Math.random() * 0.18,
          life: 0,
          maxLife: 900 + Math.random() * 500,
        })
      }
      shooting = shooting.filter((m) => m.life < m.maxLife)
      for (const m of shooting) {
        m.life += dt
        m.x += m.vx * dt
        m.y += m.vy * dt
        const fade = Math.sin((m.life / m.maxLife) * Math.PI)
        const tail = 70
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail)
        grad.addColorStop(0, `rgba(240, 230, 255, ${0.85 * fade})`)
        grad.addColorStop(1, 'rgba(192, 132, 252, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail)
        ctx.stroke()
      }
    }

    let prev = performance.now()
    const loop = (t: number) => {
      const dt = Math.min(t - prev, 50)
      prev = t
      drawStars(t)
      drawShooting(t, dt)
      if (!reduceMotion) raf = requestAnimationFrame(loop)
    }

    seed()
    if (reduceMotion) {
      drawStars(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      seed()
      if (reduceMotion) drawStars(0)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Deep space base with a faint galactic core glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 70% -10%, rgba(76, 29, 149, 0.28) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 10% 100%, rgba(112, 26, 117, 0.22) 0%, transparent 60%), #070312',
        }}
      />

      {/* Drifting nebulae */}
      <div
        className="nebula-blob"
        style={{
          width: '55vw',
          height: '55vw',
          top: '-18%',
          left: '-12%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, transparent 65%)',
          animation: 'nebula-drift-1 46s ease-in-out infinite',
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: '48vw',
          height: '48vw',
          top: '30%',
          right: '-16%',
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, transparent 65%)',
          animation: 'nebula-drift-2 58s ease-in-out infinite',
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: '42vw',
          height: '42vw',
          bottom: '-20%',
          left: '22%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 65%)',
          animation: 'nebula-drift-3 64s ease-in-out infinite',
        }}
      />

      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Post-processing: grain + vignette improve depth and text readability */}
      <div className="post-grain" />
      <div className="post-vignette" />
    </div>
  )
}
