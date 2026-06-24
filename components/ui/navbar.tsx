'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const STAR = '#7DDFFF'
const STAR_GLOW = '0 0 12px rgba(125,223,255,0.9), 0 0 30px rgba(125,223,255,0.5)'

const links = ['Servicios', 'Trabajo', 'Contacto']

const idMap: Record<string, string> = {
  servicios: 'services',
  trabajo: 'work',
  contacto: 'contact',
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (id: string) => {
    setOpen(false)
    if (pathname !== '/') {
      router.push(`/#${idMap[id.toLowerCase()] ?? id.toLowerCase()}`)
      return
    }
    const target = idMap[id.toLowerCase()] ?? id.toLowerCase()
    setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[70] transition-all duration-300',
          scrolled || open ? 'bg-black/90 backdrop-blur border-b border-white/10' : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Oakframe Agency"
              width={64}
              height={64}
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
            <a
              href="/nosotros"
              className={cn(
                'text-sm transition-colors',
                pathname === '/nosotros' ? 'text-[#7DDFFF]' : 'text-white/60 hover:text-white'
              )}
            >
              Nosotros
            </a>
            <a
              href="https://www.instagram.com/oakframeagency/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <button
              onClick={() => scrollTo('Contacto')}
              className="text-sm bg-white text-black px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
            >
              Cotiza tu proyecto
            </button>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: 'white',
                transform: open ? 'translateY(4px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: 'white',
                opacity: open ? 0 : 1,
                transform: open ? 'scaleX(0)' : 'scaleX(1)',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: 'white',
                transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-[60] md:hidden flex flex-col transition-all duration-300"
        style={{
          background: '#070707',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 pb-16">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-2xl font-semibold text-white/60 hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
          <a
            href="/nosotros"
            onClick={() => setOpen(false)}
            className="text-2xl font-semibold transition-colors"
            style={{ color: pathname === '/nosotros' ? STAR : 'rgba(255,255,255,0.6)' }}
          >
            Nosotros
          </a>
          <div className="w-8 h-px my-2" style={{ background: '#1e1e1e' }} />
          <a
            href="https://www.instagram.com/oakframeagency/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <button
            onClick={() => scrollTo('Contacto')}
            className="mt-4 px-8 py-3 rounded-full text-sm font-semibold"
            style={{ background: `linear-gradient(135deg, ${STAR} 0%, #4ab8e8 100%)`, color: '#050c10' }}
          >
            Cotiza tu proyecto
          </button>
        </div>
      </div>
    </>
  )
}
