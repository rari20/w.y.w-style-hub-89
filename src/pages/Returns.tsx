import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Package, ArrowRight, Zap } from 'lucide-react';
import { useState } from 'react';

export default function Returns() {
  const [orderRef, setOrderRef] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <div className="wyw-container py-8 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-display mb-4">RETURNS & REFUNDS</h1>

        {/* Policy Summary */}
        <div className="bg-muted p-6 rounded-sm mb-10 space-y-3 text-sm">
          <h2 className="font-display text-2xl mb-3">RETURNS POLICY</h2>
          <p>You have <strong>30 days</strong> from delivery to return items for a full refund.</p>
          <p>Items must be unworn, unwashed, and in original condition with tags attached.</p>
          <p>Refunds are processed to the original payment method within 5–7 working days of receiving the return.</p>
          <p>Store credit is offered as an alternative where applicable.</p>
          <p>In-store returns desk also handles online purchases — just bring your order confirmation.</p>
        </div>

        {/* Return Methods */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'W.Y.W Locker', desc: 'Drop off at any W.Y.W locker. Locker code sent via email/SMS.' },
            { title: 'Post', desc: 'Print a pre-paid label and drop off at your nearest post office.' },
            { title: 'In-Store', desc: 'Visit any W.Y.W returns desk with your order confirmation.' },
          ].map(method => (
            <div key={method.title} className="wyw-card p-5">
              <Package className="h-5 w-5 text-accent mb-2" />
              <h3 className="font-display text-xl mb-1">{method.title.toUpperCase()}</h3>
              <p className="text-xs text-muted-foreground">{method.desc}</p>
            </div>
          ))}
        </div>

        {/* Start Return */}
        <div className="border border-border p-6 rounded-sm mb-10">
          <h2 className="font-display text-2xl mb-4">START A RETURN</h2>
          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Order Reference</label>
                  <input type="text" value={orderRef} onChange={e => setOrderRef(e.target.value)} placeholder="WYW-2026-XXXX" required
                    className="w-full bg-muted px-4 py-3 text-sm rounded-sm" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-muted px-4 py-3 text-sm rounded-sm" />
                </div>
              </div>
              <Button variant="hero" type="submit">Find My Order</Button>
            </form>
          ) : (
            <div>
              <p className="text-sm mb-4">Select items to return and choose your preferred return method.</p>
              <div className="p-4 border border-border rounded-sm mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Oversized Essential Hoodie</p>
                    <p className="text-xs text-muted-foreground">Size M · Black</p>
                  </div>
                  <input type="checkbox" className="accent-accent" />
                </div>
              </div>
              <Button variant="hero">Submit Return Request</Button>
            </div>
          )}
        </div>

        {/* Track Return */}
        <div>
          <h2 className="font-display text-2xl mb-4">RETURN TRACKING</h2>
          <div className="flex items-center gap-4 text-sm">
            {['Return Initiated', 'Item Received', 'Inspected', 'Refund Processed'].map((status, i) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-accent' : 'bg-border'}`} />
                <span className={i === 0 ? 'font-medium' : 'text-muted-foreground'}>{status}</span>
                {i < 3 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
