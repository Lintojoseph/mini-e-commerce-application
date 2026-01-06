// 'use client';

// import { Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { CheckCircle } from 'lucide-react';

// function OrderSuccessContent() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('order') || `ORD${Date.now()}`;

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         <div className="mb-6">
//           <div className="flex justify-center mb-4">
//             <CheckCircle className="h-16 w-16 text-green-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             Order Successful!
//           </h1>
//           <p className="text-gray-600">
//             Thank you for your purchase. Your order has been confirmed.
//           </p>
//         </div>

//         <div className="space-y-4 mb-8">
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-600 mb-1">Order ID</p>
//             <p className="font-semibold text-gray-800">{orderId}</p>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-600 mb-1">Payment Status</p>
//             <p className="font-semibold text-green-600">Paid</p>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <Link
//             href="/profile"
//             className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//           >
//             View Order Details
//           </Link>
          
//           <Link
//             href="/"
//             className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function OrderSuccessPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <OrderSuccessContent />
//     </Suspense>
//   );
// }

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || 'ORD202512270001';

  const formatDateTime = (date: Date) => {
  const time = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  const month = date.toLocaleString('en-IN', { month: 'short' });
  const year = date.getFullYear();

  return `${time}, ${day}${suffix} ${month} ${year}`;
};

const orderDateTime = formatDateTime(new Date());

const order = useAuthStore((s) => s.lastOrder);

if (!order) return null;


  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center text-white">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/navbar/logo.png"
            alt="Nike"
            width={48}
            height={48}
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          Successfully Ordered!
        </h1>

        {/* Date */}
        <p className="text-sm text-gray-400 mb-8">
         {orderDateTime}
        </p>

        {/* Order Card */}
        <div className="bg-neutral-800 rounded-xl p-4 flex items-center gap-4 shadow-lg">
          
          {/* Product Image */}
          <div className="h-16 w-16 rounded-lg bg-lime-400 flex items-center justify-center">
            <img src={order.image} className="h-12" />
          </div>

          {/* Product Info */}
          <div className="flex-1 text-left">
            <p>{order.name}</p>
            <p className="text-xs text-gray-400">
  Size {order.size}, Color {order.colorHex}
</p>

          </div>

          {/* Price */}
          <div className="text-right">
            <p>₹{order.sale_price}</p>
            <p className="line-through text-xs">₹{order.mrp}</p>
          </div>
        </div>

        {/* Order ID */}
        <p className="mt-6 text-xs text-gray-500">
          Order ID: {orderId}
        </p>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}
