'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.refresh();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-300 hover:text-white transition"
    >
      Log Out
    </button>
  );
}
