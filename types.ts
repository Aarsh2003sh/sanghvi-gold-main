
export enum Category {
  GOLD = 'Gold',
  SILVER = 'Silver',
  GEMSTONE = 'Gemstone'
}

export enum SubCategory {
  RINGS = 'Rings',
  NECKLACES = 'Necklaces',
  EARRINGS = 'Earrings',
  BRACELETS = 'Bracelets'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  subCategory: SubCategory;
  images: string[];
  stock: number;
  featured?: boolean;
  reelsUrl?: string; // Instagram Reels URL
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerDetails: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
