import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

varying vec2 v_uv;

float PHI = 1.61803398874989484820459;
float random(vec2 xy) {
  return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
}

void main() {
  vec2 st = v_uv * u_resolution;
  st.x -= abs(floor((mod(u_resolution.x, 30.0) - 2.0) * 0.5));
  st.y -= abs(floor((mod(u_resolution.y, 30.0) - 2.0) * 0.5));

  float opacity = step(0.0, st.x) * step(0.0, st.y);
  vec2 st2 = vec2(int(st.x / 30.0), int(st.y / 30.0));

  float frequency = 4.0;
  float show_offset = random(st2);
  float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));

  float baseOpacity = opacity * (0.05 + 0.15 * rand);
  baseOpacity *= 1.0 - step(2.0 / 30.0, fract(st.x / 30.0));
  baseOpacity *= 1.0 - step(2.0 / 30.0, fract(st.y / 30.0));

  // Mouse reveal
  vec2 mouse = u_mouse * u_resolution;
  float dist = distance(st2 * 30.0 + 15.0, mouse);
  float mouseGlow = smoothstep(250.0, 0.0, dist);

  vec3 color = vec3(0.0, 0.71, 0.85);
  vec3 finalColor = color * (baseOpacity + mouseGlow * 0.25);

  gl_FragColor = vec4(finalColor, baseOpacity + mouseGlow * 0.35);
}
`

interface CanvasRevealProps {
  className?: string
}

export function CanvasReveal({ className = '' }: CanvasRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      u_resolution: { value: new THREE.Vector2(window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio()) },
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth
      targetMouseRef.current.y = 1.0 - e.clientY / window.innerHeight
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.u_resolution.value.set(window.innerWidth * dpr, window.innerHeight * dpr)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    let lastTime = performance.now()
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const now = performance.now()
      const delta = (now - lastTime) / 1000
      lastTime = now

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08

      uniforms.u_time.value += delta
      uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
