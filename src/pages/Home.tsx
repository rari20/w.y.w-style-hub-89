import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Flame, Calendar, MapPin, Package, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, brands } from '@/data/products';

const newIn = products.filter(p => p.isNew).slice(0, 8);
const trending = products.filter(p => p.isTrending).slice(0, 6);

const quickLinks = [
  { icon: Calendar, label: 'Book a Consultation', to: '/consultation' },
  { icon: MapPin, label: 'Find a Store', to: '/stores' },
  { icon: Package, label: 'Track My Order', to: '/account' },
  { icon: Users, label: 'Refer a Friend', to: '/rewards' },
];

const occasions = [
  { title: 'Office Ready', filter: 'workwear', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=800&fit=crop' },
  { title: 'Weekend Edit', filter: 'casual', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop' },
  { title: 'Evening Out', filter: 'evening', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop' },
  { title: 'Layering Season', filter: 'outerwear', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop' },
];

const campaigns = [
  {
    eyebrow: 'New Season',
    title: 'Quiet Luxury, Loud Confidence',
    cta: 'Shop New In',
    to: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
  },
  {
    eyebrow: 'The Edit',
    title: 'Layered For Impact',
    cta: 'Shop Outerwear',
    to: '/shop?category=outerwear',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop',
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Campaign Tiles — 50/50 split */}
      <section className="grid md:grid-cols-2">
        {campaigns.map(camp => (
          <Link
            key={camp.title}
            to={camp.to}
            className="relative aspect-[4/5] md:aspect-auto md:h-[70vh] overflow-hidden group"
          >
            <img src={camp.image} alt={camp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-8 left-8 z-10 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-70">{camp.eyebrow}</p>
              <h2 className="font-display text-3xl md:text-4xl mb-4">{camp.title}</h2>
              <span className="inline-block bg-white text-black text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-full">
                {camp.cta}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Quick Links */}
      <section className="border-b border-border">
        <div className="wyw-container grid grid-cols-2 md:grid-cols-4">
          {quickLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center gap-3 py-5 px-4 text-sm font-medium hover:bg-muted transition-colors ${i < 3 ? 'border-r border-border' : ''}`}
            >
              <link.icon className="h-5 w-5 text-primary" />
              <span className="hidden sm:inline">{link.label}</span>
              <span className="sm:hidden text-xs">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New In */}
      <section id="new-in" className="wyw-section">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Just Dropped</p>
              <h2 className="text-4xl md:text-5xl font-display">NEW IN</h2>
            </div>
            <Link to="/shop?filter=new" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newIn.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="wyw-section bg-muted/50">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2 flex items-center gap-1">
                <Flame className="h-3 w-3 text-primary" /> Most Popular
              </p>
              <h2 className="text-4xl md:text-5xl font-display">TRENDING NOW</h2>
            </div>
            <Link to="/shop?filter=trending" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
            {trending.map(product => (
              <div key={product.id} className="min-w-[200px] md:min-w-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style by Occasion */}
      <section className="wyw-section">
        <div className="wyw-container">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Curated For You</p>
            <h2 className="text-4xl md:text-5xl font-display">STYLE BY OCCASION</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {occasions.map(occ => (
              <Link
                key={occ.filter}
                to={`/shop?filter=${occ.filter}`}
                className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm group"
              >
                <img src={occ.image} alt={occ.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="font-display text-2xl md:text-4xl mb-2">{occ.title.toUpperCase()}</h3>
                  <span className="text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Shop Now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Banner */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="wyw-container text-center">
          <Zap className="h-10 w-10 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-display mb-4">JOIN W.Y.W REWARDS</h2>
          <p className="text-lg mb-6 max-w-lg mx-auto font-body opacity-90">
            Earn points every purchase. Unlock tiers. Get early access, birthday rewards, and free delivery.
          </p>
          <Link
            to="/rewards"
            className="inline-block bg-background text-foreground text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Partner Brands */}
      <section className="wyw-section border-b border-border">
        <div className="wyw-container">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Our Partners</p>
            <h2 className="text-4xl md:text-5xl font-display">THE BRANDS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {brands.map(brand => (
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className="text-center group py-8 border border-border rounded-sm hover:border-primary transition-colors"
              >
                <h3 className="font-display text-2xl tracking-wider group-hover:text-primary transition-colors">
                  {brand.name.toUpperCase()}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{brand.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="bg-secondary text-secondary-foreground wyw-section">
        <div className="wyw-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">Expert Styling</p>
            <h2 className="text-4xl md:text-5xl font-display mb-4">YOUR FIRST CONSULTATION IS FREE</h2>
            <p className="text-muted-foreground mb-6 font-body">
              Our expert human stylists will help you build the perfect wardrobe. In-store or virtual — your choice.
              Includes a 6-month styling warranty.
            </p>
            <Link
              to="/consultation"
              className="inline-block bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-sm hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
          </div>
          <div className="aspect-square bg-muted rounded-sm flex items-center justify-center border border-border">
            <div className="text-center p-8">
              <Zap className="h-16 w-16 mx-auto text-primary mb-4" />
              <p className="font-display text-3xl">PERSONAL</p>
              <p className="font-display text-3xl">STYLING</p>
              <p className="text-sm text-muted-foreground mt-2">By humans, for humans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscribe */}
      <section className="wyw-section">
        <div className="wyw-container max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-display mb-4">STAY CONNECTED</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Get early access to new drops, exclusive offers, and styling tips delivered to your inbox.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="default" className="px-6">Subscribe</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
