"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const { planItems, savedItems } = usePlan();

    return (
        <header className="w-full bg-[#0a0b0d] border-b border-zinc-800/80 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <Image src="/assets/logo.png" alt="FitLog Logo" width={28} height={28} />
                        <span className="text-white font-extrabold tracking-wide uppercase text-xl">FITLOG</span>
                    </Link>

                    {/* 🟡 ২. মাঝখানে নেভিগেশন লিঙ্ক (Workouts & My Plan) */}
                    <nav className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-full border border-zinc-800">
                        <Link
                            href="/"
                            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${pathname === "/"
                                ? "bg-[#1f2605] text-[#ccff00]"
                                : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            Workouts
                        </Link>

                        <Link
                            href="/my-plan"
                            className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all ${pathname === "/my-plan"
                                ? "bg-[#1f2605] text-[#ccff00] font-bold"
                                : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            My Plan
                        </Link>
                    </nav>

                    {/* 🔵 ৩. ডানদিকে স্ট্যাটাস ব্যাজ (Plan & Saved Counter -> Clickable to /my-plan) */}
                    <div className="flex items-center gap-5 text-xs font-medium">

                        {/* Plan Badge (Filled Pill) */}
                        <Link href="/my-plan" className="flex items-center gap-2 text-zinc-300 hover:text-white">
                            <span>Plan</span>
                            <span className="bg-[#ccff00] text-black font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                                {planItems.length}
                            </span>
                        </Link>

                        {/* Saved Badge (Outline Pill) */}
                        <Link href="/my-plan" className="flex items-center gap-2 text-zinc-300 hover:text-white">
                            <span>Saved</span>
                            <span className="border border-zinc-600 text-zinc-300 font-medium text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                                {savedItems.length}
                            </span>
                        </Link>

                    </div>

                </div>
            </div>
        </header>
    );
}