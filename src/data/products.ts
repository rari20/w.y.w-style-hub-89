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
  category: 'tops' | 'bottoms' | 'outerwear' | 'accessories' | 'footwear' | 'dresses' | 'knitwear';
  sizes: string[];
  colors: string[];
  image: string;
  loyaltyPoints: number;
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  description: string;
  storeAvailability: { store: string; available: boolean }[];
  occasion?: string[];
};

const defaultStores = [
  { store: 'Edinburgh', available: true },
  { store: 'Glasgow', available: true },
  { store: 'London', available: true },
];

const storeVariant = (a: boolean, b: boolean, c: boolean) => [
  { store: 'Edinburgh', available: a },
  { store: 'Glasgow', available: b },
  { store: 'London', available: c },
];

export const products: Product[] = [
  // ─── LUMENWEAR ───
  {
    id: 'lw1', name: 'Ethereal Silk Blouse', brand: 'Lumenwear', price: 245,
    category: 'tops', sizes: ['XS','S','M','L'], colors: ['Ivory','Blush'],
    image: product1, loyaltyPoints: 245, inStock: true, isNew: true,
    description: 'Delicate silk blouse with a fluid drape and hidden button placket. Luminous sheen catches light beautifully.',
    storeAvailability: defaultStores, occasion: ['workwear','evening'],
  },
  {
    id: 'lw2', name: 'Gossamer Wrap Dress', brand: 'Lumenwear', price: 385,
    category: 'dresses', sizes: ['XS','S','M','L'], colors: ['Champagne','Black'],
    image: product2, loyaltyPoints: 385, inStock: true, isTrending: true,
    description: 'Lightweight wrap dress in gossamer-weight silk georgette. Self-tie waist creates an effortless silhouette.',
    storeAvailability: storeVariant(true,false,true), occasion: ['evening','casual'],
  },
  {
    id: 'lw3', name: 'Sheer Organza Top', brand: 'Lumenwear', price: 195,
    category: 'tops', sizes: ['XS','S','M','L','XL'], colors: ['White','Nude'],
    image: product3, loyaltyPoints: 195, inStock: true,
    description: 'Sheer organza shell top with a structured shoulder and relaxed body. Layer over a silk camisole.',
    storeAvailability: storeVariant(true,true,false), occasion: ['evening'],
  },
  {
    id: 'lw4', name: 'Lumen Slip Dress', brand: 'Lumenwear', price: 320,
    category: 'dresses', sizes: ['XS','S','M','L'], colors: ['Gold','Black','Silver'],
    image: product4, loyaltyPoints: 320, inStock: true, isNew: true,
    description: 'Bias-cut slip dress in liquid satin. Adjustable straps and a cowl neckline for eveningwear elegance.',
    storeAvailability: defaultStores, occasion: ['evening'],
  },
  {
    id: 'lw5', name: 'Backless Evening Gown', brand: 'Lumenwear', price: 680,
    category: 'dresses', sizes: ['XS','S','M','L'], colors: ['Black','Midnight Blue'],
    image: product5, loyaltyPoints: 680, inStock: true, isTrending: true,
    description: 'Floor-length gown with a dramatic open back and concealed zipper. Silk crepe falls in a fluid column.',
    storeAvailability: storeVariant(true,false,true), occasion: ['evening'],
  },
  {
    id: 'lw6', name: 'Structured Wool Blazer', brand: 'Lumenwear', price: 495,
    category: 'outerwear', sizes: ['XS','S','M','L','XL'], colors: ['Camel','Black'],
    image: product6, loyaltyPoints: 495, inStock: true, isNew: true,
    description: 'Impeccably tailored single-breasted blazer in Italian wool. Peak lapel and structured shoulder.',
    storeAvailability: defaultStores, occasion: ['workwear'],
  },
  {
    id: 'lw7', name: 'Satin Wide-Leg Trousers', brand: 'Lumenwear', price: 285,
    category: 'bottoms', sizes: ['XS','S','M','L'], colors: ['Cream','Black'],
    image: product7, loyaltyPoints: 285, inStock: true,
    description: 'High-waisted wide-leg trousers in heavy satin. Pressed crease and side zip for a sleek finish.',
    storeAvailability: storeVariant(true,true,true), occasion: ['workwear','evening'],
  },
  {
    id: 'lw8', name: 'Draped Cowl Neck Top', brand: 'Lumenwear', price: 175,
    category: 'tops', sizes: ['XS','S','M','L','XL'], colors: ['Stone','Black','White'],
    image: product8, loyaltyPoints: 175, inStock: true, isTrending: true,
    description: 'Jersey cowl neck top with a draped front and fitted body. Pairs perfectly with tailored trousers.',
    storeAvailability: defaultStores, occasion: ['workwear','casual'],
  },

  // ─── VOLTEX STUDIO ───
  {
    id: 'vs1', name: 'Powerline Structured Blazer', brand: 'Voltex Studio', price: 495,
    category: 'outerwear', sizes: ['S','M','L','XL'], colors: ['Black','Navy'],
    image: product1, loyaltyPoints: 495, inStock: true, isTrending: true, isNew: true,
    description: 'Technical blazer with internal taping and a sharp shoulder. Minimalist design, maximum impact.',
    storeAvailability: defaultStores, occasion: ['workwear'],
  },
  {
    id: 'vs2', name: 'Circuit Tailored Trousers', brand: 'Voltex Studio', price: 275,
    category: 'bottoms', sizes: ['28','30','32','34','36'], colors: ['Charcoal','Black','Navy'],
    image: product2, loyaltyPoints: 275, inStock: true,
    description: 'Slim tailored trousers with a modern taper. Stretch wool blend for all-day comfort.',
    storeAvailability: storeVariant(true,true,false), occasion: ['workwear'],
  },
  {
    id: 'vs3', name: 'Current Minimal Tee', brand: 'Voltex Studio', price: 85,
    category: 'tops', sizes: ['XS','S','M','L','XL','XXL'], colors: ['White','Black','Grey'],
    image: product3, loyaltyPoints: 85, inStock: true, isNew: true,
    description: 'Heavyweight organic cotton tee with a boxy cut. Ribbed crew neck and rolled hem.',
    storeAvailability: defaultStores, occasion: ['casual'],
  },
  {
    id: 'vs4', name: 'Voltage Track Jacket', brand: 'Voltex Studio', price: 345,
    category: 'outerwear', sizes: ['S','M','L','XL'], colors: ['Black','Olive'],
    image: product4, loyaltyPoints: 345, inStock: true, isTrending: true,
    description: 'Performance-inspired track jacket in technical nylon. Contrast zip and standing collar.',
    storeAvailability: storeVariant(true,false,true), occasion: ['casual'],
  },
  {
    id: 'vs5', name: 'Grid-Stitch Hoodie', brand: 'Voltex Studio', price: 225,
    category: 'knitwear', sizes: ['S','M','L','XL'], colors: ['Grey Marl','Black'],
    image: product5, loyaltyPoints: 225, inStock: true,
    description: 'Heavyweight hoodie with a distinctive grid-stitch texture. Kangaroo pocket and drawstring hood.',
    storeAvailability: defaultStores, occasion: ['casual'],
  },
  {
    id: 'vs6', name: 'Arc Zip Gilet', brand: 'Voltex Studio', price: 310,
    category: 'outerwear', sizes: ['S','M','L','XL'], colors: ['Black','Stone'],
    image: product6, loyaltyPoints: 310, inStock: true, isNew: true,
    description: 'Quilted gilet with concealed zip and high collar. Lightweight insulation for transitional weather.',
    storeAvailability: storeVariant(true,true,true), occasion: ['casual','outerwear'],
  },
  {
    id: 'vs7', name: 'Flux Bomber Jacket', brand: 'Voltex Studio', price: 465,
    category: 'outerwear', sizes: ['S','M','L','XL'], colors: ['Black','Khaki'],
    image: product7, loyaltyPoints: 465, inStock: true, isTrending: true,
    description: 'MA-1 inspired bomber in water-resistant nylon. Ribbed cuffs and hem, internal zip pocket.',
    storeAvailability: defaultStores, occasion: ['casual'],
  },
  {
    id: 'vs8', name: 'Charged Slim Chinos', brand: 'Voltex Studio', price: 195,
    category: 'bottoms', sizes: ['28','30','32','34','36'], colors: ['Sand','Black','Navy'],
    image: product8, loyaltyPoints: 195, inStock: true,
    description: 'Slim-fit chinos in brushed stretch cotton. Flat front with side entry pockets.',
    storeAvailability: storeVariant(true,true,true), occasion: ['workwear','casual'],
  },

  // ─── ARCTHREAD ───
  {
    id: 'at1', name: 'Flowing Midi Dress', brand: 'ArcThread', price: 425,
    category: 'dresses', sizes: ['XS','S','M','L'], colors: ['Terracotta','Black'],
    image: product1, loyaltyPoints: 425, inStock: true, isTrending: true,
    description: 'Midi dress with an asymmetric hem and gathered waist. Organic cotton with a soft hand feel.',
    storeAvailability: defaultStores, occasion: ['casual','evening'],
  },
  {
    id: 'at2', name: 'Curved Wrap Top', brand: 'ArcThread', price: 165,
    category: 'tops', sizes: ['XS','S','M','L','XL'], colors: ['Oat','Forest','Black'],
    image: product2, loyaltyPoints: 165, inStock: true, isNew: true,
    description: 'Wrap top with curved seaming detail. Linen-blend fabric with a natural texture.',
    storeAvailability: storeVariant(true,true,false), occasion: ['casual','workwear'],
  },
  {
    id: 'at3', name: 'Arc Pleat Skirt', brand: 'ArcThread', price: 245,
    category: 'bottoms', sizes: ['XS','S','M','L'], colors: ['Cream','Navy','Sage'],
    image: product3, loyaltyPoints: 245, inStock: true,
    description: 'Knife-pleat midi skirt with an elasticated waist. Moves beautifully when walking.',
    storeAvailability: defaultStores, occasion: ['workwear'],
  },
  {
    id: 'at4', name: 'Thread Linen Shirt', brand: 'ArcThread', price: 135,
    category: 'tops', sizes: ['XS','S','M','L','XL'], colors: ['White','Sky','Natural'],
    image: product4, loyaltyPoints: 135, inStock: true, isNew: true,
    description: 'Relaxed-fit linen shirt with mother-of-pearl buttons. Garment-washed for softness.',
    storeAvailability: defaultStores, occasion: ['casual'],
  },
  {
    id: 'at5', name: 'Contour Crop Jacket', brand: 'ArcThread', price: 385,
    category: 'outerwear', sizes: ['XS','S','M','L'], colors: ['Black','Camel'],
    image: product5, loyaltyPoints: 385, inStock: true,
    description: 'Cropped jacket with contoured seaming and a collarless neckline. Structured yet feminine.',
    storeAvailability: storeVariant(true,false,true), occasion: ['workwear'],
  },
  {
    id: 'at6', name: 'Wave Hem Maxi', brand: 'ArcThread', price: 510,
    category: 'dresses', sizes: ['XS','S','M','L'], colors: ['Midnight','Rust'],
    image: product6, loyaltyPoints: 510, inStock: true, isTrending: true,
    description: 'Maxi dress with a sculptural wave hem. Tiered construction creates movement and volume.',
    storeAvailability: defaultStores, occasion: ['evening'],
  },
  {
    id: 'at7', name: 'Seam-Detail Coat', brand: 'ArcThread', price: 695,
    category: 'outerwear', sizes: ['XS','S','M','L','XL'], colors: ['Black','Grey'],
    image: product7, loyaltyPoints: 695, inStock: true, isNew: true,
    description: 'Architectural coat with exposed seam detailing. Heavy wool blend for warmth and structure.',
    storeAvailability: storeVariant(true,true,true), occasion: ['outerwear'],
  },
  {
    id: 'at8', name: 'Arc Logo Tee', brand: 'ArcThread', price: 95,
    category: 'tops', sizes: ['XS','S','M','L','XL','XXL'], colors: ['White','Black'],
    image: product8, loyaltyPoints: 95, inStock: true,
    description: 'Classic crew neck tee with embroidered Arc logo. Organic cotton, relaxed unisex fit.',
    storeAvailability: defaultStores, occasion: ['casual'],
  },

  // ─── KILOKOUTURE ───
  {
    id: 'kk1', name: 'Weighted Silk Scarf', brand: 'KiloKouture', price: 245,
    category: 'accessories', sizes: ['One Size'], colors: ['Burgundy','Gold','Black'],
    image: product1, loyaltyPoints: 245, inStock: true, isNew: true,
    description: 'Oversized silk twill scarf with hand-rolled edges. Heavy weight for luxurious drape.',
    storeAvailability: defaultStores,
  },
  {
    id: 'kk2', name: 'Heavy Wool Overcoat', brand: 'KiloKouture', price: 895,
    category: 'outerwear', sizes: ['S','M','L','XL'], colors: ['Charcoal','Camel'],
    image: product2, loyaltyPoints: 895, inStock: true, isTrending: true,
    description: 'Double-breasted overcoat in heavyweight Italian wool. Peak lapel and deep pockets.',
    storeAvailability: storeVariant(true,false,true), occasion: ['outerwear'],
  },
  {
    id: 'kk3', name: 'Dense Knit Cardigan', brand: 'KiloKouture', price: 545,
    category: 'knitwear', sizes: ['S','M','L','XL'], colors: ['Oatmeal','Charcoal'],
    image: product3, loyaltyPoints: 545, inStock: true, isNew: true,
    description: 'Chunky rib-knit cardigan in merino wool blend. Oversized fit with horn buttons.',
    storeAvailability: defaultStores, occasion: ['casual'],
  },
  {
    id: 'kk4', name: 'Kilo Leather Belt', brand: 'KiloKouture', price: 185,
    category: 'accessories', sizes: ['S','M','L'], colors: ['Black','Tan'],
    image: product4, loyaltyPoints: 185, inStock: true,
    description: 'Wide leather belt with a substantial brass buckle. Full-grain Italian leather.',
    storeAvailability: storeVariant(true,true,true),
  },
  {
    id: 'kk5', name: 'Substantial Tote Bag', brand: 'KiloKouture', price: 465,
    category: 'accessories', sizes: ['One Size'], colors: ['Black','Cognac'],
    image: product5, loyaltyPoints: 465, inStock: true, isTrending: true,
    description: 'Large structured tote in pebbled leather. Internal zip pocket and magnetic snap closure.',
    storeAvailability: defaultStores,
  },
  {
    id: 'kk6', name: 'Thick Rib Polo', brand: 'KiloKouture', price: 215,
    category: 'knitwear', sizes: ['S','M','L','XL'], colors: ['Navy','Cream','Black'],
    image: product6, loyaltyPoints: 215, inStock: true,
    description: 'Heavy rib-knit polo shirt with a Johnny collar. Substantial weight for a premium feel.',
    storeAvailability: storeVariant(true,true,false), occasion: ['casual','workwear'],
  },
  {
    id: 'kk7', name: 'Mass Denim Jacket', brand: 'KiloKouture', price: 395,
    category: 'outerwear', sizes: ['S','M','L','XL'], colors: ['Indigo','Black'],
    image: product7, loyaltyPoints: 395, inStock: true, isNew: true,
    description: 'Heavyweight 16oz Japanese selvedge denim jacket. Relaxed fit with contrast stitching.',
    storeAvailability: defaultStores, occasion: ['casual'],
  },
  {
    id: 'kk8', name: 'Volume Puffer Coat', brand: 'KiloKouture', price: 785,
    category: 'outerwear', sizes: ['S','M','L','XL'], colors: ['Black','Olive'],
    image: product8, loyaltyPoints: 785, inStock: true, isTrending: true,
    description: 'Oversized puffer coat with responsibly sourced down fill. Dramatic volume, lightweight warmth.',
    storeAvailability: storeVariant(true,true,true), occasion: ['outerwear','casual'],
  },
];

