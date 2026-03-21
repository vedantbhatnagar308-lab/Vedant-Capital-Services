import Navbar from '@/components/Navbar';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { TrendingUp, Wallet, FileText, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16" ref={ref}>
        <div className="container mx-auto px-4 md:px-8">
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Client <span className="text-gradient-gold">Dashboard</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Overview of your recovery portfolio</p>
            </div>

            {/* Top stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Wallet, label: 'Total Portfolio', value: '₹8.4L', change: '+12.5%', up: true },
                { icon: TrendingUp, label: 'Recovered Amount', value: '₹5.2L', change: '+8.3%', up: true },
                { icon: FileText, label: 'Active Requests', value: '3', change: '+1', up: true },
                { icon: Clock, label: 'Avg. Time', value: '45 Days', change: '-5 days', up: false },
              ].map((s, i) => (
                <div key={i} className="card-3d rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                      <s.icon size={18} className="text-primary-foreground" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? 'text-emerald-400' : 'text-secondary'}`}>
                      {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {s.change}
                    </div>
                  </div>
                  <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="lg:col-span-2 card-3d rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-6">Recovery Progress</h3>
                <div className="relative h-56">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,180 L50,150 L100,160 L150,120 L200,100 L250,80 L300,60 L350,40 L400,30 L400,200 L0,200 Z" fill="url(#areaGrad)" />
                    <path d="M0,180 L50,150 L100,160 L150,120 L200,100 L250,80 L300,60 L350,40 L400,30" fill="none" stroke="hsl(var(--gold))" strokeWidth="2.5" strokeLinecap="round" />
                    {[
                      [0, 180], [50, 150], [100, 160], [150, 120], [200, 100], [250, 80], [300, 60], [350, 40], [400, 30],
                    ].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="4" fill="hsl(var(--navy))" stroke="hsl(var(--gold))" strokeWidth="2" />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Recent activity */}
              <div className="card-3d rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Documents verified', desc: 'Share recovery case #VCS-A7F2K9', time: '2h ago', color: 'gradient-gold' },
                    { title: 'Payment received', desc: 'PF claim #VCS-B3M8P1', time: '1d ago', color: 'gradient-blue' },
                    { title: 'New request filed', desc: 'Insurance recovery', time: '3d ago', color: 'gradient-gold' },
                    { title: 'Recovery complete', desc: 'Mutual fund #VCS-C5N2Q4', time: '1w ago', color: 'gradient-blue' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${a.color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{a.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{a.desc}</div>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
