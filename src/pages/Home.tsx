import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, brands } from '@/data/products';

const newIn = products.filter(p => p.isNew).slice(0, 8);
const trending = products.filter(p => p.isTrending).slice(0, 6);

const occasions = [
  { title: 'Office Ready', filter: 'workwear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop' },
  { title: 'Weekend Edit', filter: 'casual', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop' },
  { title: 'Evening Out', filter: 'evening', image: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=600&h=800&fit=crop' },
  { title: 'Layering Season', filter: 'outerwear', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop' },
];

const campaigns = [
  {
    eyebrow: 'New Season',
    title: 'Quiet Luxury, Loud Confidence',
    cta: 'Shop New In',
    to: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop',
  },
  {
    eyebrow: 'The Edit',
    title: 'Layered For Impact',
    cta: 'Shop Outerwear',
    to: '/shop?category=outerwear',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&h=1000&fit=crop',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  return (
    <Layout>
      {/* Campaign Tiles — 50/50 split */}
      <section className="grid md:grid-cols-2 mt-16">
        {campaigns.map((camp, i) => (
          <motion.div
            key={camp.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.15, ease }}
          >
            <Link
              to={camp.to}
              className="relative aspect-[4/5] md:aspect-auto md:h-[80vh] overflow-hidden group block"
            >
              <img src={camp.image} alt={camp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors duration-500" />
              <div className="absolute bottom-10 left-10 z-10 text-white">
                <p className="font-body text-[0.625rem] uppercase tracking-[0.2em] mb-3 opacity-60">{camp.eyebrow}</p>
                <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[1.05] italic mb-5" style={{ maxWidth: '16ch' }}>{camp.title}</h2>
                <span className="inline-block bg-white text-foreground font-body text-[0.65rem] uppercase tracking-[0.18em] px-7 py-3.5 hover:bg-white/90 transition-colors">
                  {camp.cta}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* New In */}
      <section id="new-in" className="wyw-section">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Just Dropped</p>
              <h2 className="font-display text-[2.5rem] md:text-[3rem] italic">New In</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <Link to="/shop?filter=new" className="font-body text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                View All <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {newIn.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="wyw-section pt-0">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Most Popular</p>
              <h2 className="font-display text-[2.5rem] md:text-[3rem] italic">Trending Now</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <Link to="/shop?filter=trending" className="font-body text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                View All <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
            {trending.map((product, i) => (
              <div key={product.id} className="min-w-[200px] md:min-w-0 snap-start">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style by Occasion */}
      <section className="wyw-section pt-0">
        <div className="wyw-container">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Curated For You</p>
            <h2 className="font-display text-[2.5rem] md:text-[3rem] italic">Style by Occasion</h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {occasions.map((occ, i) => (
              <motion.div
                key={occ.filter}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
              >
                <Link
                  to={`/shop?filter=${occ.filter}`}
                  className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group block"
                >
                  <img src={occ.image} alt={occ.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/25 group-hover:bg-foreground/40 transition-colors duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="font-display text-[1.5rem] md:text-[2rem] italic mb-2">{occ.title}</h3>
                    <span className="font-body text-[0.625rem] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1">
                      Shop Now <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Pull Quote */}
      <section className="wyw-section border-t border-border">
        <div className="wyw-container flex justify-center">
          <motion.blockquote
            className="max-w-[50ch] text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="font-display text-[2rem] md:text-[2.5rem] italic leading-[1.2] text-foreground mb-6">
              "Fashion is about something that comes from within you."
            </p>
            <cite className="font-body text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground not-italic">
              — Ralph Lauren
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* Partner Brands */}
      <section className="wyw-section pt-0 border-b border-border">
        <div className="wyw-container">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Our Partners</p>
            <h2 className="font-display text-[2.5rem] md:text-[3rem] italic">The Brands</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <Link
                  to={`/brands/${brand.id}`}
                  className="bg-background text-center group py-12 hover:bg-muted transition-colors duration-500 block"
                >
                  <h3 className="font-display text-[1.5rem] tracking-[0.02em] italic group-hover:text-primary transition-colors duration-500">
                    {brand.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="wyw-section">
        <div className="wyw-container grid md:grid-cols-5 gap-16 items-center">
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-primary mb-4">Expert Styling</p>
            <h2 className="font-display text-[2.5rem] md:text-[3.5rem] italic leading-[1.05] mb-6">
              Your First Consultation<br />is Complimentary
            </h2>
            <p className="text-muted-foreground font-body font-light leading-[1.8] mb-8 max-w-[55ch]">
              Our expert human stylists will help you build the perfect wardrobe. In-store or virtual — your choice.
              Includes a six-month styling warranty.
            </p>
            <Link
              to="/consultation"
              className="inline-block bg-foreground text-background font-body text-[0.7rem] uppercase tracking-[0.18em] px-10 py-4 hover:bg-primary transition-colors duration-[400ms]"
            >
              Book Now
            </Link>
          </motion.div>
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div className="aspect-[3/4] bg-muted flex items-center justify-center border border-border">
              <div className="text-center p-8">
                <p className="font-display text-[2.5rem] italic leading-[1.1] mb-2 text-foreground">Personal</p>
                <p className="font-display text-[2.5rem] italic leading-[1.1] text-foreground">Styling</p>
                <p className="font-body text-[0.7rem] text-muted-foreground mt-4 tracking-wide">By humans, for humans</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* A note from our stylists */}
      <section className="border-t border-border">
        <div className="wyw-container py-20">
          <motion.div
            className="max-w-[50ch] mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-6">A Note From Our Stylists</p>
            <p className="font-body font-light text-muted-foreground leading-[1.85] mb-6">
              Every piece we curate is chosen with intention. We believe in the quiet power of dressing well — not for attention, but for self-assurance.
              Visit us in-store, and you'll understand.
            </p>
            <p className="font-script text-[1.5rem] text-primary">The W.Y.W Team</p>
          </motion.div>
        </div>
      </section>

      {/* Email Subscribe */}
      <section className="bg-muted">
        <div className="wyw-container py-20 max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="font-display text-[2rem] italic mb-4">Stay Connected</h2>
            <p className="text-muted-foreground font-body text-[0.8125rem] font-light mb-8">
              New arrivals, exclusive offers, and styling insights — delivered to your inbox.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-0 border-b border-foreground">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-0 py-3 font-body text-[0.9375rem] font-light focus:outline-none placeholder:text-muted-foreground"
              />
              <button className="font-body text-[0.7rem] uppercase tracking-[0.18em] text-foreground px-4 hover:text-primary transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
