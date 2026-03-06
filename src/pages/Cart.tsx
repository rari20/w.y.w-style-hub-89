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
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-4xl font-display mb-4">YOUR BASKET IS EMPTY</h1>
          <p className="text-muted-foreground mb-8">Discover our latest collections and find something you love.</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-5xl font-display mb-8">YOUR BASKET</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 border border-border rounded-sm">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-32 object-cover rounded-sm" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.product.brand}</p>
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.selectedSize} · {item.selectedColor}
                      </p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 border border-border rounded-sm">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 border border-border rounded-sm">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">£{(item.product.price * item.quantity).toFixed(2)}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end">
                        <Zap className="h-3 w-3 text-accent" /> +{item.product.loyaltyPoints * item.quantity} pts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-muted p-6 rounded-sm h-fit">
            <h2 className="font-display text-2xl mb-6">ORDER SUMMARY</h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon / Gift Card"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  className="flex-1 bg-background px-3 py-2 text-sm rounded-sm border-0 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button variant="outline" size="sm">Apply</Button>
              </div>
            </div>

            {/* Points Toggle */}
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={e => setUsePoints(e.target.checked)}
                className="rounded accent-accent"
              />
              <span className="text-sm">Redeem loyalty points</span>
            </label>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>£{(totalPrice + deliveryFee + vat).toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Zap className="h-3 w-3 text-accent" /> You'll earn {totalPoints} points
              </p>
            </div>

            <Button variant="hero" size="lg" className="w-full" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
