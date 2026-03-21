import { FileText, Copy, Users, Landmark, PiggyBank, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FloatingCube, FloatingDiamond, FloatingPyramid } from './3DElements';
import { useState } from 'react';

const services = [
  { icon: FileText, title: 'Recovery of Shares', desc: 'Recover shares and dividends transferred to IEPF Authority' },
  { icon: Copy, title: 'Duplicate Issue of Shares', desc: 'Get duplicate share certificates for lost or damaged ones' },
  { icon: Users, title: 'Transmission of Shares', desc: 'Transfer shares to legal heirs after demise of shareholder' },
  { icon: Landmark, title: 'Unclaimed Provident Fund', desc: 'Claim your unclaimed EPF and pension benefits' },
  { icon: PiggyBank, title: 'Unclaimed Mutual Fund', desc: 'Recover your unclaimed mutual fund investments' },
  { icon: ShieldCheck, title: 'Unclaimed Insurance', desc: 'Claim unclaimed insurance policies and benefits' },
];

const ServiceCard = ({ s, i, isVisible }: { s: typeof services[0]; i: number; isVisible: boolean }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY((x - centerX) / 12);
    setRotateX(-(y - centerY) / 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`perspective-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${i * 0.1}s` }}
    >
      <div
        className="card-3d rounded-2xl p-8 group preserve-3d transition-transform duration-300 ease-out cursor-default"
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
          <s.icon size={24} className="text-primary-foreground" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
        <a href="#contact" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-5 hover:gap-2 transition-all duration-300">
          Learn More →
        </a>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
      {/* 3D background decorations */}
      <FloatingCube className="absolute top-10 right-10 floating-delayed rotate-45 hidden lg:block" size={60} />
      <FloatingDiamond className="absolute bottom-20 left-8 floating rotate-12 hidden lg:block" size={45} />
      <FloatingPyramid className="absolute top-1/2 right-[5%] floating-slow -rotate-12 hidden lg:block" size={50} />
      <div className="absolute left-0 top-1/4 w-72 h-72 rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">What We Offer</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" style={{ textWrap: 'balance' }}>
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Comprehensive financial recovery solutions to help you reclaim what's rightfully yours
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
