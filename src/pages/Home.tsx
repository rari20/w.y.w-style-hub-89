import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, brands } from '@/data/products';
import { usePageTitle } from '@/hooks/usePageTitle';

const newIn = products.filter(p => p.isNew).slice(0, 8);
const trending = products.filter(p => p.isTrending).slice(0, 6);

const occasions = [
  { title: 'Office Ready', filter: 'workwear', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80&fit=crop&crop=center' },
  { title: 'Weekend Edit', filter: 'casual', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop&crop=center' },
  { title: 'Evening Out', filter: 'evening', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop&crop=center' },
  { title: 'Layering Season', filter: 'outerwear', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fit=crop&crop=center' },
];

const campaigns = [
  {
    eyebrow: 'New Season',
    title: 'Quiet Luxury, Loud Confidence',
    cta: 'Shop New In',
    to: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&fit=crop&crop=center',
  },
  {
    eyebrow: 'The Edit',
    title: 'Layered For Impact',
    cta: 'Shop Outerwear',
    to: '/shop?category=outerwear',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&fit=crop&crop=center',
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Campaign Tiles — 50/50 split */}
      <section className="grid md:grid-cols-2 mt-16">
        {campaigns.map(camp => (
          <Link
            key={camp.title}
            to={camp.to}
            className="relative aspect-[4/5] md:aspect-auto md:h-[80vh] overflow-hidden group"
          >
            <img src={camp.image} alt={camp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute bottom-10 left-10 z-10 text-white">
              <p className="font-body text-[0.625rem] uppercase tracking-[0.2em] mb-3 opacity-60">{camp.eyebrow}</p>
              <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[1.05] italic mb-5" style={{ maxWidth: '16ch' }}>{camp.title}</h2>
              <span className="inline-block bg-white text-foreground font-body text-[0.65rem] uppercase tracking-[0.18em] px-7 py-3.5 hover:bg-white/90 transition-colors">
                {camp.cta}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* New In */}
      <section id="new-in" className="wyw-section">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Just Dropped</p>
              <h2 className="font-display text-[2.5rem] md:text-[3rem] italic text-foreground">New In</h2>
            </div>
            <Link to="/shop?filter=new" className="font-body text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              View All <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {newIn.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="wyw-section pt-0">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Most Popular</p>
              <h2 className="font-display text-[2.5rem] md:text-[3rem] italic text-foreground">Trending Now</h2>
            </div>
            <Link to="/shop?filter=trending" className="font-body text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              View All <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
            {trending.map(product => (
              <div key={product.id} className="min-w-[200px] md:min-w-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style by Occasion */}
      <section className="wyw-section pt-0">
        <div className="wyw-container">
          <div className="text-center mb-14">
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Curated For You</p>
            <h2 className="font-display text-[2.5rem] md:text-[3rem] italic text-foreground">Style by Occasion</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {occasions.map(occ => (
              <Link
                key={occ.filter}
                to={`/shop?filter=${occ.filter}`}
                className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
              >
                <img src={occ.image} alt={occ.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="font-display text-[1.5rem] md:text-[2rem] italic mb-2">{occ.title}</h3>
                  <span className="font-body text-[0.625rem] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1">
                    Shop Now <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Pull Quote */}
      <section className="wyw-section border-t border-border">
        <div className="wyw-container flex justify-center">
          <blockquote className="max-w-[50ch] text-center">
            <p className="font-display text-[2rem] md:text-[2.5rem] italic leading-[1.2] text-foreground mb-6">
              "Fashion is about something that comes from within you."
            </p>
            <cite className="font-body text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground not-italic">
              — Ralph Lauren
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Partner Brands */}
      <section className="wyw-section pt-0 border-b border-border">
        <div className="wyw-container">
          <div className="text-center mb-14">
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">Our Partners</p>
            <h2 className="font-display text-[2.5rem] md:text-[3rem] italic text-foreground">The Brands</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {brands.map(brand => (
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className="bg-background text-center group py-12 hover:bg-muted transition-colors duration-500"
              >
                <h3 className="font-display text-[1.5rem] tracking-[0.02em] italic group-hover:text-primary transition-colors duration-500 text-foreground">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="wyw-section">
        <div className="wyw-container grid md:grid-cols-5 gap-16 items-center">
          <div className="md:col-span-3">
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-primary mb-4">Expert Styling</p>
            <h2 className="font-display text-[2.5rem] md:text-[3.5rem] italic leading-[1.05] mb-6 text-foreground">
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
          </div>
          <div className="md:col-span-2">
            <div className="aspect-[3/4] bg-muted flex items-center justify-center border border-border">
              <div className="text-center p-8">
                <p className="font-display text-[2.5rem] italic leading-[1.1] mb-2 text-foreground">Personal</p>
                <p className="font-display text-[2.5rem] italic leading-[1.1] text-foreground">Styling</p>
                <p className="font-body text-[0.7rem] text-muted-foreground mt-4 tracking-wide">By humans, for humans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A note from our stylists */}
      <section className="border-t border-border">
        <div className="wyw-container py-20">
          <div className="max-w-[50ch] mx-auto text-center">
            <p className="font-body text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground mb-6">A Note From Our Stylists</p>
            <p className="font-body font-light text-muted-foreground leading-[1.85] mb-6">
              Every piece we curate is chosen with intention. We believe in the quiet power of dressing well — not for attention, but for self-assurance.
              Visit us in-store, and you'll understand.
            </p>
            <p className="font-display text-[1.25rem] italic text-primary">The W.Y.W Team</p>
          </div>
        </div>
      </section>

      {/* Email Subscribe */}
      <section className="bg-muted">
        <div className="wyw-container py-20 max-w-xl mx-auto text-center">
          <h2 className="font-display text-[2rem] italic mb-4 text-foreground">Stay Connected</h2>
          <p className="text-muted-foreground font-body text-[0.8125rem] font-light mb-8">
            New arrivals, exclusive offers, and styling insights — delivered to your inbox.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-0 border-b border-foreground">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent px-0 py-3 font-body text-[0.9375rem] font-light focus:outline-none placeholder:text-muted-foreground text-foreground"
            />
            <button className="font-body text-[0.7rem] uppercase tracking-[0.18em] text-foreground px-4 hover:text-primary transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
