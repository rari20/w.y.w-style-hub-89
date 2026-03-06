import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product7 from '@/assets/product-7.jpg';
import product8 from '@/assets/product-8.jpg';

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'tops' | 'bottoms' | 'outerwear' | 'accessories' | 'footwear';
  sizes: string[];
  colors: string[];
  image: string;
  loyaltyPoints: number;
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  description: string;
  storeAvailability: { store: string; available: boolean }[];
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Oversized Essential Hoodie',
    brand: 'Lumenwear',
    price: 89.00,
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    image: product1,
    loyaltyPoints: 89,
    inStock: true,
    isNew: true,
    description: 'Premium heavyweight cotton hoodie with an oversized silhouette. Features a kangaroo pocket and ribbed cuffs for a refined streetwear look.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: true },
      { store: 'Birmingham', available: false },
    ],
  },
  {
    id: 'p2',
    name: 'Wide-Leg Tailored Trouser',
    brand: 'ArcThread',
    price: 125.00,
    category: 'bottoms',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'Black', 'Charcoal'],
    image: product2,
    loyaltyPoints: 125,
    inStock: true,
    isTrending: true,
    description: 'Relaxed wide-leg trousers in a luxe wool blend. High waist with pressed crease for an effortlessly polished silhouette.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: false },
      { store: 'Birmingham', available: true },
    ],
  },
  {
    id: 'p3',
    name: 'Moto Leather Jacket',
    brand: 'Voltex Studio',
    price: 299.00,
    category: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    image: product3,
    loyaltyPoints: 299,
    inStock: true,
    isNew: true,
    isTrending: true,
    description: 'Classic biker jacket in buttery-soft genuine leather. Asymmetric zip closure with silver-tone hardware. A wardrobe icon.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: true },
      { store: 'Birmingham', available: true },
    ],
  },
  {
    id: 'p4',
    name: 'Bolt Graphic Tee',
    brand: 'KiloKouture',
    price: 45.00,
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Electric Yellow', 'Black', 'White'],
    image: product4,
    loyaltyPoints: 45,
    inStock: true,
    isTrending: true,
    description: 'Statement graphic tee featuring the W.Y.W lightning bolt motif. 100% organic cotton with a relaxed unisex fit.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: true },
      { store: 'Birmingham', available: true },
    ],
  },
  {
    id: 'p5',
    name: 'Minimal Crossbody Bag',
    brand: 'Lumenwear',
    price: 149.00,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Tan'],
    image: product5,
    loyaltyPoints: 149,
    inStock: true,
    isNew: true,
    description: 'Sleek crossbody in premium vegan leather. Adjustable strap, magnetic closure, and internal zip pocket. Minimalism at its finest.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: false },
      { store: 'Birmingham', available: true },
    ],
  },
  {
    id: 'p6',
    name: 'Wool Overcoat',
    brand: 'ArcThread',
    price: 350.00,
    category: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Camel'],
    image: product6,
    loyaltyPoints: 350,
    inStock: true,
    description: 'Timeless single-breasted overcoat in Italian wool blend. Notch lapel, two-button closure. Investment dressing at its best.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: true },
      { store: 'Birmingham', available: false },
    ],
  },
  {
    id: 'p7',
    name: 'Clean Court Sneaker',
    brand: 'Voltex Studio',
    price: 165.00,
    category: 'footwear',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: ['White', 'White/Black'],
    image: product7,
    loyaltyPoints: 165,
    inStock: true,
    isNew: true,
    isTrending: true,
    description: 'Minimalist court sneaker in premium Italian leather. Clean lines, cushioned sole, and a timeless silhouette that pairs with everything.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: true },
      { store: 'Birmingham', available: true },
    ],
  },
  {
    id: 'p8',
    name: 'Slim Fit Black Denim',
    brand: 'KiloKouture',
    price: 95.00,
    category: 'bottoms',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Black', 'Washed Black'],
    image: product8,
    loyaltyPoints: 95,
    inStock: true,
    description: 'Essential slim-fit jeans in deep black stretch denim. Five-pocket styling with a modern taper. The foundation of any outfit.',
    storeAvailability: [
      { store: 'London Flagship', available: true },
      { store: 'Manchester', available: true },
      { store: 'Birmingham', available: true },
    ],
  },
];

export const brands = [
  {
    id: 'lumenwear',
    name: 'Lumenwear',
    tagline: 'Illuminate your wardrobe',
    description: 'Born from the intersection of light and fabric, Lumenwear creates pieces that glow with understated elegance. Specialising in everyday essentials elevated through premium materials and considered design.',
  },
  {
    id: 'voltex-studio',
    name: 'Voltex Studio',
    tagline: 'Charged with creativity',
    description: 'Voltex Studio fuses artisanal craftsmanship with bold, forward-thinking design. From leather goods to footwear, every piece carries an electric energy that sets it apart.',
  },
  {
    id: 'arcthread',
    name: 'ArcThread',
    tagline: 'Weaving the future',
    description: 'ArcThread is where architectural precision meets textile innovation. Known for structural silhouettes and luxurious fabrics, the brand redefines modern tailoring for the next generation.',
  },
  {
    id: 'kilokouture',
    name: 'KiloKouture',
    tagline: 'Heavy on style',
    description: 'KiloKouture brings bold graphics and streetwear energy to the W.Y.W universe. Unapologetically loud, sustainably made, and always limited edition.',
  },
];

export const stores = [
  {
    id: 's1',
    name: 'W.Y.W London Flagship',
    address: '42 Regent Street, London W1B 5RA',
    phone: '+44 20 7123 4567',
    hours: 'Mon-Sat: 10am-9pm, Sun: 11am-6pm',
    services: ['Click & Collect', 'Returns Desk', 'Styling Consultation', 'W.Y.W Lockers'],
    lat: 51.5115,
    lng: -0.1372,
  },
  {
    id: 's2',
    name: 'W.Y.W Manchester',
    address: '15 Exchange Square, Manchester M1 1BD',
    phone: '+44 161 234 5678',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-5pm',
    services: ['Click & Collect', 'Returns Desk', 'Styling Consultation', 'W.Y.W Lockers'],
    lat: 53.4839,
    lng: -2.2446,
  },
  {
    id: 's3',
    name: 'W.Y.W Birmingham',
    address: '8 Bullring, Birmingham B5 4BU',
    phone: '+44 121 345 6789',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-5pm',
    services: ['Click & Collect', 'Returns Desk', 'W.Y.W Lockers'],
    lat: 52.4774,
    lng: -1.8940,
  },
];
