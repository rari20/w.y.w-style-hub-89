import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Calendar, Zap, Gift, MapPin, Bell, CreditCard, Share2, Copy, Check, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import AccountQuickLinks from '@/components/AccountQuickLinks';
import AccountFeedback from '@/components/AccountFeedback';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { products } from '@/data/products';
import { ADMIN_EMAIL } from '@/data/adminData';

type Tab = 'overview' | 'orders' | 'returns' | 'wishlist' | 'rewards' | 'consultations' | 'referral' | 'settings';

const TEST_CUSTOMER_EMAIL = 'test.customer@wyw-demo.com';

// ─── Admin profile data (Jamie Davidson — Volt tier, 847 pts) ───
const adminOrders = [
  { id: 'WYW-2026-0042', date: '28 Feb 2026', items: 2, total: '£214.00', status: 'DELIVERED', statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', fulfilment: 'delivery' as const, collectStore: '', products: [
    { name: 'Current Minimal Tee', collection: 'Voltex Studio', size: 'M', color: 'White', qty: 1, price: 85 },
    { name: 'Charged Slim Chinos', collection: 'Voltex Studio', size: '32', color: 'Sand', qty: 1, price: 129 },
  ]},
  { id: 'WYW-2026-0031', date: '14 Jan 2026', items: 1, total: '£385.00', status: 'DELIVERED', statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', fulfilment: 'collect' as const, collectStore: 'Edinburgh — 14 George Street, EH2 2PF', products: [
    { name: 'Gossamer Wrap Dress', collection: 'Lumenwear', size: 'S', color: 'Champagne', qty: 1, price: 385 },
  ]},
  { id: 'WYW-2026-0018', date: '03 Dec 2025', items: 3, total: '£647.00', status: 'DELIVERED', statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', fulfilment: 'delivery' as const, collectStore: '', products: [
    { name: 'Ethereal Silk Blouse', collection: 'Lumenwear', size: 'S', color: 'Ivory', qty: 1, price: 245 },
    { name: 'Arc Pleat Skirt', collection: 'ArcThread', size: 'M', color: 'Cream', qty: 1, price: 245 },
    { name: 'Thread Linen Shirt', collection: 'ArcThread', size: 'S', color: 'White', qty: 1, price: 135 },
  ]},
];

const adminWishlist = [
  { name: 'Ethereal Silk Blouse', collection: 'Lumenwear', price: 245, savedDays: 34, productId: 'lw1' },
  { name: 'Heavy Wool Overcoat', collection: 'KiloKouture', price: 895, savedDays: 12, productId: 'kk2' },
  { name: 'Arc Pleat Skirt', collection: 'ArcThread', price: 245, savedDays: 41, productId: 'at3' },
  { name: 'Voltage Track Jacket', collection: 'Voltex Studio', price: 345, savedDays: 8, productId: 'vs4' },
];

const adminActivity = { lastPurchase: '14 days ago', ordersThisYear: '3', returnRate: '0%', consultations: '1' };
const adminLoyalty = { tier: 'Volt', points: 847, toNext: 653, nextTier: 'Surge', progress: 56 };
const adminReferralCode = 'WYW-JD2024';

// ─── Test customer profile data (Sam Riley — Spark tier, 310 pts, at-risk) ───
// This mirrors dataset row C013 on the admin dashboard
const customerOrders = [
  { id: 'WYW-2026-0029', date: '22 Dec 2025', items: 1, total: '£175.00', status: 'DELIVERED', statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', fulfilment: 'collect' as const, collectStore: 'Glasgow — 55 Buchanan Street, G1 3HL', products: [
    { name: 'Thread Linen Shirt', collection: 'ArcThread', size: 'M', color: 'Sand', qty: 1, price: 175 },
  ]},
  { id: 'WYW-2025-0088', date: '10 Sep 2025', items: 1, total: '£135.00', status: 'DELIVERED', statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300', fulfilment: 'delivery' as const, collectStore: '', products: [
    { name: 'Current Minimal Tee', collection: 'Voltex Studio', size: 'L', color: 'Black', qty: 1, price: 135 },
  ]},
];

const customerWishlist = [
  { name: 'Heavy Wool Overcoat', collection: 'KiloKouture', price: 895, savedDays: 52, productId: 'kk2' },
  { name: 'Voltage Track Jacket', collection: 'Voltex Studio', price: 345, savedDays: 45, productId: 'vs4' },
  { name: 'Gossamer Wrap Dress', collection: 'Lumenwear', price: 385, savedDays: 38, productId: 'lw3' },
];

