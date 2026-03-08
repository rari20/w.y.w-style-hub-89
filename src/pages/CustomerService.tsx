import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { MessageCircle, Mail, Phone, HelpCircle, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const WHATSAPP_URL = 'https://wa.me/447700000001?text=' + encodeURIComponent('Hi, I need help with my W.Y.W order.');
const EMAIL_URL = 'mailto:hello@wyw.com?subject=Customer%20Enquiry';
const PHONE_URL = 'tel:+441310000001';

const faqData = [
  {
    category: 'Orders & Delivery',
    items: [
      { q: 'How long does standard delivery take?', a: 'Standard delivery takes 3–5 working days. Express next-day delivery is available if ordered before 2pm. You will receive a dispatch email with tracking information once your order leaves our warehouse.' },
      { q: 'Can I change or cancel my order after placing it?', a: 'Orders can be amended or cancelled within 1 hour of placement. After this window, the order will have entered fulfilment and cannot be changed. Please contact our team immediately via the live chat if you need to make a change.' },
      { q: 'What is Click & Collect?', a: 'Click & Collect lets you order online and collect from your nearest W.Y.W store, either from the Customer Service desk or from a W.Y.W smart locker. Your order is typically ready within 2 hours during store hours.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'How do I return an item?', a: 'You have 28 days from delivery to return an item. Log into your account, go to Orders, select the item, and choose your return method: W.Y.W Locker drop-off, in-store returns desk, or a prepaid postal return label.' },
      { q: 'How long do refunds take?', a: 'Once we receive and inspect your return, refunds are processed within 5–7 working days to your original payment method.' },
    ],
  },
  {
    category: 'W.Y.W Rewards',
    items: [
      { q: 'How do I earn loyalty points?', a: 'You earn 1 point for every £1 spent online or in-store, as long as you are logged into your W.Y.W account at the time of purchase. Points are added to your wallet once your order is confirmed.' },
      { q: 'Do my points expire?', a: 'Points are valid for 12 months from the date they are earned. If your account is inactive for 12 consecutive months, your points balance will reset.' },
    ],
  },
  {
    category: 'Styling Consultations',
    items: [
      { q: 'Is my first consultation really free?', a: 'Yes. Your first styling consultation with W.Y.W is completely complimentary with no obligation to purchase. It includes a 6-month styling warranty.' },
      { q: 'Are your consultants human or AI?', a: 'All W.Y.W consultations are conducted by our expert human stylists. We do not use AI chatbots or automated tools — we believe great style advice requires a genuine personal connection.' },
    ],
  },
];

export default function CustomerService() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Customer Service' }]} />

        <Reveal>
          <h1 className="text-4xl md:text-5xl font-display mb-4 italic text-foreground">Customer Service</h1>
          <p className="text-muted-foreground max-w-lg mb-12 font-body font-light leading-relaxed">
            We're here to help. W.Y.W uses <strong className="font-medium text-foreground">human agents only</strong> — no AI chatbots.
          </p>
        </Reveal>

        {/* Contact Methods — functional links */}
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border mb-16">
          <Reveal>
            <button
              onClick={() => { /* Live chat integration placeholder */ }}
              className="bg-foreground text-background w-full p-6 flex items-center gap-4 text-left hover:bg-primary transition-colors duration-300"
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
              className="bg-background w-full p-6 flex items-center gap-4 text-left hover:bg-muted transition-colors duration-300"
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
              className="bg-background w-full p-6 flex items-center gap-4 text-left hover:bg-muted transition-colors duration-300"
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
              className="bg-background w-full p-6 flex items-center gap-4 text-left hover:bg-muted transition-colors duration-300"
            >
              <Phone className="h-5 w-5 text-accent shrink-0" strokeWidth={1.5} />
              <span className="flex flex-col gap-0.5">
                <strong className="font-body text-[0.82rem] font-semibold text-foreground tracking-wide">Call Us</strong>
                <small className="font-body text-[0.7rem] text-muted-foreground">+44 131 000 0001 · Mon–Sat 9am–6pm</small>
              </span>
            </a>
          </Reveal>
        </div>

        {/* FAQ — properly sized */}
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-display mb-2 italic flex items-center gap-2 text-foreground">
              <HelpCircle className="h-5 w-5 text-accent" strokeWidth={1.5} />
              Frequently Asked Questions
            </h2>
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
                        className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[600px] pb-4' : 'max-h-0'}`}
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
      </div>
    </Layout>
  );
}
