import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pause, Play, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import Header from '@/components/Header';

const VIDEO_SRC = "https://videos.pexels.com/video-files/8539488/8539488-uhd_2560_1440_25fps.mp4";
const VIDEO_FALLBACK = "https://videos.pexels.com/video-files/7679465/7679465-uhd_2560_1440_25fps.mp4";

export default function Landing() {
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPaused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPaused(!isPaused);
  };

  return (
    <div className="relative w-full bg-foreground">
      {/* Hero Section — Full viewport */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ filter: 'saturate(0.85) contrast(1.05)' }}
            onCanPlay={() => setVideoLoaded(true)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            <source src={VIDEO_FALLBACK} type="video/mp4" />
          </video>

          {/* Fallback animated gradient while video loads */}
          {!videoLoaded && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1a1a18 0%, #2d2d2a 25%, #1a1a18 50%, #3a3530 75%, #1a1a18 100%)',
                backgroundSize: '400% 400%',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Header */}
        <Header />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            className="text-white/50 font-body text-[0.625rem] tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Multi-Brand Fashion Destination
          </motion.p>

          <motion.h1
            className="font-display text-white leading-[0.95] mb-8 flex flex-col items-center"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Power Your
            </motion.span>
            <motion.span
              className="block italic"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Style
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-white/60 max-w-[50ch] mx-auto font-body text-[0.8125rem] font-light mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Curated collections from the world's most exciting contemporary brands, with expert styling consultations in-store and online.
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/home"
              className="bg-white text-foreground font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 hover:bg-white/90 transition-all duration-[400ms]"
            >
              Shop Now
            </Link>
            <Link
              to="/consultation"
              className="border border-white/40 text-white font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 hover:bg-white/5 hover:border-white transition-all duration-[400ms]"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          <span className="text-white/40 font-body text-[0.55rem] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4 text-white/40" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Pause/Play */}
        <button
          onClick={togglePlay}
          className="absolute bottom-10 right-10 z-20 w-9 h-9 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all duration-300"
        >
          {isPaused ? <Play className="h-3 w-3" strokeWidth={1.5} /> : <Pause className="h-3 w-3" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Below-fold content so page is scrollable */}
      <section className="relative z-10 bg-background">
        <div className="wyw-container py-24 text-center">
          <p className="font-body text-[0.625rem] tracking-[0.25em] uppercase text-muted-foreground mb-4">Curated Excellence</p>
          <h2 className="font-display text-[2.5rem] md:text-[3.5rem] italic text-foreground mb-6">Four Brands. One Vision.</h2>
          <p className="text-muted-foreground font-body font-light max-w-[55ch] mx-auto leading-[1.85] mb-12">
            Each W.Y.W partner brand brings a distinct aesthetic to our curation. From effortless femininity to urban precision, organic warmth to deliberate weight.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              { name: 'Lumenwear', desc: 'Effortless femininity' },
              { name: 'Voltex Studio', desc: 'Technical precision' },
              { name: 'ArcThread', desc: 'Organic & considered' },
              { name: 'KiloKouture', desc: 'Weight & substance' },
            ].map(brand => (
              <Link
                key={brand.name}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="bg-background py-16 text-center group hover:bg-muted transition-colors duration-500"
              >
                <h3 className="font-display text-[1.5rem] italic group-hover:text-primary transition-colors duration-500 text-foreground">{brand.name}</h3>
                <p className="font-body text-[0.7rem] text-muted-foreground mt-2 tracking-wide">{brand.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="wyw-container pb-24 text-center">
          <Link
            to="/home"
            className="inline-block bg-foreground text-background font-body text-[0.7rem] uppercase tracking-[0.18em] px-12 py-4 hover:bg-primary transition-colors duration-[400ms]"
          >
            Enter W.Y.W
          </Link>
        </div>
      </section>
    </div>
  );
}
