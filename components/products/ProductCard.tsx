// 'use client';

// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { Product } from '@/types';
// import { productAPI } from '@/lib/api';
// import { useAuthStore } from '@/lib/store';

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   // ✅ DEBUG (safe)
//   console.log('product_images:', product.product_images);

//   const cardRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);
//   const token = useAuthStore((state) => state.token);

//   // ✅ SAFELY EXTRACT IMAGE URL
//   const imageUrl =
//   product.product_images?.[0]?.product_image || '/placeholder.png';

// console.log('FINAL imageUrl:', imageUrl);

// console.log(
//   'RAW product_images:',
//   JSON.stringify(product.product_images, null, 2)
// );

//   // ✅ GSAP HOVER ANIMATION
//   useEffect(() => {
//     if (!cardRef.current || !imageRef.current) return;

//     const tl = gsap.timeline({ paused: true });

//     tl.to(imageRef.current, {
//       y: -10,
//       duration: 0.3,
//       ease: 'power2.out',
//     });

//     const onEnter = () => tl.play();
//     const onLeave = () => tl.reverse();

//     cardRef.current.addEventListener('mouseenter', onEnter);
//     cardRef.current.addEventListener('mouseleave', onLeave);

//     return () => {
//       cardRef.current?.removeEventListener('mouseenter', onEnter);
//       cardRef.current?.removeEventListener('mouseleave', onLeave);
//     };
//   }, []);

//   // ✅ BUY NOW HANDLER
//   const handleBuyNow = async () => {
//     try {
//       if (!token) {
//         window.location.href = '/login';
//         return;
//       }

//       await productAPI.purchaseProduct({
//         product_id: product.id,
//       });

//       window.location.href = `/order-success?order=${Date.now()}`;
//     } catch (error) {
//       console.error('Purchase failed:', error);
//     }
//   };

//   return (
//     <div
//       ref={cardRef}
//       className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//     >
//       {/* Image */}
//       <div className="relative h-64 overflow-hidden">
//         <div ref={imageRef} className="h-full w-full">
//             <img
//             src={imageUrl}
//             alt={product.name}
//             className="h-full w-full object-cover"
//             />
//         </div>

//         {/* Brand Logo */}
//         {product.brand_logo && (
//           <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
//             <img
//               src={product.brand_logo}
//               alt="Brand"
//               className="h-8 w-8 object-contain"
//             />
//           </div>
//         )}
//       </div>

//       {/* Info */}
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">
//           {product.name}
//         </h3>

//         {/* Colors */}
//         {product.variation_colors?.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm text-gray-600 mb-2">Colors</p>
//             <div className="flex gap-2">
//               {product.variation_colors.map((color, index) => (
//                 <span
//                   key={index}
//                   className="h-5 w-5 rounded-full border"
//                   style={{ backgroundColor: color }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Price */}
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-xl font-bold text-gray-900">
//             ₹{product.sale_price}
//           </span>

//           <span className="text-sm line-through text-gray-400">
//             ₹{product.mrp}
//           </span>
//         </div>

//         {/* Buy Button */}
//         <button
//           onClick={handleBuyNow}
//           disabled={product.out_of_stock}
//           className="
//             mt-6
//            w-full
//            rounded-xl
//            bg-white
//            py-3
//            text-black
//            font-semibold
//            hover:bg-gray-200
//            transition
//            disabled:opacity-50
//           "
//         >
//           {product.out_of_stock ? 'Out of Stock' : 'Buy Now'}
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Product } from '@/types';
import { productAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const token = useAuthStore((s) => s.token);
  const setLastOrder = useAuthStore((s) => s.setLastOrder);

  const imageUrl =
    product.product_images?.[0]?.product_image || '/placeholder.png';

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

const [selectedColor, setSelectedColor] = useState<
  Product['variation_colors'][number] | null
>(null);


  // Hover animation
  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(imageRef.current, { y: -20, duration: 0.3 });

    cardRef.current.addEventListener('mouseenter', () => tl.play());
    cardRef.current.addEventListener('mouseleave', () => tl.reverse());
  }, []);

  const handleBuyNow = async () => {
    if (!token) return (window.location.href = '/login');

    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    await productAPI.purchaseProduct({ product_id: product.id });

    setLastOrder({
      productId: product.id,
      name: product.name,
      image: selectedColor.color_images?.[0] || imageUrl,
      size: selectedSize,
      colorHex: selectedColor.color_name,

      sale_price: product.sale_price,
      mrp: product.mrp,
    });

    window.location.href = '/order-success';
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-neutral-900 rounded-2xl overflow-hidden p-6 text-white"
    >
      {/* background circle */}
      {/* <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-700" />

    
      <div className="relative h-48 flex justify-center">
        <img ref={imageRef} src={imageUrl} className="w-64 object-contain" />
      </div> */}

      <div className="relative h-96 overflow-hidden">
         <div ref={imageRef} className="h-full w-full">
             <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            />
        </div>

        {/* Brand Logo */}
        {product.brand_logo && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
            <img
              src={product.brand_logo}
              alt="Brand"
              className="h-8 w-8 object-contain"
            />
          </div>
        )}
      </div>


      {/* HOVER CONTENT */}
      <div className="mt-4 space-y-4">
        {/* <h3 className="text-xl font-bold">{product.name}</h3> */}

        {/* SIZE */}
        {/* <div className="flex gap-2 items-center">
          <span className="text-sm">SIZE:</span>
          {[7, 8, 9, 10].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`h-8 w-8 rounded-md ${
                selectedSize === s ? 'bg-white text-black' : 'bg-neutral-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div> */}

        {/* SIZE */}
{selectedColor && (
  <div className="flex gap-2 items-center">
    <span className="text-sm">SIZE:</span>

    {selectedColor.sizes.map((s) => (
      <button
        key={s.size_id}
        disabled={!s.status}
        onClick={() => setSelectedSize(Number(s.size_name))}
        className={`
          h-8 w-8 rounded-md text-sm
          ${
            selectedSize === Number(s.size_name)
              ? 'bg-white text-black'
              : 'bg-neutral-700'
          }
          ${!s.status ? 'opacity-40 cursor-not-allowed' : ''}
        `}
      >
        {s.size_name}
      </button>
    ))}
  </div>
)}


        {/* COLOR */}
        {/* <div className="flex gap-2 items-center">
          <span className="text-sm">COLOR:</span>
          {product.variation_colors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              className={`h-5 w-5 rounded-full border ${
                selectedColor === c ? 'ring-2 ring-white' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div> */}
        {/* COLOR */}
<div className="flex gap-3 items-center">
  <span className="text-sm">COLOR:</span>

  {product.variation_colors.map((color) => {
    const previewImage = color.color_images?.[0];

    return (
      <button
        key={color.color_id}
        onClick={() => {
          setSelectedColor(color);
          setSelectedSize(null); // reset size when color changes
        }}
        className={`
          h-7 w-7
          rounded-full
          border
          overflow-hidden
          transition
          ${
            selectedColor?.color_id === color.color_id
              ? 'ring-2 ring-white'
              : 'border-neutral-500'
          }
        `}
        title={color.color_name}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt={color.color_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[10px]">{color.color_name}</span>
        )}
      </button>
    );
  })}
</div>


        {/* BUY */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
