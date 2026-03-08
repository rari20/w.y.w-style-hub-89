import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pause, Play, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import Header from '@/components/Header';

const VIDEO_SOURCES = [
  "https://cdn.coverr.co/videos/coverr-a-model-walks-the-runway-at-a-fashion-show-6618/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-fashion-items-on-a-rack-4882/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-fashion-clothing-on-rack-7914/1080p.mp4",
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
    <div className="relative w-full" style={{ backgroundColor: '#0a0a08' }}>
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

          {/* Animated dark gradient fallback — always visible until video loads */}
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

        {/* Content — NO pseudo-elements, NO text-shadow, NO watermarks */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Title — simple, clean, no decorative duplicates */}
          <h1
            className="mb-5 flex flex-col items-center text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 11vw, 9rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textShadow: 'none',
            }}
          >
            <motion.span
              className="block"
              style={{ textShadow: 'none' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              What Do
            </motion.span>
            <motion.span
              className="block italic"
              style={{ textShadow: 'none' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              You Want?
            </motion.span>
          </h1>

          <motion.p
            className="font-body text-[0.625rem] tracking-[0.3em] uppercase mb-8"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Multi-Brand Fashion Destination
          </motion.p>

          <motion.p
            className="max-w-[50ch] mx-auto font-body text-[0.8125rem] font-light mb-12 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
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
              className="font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 border transition-all duration-[400ms] hover:bg-transparent inline-block"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#111111',
                borderColor: '#FFFFFF',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#111111';
              }}
            >
              Shop Now
            </Link>
            <Link
              to="/consultation"
              className="font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 transition-all duration-[400ms] inline-block"
              style={{
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
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
          <span className="font-body text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4" style={{ color: 'rgba(255,255,255,0.4)' }} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Pause/Play — only show if video loaded */}
        {!videoFailed && videoLoaded && (
          <button
            onClick={togglePlay}
            className="absolute bottom-10 right-10 z-20 w-9 h-9 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300"
            style={{
              borderColor: 'rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: 'rgba(255,255,255,0.6)',
            }}
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
