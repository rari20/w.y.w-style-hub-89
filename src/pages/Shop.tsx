import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const categories = ['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'knitwear', 'accessories', 'footwear'] as const;
const occasionFilters = ['evening', 'workwear', 'casual'] as const;
const brandNames = ['All Brands', 'Lumenwear', 'Voltex Studio', 'ArcThread', 'KiloKouture'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under £100', min: 0, max: 100 },
  { label: '£100 – £250', min: 100, max: 250 },
  { label: '£250 – £500', min: 250, max: 500 },
  { label: '£500+', min: 500, max: Infinity },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');

  const [category, setCategory] = useState<string>(categoryParam || 'all');
  const [brand, setBrand] = useState(brandParam || 'All Brands');
  const [priceRange, setPriceRange] = useState(0);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    // Named filters — check both category and occasion/categories arrays
    if (filterParam === 'new') result = result.filter(p => p.isNew);
    if (filterParam === 'trending') result = result.filter(p => p.isTrending);
    if (filterParam === 'workwear') result = result.filter(p => p.occasion?.includes('workwear') || p.categories?.includes('workwear'));
    if (filterParam === 'casual') result = result.filter(p => p.occasion?.includes('casual') || p.categories?.includes('casual'));
    if (filterParam === 'evening') result = result.filter(p => p.occasion?.includes('evening') || p.categories?.includes('evening'));
    if (filterParam === 'outerwear') result = result.filter(p => p.category === 'outerwear' || p.categories?.includes('outerwear'));

    // Category filter — check both category string and categories array
    if (category !== 'all') {
      result = result.filter(p => p.category === category || p.categories?.includes(category));
    }
    if (brand !== 'All Brands') result = result.filter(p => p.brand === brand);

    const range = priceRanges[priceRange];
    result = result.filter(p => p.price >= range.min && p.price < range.max);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return result;
  }, [category, brand, priceRange, search, filterParam]);

  const getTitle = () => {
    if (filterParam === 'new') return 'NEW IN';
    if (filterParam === 'trending') return 'TRENDING';
    if (filterParam === 'workwear') return 'OFFICE READY';
    if (filterParam === 'casual') return 'WEEKEND EDIT';
    if (filterParam === 'evening') return 'EVENING OUT';
    if (filterParam === 'outerwear') return 'LAYERING SEASON';
    if (categoryParam) return categoryParam.toUpperCase();
    if (brandParam) return brandParam.toUpperCase();
    return 'SHOP ALL';
  };

  return (
    <Layout>
      <div className="wyw-container py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-display mb-2 text-foreground">{getTitle()}</h1>
          <p className="text-muted-foreground">{filtered.length} products</p>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-muted border-0 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <X className="h-4 w-4 mr-2" /> : null}
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-muted">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wide transition-colors ${
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
                    className={`px-3 py-1.5 text-xs uppercase tracking-wide transition-colors ${
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
                    className={`px-3 py-1.5 text-xs tracking-wide transition-colors ${
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
