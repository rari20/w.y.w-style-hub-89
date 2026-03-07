import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Heart, Zap } from 'lucide-react';
import { useState } from 'react';

const brandFallbacks: Record<string, string> = {
  'Lumenwear': 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&fit=crop',
  'Voltex Studio': 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop',
  'ArcThread': 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80&fit=crop',
  'KiloKouture': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80&fit=crop',
};

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    if (!imgError) setImgError(true);
  };

  const imgSrc = imgError
    ? (brandFallbacks[product.brand] || brandFallbacks['Lumenwear'])
    : product.image;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="wyw-card">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-opacity duration-[600ms] ease-in-out"
            loading="lazy"
            onError={handleImgError}
          />
          <button
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart className="h-4 w-4 text-foreground" strokeWidth={1.5} />
          </button>
          {product.isNew && (
            <span className="absolute top-4 left-4 font-body text-[0.625rem] uppercase tracking-[0.18em] text-foreground">
              New
            </span>
          )}
          {product.isTrending && !product.isNew && (
            <span className="absolute top-4 left-4 font-body text-[0.625rem] uppercase tracking-[0.18em] text-foreground">
              Trending
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="font-body text-[0.75rem] uppercase tracking-[0.15em]">Sold Out</span>
            </div>
          )}
        </div>
        <div className="pt-4 pb-2">
          <p className="font-body text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-display text-[0.9375rem] font-normal leading-tight">{product.name}</h3>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="font-body text-[0.8125rem] font-light">£{product.price.toFixed(2)}</span>
            <span className="inline-flex items-center gap-1 font-body text-[0.625rem] text-muted-foreground">
              <Zap className="h-3 w-3 text-accent" strokeWidth={1.5} />
              {product.loyaltyPoints} pts
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