const customerActivity = { lastPurchase: '78 days ago', ordersThisYear: '2', returnRate: '28%', consultations: '0' };
const customerLoyalty = { tier: 'Spark', points: 310, toNext: 190, nextTier: 'Volt', progress: 62 };
const customerReferralCode = 'WYW-SR2025';

const tiers = [
  { name: 'Spark', range: '0–499 pts', color: 'border-muted', benefits: ['Early access to sales', 'Birthday discount 10%'] },
  { name: 'Volt', range: '500–1,499 pts', color: 'border-amber-400 dark:border-amber-500', benefits: ['All Spark benefits', 'Free standard delivery', '15% birthday discount'] },
  { name: 'Surge', range: '1,500–3,999 pts', color: 'border-blue-400 dark:border-blue-500', benefits: ['All Volt benefits', 'Free express delivery', 'Priority customer service', '20% birthday discount'] },
  { name: 'Watt', range: '4,000+ pts', color: 'border-yellow-500 dark:border-yellow-400', benefits: ['All Surge benefits', 'Personal stylist', 'Exclusive brand previews', '25% birthday discount'] },
];

export default function Account() {
  usePageTitle('My Account');
  const { user, profile, loading, signOut } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);
  const [promoEmails, setPromoEmails] = useState(true);
  const [stylingEmails, setStylingEmails] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [returnOrder, setReturnOrder] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [showReturnForm, setShowReturnForm] = useState(false);

  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Redirect admin to /admin immediately
  useEffect(() => {
    if (!loading && user?.email === ADMIN_EMAIL) {
      navigate('/admin', { replace: true });
    }
  }, [user, loading, navigate]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setAuthError(error.message); toast.error(error.message); }
    else { toast.success('Welcome back!'); }
    setAuthLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: window.location.origin, data: { first_name: firstName, last_name: lastName } },
    });
    if (error) { setAuthError(error.message); toast.error(error.message); }
    else { toast.success('Account created successfully!'); }
    setAuthLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setAuthLoading(true);
    setAuthError('');
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + '/account' });
    if (result.error) { setAuthError(result.error.message); toast.error(result.error.message); }
    setAuthLoading(false);
  };

  const handleSignOut = async () => { await signOut(); toast('Signed out'); };

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
              <div className="mt-6 space-y-3">
                <p className="text-center text-[0.7rem] text-muted-foreground font-body uppercase tracking-[0.15em]">Or continue with</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => handleOAuth('google')} disabled={authLoading} className="w-full text-[0.75rem]">Google</Button>
                  <Button variant="outline" onClick={() => handleOAuth('apple')} disabled={authLoading} className="w-full text-[0.75rem]">Apple</Button>
                </div>
              </div>
            </div>
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
              <p className="text-[0.75rem] text-muted-foreground mt-4 text-center font-body">Or scan a QR code in-store to register instantly</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : user.email?.split('@')[0] || 'User';

  const isTestAdmin = user.email === ADMIN_EMAIL;
  const isTestCustomer = user.email === TEST_CUSTOMER_EMAIL;

  // Select profile-specific data
  const testOrders = isTestAdmin ? adminOrders : isTestCustomer ? customerOrders : [];
  const wishlistItems = isTestAdmin ? adminWishlist : isTestCustomer ? customerWishlist : [];
  const activity = isTestAdmin ? adminActivity : isTestCustomer ? customerActivity : { lastPurchase: '—', ordersThisYear: '0', returnRate: '0%', consultations: '0' };
  const loyalty = isTestAdmin ? adminLoyalty : isTestCustomer ? customerLoyalty : { tier: 'Spark', points: 0, toNext: 500, nextTier: 'Volt', progress: 0 };
  const referralCode = isTestAdmin ? adminReferralCode : isTestCustomer ? customerReferralCode : 'WYW-XXXX';

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
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-[0.8125rem] font-body transition-colors whitespace-nowrap shrink-0 ${
                    tab === t.id ? 'bg-foreground text-background' : 'hover:bg-muted text-foreground'
                  } lg:w-full`}>
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

            {/* ═══════ TAB 1: OVERVIEW ═══════ */}
            {tab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Access Cards */}
                <AccountQuickLinks onTabChange={(t) => setTab(t as Tab)} />

                {/* Section A: Loyalty Tier Widget */}
                <div className="bg-secondary text-secondary-foreground p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Current Tier</p>
                      <h3 className="font-display flex items-center gap-2 text-foreground" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                        <Zap className="h-5 w-5 text-amber-500" strokeWidth={1.5} /> {loyalty.tier}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">Points Balance</p>
                      <p className="font-display text-foreground" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>{loyalty.points}</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-1">
                    <div className="bg-primary h-1" style={{ width: `${loyalty.progress}%` }} />
                  </div>
                  <p className="text-[0.75rem] text-muted-foreground mt-2 font-body">{loyalty.toNext} points to {loyalty.nextTier}</p>
                </div>

                {/* Section B: Four-metric activity */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Last Purchase', value: activity.lastPurchase },
                    { label: 'Orders This Year', value: activity.ordersThisYear },
                    { label: 'Return Rate', value: activity.returnRate },
                    { label: 'Consultations Booked', value: activity.consultations },
                  ].map(stat => (
                    <div key={stat.label} className="border border-border p-3 md:p-4">
                      <p className="text-[0.575rem] md:text-[0.625rem] text-muted-foreground font-body uppercase tracking-[0.1em]">{stat.label}</p>
                      <p className="font-display text-lg md:text-xl mt-1 text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Section C: Recent Orders */}
                <div>
                  <h3 className="font-display text-xl mb-4 italic text-foreground">Recent Orders</h3>
                  <div className="space-y-3">
                    {testOrders.slice(0, 2).map(o => (
                      <div key={o.id} className="border border-border p-4">
                        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                          <p className="text-[0.85rem] font-body font-medium text-foreground">{o.id}</p>
                          <span className={`text-[0.6rem] px-2 py-0.5 font-body uppercase tracking-[0.1em] ${o.statusColor}`}>{o.status}</span>
                        </div>
                        <p className="text-[0.75rem] text-muted-foreground font-body">{o.date} · {o.items} item{o.items > 1 ? 's' : ''} · {o.total}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section D: Quick-access cards */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { icon: Gift, label: 'Active Coupons', value: '2' },
                    { icon: MapPin, label: 'Saved Addresses', value: '1' },
                    { icon: CreditCard, label: 'Payment Methods', value: '1' },
                    { icon: Share2, label: 'Referral Code', value: referralCode },
                  ].map(item => (
                    <div key={item.label} className="border border-border p-3 md:p-4 text-center">
                      <item.icon className="h-5 w-5 mx-auto text-primary mb-2" strokeWidth={1.5} />
                      <p className="text-[0.575rem] md:text-[0.625rem] text-muted-foreground font-body uppercase tracking-[0.1em]">{item.label}</p>
                      <p className="font-body font-medium text-[0.8rem] md:text-[0.85rem] mt-1 text-foreground break-all">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Feedback Section */}
                <AccountFeedback lastOrderId={testOrders[0]?.id} />
              </div>
            )}

            {/* ═══════ TAB 2: ORDERS ═══════ */}
            {tab === 'orders' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Order History</h2>
                <div className="space-y-3">
                  {testOrders.map(o => (
                    <div key={o.id} className="border border-border">
                      <button className="w-full p-4 text-left flex items-center justify-between" onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <p className="text-[0.85rem] font-body font-medium text-foreground">{o.id}</p>
                            <span className={`text-[0.6rem] px-2 py-0.5 font-body uppercase tracking-[0.1em] ${o.statusColor}`}>{o.status}</span>
                            {o.fulfilment === 'collect' && (
                              <span className="text-[0.6rem] px-2 py-0.5 font-body uppercase tracking-[0.1em] bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Click & Collect</span>
                            )}
                          </div>
                          <p className="text-[0.75rem] text-muted-foreground font-body mt-1">{o.date} · {o.items} item{o.items > 1 ? 's' : ''} · {o.total}</p>
                        </div>
                        {expandedOrder === o.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </button>
                      {expandedOrder === o.id && (
                        <div className="border-t border-border px-4 pb-4">
                          {o.fulfilment === 'collect' && o.collectStore && (
                            <div className="flex items-center gap-2 py-3 border-b border-border">
                              <MapPin className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.5} />
                              <p className="text-[0.8rem] font-body text-foreground">Collection store: {o.collectStore}</p>
                            </div>
                          )}
                          {o.products.map((p, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                              <div>
                                <p className="text-[0.8rem] font-body text-foreground">{p.name}</p>
                                <p className="text-[0.7rem] text-muted-foreground font-body">{p.collection} · {p.size} · {p.color} · Qty {p.qty}</p>
                              </div>
                              <p className="text-[0.8rem] font-body text-foreground">£{p.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════ TAB 3: RETURNS ═══════ */}
            {tab === 'returns' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Returns</h2>
                <div className="border border-border p-6 md:p-8 text-center mb-6">
                  <Package className="h-10 w-10 mx-auto text-muted-foreground mb-3" strokeWidth={1} />
                  <p className="font-body text-[0.9rem] text-foreground mb-1">No active returns</p>
                  <p className="text-[0.75rem] text-muted-foreground font-body">You don't have any returns in progress.</p>
                </div>

                <h3 className="font-display text-lg mb-3 italic text-foreground">Return History</h3>
                <p className="text-[0.8rem] text-muted-foreground font-body mb-6">No previous returns on record.</p>

                {!showReturnForm ? (
                  <Button variant="outline" onClick={() => setShowReturnForm(true)}>Start a Return</Button>
                ) : (
                  <div className="border border-border p-5 space-y-4">
                    <h3 className="font-body text-sm font-medium text-foreground">Start a Return</h3>
                    <div>
                      <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Order Number</label>
                      <input type="text" value={returnOrder} onChange={e => setReturnOrder(e.target.value)} placeholder="WYW-2026-XXXX"
                        className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" />
                    </div>
                    <div>
                      <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Reason</label>
                      <select value={returnReason} onChange={e => setReturnReason(e.target.value)}
                        className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground">
                        <option value="">Select a reason</option>
                        <option value="wrong-size">Wrong size</option>
                        <option value="changed-mind">Changed mind</option>
                        <option value="faulty">Faulty item</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="default" size="sm" onClick={() => { toast.success('Return request submitted'); setShowReturnForm(false); setReturnOrder(''); setReturnReason(''); }}>Submit</Button>
                      <Button variant="ghost" size="sm" onClick={() => setShowReturnForm(false)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ═══════ TAB 4: WISHLIST ═══════ */}
            {tab === 'wishlist' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Wishlist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    const showNudge = item.savedDays >= 30;
                    return (
                      <div key={item.productId} className="border border-border overflow-hidden">
                        {product && <img src={product.image} alt={item.name} className="w-full h-48 object-cover" />}
                        <div className="p-4">
                          <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body">{item.collection}</p>
                          <p className="font-body text-[0.9rem] font-medium text-foreground">{item.name}</p>
                          <p className="font-body text-[0.85rem] text-foreground mt-1">£{item.price.toFixed(2)}</p>
                          {showNudge && (
                            <div className="mt-2">
                              <span className="text-[0.7rem] bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 font-body">
                                Saved {item.savedDays} days ago · Price unchanged
                              </span>
                            </div>
                          )}
                          <div className="mt-3 flex gap-2">
                            <Button variant="default" size="sm" className="text-[0.75rem]" onClick={() => {
                              if (product) {
                                addItem(product, product.sizes[1] || product.sizes[0], product.colors[0]);
                                toast.success(`${item.name} moved to basket`);
                              }
                            }}>Move to Basket</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ═══════ TAB 5: REWARDS ═══════ */}
            {tab === 'rewards' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl mb-2 italic text-foreground">W.Y.W Rewards</h2>
                <p className="text-[0.8rem] text-muted-foreground font-body">1 point earned per £1 spent.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tiers.map(tier => (
                    <div key={tier.name} className={`border-2 p-5 ${tier.name === loyalty.tier ? tier.color : 'border-border'}`}>
                      <h3 className="font-display text-lg text-foreground mb-1">{tier.name}</h3>
                      <p className="text-[0.7rem] text-muted-foreground font-body mb-3">{tier.range}</p>
                      <ul className="space-y-1">
                        {tier.benefits.map(b => (
                          <li key={b} className="text-[0.8rem] text-foreground font-body flex items-start gap-2">
                            <Check className="h-3 w-3 text-primary mt-1 shrink-0" strokeWidth={2} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {tier.name === loyalty.tier && (
                        <p className="text-[0.7rem] text-amber-600 dark:text-amber-400 font-body mt-3 font-medium">Your current tier</p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[0.7rem] text-muted-foreground font-body">Points expire after 24 months of inactivity.</p>
              </div>
            )}

            {/* ═══════ TAB 6: CONSULTATIONS ═══════ */}
            {tab === 'consultations' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Consultations</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-3">Past</h3>
                    <div className="border border-border p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <p className="text-[0.85rem] font-body font-medium text-foreground">In-Store Styling Session</p>
                        <span className="text-[0.6rem] bg-muted text-muted-foreground px-2 py-0.5 font-body uppercase tracking-[0.1em]">Completed</span>
                      </div>
                      <p className="text-[0.75rem] text-muted-foreground font-body">Edinburgh — 14 George Street · 15 Jan 2026</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link to="/consultation">Book New Consultation</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* ═══════ TAB 7: REFERRAL ═══════ */}
            {tab === 'referral' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Refer a Friend</h2>
                <p className="text-muted-foreground font-body font-light mb-6 text-sm">
                  Share your code and earn 100 points for every friend who makes their first purchase.
                </p>
                <div className="border-2 border-border p-6 md:p-8 flex items-center justify-between flex-wrap gap-4 mb-8">
                  <div>
                    <p className="text-[0.625rem] text-muted-foreground uppercase tracking-[0.15em] font-body mb-1">Your Referral Code</p>
                    <p className="font-display text-2xl md:text-3xl text-foreground">{referralCode}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyCode(referralCode)} className="flex items-center gap-2">
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy Code'}
                  </Button>
                </div>

                <h3 className="font-body text-sm font-medium mb-3 text-foreground">Referral History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[0.85rem] font-body min-w-[400px]">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Friend's Email</th>
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Date Joined</th>
                        <th className="py-3 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground font-medium">Points Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 text-foreground">friend@example.com</td>
                        <td className="py-3 text-foreground">20 Jan 2026</td>
                        <td className="py-3 text-primary font-medium">100 pts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ═══════ TAB 8: SETTINGS ═══════ */}
            {tab === 'settings' && (
              <div>
                <h2 className="font-display text-2xl mb-4 italic text-foreground">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-[0.75rem] text-muted-foreground font-body mb-2">Signed in as <span className="text-foreground">{user.email}</span></p>
                  </div>

                  {/* Email Notification Toggles */}
                  <div>
                    <h3 className="font-body text-sm font-medium mb-4 text-foreground">Email Notifications</h3>
                    <div className="space-y-4">
                      {/* Order Updates — locked on */}
                      <div className="flex items-center justify-between gap-4 py-3 border-b border-border">
                        <div className="flex-1">
                          <p className="text-[0.85rem] font-body font-medium text-foreground">Order Updates</p>
                          <p className="text-[0.7rem] text-muted-foreground font-body">Confirmations, dispatch notifications and delivery updates</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                          <div className="w-11 h-6 bg-primary rounded-full relative cursor-not-allowed opacity-70">
                            <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-background rounded-full shadow" />
                          </div>
                        </div>
                      </div>
                      {/* Promotions — toggleable */}
                      <div className="flex items-center justify-between gap-4 py-3 border-b border-border">
                        <div className="flex-1">
                          <p className="text-[0.85rem] font-body font-medium text-foreground">Promotions & New Arrivals</p>
                          <p className="text-[0.7rem] text-muted-foreground font-body">Sales, new collections and exclusive offers</p>
                        </div>
                        <button
                          onClick={() => { setPromoEmails(!promoEmails); toast.success('Preference saved'); }}
                          className={`w-11 h-6 rounded-full relative transition-colors ${promoEmails ? 'bg-primary' : 'bg-muted'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow transition-transform ${promoEmails ? 'right-0.5' : 'left-0.5'}`} />
                        </button>
                      </div>
                      {/* Styling Tips — toggleable */}
                      <div className="flex items-center justify-between gap-4 py-3 border-b border-border">
                        <div className="flex-1">
                          <p className="text-[0.85rem] font-body font-medium text-foreground">Styling Tips & Consultation Reminders</p>
                          <p className="text-[0.7rem] text-muted-foreground font-body">Personalised style advice and booking reminders</p>
                        </div>
                        <button
                          onClick={() => { setStylingEmails(!stylingEmails); toast.success('Preference saved'); }}
                          className={`w-11 h-6 rounded-full relative transition-colors ${stylingEmails ? 'bg-primary' : 'bg-muted'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow transition-transform ${stylingEmails ? 'right-0.5' : 'left-0.5'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Saved Addresses */}
                  <div>
                    <h3 className="font-body text-sm font-medium mb-3 text-foreground">Saved Addresses</h3>
                    <div className="border border-border p-4 flex items-center justify-between">
                      <div>
                        <p className="text-[0.85rem] font-body text-foreground">14 George Street, Edinburgh, EH2 2PF</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[0.75rem]">Edit</Button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="font-body text-sm font-medium mb-3 text-foreground">Payment Methods</h3>
                    <div className="border border-border p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                        <p className="text-[0.85rem] font-body text-foreground">Visa ending in 4242</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[0.75rem] text-destructive">Remove</Button>
                    </div>
                  </div>

                  {/* Delete Account */}
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
