import { Link } from 'react-router-dom';

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
    <footer className="bg-foreground text-background">
      <div className="wyw-container py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-[1.6rem] tracking-[0.04em] text-background">
              W.Y.W
            </Link>
            <p className="mt-3 font-body text-[0.75rem] text-background/50 font-light" style={{ maxWidth: '20ch' }}>
              What do you want?
            </p>
          </div>

          {footerLinks.map(group => (
            <div key={group.title}>
              <h4 className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-background/40 mb-5">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-[0.8125rem] font-light text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[0.625rem] text-background/30 tracking-wide">
            © 2026 W.Y.W — What Do You Want? All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-background/40 hover:text-background/70 transition-colors cursor-pointer">Instagram</span>
            <span className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-background/40 hover:text-background/70 transition-colors cursor-pointer">TikTok</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
