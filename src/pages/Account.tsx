import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Calendar, Zap, Gift, MapPin, Bell, CreditCard, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Tab = 'overview' | 'orders' | 'returns' | 'wishlist' | 'rewards' | 'consultations' | 'referral' | 'settings';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('WYW-JD2024');
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="wyw-container py-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display mb-12 text-center italic">My Account</h1>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Sign In */}
            <div>
              <h2 className="font-display text-2xl mb-6 italic">Sign In</h2>
              <form onSubmit={e => { e.preventDefault(); setIsLoggedIn(true); toast.success('Welcome back!'); }} className="space-y-5">
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="••••••••" />
                </div>
                <Button variant="default" size="lg" type="submit" className="w-full">Sign In</Button>
              </form>
            </div>

            {/* Register */}
            <div>
              <h2 className="font-display text-2xl mb-6 italic">Create Account</h2>
              <form onSubmit={e => { e.preventDefault(); setIsLoggedIn(true); toast.success('Account created!'); }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">First Name</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required
                      className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="First name" />
                  </div>
                  <div>
                    <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Last Name</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required
                      className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="Last name" />
                  </div>
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Email</label>
                  <input type="email" required
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Password</label>
                  <input type="password" required
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="••••••••" />
                </div>
                <Button variant="default" size="lg" type="submit" className="w-full">Create Account</Button>
              </form>
              <p className="text-[0.75rem] text-muted-foreground mt-4 text-center font-body">
                Or scan a QR code in-store to register instantly
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'returns', label: 'Returns', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'rewards', label: 'Rewards', icon: Zap },
    { id: 'consultations', label: 'Consultations', icon: Calendar },
    { id: 'referral', label: 'Referral', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Bell },
  ];

  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-4xl md:text-5xl font-display mb-8 italic">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[0.8125rem] font-body transition-colors ${
                  tab === t.id ? 'bg-foreground text-background' : 'hover:bg-muted text-foreground'
                }`}
              >
                <t.icon className="h-4 w-4" strokeWidth={1.5} />
                {t.label}
              </button>
            ))}
            <button onClick={() => { setIsLoggedIn(false); toast('Signed out'); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[0.8125rem] font-body text-destructive hover:bg-muted">
              Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === 'overview' && (
              <div className="space-y-6">
                {/* Loyalty Card */}
                <div className="bg-secondary text-secondary-foreground p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Current Tier</p>
                      <h3 className="font-display text-2xl flex items-center gap-2">
                        <Zap className="h-5 w-5 text-accent" strokeWidth={1.5} /> Volt
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Points Balance</p>
                      <p className="font-display text-2xl">847</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-1">
                    <div className="bg-primary h-1" style={{ width: '56%' }} />
                  </div>
                  <p className="text-[0.75rem] text-muted-foreground mt-2 font-body">653 points to Surge tier</p>
                </div>

                {/* Recent Orders */}
                <div>
                  <h3 className="font-display text-xl mb-4 italic">Recent Orders</h3>
                  <div className="wyw-card border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[0.85rem] font-body font-medium">Order #WYW-2026-0042</p>
                      <span className="text-[0.625rem] bg-primary text-primary-foreground px-2 py-1 font-body uppercase tracking-[0.1em]">Delivered</span>
                    </div>
                    <p className="text-[0.75rem] text-muted-foreground font-body">28 Feb 2026 · 2 items · £214.00</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Gift, label: 'Active Coupons', value: '2' },
                    { icon: MapPin, label: 'Saved Addresses', value: '1' },
                    { icon: CreditCard, label: 'Payment Methods', value: '1' },
                    { icon: Share2, label: 'Referral Code', value: 'WYW-JD2024' },
                  ].map(item => (
                    <div key={item.label} className="wyw-card border border-border p-4 text-center">
                      <item.icon className="h-5 w-5 mx-auto text-primary mb-2" strokeWidth={1.5} />
                      <p className="text-[0.625rem] text-muted-foreground font-body uppercase tracking-[0.1em]">{item.label}</p>
                      <p className="font-body font-medium text-[0.85rem] mt-1 text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic">Order History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-[0.85rem] font-body">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Date</th>
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Order</th>
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Items</th>
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Total</th>
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Status</th>
                        <th className="py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: '28 Feb 2026', order: '#WYW-2026-0042', items: 2, total: '£214.00', status: 'Delivered' },
                        { date: '15 Feb 2026', order: '#WYW-2026-0038', items: 1, total: '£495.00', status: 'Delivered' },
                        { date: '02 Jan 2026', order: '#WYW-2026-0012', items: 3, total: '£680.00', status: 'Delivered' },
                      ].map(o => (
                        <tr key={o.order} className="border-b border-border">
                          <td className="py-3 text-foreground">{o.date}</td>
                          <td className="py-3 font-medium text-foreground">{o.order}</td>
                          <td className="py-3 text-foreground">{o.items}</td>
                          <td className="py-3 text-foreground">{o.total}</td>
                          <td className="py-3"><span className="text-[0.625rem] bg-primary/10 text-primary px-2 py-1">{o.status}</span></td>
                          <td className="py-3"><Button variant="ghost" size="sm">Track</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'returns' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic">Return Tracking</h2>
                <div className="wyw-card border border-border p-6">
                  <p className="text-[0.85rem] font-body font-medium mb-4">Return #RET-2026-0015</p>
                  <div className="flex items-center gap-2 mb-6">
                    {['Initiated', 'Received', 'Inspected', 'Refunded'].map((step, i) => (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold ${
                          i < 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {i < 2 ? <Check className="h-3 w-3" /> : i + 1}
                        </div>
                        <span className="text-[0.75rem] hidden sm:inline text-foreground">{step}</span>
                        {i < 3 && <div className={`flex-1 h-0.5 ${i < 1 ? 'bg-primary' : 'bg-muted'}`} />}
                      </div>
                    ))}
                  </div>
                  <p className="text-[0.75rem] text-muted-foreground font-body">Item received at warehouse. Currently under inspection.</p>
                </div>
              </div>
            )}

            {tab === 'wishlist' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic">Wishlist</h2>
                <p className="text-muted-foreground font-body font-light">Your wishlist is empty. Browse our collections to add items.</p>
              </div>
            )}

            {tab === 'rewards' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl mb-4 italic">Rewards Wallet</h2>
                <div className="bg-secondary p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Current Tier</p>
                      <h3 className="font-display text-2xl flex items-center gap-2">
                        <Zap className="h-5 w-5 text-accent" strokeWidth={1.5} /> Volt
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Points</p>
                      <p className="font-display text-2xl">847</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-1 mb-2">
                    <div className="bg-primary h-1" style={{ width: '56%' }} />
                  </div>
                  <p className="text-[0.75rem] text-muted-foreground font-body">653 points to Surge tier</p>
                </div>
                <div>
                  <h3 className="font-display text-lg mb-3 italic">Points History</h3>
                  <div className="space-y-2">
                    {[
                      { desc: 'Purchase #WYW-2026-0042', pts: '+214', date: '28 Feb' },
                      { desc: 'Welcome bonus', pts: '+100', date: '01 Jan' },
                      { desc: 'Referral reward', pts: '+50', date: '15 Dec' },
                    ].map(h => (
                      <div key={h.desc} className="flex justify-between items-center py-2 border-b border-border text-[0.85rem] font-body">
                        <div>
                          <p className="text-foreground">{h.desc}</p>
                          <p className="text-[0.75rem] text-muted-foreground">{h.date}</p>
                        </div>
                        <span className="text-primary font-medium">{h.pts}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'consultations' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic">Consultations</h2>
                <div className="space-y-4">
                  <div className="wyw-card border border-border p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[0.85rem] font-body font-medium text-foreground">Virtual Styling Session</p>
                      <span className="text-[0.625rem] bg-primary text-primary-foreground px-2 py-1 font-body uppercase tracking-[0.1em]">Upcoming</span>
                    </div>
                    <p className="text-[0.75rem] text-muted-foreground font-body">15 Mar 2026 · 14:00 · Virtual</p>
                  </div>
                  <div className="wyw-card border border-border p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[0.85rem] font-body font-medium text-foreground">In-Store Wardrobe Review</p>
                      <span className="text-[0.625rem] bg-muted text-muted-foreground px-2 py-1 font-body uppercase tracking-[0.1em]">Completed</span>
                    </div>
                    <p className="text-[0.75rem] text-muted-foreground font-body">10 Jan 2026 · 11:00 · Edinburgh</p>
                  </div>
                </div>
              </div>
            )}

            {tab === 'referral' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic">Referral Code</h2>
                <p className="text-muted-foreground text-[0.85rem] mb-6 font-body font-light">Share your code with friends. When they make their first purchase, you both get 10% off.</p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 bg-muted px-6 py-4 font-display text-2xl tracking-widest text-center text-foreground">
                    WYW-JD2024
                  </div>
                  <Button variant="default" onClick={copyCode}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">Share via Email</Button>
                  <Button variant="outline" size="sm">Share via WhatsApp</Button>
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl mb-4 italic">Profile</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'First Name', value: 'Jordan' },
                      { label: 'Last Name', value: 'Davis' },
                      { label: 'Email', value: 'jordan@email.com', type: 'email' },
                      { label: 'Phone', value: '+44 7700 123456', type: 'tel' },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">{field.label}</label>
                        <input type={field.type || 'text'} defaultValue={field.value}
                          className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-2xl mb-4 italic">Notification Preferences</h2>
                  <div className="space-y-3">
                    {['Email notifications', 'SMS notifications', 'Marketing emails', 'Sale alerts'].map(pref => (
                      <label key={pref} className="flex items-center justify-between p-4 border-b border-border">
                        <span className="text-[0.85rem] font-body text-foreground">{pref}</span>
                        <input type="checkbox" defaultChecked className="accent-primary" />
                      </label>
                    ))}
                  </div>
                </div>
                <Button variant="default">Save Changes</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