export const brands = [
  {
    id: 'lumenwear',
    name: 'Lumenwear',
    tagline: 'Illuminate your wardrobe',
    description: 'Effortless femininity through elevated fabric and fluid form.',
    fullDescription: 'Born from the intersection of light and fabric, Lumenwear creates pieces that glow with understated elegance. Specialising in everyday essentials elevated through premium materials and considered design.',
  },
  {
    id: 'voltex-studio',
    name: 'Voltex Studio',
    tagline: 'Charged with creativity',
    description: 'Technical precision meets contemporary street culture.',
    fullDescription: 'Voltex Studio fuses artisanal craftsmanship with bold, forward-thinking design. From leather goods to footwear, every piece carries an electric energy that sets it apart.',
  },
  {
    id: 'arcthread',
    name: 'ArcThread',
    tagline: 'Weaving the future',
    description: 'Organic shapes and honest materials for the considered dresser.',
    fullDescription: 'ArcThread is where architectural precision meets textile innovation. Known for structural silhouettes and luxurious fabrics, the brand redefines modern tailoring for the next generation.',
  },
  {
    id: 'kilokouture',
    name: 'KiloKouture',
    tagline: 'Heavy on style',
    description: 'Weight, texture, and substance — fashion with a physical presence.',
    fullDescription: 'KiloKouture brings bold graphics and streetwear energy to the W.Y.W universe. Unapologetically loud, sustainably made, and always limited edition.',
  },
];

