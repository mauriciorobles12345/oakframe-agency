'use client';

import { useEffect, useRef } from 'react';

const steps = [
  { number: '01', title: 'Discovery', description: 'We start by understanding your business, goals, competitors, and audience through a deep-dive workshop. No guesswork — just clarity.' },
  { number: '02', title: 'Strategy & Design', description: 'Wireframes, moodboards, and a full design system tailored to your brand. You see and approve every detail before a single line of code is written.' },
  { number: '03', title: 'Build', description: 'Our engineers bring the design to life with clean, performant code. Weekly check-ins keep you in the loop at every milestone.' },
  { number: '04', title: 'Launch & Grow', description: 'We launch, monitor, and optimize. Our post-launch support ensures your site performs from day one — and keeps improving.' },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('.process-step').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), i * 150);
          });
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="bg-black py-32 px-6" ref={sectionRef}>
      <style>{`
        .process-step { opacity: 0; transform: translateX(-24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .process-step.is-visible { opacity: 1; transform: translateX(0); }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">How We Work</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-xl leading-tight">
            A process that{' '}
            <span className="bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">never misses</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="process-step relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-orange-400/40 to-transparent z-0" />
              )}
              <div className="relative z-10 p-6 lg:p-8 border border-orange-300/10 rounded-2xl bg-black hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-300 mx-2">
                <div className="text-5xl font-black text-orange-400/20 mb-4 font-mono">{step.number}</div>
                <h3 className="text-white text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-orange-100/50 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
