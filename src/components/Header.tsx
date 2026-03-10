import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, Moon, Sun, ShoppingBag, Volume2, VolumeX, Shield, ExternalLink } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useMusic } from '@/context/MusicContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ADMIN_EMAIL } from '@/data/adminData';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Brands', to: '/brands' },
  { label: 'Consultation', to: '/consultation' },
  { label: 'Stores', to: '/stores' },
];

export default function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { isPlaying, toggleMusic } = useMusic();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = user?.email === ADMIN_EMAIL;

  const isLanding = location.pathname === '/';

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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const linkColor = isLanding && !isScrolled
    ? 'text-white/80 hover:text-white'
    : 'text-muted-foreground hover:text-foreground';

  const activeLink = (path: string) =>
    location.pathname === path ? 'border-b border-current pb-px' : '';

  // ─── ADMIN HEADER ───
  if (isAdmin) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } backdrop-blur-xl bg-background/85 border-b border-border`}
      >
        <div className="wyw-container flex items-center justify-between h-[68px]">
          {/* Logo → /admin */}
          <Link to="/admin" className="flex items-center gap-2">
            <span className="font-display text-[1.6rem] tracking-[0.04em] text-foreground">W.Y.W</span>
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground font-body mt-1">Admin Portal</span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 transition-opacity hover:opacity-55 text-muted-foreground hover:text-foreground"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </div>
              onClick={() => navigate('/admin')}
              className="p-2 transition-opacity hover:opacity-55 text-muted-foreground hover:text-foreground"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ─── REGULAR CUSTOMER HEADER ───
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
      <div className="wyw-container flex items-center justify-between h-[68px]">
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
        <nav className="hidden md:flex items-center gap-[clamp(1.5rem,3vw,3rem)]">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-label transition-opacity hover:opacity-55 ${linkColor} ${activeLink(link.to)}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            className={`hidden md:flex p-2 transition-opacity hover:opacity-55 ${linkColor}`}
            aria-label={isPlaying ? 'Mute music' : 'Play music'}
          >
            {isPlaying ? <Volume2 className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <VolumeX className="h-[18px] w-[18px]" strokeWidth={1.5} />}
          </button>
          <Link to="/shop" className="hidden md:flex">
            <button className={`p-2 transition-opacity hover:opacity-55 ${linkColor}`}>
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </Link>
          <button
            onClick={toggleTheme}
            className={`hidden md:flex w-8 h-8 rounded-full border border-border items-center justify-center transition-all hover:border-foreground ${linkColor}`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {theme === 'light' ? <Moon className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Sun className="h-3.5 w-3.5" strokeWidth={1.5} />}
            </motion.div>
          </button>
          <Link to="/account">
            <button className={`p-2 transition-opacity hover:opacity-55 ${linkColor}`}>
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          </Link>
          <Link to="/cart" className="relative">
            <button className={`p-2 transition-opacity hover:opacity-55 ${linkColor}`}>
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
          <button
            className={`md:hidden p-2 ${linkColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed left-0 right-0 bottom-0 top-[68px] bg-background z-50 px-8 py-12 space-y-8 overflow-y-auto"
            style={{ height: 'calc(100dvh - 68px)' }}
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
            <div className="pt-8 border-t border-border space-y-4">
              <button onClick={toggleMusic} className="flex items-center gap-3 nav-label text-muted-foreground">
                {isPlaying ? <Volume2 className="h-4 w-4" strokeWidth={1.5} /> : <VolumeX className="h-4 w-4" strokeWidth={1.5} />}
                {isPlaying ? 'Mute Music' : 'Play Music'}
              </button>
              <button onClick={toggleTheme} className="flex items-center gap-3 nav-label text-muted-foreground">
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
