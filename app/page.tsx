import ProductList from '@/components/products/ProductList';
import { productAPI } from '@/lib/api';

export default async function HomePage() {
  // Fetch products server-side
  let products = [];
  
  try {
    const response = await productAPI.getNewProducts();
    console.log(response, 'response')
    products = response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white-800 mb-8">
        New Arrivals
      </h1>
      
      <ProductList initialProducts={products} />
    </div>
  );
}