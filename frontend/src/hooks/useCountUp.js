import { useEffect, useRef, useState } from 'react'

/** Smoothly counts from the previous value to `target`. */
export default function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(target)
  const prev = useRef(target)

  useEffect(() => {
    const from = prev.current
    if (from === target) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      prev.current = target
      setValue(target)
      return undefined
    }
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else prev.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}
