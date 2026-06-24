'use client';

import { useEffect, useRef } from 'react';

const services = [
  { icon: '⬡', title: 'Web Design', description: 'Pixel-perfect interfaces crafted to convert visitors into clients. Every pixel has a purpose.' },
  { icon: '⟨⟩', title: 'Development', description: 'Fast, scalable, and accessible websites built with modern frameworks like Next.js and React.' },
  { icon: '◈', title: 'Brand Identity', description: 'Logos, color systems, and visual languages that make your brand unforgettable.' },
  { icon: '▷', title: 'Motion & Animation', description: 'Fluid interactions and micro-animations that elevate perceived quality and delight users.' },
  { icon: '◎', title: 'SEO & Performance', description: 'Core Web Vitals optimization and search strategy that brings organic traffic at scale.' },
  { icon: '⟳', title: 'Maintenance', description: 'Ongoing support, updates, and monitoring so your site stays fast, secure, and current.' },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('.service-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('is-visible'), i * 100);
          });
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-black py-32 px-6" ref={sectionRef}>
      <style>{`
        .service-card { opacity: 0; transform: translateY(32px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .service-card.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">What We Do</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
            Services built for{' '}
            <span className="bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent">results</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-orange-300/10 rounded-2xl overflow-hidden border border-orange-300/10">
          {services.map((s) => (
            <div key={s.title} className="service-card bg-black p-8 group hover:bg-orange-500/5 transition-colors duration-300">
              <div className="text-3xl text-orange-400 mb-5 font-mono">{s.icon}</div>
              <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-orange-300 transition-colors duration-300">{s.title}</h3>
              <p className="text-orange-100/50 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
