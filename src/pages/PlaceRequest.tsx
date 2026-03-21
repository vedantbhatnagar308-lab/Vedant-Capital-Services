import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PlaceRequest = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', details: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request submitted successfully! Your tracking ID: VCS-' + Math.random().toString(36).substr(2, 8).toUpperCase());
    setForm({ name: '', email: '', phone: '', service: '', details: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16" ref={ref}>
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
              Place a <span className="text-gradient-gold">Request</span>
            </h1>
            <p className="text-muted-foreground text-center mb-10">Submit your recovery request and we'll get back to you within 24 hours</p>

            <form onSubmit={handleSubmit} className="card-3d rounded-2xl p-8 space-y-4">
              <input type="text" placeholder="Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <input type="tel" placeholder="Phone" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} required
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">Select Service</option>
                <option>Recovery of Shares</option>
                <option>Duplicate Issue of Shares</option>
                <option>Transmission of Shares</option>
                <option>Unclaimed Provident Fund</option>
                <option>Unclaimed Mutual Fund</option>
                <option>Unclaimed Insurance</option>
              </select>
              <textarea placeholder="Additional Details" rows={4} value={form.details} onChange={e => setForm({ ...form, details: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <button type="submit" className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold w-full">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceRequest;
