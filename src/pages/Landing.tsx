import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Landing() {
  usePageTitle('Multi-Brand Fashion Destination');
  return (
    <div className="relative w-full" style={{ backgroundColor: '#0a0a08' }}>
      {/* Hero Section — Full viewport */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background with Ken Burns animation — auto plays */}
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Fashion editorial background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(0.75) contrast(1.05)', opacity: 0.55 }}
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.12 }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.35) 100%)',
            }}
          />
        </div>

        <Header />

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1
            className="mb-5 flex flex-col items-center text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.015em',
              color: '#FFFFFF',
              textShadow: 'none',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              What do
            </motion.span>
            <motion.span
              className="block italic"
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
              className="font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 border transition-all duration-[400ms] inline-block"
              style={{ backgroundColor: '#FFFFFF', color: '#111111', borderColor: '#FFFFFF' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#111111'; }}
            >
              Shop Now
            </Link>
            <Link
              to="/consultation"
              className="font-body text-[0.7rem] uppercase tracking-[0.18em] font-normal px-10 py-4 transition-all duration-[400ms] inline-block"
              style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#FFFFFF', backgroundColor: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFFFFF'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
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
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="h-4 w-4" style={{ color: 'rgba(255,255,255,0.4)' }} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
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
