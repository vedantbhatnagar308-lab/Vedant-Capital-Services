import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';

const Login = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${isAdmin ? 'Admin' : 'Client'} login is a UI demo. Backend not connected.`);
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
                {isAdmin ? 'Admin' : 'Client'} <span className="text-gradient-gold">Login</span>
              </h1>
            </div>

            {/* Toggle */}
            <div className="flex rounded-xl bg-muted/50 p-1 mb-8">
              <button onClick={() => setIsAdmin(false)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${!isAdmin ? 'btn-3d' : 'text-muted-foreground'}`}>
                Client
              </button>
              <button onClick={() => setIsAdmin(true)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${isAdmin ? 'btn-3d' : 'text-muted-foreground'}`}>
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="card-3d rounded-2xl p-8 space-y-4">
              <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <button type="submit" className="btn-3d px-8 py-3.5 rounded-xl text-sm font-bold w-full">Sign In</button>
              <p className="text-center text-xs text-muted-foreground">
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </p>
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
