import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Calendar, Zap, Gift, MapPin, Bell, CreditCard, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Tab = 'dashboard' | 'orders' | 'wishlist' | 'consultations' | 'settings';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="wyw-container py-8 max-w-md mx-auto">
          <h1 className="text-5xl font-display mb-8 text-center">SIGN IN</h1>
          <form onSubmit={e => { e.preventDefault(); setIsLoggedIn(true); toast.success('Welcome back!'); }} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full">Sign In</Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account? <button onClick={() => { setIsLoggedIn(true); toast.success('Account created!'); }} className="text-accent underline">Register</button>
            </p>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Or scan a QR code in-store to register instantly</p>
            </div>
          </form>
        </div>
      </Layout>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'consultations', label: 'Consultations', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Bell },
  ];

  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-5xl font-display mb-8">MY ACCOUNT</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-sm transition-colors ${
                  tab === t.id ? 'bg-foreground text-background' : 'hover:bg-muted'
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
            <button onClick={() => { setIsLoggedIn(false); toast('Signed out'); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-sm text-destructive hover:bg-muted">
              Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === 'dashboard' && (
              <div className="space-y-6">
                {/* Loyalty Card */}
                <div className="bg-secondary text-secondary-foreground p-6 rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-secondary-foreground/60 uppercase tracking-widest">Current Tier</p>
                      <h3 className="font-display text-3xl">⚡ VOLT</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-secondary-foreground/60 uppercase tracking-widest">Points Balance</p>
                      <p className="font-display text-3xl">847</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary-foreground/20 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '56%' }} />
                  </div>
                  <p className="text-xs text-secondary-foreground/60 mt-2">653 points to Surge tier</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Share2, label: 'Referral Code', value: 'WYW-JD2024' },
                    { icon: Gift, label: 'Active Coupons', value: '2' },
                    { icon: MapPin, label: 'Saved Addresses', value: '1' },
                    { icon: CreditCard, label: 'Payment Methods', value: '1' },
                  ].map(item => (
                    <div key={item.label} className="wyw-card p-4 text-center">
                      <item.icon className="h-5 w-5 mx-auto text-accent mb-2" />
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-sm mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h2 className="font-display text-2xl mb-4">ORDER HISTORY</h2>
                <div className="wyw-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Order #WYW-2026-0042</p>
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-sm">Delivered</span>
                  </div>
                  <p className="text-xs text-muted-foreground">28 Feb 2026 · 2 items · £214.00</p>
                </div>
              </div>
            )}

            {tab === 'wishlist' && (
              <div>
                <h2 className="font-display text-2xl mb-4">WISHLIST</h2>
                <p className="text-muted-foreground">Your wishlist is empty. Browse our collections to add items.</p>
              </div>
            )}

            {tab === 'consultations' && (
              <div>
                <h2 className="font-display text-2xl mb-4">CONSULTATIONS</h2>
                <div className="wyw-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Virtual Styling Session</p>
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-sm">Upcoming</span>
                  </div>
                  <p className="text-xs text-muted-foreground">15 Mar 2026 · 14:00 · Virtual</p>
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div>
                <h2 className="font-display text-2xl mb-4">NOTIFICATION PREFERENCES</h2>
                <div className="space-y-4">
                  {['Email notifications', 'SMS notifications', 'Marketing emails', 'Sale alerts'].map(pref => (
                    <label key={pref} className="flex items-center justify-between p-4 border border-border rounded-sm">
                      <span className="text-sm">{pref}</span>
                      <input type="checkbox" defaultChecked className="accent-accent" />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
