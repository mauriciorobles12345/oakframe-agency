"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain-oak {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-oak {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(125,223,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(125,223,255,0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-oak {
    color: #e8e8e8;
    text-shadow: 0 10px 30px rgba(125,223,255,0.15), 0 2px 4px rgba(0,0,0,0.5);
  }

  .text-silver-oak {
    background: linear-gradient(180deg, #ffffff 0%, #888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0px 10px 20px rgba(125,223,255,0.2)) drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
  }

  .text-card-silver-oak {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .oak-depth-card {
    background: #080808;
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(125,223,255,0.08),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(125,223,255,0.08);
    position: relative;
  }

  .oak-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(125,223,255,0.04) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .oak-device-bezel {
    background-color: #0a0a0a;
    box-shadow:
      inset 0 0 0 2px #2a2a2a,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }

  .oak-hardware-btn {
    background: linear-gradient(90deg, #2a2a2a 0%, #111 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.08), inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.03);
  }

  .oak-screen-glare {
    background: linear-gradient(110deg, rgba(125,223,255,0.05) 0%, rgba(255,255,255,0) 45%);
  }

  .oak-widget-depth {
    background: linear-gradient(180deg, rgba(125,223,255,0.03) 0%, rgba(0,0,0,0.2) 100%);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(125,223,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(125,223,255,0.06);
  }

  .oak-floating-badge {
    background: linear-gradient(135deg, rgba(125,223,255,0.06) 0%, rgba(0,0,0,0.4) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(125,223,255,0.12), 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(125,223,255,0.1);
  }

  .oak-btn-primary {
    background: linear-gradient(135deg, #7DDFFF 0%, #4ab8e8 100%);
    color: #050c10;
    box-shadow: 0 0 16px rgba(125,223,255,0.5), 0 0 40px rgba(125,223,255,0.2), inset 0 1px 1px rgba(255,255,255,0.4);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .oak-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 24px rgba(125,223,255,0.9), 0 0 60px rgba(125,223,255,0.4);
  }
  .oak-btn-primary:active { transform: translateY(1px); }

  .oak-btn-secondary {
    background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
    color: #e8e8e8;
    box-shadow: 0 0 0 1px rgba(125,223,255,0.15), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(125,223,255,0.1);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .oak-btn-secondary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px rgba(125,223,255,0.3), 0 20px 32px -6px rgba(0,0,0,1);
    color: #7DDFFF;
  }
  .oak-btn-secondary:active { transform: translateY(1px); }

`;

export function CinematicHero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".oak-text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".oak-text-sub", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".oak-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".oak-card-left", ".oak-card-right", ".oak-mockup-wrapper", ".oak-floating-badge", ".oak-phone-widget"], { autoAlpha: 0 });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".oak-text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".oak-text-sub", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          pinReparent: true,
          onLeave: () => {
            if (containerRef.current) containerRef.current.style.height = "0";
          },
          onEnterBack: () => {
            if (containerRef.current) containerRef.current.style.height = "100vh";
          },
        },
      });

      scrollTl
        // Fase 1: texto desaparece y tarjeta sube — en paralelo, sin expansión todavía
        .to([".oak-hero-text", ".bg-grid-oak"], { filter: "blur(20px)", opacity: 0, ease: "power2.out", duration: 1.5 }, 0)
        .to(".oak-main-card", { y: 0, ease: "power3.out", duration: 1.5 }, 0)
        // Fase 2: tarjeta ya centrada, ahora se expande a pantalla completa
        .to(".oak-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        // Fase 3: contenido del teléfono entra
        .fromTo(".oak-mockup-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=1.4"
        )
        .fromTo(".oak-phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .fromTo(".oak-floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".oak-card-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".oak-card-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 0.5 })
        // Fase 4: todo sale y la tarjeta sube fuera de pantalla
        .to([".oak-mockup-wrapper", ".oak-floating-badge", ".oak-card-left", ".oak-card-right"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.0, stagger: 0.05,
        })
        .to(".oak-main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.2 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen flex items-center justify-center font-sans antialiased", className)}
      style={{ background: "#080808", perspective: "1500px", zIndex: 30, position: "relative" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      <div className="bg-grid-oak absolute inset-0 z-0 pointer-events-none opacity-0" aria-hidden="true" />

      {/* Hero text */}
      <div className="oak-hero-text absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 pb-8">
        <h1 className="oak-text-track gsap-reveal text-3d-oak text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          Más visitas. Más clientes.
        </h1>
        <h1 className="oak-text-sub gsap-reveal text-silver-oak text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter" style={{ lineHeight: 1.4, paddingBottom: '0.2em' }}>
          Más ventas.
        </h1>
      </div>

      {/* Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="oak-main-card oak-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="oak-card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Right: Brand name — vertical */}
            <div className="oak-card-right gsap-reveal order-1 lg:order-3 hidden lg:flex justify-end items-center z-20 w-full h-full overflow-hidden">
              <h2
                className="text-[5rem] font-black uppercase tracking-widest text-card-silver-oak select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", opacity: 0.18, letterSpacing: "0.2em" }}
              >
                Oakframe
              </h2>
            </div>

            {/* Center: Device mockup */}
            <div className="oak-mockup-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                <div ref={mockupRef} className="relative w-[280px] h-[580px] rounded-[3rem] oak-device-bezel flex flex-col will-change-transform">
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] oak-hardware-btn rounded-l-md z-0" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] oak-hardware-btn rounded-l-md z-0" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] oak-hardware-btn rounded-l-md z-0" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] oak-hardware-btn rounded-r-md z-0" />

                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden text-white z-10">
                    <div className="absolute inset-0 oak-screen-glare z-40 pointer-events-none" />
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7DDFFF] shadow-[0_0_8px_rgba(125,223,255,0.8)] animate-pulse" />
                    </div>

                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="oak-phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#7DDFFF" }}>Oakframe</span>
                          <span className="text-xl font-bold tracking-tight text-white">Agency</span>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border" style={{ background: "rgba(125,223,255,0.08)", borderColor: "rgba(125,223,255,0.2)", color: "#7DDFFF" }}>OA</div>
                      </div>

                      {/* Métrica principal — ventas */}
                      <div className="oak-phone-widget mb-5 rounded-2xl p-4 oak-widget-depth">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "rgba(125,223,255,0.5)" }}>Ventas este mes</span>
                          <span className="text-[9px] font-bold" style={{ color: "#7DDFFF" }}>↑ +143%</span>
                        </div>
                        <div className="flex items-end gap-1 h-12">
                          {[30, 45, 35, 60, 50, 75, 95].map((h, i) => (
                            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 6 ? "#7DDFFF" : "rgba(125,223,255,0.2)" }} />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {/* Métrica clientes */}
                        <div className="oak-phone-widget oak-widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 flex-shrink-0" style={{ background: "rgba(125,223,255,0.08)", border: "1px solid rgba(125,223,255,0.15)" }}>
                            <svg className="w-4 h-4" style={{ color: "#7DDFFF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-semibold">32 nuevos clientes</p>
                            <p className="text-[9px]" style={{ color: "rgba(125,223,255,0.4)" }}>este mes</p>
                          </div>
                        </div>
                        {/* Métrica calificación */}
                        <div className="oak-phone-widget oak-widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 flex-shrink-0" style={{ background: "rgba(125,223,255,0.08)", border: "1px solid rgba(125,223,255,0.15)" }}>
                            <svg className="w-4 h-4" style={{ color: "#7DDFFF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-semibold">4.9 / 5.0 ⭐</p>
                            <p className="text-[9px]" style={{ color: "rgba(125,223,255,0.4)" }}>calificación promedio</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="oak-floating-badge absolute flex top-[38%] left-[-15px] lg:left-[-90px] rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(125,223,255,0.1)", border: "1px solid rgba(125,223,255,0.2)" }}>
                    <span className="text-base lg:text-xl">✦</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Proyecto lanzado</p>
                    <p className="text-[10px] lg:text-xs font-medium" style={{ color: "rgba(125,223,255,0.5)" }}>En tiempo y forma</p>
                  </div>
                </div>

                <div className="oak-floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(125,223,255,0.1)", border: "1px solid rgba(125,223,255,0.2)" }}>
                    <span className="text-base lg:text-lg">🎯</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Diseño aprobado</p>
                    <p className="text-[10px] lg:text-xs font-medium" style={{ color: "rgba(125,223,255,0.5)" }}>Primera revisión</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left: Text */}
            <div className="oak-card-left gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:pl-0 lg:pr-16">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                Diseño que convierte.
              </h3>
              <p className="hidden md:block text-sm md:text-base lg:text-lg font-normal leading-relaxed" style={{ color: "rgba(125,223,255,0.5)" }}>
                <span className="text-white font-semibold">Oakframe Agency</span> diseña y desarrolla sitios web que elevan tu marca, generan confianza y convierten visitantes en clientes reales.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
