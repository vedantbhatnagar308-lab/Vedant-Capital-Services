import { ArrowDown, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl floating" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl floating-delayed" />
        <div className="absolute top-1/2 right-[30%] w-48 h-48 rounded-full bg-primary/3 blur-2xl floating-slow" />
        
        {/* Floating finance icons */}
        <div className="absolute top-[20%] right-[15%] floating opacity-20">
          <TrendingUp size={48} className="text-primary" />
        </div>
        <div className="absolute bottom-[30%] left-[10%] floating-delayed opacity-15">
          <Shield size={40} className="text-secondary" />
        </div>
        <div className="absolute top-[40%] right-[5%] floating-slow opacity-10">
          <BarChart3 size={56} className="text-primary" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(hsla(var(--gold), 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-20">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-primary mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full gradient-gold animate-pulse" />
            Trusted Since 2008 · 17+ Years of Excellence
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-foreground" style={{ textWrap: 'balance' }}>
            Welcome to{' '}
            <span className="text-gradient-gold">Vedant Capital</span>{' '}
            Service
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed" style={{ textWrap: 'pretty' }}>
            Your trusted partner in financial recovery and investment solutions. Recover your lost shares, dividends, and unclaimed investments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#services" className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
              Explore Services
            </a>
            <a href="#contact" className="btn-3d-outline px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
              Free Consultation
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
            {[
              { value: '600+', label: 'Clients Served' },
              { value: '₹10Cr+', label: 'Recovered' },
              { value: '17+', label: 'Years' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient-gold font-display">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors floating">
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default HeroSection;
