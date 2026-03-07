import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, Zap, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalPoints } = useCart();
  const [coupon, setCoupon] = useState('');
  const [usePoints, setUsePoints] = useState(false);

  const vat = totalPrice * 0.2;
  const deliveryFee = totalPrice >= 100 ? 0 : 3.99;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="wyw-container py-20 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-6" strokeWidth={1} />
          <h1 className="text-3xl md:text-4xl font-display mb-4 italic text-foreground">Your Basket is Empty</h1>
          <p className="text-muted-foreground mb-8 font-body font-light">Discover our latest collections and find something you love.</p>
          <Button variant="default" size="lg" asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-4xl md:text-5xl font-display mb-8 italic text-foreground">Your Basket</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 border border-border">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-32 object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">{item.product.brand}</p>
                      <h3 className="font-body font-medium text-[0.9375rem] text-foreground">{item.product.name}</h3>
                      <p className="text-[0.75rem] text-muted-foreground mt-1 font-body">{item.selectedSize} · {item.selectedColor}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-foreground transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-[0.85rem] font-body font-medium text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-foreground transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-body font-medium text-[0.9375rem] text-foreground">£{(item.product.price * item.quantity).toFixed(2)}</p>
                      <p className="text-[0.625rem] text-muted-foreground flex items-center gap-1 justify-end font-body">
                        <Zap className="h-3 w-3 text-accent" strokeWidth={1.5} /> +{item.product.loyaltyPoints * item.quantity} pts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-muted p-6 h-fit">
            <h2 className="font-display text-xl mb-6 italic text-foreground">Order Summary</h2>

            <div className="space-y-3 text-[0.85rem] font-body mb-6">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">£{totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">{deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">VAT (20%)</span><span className="text-foreground">£{vat.toFixed(2)}</span></div>
            </div>

            <div className="mb-4">
              <div className="flex gap-2">
                <input type="text" placeholder="Coupon / Gift Card" value={coupon} onChange={e => setCoupon(e.target.value)}
                  className="flex-1 bg-background px-3 py-2 text-[0.85rem] font-body border-0 focus:outline-none focus:ring-2 focus:ring-accent text-foreground" />
                <Button variant="outline" size="sm">Apply</Button>
              </div>
            </div>

            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input type="checkbox" checked={usePoints} onChange={e => setUsePoints(e.target.checked)} className="accent-accent" />
              <span className="text-[0.85rem] font-body text-foreground">Redeem loyalty points</span>
            </label>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between text-[1rem] font-body font-medium">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">£{(totalPrice + deliveryFee + vat).toFixed(2)}</span>
              </div>
              <p className="text-[0.625rem] text-muted-foreground mt-1 flex items-center gap-1 font-body">
                <Zap className="h-3 w-3 text-accent" strokeWidth={1.5} /> You'll earn {totalPoints} points
              </p>
            </div>

            <Button variant="default" size="lg" className="w-full" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
