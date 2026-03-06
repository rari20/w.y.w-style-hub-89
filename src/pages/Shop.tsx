import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const categories = ['all', 'tops', 'bottoms', 'outerwear', 'accessories', 'footwear'] as const;
const brandNames = ['All Brands', 'Lumenwear', 'Voltex Studio', 'ArcThread', 'KiloKouture'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under £50', min: 0, max: 50 },
  { label: '£50 – £150', min: 50, max: 150 },
  { label: '£150 – £300', min: 150, max: 300 },
  { label: '£300+', min: 300, max: Infinity },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [category, setCategory] = useState<string>('all');
  const [brand, setBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState(0);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (filterParam === 'new') result = result.filter(p => p.isNew);
    if (filterParam === 'trending') result = result.filter(p => p.isTrending);
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (brand !== 'All Brands') result = result.filter(p => p.brand === brand);
    const range = priceRanges[priceRange];
    result = result.filter(p => p.price >= range.min && p.price < range.max);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return result;
  }, [category, brand, priceRange, search, filterParam]);

  return (
    <Layout>
      <div className="wyw-container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-display mb-2">
            {filterParam === 'new' ? 'NEW IN' : filterParam === 'trending' ? 'TRENDING' : 'SHOP ALL'}
          </h1>
          <p className="text-muted-foreground">{filtered.length} products</p>
        </div>

        {/* Search & Filter Toggle */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-muted border-0 px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <X className="h-4 w-4 mr-2" /> : null}
            Filters
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-muted rounded-sm">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wide rounded-sm transition-colors ${
                      category === c ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-border'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Brand</label>
              <div className="flex flex-wrap gap-2">
                {brandNames.map(b => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wide rounded-sm transition-colors ${
                      brand === b ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-border'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Price</label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setPriceRange(i)}
                    className={`px-3 py-1.5 text-xs tracking-wide rounded-sm transition-colors ${
                      priceRange === i ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-border'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
