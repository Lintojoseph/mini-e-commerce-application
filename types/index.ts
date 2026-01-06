export interface ProductImage {
  product_image: string;
}


export interface VariationSize {
  size_id: number;
  size_name: string;
  status: boolean;
  price: number | null;
  variation_product_id: number;
}

export interface VariationColor {
  color_id: number;
  color_name: string;
  color_images: string[];
  sizes: VariationSize[];
  status: boolean;
}
export interface Product {
  id: string;
  name: string;
  slug: string;

  product_images: ProductImage[];

  variations_exist: boolean;
  variation_colors: VariationColor[]; // ✅ FIXED

  sale_price: number;
  mrp: number;
  discount: number;

  new: boolean;
  out_of_stock: boolean;

  brand_logo?: string;
}


export interface ProductVariation {
  id: number;
  product_id: number;
  color: string;
  size: string;
  price: number;
  stock: number;
}

export interface Order {
  id: string;
  total_amount: number;
  payment_status: 'Paid' | 'Pending' | 'Failed';
  created_at: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  variation?: string;
}

export interface User {
  id: string;
  name: string;
  phone_number: string;
}

export interface AuthResponse {
  token: {
    access: string;
  };
  user_id: string;
  name: string;
  phone_number: string;
  message: string;
}