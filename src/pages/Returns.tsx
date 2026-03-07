import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Package, ArrowRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function Returns() {
  const [orderRef, setOrderRef] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <div className="wyw-container py-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display mb-4 italic text-foreground">Returns & Refunds</h1>

        {/* Policy Summary */}
        <div className="bg-muted p-6 mb-10 space-y-3 text-[0.85rem] font-body font-light">
          <h2 className="font-display text-xl mb-3 italic text-foreground">Returns Policy</h2>
          <p className="text-foreground">You have <strong className="font-medium">30 days</strong> from delivery to return items for a full refund.</p>
          <p className="text-foreground">Items must be unworn, unwashed, and in original condition with tags attached.</p>
          <p className="text-foreground">Refunds are processed to the original payment method within 5–7 working days of receiving the return.</p>
          <p className="text-foreground">Store credit is offered as an alternative where applicable.</p>
          <p className="text-foreground">In-store returns desk also handles online purchases — just bring your order confirmation.</p>
        </div>

        {/* Return Methods */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'W.Y.W Locker', desc: 'Drop off at any W.Y.W locker. Locker code sent via email/SMS.' },
            { title: 'Post', desc: 'Print a pre-paid label and drop off at your nearest post office.' },
            { title: 'In-Store', desc: 'Visit any W.Y.W returns desk with your order confirmation.' },
          ].map(method => (
            <div key={method.title} className="wyw-card border border-border p-5">
              <Package className="h-5 w-5 text-accent mb-2" strokeWidth={1.5} />
              <h3 className="font-display text-lg mb-1 text-foreground">{method.title}</h3>
              <p className="text-[0.75rem] text-muted-foreground font-body font-light">{method.desc}</p>
            </div>
          ))}
        </div>

        {/* Start Return */}
        <div className="border border-border p-6 mb-10">
          <h2 className="font-display text-xl mb-4 italic text-foreground">Start a Return</h2>
          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Order Reference</label>
                  <input type="text" value={orderRef} onChange={e => setOrderRef(e.target.value)} placeholder="WYW-2026-XXXX" required
                    className="w-full bg-muted px-4 py-3 text-[0.85rem] font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-muted px-4 py-3 text-[0.85rem] font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <Button variant="default" type="submit">Find My Order</Button>
            </form>
          ) : (
            <div>
              <p className="text-[0.85rem] mb-4 font-body text-foreground">Select items to return and choose your preferred return method.</p>
              <div className="p-4 border border-border mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.85rem] font-body font-medium text-foreground">Oversized Essential Hoodie</p>
                    <p className="text-[0.75rem] text-muted-foreground font-body">Size M · Black</p>
                  </div>
                  <input type="checkbox" className="accent-accent" />
                </div>
              </div>
              <Button variant="default">Submit Return Request</Button>
            </div>
          )}
        </div>

        {/* Track Return */}
        <div>
          <h2 className="font-display text-xl mb-4 italic text-foreground">Return Tracking</h2>
          <div className="flex items-center gap-4 text-[0.85rem] font-body">
            {['Return Initiated', 'Item Received', 'Inspected', 'Refund Processed'].map((status, i) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-accent' : 'bg-border'}`} />
                <span className={`${i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{status}</span>
                {i < 3 && <ArrowRight className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
