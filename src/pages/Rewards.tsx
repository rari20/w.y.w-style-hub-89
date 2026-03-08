import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { Zap, Star, Award, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const tiers = [
  { icon: Zap, name: 'Spark', range: '0–499 points', benefits: ['1 point per £1 spent', 'Birthday coupon', 'Standard support'] },
  { icon: Star, name: 'Volt', range: '500–1,499 points', benefits: ['All Spark benefits', '10% off consultations', 'Early access to sales', 'Free standard delivery'] },
  { icon: Award, name: 'Surge', range: '1,500–3,999 points', benefits: ['All Volt benefits', '25% off consultations', 'Early access to drops', 'Free next-day delivery'] },
  { icon: Crown, name: 'Watt', range: '4,000+ points', benefits: ['All Surge benefits', 'Free consultations', 'Exclusive collections', 'Priority support', 'VIP events'] },
];

export default function Rewards() {
  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Rewards' }]} />

        <Reveal>
          <div className="text-center mb-16">
            <Zap className="h-10 w-10 mx-auto text-accent mb-4" strokeWidth={1.5} />
            <h1 className="text-5xl md:text-7xl font-display mb-4 text-foreground">W.Y.W Rewards</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed font-body font-light">
              Earn 1 point for every £1 spent. Unlock tiers and enjoy exclusive perks.
            </p>
          </div>
        </Reveal>

        {/* Tiers */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 80}>
              <div className={`p-6 ${i === 3 ? 'border-2 border-accent' : 'border border-border'}`}>
                <tier.icon className="h-6 w-6 text-accent mb-3" strokeWidth={1.5} />
                <h3 className="font-display text-2xl mt-1 mb-1 text-foreground">{tier.name}</h3>
                <p className="text-[0.75rem] text-accent mb-4 font-body">{tier.range}</p>
                <ul className="space-y-2">
                  {tier.benefits.map(b => (
                    <li key={b} className="text-[0.8125rem] text-muted-foreground flex items-start gap-2 font-body font-light">
                      <Zap className="h-3 w-3 text-accent mt-1 shrink-0" strokeWidth={1.5} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* How it works */}
        <Reveal>
          <div className="bg-muted p-8 mb-16">
            <h2 className="text-3xl font-display mb-6 text-center italic text-foreground">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { num: '1', title: 'Shop', desc: 'Earn 1 point per £1 spent online or in-store.' },
                { num: '2', title: 'Level Up', desc: 'Reach new tiers to unlock better rewards.' },
                { num: '3', title: 'Redeem', desc: 'Use points at checkout for discounts.' },
              ].map(item => (
                <div key={item.num}>
                  <div className="w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-3 font-display text-xl">{item.num}</div>
                  <h3 className="font-display text-xl mb-2 text-foreground">{item.title}</h3>
                  <p className="text-[0.8125rem] text-muted-foreground font-body font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Referral */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display mb-4 italic text-foreground">Refer a Friend</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6 font-body font-light">
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
