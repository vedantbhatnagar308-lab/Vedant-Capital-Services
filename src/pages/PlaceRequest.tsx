import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { supabase } from '@/integrations/supabase/client';

const PlaceRequest = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', details: '' });
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newTrackingId = 'VCS-' + Math.random().toString(36).substr(2, 8).toUpperCase();

    try {
      // Insert into database
      const { error } = await supabase.from('requests').insert({
        tracking_id: newTrackingId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        details: form.details || null,
      });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('notify-request', {
        body: { ...form, trackingId: newTrackingId },
      });

      setTrackingId(newTrackingId);
      setForm({ name: '', email: '', phone: '', service: '', details: '' });
    } catch (err) {
      console.error('Error submitting request:', err);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
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

            {trackingId ? (
              <div className="card-3d rounded-2xl p-8 text-center animate-fade-up">
                <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Request Submitted!</h2>
                <p className="text-muted-foreground mb-4">Your tracking ID:</p>
                <div className="inline-block px-6 py-3 rounded-xl bg-muted/50 border border-primary/20 font-mono text-lg text-primary font-bold mb-6">
                  {trackingId}
                </div>
                <p className="text-sm text-muted-foreground mb-6">Save this ID to track your request status.</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setTrackingId(null)} className="btn-3d-outline px-6 py-3 rounded-xl text-sm font-bold">
                    Submit Another
                  </button>
                  <a href="/track-request" className="btn-3d px-6 py-3 rounded-xl text-sm font-bold inline-block">
                    Track Request
                  </a>
                </div>
              </div>
            ) : (
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
                <button type="submit" disabled={loading} className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold w-full disabled:opacity-50">
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link to="/track-request" className="text-xs text-primary hover:underline">
                Already have a tracking ID? Track your request →
              </Link>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceRequest;
