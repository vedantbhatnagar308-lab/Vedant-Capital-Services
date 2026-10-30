import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding-lg relative" ref={ref}>
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Get In Touch</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Ready to <span className="text-gradient-gold">Recover</span> Your Investments?
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`lg:col-span-3 card-3d rounded-2xl p-8 ${isVisible ? 'animate-slide-left' : 'opacity-0'}`}
          >
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text" placeholder="Your Name" required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
              <input
                type="tel" placeholder="Phone Number" required
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            <input
              type="email" placeholder="Email Address" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow mb-4"
            />
            <textarea
              placeholder="Your Message" rows={4} required
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow mb-6 resize-none"
            />
            <button type="submit" className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold w-full sm:w-auto">
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className={`lg:col-span-2 space-y-6 ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
            {[
              { icon: Phone, title: 'Phone', lines: ['+91 9956304400', '+91 9161495959'] },
              { icon: Mail, title: 'Email', lines: ['info@vedantcapitalservices.in'] },
              { icon: MapPin, title: 'Address', lines: ['LGF 24, Eldeco Xpress Plaza', 'Udyan-II, Raebareli Road', 'Lucknow, UP 226025'] },
              { icon: Clock, title: 'Working Hours', lines: ['Mon - Sat: 10:00 AM - 6:00 PM', 'Sunday: Closed'] },
            ].map((item, i) => (
              <div key={i} className="card-3d rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  {item.lines.map((l, j) => (
                    <p key={j} className="text-xs text-muted-foreground">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Map */}
        <div className={`max-w-6xl mx-auto mt-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="card-3d rounded-2xl p-3 overflow-hidden">
            <div className="rounded-xl overflow-hidden border border-border relative" style={{ height: '400px' }}>
              <iframe
                title="Vedant Capital Service Location"
                src="https://maps.google.com/maps?q=Vedant%20Capital%20Services%2C%20LGF%2024%2C%20Eldeco%20Xpress%20Plaza%2C%20Udyan-II%2C%20Raebareli%20Road%2C%20Lucknow%2C%20UP%20226025&hl=en&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href="https://maps.app.goo.gl/oedZUSa7tgyou8M2A"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d mt-3 inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-bold"
            >
              <MapPin size={16} /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
