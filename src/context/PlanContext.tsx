"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WorkoutItem {
    id: string;
    name: string;
    equipment?: string;
    duration?: number;
    time?: number;
    calories?: number;
    calori?: number;
    rating?: number;
    image: string;
}

interface PlanContextType {
    todaysPlan: WorkoutItem[];
    savedPlan: WorkoutItem[];
    addToTodaysPlan: (workout: WorkoutItem) => void;
    addToSavedPlan: (workout: WorkoutItem) => void;
    removeFromTodaysPlan: (id: string) => void;
    removeFromSavedPlan: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
    // Lazy Initialization: useState initializer function completely avoids calling setState in useEffect
    const [todaysPlan, setTodaysPlan] = useState<WorkoutItem[]>(() => {
        if (typeof window !== "undefined") {
            try {
                const localToday = localStorage.getItem("fitlog_today");
                return localToday ? JSON.parse(localToday) : [];
            } catch (e) {
                console.error("Failed to parse fitlog_today", e);
            }
        }
        return [];
    });

    const [savedPlan, setSavedPlan] = useState<WorkoutItem[]>(() => {
        if (typeof window !== "undefined") {
            try {
                const localSaved = localStorage.getItem("fitlog_saved");
                return localSaved ? JSON.parse(localSaved) : [];
            } catch (e) {
                console.error("Failed to parse fitlog_saved", e);
            }
        }
        return [];
    });

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Sync state changes to LocalStorage
    useEffect(() => {
        localStorage.setItem("fitlog_today", JSON.stringify(todaysPlan));
    }, [todaysPlan]);

    useEffect(() => {
        localStorage.setItem("fitlog_saved", JSON.stringify(savedPlan));
    }, [savedPlan]);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const addToTodaysPlan = (workout: WorkoutItem) => {
        const isAlreadyAdded = todaysPlan.some((item) => item.id === workout.id);

        if (isAlreadyAdded) {
            triggerToast("Already added to Today's Plan!");
        } else {
            setTodaysPlan((prev) => [...prev, workout]);
            triggerToast("Added to Today's Plan");
        }
    };

    const addToSavedPlan = (workout: WorkoutItem) => {
        const isAlreadyAdded = savedPlan.some((item) => item.id === workout.id);

        if (isAlreadyAdded) {
            triggerToast("Already in Saved Workouts!");
        } else {
            setSavedPlan((prev) => [...prev, workout]);
            triggerToast("Added to Saved Workouts");
        }
    };

    const removeFromTodaysPlan = (id: string) => {
        setTodaysPlan((prev) => prev.filter((item) => item.id !== id));
        triggerToast("Removed from Today's Plan");
    };

    const removeFromSavedPlan = (id: string) => {
        setSavedPlan((prev) => prev.filter((item) => item.id !== id));
        triggerToast("Removed from Saved Workouts");
    };

    return (
        <PlanContext.Provider
            value={{
                todaysPlan,
                savedPlan,
                addToTodaysPlan,
                addToSavedPlan,
                removeFromTodaysPlan,
                removeFromSavedPlan,
            }}
        >
            {children}

            {/* Top Right Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-[9999] bg-[#ccff00] text-black font-black text-xs px-5 py-3 rounded-xl shadow-2xl shadow-[#ccff00]/20 border border-black/10 flex items-center gap-2 animate-bounce">
                    <span>⚡</span>
                    <span>{toastMessage}</span>
                </div>
            )}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
}