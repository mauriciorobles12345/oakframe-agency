"use client";

import { GLSLHills } from "@/components/ui/glsl-hills";
import { SplineScene } from "@/components/ui/splite";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Navbar } from "@/components/ui/navbar";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { WavePath } from "@/components/ui/wave-path";
import { useRef, useState } from "react";

const STAR = "#7DDFFF";
const STAR_GLOW = "0 0 12px rgba(125,223,255,0.9), 0 0 30px rgba(125,223,255,0.5), 0 0 60px rgba(125,223,255,0.2)";
const STAR_BOX  = "0 0 16px rgba(125,223,255,0.7), 0 0 40px rgba(125,223,255,0.3)";

const services = [
  { number: "01", title: "Diseño Web", description: "Interfaces pixel-perfect diseñadas alrededor de tus usuarios. Diseñamos con claridad, jerarquía e intención — cada detalle tiene un propósito." },
  { number: "02", title: "Desarrollo Web", description: "Sitios rápidos, accesibles y escalables construidos con tecnologías modernas. Desde landing pages hasta apps complejas, entregamos código listo para producción." },
  { number: "03", title: "Branding", description: "Identidades visuales que perduran. Logos, tipografías, paletas de color y guías de marca que te hacen inconfundible." },
  { number: "04", title: "E-commerce", description: "Tiendas en línea enfocadas en conversión. Creamos experiencias de compra fluidas que convierten visitantes en clientes." },
];

