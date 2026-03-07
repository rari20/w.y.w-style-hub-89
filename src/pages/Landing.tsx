import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ChevronDown, Pause, Play } from 'lucide-react';
import { useState, useRef } from 'react';
import Header from '@/components/Header';

export default function Landing() {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background - using a gradient animation as placeholder since we can't embed real video */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
          {/* Animated fashion-like visual */}
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 50%, #333 0%, transparent 70%)',
                'radial-gradient(ellipse at 80% 30%, #444 0%, transparent 70%)',
                'radial-gradient(ellipse at 50% 80%, #333 0%, transparent 70%)',
                'radial-gradient(ellipse at 20% 50%, #333 0%, transparent 70%)',
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          {/* Fabric movement simulation */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)' }}
            animate={{ x: [0, 80] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Header sits on top */}
      <Header />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-6">
            Multi-Brand Fashion Destination
          </p>
          <h1 className="font-display text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)' }}>
            Power Your<br />Style
          </h1>
          <p className="text-white/60 max-w-md mx-auto text-sm md:text-base mb-10 font-body leading-relaxed">
            Curated collections from the world's most exciting contemporary brands, with expert styling consultations in-store and online.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/home"
              className="bg-white text-black text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/consultation"
              className="border border-white/40 text-white text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>

        {/* Video Pause/Play */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
