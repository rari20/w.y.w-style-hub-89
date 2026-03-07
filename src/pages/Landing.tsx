import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Pause, Play } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';

export default function Landing() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Video-style Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-foreground">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 50%, hsl(30 10% 20%) 0%, transparent 70%)',
                'radial-gradient(ellipse at 80% 30%, hsl(30 8% 25%) 0%, transparent 70%)',
                'radial-gradient(ellipse at 50% 80%, hsl(30 10% 18%) 0%, transparent 70%)',
                'radial-gradient(ellipse at 20% 50%, hsl(30 10% 20%) 0%, transparent 70%)',
              ],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 120px)' }}
            animate={{ x: [0, 120] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          className="text-white/40 font-body text-[0.625rem] tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Multi-Brand Fashion Destination
        </motion.p>

        <motion.h1
          className="font-display text-white leading-[0.95] mb-8 italic"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          What Do<br />You Want?
        </motion.h1>

        <motion.p
          className="text-white/40 max-w-[40ch] mx-auto font-body text-[0.8125rem] font-light mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Curated collections from the world's most exciting contemporary brands, with expert styling consultations in-store and online.
        </motion.p>

        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/home"
            className="bg-white text-foreground font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 hover:bg-white/90 transition-all duration-[400ms]"
          >
            Enter
          </Link>
          <Link
            to="/consultation"
            className="border border-white/30 text-white font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 hover:bg-white/5 transition-all duration-[400ms]"
          >
            Book Consultation
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/25"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-body text-[0.5rem] uppercase tracking-[0.3em] mb-2">Scroll</span>
          <ChevronDown className="h-3 w-3" strokeWidth={1} />
        </motion.div>

        {/* Pause/Play */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-10 right-10 w-9 h-9 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
        >
          {isPaused ? <Play className="h-3 w-3" strokeWidth={1.5} /> : <Pause className="h-3 w-3" strokeWidth={1.5} />}
        </button>
      </div>
    </div>
  );
}
