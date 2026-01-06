'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store';
import LogoutButton from './LogoutButton';

export default function AuthActions() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return (
      <>
        <Link href="/profile">
          <Image
            src="/navbar/user-circle.png"
            alt="User"
            width={28}
            height={28}
          />
        </Link>
        <LogoutButton />
      </>
    );
  }

  return (
    <Link
      href="/login"
      className="text-sm text-gray-300 hover:text-white transition"
    >
      Login
    </Link>
  );
}
