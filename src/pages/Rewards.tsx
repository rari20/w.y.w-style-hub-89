import Layout from '@/components/Layout';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const tiers = [
  {
    emoji: '🔌',
    name: 'Spark',
    range: '0–499 points',
    benefits: ['1 point per £1 spent', 'Birthday coupon', 'Standard customer support'],
  },
  {
    emoji: '⚡',
    name: 'Volt',
    range: '500–1,499 points',
    benefits: ['All Spark benefits', '10% off consultations', 'Early access to sales', 'Free standard delivery'],
  },
  {
    emoji: '🌩️',
    name: 'Surge',
    range: '1,500–3,999 points',
    benefits: ['All Volt benefits', '25% off consultations', 'Early access to drops', 'Free next-day delivery'],
  },
  {
    emoji: '💥',
    name: 'Watt',
    range: '4,000+ points',
    benefits: ['All Surge benefits', 'Free consultations', 'Exclusive collections access', 'Priority support', 'VIP events'],
  },
];

export default function Rewards() {
  return (
    <Layout>
      <div className="wyw-container py-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <Zap className="h-12 w-12 mx-auto text-accent mb-4" />
          <h1 className="text-5xl md:text-7xl font-display mb-4">W.Y.W REWARDS</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Earn 1 point for every £1 spent, online or in-store. Unlock tiers and enjoy exclusive perks.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {tiers.map((tier, i) => (
            <div key={tier.name} className={`wyw-card p-6 ${i === 3 ? 'border-accent border-2' : ''}`}>
              <span className="text-3xl">{tier.emoji}</span>
              <h3 className="font-display text-3xl mt-2 mb-1">{tier.name.toUpperCase()}</h3>
              <p className="text-sm text-accent mb-4">{tier.range}</p>
              <ul className="space-y-2">
                {tier.benefits.map(b => (
                  <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Zap className="h-3 w-3 text-accent mt-1 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-muted p-8 rounded-sm mb-16">
          <h2 className="text-3xl font-display mb-6 text-center">HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-display text-xl">1</div>
              <h3 className="font-display text-xl mb-2">SHOP</h3>
              <p className="text-sm text-muted-foreground">Earn 1 point per £1 spent online or in-store.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-display text-xl">2</div>
              <h3 className="font-display text-xl mb-2">LEVEL UP</h3>
              <p className="text-sm text-muted-foreground">Reach new tiers to unlock better rewards and perks.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-display text-xl">3</div>
              <h3 className="font-display text-xl mb-2">REDEEM</h3>
              <p className="text-sm text-muted-foreground">Use points at checkout for discounts on your next order.</p>
            </div>
          </div>
        </div>

        {/* Referral */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display mb-4">REFER A FRIEND</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Share your unique referral code. When your friend makes their first purchase, you both get a discount.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/account">Get Your Code</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
