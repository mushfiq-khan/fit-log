import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0e12] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-xl font-bold uppercase mb-4">Page Not Found</h2>
      <p className="text-xs text-zinc-400 mb-6">The workout page you are looking for does not exist.</p>
      <Link href="/" className="bg-[#ccff00] text-black font-black text-xs px-6 py-3 rounded-full uppercase">
        Back to Home
      </Link>
    </div>
  );
}