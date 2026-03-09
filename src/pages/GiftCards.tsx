import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const amounts = [10, 25, 50, 100];

export default function GiftCards() {
  const [selected, setSelected] = useState(25);

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-8 max-w-2xl">
        <Gift className="h-8 w-8 text-accent mb-4" strokeWidth={1.5} />
        <h1 className="text-4xl md:text-5xl font-display mb-4 italic text-foreground">Gift Cards</h1>
        <p className="text-muted-foreground mb-10 font-body font-light leading-relaxed">
          Give the gift of style. W.Y.W digital gift cards are redeemable online and in-store.
        </p>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {amounts.map(amount => (
            <button key={amount} onClick={() => setSelected(amount)}
              className={`p-4 border text-center font-display text-2xl transition-colors ${
                selected === amount ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground text-foreground'
              }`}>
              £{amount}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Recipient Email</label>
            <input type="email" placeholder="friend@example.com"
              className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground" />
          </div>
          <div>
            <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Personal Message (optional)</label>
            <textarea rows={3} placeholder="Happy birthday! Treat yourself to something amazing..."
              className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] resize-none focus:outline-none focus:border-foreground transition-colors text-foreground" />
          </div>
        </div>

        <Button variant="default" size="lg" className="w-full" onClick={() => toast.success(`£${selected} gift card sent!`)}>
          Purchase £{selected} Gift Card
        </Button>

        <p className="text-[0.75rem] text-muted-foreground mt-4 text-center font-body">
          Gift cards are delivered instantly via email. No expiry date.
        </p>
      </div>
    </Layout>
  );
}
