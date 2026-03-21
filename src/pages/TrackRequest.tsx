import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TrackRequest = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<null | 'found'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setResult('found');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16" ref={ref}>
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
              Track Your <span className="text-gradient-gold">Request</span>
            </h1>
            <p className="text-muted-foreground text-center mb-10">Enter your tracking ID to check the status of your recovery request</p>

            <form onSubmit={handleTrack} className="card-3d rounded-2xl p-8 mb-8">
              <div className="flex gap-3">
                <input type="text" placeholder="Enter Tracking ID (e.g., VCS-XXXXXXXX)" required
                  value={trackingId} onChange={e => setTrackingId(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <button type="submit" className="btn-3d px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <Search size={16} /> Track
                </button>
              </div>
            </form>

            {result && (
              <div className="card-3d rounded-2xl p-8 animate-fade-up">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Request Status</h3>
                <div className="space-y-6">
                  {[
                    { icon: CheckCircle, title: 'Request Received', date: 'Mar 15, 2026', status: 'done' },
                    { icon: CheckCircle, title: 'Documents Verified', date: 'Mar 17, 2026', status: 'done' },
                    { icon: Clock, title: 'Processing', date: 'In Progress', status: 'active' },
                    { icon: AlertCircle, title: 'Recovery Complete', date: 'Pending', status: 'pending' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${step.status === 'done' ? 'gradient-gold' : step.status === 'active' ? 'gradient-blue' : 'bg-muted'}`}>
                        <step.icon size={18} className={step.status === 'pending' ? 'text-muted-foreground' : 'text-primary-foreground'} />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>{step.title}</div>
                        <div className="text-xs text-muted-foreground">{step.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackRequest;
