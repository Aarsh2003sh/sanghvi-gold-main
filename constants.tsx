
import { Category, SubCategory, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aurelia Gold Ring',
    description: 'A handcrafted 18K solid gold ring featuring a timeless minimalist design. Perfect for everyday elegance.',
    price: 450,
    category: Category.GOLD,
    subCategory: SubCategory.RINGS,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31d85?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 12,
    featured: true,
    reelsUrl: 'https://www.instagram.com/reels/example1'
  },
  {
    id: 'p2',
    name: 'Sapphire Midnight Necklace',
    description: 'Breathtaking silver necklace adorned with a 2-carat deep blue sapphire surrounded by delicate gemstones.',
    price: 890,
    category: Category.GEMSTONE,
    subCategory: SubCategory.NECKLACES,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 5,
    featured: true
  },
  {
    id: 'p3',
    name: 'Lunar Silver Bracelet',
    description: 'Sterling silver chain bracelet with polished finish and secure toggle clasp. Italian craftsmanship.',
    price: 180,
    category: Category.SILVER,
    subCategory: SubCategory.BRACELETS,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 25,
    featured: false
  },
  {
    id: 'p4',
    name: 'Eternal Rose Studs',
    description: 'Exquisite 14K rose gold earrings shaped as blooming roses, featuring micro-diamond accents.',
    price: 320,
    category: Category.GOLD,
    subCategory: SubCategory.EARRINGS,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 18,
    featured: true
  },
  {
    id: 'p5',
    name: 'Emerald Halo Earrings',
    description: 'Vibrant Colombian emeralds set in a vintage-style silver halo. Elegance personified.',
    price: 550,
    category: Category.GEMSTONE,
    subCategory: SubCategory.EARRINGS,
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 8,
    featured: false
  },
  {
    id: 'p6',
    name: 'Minimalist Gold Band',
    description: 'Simple and sophisticated 22K gold band. A classic choice for an anniversary or wedding.',
    price: 299,
    category: Category.GOLD,
    subCategory: SubCategory.RINGS,
    images: [
      'https://images.unsplash.com/photo-1598560912005-59a0d5c1a612?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 30,
    featured: false
  }
];
