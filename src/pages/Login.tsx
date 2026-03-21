import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to admin
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate('/admin');
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin');
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setError(authError.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 min-h-[80vh] flex items-center" ref={ref}>
        <div className="container mx-auto px-4 md:px-8 max-w-md">
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center font-display font-bold text-2xl text-primary-foreground mx-auto mb-4">V</div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Admin <span className="text-gradient-gold">Login</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2">Authorized personnel only</p>
            </div>

            <form onSubmit={handleSubmit} className="card-3d rounded-2xl p-8 space-y-4">
              {error && (
                <div className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}
              <input type="email" placeholder="Admin Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <button type="submit" disabled={loading} className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold w-full disabled:opacity-50">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Link to="/place-request" className="text-xs text-primary hover:underline block">Place a New Request →</Link>
              <Link to="/track-request" className="text-xs text-primary hover:underline block">Track Existing Request →</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
