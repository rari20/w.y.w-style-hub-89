import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Calendar, Zap, Gift, MapPin, Bell, CreditCard, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { products } from '@/data/products';

type Tab = 'overview' | 'orders' | 'returns' | 'wishlist' | 'rewards' | 'consultations' | 'referral' | 'settings';

export default function Account() {
  const { user, profile, loading, signOut } = useAuth();
  const { addItem } = useCart();
  const [tab, setTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);
  const [promoEmails, setPromoEmails] = useState(true);
  const [stylingEmails, setStylingEmails] = useState(true);
  const [rewardsMilestones, setRewardsMilestones] = useState(true);

  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const copyCode = () => {
    navigator.clipboard.writeText('WYW-JD2024');
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      toast.error(error.message);
    } else {
      toast.success('Welcome back!');
    }
    setAuthLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { first_name: firstName, last_name: lastName },
      },
    });
    if (error) {
      setAuthError(error.message);
      toast.error(error.message);
    } else {
      toast.success('Check your email to confirm your account!');
    }
    setAuthLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setAuthLoading(true);
    setAuthError('');
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin + '/account',
    });
    if (result.error) {
      setAuthError(result.error.message);
      toast.error(result.error.message);
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast('Signed out');
  };

  if (loading) {
    return (
      <Layout>
        <div className="wyw-container pt-24 pb-16 flex justify-center">
          <p className="text-muted-foreground font-body">Loading…</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="wyw-container pt-24 pb-16 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-display mb-10 md:mb-12 text-center italic text-foreground">My Account</h1>

          {authError && (
            <div className="mb-6 border border-destructive/30 bg-destructive/5 p-3 text-center">
              <p className="text-sm text-destructive font-body">{authError}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Sign In */}
            <div>
              <h2 className="font-display text-xl md:text-2xl mb-5 md:mb-6 text-foreground">Sign In</h2>
              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="••••••••" />
                </div>
                <Button variant="default" size="lg" type="submit" className="w-full" disabled={authLoading}>
                  {authLoading ? 'Signing in…' : 'Sign In'}
                </Button>
              </form>

              {/* Social Login */}
              <div className="mt-6 space-y-3">
                <p className="text-center text-[0.7rem] text-muted-foreground font-body uppercase tracking-[0.15em]">Or continue with</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => handleOAuth('google')} disabled={authLoading} className="w-full text-[0.75rem]">
                    Google
                  </Button>
                  <Button variant="outline" onClick={() => handleOAuth('apple')} disabled={authLoading} className="w-full text-[0.75rem]">
                    Apple
                  </Button>
                </div>
              </div>
            </div>

            {/* Create Account */}
            <div>
              <h2 className="font-display text-xl md:text-2xl mb-5 md:mb-6 text-foreground">Create Account</h2>
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                    className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" placeholder="Min 6 characters" />
                </div>
                <Button variant="default" size="lg" type="submit" className="w-full" disabled={authLoading}>
                  {authLoading ? 'Creating…' : 'Create Account'}
                </Button>
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

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : user.email?.split('@')[0] || 'User';

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
      <div className="wyw-container pt-24 pb-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
          <h1 className="text-3xl md:text-5xl font-display italic text-foreground">Welcome, {displayName}</h1>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-0">
          {/* Sidebar */}
          <div className="lg:border-r border-border lg:pr-0 lg:sticky lg:top-[68px] lg:self-start">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-[0.8125rem] font-body transition-colors whitespace-nowrap shrink-0 ${
                    tab === t.id ? 'bg-foreground text-background' : 'hover:bg-muted text-foreground'
                  } lg:w-full`}
                >
                  <t.icon className="h-4 w-4" strokeWidth={1.5} />
                  {t.label}
                </button>
              ))}
              <button onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 text-[0.8125rem] font-body text-destructive hover:bg-muted whitespace-nowrap shrink-0 lg:w-full lg:mt-2 lg:border-t border-border lg:pt-4">
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8 pt-6 lg:pt-0">
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-secondary text-secondary-foreground p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Current Tier</p>
                      <h3 className="font-display flex items-center gap-2 text-foreground text-xl md:text-2xl">
                        <Zap className="h-5 w-5 text-accent" strokeWidth={1.5} /> Volt
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Points Balance</p>
                      <p className="font-display text-foreground text-xl md:text-2xl">847</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-1">
                    <div className="bg-primary h-1" style={{ width: '56%' }} />
                  </div>
                  <p className="text-[0.75rem] text-muted-foreground mt-2 font-body">653 points to Surge tier</p>
                </div>

                <div>
                  <h3 className="font-display text-xl mb-4 italic text-foreground">Recent Orders</h3>
                  <div className="border border-border p-4">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <p className="text-[0.85rem] font-body font-medium text-foreground">Order #WYW-2026-0042</p>
                      <span className="text-[0.625rem] bg-primary text-primary-foreground px-2 py-1 font-body uppercase tracking-[0.1em]">Delivered</span>
                    </div>
                    <p className="text-[0.75rem] text-muted-foreground font-body">28 Feb 2026 · 2 items · £214.00</p>
                  </div>
                </div>

                {/* Your Activity — churn model data */}
                <div>
                  <h3 className="font-display text-xl mb-4 italic text-foreground">Your Activity</h3>
                  <p className="text-[0.7rem] text-muted-foreground font-body mb-3">These metrics help us personalise your experience.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Last Purchase', value: '12 days ago', key: 'DaysSinceLastPurchase' },
                      { label: 'Orders This Year', value: '3', key: 'NumberOfOrders' },
                      { label: 'Return Rate', value: '0%', key: 'ReturnRate' },
                      { label: 'Consultations Booked', value: '1', key: 'ConsultationBooked' },
                    ].map(stat => (
                      <div key={stat.label} className="border border-border p-3 md:p-4">
                        <p className="text-[0.575rem] md:text-[0.625rem] text-muted-foreground font-body uppercase tracking-[0.1em]">{stat.label}</p>
                        <p className="font-display text-lg md:text-xl mt-1 text-foreground">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { icon: Gift, label: 'Active Coupons', value: '2' },
                    { icon: MapPin, label: 'Saved Addresses', value: '1' },
                    { icon: CreditCard, label: 'Payment Methods', value: '1' },
                    { icon: Share2, label: 'Referral Code', value: 'WYW-JD2024' },
                  ].map(item => (
                    <div key={item.label} className="border border-border p-3 md:p-4 text-center">
                      <item.icon className="h-5 w-5 mx-auto text-primary mb-2" strokeWidth={1.5} />
                      <p className="text-[0.575rem] md:text-[0.625rem] text-muted-foreground font-body uppercase tracking-[0.1em]">{item.label}</p>
                      <p className="font-body font-medium text-[0.8rem] md:text-[0.85rem] mt-1 text-foreground break-all">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Order History</h2>
                <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
                  <table className="w-full text-[0.85rem] font-body min-w-[500px]">
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
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Return Tracking</h2>
                <div className="border border-border p-4 md:p-6">
                  <p className="text-[0.85rem] font-body font-medium mb-4 text-foreground">Return #RET-2026-0015</p>
                  <div className="flex items-center gap-1 md:gap-2 mb-6">
                    {['Initiated', 'Received', 'Inspected', 'Refunded'].map((step, i) => (
                      <div key={step} className="flex items-center gap-1 md:gap-2 flex-1">
                        <div className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[9px] md:text-[10px] font-bold shrink-0 ${
                          i < 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {i < 2 ? <Check className="h-3 w-3" /> : i + 1}
                        </div>
                        <span className="text-[0.65rem] md:text-[0.75rem] hidden sm:inline text-foreground">{step}</span>
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
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Wishlist</h2>
                <div className="space-y-4">
                {/* Mock wishlist items with churn nudge */}
                  {[
                    { name: 'Ethereal Silk Blouse', brand: 'Lumenwear', price: 245, savedDays: 32, priceChanged: false, productId: 'lw1' },
                    { name: 'Arc Pleat Skirt', brand: 'ArcThread', price: 245, savedDays: 8, priceChanged: false, productId: 'at2' },
                  ].map(item => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <div key={item.name} className="border border-border p-4 flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">{item.brand}</p>
                          <p className="font-body text-[0.9rem] font-medium text-foreground">{item.name}</p>
                          <p className="font-body text-[0.85rem] text-foreground">£{item.price.toFixed(2)}</p>
                          {item.savedDays >= 30 && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-[0.7rem] bg-accent/10 text-accent px-2 py-0.5 font-body">
                                Saved {item.savedDays} days ago · Price unchanged
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          {item.savedDays >= 30 && product && (
                            <Button variant="default" size="sm" className="text-[0.75rem]" onClick={() => {
                              addItem(product, product.sizes[1] || product.sizes[0], product.colors[0]);
                              toast.success(`${item.name} moved to basket`);
                            }}>Move to Basket</Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-[0.75rem] text-destructive">Remove</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[0.7rem] text-muted-foreground font-body mt-4">
                  Items saved for 30+ days are flagged — we don't want you to miss out.
                </p>
              </div>
            )}

            {tab === 'rewards' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Rewards Wallet</h2>
                <div className="bg-secondary p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Current Tier</p>
                      <h3 className="font-display text-xl md:text-2xl flex items-center gap-2 text-foreground">
                        <Zap className="h-5 w-5 text-accent" strokeWidth={1.5} /> Volt
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Points</p>
                      <p className="font-display text-xl md:text-2xl text-foreground">847</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-1 mb-2">
                    <div className="bg-primary h-1" style={{ width: '56%' }} />
                  </div>
                  <p className="text-[0.75rem] text-muted-foreground font-body">653 points to Surge tier</p>
                </div>
                <div>
                  <h3 className="font-display text-lg mb-3 italic text-foreground">Points History</h3>
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
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Consultations</h2>
                <div className="space-y-4">
                  <div className="border border-border p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <p className="text-[0.85rem] font-body font-medium text-foreground">Virtual Styling Session</p>
                      <span className="text-[0.625rem] bg-primary text-primary-foreground px-2 py-1 font-body uppercase tracking-[0.1em]">Upcoming</span>
                    </div>
                    <p className="text-[0.75rem] text-muted-foreground font-body">15 Mar 2026 · 14:00 · Virtual</p>
                  </div>
                  <div className="border border-border p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
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
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Refer a Friend</h2>
                <p className="text-muted-foreground font-body font-light mb-6 text-sm">
                  Share your unique referral code. When your friend makes their first purchase, you both get a discount.
                </p>
                <div className="bg-secondary p-4 md:p-6 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body mb-1">Your Code</p>
                    <p className="font-display text-xl md:text-2xl text-foreground">WYW-JD2024</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyCode} className="flex items-center gap-2">
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy Code'}
                  </Button>
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-[0.75rem] text-muted-foreground font-body mb-2">Signed in as <span className="text-foreground">{user.email}</span></p>
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-medium mb-3 text-foreground">Email Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" checked disabled className="accent-primary" />
                        <span className="text-[0.85rem] font-body text-foreground">Order updates</span>
                        <span className="text-[0.625rem] text-muted-foreground font-body">(required)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={promoEmails} onChange={e => { setPromoEmails(e.target.checked); toast.success('Preference saved'); }} className="accent-primary" />
                        <span className="text-[0.85rem] font-body text-foreground">Promotions & new arrivals</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={stylingEmails} onChange={e => { setStylingEmails(e.target.checked); toast.success('Preference saved'); }} className="accent-primary" />
                        <span className="text-[0.85rem] font-body text-foreground">Styling tips & consultation reminders</span>
                      </label>
                    </div>
                    <p className="text-[0.65rem] text-muted-foreground font-body mt-2">
                      Your email preferences help us tailor communications. Opting out of promotional emails is recorded as a signal in our engagement model.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-medium mb-3 text-foreground">Other Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={rewardsMilestones} onChange={e => { setRewardsMilestones(e.target.checked); toast.success('Preference saved'); }} className="accent-primary" />
                        <span className="text-[0.85rem] font-body text-foreground">Rewards milestones</span>
                      </label>
                    </div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <Button variant="destructive" size="sm">Delete Account</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
