import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';

const stats = [
  { value: 600, suffix: '+', label: 'Client Interactions' },
  { value: 10, prefix: '₹', suffix: ' Cr+', label: 'Recovered Investments' },
  { value: 17, suffix: '+', label: 'Years in Industry' },
  { value: 25, suffix: '+', label: 'Full-time Professionals' },
  { value: 0, suffix: '', label: 'Negative Complaints' },
  { value: 100, suffix: '%', label: 'Transparency' },
];

function AnimatedNumber({ target, prefix = '', suffix = '', active }: { target: number; prefix?: string; suffix?: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{prefix}{count}{suffix}</span>;
}

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Why <span className="text-gradient-gold">Vedant Capital Service</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`card-3d rounded-2xl p-6 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="text-2xl md:text-3xl font-display font-bold text-gradient-gold mb-2">
                <AnimatedNumber target={s.value} prefix={s.prefix} suffix={s.suffix} active={isVisible} />
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
