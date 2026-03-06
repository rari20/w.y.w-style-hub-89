import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Brands', to: '/brands' },
  { label: 'Consultation', to: '/consultation' },
  { label: 'Rewards', to: '/rewards' },
  { label: 'Stores', to: '/stores' },
];

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="wyw-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 font-display text-3xl tracking-wider">
          <Zap className="h-6 w-6 text-accent" strokeWidth={2.5} />
          <span>W.Y.W</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/shop" className="hidden md:flex">
            <Button variant="ghost" size="icon"><Search className="h-5 w-5" /></Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-6 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-lg font-display tracking-wider uppercase text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
