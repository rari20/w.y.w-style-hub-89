import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Package, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Returns() {
  const [orderRef, setOrderRef] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <div className="wyw-container py-8 pb-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display mb-2 text-foreground">Returns & Refunds</h1>
        <p className="text-[0.78rem] text-muted-foreground tracking-wide mb-8 pb-6 border-b border-border">Last updated: 1 March 2026</p>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">1. Return Window</h2>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-4">You may return most items within 28 days of the delivery date. Items purchased in-store may be returned within 28 days of purchase with proof of purchase.</p>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">2. Condition of Returns</h2>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-4">Items must be returned in their original condition: unworn, unwashed, unaltered, with all original tags attached and in original packaging where possible. W.Y.W reserves the right to refuse returns that do not meet these criteria.</p>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">3. Non-Returnable Items</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li className="text-[0.9rem] leading-[1.85] text-muted-foreground">Items marked as Final Sale</li>
          <li className="text-[0.9rem] leading-[1.85] text-muted-foreground">Personalised or tailored items</li>
          <li className="text-[0.9rem] leading-[1.85] text-muted-foreground">Underwear and swimwear (hygiene seal broken)</li>
          <li className="text-[0.9rem] leading-[1.85] text-muted-foreground">Gift cards</li>
        </ul>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">4. How to Return</h2>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-2">Returns can be made via three methods:</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8 mt-4">
          {[
            { title: 'W.Y.W Locker', desc: 'Drop off at any W.Y.W locker. Locker code sent via email/SMS.' },
            { title: 'Post', desc: 'Print a pre-paid label and drop off at your nearest post office.' },
            { title: 'In-Store', desc: 'Visit any W.Y.W returns desk with your order confirmation.' },
          ].map(method => (
            <div key={method.title} className="border border-border p-5">
              <Package className="h-5 w-5 text-primary mb-2" strokeWidth={1.5} />
              <h3 className="font-body text-sm font-medium mb-1 text-foreground">{method.title}</h3>
              <p className="text-[0.75rem] text-muted-foreground font-body font-light">{method.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">5. Refunds</h2>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-4">Refunds are processed within 5–7 working days of us receiving and inspecting your return. Refunds are issued to the original payment method. If the original method is unavailable, store credit will be offered.</p>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">6. Faulty Items</h2>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-4">If you receive a faulty or incorrect item, contact us within 48 hours of delivery at <a href="mailto:returns@wyw.com" className="text-primary underline underline-offset-2">returns@wyw.com</a> with your order number and photographs of the issue. We will arrange a free return and prioritised replacement or refund.</p>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">7. Loyalty Points on Returns</h2>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-4">Loyalty points awarded for a purchase will be deducted from your account when the return is processed. If this causes your balance to go below a tier threshold, your tier status will be adjusted accordingly.</p>

        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-foreground mt-8 mb-3">8. Contact</h2>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-4">For return queries: <a href="mailto:returns@wyw.com" className="text-primary underline underline-offset-2">returns@wyw.com</a> or speak to our team in store.</p>

        {/* Start Return */}
        <div className="border border-border p-6 mt-12">
          <h2 className="font-display text-xl mb-4 italic text-foreground">Start a Return</h2>
          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Order Reference</label>
                  <input type="text" value={orderRef} onChange={e => setOrderRef(e.target.value)} placeholder="WYW-2026-XXXX" required
                    className="w-full bg-muted px-4 py-3 text-[0.85rem] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full bg-muted px-4 py-3 text-[0.85rem] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
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
                  <input type="checkbox" className="accent-primary" />
                </div>
              </div>
              <Button variant="default">Submit Return Request</Button>
            </div>
          )}
        </div>

        {/* Track Return */}
        <div className="mt-12">
          <h2 className="font-display text-xl mb-4 italic text-foreground">Return Tracking</h2>
          <div className="flex flex-wrap items-center gap-4 text-[0.85rem] font-body">
            {['Return Initiated', 'Item Received', 'Inspected', 'Refund Processed'].map((status, i) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-primary' : 'bg-border'}`} />
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
