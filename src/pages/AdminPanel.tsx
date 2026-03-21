import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Users, FileText, TrendingUp, Bell, LogOut, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type RequestRow = {
  id: string;
  tracking_id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string | null;
  status: string;
  status_note: string | null;
  created_at: string;
  updated_at: string;
};

const statusOptions = ['Received', 'Documents Verified', 'Processing', 'Recovery Complete'];

const AdminPanel = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const navigate = useNavigate();
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNote, setEditNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login');
      else fetchRequests();
    });
  }, [navigate]);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setRequests(data as RequestRow[]);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const startEdit = (req: RequestRow) => {
    setEditingId(req.id);
    setEditStatus(req.status);
    setEditNote(req.status_note || '');
  };

  const saveStatus = async (id: string) => {
    setSaving(true);
    const { error } = await supabase
      .from('requests')
      .update({ status: editStatus, status_note: editNote || null })
      .eq('id', id);

    if (error) {
      alert('Failed to update: ' + error.message);
    } else {
      setEditingId(null);
      fetchRequests();
    }
    setSaving(false);
  };

  const totalRequests = requests.length;
  const activeRequests = requests.filter(r => r.status !== 'Recovery Complete').length;
  const completedRequests = requests.filter(r => r.status === 'Recovery Complete').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20" ref={ref}>
        <main className="p-6 md:p-8">
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Admin <span className="text-gradient-gold">Dashboard</span></h1>
                <p className="text-sm text-muted-foreground mt-1">Manage all recovery requests</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={fetchRequests} className="btn-3d-outline px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                  <RefreshCw size={14} /> Refresh
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-destructive transition-colors rounded-xl border border-border">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Requests', value: totalRequests, icon: FileText },
                { label: 'Active', value: activeRequests, icon: Users },
                { label: 'Completed', value: completedRequests, icon: TrendingUp },
                { label: 'New Today', value: requests.filter(r => new Date(r.created_at).toDateString() === new Date().toDateString()).length, icon: Bell },
              ].map((s, i) => (
                <div key={i} className="card-3d rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                      <s.icon size={18} className="text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Requests table */}
            <div className="card-3d rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">All Requests</h3>
              {loading ? (
                <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>
              ) : requests.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">No requests yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contact</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((r) => (
                        <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-3 font-mono text-xs text-primary">{r.tracking_id}</td>
                          <td className="py-3 px-3 text-foreground">{r.name}</td>
                          <td className="py-3 px-3 text-muted-foreground hidden md:table-cell">
                            <div className="text-xs">{r.email}</div>
                            <div className="text-xs">{r.phone}</div>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground text-xs">{r.service}</td>
                          <td className="py-3 px-3">
                            {editingId === r.id ? (
                              <select value={editStatus} onChange={e => setEditStatus(e.target.value)}
                                className="px-2 py-1 rounded-lg bg-muted/50 border border-border text-foreground text-xs focus:outline-none">
                                {statusOptions.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            ) : (
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium ${
                                r.status === 'Recovery Complete' ? 'bg-emerald-500/10 text-emerald-400' :
                                r.status === 'Processing' ? 'bg-primary/10 text-primary' :
                                r.status === 'Documents Verified' ? 'bg-secondary/10 text-secondary' :
                                'bg-orange-500/10 text-orange-400'
                              }`}>{r.status}</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                          <td className="py-3 px-3">
                            {editingId === r.id ? (
                              <div className="flex flex-col gap-2">
                                <input
                                  type="text" placeholder="Status note (optional)" value={editNote}
                                  onChange={e => setEditNote(e.target.value)}
                                  className="px-2 py-1 rounded-lg bg-muted/50 border border-border text-foreground text-xs focus:outline-none w-40"
                                />
                                <div className="flex gap-1">
                                  <button onClick={() => saveStatus(r.id)} disabled={saving}
                                    className="px-3 py-1 rounded-lg text-[10px] font-bold btn-3d">
                                    {saving ? '...' : 'Save'}
                                  </button>
                                  <button onClick={() => setEditingId(null)}
                                    className="px-3 py-1 rounded-lg text-[10px] text-muted-foreground border border-border hover:bg-muted/50">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => startEdit(r)} className="px-3 py-1 rounded-lg text-[10px] font-bold btn-3d-outline">
                                Update
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
