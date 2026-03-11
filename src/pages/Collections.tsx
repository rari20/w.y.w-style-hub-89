import Layout from '@/components/Layout';
import { collections, products } from '@/data/products';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

const collectionImages: Record<string, string> = {
  lumenwear: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&fit=crop&crop=center',
  'voltex-studio': 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&q=80&fit=crop&crop=center',
  arcthread: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop&crop=center',
  kilokouture: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80&fit=crop&crop=center',
};

export function CollectionsPage() {
  return (
    <Layout>
      <div className="wyw-container pt-24 pb-24">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Collections' }]} />
        <Reveal>
          <p className="font-body text-[0.625rem] tracking-[0.25em] uppercase text-primary mb-3">Design Directions</p>
        <h1 className="font-display italic mb-4 leading-[1.05] text-foreground" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>Our Collections</h1>
        <p className="text-muted-foreground max-w-lg mb-12 font-body font-light leading-relaxed">
          W.Y.W is one brand expressed through four distinct design collections — each with its own aesthetic, crafted under the same commitment to quality.
        </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-[2px] mb-16">
          {collections.map((col) => (
            <Link key={col.id} to={`/collections/${col.id}`}
              className="relative aspect-[4/3] overflow-hidden group">
              <img src={collectionImages[col.id] || collectionImages.lumenwear} alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="font-display text-white leading-[1.1] mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>{col.name}</h2>
                <p className="text-[0.78rem] text-white/75 mb-4 font-body font-light max-w-[360px]">{col.description}</p>
                <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors font-body">
                  Shop {col.name} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-muted p-8 md:p-12">
          <h2 className="font-display text-foreground mb-4 italic" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>Design Philosophy</h2>
          <p className="text-muted-foreground max-w-xl mb-4 leading-relaxed font-body font-light">
            Each W.Y.W collection explores a different facet of contemporary fashion — from the fluid femininity of Lumenwear to the bold textures of KiloKouture. Together they form a complete wardrobe for every occasion.
          </p>
          <p className="text-[0.8rem] text-muted-foreground mb-6 italic font-body">
            New collections and design directions are always in development. For press enquiries, contact us at press@wyw.com
          </p>
          <a href="mailto:press@wyw.com" className="inline-flex items-center gap-2 text-[0.85rem] font-body text-primary hover:underline">
            <Mail className="h-4 w-4" strokeWidth={1.5} /> press@wyw.com
          </a>
        </div>
      </div>
    </Layout>
  );
}

export function CollectionDetail() {
  const { id } = useParams<{ id: string }>();
  const col = collections.find(b => b.id === id);
  const collectionProducts = products.filter(p => p.collection === col?.name);

  if (!col) {
    return (
      <Layout>
        <div className="wyw-container py-20 text-center">
          <h1 className="text-4xl font-display italic text-foreground">Collection Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wyw-container py-12 pt-24">
        <Link to="/collections" className="inline-flex items-center gap-2 text-[0.85rem] text-muted-foreground hover:text-foreground mb-6 font-body">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> All Collections
        </Link>
        <h1 className="text-4xl md:text-5xl font-display mb-2 italic text-foreground">{col.name}</h1>
        <p className="text-primary text-[0.85rem] mb-4 font-body">{col.tagline}</p>
        <p className="text-muted-foreground max-w-xl mb-12 leading-relaxed font-body font-light">{col.fullDescription}</p>

        <h2 className="text-2xl font-display mb-6 italic text-foreground">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {collectionProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {collectionProducts.length === 0 && (
          <p className="text-muted-foreground font-body font-light">No products available from this collection yet.</p>
        )}
      </div>
    </Layout>
  );
}
