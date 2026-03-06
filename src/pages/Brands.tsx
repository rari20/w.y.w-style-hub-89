import Layout from '@/components/Layout';
import { brands, products } from '@/data/products';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export function BrandsPage() {
  return (
    <Layout>
      <div className="wyw-container py-8">
        <h1 className="text-5xl md:text-6xl font-display mb-4">OUR BRANDS</h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          W.Y.W curates the most exciting names in contemporary fashion. Each brand brings a unique perspective to the W.Y.W universe.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {brands.map(brand => (
            <Link
              key={brand.id}
              to={`/brands/${brand.id}`}
              className="wyw-card p-8 group"
            >
              <h2 className="font-display text-4xl tracking-wider group-hover:text-accent transition-colors mb-2">
                {brand.name.toUpperCase()}
              </h2>
              <p className="text-sm text-accent mb-3">{brand.tagline}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{brand.description}</p>
            </Link>
          ))}
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
          <h1 className="text-4xl font-display">BRAND NOT FOUND</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wyw-container py-8">
        <Link to="/brands" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> All Brands
        </Link>
        <h1 className="text-5xl md:text-6xl font-display mb-2">{brand.name.toUpperCase()}</h1>
        <p className="text-accent text-sm mb-4">{brand.tagline}</p>
        <p className="text-muted-foreground max-w-xl mb-12 leading-relaxed">{brand.description}</p>

        <h2 className="text-3xl font-display mb-6">PRODUCTS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {brandProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {brandProducts.length === 0 && (
          <p className="text-muted-foreground">No products available from this brand yet.</p>
        )}
      </div>
    </Layout>
  );
}
