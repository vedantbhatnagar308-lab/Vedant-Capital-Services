import { FileText, Copy, Users, Landmark, PiggyBank, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  { icon: FileText, title: 'Recovery of Shares', desc: 'Recover shares and dividends transferred to IEPF Authority' },
  { icon: Copy, title: 'Duplicate Issue of Shares', desc: 'Get duplicate share certificates for lost or damaged ones' },
  { icon: Users, title: 'Transmission of Shares', desc: 'Transfer shares to legal heirs after demise of shareholder' },
  { icon: Landmark, title: 'Unclaimed Provident Fund', desc: 'Claim your unclaimed EPF and pension benefits' },
  { icon: PiggyBank, title: 'Unclaimed Mutual Fund', desc: 'Recover your unclaimed mutual fund investments' },
  { icon: ShieldCheck, title: 'Unclaimed Insurance', desc: 'Claim unclaimed insurance policies and benefits' },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
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
            <div
              key={i}
              className={`card-3d rounded-2xl p-8 group perspective-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <s.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              <a href="#contact" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-5 hover:gap-2 transition-all duration-300">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
