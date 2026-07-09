'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animates every element with the `data-reveal` attribute inside the given
 * container as it scrolls into view (GSAP ScrollTrigger replacement for the
 * old IntersectionObserver `.reveal` pattern).
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scope.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      items.forEach((el) => {
        if (prefersReduced) {
          gsap.set(el, { opacity: 1, y: 0 })
          return
        }
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })
    }, scope)

    // Recalculate positions once fonts/layout settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [scope])
}
