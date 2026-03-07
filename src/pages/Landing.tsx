import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import Header from '@/components/Header';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&fit=crop&crop=center';
const HERO_IMAGE_2 = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80&fit=crop&crop=center';

const brandCards = [
  {
    name: 'Lumenwear',
    desc: 'Effortless femininity',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80&fit=crop&crop=center',
  },
  {
    name: 'Voltex Studio',
    desc: 'Technical precision',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&fit=crop&crop=center',
  },
  {
    name: 'ArcThread',
    desc: 'Organic & considered',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80&fit=crop&crop=center',
  },
  {
    name: 'KiloKouture',
    desc: 'Weight & substance',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80&fit=crop&crop=center',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.9]);

  return (
    <div className="relative w-full bg-foreground">
      {/* Hero Section — Full viewport with parallax */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Image Background with parallax zoom */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img
            src={HERO_IMAGE}
            alt="W.Y.W Fashion"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(0.85) contrast(1.05)' }}
          />
        </motion.div>

        {/* Animated overlay */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.75) 100%)',
            opacity: overlayOpacity,
          }}
        />
        <div className="hero-overlay" />

        {/* Header */}
        <Header />

        {/* Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            className="text-white/50 font-body text-[0.625rem] tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            Multi-Brand Fashion Destination
          </motion.p>

          <motion.h1
            className="font-display text-white leading-[0.95] mb-8 flex flex-col items-center"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease }}
            >
              Power Your
            </motion.span>
            <motion.span
              className="block italic"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
            >
              Style
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-white/60 max-w-[50ch] mx-auto font-body text-[0.8125rem] font-light mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
          >
            Curated collections from the world's most exciting contemporary brands, with expert styling consultations in-store and online.
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
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
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
        >
          <span className="text-white/40 font-body text-[0.55rem] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4 text-white/40" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>

      {/* Below-fold — Brands section */}
      <section className="relative z-10 bg-background">
        <div className="wyw-container py-24 text-center">
          <motion.p
            className="font-body text-[0.625rem] tracking-[0.25em] uppercase text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            Curated Excellence
          </motion.p>
          <motion.h2
            className="font-display text-[2.5rem] md:text-[3.5rem] italic text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Four Brands. One Vision.
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-body font-light max-w-[55ch] mx-auto leading-[1.85] mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Each W.Y.W partner brand brings a distinct aesthetic to our curation. From effortless femininity to urban precision, organic warmth to deliberate weight.
          </motion.p>

          {/* Brand cards with images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {brandCards.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              >
                <Link
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  className="relative aspect-[3/4] overflow-hidden group block"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/45 transition-colors duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="font-display text-[1.25rem] md:text-[1.5rem] italic mb-1">{brand.name}</h3>
                    <p className="font-body text-[0.65rem] text-white/70 tracking-wide">{brand.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editorial image + CTA */}
        <motion.div
          className="wyw-container pb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="relative aspect-[21/9] overflow-hidden group">
            <img
              src={HERO_IMAGE_2}
              alt="W.Y.W Editorial"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-foreground/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <p className="font-body text-[0.625rem] tracking-[0.25em] uppercase mb-4 text-white/70">New Season</p>
              <h2 className="font-display text-[2rem] md:text-[3rem] italic mb-6">Enter the World of W.Y.W</h2>
              <Link
                to="/home"
                className="inline-block bg-white text-foreground font-body text-[0.7rem] uppercase tracking-[0.18em] px-12 py-4 hover:bg-white/90 transition-colors duration-[400ms]"
              >
                Explore
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
