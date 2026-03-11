import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { MessageCircle, Mail, Phone, HelpCircle, Users, ChevronDown, Star, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/447700000001?text=' + encodeURIComponent('Hi, I need help with my W.Y.W order.');
const EMAIL_URL = 'mailto:hello@wyw.com?subject=Customer%20Enquiry';
const PHONE_URL = 'tel:+441310000001';

const faqData = [
  {
    category: 'Orders & Delivery',
    items: [
      { q: 'How long does standard delivery take?', a: 'Standard delivery takes 3–5 working days. Express next-day delivery is available if ordered before 2pm. You will receive a dispatch email with tracking information once your order leaves our warehouse.' },
      { q: 'Can I change or cancel my order after placing it?', a: 'Orders can be amended or cancelled within 1 hour of placement. After this window, the order will have entered fulfilment and cannot be changed. Please contact our team immediately via the live chat if you need to make a change.' },
      { q: 'Do you deliver internationally?', a: 'Currently W.Y.W delivers within the United Kingdom only. International delivery is planned for a future phase of the business.' },
      { q: 'What is Click & Collect?', a: 'Click & Collect orders are paid for online at the time of ordering, exactly like a standard delivery order. Once your payment is confirmed, your order will be prepared at your chosen store within 2 hours. Simply visit the store during opening hours and present your order reference number — found in your confirmation email and your account order history — or log in to your W.Y.W account at the till. No additional payment is required in store.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'How do I return an item?', a: 'You have 28 days from delivery to return an item. Log into your account, go to Orders, select the item, and choose your return method: W.Y.W Locker drop-off, in-store returns desk, or a prepaid postal return label.' },
      { q: 'How long do refunds take?', a: 'Once we receive and inspect your return, refunds are processed within 5–7 working days to your original payment method.' },
      { q: 'Can I return a sale item?', a: 'Most sale items can be returned unless marked as Final Sale at the time of purchase. Final Sale items are clearly labelled on the product page and at checkout.' },
    ],
  },
  {
    category: 'W.Y.W Rewards',
    items: [
      { q: 'How do I earn loyalty points?', a: 'You earn 1 point for every £1 spent online or in-store, as long as you are logged into your W.Y.W account at the time of purchase. Points are added to your wallet once your order is confirmed.' },
      { q: 'What are the loyalty tier levels?', a: 'W.Y.W Rewards has four tiers: Spark (0–499 pts), Volt (500–1,499 pts), Surge (1,500–3,999 pts), and Watt (4,000+ pts). Each tier unlocks additional benefits including free delivery, discounted consultations, and early access to new collections.' },
      { q: 'Do my points expire?', a: 'Points are valid for 12 months from the date they are earned. If your account is inactive for 12 consecutive months, your points balance will reset.' },
      { q: 'How do I redeem my points?', a: 'You can redeem points at checkout online or in-store. Each point is worth £0.01. You can choose how many points to redeem on each order, up to the full order value.' },
    ],
  },
  {
    category: 'Styling Consultations',
    items: [
      { q: 'Is my first consultation really free?', a: 'Yes. Your first styling consultation with W.Y.W is completely complimentary with no obligation to purchase. It includes a 6-month styling warranty.' },
      { q: 'How long does a consultation last?', a: 'Consultations typically last 45–60 minutes. In-store sessions include trying on garments from our current collections. Virtual consultations are conducted via video call.' },
      { q: 'Are your consultants human or AI?', a: 'All W.Y.W consultations are conducted by our expert human stylists. We do not use AI chatbots or automated tools — we believe great style advice requires a genuine personal connection.' },
    ],
  },
  {
    category: 'Website & Account',
    items: [
      { q: 'How do I create an account?', a: 'You can create an account online at any time, or scan the QR code at any W.Y.W store entrance or till point to register in person without downloading an app.' },
      { q: 'I forgot my password. What do I do?', a: 'Click \'Forgot password\' on the sign-in page and enter your email address. You will receive a reset link within a few minutes. Check your spam folder if it does not arrive.' },
      { q: 'How do I use a referral code?', a: 'Your unique referral code is found in your account under the Referral section. Share it with a friend — when they use it at checkout, both of you receive a discount on your next purchase.' },
    ],
  },
];

function FeedbackStarRow({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="mb-4">
      <p className="font-body text-[0.85rem] font-medium text-foreground mb-2">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(s => (
          <button key={s} type="button" onClick={() => onChange(s)} className="p-0.5 transition-colors">
            <Star className={`h-5 w-5 transition-colors ${s <= value ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </div>
  );
}

function FeedbackForm() {
  const [sat, setSat] = useState(0);
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sat === 0 || like === 0) { toast.error('Please rate both questions.'); return; }
    setDone(true);
    toast.success('Thank you for your feedback!');
  };

  if (done) return <p className="text-[0.85rem] text-accent font-body flex items-center gap-1.5"><Check className="h-4 w-4" strokeWidth={1.5} /> Feedback submitted — thank you!</p>;

  return (
    <form onSubmit={submit}>
      <FeedbackStarRow value={sat} onChange={setSat} label="How satisfied are you with W.Y.W overall?" />
      <FeedbackStarRow value={like} onChange={setLike} label="How likely are you to shop with us again?" />
      <div className="mb-4">
        <p className="font-body text-[0.85rem] font-medium text-foreground mb-2">Is there anything we can improve? <span className="text-muted-foreground font-light">(optional)</span></p>
        <textarea value={comment} onChange={e => setComment(e.target.value)} maxLength={1000} rows={3}
          className="w-full bg-transparent border border-border p-3 font-body text-[0.85rem] focus:outline-none focus:border-foreground transition-colors text-foreground resize-none"
          placeholder="Tell us what's on your mind…" />
      </div>
      <Button variant="default" size="sm" type="submit">Submit Feedback</Button>
    </form>
  );
}

export default function CustomerService() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [showJumpBtn, setShowJumpBtn] = useState(false);

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Count opened FAQs to trigger sticky button
  useEffect(() => {
    const opened = Object.values(openItems).filter(Boolean).length;
    setShowJumpBtn(opened >= 3);
  }, [openItems]);

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Sticky jump-to-contact button */}
      <AnimatePresence>
        {showJumpBtn && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[68px] left-0 right-0 z-40 flex justify-center py-2 pointer-events-none"
          >
            <button
              onClick={scrollToContact}
              className="pointer-events-auto bg-accent text-accent-foreground px-5 py-2 rounded-full font-body text-[0.75rem] font-medium shadow-md hover:shadow-lg transition-shadow"
            >
              Still need help? Contact us →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Customer Service' }]} />

        <Reveal>
          <h1 className="text-4xl md:text-5xl font-display mb-4 italic text-foreground">Customer Service</h1>
          <p className="text-muted-foreground max-w-lg mb-12 font-body font-light leading-relaxed">
            We're here to help. W.Y.W uses <strong className="font-medium text-foreground">human agents only</strong> — no AI chatbots.
          </p>
        </Reveal>

        {/* FAQ — now PRIMARY content */}
        <Reveal>
          <div id="faq" className="max-w-2xl mb-16">
            <div className="flex flex-col items-start gap-3 mb-2">
              <HelpCircle className="h-5 w-5 text-accent shrink-0" strokeWidth={1.5} />
              <h2 className="font-display italic text-foreground" style={{ fontSize: '1.75rem', lineHeight: 1.2 }}>
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-muted-foreground font-body text-[0.85rem] font-light mb-8">
              Everything you need to know about shopping, returns, rewards, and consultations.
            </p>

            {faqData.map((cat, catIdx) => (
              <div key={cat.category} className="mb-6">
                <p className="font-body text-[0.62rem] tracking-[0.18em] uppercase text-accent mb-3 pb-2 border-b border-border">
                  {cat.category}
                </p>
                {cat.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div key={key} className="border-b border-border">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between gap-4 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-body text-[0.9rem] font-medium text-foreground leading-snug">{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          strokeWidth={1.5}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-[400ms] ${isOpen ? 'max-h-[600px] pb-4' : 'max-h-0'}`}
                      >
                        <p className="font-body text-[0.85rem] text-muted-foreground font-light leading-[1.85]">{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Divider */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="font-body text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">Still need help? Our team is here.</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </div>

        {/* Contact Methods */}
        <div id="contact-section" className="grid md:grid-cols-2 gap-px bg-border border border-border mb-16 relative z-[1]">
          <Reveal>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = '/consultation';
              }}
              className="bg-foreground text-background w-full p-6 flex items-center gap-4 text-left hover:bg-primary transition-colors duration-300 cursor-pointer"
            >
              <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              <span className="flex flex-col gap-0.5">
                <strong className="font-body text-[0.82rem] font-semibold tracking-wide">Start Live Chat</strong>
                <small className="font-body text-[0.7rem] opacity-70">Mon–Sat, 9am–8pm</small>
              </span>
            </button>
          </Reveal>
          <Reveal delay={60}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full p-6 flex items-center gap-4 text-left hover:bg-muted transition-colors duration-300 cursor-pointer"
            >
              <Phone className="h-5 w-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="flex flex-col gap-0.5">
                <strong className="font-body text-[0.82rem] font-semibold text-foreground tracking-wide">WhatsApp Us</strong>
                <small className="font-body text-[0.7rem] text-muted-foreground">Typically replies in minutes</small>
              </span>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={EMAIL_URL}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full p-6 flex items-center gap-4 text-left hover:bg-muted transition-colors duration-300 cursor-pointer"
            >
              <Mail className="h-5 w-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="flex flex-col gap-0.5">
                <strong className="font-body text-[0.82rem] font-semibold text-foreground tracking-wide">Email Us</strong>
                <small className="font-body text-[0.7rem] text-muted-foreground">hello@wyw.com · reply within 24hrs</small>
              </span>
            </a>
          </Reveal>
          <Reveal delay={180}>
            <a
              href={PHONE_URL}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full p-6 flex items-center gap-4 text-left hover:bg-muted transition-colors duration-300 cursor-pointer"
            >
              <Phone className="h-5 w-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="flex flex-col gap-0.5">
                <strong className="font-body text-[0.82rem] font-semibold text-foreground tracking-wide">Call Us</strong>
                <small className="font-body text-[0.7rem] text-muted-foreground">+44 131 000 0001 · Mon–Sat 9am–6pm</small>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Human Support Note */}
        <Reveal delay={100}>
          <div className="mt-16 bg-muted p-6 flex items-start gap-4">
            <Users className="h-5 w-5 text-accent shrink-0 mt-1" strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-lg mb-1 text-foreground italic">Real People. Real Help.</h3>
              <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
                Every W.Y.W interaction is handled by a trained team member who understands style and service.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Feedback Survey */}
        <Reveal delay={150}>
          <div className="mt-16 border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <Star className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h2 className="font-display text-xl italic text-foreground">Help Us Improve</h2>
            </div>
            <p className="text-[0.8rem] text-muted-foreground font-body font-light mb-6">
              Your feedback directly shapes our service. Three quick questions — takes 30 seconds.
            </p>
            <FeedbackForm />
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
