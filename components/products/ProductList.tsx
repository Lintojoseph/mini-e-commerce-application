'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { productAPI } from '@/lib/api';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProductListProps {
  initialProducts?: Product[];
}

export default function ProductList({ initialProducts = [] }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(!initialProducts.length);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only fetch if we don't have initial products
    if (initialProducts.length === 0) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await productAPI.getNewProducts();
      console.log(response,'response of products')
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // If we have initial products from SSR, use them
  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-lg">No products available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Product Count */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{products.length}</span> products
        </p>
      </div>
    </div>
  );
}