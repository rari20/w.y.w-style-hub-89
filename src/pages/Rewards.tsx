import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { Zap, Star, Award, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useAuth } from '@/context/AuthContext';

const tiers = [
  { icon: Zap, name: 'Spark', range: '0–499 points', benefits: ['1 point per £1 spent', 'Birthday coupon', 'Standard support'] },
  { icon: Star, name: 'Volt', range: '500–1,499 points', benefits: ['All Spark benefits', '10% off consultations', 'Early access to sales', 'Free standard delivery'] },
  { icon: Award, name: 'Surge', range: '1,500–3,999 points', benefits: ['All Surge benefits', '25% off consultations', 'Early access to drops', 'Free next-day delivery'] },
  { icon: Crown, name: 'Watt', range: '4,000+ points', benefits: ['All Surge benefits', 'Free consultations', 'Exclusive collections', 'Priority support', 'VIP events'] },
];

export default function Rewards() {
  usePageTitle('Rewards');
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Rewards' }]} />

        <Reveal>
          <div className="text-center mb-16">
            <Zap className="h-8 w-8 mx-auto text-accent mb-4" strokeWidth={1.5} />
            <h1 className="text-4xl md:text-6xl font-display mb-4 text-foreground">W.Y.W Rewards</h1>
            <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed font-body font-light">
              Earn 1 point for every £1 spent. Unlock tiers and enjoy exclusive perks.
            </p>
          </div>
        </Reveal>

        {/* Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {tiers.map((tier, i) => {
            const isSelected = selectedTier === tier.name;
            return (
              <Reveal key={tier.name} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => setSelectedTier(isSelected ? null : tier.name)}
                  className={`w-full text-left bg-background border p-6 flex flex-col h-full cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-accent ring-2 ring-accent/30 shadow-lg'
                      : i === 3
                      ? 'border-accent hover:border-accent hover:shadow-md'
                      : 'border-border hover:border-foreground/30 hover:shadow-md'
                  }`}
                >
                  <tier.icon className={`h-5 w-5 mb-3 shrink-0 transition-colors ${isSelected ? 'text-accent' : 'text-accent'}`} strokeWidth={1.5} />
                  <h3 className="font-display text-xl mb-1 text-foreground">{tier.name}</h3>
                  <p className="text-[0.7rem] text-muted-foreground mb-4 font-body tracking-wide">{tier.range}</p>
                  <ul className="space-y-2 flex-1">
                    {tier.benefits.map(b => (
                      <li key={b} className="text-[0.8rem] text-muted-foreground flex items-start gap-2 font-body font-light leading-snug">
                        <Zap className="h-3 w-3 text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {isSelected && (
                    <p className="text-[0.7rem] text-accent font-body mt-4 uppercase tracking-wider">Selected</p>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Tier warning — only for logged-in users */}
        {user && (
          <Reveal>
            <div className="bg-accent/10 border border-accent/30 p-4 md:p-5 mb-16 flex items-start gap-3">
              <Zap className="h-5 w-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-body text-[0.85rem] font-medium text-foreground">
                  You're 153 points away from maintaining your Volt status.
                </p>
                <p className="font-body text-[0.78rem] text-muted-foreground mt-1">
                  Shop before 8 April 2026 to keep your benefits. Dropping a tier means losing access to 10% consultation discounts, early sale access, and free standard delivery.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* How it works */}
        <Reveal>
          <div className="bg-muted p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-display mb-6 text-center italic text-foreground">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { num: '1', title: 'Shop', desc: 'Earn 1 point per £1 spent online or in-store.' },
                { num: '2', title: 'Level Up', desc: 'Reach new tiers to unlock better rewards.' },
                { num: '3', title: 'Redeem', desc: 'Use points at checkout for discounts.' },
              ].map(item => (
                <div key={item.num}>
                  <div className="w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-3 font-display text-lg">{item.num}</div>
                  <h3 className="font-display text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-[0.8rem] text-muted-foreground font-body font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Referral */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl font-display mb-4 italic text-foreground">Refer a Friend</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6 font-body font-light text-[0.9rem]">
              Share your unique referral code. When your friend makes their first purchase, you both get a discount.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/account">Get Your Code</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