export const stores = [
  {
    id: 's1',
    name: 'W.Y.W Edinburgh',
    address: '14 George Street, Edinburgh EH2 2PF',
    phone: '+44 131 234 5678',
    hours: 'Mon–Sat: 10am–7pm, Sun: 11am–6pm',
    services: ['Consultations', 'Click & Collect', 'Returns', 'W.Y.W Lockers', 'Tailoring'],
    lat: 55.9533,
    lng: -3.1883,
  },
  {
    id: 's2',
    name: 'W.Y.W Glasgow',
    address: '55 Buchanan Street, Glasgow G1 3HL',
    phone: '+44 141 345 6789',
    hours: 'Mon–Sat: 10am–7pm, Sun: 11am–6pm',
    services: ['Consultations', 'Click & Collect', 'Returns', 'W.Y.W Lockers', 'Tailoring'],
    lat: 55.8642,
    lng: -4.2518,
  },
  {
    id: 's3',
    name: 'W.Y.W London',
    address: '22 Marylebone High Street, London W1U 4PR',
    phone: '+44 20 7123 4567',
    hours: 'Mon–Sat: 10am–9pm, Sun: 11am–6pm',
    services: ['Consultations', 'Click & Collect', 'Returns', 'W.Y.W Lockers', 'Tailoring'],
    lat: 51.5207,
    lng: -0.1530,
  },
];
