import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { ADMIN_EMAIL } from '@/data/adminData';
import {
  LayoutDashboard, BarChart2, Users, AlertTriangle, Mail,
  Tag, Send, Share2, Brain, TrendingUp, Database,
  Menu, X, LogOut,
} from 'lucide-react';

const sections = [
  {
    label: 'OVERVIEW',
    links: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
      { label: 'Analytics', icon: BarChart2, to: '/admin/analytics' },
    ],
  },
  {
    label: 'CUSTOMERS',
    links: [
      { label: 'All Customers', icon: Users, to: '/admin/customers' },
      { label: 'Churn Risk', icon: AlertTriangle, to: '/admin/churn-risk', badge: '5' },
      { label: 'Retention Campaigns', icon: Mail, to: '/admin/retention' },
    ],
  },
  {
    label: 'MARKETING',
    links: [
      { label: 'Discounts & Coupons', icon: Tag, to: '/admin/discounts' },
      { label: 'Email Campaigns', icon: Send, to: '/admin/email-campaigns' },
      { label: 'Social Media', icon: Share2, to: '/admin/social' },
    ],
  },
  {
    label: 'TOOLS',
    links: [
      { label: 'Churn Predictor', icon: Brain, to: '/churn-predictor' },
      { label: 'Retention Dashboard', icon: TrendingUp, to: '/retention-dashboard' },
      { label: 'Dataset', icon: Database, to: '/admin/dataset' },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-body text-sm tracking-widest uppercase">Loading...</p>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) return null;

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const sidebar = (
    <div className="flex flex-col h-full" style={{ background: '#0D1117' }}>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link to="/admin" className="font-display text-xl tracking-widest text-white">W.Y.W</Link>
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mt-0.5 font-body">Admin Portal</p>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {sections.map(section => (
          <div key={section.label}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 px-3 mb-1.5 font-body font-medium">
              {section.label}
            </p>
            {section.links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded text-[13px] font-body transition-colors ${
                  isActive(link.to)
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="flex-1">{link.label}</span>
                {link.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Admin user info */}
      <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-body font-medium">A</div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-body truncate">Admin Account</p>
          <span className="inline-block bg-red-500/20 text-red-400 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded font-body">
            ADMIN
          </span>
        </div>
        <button onClick={signOut} className="text-white/40 hover:text-white/80 transition-colors" title="Sign out">
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-60 shrink-0 fixed left-0 top-0 bottom-0 z-40">
        {sidebar}
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 border-b border-border bg-background">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-display text-lg tracking-widest ml-3">W.Y.W</span>
        <span className="text-[9px] tracking-wider uppercase text-muted-foreground ml-2 font-body">Admin</span>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-60 min-h-screen">
        <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
