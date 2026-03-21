import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: 'Vedant Capital Services provided exceptional financial insights that helped us streamline our investment strategy. Their expertise in financial structuring is unmatched!',
    name: 'Rajesh',
    role: 'Founder, Green Ventures',
  },
  {
    text: 'We were struggling with fundraising until Vedant Capital Services stepped in. Their in-depth market research and strategic guidance made a huge difference.',
    name: 'Amita',
    role: 'Investor & Angel Fund Manager',
  },
  {
    text: 'The team is highly professional and knowledgeable. They helped us optimize our financial operations, ensuring better cash flow management and profitability.',
    name: 'Manoj Singh',
    role: 'CFO, Stellar Enterprises',
  },
  {
    text: 'Working with Vedant Capital Services has been a game-changer. Their dedication to recovering our unclaimed investments was impressive.',
    name: 'Siddharth',
    role: 'Managing Director, Carter & Co.',
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`card-3d rounded-2xl p-8 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote size={24} className="text-primary/40 mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
