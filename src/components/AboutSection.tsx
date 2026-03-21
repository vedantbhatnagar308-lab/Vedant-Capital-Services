import { CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const highlights = [
  'Recovery of Shares',
  'Duplicate Issue of Shares',
  'Transmission of Shares',
  'Unclaimed Provident Fund',
  'Unclaimed Mutual Fund',
  'Unclaimed Insurance',
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="section-padding-lg relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - visual */}
          <div className={`relative ${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
            <div className="card-3d rounded-3xl p-1 relative overflow-hidden">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative">
                <div className="absolute inset-0 gradient-hero flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl font-display font-bold text-gradient-gold">17+</div>
                    <div className="text-muted-foreground mt-2 text-lg">Years of Experience</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 glass rounded-2xl p-5 shadow-2xl shadow-black/30" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <div className="text-3xl font-display font-bold text-gradient-gold">₹10Cr+</div>
              <div className="text-xs text-muted-foreground mt-1">Recovered Investments</div>
            </div>
          </div>

          {/* Right - text */}
          <div className={`${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">About Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ textWrap: 'balance' }}>
              Welcome to <span className="text-gradient-gold">Vedant Capital Service</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Established in 2008, we specialize in helping investors reclaim their lost and unclaimed shares, dividends, and investments from the Investor Education and Protection Fund (IEPF) Authority.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With over 17 years of expertise, we have successfully assisted more than 600 clients in recovering investments worth over ₹10 crore.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold inline-block">
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
