import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/447700000001?text=' + encodeURIComponent('Hi, I need help with my W.Y.W order.');

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith('/admin') || location.pathname === '/customer-service') return null;

  return (
    <div className="fixed bottom-6 left-6 z-[60]" style={{ bottom: 'max(24px, env(safe-area-inset-bottom, 24px))' }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute bottom-14 left-0 w-[320px] bg-background border border-border shadow-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-body text-[0.85rem] font-semibold text-foreground">W.Y.W Customer Service</h3>
                <p className="text-[0.7rem] text-muted-foreground font-body">Mon–Sat, 9am–8pm. Human agents only.</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Options */}
            <div className="p-3 space-y-2">
              <a
                href="/customer-service"
                className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                <span className="font-body text-[0.82rem] text-foreground">Start Live Chat</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
              >
                <Phone className="h-4 w-4 text-green-600" strokeWidth={1.5} />
                <span className="font-body text-[0.82rem] text-foreground">WhatsApp Us</span>
              </a>
              <a
                href="mailto:hello@wyw.com"
                className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
              >
                <Mail className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                <span className="font-body text-[0.82rem] text-foreground">Email Us</span>
              </a>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-3">
              <p className="text-[0.7rem] text-muted-foreground font-body text-center">Average response time: under 2 hours</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow font-body text-[0.8rem] font-medium"
        layout
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        <span>{hovered ? 'Chat with us' : 'Need help?'}</span>
      </motion.button>
    </div>
  );
}
