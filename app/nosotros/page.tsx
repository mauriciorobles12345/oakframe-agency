'use client'

import { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/ui/navbar'
import RotatingEarth from '@/components/ui/wireframe-dotted-globe'

const STAR = "#7DDFFF"
const STAR_GLOW = "0 0 12px rgba(125,223,255,0.9), 0 0 30px rgba(125,223,255,0.5), 0 0 60px rgba(125,223,255,0.2)"
const STAR_BOX = "0 0 16px rgba(125,223,255,0.7), 0 0 40px rgba(125,223,255,0.3)"

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function Counter({ prefix = '', value, suffix = '', label, delay = 0, started }: {
  prefix?: string; value: number; suffix?: string; label: string; delay?: number; started: boolean
}) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setGo(true), delay)
    return () => clearTimeout(t)
  }, [started, delay])
  const n = useCountUp(value, 2000, go)
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="text-4xl md:text-5xl font-bold tabular-nums leading-none" style={{ color: STAR, textShadow: STAR_GLOW }}>
        {prefix}{n.toLocaleString('es-MX')}{suffix}
      </div>
      <p className="text-xs uppercase tracking-[0.25em] font-mono" style={{ color: "#3a3a3a" }}>{label}</p>
    </div>
  )
}

export default function NosotrosPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsStarted, setStatsStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ background: "#070707", color: "#e8e8e8" }}>

        {/* ── Statement + Stats ── */}
        <section className="w-full flex flex-col items-center justify-center text-center px-6 pt-44 pb-32">
          <p className="text-xs uppercase tracking-[0.5em] font-mono mb-10" style={{ color: STAR, textShadow: STAR_GLOW }}>
            Puebla, México · Desde 2023
          </p>
          <h1
           
            className="font-bold leading-none mb-6"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              letterSpacing: "-0.03em",
              background: "linear-gradient(160deg, #ffffff 20%, #444 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Somos Oakframe.
          </h1>
          <p className="text-base md:text-lg max-w-md leading-relaxed mb-20" style={{ color: "#444" }}>
            Agencia de diseño web en Puebla. Creamos sitios que convierten visitas en clientes.
          </p>

          {/* Stats inline */}
          <div ref={statsRef} className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <Counter prefix="$" value={94000} suffix="" label="MXN facturado" delay={0} started={statsStarted} />
            <div className="hidden md:block w-px h-10" style={{ background: "#1e1e1e" }} />
            <Counter value={18} suffix="+" label="Clientes atendidos" delay={200} started={statsStarted} />
            <div className="hidden md:block w-px h-10" style={{ background: "#1e1e1e" }} />
            <Counter value={9} prefix="4." suffix=" / 5" label="Satisfacción promedio" delay={400} started={statsStarted} />
          </div>
        </section>

        {/* ── Misión ── */}
        <section className="w-full px-6 py-32" style={{ background: "#0a0a0a" }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.4em] font-mono mb-8" style={{ color: STAR, textShadow: STAR_GLOW }}>Nuestra misión</p>
            <blockquote
              className="font-semibold leading-snug"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#c8c8c8" }}
            >
              "Hacer que tu negocio se vea tan profesional como realmente es."
            </blockquote>
            <p className="text-sm mt-8 leading-relaxed" style={{ color: "#444" }}>
              Muchas empresas pierden clientes porque su web no refleja la calidad de su trabajo.<br />
              Nosotros cambiamos eso.
            </p>
          </div>
        </section>

        {/* ── Globo ── */}
        <section className="w-full px-6 py-24" style={{ background: "#0a0a0a" }}>
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.4em] font-mono mb-4" style={{ color: STAR, textShadow: STAR_GLOW }}>Alcance</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-snug" style={{ color: "#d4d4d4" }}>
                Diseño sin fronteras.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                Trabajamos con clientes en toda la República Mexicana y con marcas internacionales que quieren conectar con el mercado latinoamericano.
              </p>
            </div>
            <div className="flex-shrink-0">
              <RotatingEarth width={320} height={320} />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full px-6 py-32 text-center" style={{ background: "#0a0a0a" }}>
          <p className="text-xs uppercase tracking-[0.5em] font-mono mb-4" style={{ color: STAR, textShadow: STAR_GLOW }}>¿Trabajamos juntos?</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 max-w-lg mx-auto leading-tight" style={{ color: "#c8c8c8" }}>
            Tu proyecto podría ser el siguiente.
          </h2>
          <a
            href="/#contact"
            className="inline-block px-10 py-4 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ background: `linear-gradient(135deg, ${STAR} 0%, #4ab8e8 100%)`, color: "#050c10", boxShadow: STAR_BOX }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(125,223,255,0.9), 0 0 60px rgba(125,223,255,0.4)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = STAR_BOX }}
          >
            Cotiza tu proyecto gratis
          </a>
        </section>

        {/* ── Footer ── */}
        <footer className="px-6 py-10 w-full" style={{ borderTop: "1px solid #1a1a1a", background: "#080808" }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-semibold text-sm" style={{ color: STAR, textShadow: STAR_GLOW }}>Oakframe Agency</span>
            <span className="text-xs" style={{ color: "#3a3a3a" }}>© {new Date().getFullYear()} Oakframe Agency. Todos los derechos reservados.</span>
            <div className="flex items-center gap-4">
              <a href="/aviso-privacidad" className="text-xs hover:text-white/60 transition-colors" style={{ color: "#3a3a3a" }}>Aviso de privacidad</a>
              <span className="text-xs" style={{ color: "#3a3a3a" }}>Puebla, México</span>
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}
