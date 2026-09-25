import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0e12] border-t border-zinc-800/80 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-black tracking-wider uppercase text-white"
        >
          <Image
            src="/assets/logo.png"
            alt="Fitlog Logo"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
          FITLOG
        </Link>

        {/* Right Side: Copyright Text */}
        <p className="text-xs text-zinc-400 font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}