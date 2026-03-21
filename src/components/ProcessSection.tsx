import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FloatingCube, FloatingDiamond, FloatingRing } from './3DElements';

const steps = [
  { letter: 'R', title: 'Ring Up', desc: 'The in-house sales team engages in discussions with the client.' },
  { letter: 'E', title: 'Evaluate', desc: 'The valuation team reviews all documents provided by the client.' },
  { letter: 'C', title: 'Assessment', desc: 'The sales team conducts a feasibility assessment.' },
  { letter: 'O', title: 'Offer', desc: 'A proposal is sent, outlining the fees and scope of work.' },
  { letter: 'V', title: 'Verify', desc: 'The digital agreement is signed using Aadhar-based authentication.' },
  { letter: 'E', title: 'Employ', desc: 'An operations executive is assigned to manage the formalities.' },
  { letter: 'R', title: 'Recovery', desc: 'The recovered investments are credited to the client\'s account.' },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="process" className="section-padding-lg relative overflow-hidden" ref={ref}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-72 h-72 rounded-full bg-secondary/3 blur-3xl pointer-events-none" />

      {/* 3D shapes */}
      <FloatingCube className="absolute top-16 left-8 floating rotate-[25deg] hidden lg:block" size={55} />
      <FloatingDiamond className="absolute bottom-20 right-12 floating-delayed -rotate-12 hidden lg:block" size={50} />
      <FloatingRing className="absolute top-1/3 right-[5%] floating-slow rotate-[-15deg] hidden lg:block" size={75} />

      {/* Animated orbit ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/5 spin-very-slow pointer-events-none hidden xl:block" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">R.E.C.O.V.E.R</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Our 7-Step <span className="text-gradient-gold">Recovery Process</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line with glow */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, hsla(var(--gold), 0.6), hsla(var(--blue), 0.4), hsla(var(--gold), 0.6))' }} />

          {steps.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex items-start gap-6 mb-12 sm:mb-16 relative ${isVisible ? (isLeft ? 'animate-slide-left' : 'animate-slide-right') : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Mobile layout */}
                <div className="sm:hidden flex gap-4 items-start w-full">
                  <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center shrink-0 text-primary-foreground font-display font-bold text-2xl shadow-lg shadow-primary/20 preserve-3d"
                    style={{ transform: 'rotateY(-10deg) rotateX(5deg)' }}>
                    {s.letter}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Step {i + 1}</div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className={`hidden sm:grid sm:grid-cols-[1fr_auto_1fr] gap-8 items-center w-full`}>
                  <div className={`${isLeft ? 'text-right' : 'order-3'}`}>
                    <div className={`card-3d rounded-2xl p-6 inline-block ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
                      <div className="text-xs text-muted-foreground mb-1">Step {i + 1}</div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 perspective-1000 order-2">
                    <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center text-primary-foreground font-display font-bold text-xl shadow-lg shadow-primary/30 preserve-3d hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: '0 0 25px hsla(var(--gold), 0.3), 0 4px 15px hsla(0,0%,0%,0.3)' }}>
                      {s.letter}
                    </div>
                  </div>
                  <div className={`${isLeft ? 'order-3' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
