import { useEffect, useRef, useState } from 'react'

/**
 * Observes an element and reports when it enters the viewport.
 * Used for light, class-based reveals (text reveal, fade helpers).
 */
export default function useScrollAnimation({ threshold = 0.25, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      setInView(true)
      return undefined
    }
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, inView }
}
