import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/footer/logo.png"
            alt="Logo"
            width={42}
            height={42}
            priority
          />
        </Link>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-6">
          <Link href="#" aria-label="Facebook">
            <Image
              src="/footer/gg_facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              className="opacity-80 hover:opacity-100 transition"
            />
          </Link>

          <Link href="#" aria-label="Instagram">
            <Image
              src="/footer/formkit_instagram.png"
              alt="Instagram"
              width={20}
              height={20}
              className="opacity-80 hover:opacity-100 transition"
            />
          </Link>

          <Link href="#" aria-label="X">
            <Image
              src="/footer/prime_twitter.png"
              alt="X"
              width={18}
              height={18}
              className="opacity-80 hover:opacity-100 transition"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
