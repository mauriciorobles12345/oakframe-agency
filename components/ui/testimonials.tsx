'use client';

import { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: 'Oakframe Studio didn\'t just build our website — they built our brand. Revenue from organic traffic tripled in 6 months. Worth every penny.',
    name: 'Sofia Méndez', role: 'CEO, Lumière Skincare', avatar: 'SM',
  },
  {
    quote: 'The attention to detail is unmatched. Every animation, every font choice, every micro-interaction felt intentional. Our investors noticed immediately.',
    name: 'James Harlow', role: 'Managing Partner, Vertex Capital', avatar: 'JH',
  },
  {
    quote: 'We\'ve worked with 3 agencies before. Oakframe is the first one that actually listened, delivered on time, and exceeded what we expected. Period.',
    name: 'Ana Reyes', role: 'Founder, Folio Architecture', avatar: 'AR',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('.testimonial-card').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), i * 150);
          });
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black py-32 px-6 border-t border-orange-300/10" ref={sectionRef}>
      <style>{`
        .testimonial-card { opacity: 0; transform: translateY(32px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .testimonial-card.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">Client Stories</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Don&apos;t take our{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">word for it</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card relative p-8 rounded-2xl border border-orange-300/10 bg-gradient-to-b from-orange-500/5 to-transparent hover:border-orange-400/30 transition-all duration-300">
              <div className="text-6xl text-orange-400/20 font-serif leading-none mb-4">&ldquo;</div>
              <p className="text-orange-100/80 text-base leading-relaxed mb-8 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-black text-xs font-black">{t.avatar}</div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-orange-300/60 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
