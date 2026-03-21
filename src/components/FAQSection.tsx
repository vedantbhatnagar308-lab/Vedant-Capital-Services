import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is IEPF and how do shares get transferred to it?', a: 'The Investor Education and Protection Fund (IEPF) is a government authority where unclaimed dividends and shares are transferred after 7 years of remaining unclaimed by the shareholder.' },
  { q: 'How can I check if my shares have been transferred to IEPF?', a: 'You can check the IEPF website or contact us for a free consultation. We will help verify your claim and guide you through the recovery process.' },
  { q: 'What documents are required for share recovery?', a: 'Typically, you need identity proof, share certificates (if available), proof of entitlement, and other KYC documents. Our team will guide you on exact requirements.' },
  { q: 'How long does the recovery process take?', a: 'The recovery process typically takes 3-6 months depending on the complexity of the case and the responsiveness of the relevant authorities.' },
  { q: 'What are your fees for share recovery services?', a: 'Our fees are competitive and success-based. We offer a free initial consultation to evaluate your case before discussing any charges.' },
  { q: 'Can I recover shares of a deceased family member?', a: 'Yes, legal heirs can recover shares through the transmission process. We handle all the necessary legal formalities on your behalf.' },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`card-3d rounded-2xl overflow-hidden ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-foreground text-sm pr-4">{f.q}</span>
                <ChevronDown size={18} className={`text-primary shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48 pb-6' : 'max-h-0'}`}>
                <p className="px-6 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