const projects = [
  { title: "Lumina Studio", category: "Diseño Web · Branding", image: "/lumina.png" },
  { title: "Verdant Co.", category: "E-commerce · Desarrollo", image: "/verdant.png" },
  { title: "Arcform", category: "Diseño Web · Desarrollo", image: "/arcform.png" },
  { title: "Solstice", category: "Branding · Diseño Web", image: "/solstice.png" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.4em] mb-3 font-mono" style={{ color: STAR, textShadow: STAR_GLOW }}>
      {children}
    </p>
  );
}

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const selectPackage = (pkg: string) => {
    setSelectedPackage(pkg);
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const form = formRef.current!;
    const data = new FormData(form);

    const nombre  = data.get('nombre')  as string;
    const email   = data.get('email')   as string;
    const servicio = data.get('servicio') as string;
    const mensaje = data.get('mensaje') as string;

    // ── Enviar email vía Formspree ──
    try {
      const res = await fetch('https://formspree.io/f/xykaqbyl', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error();
    } catch {
      setError(true);
      setSending(false);
      return;
    }


    setSending(false);
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <Navbar />
      <WhatsAppButton />

      <main className="flex flex-col" style={{ background: "#070707", color: "#e8e8e8", width: "100%" }}>

        {/* ── Hero ── */}
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(125,223,255,0.05) 0%, transparent 70%)" }} />
          <GLSLHills />
          <div className="space-y-6 pointer-events-none z-10 text-center absolute px-4">
            <p className="text-xs uppercase tracking-[0.4em] font-mono" style={{ color: STAR, textShadow: STAR_GLOW }}>
              Oakframe Agency
            </p>
            <h1 className="font-semibold leading-tight" style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}>
              <span className="block italic font-thin mb-1" style={{ fontSize: "clamp(2rem,5.5vw,4rem)", background: "linear-gradient(135deg, #888 0%, #d0d0d0 50%, #aaa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                La primera impresión
              </span>
              <span style={{ background: "linear-gradient(180deg, #ffffff 0%, #c8c8c8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                que no se olvida.
              </span>
            </h1>
            <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: "#555" }}>
              Diseñamos y desarrollamos sitios web que elevan tu marca y convierten visitantes en clientes.
            </p>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <span className="text-xs tracking-widest uppercase font-mono" style={{ color: STAR, textShadow: STAR_GLOW, opacity: 0.6 }}>Desliza</span>
            <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${STAR}, transparent)`, boxShadow: `0 0 8px ${STAR}` }} />
          </div>
        </section>

        {/* ── Cinematic Hero ── */}
        <div style={{ position: "relative", zIndex: 40, isolation: "isolate" }}>
          <CinematicHero />
        </div>

        {/* ── 3D Showcase ── */}
        <section className="flex w-full items-center justify-center px-6 pb-24 pt-0" style={{ background: "#0a0a0a" }}>
          <Card className="w-full max-w-5xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, #111 0%, #0d0d0d 100%)", border: `1px solid rgba(125,223,255,0.12)`, boxShadow: `0 0 40px rgba(125,223,255,0.04)`, minHeight: 320 }}>
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill={STAR} />
            <div className="flex flex-col md:flex-row" style={{ minHeight: 320 }}>
              <div className="flex-1 p-8 md:p-10 relative z-10 flex flex-col justify-center">
                <SectionLabel>Lo que creamos</SectionLabel>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ background: "linear-gradient(160deg, #ffffff 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Experiencias<br />Interactivas
                </h2>
                <p className="mt-4 text-sm leading-relaxed max-w-sm" style={{ color: "#555" }}>
                  Del 3D inmersivo a las interfaces más refinadas — redefinimos lo que un sitio web puede sentirse.
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <div className="h-px w-8" style={{ background: STAR, boxShadow: `0 0 6px ${STAR}` }} />
                  <span className="text-xs tracking-widest uppercase font-mono" style={{ color: STAR, textShadow: STAR_GLOW }}>Oakframe</span>
                </div>
              </div>
              <div className="flex-1 relative" style={{ minHeight: 300, height: 300 }}>
                <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
              </div>
            </div>
          </Card>
        </section>

        {/* ── Servicios ── */}
        <section id="services" className="w-full px-6 py-24" style={{ background: "#0d0d0d" }}>
          <div className="max-w-6xl mx-auto mb-16">
            <SectionLabel>Lo que hacemos</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Nuestros Servicios
            </h2>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "#222" }}>
            {services.map((s) => (
              <div key={s.number} className="group p-8 transition-all duration-300 cursor-default" style={{ background: "#111" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#141414")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
              >
                <span className="font-mono text-xs" style={{ color: STAR, textShadow: STAR_GLOW }}>{s.number}</span>
                <h3 className="mt-4 text-xl font-semibold" style={{ color: "#d4d4d4" }}>{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>{s.description}</p>
                <div className="mt-6 h-px w-0 group-hover:w-12 transition-all duration-500" style={{ background: `linear-gradient(to right, ${STAR}, transparent)`, boxShadow: `0 0 6px ${STAR}` }} />
              </div>
            ))}
          </div>
          <div className="h-px w-full mt-px" style={{ background: "#222" }} />
        </section>

        {/* ── Precios ── */}
        <section id="pricing" className="w-full px-6 py-24" style={{ background: "#080808" }}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <SectionLabel>Inversión</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-semibold" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Paquetes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Esencial */}
              <div className="relative rounded-2xl p-6 flex flex-col" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "#c8c8c8" }}>Esencial</p>
                <p className="text-xs mb-5 leading-relaxed" style={{ color: "#444" }}>Tu negocio online, profesional desde el día uno.</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold" style={{ color: "#e8e8e8" }}>$5,500</span>
                  <span className="text-xs" style={{ color: "#444" }}>MXN</span>
                </div>
                <p className="text-xs mb-5" style={{ color: "#2a2a2a" }}>Pago único · entrega en 48 hrs</p>
                <div className="space-y-2.5 flex-1 mb-6" style={{ borderTop: "1px solid #1a1a1a", paddingTop: "1.25rem" }}>
                  {[
                    ["Landing page", "de una página"],
                    ["Diseño", "personalizado para tu marca"],
                    ["Responsive", "móvil, tablet y desktop"],
                    ["Dominio + Hosting", "1 año incluido"],
                    ["Soporte", "por correo"],
                  ].map(([bold, rest]) => (
                    <div key={bold} className="flex items-start gap-2.5">
                      <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: STAR }}>✓</span>
                      <span className="text-xs" style={{ color: "#555" }}><strong style={{ color: "#888", fontWeight: 600 }}>{bold}</strong> {rest}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => selectPackage("Esencial — $5,500 MXN")}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
                  style={{ background: "transparent", border: "1px solid #2a2a2a", color: "#555" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(125,223,255,0.3)"; e.currentTarget.style.color = STAR; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#555"; }}
                >
                  Empezar con Esencial
                </button>
              </div>

              {/* Profesional — destacado */}
              <div className="relative rounded-2xl p-6 flex flex-col" style={{ background: "#0a0a0a", border: `1px solid rgba(125,223,255,0.2)`, boxShadow: `0 0 50px rgba(125,223,255,0.05)` }}>
                <div className="absolute -top-3 left-6">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: STAR, color: "#050c10" }}>Más popular</span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: STAR, textShadow: STAR_GLOW }}>Profesional</p>
                <p className="text-xs mb-5 leading-relaxed" style={{ color: "#444" }}>El punto perfecto entre precio y resultado.</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold" style={{ color: "#e8e8e8" }}>$9,000</span>
                  <span className="text-xs" style={{ color: "#444" }}>MXN</span>
                </div>
                <p className="text-xs mb-5" style={{ color: "#2a2a2a" }}>Pago único · entrega en 5 días</p>
                <div className="space-y-2.5 flex-1 mb-6" style={{ borderTop: "1px solid #1e1e1e", paddingTop: "1.25rem" }}>
                  {[
                    ["Sitio web completo", "hasta 5 secciones"],
                    ["Diseño", "personalizado para tu marca"],
                    ["Responsive", "móvil, tablet y desktop"],
                    ["Dominio + Hosting", "1 año incluido"],
                    ["Animaciones", "incluidas"],
                    ["SEO", "optimizado para Google"],
                    ["Soporte", "2 semanas post-entrega"],
                  ].map(([bold, rest]) => (
                    <div key={bold} className="flex items-start gap-2.5">
                      <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: STAR }}>✓</span>
                      <span className="text-xs" style={{ color: "#666" }}><strong style={{ color: "#aaa", fontWeight: 600 }}>{bold}</strong> {rest}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => selectPackage("Profesional — $9,000 MXN")}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${STAR} 0%, #4ab8e8 100%)`, color: "#050c10", boxShadow: STAR_BOX }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(125,223,255,0.9), 0 0 60px rgba(125,223,255,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = STAR_BOX; }}
                >
                  Elegir Profesional
                </button>
              </div>

              {/* Premium */}
              <div className="relative rounded-2xl p-6 flex flex-col" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "#c8c8c8" }}>Premium</p>
                <p className="text-xs mb-5 leading-relaxed" style={{ color: "#444" }}>Web exclusiva con branding completo y presencia total.</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold" style={{ color: "#e8e8e8" }}>$13,500</span>
                  <span className="text-xs" style={{ color: "#444" }}>MXN</span>
                </div>
                <p className="text-xs mb-5" style={{ color: "#2a2a2a" }}>Pago único · entrega en 10 días</p>
                <div className="space-y-2.5 flex-1 mb-6" style={{ borderTop: "1px solid #1a1a1a", paddingTop: "1.25rem" }}>
                  {[
                    ["Sitio web", "completo a medida"],
                    ["Diseño exclusivo", "desde cero para tu marca"],
                    ["Responsive", "móvil, tablet y desktop"],
                    ["Dominio + Hosting", "1 año incluido"],
                    ["Animaciones avanzadas", "incluidas"],
                    ["Branding + Logo", "identidad visual completa"],
                    ["SEO avanzado", "estrategia y optimización"],
                    ["Soporte", "1 mes post-entrega"],
                  ].map(([bold, rest]) => (
                    <div key={bold} className="flex items-start gap-2.5">
                      <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: STAR }}>✓</span>
                      <span className="text-xs" style={{ color: "#555" }}><strong style={{ color: "#888", fontWeight: 600 }}>{bold}</strong> {rest}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => selectPackage("Premium — $13,500 MXN")}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
                  style={{ background: "transparent", border: "1px solid #2a2a2a", color: "#555" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(125,223,255,0.3)"; e.currentTarget.style.color = STAR; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#555"; }}
                >
                  Elegir Premium
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ── Portafolio ── */}
        <section id="work" className="w-full px-6 py-24" style={{ background: "#0d0d0d" }}>
          <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Proyectos seleccionados</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Nuestro Trabajo
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <div key={p.title} className="group cursor-pointer">
                <div
                  className="overflow-hidden rounded-2xl aspect-[3/2] relative"
                  style={{ background: "#141414" }}
                  onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) { img.style.filter = "brightness(1) saturate(1)"; img.style.transform = "scale(1.03)"; } e.currentTarget.style.background = "#1a1a1a"; }}
                  onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) { img.style.filter = "brightness(0.3) saturate(0.3)"; img.style.transform = "scale(1)"; } e.currentTarget.style.background = "#141414"; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain transition-all duration-500" style={{ filter: "brightness(0.3) saturate(0.3)" }} />
                </div>
                <div className="mt-4 flex items-center justify-between px-1">
                  <h3 className="font-semibold" style={{ color: "#c8c8c8" }}>{p.title}</h3>
                  <span className="text-xs" style={{ color: "#3a3a3a" }}>{p.category}</span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ── Proceso ── */}
        <section className="w-full px-6 py-24" style={{ background: "#080808" }}>
          <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Cómo trabajamos</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Proceso
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { n: "01", title: "Cotización", desc: "Nos cuentas tu idea. En menos de 24 hrs te respondemos con una propuesta." },
              { n: "02", title: "Diseño", desc: "Creamos el diseño de tu sitio y te lo mostramos antes de programar nada." },
              { n: "03", title: "Desarrollo", desc: "Una vez aprobado el diseño, construimos tu sitio web funcional y optimizado." },
              { n: "04", title: "Entrega", desc: "Tu sitio queda en línea con dominio, hosting y todo configurado." },
            ].map((step, i) => (
              <div key={step.n} className="relative rounded-2xl p-6" style={{ background: i % 2 === 0 ? "#0d0d0d" : "#111", border: "1px solid #1e1e1e" }}>
                {i < 3 && <div className="hidden md:block absolute top-4 left-full w-full h-px" style={{ background: "linear-gradient(to right, #2a2a2a, transparent)" }} />}
                <span className="font-mono text-xs mb-4 block" style={{ color: STAR, textShadow: STAR_GLOW }}>{step.n}</span>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#d4d4d4" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{step.desc}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ── CTA Intermedio ── */}
        <section className="w-full px-6 py-16" style={{ background: "#111" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.4em] font-mono mb-4" style={{ color: STAR, textShadow: STAR_GLOW }}>¿Listo?</p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ color: "#c8c8c8" }}>Tu sitio web en 48 horas desde <span style={{ color: STAR }}>$5,500 MXN</span></h2>
            <button onClick={() => selectPackage("")}
              className="px-10 py-4 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${STAR} 0%, #4ab8e8 100%)`, color: "#050c10", boxShadow: STAR_BOX }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(125,223,255,0.9), 0 0 60px rgba(125,223,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = STAR_BOX; }}
            >
              Cotiza tu proyecto gratis
            </button>
          </div>
        </section>

        {/* ── Testimonios ── */}
        <section className="w-full px-6 py-24" style={{ background: "#0a0a0a" }}>
          <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Lo que dicen</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Testimonios
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Carlos M.", role: "Dueño de restaurante", text: "En menos de 48 horas tenía mi página lista. Mis clientes ahora nos encuentran fácilmente en Google y han aumentado las reservaciones.", bg: "#0d0d0d" },
              { name: "Sofía R.", role: "Terapeuta independiente", text: "El diseño quedó exactamente como lo imaginaba. Profesional, elegante y muy fácil de usar. Totalmente recomendado.", bg: "#111" },
              { name: "Diego L.", role: "Fotógrafo profesional", text: "Necesitaba un portafolio que realmente mostrara mi trabajo. Oakframe lo entendió desde el primer momento. Excelente resultado.", bg: "#0d0d0d" },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: t.bg, border: "1px solid #222" }}>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#666" }}>"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid #1e1e1e" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(125,223,255,0.08)", color: STAR, border: "1px solid rgba(125,223,255,0.15)" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#c8c8c8" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#333" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full px-6 py-24" style={{ background: "#0d0d0d" }}>
          <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Dudas frecuentes</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Preguntas
            </h2>
          </div>
          <div className="space-y-2">
            {[
              { q: "¿Qué necesito para empezar?", a: "Solo contarnos sobre tu negocio, qué quieres mostrar en tu web y tus colores o preferencias de diseño. Nosotros nos encargamos del resto." },
              { q: "¿Cómo es el proceso de pago?", a: "Pedimos el 50% al inicio del proyecto y el 50% restante al entregar el sitio terminado." },
              { q: "¿Puedo pedir cambios al diseño?", a: "Sí. Antes de programar te mostramos el diseño y puedes pedir los ajustes que necesites sin costo adicional." },
              { q: "¿Qué pasa si necesito cambios después de la entrega?", a: "Dependiendo del paquete tienes un período de soporte incluido. Después de eso los cambios se cotizan por separado según lo que necesites." },
              { q: "¿Mi página va a aparecer en Google?", a: "Sí. Todos los sitios los entregamos con SEO básico configurado para que Google los pueda encontrar e indexar correctamente." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e1e1e" }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer transition-all duration-200"
                  style={{ background: openFaq === i ? "#111" : (i % 2 === 0 ? "#0a0a0a" : "#0d0d0d"), color: openFaq === i ? "#e8e8e8" : "#666" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium">{item.q}</span>
                  <span className="text-lg ml-4 flex-shrink-0 transition-transform duration-300" style={{ color: STAR, transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4" style={{ background: "#111" }}>
                    <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ── Wave / Frase ── */}
        <section className="relative w-full flex flex-col items-center justify-center py-32 overflow-hidden" style={{ background: "#0d0d0d" }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full blur-[30px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(125,223,255,0.06), transparent 50%)" }}
          />
          <div className="flex w-[70vw] flex-col items-end">
            <WavePath className="mb-10" style={{ color: STAR }} />
            <div className="flex w-full flex-col items-end">
              <div className="flex justify-end">
                <p className="mt-2 text-sm font-mono" style={{ color: STAR, textShadow: STAR_GLOW }}>
                  Oakframe Agency
                </p>
                <p className="ml-8 w-3/4 text-2xl md:text-4xl font-semibold leading-snug" style={{ color: "#c8c8c8" }}>
                  Cada proyecto es una oportunidad de crear algo que perdure. Diseñamos con propósito y construimos con precisión.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contacto ── */}
        <section id="contact" className="w-full px-6 py-32 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
          <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(125,223,255,0.04) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel>Hablemos</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight" style={{ background: "linear-gradient(160deg, #e8e8e8 0%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ¿Listo para crear<br />algo extraordinario?
              </h2>
              <p className="mt-6 text-sm leading-relaxed max-w-sm" style={{ color: "#444" }}>
                Cuéntanos sobre tu proyecto y te respondemos en menos de 24 horas.
              </p>
              <div className="mt-10 space-y-3">
                <a href="mailto:mrobles12642@icloud.com" className="text-sm transition-colors duration-200 hover:text-[#7DDFFF] block" style={{ color: "#3a3a3a" }}>
                  mrobles12642@icloud.com
                </a>
                <a href="https://www.instagram.com/oakframeagency/" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-200 hover:text-[#7DDFFF] flex items-center gap-2" style={{ color: "#3a3a3a" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @oakframeagency
                </a>
                <p className="text-sm" style={{ color: "#3a3a3a" }}>Ubicados en Puebla, México</p>
              </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Nombre", name: "nombre", type: "text", placeholder: "Tu nombre" }, { label: "Email", name: "email", type: "email", placeholder: "tu@email.com" }].map((f) => (
                  <div key={f.label} className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest" style={{ color: "#333" }}>{f.label}</label>
                    <input required type={f.type} name={f.name} placeholder={f.placeholder}
                      className="rounded-lg px-4 py-3 text-sm focus:outline-none transition-all duration-200"
                      style={{ background: "#111", border: "1px solid #1e1e1e", color: "#c8c8c8" }}
                      onFocus={e => { e.currentTarget.style.borderColor = "rgba(125,223,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(125,223,255,0.15)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest" style={{ color: "#333" }}>Paquete / Servicio</label>
                {selectedPackage && (
                  <div className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: "rgba(125,223,255,0.06)", border: "1px solid rgba(125,223,255,0.25)" }}>
                    <span className="text-sm font-medium" style={{ color: STAR }}>{selectedPackage}</span>
                    <button type="button" onClick={() => setSelectedPackage("")} className="text-xs cursor-pointer" style={{ color: "#444" }}>✕ cambiar</button>
                  </div>
                )}
                <input type="hidden" name="servicio" value={selectedPackage || "Sin especificar"} />
                {!selectedPackage && (
                  <select name="servicio_manual" className="rounded-lg px-4 py-3 text-sm focus:outline-none transition-all duration-200 appearance-none"
                    style={{ background: "#111", border: "1px solid #1e1e1e", color: "#666" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(125,223,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(125,223,255,0.15)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.boxShadow = "none"; }}
                    onChange={e => setSelectedPackage(e.target.value)}
                  >
                    <option value="">Selecciona un paquete o servicio</option>
                    <option value="Esencial — $5,500 MXN">Esencial — $5,500 MXN</option>
                    <option value="Profesional — $9,000 MXN">Profesional — $9,000 MXN</option>
                    <option value="Premium — $13,500 MXN">Premium — $13,500 MXN</option>
                    <option value="Diseño Web">Solo Diseño Web</option>
                    <option value="Branding">Solo Branding</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest" style={{ color: "#333" }}>Mensaje</label>
                <textarea required name="mensaje" rows={4} placeholder="Cuéntanos sobre tu proyecto..."
                  className="rounded-lg px-4 py-3 text-sm focus:outline-none transition-all duration-200 resize-none"
                  style={{ background: "#111", border: "1px solid #1e1e1e", color: "#c8c8c8" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(125,223,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(125,223,255,0.15)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
              {error && (
                <p className="text-sm text-red-400">Hubo un error al enviar. Intenta de nuevo.</p>
              )}
              <button type="submit" disabled={sending}
                className="w-full font-medium py-3 rounded-full text-sm transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${STAR} 0%, #4ab8e8 100%)`, color: "#050c10", boxShadow: STAR_BOX }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(125,223,255,0.9), 0 0 60px rgba(125,223,255,0.4)"; e.currentTarget.style.background = `linear-gradient(135deg, #a8eeff 0%, ${STAR} 100%)`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = STAR_BOX; e.currentTarget.style.background = `linear-gradient(135deg, ${STAR} 0%, #4ab8e8 100%)`; }}
              >
                {sending ? "Enviando..." : sent ? "Mensaje enviado ✓" : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="px-6 py-10 w-full" style={{ borderTop: "1px solid #1e1e1e", background: "#080808" }}>
          <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-semibold text-sm" style={{ color: STAR, textShadow: STAR_GLOW }}>Oakframe Agency</span>
            <span className="text-xs" style={{ color: "#3a3a3a" }}>© {new Date().getFullYear()} Oakframe Agency. Todos los derechos reservados.</span>
            <div className="flex items-center gap-4">
              <a href="/aviso-privacidad" className="text-xs hover:text-white/60 transition-colors" style={{ color: "#3a3a3a" }}>Aviso de privacidad</a>
              <span className="text-xs" style={{ color: "#3a3a3a" }}>Puebla, México</span>
            </div>
          </div>
          </div>
        </footer>

      </main>
    </>
  );
}
