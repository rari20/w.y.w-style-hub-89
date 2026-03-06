import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { stores } from '@/data/products';
import { toast } from 'sonner';

type Step = 1 | 2 | 3 | 4;

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', detail: '3–5 working days', price: 3.99 },
  { id: 'nextday', label: 'Next Day Delivery', detail: 'Order before 9pm', price: 7.99 },
  { id: 'sub6', label: '6-Month Free Delivery', detail: 'Unlimited free delivery', price: 19.99, isSub: true },
  { id: 'sub12', label: 'Annual Free Delivery', detail: 'Best value', price: 34.99, isSub: true },
  { id: 'collect', label: 'Click & Collect', detail: 'Free — select a store', price: 0 },
];

export default function Checkout() {
  const { items, totalPrice, totalPoints, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [delivery, setDelivery] = useState('standard');
  const [collectStore, setCollectStore] = useState('');
  const [giftMessage, setGiftMessage] = useState('');

  const selectedDelivery = deliveryOptions.find(d => d.id === delivery)!;
  const vat = totalPrice * 0.2;
  const orderTotal = totalPrice + selectedDelivery.price + vat;

  if (items.length === 0 && step < 4) {
    return (
      <Layout>
        <div className="wyw-container py-20 text-center">
          <h1 className="text-4xl font-display mb-4">NO ITEMS TO CHECKOUT</h1>
          <Button variant="hero" asChild><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </Layout>
    );
  }

  const handlePlaceOrder = () => {
    clearCart();
    setStep(4);
    toast.success('Order placed successfully!');
  };

  return (
    <Layout>
      <div className="wyw-container py-8 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {['Delivery', 'Details', 'Payment', 'Confirmation'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1 ? 'bg-accent text-accent-foreground' :
                step === i + 1 ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
              }`}>
                {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="text-xs uppercase tracking-widest hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Delivery */}
        {step === 1 && (
          <div>
            <h1 className="text-4xl font-display mb-6">DELIVERY OPTIONS</h1>
            <div className="space-y-3">
              {deliveryOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDelivery(opt.id)}
                  className={`w-full flex items-center justify-between p-4 border rounded-sm transition-colors text-left ${
                    delivery === opt.id ? 'border-foreground' : 'border-border hover:border-foreground/50'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.detail}</p>
                  </div>
                  <span className="text-sm font-semibold">{opt.price === 0 ? 'Free' : `£${opt.price.toFixed(2)}`}</span>
                </button>
              ))}
            </div>
            {delivery === 'collect' && (
              <div className="mt-4">
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Select Store & Locker</label>
                <select value={collectStore} onChange={e => setCollectStore(e.target.value)}
                  className="w-full bg-muted px-4 py-3 text-sm rounded-sm">
                  <option value="">Choose a store</option>
                  {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            )}
            <div className="mt-4">
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Gift Message (optional)</label>
              <textarea value={giftMessage} onChange={e => setGiftMessage(e.target.value)} rows={2} placeholder="Add a gift message..."
                className="w-full bg-muted px-4 py-3 text-sm rounded-sm resize-none" />
            </div>
            <Button variant="hero" size="lg" className="w-full mt-6" onClick={() => setStep(2)}>Continue</Button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <h1 className="text-4xl font-display mb-6">YOUR DETAILS</h1>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">First Name</label>
                  <input type="text" className="w-full bg-muted px-4 py-3 text-sm rounded-sm" required />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Last Name</label>
                  <input type="text" className="w-full bg-muted px-4 py-3 text-sm rounded-sm" required />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Address</label>
                <input type="text" className="w-full bg-muted px-4 py-3 text-sm rounded-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">City</label>
                  <input type="text" className="w-full bg-muted px-4 py-3 text-sm rounded-sm" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Postcode</label>
                  <input type="text" className="w-full bg-muted px-4 py-3 text-sm rounded-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                  <input type="email" className="w-full bg-muted px-4 py-3 text-sm rounded-sm" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Phone</label>
                  <input type="tel" className="w-full bg-muted px-4 py-3 text-sm rounded-sm" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
              <Button variant="hero" size="lg" className="flex-1" onClick={() => setStep(3)}>Continue to Payment</Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div>
            <h1 className="text-4xl font-display mb-6">PAYMENT</h1>
            <div className="bg-muted p-6 rounded-sm mb-6">
              <h3 className="font-medium text-sm mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>£{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between"><span>Delivery</span><span>{selectedDelivery.price === 0 ? 'Free' : `£${selectedDelivery.price.toFixed(2)}`}</span></div>
                  <div className="flex justify-between"><span>VAT</span><span>£{vat.toFixed(2)}</span></div>
                  <div className="flex justify-between font-semibold text-base mt-2">
                    <span>Total</span><span>£{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-border p-6 rounded-sm mb-6">
              <p className="text-sm font-medium mb-2">Pay at Collection / Cash on Delivery</p>
              <p className="text-xs text-muted-foreground">
                Payment will be collected upon delivery or at the store. In a production environment, this would integrate with Stripe or PayPal.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(2)}>Back</Button>
              <Button variant="hero" size="lg" className="flex-1" onClick={handlePlaceOrder}>Place Order</Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-display mb-4">ORDER CONFIRMED</h1>
            <p className="text-muted-foreground mb-2">Thank you for your order!</p>
            <p className="text-lg font-semibold mb-1">Order Reference: #WYW-2026-{Math.floor(Math.random() * 9000 + 1000)}</p>
            <p className="text-sm text-muted-foreground mb-2">Estimated delivery: 3–5 working days</p>
            <p className="text-sm text-accent flex items-center justify-center gap-1 mb-8">
              <Zap className="h-4 w-4" /> You earned {totalPoints} loyalty points!
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
