import { notFound } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { productAPI } from '@/lib/api';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  try {
    const response = await productAPI.getNewProducts();
    console.log(response,'response of products')
    const products = response.data;
    console.log(products,'products')
    const product = products.find((p: any) => p.id.toString() === id);

    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>

              {/* Color Variants */}
              {product.color_variants && product.color_variants.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Colors</h3>
                  <div className="flex space-x-3">
                    {product.color_variants.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="h-10 w-10 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Buy Now Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}