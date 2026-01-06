// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { authAPI } from '@/lib/api';
// import { useAuthStore } from '@/lib/store';

// export default function LoginPage() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const setToken = useAuthStore((state) => state.setToken);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await authAPI.verifyPhone(phoneNumber);
      
//       if (response.data.user) {
//         const token = response.data.token.access;

//         // 1️⃣ COOKIE (for SSR & middleware)
//         document.cookie = `auth-token=${token}; path=/;`;

//         // 2️⃣ ZUSTAND (for UI)
//         setToken(token);

//         // 3️⃣ LOCAL STORAGE (for axios)
//         localStorage.setItem('auth-token', token);

//         router.push('/');
//         }
//  else {
//         // New user - redirect to registration with OTP
//         router.push(`/verify-otp?phone=${phoneNumber}&otp=${response.data.otp}`);
//       }
//     } catch (error) {
//       setError('Failed to verify phone number');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your phone number"
//               required
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isLoading ? 'Sending OTP...' : 'Send OTP'}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-gray-600 text-center">
//           We'll send an OTP to verify your number
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.verifyPhone(phoneNumber);

      if (response.data.user) {
        const token = response.data.token.access;

        // Cookie for SSR
        document.cookie = `auth-token=${token}; path=/;`;

        // Zustand + localStorage
        setToken(token);
        localStorage.setItem('auth-token', token);

        router.push('/');
      } else {
        router.push(`/verify-otp?phone=${phoneNumber}&otp=${response.data.otp}`);
      }
    } catch {
      setError('Failed to verify phone number');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* LEFT IMAGE */}
      <div className="relative hidden lg:block">
        <Image
          src="/Frame-530.png"   
          alt="Login Visual"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="flex items-center justify-center bg-black px-6">
        <div className="w-full max-w-sm">
          
          <h1 className="text-white text-xl font-medium text-center mb-10">
            Log In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs text-gray-400 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone"
                className="
                  w-full
                  bg-neutral-900
                  text-white
                  text-sm
                  px-4
                  py-3
                  rounded-md
                  outline-none
                  border
                  border-neutral-800
                  focus:border-neutral-600
                "
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                bg-white
                text-black
                text-sm
                font-medium
                py-3
                rounded-md
                hover:bg-gray-200
                transition
                disabled:opacity-50
              "
            >
              {isLoading ? 'Please wait…' : 'Continue'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
