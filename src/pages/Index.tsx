import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Calendar, MapPin, Package, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, collections } from '@/data/products';
import heroImage from '@/assets/hero-main.jpg';

const newIn = products.filter(p => p.isNew);
const trending = products.filter(p => p.isTrending);

const quickLinks = [
  { icon: Calendar, label: 'Book a Consultation', to: '/consultation' },
  { icon: MapPin, label: 'Find a Store', to: '/stores' },
  { icon: Package, label: 'Track My Order', to: '/account' },
  { icon: Users, label: 'Refer a Friend', to: '/rewards' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-secondary">
        <img src={heroImage} alt="W.Y.W Campaign" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/50 to-transparent" />
        <div className="relative h-full wyw-container flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4" /> Power Your Style
            </p>
            <h1 className="text-6xl md:text-8xl font-display leading-[0.9] text-secondary-foreground mb-6">
              WATT YOU WANT?
            </h1>
            <p className="text-secondary-foreground/70 text-lg mb-8 font-body max-w-md">
              Four collections, one vision. Expert styling, and a rewards programme that gives back.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                <Link to="/consultation">Book a Stylist</Link>
              </Button>
            </div>
          </motion.div>
        </div>
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
              <link.icon className="h-5 w-5 text-accent" />
              <span className="hidden sm:inline">{link.label}</span>
              <span className="sm:hidden text-xs">{link.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* The Collections */}
      <section className="wyw-section border-b border-border">
        <div className="wyw-container">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Four Directions</p>
            <h2 className="text-4xl md:text-5xl font-display">THE COLLECTIONS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {collections.map(col => (
              <Link
                key={col.id}
                to={`/collections/${col.id}`}
                className="text-center group py-8 border border-border rounded-sm hover:border-accent transition-colors"
              >
                <h3 className="font-display text-2xl tracking-wider group-hover:text-accent transition-colors">
                  {col.name.toUpperCase()}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{col.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New In */}
      <section className="wyw-section">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Just Dropped</p>
              <h2 className="text-4xl md:text-5xl font-display">NEW IN</h2>
            </div>
            <Link to="/shop?filter=new" className="text-sm font-medium flex items-center gap-1 hover:text-accent transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newIn.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Banner */}
      <section className="bg-accent text-accent-foreground py-16">
        <div className="wyw-container text-center">
          <Zap className="h-10 w-10 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-display mb-4">JOIN W.Y.W REWARDS</h2>
          <p className="text-lg mb-6 max-w-lg mx-auto font-body">
            Earn points every purchase. Unlock tiers. Get early access, birthday rewards, and free delivery.
          </p>
          <Button variant="dark" size="lg" asChild>
            <Link to="/rewards">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Trending */}
      <section className="wyw-section">
        <div className="wyw-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Most Popular</p>
              <h2 className="text-4xl md:text-5xl font-display">TRENDING</h2>
            </div>
            <Link to="/shop?filter=trending" className="text-sm font-medium flex items-center gap-1 hover:text-accent transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="bg-secondary text-secondary-foreground wyw-section">
        <div className="wyw-container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">Expert Styling</p>
            <h2 className="text-4xl md:text-5xl font-display mb-4">YOUR FIRST CONSULTATION IS FREE</h2>
            <p className="text-secondary-foreground/70 mb-6 font-body">
              Our expert human stylists will help you build the perfect wardrobe. In-store or virtual — your choice. 
              Includes a 6-month styling warranty.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/consultation">Book Now</Link>
            </Button>
          </div>
          <div className="aspect-square bg-secondary-foreground/5 rounded-sm flex items-center justify-center border border-secondary-foreground/10">
            <div className="text-center p-8">
              <Zap className="h-16 w-16 mx-auto text-accent mb-4" />
              <p className="font-display text-3xl">PERSONAL</p>
              <p className="font-display text-3xl">STYLING</p>
              <p className="text-sm text-secondary-foreground/60 mt-2">By humans, for humans</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
