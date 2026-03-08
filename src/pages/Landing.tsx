import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pause, Play, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import Header from '@/components/Header';

const VIDEO_SOURCES = [
  "https://cdn.coverr.co/videos/coverr-fashion-clothing-on-rack-7914/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-garments-hanging-in-a-store-2125/1080p.mp4",
];

export default function Landing() {
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
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
        {/* Video / Fallback Background */}
        <div className="absolute inset-0">
          {!videoFailed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ filter: 'saturate(0.85) contrast(1.05)' }}
              onCanPlay={() => setVideoLoaded(true)}
              onError={() => setVideoFailed(true)}
            >
              {VIDEO_SOURCES.map((src, i) => (
                <source key={i} src={src} type="video/mp4" />
              ))}
            </video>
          )}

          {/* Animated dark gradient fallback */}
          {(!videoLoaded || videoFailed) && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(125deg, #0a0a08 0%, #1a1612 20%, #0d0d0a 40%, #221e18 60%, #0a0a08 80%, #1a1612 100%)',
                backgroundSize: '300% 300%',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 30%', '50% 100%', '0% 50%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Header */}
        <Header />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="font-display text-white leading-[0.92] mb-5 flex flex-col items-center text-center"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              What Do
            </motion.span>
            <motion.span
              className="block italic"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              You Want?
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-white/50 font-body text-[0.625rem] tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Multi-Brand Fashion Destination
          </motion.p>

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
              className="bg-white font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 border border-white transition-all duration-[400ms] hover:bg-transparent hover:text-white"
              style={{ color: '#111111' }}
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

        {/* Pause/Play — only show if video loaded */}
        {!videoFailed && videoLoaded && (
          <button
            onClick={togglePlay}
            className="absolute bottom-10 right-10 z-20 w-9 h-9 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all duration-300"
          >
            {isPaused ? <Play className="h-3 w-3" strokeWidth={1.5} /> : <Pause className="h-3 w-3" strokeWidth={1.5} />}
          </button>
        )}
      </div>

      {/* Below-fold content */}
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
