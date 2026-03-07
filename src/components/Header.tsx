import { Link, useLocation } from 'react-router-dom';
import { Search, User, Menu, X, Moon, Sun, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const lastScrollY = useRef(0);
  const location = useLocation();

  const isLanding = location.pathname === '/';

  // Hide nav on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMegaEnter = (label: string) => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(label);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(null), 200);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isLanding && !isScrolled
          ? 'bg-transparent border-transparent'
          : 'backdrop-blur-xl bg-background/85 border-b border-border'
      }`}
    >
      <div className="wyw-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className={`font-display text-[1.6rem] tracking-[0.04em] ${
            isLanding && !isScrolled ? 'text-white' : 'text-foreground'
          }`}
        >
          W.Y.W
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
                className={`nav-label transition-colors editorial-link ${
                  isLanding && !isScrolled ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
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
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4"
                    onMouseEnter={() => handleMegaEnter(link.label)}
                    onMouseLeave={handleMegaLeave}
                  >
                    <div className="bg-card border border-border p-10 min-w-[640px] grid grid-cols-4 gap-10">
                      {Object.entries(link.mega).map(([colTitle, items]) => (
                        <div key={colTitle}>
                          <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-body font-medium">
                            {colTitle}
                          </p>
                          <ul className="space-y-2.5">
                            {(items as { label: string; to: string }[]).map(item => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  onClick={() => setMegaOpen(null)}
                                  className="text-[0.85rem] font-body font-light text-foreground hover:text-primary transition-colors"
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
        <div className="flex items-center gap-1">
          <Link to="/shop" className="hidden md:flex">
            <button className={`p-2.5 transition-colors ${isLanding && !isScrolled ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </Link>
          <Link to="/account" className="hidden md:flex">
            <button className={`p-2.5 transition-colors ${isLanding && !isScrolled ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </Link>
          <button
            onClick={toggleTheme}
            className={`hidden md:flex p-2.5 transition-colors ${isLanding && !isScrolled ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {theme === 'light' ? <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} />}
            </motion.div>
          </button>
          <Link to="/account">
            <button className={`p-2.5 transition-colors ${isLanding && !isScrolled ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </Link>
          <Link to="/cart" className="relative">
            <button className={`p-2.5 transition-colors ${isLanding && !isScrolled ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground text-[9px] font-medium w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
          <button
            className={`md:hidden p-2.5 ${isLanding && !isScrolled ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 bg-background z-50 px-8 py-12 space-y-8 overflow-y-auto"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-[2.5rem] leading-none tracking-tight text-foreground"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-8 border-t border-border">
              <button onClick={() => { toggleTheme(); }} className="flex items-center gap-3 nav-label text-muted-foreground">
                {theme === 'light' ? <Moon className="h-4 w-4" strokeWidth={1.5} /> : <Sun className="h-4 w-4" strokeWidth={1.5} />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
