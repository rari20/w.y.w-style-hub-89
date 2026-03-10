import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star, HelpCircle, Truck, RotateCcw, Gift, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const pills = [
  { icon: Gift, label: 'Gift Cards', color: 'text-amber-500', to: '/gift-cards', authTo: '/gift-cards' },
  { icon: RotateCcw, label: 'Returns', color: 'text-foreground', to: '/returns', authTo: '/account#returns' },
  { icon: Truck, label: 'Track Order', color: 'text-foreground', to: null, authTo: '/account#orders' },
  { icon: HelpCircle, label: 'FAQ', color: 'text-blue-500', to: '/customer-service#faq', authTo: '/customer-service#faq' },
  { icon: Star, label: 'Leave a Review', color: 'text-amber-500', to: null, authTo: '/account#feedback' },
];

export default function FloatingQuickAccess() {
  const [open, setOpen] = useState(false);
  const [trackModal, setTrackModal] = useState(false);
  const [trackOrder, setTrackOrder] = useState('');
  const [trackEmail, setTrackEmail] = useState('');
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith('/admin')) return null;

  const handlePill = (pill: typeof pills[0]) => {
    setOpen(false);
    const dest = user ? pill.authTo : pill.to;

    // Track Order for guests
    if (pill.label === 'Track Order' && !user) {
      setTrackModal(true);
      return;
    }
    // Leave a Review for guests — go to feedback
    if (pill.label === 'Leave a Review' && !user) {
      navigate('/feedback');
      return;
    }

    if (dest) {
      if (dest.includes('#')) {
        const [path, hash] = dest.split('#');
        navigate(path);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        navigate(dest);
      }
    }
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[60] sm:bottom-6 md:bottom-6" style={{ bottom: 'max(24px, env(safe-area-inset-bottom, 24px))' }}>
        <AnimatePresence>
          {open && (
            <div className="absolute bottom-16 right-0 flex flex-col gap-2 items-end">
              {pills.map((pill, i) => (
                <motion.button
                  key={pill.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => handlePill(pill)}
                  className="flex items-center gap-3 bg-background border border-border px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  <span className={`w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0`}>
                    <pill.icon className={`h-3.5 w-3.5 ${pill.color}`} strokeWidth={1.5} />
                  </span>
                  <span className="font-body text-[0.8rem] text-foreground">{pill.label}</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(!open)}
          className="w-[52px] h-[52px] rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </motion.button>
      </div>

      {/* Track Order Modal for guests */}
      <AnimatePresence>
        {trackModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => setTrackModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border border-border p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-display text-lg italic text-foreground mb-1">Track Your Order</h3>
              <p className="text-[0.8rem] text-muted-foreground font-body mb-4">Enter your details below to check your order status.</p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="e.g. WYW-2026-0042"
                  value={trackOrder}
                  onChange={e => setTrackOrder(e.target.value)}
                  className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-2.5 font-body text-[0.85rem] focus:outline-none focus:border-foreground text-foreground placeholder:text-muted-foreground/50"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={trackEmail}
                  onChange={e => setTrackEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-muted-foreground/30 px-0 py-2.5 font-body text-[0.85rem] focus:outline-none focus:border-foreground text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setTrackModal(false)}
                  className="flex-1 py-2.5 font-body text-[0.8rem] border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setTrackModal(false); navigate('/customer-service'); }}
                  className="flex-1 py-2.5 font-body text-[0.8rem] bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  Track
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
