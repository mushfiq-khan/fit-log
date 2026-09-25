"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePlan, WorkoutItem } from "@/context/PlanContext";

function MyPlanContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    const { todaysPlan, savedPlan, removeFromTodaysPlan, removeFromSavedPlan } = usePlan();
    const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
    const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
    const [completedIds, setCompletedIds] = useState<string[]>([]);

    useEffect(() => {
        if (tabParam === "saved") {
            setActiveTab("saved");
        } else if (tabParam === "today") {
            setActiveTab("today");
        }
    }, [tabParam]);

    
    const currentList = activeTab === "today" ? todaysPlan : savedPlan;

    
    const totalExercises = currentList.length;
    const totalMinutes = currentList.reduce(
        (acc, item) => acc + (item.duration ?? item.time ?? 0),
        0
    );
    const totalCalories = currentList.reduce(
        (acc, item) => acc + (item.calories ?? item.calori ?? 0),
        0
    );

    const sortedList = [...currentList].sort((a, b) => {
        const durA = a.duration ?? a.time ?? 0;
        const durB = b.duration ?? b.time ?? 0;
        const calA = a.calories ?? a.calori ?? 0;
        const calB = b.calories ?? b.calori ?? 0;
        const ratA = a.rating ?? 4.8;
        const ratB = b.rating ?? 4.8;

        if (sortBy === "duration") return durA - durB;
        if (sortBy === "calories") return calB - calA;
        if (sortBy === "rating") return ratB - ratA;
        return 0;
    });

    const toggleComplete = (id: string) => {
        const stringId = String(id);
        setCompletedIds((prev) =>
            prev.includes(stringId) ? prev.filter((item) => item !== stringId) : [...prev, stringId]
        );
    };

    const getEquipment = (item: WorkoutItem): string => {
        const n = item.name.toLowerCase();
        if (n.includes("bench press")) return "Barbell, Bench";
        if (n.includes("pull-up")) return "Pull-up Bar";
        if (n.includes("squat")) return "Barbell, Rack";
        if (n.includes("twist")) return "Medicine Ball";
        return item.equipment || "Standard Equipment";
    };

    return (
        <main className="min-h-screen bg-[#0d0e12] text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
                        MY PLAN
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* Top Stats Banner */}
                <div className="bg-[#13151d] border border-zinc-800/80 rounded-2xl p-6 mb-8 grid grid-cols-3 gap-4 text-left">
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                            Exercises
                        </p>
                        <p className="text-3xl sm:text-4xl font-black text-[#ccff00]">
                            {totalExercises}
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                            Minutes
                        </p>
                        <p className="text-3xl sm:text-4xl font-black text-white">
                            {totalMinutes}
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                            Calories
                        </p>
                        <p className="text-3xl sm:text-4xl font-black text-white">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* Navigation Tabs & Sort Dropdown */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex bg-[#13151d] border border-zinc-800/80 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab("today")}
                            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "today"
                                    ? "bg-zinc-800 text-white shadow-sm"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            Today's Plan
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "saved"
                                    ? "bg-zinc-800 text-white shadow-sm"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            Saved
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span>Sort By</span>
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as "duration" | "calories" | "rating")
                            }
                            className="bg-[#13151d] border border-zinc-800 text-white px-3 py-1.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#ccff00]"
                        >
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                {/* Content Area */}
                {sortedList.length === 0 ? (
                    <div className="border border-dashed border-zinc-800/80 rounded-2xl p-16 text-center bg-[#13151d]/40 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-black uppercase tracking-wider text-white mb-1">
                            NOTHING HERE YET
                        </h3>
                        <p className="text-xs text-zinc-500 mb-6">
                            Browse the library and add a lift to get today moving.
                        </p>
                        <Link
                            href="/"
                            className="bg-[#ccff00] text-black font-black text-xs uppercase px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
                        >
                            Go to workouts
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedList.map((item) => {
                            const itemId = String(item.id);
                            const isDone = completedIds.includes(itemId);
                            const duration = item.duration ?? item.time ?? 15;
                            const calories = item.calories ?? item.calori ?? 120;

                            return (
                                <div
                                    key={`${activeTab}-${itemId}`}
                                    className="bg-[#13151d] border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-24 h-16 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-wider">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-zinc-500 mb-1">
                                                {getEquipment(item)}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-zinc-400">
                                                <span>🕒 {duration} min</span>
                                                <span>🔥 {calories} kcal</span>
                                                <span>⭐ {item.rating || 4.8}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                        <Link
                                            href={`/workout/${itemId}`}
                                            className="bg-zinc-800/80 hover:bg-zinc-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                                        >
                                            View Details
                                        </Link>

                                        {activeTab === "today" && (
                                            <button
                                                onClick={() => toggleComplete(itemId)}
                                                className={`text-xs font-black px-4 py-2 rounded-xl transition-all flex items-center gap-1 ${isDone
                                                        ? "bg-zinc-700 text-zinc-300"
                                                        : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                                    }`}
                                            >
                                                ✓ {isDone ? "Done" : "Mark as Done"}
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                if (activeTab === "today") {
                                                    removeFromTodaysPlan(itemId);
                                                } else {
                                                    removeFromSavedPlan(itemId);
                                                }
                                            }}
                                            className="text-zinc-500 hover:text-white p-2 text-sm transition-colors"
                                            title="Remove"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function MyPlanPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0d0e12]" />}>
            <MyPlanContent />
        </Suspense>
    );
}