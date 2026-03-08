import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, Check, MapPin, Zap, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="wyw-container py-20 text-center">
          <h1 className="text-4xl font-display mb-4">PRODUCT NOT FOUND</h1>
          <Button variant="outline" asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Determine displayed image based on selected color
  const displayImage = selectedColor && product.colorImages?.[selectedColor]
    ? product.colorImages[selectedColor]
    : product.image;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor && product.colors.length > 0) {
      toast.error('Please select a colour');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor || product.colors[0]);
    }
    toast.success(`${product.name} added to basket`);
  };

  return (
    <Layout>
      <div className="wyw-container py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="aspect-[3/4] bg-muted rounded-sm overflow-hidden relative">
            <img
              src={displayImage}
              alt={`${product.name}${selectedColor ? ` in ${selectedColor}` : ''}`}
              className="w-full h-full object-cover transition-opacity duration-500"
              key={displayImage}
            />
            {selectedColor && (
              <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[0.7rem] font-body text-foreground uppercase tracking-wider">
                Showing: {selectedColor}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-display mb-6">{product.name.toUpperCase()}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-semibold font-body">£{product.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Zap className="h-3 w-3 text-accent" /> +{product.loyaltyPoints} points
              </span>
            </div>

            <p className="text-muted-foreground font-body mb-4 leading-relaxed">{product.description}</p>

            {/* Material */}
            {product.material && (
              <p className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest">Material:</span> {product.material}
              </p>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Colour</label>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs uppercase tracking-wide border rounded-sm transition-colors ${
                        selectedColor === color
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs border rounded-sm transition-colors ${
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 border border-border rounded-sm hover:bg-muted">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 border border-border rounded-sm hover:bg-muted">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button variant="hero" size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Basket
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Delivery Options */}
            <div className="border-t border-border pt-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Delivery Options</p>
              <div className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-accent" />
                <span>Standard Delivery (3–5 days) — £3.99</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-accent" />
                <span>Next Day — £7.99</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-accent" />
                <span>Click & Collect — Free</span>
              </div>
            </div>

            {/* Store Availability */}
            <div className="border-t border-border pt-6 mt-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Store Availability</p>
              <div className="space-y-2">
                {product.storeAvailability.map(s => (
                  <div key={s.store} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" /> {s.store}
                    </span>
                    <span className={s.available ? 'text-green-600' : 'text-destructive'}>
                      {s.available ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
