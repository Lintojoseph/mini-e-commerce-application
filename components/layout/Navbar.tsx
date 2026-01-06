import Link from 'next/link';
import Image from 'next/image';
import AuthActions from './AuthActions';

export default async function Navbar() {
  return (
    <nav className="w-full h-16 bg-gradient-to-r from-black via-neutral-900 to-black">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/navbar/logo.png" alt="Logo" width={40} height={40} />
        </Link>

        {/* Right Section (CLIENT) */}
        <div className="flex items-center gap-6">
          <AuthActions />
        </div>
      </div>
    </nav>
  );
}
