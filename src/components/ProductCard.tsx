import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Heart, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const brandFallbacks: Record<string, string> = {
  'Lumenwear': 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80&fit=crop',
  'Voltex Studio': 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop',
  'ArcThread': 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80&fit=crop',
  'KiloKouture': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80&fit=crop',
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImgError = () => {
    if (!imgError) setImgError(true);
  };

  const imgSrc = imgError
    ? (brandFallbacks[product.brand] || brandFallbacks['Lumenwear'])
    : product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="wyw-card">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <motion.img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={handleImgError}
              animate={{
                scale: isHovered ? 1.04 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.button
              className="absolute top-4 right-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => { e.preventDefault(); }}
            >
              <Heart className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            </motion.button>
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
    </motion.div>
  );
}
