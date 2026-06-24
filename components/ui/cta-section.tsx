'use client';

import { useEffect, useRef } from 'react';

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) sectionRef.current?.classList.add('cta-visible');
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="bg-black py-32 px-6 border-t border-orange-300/10">
      <style>{`
        .cta-inner { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .cta-visible .cta-inner { opacity: 1; transform: translateY(0); }
      `}</style>
      <div className="max-w-4xl mx-auto text-center" ref={sectionRef}>
        <div className="cta-inner">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-6">Ready?</p>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Let&apos;s build something{' '}
            <span className="bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">extraordinary</span>
          </h2>
          <p className="text-orange-100/60 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            We take on a limited number of projects each quarter. If you&apos;re serious about growth, let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@oakframestudio.com" className="px-10 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30">
              Start a Project
            </a>
            <a href="mailto:hello@oakframestudio.com" className="px-10 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Book a Free Call
            </a>
          </div>
          <p className="mt-8 text-orange-100/30 text-sm">hello@oakframestudio.com · We respond within 24 hours</p>
        </div>
      </div>
    </section>
  );
}
