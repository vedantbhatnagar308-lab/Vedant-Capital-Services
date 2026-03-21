import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type RequestData = {
  tracking_id: string;
  name: string;
  service: string;
  status: string;
  status_note: string | null;
  created_at: string;
  updated_at: string;
};

const statusSteps = ['Received', 'Documents Verified', 'Processing', 'Recovery Complete'];

const TrackRequest = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<RequestData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setResult(null);

    const { data, error } = await supabase
      .from('requests')
      .select('tracking_id, name, service, status, status_note, created_at, updated_at')
      .eq('tracking_id', trackingId.trim().toUpperCase())
      .maybeSingle();

    if (error || !data) {
      setNotFound(true);
    } else {
      setResult(data as RequestData);
    }
    setLoading(false);
  };

  const getStepStatus = (stepName: string) => {
    if (!result) return 'pending';
    const currentIdx = statusSteps.indexOf(result.status);
    const stepIdx = statusSteps.indexOf(stepName);
    if (stepIdx < currentIdx) return 'done';
    if (stepIdx === currentIdx) return 'active';
    return 'pending';
  };

  const getIcon = (status: string) => {
    if (status === 'done') return CheckCircle;
    if (status === 'active') return Clock;
    return AlertCircle;
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
                <button type="submit" disabled={loading} className="btn-3d px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50">
                  <Search size={16} /> {loading ? '...' : 'Track'}
                </button>
              </div>
            </form>

            {notFound && (
              <div className="card-3d rounded-2xl p-8 text-center animate-fade-up">
                <p className="text-muted-foreground">No request found with that tracking ID. Please check and try again.</p>
              </div>
            )}

            {result && (
              <div className="card-3d rounded-2xl p-8 animate-fade-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground">Request Status</h3>
                  <span className="font-mono text-xs text-primary">{result.tracking_id}</span>
                </div>
                <div className="mb-6 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Name:</strong> {result.name}</p>
                  <p><strong className="text-foreground">Service:</strong> {result.service}</p>
                  <p><strong className="text-foreground">Submitted:</strong> {new Date(result.created_at).toLocaleDateString()}</p>
                </div>
                <div className="space-y-6">
                  {statusSteps.map((step, i) => {
                    const status = getStepStatus(step);
                    const Icon = getIcon(status);
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${status === 'done' ? 'gradient-gold' : status === 'active' ? 'gradient-blue' : 'bg-muted'}`}>
                          <Icon size={18} className={status === 'pending' ? 'text-muted-foreground' : 'text-primary-foreground'} />
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>{step}</div>
                          {status === 'active' && result.status_note && (
                            <div className="text-xs text-muted-foreground mt-1">{result.status_note}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
