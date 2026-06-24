'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: 'yrs', label: 'Industry Experience' },
  { value: 3, suffix: 'x', label: 'Avg. Conversion Lift' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="bg-black border-y border-orange-300/10 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent mb-2">
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <p className="text-orange-100/50 text-sm tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
