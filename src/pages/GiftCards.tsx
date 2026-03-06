import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Gift, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const amounts = [10, 25, 50, 100];

export default function GiftCards() {
  const [selected, setSelected] = useState(25);

  return (
    <Layout>
      <div className="wyw-container py-8 max-w-2xl">
        <Gift className="h-10 w-10 text-accent mb-4" />
        <h1 className="text-5xl md:text-6xl font-display mb-4">GIFT CARDS</h1>
        <p className="text-muted-foreground mb-10">
          Give the gift of style. W.Y.W digital gift cards are redeemable online and in-store.
        </p>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {amounts.map(amount => (
            <button
              key={amount}
              onClick={() => setSelected(amount)}
              className={`p-4 border rounded-sm text-center font-display text-2xl transition-colors ${
                selected === amount ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
              }`}
            >
              £{amount}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Recipient Email</label>
            <input type="email" placeholder="friend@example.com"
              className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Personal Message (optional)</label>
            <textarea rows={3} placeholder="Happy birthday! Treat yourself to something amazing..."
              className="w-full bg-muted px-4 py-3 text-sm rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
        </div>

        <Button variant="hero" size="lg" className="w-full" onClick={() => toast.success(`£${selected} gift card sent!`)}>
          Purchase £{selected} Gift Card
        </Button>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Gift cards are delivered instantly via email. No expiry date.
        </p>
      </div>
    </Layout>
  );
}
