"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

interface WorkoutDetail {
    id: string;
    name: string;
    description?: string;
    equipment?: string;
    difficulty?: string;
    sets?: number;
    reps?: string;
    duration?: number;
    calories?: number;
    rating?: number;
    category?: string[] | string;
    image: string;
    instructions?: string[];
}

export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // Context Actions
    const { addToTodaysPlan, addToSavedPlan } = usePlan();

    useEffect(() => {
        async function fetchWorkout() {
            try {
                const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
                const data = await res.json();
                const found = data.find((item: WorkoutDetail) => String(item.id) === resolvedParams.id);
                setWorkout(found || null);
            } catch (error) {
                console.error("Error fetching workout details:", error);
            }
      finally {
                setLoading(false);
            }
        }
        fetchWorkout();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="min-h-screen bg-[#0a0b0f] text-white flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
                <Link href="/" className="bg-[#ccff00] text-black px-6 py-2.5 rounded-full font-bold text-sm">
                    Back to Library
                </Link>
            </div>
        );
    }

    const getWorkoutSpecs = (name: string) => {
        const n = name.toLowerCase();

        if (n.includes("bench press")) {
            return {
                description: "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
                categories: ["Chest", "Arms"],
                equipment: "Barbell, Bench",
                difficulty: "Intermediate",
                sets: 4,
                reps: "6-8",
                duration: 25,
                calories: 180,
                rating: 4.8,
                instructions: [
                    "Lie on the bench with eyes under the bar and feet planted.",
                    "Unrack with locked elbows and lower the bar to mid-chest.",
                    "Press up in a slight arc until elbows lock without bouncing.",
                    "Keep shoulder blades pinched and a natural arch in the back."
                ]
            };
        }
        if (n.includes("pull-up")) {
            return {
                description: "An upper-body bodyweight pull focusing on lat width, upper back, and grip strength.",
                categories: ["Back", "Arms"],
                equipment: "Pull-up Bar",
                difficulty: "Intermediate",
                sets: 4,
                reps: "8-10",
                duration: 15,
                calories: 120,
                rating: 4.7,
                instructions: [
                    "Grasp the bar with hands slightly wider than shoulder-width.",
                    "Pull your chest up towards the bar by driving elbows down.",
                    "Pause briefly at the top before lowering under control.",
                    "Avoid excessive swinging or kicking with lower body."
                ]
            };
        }
        if (n.includes("squat")) {
            return {
                description: "The primary lower-body compound movement for quadriceps, glute, and core strength.",
                categories: ["Legs", "Core"],
                equipment: "Barbell, Rack",
                difficulty: "Advanced",
                sets: 4,
                reps: "5",
                duration: 30,
                calories: 240,
                rating: 4.9,
                instructions: [
                    "Set the barbell across upper traps and unrack cleanly.",
                    "Inhale, brace core, and descend until thighs are parallel.",
                    "Drive through heels to extend knees and hips together.",
                    "Keep knees aligned over toes throughout the rep."
                ]
            };
        }
        if (n.includes("overhead press")) {
            return {
                description: "A vertical pressing movement targeting deltoids, upper chest, and core stability.",
                categories: ["Shoulders", "Arms"],
                equipment: "Barbell",
                difficulty: "Intermediate",
                sets: 4,
                reps: "8",
                duration: 20,
                calories: 150,
                rating: 4.6,
                instructions: [
                    "Rest bar on front shoulders with hands shoulder-width apart.",
                    "Press straight up while clearing head path slightly back.",
                    "Lock out overhead with arms fully extended.",
                    "Lower bar slowly back to front rack position."
                ]
            };
        }
        if (n.includes("bicep curl")) {
            return {
                description: "An isolated arm exercise for developing bicep peak and forearm strength.",
                categories: ["Arms"],
                equipment: "Dumbbells",
                difficulty: "Beginner",
                sets: 3,
                reps: "10-12",
                duration: 12,
                calories: 80,
                rating: 4.3,
                instructions: [
                    "Stand tall holding dumbbells at side with supinated grip.",
                    "Curl weight up while keeping elbows locked at your torso.",
                    "Squeeze biceps firmly at top of range.",
                    "Lower weights under full control back down."
                ]
            };
        }
        if (n.includes("plank")) {
            return {
                description: "An isometric core exercise strengthening full abdominal wall and lower back.",
                categories: ["Core"],
                equipment: "Bodyweight",
                difficulty: "Beginner",
                sets: 3,
                reps: "60s",
                duration: 10,
                calories: 60,
                rating: 4.4,
                instructions: [
                    "Position forearms on floor with elbows directly under shoulders.",
                    "Extend legs back and lift hips in straight line.",
                    "Squeeze glutes and brace abdominals hard.",
                    "Hold steady breathe without sagging lower back."
                ]
            };
        }
        if (n.includes("deadlift")) {
            return {
                description: "Full posterior chain builder for hamstrings, glutes, lower back, and grip.",
                categories: ["Back", "Legs"],
                equipment: "Barbell",
                difficulty: "Advanced",
                sets: 3,
                reps: "5",
                duration: 28,
                calories: 260,
                rating: 4.9,
                instructions: [
                    "Stand over barbell mid-foot with feet hip-width.",
                    "Hinge at hips, grip bar, and engage lats tightly.",
                    "Drive hips forward while pulling chest up high.",
                    "Lower bar along legs back to floor smoothly."
                ]
            };
        }
        if (n.includes("push-up")) {
            return {
                description: "Classic bodyweight exercise building chest, shoulders, triceps, and core stability.",
                categories: ["Chest", "Arms", "Core"],
                equipment: "Bodyweight",
                difficulty: "Beginner",
                sets: 3,
                reps: "15-20",
                duration: 10,
                calories: 90,
                rating: 4.5,
                instructions: [
                    "Place hands slightly wider than shoulders on floor.",
                    "Lower chest until near ground with elbows angled back.",
                    "Push floor away firmly until arms reach lockout.",
                    "Maintain a straight rigid body line."
                ]
            };
        }
        if (n.includes("lunge")) {
            return {
                description: "Unilateral leg movement targeting quads, glutes, and balance improvement.",
                categories: ["Legs"],
                equipment: "Dumbbells (optional)",
                difficulty: "Intermediate",
                sets: 3,
                reps: "10/leg",
                duration: 18,
                calories: 170,
                rating: 4.4,
                instructions: [
                    "Step forward with one leg and drop back knee down.",
                    "Ensure front knee tracks directly over front ankle.",
                    "Push through front heel to return to start.",
                    "Alternate legs smoothly for target reps."
                ]
            };
        }
        if (n.includes("twist")) {
            return {
                description: "Rotational core exercise building obliques and rotational torso control.",
                categories: ["Core"],
                equipment: "Medicine Ball",
                difficulty: "Intermediate",
                sets: 3,
                reps: "20",
                duration: 8,
                calories: 70,
                rating: 4.1,
                instructions: [
                    "Sit on floor, lean torso back, and elevate feet slightly.",
                    "Hold medicine ball near stomach with both hands.",
                    "Twist torso side to side tapping weight lightly.",
                    "Keep movement controlled through abs."
                ]
            };
        }

        return {
            description: workout.description || "Comprehensive strength training exercise targeting specific muscle groups.",
            categories: Array.isArray(workout.category) ? workout.category : [workout.category || "Fitness"],
            equipment: workout.equipment || "Standard Equipment",
            difficulty: workout.difficulty || "Intermediate",
            sets: workout.sets || 4,
            reps: workout.reps || "8-12",
            duration: workout.duration || 20,
            calories: workout.calories || 150,
            rating: workout.rating || 4.5,
            instructions: workout.instructions || [
                "Perform exercise with strict form.",
                "Maintain controlled tempo on reps.",
                "Rest appropriately between sets."
            ]
        };
    };

    const specs = getWorkoutSpecs(workout.name);

    // Object to pass to Context
    const selectedWorkout = {
        id: workout.id,
        name: workout.name,
        equipment: specs.equipment,
        duration: specs.duration,
        calories: specs.calories,
        rating: specs.rating,
        image: workout.image,
    };

    return (
        <div className="min-h-screen bg-[#0d0e12] text-white flex flex-col justify-between p-4 sm:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto w-full">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-semibold mb-6 transition-colors">
                    ← Back to Library
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="relative w-full aspect-square max-h-[520px] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800/80">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-start">
                        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white mb-2">
                            {workout.name}
                        </h1>

                        <p className="text-sm text-zinc-400 mb-4 leading-relaxed font-normal">
                            {specs.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {specs.categories.map((cat, i) => (
                                <span
                                    key={i}
                                    className="bg-[#ccff00] text-black font-extrabold text-[11px] uppercase px-3 py-1 rounded-full tracking-wider"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <div className="bg-[#13151d] border border-zinc-800/80 rounded-2xl p-5 mb-8 space-y-3.5 text-xs font-semibold">
                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="uppercase tracking-wider text-[11px]">EQUIPMENT</span>
                                <span className="text-white font-medium">{specs.equipment}</span>
                            </div>
                            <div className="border-b border-zinc-800/50" />

                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="uppercase tracking-wider text-[11px]">DIFFICULTY</span>
                                <span className="text-white font-medium">{specs.difficulty}</span>
                            </div>
                            <div className="border-b border-zinc-800/50" />

                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="uppercase tracking-wider text-[11px]">SETS</span>
                                <span className="text-white font-medium">{specs.sets}</span>
                            </div>
                            <div className="border-b border-zinc-800/50" />

                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="uppercase tracking-wider text-[11px]">REPS</span>
                                <span className="text-white font-medium">{specs.reps}</span>
                            </div>
                            <div className="border-b border-zinc-800/50" />

                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="uppercase tracking-wider text-[11px]">DURATION</span>
                                <span className="text-white font-medium">{specs.duration} min</span>
                            </div>
                            <div className="border-b border-zinc-800/50" />

                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="uppercase tracking-wider text-[11px]">CALORIES</span>
                                <span className="text-white font-medium">{specs.calories} kcal</span>
                            </div>
                            <div className="border-b border-zinc-800/50" />

                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="uppercase tracking-wider text-[11px]">RATING</span>
                                <span className="text-white font-medium">{specs.rating}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-3">
                                INSTRUCTIONS
                            </h3>
                            <ol className="space-y-2 text-xs text-zinc-400 font-normal leading-relaxed">
                                {specs.instructions.map((step, idx) => (
                                    <li key={idx} className="flex gap-2">
                                        <span>{idx + 1}.</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Functional Action Buttons */}
                        <div className="flex flex-wrap sm:flex-nowrap gap-3">
                            <button
                                onClick={() => addToTodaysPlan(selectedWorkout)}
                                className="flex-1 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                            >
                                <span>📅</span> Add to today's plan
                            </button>

                            <button
                                onClick={() => addToSavedPlan(selectedWorkout)}
                                className="bg-[#13151d] hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs uppercase py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                            >
                                <span>🔖</span> Save for later
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}