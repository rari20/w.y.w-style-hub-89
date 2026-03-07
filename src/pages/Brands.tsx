import Layout from '@/components/Layout';
import { brands, products } from '@/data/products';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

const brandImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop',
];

export function BrandsPage() {
  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-4xl md:text-5xl font-display mb-4 italic">Our Brands</h1>
        <p className="text-muted-foreground max-w-lg mb-12 font-body font-light leading-relaxed">
          W.Y.W curates the most exciting names in contemporary fashion. Each brand brings a unique perspective to the W.Y.W universe.
        </p>

        {/* Brand Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {brands.map((brand, i) => (
            <Link key={brand.id} to={`/brands/${brand.id}`}
              className="relative aspect-[4/5] overflow-hidden group">
              <img src={brandImages[i]} alt={brand.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="font-display text-3xl md:text-4xl tracking-wider mb-2">{brand.name}</h2>
                <p className="text-[0.85rem] text-white/70 mb-4 font-body font-light">{brand.description}</p>
                <span className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.15em] font-body bg-white text-black px-5 py-2.5">
                  Shop {brand.name} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Partner Programme */}
        <div className="border border-border p-8 md:p-12">
          <h2 className="font-display text-2xl mb-4 italic text-foreground">Partner Programme</h2>
          <p className="text-muted-foreground max-w-xl mb-4 leading-relaxed font-body font-light">
            W.Y.W is always looking to partner with designers who share our commitment to quality and contemporary relevance.
          </p>
          <p className="text-[0.85rem] text-muted-foreground mb-6 italic font-body">
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
      <div className="wyw-container py-8">
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
