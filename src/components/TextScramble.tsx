import { useEffect, useRef, useCallback, useState } from 'react'

const chars = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

interface TextScrambleProps {
  text: string
  className?: string
  triggerOnView?: boolean
}

export default function TextScramble({ text, className, triggerOnView = true }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const scramble = useCallback(() => {
    let iteration = 0
    const totalIterations = text.length * 3
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration / 3) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration += 1
      if (iteration >= totalIterations) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, 30)
  }, [text])

  useEffect(() => {
    if (!triggerOnView || !ref.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          scramble()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [text, triggerOnView, scramble])

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  )
}
