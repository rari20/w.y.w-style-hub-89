import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Check, Lock, MessageCircle, Minus, Plus, X, ChevronDown, ChevronUp, CreditCard, Landmark, Gift, Truck, Package, MapPin, Zap, ArrowLeft, CheckCircle, Star, Info, Mail } from 'lucide-react';
import { stores } from '@/data/products';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const stepLabels = ['Bag', 'Details', 'Delivery', 'Payment', 'Review', 'Confirmed'];

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', detail: 'Royal Mail tracked', time: '3–5 working days', price: 0, priceFull: 3.95, freeOver100: true },
  { id: 'express', label: 'Express Delivery', detail: 'DPD tracked', time: 'Next working day (order before 2pm)', price: 8.95, priceFull: 8.95, freeOver100: false },
  { id: 'collect', label: 'Click & Collect', detail: 'Pay now online and collect from your chosen W.Y.W store. Ready within 2 hours of order confirmation. Present your order reference or account details in store.', time: 'FREE', price: 0, priceFull: 0, freeOver100: false },
];

function StepIndicator({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center justify-center gap-0 py-8 max-w-[640px] mx-auto">
      {stepLabels.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-initial">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                isCompleted ? 'bg-primary scale-100' :
                isActive ? 'bg-foreground scale-[1.4]' :
                'bg-transparent border-[1.5px] border-border'
              }`}>
                {isCompleted && <Check className="h-2 w-2 text-primary-foreground" strokeWidth={3} />}
              </div>
              <span className={`font-body text-[0.55rem] uppercase tracking-[0.15em] hidden sm:block ${
                isActive ? 'text-foreground font-medium' :
                isCompleted ? 'text-primary' :
                'text-muted-foreground'
              }`}>
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div className="flex-1 h-px mx-2 relative overflow-hidden bg-border">
                <div className="absolute inset-y-0 left-0 bg-primary transition-all duration-[600ms]" style={{ width: isCompleted ? '100%' : '0%' }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CheckoutHeader() {
  return (
    <header className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="font-body text-[0.65rem] uppercase tracking-[0.15em]">Secure</span>
        </div>
        <Link to="/" className="font-display text-[1.6rem] tracking-[0.04em] text-foreground">W.Y.W</Link>
        <Link to="/customer-service" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="font-body text-[0.65rem] uppercase tracking-[0.15em] hidden sm:inline">Need help?</span>
        </Link>
      </div>
    </header>
  );
}

function NpsSurvey() {
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  if (skipped) return null;
  if (submitted) return (
    <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="text-[0.85rem] text-primary font-body flex items-center justify-center gap-1"><Check className="h-4 w-4" /> Thank you for your feedback!</p>
    </motion.div>
  );

  return (
    <motion.div className="mt-10 border border-border p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
      <p className="font-body text-[0.9rem] font-medium text-foreground mb-4">How likely are you to recommend W.Y.W to a friend?</p>
      <div className="flex justify-center gap-1 mb-3 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => (
          <button key={i} onClick={() => setScore(i)}
            className={`w-8 h-8 text-[0.75rem] font-body border transition-colors ${
              score === i ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground text-foreground'
            }`}>
            {i}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[0.6rem] text-muted-foreground font-body mb-4 max-w-[352px] mx-auto">
        <span>Not at all likely</span><span>Extremely likely</span>
      </div>
      <div className="flex justify-center gap-3">
        <Button variant="default" size="sm" onClick={() => { setSubmitted(true); toast.success('Thanks!'); }} disabled={score === null}>Submit</Button>
        <button onClick={() => setSkipped(true)} className="text-[0.75rem] text-muted-foreground font-body hover:text-foreground transition-colors">Skip</button>
      </div>
    </motion.div>
  );
}

export default function Checkout() {
  const { items, totalPrice, totalPoints, clearCart, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [delivery, setDelivery] = useState('standard');
  const [collectStore, setCollectStore] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const pointsDiscount = usePoints ? 8.47 : 0;

  const [detailsFirstName, setDetailsFirstName] = useState('');
  const [detailsLastName, setDetailsLastName] = useState('');
  const [detailsEmail, setDetailsEmail] = useState('');
  const [detailsPhone, setDetailsPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [saveAddress, setSaveAddress] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'gift'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);

  const selectedDelivery = deliveryOptions.find(d => d.id === delivery)!;
  const deliveryPrice = selectedDelivery.freeOver100 && totalPrice >= 100 ? 0 : selectedDelivery.price;
  const vat = totalPrice * 0.2;
  const orderTotal = totalPrice + deliveryPrice + vat - couponDiscount - pointsDiscount;

  const [savedPoints, setSavedPoints] = useState(0);
  const [savedTotal, setSavedTotal] = useState(0);
  const orderRef = useMemo(() => `WYW-2026-${String(Math.floor(Math.random() * 9000 + 1000))}`, []);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WYW10') {
      setCouponDiscount(totalPrice * 0.1);
      setCouponError('');
      toast.success('Coupon applied!');
    } else {
      setCouponDiscount(0);
      setCouponError('This code is not valid or has expired.');
    }
  };

  const handlePlaceOrder = () => {
    setProcessing(true);
    setSavedPoints(totalPoints);
    setSavedTotal(orderTotal);
    setTimeout(() => {
      clearCart();
      setStep(6);
      setProcessing(false);
    }, 2000);
  };

  const formatCardNumber = (val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 16);
    return nums.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const inputClass = "w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground";
  const labelClass = "font-body text-[0.68rem] uppercase tracking-[0.12em] text-foreground font-medium mb-1 block";

  const getEstimatedDate = () => {
    const d = new Date();
    if (delivery === 'express') {
      d.setDate(d.getDate() + 1);
    } else {
      d.setDate(d.getDate() + Math.floor(Math.random() * 3) + 3);
    }
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (items.length === 0 && step < 6) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-[2.5rem] italic mb-4 text-foreground">Your Basket is Empty</h1>
          <p className="text-muted-foreground font-body font-light mb-8">Add some items to get started.</p>
          <Button variant="default" size="lg" asChild><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CheckoutHeader />
      {step < 6 && <StepIndicator currentStep={step} />}

      {/* Mobile Order Summary Accordion */}
      {step > 1 && step < 6 && (
        <div className="lg:hidden border-b border-border">
          <button onClick={() => setMobileOrderOpen(!mobileOrderOpen)}
            className="w-full px-6 py-3 flex items-center justify-between font-body text-[0.8rem] text-foreground">
            <span>Order Summary — £{orderTotal.toFixed(2)}</span>
            {mobileOrderOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence>
            {mobileOrderOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-4 overflow-hidden">
                <div className="space-y-2 text-[0.85rem] font-body">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryPrice === 0 ? 'FREE' : `£${deliveryPrice.toFixed(2)}`}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">VAT (20%)</span><span>£{vat.toFixed(2)}</span></div>
                  <div className="flex justify-between font-medium border-t border-border pt-2"><span>Total</span><span>£{orderTotal.toFixed(2)}</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 pb-20">

        {/* ═══ Step 1: Bag ═══ */}
        {step === 1 && (
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h1 className="font-display text-[2rem] italic mb-8 text-foreground">Your Basket</h1>
              <div className="space-y-0 divide-y divide-border">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-5 py-6">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-[100px] object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">{item.product.brand}</p>
                          <h3 className="font-display text-[1rem] leading-tight mt-0.5 text-foreground">{item.product.name}</h3>
                          <p className="font-body text-[0.75rem] text-muted-foreground mt-1">Size: {item.selectedSize} · {item.selectedColor}</p>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground/50 hover:text-foreground transition-colors">
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-foreground transition-colors"><Minus className="h-3 w-3" /></button>
                          <span className="font-body text-[0.85rem] w-6 text-center text-foreground">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 border border-border flex items-center justify-center hover:border-foreground transition-colors"><Plus className="h-3 w-3" /></button>
                        </div>
                        <span className="font-body text-[1rem] font-normal text-foreground">£{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-muted/50 p-8">
                <h3 className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground mb-5">Order Summary</h3>
                <div className="space-y-2.5 text-[0.85rem] font-body">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>TBC</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">VAT (20%)</span><span>£{vat.toFixed(2)}</span></div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex gap-2">
                  <input type="text" placeholder="Coupon / Gift Card" value={couponCode}
                    onChange={e => { setCouponCode(e.target.value); setCouponError(''); }}
                    className="flex-1 bg-transparent border-b border-muted-foreground/30 px-0 py-2 font-body text-[0.85rem] focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50 text-foreground" />
                  <button onClick={applyCoupon} className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors px-3">Apply</button>
                </div>
                {couponError && <p className="text-destructive text-[0.75rem] italic mt-1 font-body">{couponError}</p>}
              </div>

              {user && (
                <label className="flex items-center gap-3 mt-4 cursor-pointer">
                  <input type="checkbox" checked={usePoints} onChange={e => setUsePoints(e.target.checked)} className="accent-accent" />
                  <span className="text-[0.85rem] font-body text-foreground">Redeem loyalty points</span>
                </label>
              )}
              {usePoints && <p className="text-[0.75rem] text-muted-foreground font-body mt-1">(847 points available = £8.47 off)</p>}

              <p className="text-[0.75rem] text-primary font-body mt-4 flex items-center gap-1">
                <Zap className="h-3 w-3 text-accent" strokeWidth={1.5} />
                You will earn {Math.floor(totalPrice)} points on this order
              </p>

              <Button variant="default" size="lg" className="w-full mt-8" onClick={() => setStep(2)}>Proceed to Checkout</Button>
              <p className="font-body text-[0.65rem] text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" strokeWidth={1.5} /> Secure checkout · Free returns
              </p>
            </div>
          </div>
        )}

        {/* ═══ Step 2: Details ═══ */}
        {step === 2 && (
          <div className="max-w-[560px] mx-auto">
            <h1 className="font-display text-[2rem] italic mb-8 text-foreground">Delivery Details</h1>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>First Name</label><input type="text" value={detailsFirstName} onChange={e => setDetailsFirstName(e.target.value)} required className={inputClass} /></div>
                <div><label className={labelClass}>Last Name</label><input type="text" value={detailsLastName} onChange={e => setDetailsLastName(e.target.value)} required className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>Email Address</label><input type="email" value={detailsEmail} onChange={e => setDetailsEmail(e.target.value)} required className={inputClass} /></div>
              <div><label className={labelClass}>Phone Number</label><input type="tel" value={detailsPhone} onChange={e => setDetailsPhone(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Address Line 1</label><input type="text" value={address1} onChange={e => setAddress1(e.target.value)} required className={inputClass} /></div>
              <div><label className={labelClass}>Address Line 2 (optional)</label><input type="text" value={address2} onChange={e => setAddress2(e.target.value)} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>City</label><input type="text" value={city} onChange={e => setCity(e.target.value)} required className={inputClass} /></div>
                <div><label className={labelClass}>Postcode</label><input type="text" value={postcode} onChange={e => setPostcode(e.target.value)} required className={inputClass} /></div>
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <select value={country} onChange={e => setCountry(e.target.value)} className={inputClass}>
                  <option>United Kingdom</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={saveAddress} onChange={e => setSaveAddress(e.target.checked)} className="accent-primary" />
                <span className="text-[0.85rem] font-body text-foreground">Save this address to my account</span>
              </label>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button onClick={() => setStep(1)} className="font-body text-[0.75rem] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Back to Bag
              </button>
              <Button variant="default" size="lg" onClick={() => setStep(3)}>Continue to Delivery</Button>
            </div>
          </div>
        )}

        {/* ═══ Step 3: Delivery Method ═══ */}
        {step === 3 && (
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h1 className="font-display text-[2rem] italic mb-8 text-foreground">Delivery Method</h1>
              <div className="space-y-3">
                {deliveryOptions.map(opt => {
                  const optPrice = opt.freeOver100 && totalPrice >= 100 ? 0 : opt.price;
                  const priceLabel = opt.freeOver100 && totalPrice >= 100 ? 'FREE' : (opt.price === 0 ? 'FREE' : `£${opt.price.toFixed(2)}`);
                  return (
                    <button key={opt.id} onClick={() => setDelivery(opt.id)}
                      className={`w-full text-left p-5 border transition-all duration-300 ${
                        delivery === opt.id ? 'border-foreground bg-muted/50 border-2' : 'border-border hover:border-muted-foreground'
                      }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`w-3 h-3 rounded-full border-[1.5px] mt-1 flex items-center justify-center ${delivery === opt.id ? 'border-foreground' : 'border-muted-foreground'}`}>
                            {delivery === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-foreground" />}
                          </div>
                          <div>
                            <p className="font-body text-[0.8rem] font-medium uppercase tracking-[0.08em] text-foreground">{opt.label}</p>
                            <p className="font-body text-[0.75rem] text-muted-foreground mt-0.5">{opt.time}</p>
                            <p className="font-body text-[0.7rem] text-muted-foreground/70 mt-0.5">{opt.detail}</p>
                            {opt.freeOver100 && totalPrice < 100 && <p className="font-body text-[0.65rem] text-primary mt-1">FREE on orders over £100</p>}
                          </div>
                        </div>
                        <span className={`font-body text-[0.85rem] font-medium ${optPrice === 0 ? 'text-primary' : 'text-foreground'}`}>
                          {priceLabel}
                        </span>
                      </div>
                      {delivery === opt.id && opt.id === 'collect' && (
                        <div className="mt-4 ml-6">
                          <select value={collectStore} onChange={e => setCollectStore(e.target.value)} className={inputClass}>
                            <option value="">Select store</option>
                            {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-10">
                <button onClick={() => setStep(2)} className="font-body text-[0.75rem] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Back
                </button>
                <Button variant="default" size="lg" onClick={() => setStep(4)}>Continue to Payment</Button>
              </div>
            </div>
            <div className="lg:col-span-2 hidden lg:block">
              <div className="bg-muted/50 p-8">
                <h3 className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground mb-5">Order Summary</h3>
                <div className="space-y-2.5 text-[0.85rem] font-body">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryPrice === 0 ? 'FREE' : `£${deliveryPrice.toFixed(2)}`}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">VAT (20%)</span><span>£{vat.toFixed(2)}</span></div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between font-medium text-[1rem]"><span>Total</span><span>£{orderTotal.toFixed(2)}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ Step 4: Payment ═══ */}
        {step === 4 && (
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h1 className="font-display text-[2rem] italic mb-2 text-foreground">Payment</h1>
              <p className="font-body text-[0.75rem] text-muted-foreground flex items-center gap-1.5 mb-8">
                <Lock className="h-3 w-3" strokeWidth={1.5} /> Your payment information is encrypted and secure.
              </p>

              {/* Apple Pay */}
              <div className="mb-8">
                <p className="font-body text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground mb-3">Express Checkout</p>
                <button onClick={() => toast('Apple Pay is not available in this preview.')}
                  className="w-full h-[52px] flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#000000', color: '#FFFFFF', border: 'none', WebkitAppearance: 'none' as any }}>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
                    <path d="M15.07 4.14c-.94 1.15-2.48 2.04-3.99 1.91-.19-1.53.56-3.16 1.44-4.16C13.46.74 15.11-.04 16.43 0c.16 1.58-.47 3.13-1.36 4.14zM16.41 12.54c.03 3.19 2.8 4.25 2.83 4.27-.02.07-.44 1.51-1.46 2.99-.88 1.28-1.79 2.56-3.23 2.58-1.41.03-1.87-.84-3.48-.84-1.61 0-2.12.81-3.46.87-1.39.05-2.45-1.39-3.34-2.67C2.44 17.12.88 12.58 2.78 9.5c.94-1.53 2.63-2.5 4.46-2.53 1.36-.03 2.65.92 3.48.92.83 0 2.38-1.13 4.01-.97.68.03 2.6.28 3.83 2.08-.1.06-2.29 1.33-2.15 3.54z"/>
                  </svg>
                  <span className="font-body text-[0.85rem] font-medium">Pay</span>
                </button>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="font-body text-[0.62rem] uppercase tracking-[0.15em] text-muted-foreground">or pay another way</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="flex border-b border-border mb-8 overflow-x-auto">
                {([
                  { id: 'card' as const, label: 'Card', icon: CreditCard },
                  { id: 'bank' as const, label: 'Bank Transfer', icon: Landmark },
                  { id: 'gift' as const, label: 'Gift Card', icon: Gift },
                  ...(delivery === 'collect' ? [{ id: 'collection' as const, label: 'Pay at Collection', icon: Truck }] : []),
                ]).map(tab => (
                  <button key={tab.id} onClick={() => setPaymentMethod(tab.id)}
                    className={`px-4 py-3 font-body text-[0.75rem] transition-colors border-b-2 -mb-px flex items-center gap-1.5 whitespace-nowrap ${
                      paymentMethod === tab.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}>
                    <tab.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div><label className={labelClass}>Card Number</label>
                    <input type="text" inputMode="numeric" value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} placeholder="0000 0000 0000 0000"
                      className={`${inputClass} font-mono tracking-wider`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Expiry Date</label><input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" className={inputClass} /></div>
                    <div><label className={labelClass}>CVV</label><input type="text" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="···" className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>Name on Card</label><input type="text" value={cardName} onChange={e => setCardName(e.target.value)} className={inputClass} /></div>
                  <p className="font-body text-[0.7rem] text-muted-foreground flex items-center gap-1.5">
                    <Lock className="h-3 w-3" strokeWidth={1.5} /> Secured by 256-bit SSL
                  </p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div className="border border-border p-6 space-y-2 font-mono text-[0.85rem]">
                    <div className="flex justify-between"><span className="text-muted-foreground">Bank:</span><span className="text-foreground">W.Y.W Business Banking</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Sort Code:</span><span className="text-foreground">40-47-84</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Account Number:</span><span className="text-foreground">21938475</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Reference:</span><span className="text-foreground">{orderRef}</span></div>
                  </div>
                  <p className="font-body text-[0.75rem] text-muted-foreground">Please transfer the exact total amount. Your order will be confirmed once payment is received within 3 working days.</p>
                </div>
              )}

              {paymentMethod === 'gift' && (
                <div>
                  <p className="font-body text-[0.85rem] text-muted-foreground mb-4">Enter your gift card code to apply it to this order.</p>
                  <div className="flex gap-2">
                    <input placeholder="Enter gift card code" className="flex-1 bg-transparent border-b border-muted-foreground/30 px-0 py-2 font-body text-[0.85rem] focus:outline-none focus:border-foreground text-foreground" />
                    <button className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors px-3">Check</button>
                  </div>
                  <p className="font-body text-[0.75rem] text-muted-foreground mt-3">Gift cards are applied to your order total. Any remaining balance stays on your card.</p>
                </div>
              )}

              {paymentMethod === 'collection' && (
                <div>
                  <p className="font-body text-[0.85rem] mb-4 text-foreground">Pay in cash or by card when you collect your order from your chosen W.Y.W store. Your order will be held for 5 days.</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-10">
                <button onClick={() => setStep(3)} className="font-body text-[0.75rem] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Back
                </button>
                <Button variant="default" size="lg" onClick={() => setStep(5)}>Continue to Review</Button>
              </div>
            </div>
            <div className="lg:col-span-2 hidden lg:block">
              <div className="bg-muted/50 p-8">
                <h3 className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground mb-5">Order Summary</h3>
                <div className="space-y-2.5 text-[0.85rem] font-body">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryPrice === 0 ? 'FREE' : `£${deliveryPrice.toFixed(2)}`}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">VAT (20%)</span><span>£{vat.toFixed(2)}</span></div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between font-medium text-[1rem]"><span>Total</span><span>£{orderTotal.toFixed(2)}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ Step 5: Review & Confirm ═══ */}
        {step === 5 && (
          <div className="max-w-[700px] mx-auto">
            <h1 className="font-display text-[2rem] italic mb-8 text-foreground">Review Your Order</h1>

            {/* Items */}
            <div className="border-b border-border pb-6 mb-6">
              <h3 className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mb-4">Your Order</h3>
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4 py-3">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover" />
                  <div className="flex-1">
                    <p className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">{item.product.brand}</p>
                    <p className="font-body text-[0.85rem] text-foreground">{item.product.name}</p>
                    <p className="font-body text-[0.75rem] text-muted-foreground">Size: {item.selectedSize} · {item.selectedColor} · Qty {item.quantity}</p>
                  </div>
                  <span className="font-body text-[0.85rem] text-foreground">£{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="border-b border-border pb-6 mb-6 flex justify-between items-start">
              <div>
                <h3 className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mb-2">Delivery Address</h3>
                <p className="font-body text-[0.85rem] text-foreground">{detailsFirstName} {detailsLastName}</p>
                <p className="font-body text-[0.85rem] text-muted-foreground">{address1}{address2 && `, ${address2}`}</p>
                <p className="font-body text-[0.85rem] text-muted-foreground">{city} {postcode}</p>
              </div>
              <button onClick={() => setStep(2)} className="font-body text-[0.7rem] text-muted-foreground hover:text-foreground">Edit</button>
            </div>

            {/* Delivery Method */}
            <div className="border-b border-border pb-6 mb-6 flex justify-between items-start">
              <div>
                <h3 className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mb-2">Delivery Method</h3>
                <p className="font-body text-[0.85rem] text-foreground">{selectedDelivery.label}</p>
                <p className="font-body text-[0.75rem] text-muted-foreground">{selectedDelivery.time} · {deliveryPrice === 0 ? 'FREE' : `£${deliveryPrice.toFixed(2)}`}</p>
              </div>
              <button onClick={() => setStep(3)} className="font-body text-[0.7rem] text-muted-foreground hover:text-foreground">Edit</button>
            </div>

            {/* Payment */}
            <div className="border-b border-border pb-6 mb-6 flex justify-between items-start">
              <div>
                <h3 className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mb-2">Payment Method</h3>
                <p className="font-body text-[0.85rem] text-foreground">
                  {paymentMethod === 'card' && `Card ending ${cardNumber.slice(-4) || '····'}`}
                  {paymentMethod === 'bank' && 'Bank Transfer'}
                  {paymentMethod === 'collection' && 'Pay at Collection'}
                  {paymentMethod === 'gift' && 'Gift Card'}
                </p>
              </div>
              <button onClick={() => setStep(4)} className="font-body text-[0.7rem] text-muted-foreground hover:text-foreground">Edit</button>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-[0.85rem] font-body mb-8">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">VAT (20%)</span><span>£{vat.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{selectedDelivery.label}</span><span>{deliveryPrice === 0 ? 'FREE' : `£${deliveryPrice.toFixed(2)}`}</span></div>
              {couponDiscount > 0 && <div className="flex justify-between text-primary"><span>Coupon Discount</span><span>−£{couponDiscount.toFixed(2)}</span></div>}
              {pointsDiscount > 0 && <div className="flex justify-between text-primary"><span>Points Discount</span><span>−£{pointsDiscount.toFixed(2)}</span></div>}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-medium text-[1.1rem]"><span>Total</span><span>£{orderTotal.toFixed(2)}</span></div>
              </div>
            </div>

            <Button variant="default" size="lg" className="w-full flex items-center justify-center gap-2" onClick={handlePlaceOrder} disabled={processing}>
              <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
              {processing ? (
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>Processing...</motion.span>
              ) : (
                `Place Order — £${orderTotal.toFixed(2)}`
              )}
            </Button>
            <p className="font-body text-[0.7rem] text-muted-foreground mt-4 text-center">
              By placing your order you agree to W.Y.W's <Link to="/terms" className="underline">Terms & Conditions</Link> and <Link to="/returns" className="underline">Returns Policy</Link>.
            </p>
          </div>
        )}

        {/* ═══ Step 6: Confirmation ═══ */}
        {step === 6 && (
          <div className="max-w-[700px] mx-auto text-center pt-12">
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" strokeWidth={1.5} />
            </motion.div>
            <motion.h1 className="font-display text-[2.5rem] md:text-[3rem] italic mb-3 text-foreground"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
              Order Confirmed
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
              <p className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mt-6 mb-1">Order Number</p>
              <p className="font-display text-[1.5rem] text-foreground">{orderRef}</p>
              <p className="text-muted-foreground font-body font-light mt-3 mb-2">
                Thank you{detailsFirstName ? `, ${detailsFirstName}` : ''}. Your order is on its way.
              </p>
              <p className="text-[0.8rem] text-muted-foreground font-body">Estimated delivery: {getEstimatedDate()}</p>
              {address1 && (
                <p className="text-[0.8rem] text-muted-foreground font-body mt-1">{address1}, {city} {postcode}</p>
              )}
              {detailsEmail && <p className="font-body text-[0.8rem] text-muted-foreground mt-2">Confirmation sent to {detailsEmail}</p>}
            </motion.div>

            {/* Points earned */}
            <motion.div className="mt-8 bg-muted/50 border-l-4 border-primary p-6 text-left"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
              <p className="font-body text-[0.85rem] flex items-center gap-2 text-foreground">
                <Zap className="h-4 w-4 text-accent" strokeWidth={1.5} />
                {savedPoints || Math.floor(savedTotal)} points have been added to your W.Y.W Rewards account. New balance: {847 + (savedPoints || Math.floor(savedTotal))} points.
              </p>
            </motion.div>

            {/* Post-purchase feedback prompt */}
            <motion.div className="mt-8 p-6 text-left" style={{ backgroundColor: 'hsl(37 52% 58% / 0.08)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="font-body text-[0.9rem] font-semibold text-foreground mb-1">Enjoying W.Y.W so far?</h3>
                  <p className="text-[0.8rem] text-muted-foreground font-body mb-3">Let us know how your experience has been — it takes 30 seconds and helps us serve you better.</p>
                  <Button variant="default" size="sm" asChild>
                    <Link to={user ? '/account#feedback' : '/feedback'}>Share Feedback</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Guest claim points */}
            {!user && (
              <motion.div className="mt-6 border border-border p-6 text-left"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
                <h3 className="font-body text-[0.85rem] font-medium text-foreground mb-2">Claim your points</h3>
                <p className="text-[0.8rem] text-muted-foreground font-body mb-3">Create an account within 30 days to claim {savedPoints || Math.floor(savedTotal)} points earned on this order.</p>
                <div className="flex gap-3">
                  <Button variant="default" size="sm" asChild><Link to="/account">Create Account</Link></Button>
                  <Button variant="ghost" size="sm" asChild><Link to="/account">Sign In</Link></Button>
                </div>
              </motion.div>
            )}

            {/* NPS */}
            <NpsSurvey />

            <motion.div className="mt-10 flex justify-center gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
              <Button variant="default" size="lg" asChild><Link to="/home">Continue Shopping</Link></Button>
            </motion.div>

            <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
              <Link to="/customer-service" className="font-body text-[0.75rem] text-muted-foreground hover:text-foreground transition-colors">
                Need help with your order?
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
