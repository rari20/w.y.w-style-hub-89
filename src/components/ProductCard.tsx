import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Heart } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="wyw-card overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart className="h-4 w-4" />
          </button>
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              New
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm font-medium uppercase tracking-wide">Sold Out</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium font-body leading-tight">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold">£{product.price.toFixed(2)}</span>
            <span className="text-[10px] text-muted-foreground">+{product.loyaltyPoints} pts</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
