'use client'

import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Single elements: subtle fade up
      ScrollTrigger.batch('[data-reveal]', {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out', overwrite: true }
          ),
        once: true,
        start: 'top 92%',
      })

      // Staggered children: cards, grids
      ScrollTrigger.batch('[data-reveal-stagger] > *', {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: 'power2.out', overwrite: true }
          ),
        once: true,
        start: 'top 92%',
      })

      // Fade-only (images, decorative)
      ScrollTrigger.batch('[data-reveal-fade]', {
        onEnter: (batch) =>
          gsap.fromTo(batch,
            { opacity: 0 },
            { opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power1.out', overwrite: true }
          ),
        once: true,
        start: 'top 92%',
      })

      cleanup = () => {
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }

    init()
    return () => { cleanup?.() }
  }, [])
}
