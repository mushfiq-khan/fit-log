"use client";

import { useEffect, useState, useMemo } from "react";
import Hero from "@/components/Hero";
import WorkoutCard, { Workout } from "@/components/WorkoutCard";

// Categories for filter buttons
const CATEGORIES = ["ALL", "CHEST", "ARMS", "BACK", "LEGS", "SHOULDERS", "CORE"];

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  // Helper to resolve categories for filtering (matching WorkoutCard logic)
  const getWorkoutCategories = (workout: Workout): string[] => {
    const name = workout.name.toLowerCase();
    if (name.includes("bench press")) return ["CHEST", "ARMS"];
    if (name.includes("pull-up")) return ["BACK", "ARMS"];
    if (name.includes("back squat") || name.includes("squat")) return ["LEGS", "CORE"];
    if (name.includes("overhead press")) return ["SHOULDERS", "ARMS"];
    if (name.includes("bicep curl")) return ["ARMS"];
    if (name.includes("plank")) return ["CORE"];
    if (name.includes("deadlift")) return ["BACK", "LEGS"];
    if (name.includes("push-up")) return ["CHEST", "ARMS", "CORE"];
    if (name.includes("lunge")) return ["LEGS"];
    if (name.includes("twist")) return ["CORE"];

    if (Array.isArray(workout.category)) return workout.category.map((c) => c.toUpperCase());
    if (typeof workout.category === "string") return [workout.category.toUpperCase()];
    return [];
  };

  // Filtered Workouts Calculation
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      // 1. Search Query Filter (Matches Name or Equipment)
      const matchesSearch =
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (workout.equipment && workout.equipment.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Category Pill Filter
      const workoutCats = getWorkoutCategories(workout);
      const matchesCategory =
        selectedCategory === "ALL" || workoutCats.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [workouts, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#0a0b0f] text-white pb-16">
      {/* Hero Banner Section */}
      <Hero />

      {/* Workout Library Section */}
      <section id="workouts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
              THE LIBRARY
            </h2>
            <p className="text-sm text-zinc-400 mt-1 font-normal">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search exercise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12141c] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-black px-4 py-2 rounded-full transition-all duration-200 tracking-wider uppercase ${selectedCategory === cat
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10 scale-105"
                  : "bg-[#12141c] text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3 Columns Grid / Skeleton / No Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800/50"
              />
            ))}
          </div>
        ) : filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-[#12141c]/50">
            <p className="text-zinc-400 text-sm font-medium">
              No workouts found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
              }}
              className="mt-3 text-xs text-[#ccff00] font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}