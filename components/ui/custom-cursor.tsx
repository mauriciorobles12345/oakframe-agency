'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.opacity = '0.6'
      dot.style.opacity = '0'
    }
    const onLeaveLink = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.opacity = '0.35'
      dot.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    // Scale up ring on interactive elements
    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    addListeners()

    // Re-apply on DOM changes (dynamic content)
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7DDFFF', boxShadow: '0 0 6px rgba(125,223,255,0.8)' }} />
      </div>

      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-200"
        style={{ willChange: 'transform', width: 32, height: 32 }}
      >
        <div className="w-full h-full rounded-full" style={{ border: '1px solid rgba(125,223,255,0.35)', opacity: 0.35 }} />
      </div>
    </>
  )
}
