"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const context = usePlan();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const todaysPlan = context?.todaysPlan || [];
    const savedPlan = context?.savedPlan || [];

    return (
        <header className="w-full bg-[#0d0e12] border-b border-zinc-800/80 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-wider uppercase">
                <Image 
                    src="/assets/logo.png" 
                    alt="Fitlog Logo" 
                    width={24} 
                    height={24} 
                    className="object-contain"
                />
                FITLOG
                </Link>

                {/* Center Nav Links */}
                <nav className="flex items-center gap-2 bg-[#13151d] border border-zinc-800/80 p-1 rounded-full">
                    <Link
                        href="/"
                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${pathname === "/"
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Workouts
                    </Link>
                    <Link
                        href="/my-plan"
                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${pathname === "/my-plan"
                                ? "bg-[#ccff00] text-black"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        My Plan
                    </Link>
                </nav>

                {/* Right Clickable Counter Badges */}
                <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                    <Link
                        href="/my-plan?tab=today"
                        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                    >
                        <span>Plan</span>
                        <span
                            suppressHydrationWarning
                            className="bg-[#ccff00] text-black px-2 py-0.5 rounded-full text-[11px] font-black min-w-[20px] text-center"
                        >
                            {mounted ? todaysPlan.length : 0}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan?tab=saved"
                        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                    >
                        <span>Saved</span>
                        <span
                            suppressHydrationWarning
                            className="bg-zinc-800 text-white px-2 py-0.5 rounded-full text-[11px] font-black border border-zinc-700 min-w-[20px] text-center"
                        >
                            {mounted ? savedPlan.length : 0}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}