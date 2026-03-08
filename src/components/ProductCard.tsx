import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Heart, Zap } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="wyw-card">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-[600ms] ease-in-out group-hover:scale-[1.03]"
            loading="lazy"
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
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="font-body text-[0.75rem] uppercase tracking-[0.15em]">Sold Out</span>
            </div>
          )}
        </div>
        {/* Only 3 lines: brand, name, price — clean and minimal */}
        <div className="pt-3 pb-1">
          <p className="font-body text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-display text-[0.95rem] font-normal leading-[1.3] text-foreground">{product.name}</h3>
          <p className="font-body text-[0.82rem] font-light mt-1 text-foreground">£{product.price.toFixed(2)}</p>
          {/* Points — visible on hover only */}
          <span className="inline-flex items-center gap-1 font-body text-[0.65rem] text-muted-foreground mt-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Zap className="h-3 w-3 text-accent" strokeWidth={1.5} />
            {product.loyaltyPoints} pts
          </span>
        </div>
      </div>
    </Link>
  );
}
