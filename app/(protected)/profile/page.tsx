'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

interface Order {
  order_id: string;
  created_date: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_mrp: number;
  product_amount: number;
  quantity: number;
}

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await authAPI.getUserOrders();
      console.log('Orders API response:', response.data);

      // ✅ API SHAPE: { count, orders }
      if (Array.isArray(response.data?.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 px-6 py-12">
      <div className="max-w-5xl mx-auto text-white">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-neutral-800 rounded-xl p-4 flex items-center gap-4 shadow-lg"
              >
                {/* PRODUCT IMAGE */}
                <div className="h-16 w-16 rounded-lg bg-lime-400 flex items-center justify-center shrink-0">
                  <img
                    src={order.product_image || '/placeholder.png'}
                    alt={order.product_name}
                    className="h-12 object-contain"
                  />
                </div>

                {/* PRODUCT INFO */}
                <div className="flex-1">
                  <p className="font-medium">{order.product_name}</p>

                  <p className="text-xs text-gray-400">
                    Quantity: {order.quantity}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {order.created_date}
                  </p>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="font-semibold">₹{order.product_price}</p>
                  <p className="text-xs text-gray-500 line-through">
                    ₹{order.product_mrp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
