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
    const [todaysPlan, setTodaysPlan] = useState<WorkoutItem[]>([]);
    const [savedPlan, setSavedPlan] = useState<WorkoutItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Initial load on mount
    useEffect(() => {
        try {
            const localToday = localStorage.getItem("fitlog_today");
            const localSaved = localStorage.getItem("fitlog_saved");
            if (localToday) setTodaysPlan(JSON.parse(localToday));
            if (localSaved) setSavedPlan(JSON.parse(localSaved));
        } catch (e) {
            console.error("Error loading local storage:", e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Sync to LocalStorage ONLY after initial load completes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("fitlog_today", JSON.stringify(todaysPlan));
        }
    }, [todaysPlan, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("fitlog_saved", JSON.stringify(savedPlan));
        }
    }, [savedPlan, isLoaded]);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const addToTodaysPlan = (workout: WorkoutItem) => {
        const targetId = String(workout.id);
        if (todaysPlan.some((item) => String(item.id) === targetId)) {
            triggerToast("Already added to Today's Plan!");
            return;
        }
        setTodaysPlan((prev) => [...prev, { ...workout, id: String(workout.id) }]);
        triggerToast("Added to Today's Plan");
    };

    const addToSavedPlan = (workout: WorkoutItem) => {
        const targetId = String(workout.id);
        if (savedPlan.some((item) => String(item.id) === targetId)) {
            triggerToast("Already in Saved Workouts!");
            return;
        }
        setSavedPlan((prev) => [...prev, { ...workout, id: String(workout.id) }]);
        triggerToast("Added to Saved Workouts");
    };

    const removeFromTodaysPlan = (id: string) => {
        const targetId = String(id);
        setTodaysPlan((prev) => prev.filter((item) => String(item.id) !== targetId));
        triggerToast("Removed from Today's Plan");
    };

    const removeFromSavedPlan = (id: string) => {
        const targetId = String(id);
        setSavedPlan((prev) => prev.filter((item) => String(item.id) !== targetId));
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
                <div className="fixed top-20 right-5 z-[9999] bg-[#ccff00] text-black font-extrabold text-[11px] px-3.5 py-2 rounded-lg shadow-xl shadow-[#ccff00]/10 border border-black/10 flex items-center gap-1.5 animate-bounce">
                    <span className="text-xs">⚡</span>
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