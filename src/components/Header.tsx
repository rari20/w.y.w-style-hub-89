import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Zap, Moon, Sun, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  {
    label: 'Shop',
    to: '/shop',
    mega: {
      Highlights: [
        { label: 'New In', to: '/shop?filter=new' },
        { label: 'Trending Now', to: '/shop?filter=trending' },
        { label: 'Best Sellers', to: '/shop' },
        { label: 'Sale', to: '/shop' },
        { label: 'Gift Cards', to: '/gift-cards' },
      ],
      Category: [
        { label: 'Tops', to: '/shop?category=tops' },
        { label: 'Bottoms', to: '/shop?category=bottoms' },
        { label: 'Dresses', to: '/shop?category=dresses' },
        { label: 'Outerwear', to: '/shop?category=outerwear' },
        { label: 'Knitwear', to: '/shop?category=knitwear' },
        { label: 'Accessories', to: '/shop?category=accessories' },
      ],
      Brand: [
        { label: 'Lumenwear', to: '/shop?brand=Lumenwear' },
        { label: 'Voltex Studio', to: '/shop?brand=Voltex+Studio' },
        { label: 'ArcThread', to: '/shop?brand=ArcThread' },
        { label: 'KiloKouture', to: '/shop?brand=KiloKouture' },
      ],
      Trending: [
        { label: 'Office Ready', to: '/shop?filter=workwear' },
        { label: 'Weekend Edit', to: '/shop?filter=casual' },
        { label: 'Evening Out', to: '/shop?filter=evening' },
        { label: 'Layering Season', to: '/shop?filter=outerwear' },
      ],
    },
  },
  { label: 'Brands', to: '/brands' },
  { label: 'Consultation', to: '/consultation' },
  { label: 'Rewards', to: '/rewards' },
  { label: 'Stores', to: '/stores' },
];

export default function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  const handleMegaEnter = (label: string) => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(label);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(null), 200);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm border-b border-border ${
      isLanding ? 'bg-transparent border-transparent absolute w-full' : 'bg-background/95'
    }`}>
      <div className="wyw-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className={`flex items-center gap-1 font-display text-3xl tracking-wider ${isLanding ? 'text-white' : ''}`}>
          <Zap className="h-6 w-6 text-primary" strokeWidth={2.5} />
          <span>W.Y.W</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <div
              key={link.to}
              className="relative"
              onMouseEnter={() => link.mega ? handleMegaEnter(link.label) : undefined}
              onMouseLeave={() => link.mega ? handleMegaLeave() : undefined}
            >
              <Link
                to={link.to}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  isLanding ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>

              {/* Mega Menu */}
              <AnimatePresence>
                {link.mega && megaOpen === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4"
                    onMouseEnter={() => handleMegaEnter(link.label)}
                    onMouseLeave={handleMegaLeave}
                  >
                    <div className="bg-card border border-border shadow-lg rounded-sm p-8 min-w-[600px] grid grid-cols-4 gap-8">
                      {Object.entries(link.mega).map(([colTitle, items]) => (
                        <div key={colTitle}>
                          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
                            {colTitle}
                          </p>
                          <ul className="space-y-2">
                            {(items as { label: string; to: string }[]).map(item => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  onClick={() => setMegaOpen(null)}
                                  className="text-[0.85rem] text-foreground hover:text-primary transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to="/shop" className="hidden md:flex">
            <Button variant="ghost" size="icon" className={isLanding ? 'text-white hover:bg-white/10' : ''}>
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/account" className="hidden md:flex">
            <Button variant="ghost" size="icon" className={isLanding ? 'text-white hover:bg-white/10' : ''}>
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`hidden md:flex ${isLanding ? 'text-white hover:bg-white/10' : ''}`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </motion.div>
          </Button>
          <Link to="/account">
            <Button variant="ghost" size="icon" className={isLanding ? 'text-white hover:bg-white/10' : ''}>
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className={isLanding ? 'text-white hover:bg-white/10' : ''}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className={`md:hidden ${isLanding ? 'text-white hover:bg-white/10' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 bg-background z-50 px-6 py-8 space-y-6 overflow-y-auto"
          >
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block text-3xl font-display tracking-wider uppercase text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-border">
              <button onClick={() => { toggleTheme(); }} className="flex items-center gap-3 text-sm text-muted-foreground">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
