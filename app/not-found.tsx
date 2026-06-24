'use client'

const STAR = '#7DDFFF'
const STAR_GLOW = '0 0 12px rgba(125,223,255,0.9), 0 0 30px rgba(125,223,255,0.5), 0 0 60px rgba(125,223,255,0.2)'
const STAR_BOX = '0 0 16px rgba(125,223,255,0.7), 0 0 40px rgba(125,223,255,0.3)'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#070707', color: '#e8e8e8' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(125,223,255,0.05) 0%, transparent 70%)' }}
      />

      <p className="text-xs uppercase tracking-[0.4em] font-mono mb-6" style={{ color: STAR, textShadow: STAR_GLOW }}>
        Error 404
      </p>

      <h1
        className="font-bold leading-none mb-4"
        style={{
          fontSize: 'clamp(6rem, 20vw, 14rem)',
          letterSpacing: '-0.04em',
          background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        404
      </h1>

      <p className="text-base max-w-xs leading-relaxed mb-10" style={{ color: '#444' }}>
        Esta página no existe o fue movida a otra dirección.
      </p>

      <a
        href="/"
        className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300"
        style={{ background: `linear-gradient(135deg, ${STAR} 0%, #4ab8e8 100%)`, color: '#050c10', boxShadow: STAR_BOX }}
      >
        Volver al inicio
      </a>

      <span className="absolute bottom-8 text-xs font-mono" style={{ color: '#2a2a2a' }}>
        Oakframe Agency
      </span>
    </main>
  )
}
