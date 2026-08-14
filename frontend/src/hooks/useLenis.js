import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance = null

/** Access the active Lenis instance from anywhere (e.g. Navbar anchor nav). */
export function getLenis() {
  return lenisInstance
}

/**
 * Creates a single global Lenis smooth-scroll instance and wires it to
 * GSAP ScrollTrigger. Pass `enabled: false` (e.g. reduced motion) to skip.
 */
export default function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      lerp: 0.1,
    })
    lenisInstance = lenis

    // Keep ScrollTrigger in sync with Lenis' smoothed scroll position.
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor navigation — let Lenis scroll to the target instead of jumping.
    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -72 })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}
