import { CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import consultationImage from '@/assets/about-consultation.jpg';
import documentReviewImage from '@/assets/about-document-review.jpg';

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
                <img
                  src={consultationImage}
                  alt="A financial consultant reviewing investment documents with a client"
                  width={1280}
                  height={1024}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/45 to-transparent p-6 pt-20 text-primary-foreground">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">Vedant Capital Service</p>
                  <p className="mt-1 font-display text-xl font-semibold">Guidance for investments that need attention</p>
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-2 w-40 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl md:right-8 md:w-48">
              <img
                src={documentReviewImage}
                alt="Investment documents being carefully reviewed"
                width={1200}
                height={912}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            </div>
            <div className="absolute -left-3 top-6 glass rounded-xl px-4 py-3 shadow-lg md:-left-5 md:px-5">
              <div className="text-2xl font-display font-bold text-gradient-gold">17+</div>
              <div className="text-xs text-muted-foreground">Years of experience</div>
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
              Since 2008, our work has focused on helping people understand the steps involved in recovering investments. We have assisted more than 600 clients, with over ₹10 crore in investments recovered.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Every case starts with understanding the investor’s situation and reviewing the available records. From there, we guide clients through the relevant formalities for their case, including recovery of shares, dividends, provident fund, mutual funds, and insurance.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            <Link to="/place-request" className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold inline-block">
              Place a Request
            </Link>
          </div>
        </div>

        <div className="mt-28 grid items-center gap-10 border-t border-border pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className={`${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">A considered approach</span>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Clear guidance, from the first review to the next step
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Investment recovery can involve different records and formalities depending on the case. Our R.E.C.O.V.E.R process sets out a structured path: understand the request, assess the documents, explain the proposed scope, and keep the recovery process moving.
            </p>
            <Link to="/process" className="mt-6 inline-flex items-center font-semibold text-primary underline-offset-4 hover:underline">
              Explore our process
            </Link>
          </div>
          <div className={`grid grid-cols-3 gap-3 md:gap-5 ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
            {[
              { value: '2008', label: 'Established' },
              { value: '600+', label: 'Clients assisted' },
              { value: '₹10Cr+', label: 'Investments recovered' },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-primary/30 pl-3 md:pl-5">
                <div className="font-display text-xl font-bold text-primary md:text-3xl">{item.value}</div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground md:text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
