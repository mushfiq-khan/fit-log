"use client";

import Image from "next/image";
import Link from "next/link";

export interface Workout {
    id: string;
    name: string;
    equipment?: string;
    category?: string[] | string;
    duration?: number;
    time?: number;
    calories?: number;
    calori?: number;
    rating?: number;
    image: string;
}

export default function WorkoutCard({ workout }: { workout: Workout }) {
    const getCategories = (name: string): string[] => {
        const n = name.toLowerCase();
        if (n.includes("bench press")) return ["CHEST", "ARMS"];
        if (n.includes("pull-up")) return ["BACK", "ARMS"];
        if (n.includes("back squat") || n.includes("squat")) return ["LEGS", "CORE"];
        if (n.includes("overhead press")) return ["SHOULDERS", "ARMS"];
        if (n.includes("bicep curl")) return ["ARMS"];
        if (n.includes("plank")) return ["CORE"];
        if (n.includes("deadlift")) return ["BACK", "LEGS"];
        if (n.includes("push-up")) return ["CHEST", "ARMS", "CORE"];
        if (n.includes("lunge")) return ["LEGS"];
        if (n.includes("twist")) return ["CORE"];

        if (Array.isArray(workout.category)) return workout.category;
        if (typeof workout.category === "string") return [workout.category];
        return ["WORKOUT"];
    };

    const getEquipment = (name: string): string => {
        const n = name.toLowerCase();
        if (n.includes("bench press")) return "Barbell, Bench";
        if (n.includes("pull-up")) return "Pull-up Bar";
        if (n.includes("squat")) return "Barbell, Rack";
        if (n.includes("overhead")) return "Barbell";
        if (n.includes("bicep curl")) return "Dumbbells";
        if (n.includes("plank")) return "Bodyweight";
        if (n.includes("deadlift")) return "Barbell";
        if (n.includes("push-up")) return "Bodyweight";
        if (n.includes("lunge")) return "Dumbbells (optional)";
        if (n.includes("twist")) return "Medicine Ball";
        return workout.equipment || "Standard Equipment";
    };

    const categoriesList = getCategories(workout.name);
    const caloriesValue = workout.calories ?? workout.calori ?? 180;
    const durationValue = workout.duration ?? workout.time ?? 20;

    return (
        <Link href={`/workout/${workout.id}`} className="block group h-full">
            <div className="bg-[#12141c] border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between group-hover:border-zinc-700 transition-all duration-200 h-full">
                <div>
                    {/* Card Header Image */}
                    <div className="relative w-full h-48 bg-zinc-900/60 rounded-xl overflow-hidden mb-4">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Category Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5 min-h-[22px]">
                        {categoriesList.map((cat, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] uppercase font-black bg-[#ccff00] text-black px-2.5 py-0.5 rounded-full tracking-wider inline-block"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1 line-clamp-1 group-hover:text-[#ccff00] transition-colors">
                        {workout.name}
                    </h3>

                    {/* Equipment Subtitle */}
                    <p className="text-xs text-zinc-500 font-medium mb-4 line-clamp-1">
                        {getEquipment(workout.name)}
                    </p>

                    {/* Meta details */}
                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                        <span className="flex items-center gap-1">
                            <span className="text-zinc-500">🕒</span> {durationValue} min
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-zinc-500">🔥</span> {caloriesValue} kcal
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-zinc-500">⭐</span> {workout.rating || 4.8}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}