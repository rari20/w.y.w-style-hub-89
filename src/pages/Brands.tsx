import Layout from '@/components/Layout';
import { brands, products } from '@/data/products';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

const brandImages: Record<string, string> = {
  lumenwear: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&fit=crop&crop=center',
  'voltex-studio': 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&q=80&fit=crop&crop=center',
  arcthread: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop&crop=center',
  kilokouture: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80&fit=crop&crop=center',
};

export function BrandsPage() {
  return (
    <Layout>
      <div className="wyw-container py-12 pt-24 pb-24">
        <p className="font-body text-[0.625rem] tracking-[0.25em] uppercase text-primary mb-3">Curated Partners</p>
        <h1 className="font-display italic mb-4 leading-[1.05] text-foreground" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>Our Brands</h1>
        <p className="text-muted-foreground max-w-lg mb-12 font-body font-light leading-relaxed">
          W.Y.W curates the most exciting names in contemporary fashion. Each brand brings a unique perspective to the W.Y.W universe.
        </p>

        {/* Brand Cards Grid */}
        <div className="grid md:grid-cols-2 gap-[2px] mb-16">
          {brands.map((brand) => (
            <Link key={brand.id} to={`/brands/${brand.id}`}
              className="relative aspect-[4/3] overflow-hidden group">
              <img src={brandImages[brand.id] || brandImages.lumenwear} alt={brand.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="font-display text-white leading-[1.1] mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>{brand.name}</h2>
                <p className="text-[0.78rem] text-white/75 mb-4 font-body font-light max-w-[360px]">{brand.description}</p>
                <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors font-body">
                  Shop {brand.name} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Partner Programme */}
        <div className="bg-muted p-8 md:p-12">
          <h2 className="font-display text-foreground mb-4 italic" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>Partner Programme</h2>
          <p className="text-muted-foreground max-w-xl mb-4 leading-relaxed font-body font-light">
            W.Y.W is always looking to partner with designers who share our commitment to quality and contemporary relevance.
          </p>
          <p className="text-[0.8rem] text-muted-foreground mb-6 italic font-body">
            Future brand partnerships are currently in development. Interested designers can contact us at brands@wyw.com
          </p>
          <a href="mailto:brands@wyw.com" className="inline-flex items-center gap-2 text-[0.85rem] font-body text-primary hover:underline">
            <Mail className="h-4 w-4" strokeWidth={1.5} /> brands@wyw.com
          </a>
        </div>
      </div>
    </Layout>
  );
}

export function BrandDetail() {
  const { id } = useParams<{ id: string }>();
  const brand = brands.find(b => b.id === id);
  const brandProducts = products.filter(p => p.brand === brand?.name);

  if (!brand) {
    return (
      <Layout>
        <div className="wyw-container py-20 text-center">
          <h1 className="text-4xl font-display italic text-foreground">Brand Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wyw-container py-12 pt-24">
        <Link to="/brands" className="inline-flex items-center gap-2 text-[0.85rem] text-muted-foreground hover:text-foreground mb-6 font-body">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> All Brands
        </Link>
        <h1 className="text-4xl md:text-5xl font-display mb-2 italic text-foreground">{brand.name}</h1>
        <p className="text-primary text-[0.85rem] mb-4 font-body">{brand.tagline}</p>
        <p className="text-muted-foreground max-w-xl mb-12 leading-relaxed font-body font-light">{brand.fullDescription}</p>

        <h2 className="text-2xl font-display mb-6 italic text-foreground">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {brandProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {brandProducts.length === 0 && (
          <p className="text-muted-foreground font-body font-light">No products available from this brand yet.</p>
        )}
      </div>
    </Layout>
  );
}
