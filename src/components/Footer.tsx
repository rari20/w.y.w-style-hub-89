import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'New In', to: '/shop?filter=new' },
      { label: 'Trending', to: '/shop?filter=trending' },
      { label: 'All Products', to: '/shop' },
      { label: 'Gift Cards', to: '/gift-cards' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Customer Service', to: '/customer-service' },
      { label: 'Returns & Refunds', to: '/returns' },
      { label: 'Track My Order', to: '/account' },
      { label: 'FAQ', to: '/customer-service' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Brands', to: '/brands' },
      { label: 'Store Locator', to: '/stores' },
      { label: 'W.Y.W Rewards', to: '/rewards' },
      { label: 'Consultations', to: '/consultation' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Cookie Policy', to: '/cookies' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="wyw-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-1 font-display text-3xl tracking-wider text-secondary-foreground">
              <Zap className="h-6 w-6 text-accent" strokeWidth={2.5} />
              <span>W.Y.W</span>
            </Link>
            <p className="mt-3 text-sm text-secondary-foreground/60 font-body">
              Power your style.
            </p>
          </div>

          {footerLinks.map(group => (
            <div key={group.title}>
              <h4 className="font-display text-lg tracking-wider mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-secondary-foreground/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary-foreground/40">
            © 2026 Watt You Want? All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-secondary-foreground/40">Instagram</span>
            <span className="text-xs text-secondary-foreground/40">TikTok</span>
            <span className="text-xs text-secondary-foreground/40">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
