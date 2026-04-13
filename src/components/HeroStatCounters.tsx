import { useEffect, useRef, useState } from 'react';

const STATS = [
  { target: 4, suffix: '+', label: 'Projects Delivered' },
  { target: 100, suffix: '%', label: 'Client Satisfaction' },
  { target: 12, suffix: '+', label: 'Brands Grown' }
] as const;

export function HeroStatCounters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const targets = STATS.map((s) => s.target);
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValues(targets);
      return;
    }
    const duration = 820;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValues(targets.map((n) => Math.round(n * eased)));
      if (t < 1) requestAnimationFrame(tick);
      else setValues(targets);
    };
    requestAnimationFrame(tick);
  }, [started]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center lg:justify-start gap-8 sm:gap-10 mt-10 sm:mt-14 animate-slide-left"
      style={{ animationDelay: '0.4s' }}
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className="flex flex-col items-center lg:items-start min-w-[4.5rem] sm:min-w-[5rem]">
          <div className="text-xl sm:text-2xl font-extrabold text-white tabular-nums tracking-tight">
            {values[i]}
            {stat.suffix}
          </div>
          <div className="text-[10px] sm:text-xs text-white/40 mt-0.5 leading-tight text-center lg:text-left">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
