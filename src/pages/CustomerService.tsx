import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, HelpCircle, Zap } from 'lucide-react';

const faqs = [
  { q: 'How do I track my order?', a: 'Log into your account and visit the Orders section. You\'ll find real-time tracking for all your purchases.' },
  { q: 'Can I return online purchases in-store?', a: 'Yes! Visit any W.Y.W returns desk with your order confirmation. We\'ll process your return on the spot.' },
  { q: 'How do W.Y.W Lockers work?', a: 'Select Click & Collect at checkout. Once your order is ready, you\'ll receive a locker code via email and SMS. Just scan and collect!' },
  { q: 'How do I earn loyalty points?', a: 'You earn 1 point per £1 spent, both online and in-store, when linked to your W.Y.W account.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified within 30 minutes of placement. Contact our team via live chat for immediate assistance.' },
];

export default function CustomerService() {
  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-5xl md:text-6xl font-display mb-4">CUSTOMER SERVICE</h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          We're here to help. W.Y.W uses <strong>human agents only</strong> — no AI chatbots. We believe real conversations lead to real solutions.
        </p>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="wyw-card p-6 text-center">
            <MessageCircle className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-display text-xl mb-2">LIVE CHAT</h3>
            <p className="text-xs text-muted-foreground mb-3">Mon-Fri: 9am-8pm, Sat: 10am-6pm</p>
            <Button variant="hero" size="sm">Start Chat</Button>
          </div>
          <div className="wyw-card p-6 text-center">
            <Mail className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-display text-xl mb-2">EMAIL</h3>
            <p className="text-xs text-muted-foreground mb-3">help@wyw.com · Reply within 24hrs</p>
            <Button variant="outline" size="sm">Send Email</Button>
          </div>
          <div className="wyw-card p-6 text-center">
            <Phone className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-display text-xl mb-2">WHATSAPP</h3>
            <p className="text-xs text-muted-foreground mb-3">Quick questions? Message us.</p>
            <Button variant="outline" size="sm">Open WhatsApp</Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-display mb-6">
            <HelpCircle className="inline h-6 w-6 text-accent mr-2" />
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <details key={faq.q} className="border border-border rounded-sm group">
                <summary className="p-4 cursor-pointer text-sm font-medium flex items-center justify-between">
                  {faq.q}
                  <span className="text-accent group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Human Support Note */}
        <div className="mt-16 bg-muted p-6 rounded-sm flex items-start gap-4">
          <Zap className="h-6 w-6 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-xl mb-1">REAL PEOPLE. REAL HELP.</h3>
            <p className="text-sm text-muted-foreground">
              Research shows customers in fashion and retail report significantly higher satisfaction and trust when supported by human agents. 
              That's why every W.Y.W interaction is handled by a trained team member who understands style and service.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
