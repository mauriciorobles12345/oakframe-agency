'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Lumière Skincare',
    category: 'E-commerce · Brand Identity',
    description: 'A luxury skincare brand launch — full identity system, custom Shopify storefront, and a 3x conversion rate lift.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    tag: 'E-commerce',
  },
  {
    title: 'Vertex Capital',
    category: 'Web Design · Development',
    description: 'A venture capital firm that needed gravitas. We delivered a bespoke site that raised their perceived authority overnight.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    tag: 'Finance',
  },
  {
    title: 'Folio Architecture',
    category: 'Brand Identity · Motion',
    description: 'Award-winning architecture studio wanted a portfolio that felt as crafted as their buildings. We delivered exactly that.',
    image: 'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&q=80',
    tag: 'Architecture',
  },
  {
    title: 'Nomad SaaS',
    category: 'Web App · Development',
    description: 'A remote-work platform redesign that reduced churn by 40% and increased paid conversions within the first quarter.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tag: 'SaaS',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = sectionRef.current?.querySelectorAll('.work-card');
            items?.forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="bg-black py-32 px-6" ref={sectionRef}>
      <style>{`
        .work-card {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .work-card.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Proof in every{' '}
              <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                pixel
              </span>
            </h2>
          </div>
          <p className="text-blue-100/50 max-w-xs text-sm leading-relaxed">
            A curated selection of brands we've helped grow through strategic design and engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`work-card group relative overflow-hidden rounded-2xl cursor-pointer ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'h-96' : 'h-64'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-medium mb-3">
                  {p.tag}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-1">{p.title}</h3>
                <p className="text-blue-300/70 text-sm mb-3">{p.category}</p>
                <p className="text-blue-100/60 text-sm leading-relaxed max-w-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
