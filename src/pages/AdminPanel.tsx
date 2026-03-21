import Navbar from '@/components/Navbar';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Users, FileText, TrendingUp, Bell, Settings, LogOut, BarChart3, PieChart, Activity } from 'lucide-react';

const AdminPanel = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const stats = [
    { label: 'Total Clients', value: '648', icon: Users, change: '+12%' },
    { label: 'Active Requests', value: '47', icon: FileText, change: '+5%' },
    { label: 'Recovery Value', value: '₹2.4Cr', icon: TrendingUp, change: '+18%' },
    { label: 'Pending Reviews', value: '13', icon: Bell, change: '-3%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20" ref={ref}>
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-5rem)] glass-strong border-r border-border p-6">
            <div className="mb-8">
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">Admin Panel</div>
            </div>
            <nav className="flex-1 space-y-1">
              {[
                { icon: BarChart3, label: 'Dashboard', active: true },
                { icon: Users, label: 'Clients' },
                { icon: FileText, label: 'Requests' },
                { icon: PieChart, label: 'Analytics' },
                { icon: Activity, label: 'Activity Log' },
                { icon: Settings, label: 'Settings' },
              ].map((item, i) => (
                <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active ? 'gradient-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
            <button className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-destructive transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </aside>

          {/* Main */}
          <main className="flex-1 p-6 md:p-8">
            <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">Admin <span className="text-gradient-gold">Dashboard</span></h1>
                  <p className="text-sm text-muted-foreground mt-1">Welcome back, Administrator</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                  <div key={i} className="card-3d rounded-2xl p-6" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                        <s.icon size={18} className="text-primary-foreground" />
                      </div>
                      <span className="text-xs font-medium text-emerald-400">{s.change}</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts placeholder */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="card-3d rounded-2xl p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">Recovery Trends</h3>
                  <div className="h-48 flex items-end gap-2 px-4">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-lg gradient-gold opacity-80 transition-all duration-300 hover:opacity-100"
                        style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] text-muted-foreground px-4">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="card-3d rounded-2xl p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">Service Distribution</h3>
                  <div className="flex items-center justify-center h-48">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--gold))" strokeWidth="3" strokeDasharray="35 65" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--blue))" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-35" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--gold-light))" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-60" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center mt-2">
                    {[
                      { label: 'Shares Recovery', color: 'bg-primary' },
                      { label: 'Unclaimed PF', color: 'bg-secondary' },
                      { label: 'Insurance', color: 'bg-gold-light' },
                    ].map((l, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                        {l.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent requests table */}
              <div className="card-3d rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Recent Requests</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'VCS-A7F2K9', client: 'Rajesh Kumar', service: 'Share Recovery', status: 'In Progress', value: '₹4.2L' },
                        { id: 'VCS-B3M8P1', client: 'Priya Sharma', service: 'Unclaimed PF', status: 'Completed', value: '₹1.8L' },
                        { id: 'VCS-C5N2Q4', client: 'Vikram Patel', service: 'Insurance', status: 'Pending', value: '₹3.1L' },
                        { id: 'VCS-D9R6T3', client: 'Anita Desai', service: 'Transmission', status: 'In Progress', value: '₹6.7L' },
                      ].map((r, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 font-mono text-xs text-primary">{r.id}</td>
                          <td className="py-3 px-4 text-foreground">{r.client}</td>
                          <td className="py-3 px-4 text-muted-foreground">{r.service}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium ${
                              r.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                              r.status === 'In Progress' ? 'bg-primary/10 text-primary' :
                              'bg-orange-500/10 text-orange-400'
                            }`}>{r.status}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-foreground">{r.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
