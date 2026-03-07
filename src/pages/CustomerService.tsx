import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, HelpCircle, Users } from 'lucide-react';

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
        <h1 className="text-4xl md:text-5xl font-display mb-4 italic">Customer Service</h1>
        <p className="text-muted-foreground max-w-lg mb-12 font-body font-light leading-relaxed">
          We're here to help. W.Y.W uses <strong className="font-medium text-foreground">human agents only</strong> — no AI chatbots. We believe real conversations lead to real solutions.
        </p>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: MessageCircle, title: 'Live Chat', desc: 'Mon-Fri: 9am-8pm, Sat: 10am-6pm', variant: 'default' as const },
            { icon: Mail, title: 'Email', desc: 'help@wyw.com · Reply within 24hrs', variant: 'outline' as const },
            { icon: Phone, title: 'WhatsApp', desc: 'Quick questions? Message us.', variant: 'outline' as const },
          ].map(method => (
            <div key={method.title} className="wyw-card border border-border p-6 text-center">
              <method.icon className="h-6 w-6 text-accent mx-auto mb-3" strokeWidth={1.5} />
              <h3 className="font-display text-xl mb-2 text-foreground">{method.title}</h3>
              <p className="text-[0.75rem] text-muted-foreground mb-3 font-body">{method.desc}</p>
              <Button variant={method.variant} size="sm">{method.title === 'Live Chat' ? 'Start Chat' : method.title === 'Email' ? 'Send Email' : 'Open WhatsApp'}</Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-display mb-6 italic flex items-center gap-2 text-foreground">
            <HelpCircle className="h-5 w-5 text-accent" strokeWidth={1.5} />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map(faq => (
              <details key={faq.q} className="border border-border group">
                <summary className="p-4 cursor-pointer text-[0.85rem] font-body font-medium flex items-center justify-between text-foreground">
                  {faq.q}
                  <span className="text-accent group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="px-4 pb-4 text-[0.85rem] text-muted-foreground font-body font-light">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Human Support Note */}
        <div className="mt-16 bg-muted p-6 flex items-start gap-4">
          <Users className="h-5 w-5 text-accent shrink-0 mt-1" strokeWidth={1.5} />
          <div>
            <h3 className="font-display text-lg mb-1 text-foreground italic">Real People. Real Help.</h3>
            <p className="text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
              Research shows customers in fashion and retail report significantly higher satisfaction and trust when supported by human agents. 
              That's why every W.Y.W interaction is handled by a trained team member who understands style and service.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
