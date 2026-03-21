import { ArrowDown, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FloatingCube, FloatingDiamond, FloatingPyramid, FloatingSphere, FloatingOctahedron, Chart3D, LineGraph3D, FloatingRing } from './3DElements';

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl floating" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl floating-delayed" />
        <div className="absolute top-1/2 right-[30%] w-48 h-48 rounded-full bg-primary/3 blur-2xl floating-slow" />

        {/* 3D Geometric shapes */}
        <FloatingCube className="absolute top-[15%] right-[12%] floating rotate-12" size={70} />
        <FloatingDiamond className="absolute bottom-[25%] left-[8%] floating-delayed -rotate-6" size={55} />
        <FloatingPyramid className="absolute top-[60%] right-[6%] floating-slow rotate-[20deg]" size={50} />
        <FloatingSphere className="absolute top-[25%] left-[15%] floating" size={90} />
        <FloatingOctahedron className="absolute bottom-[15%] right-[20%] floating-delayed rotate-45" size={45} />
        <FloatingRing className="absolute top-[35%] left-[5%] floating-slow rotate-12" size={80} />

        {/* 3D Charts floating */}
        <Chart3D className="absolute top-[18%] right-[25%] floating-delayed opacity-60" />
        <LineGraph3D className="absolute bottom-[20%] left-[18%] floating opacity-50 hidden md:block" />

        {/* Floating finance icons */}
        <div className="absolute top-[20%] right-[40%] floating opacity-20">
          <TrendingUp size={48} className="text-primary" />
        </div>
        <div className="absolute bottom-[35%] left-[25%] floating-delayed opacity-15">
          <Shield size={40} className="text-secondary" />
        </div>
        <div className="absolute top-[45%] right-[3%] floating-slow opacity-10">
          <BarChart3 size={56} className="text-primary" />
        </div>

        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5 spin-very-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-secondary/3 spin-very-slow-reverse" />

        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(hsla(var(--gold), 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Particle dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20 floating"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
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
            <Link to="/place-request" className="btn-3d-outline px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
              Place a Request
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
            {[
              { value: '600+', label: 'Clients Served' },
              { value: '₹10Cr+', label: 'Recovered' },
              { value: '17+', label: 'Years' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
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
