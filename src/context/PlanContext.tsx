"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Workout {
    id: string;
    name: string;
    category: string[];
    equipment: string[];
    duration: number; // in minutes
    calories: number; // in kcal
    rating: number;
    image: string;
    description?: string;
    instructions?: string[];
    difficulty?: string;
    sets?: number;
    reps?: string;
    isDone?: boolean;
}

interface PlanContextType {
    planItems: Workout[];
    savedItems: Workout[];
    addToPlan: (workout: Workout) => boolean;
    removeFromPlan: (id: string) => void;
    toggleSave: (workout: Workout) => void;
    markAsDone: (id: string) => void;
    removeFromSaved: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [planItems, setPlanItems] = useState<Workout[]>([]);
    const [savedItems, setSavedItems] = useState<Workout[]>([]);

    useEffect(() => {
        const localPlan = localStorage.getItem("fitlog_plan");
        const localSaved = localStorage.getItem("fitlog_saved");
        if (localPlan) setPlanItems(JSON.parse(localPlan));
        if (localSaved) setSavedItems(JSON.parse(localSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem("fitlog_plan", JSON.stringify(planItems));
    }, [planItems]);

    useEffect(() => {
        localStorage.setItem("fitlog_saved", JSON.stringify(savedItems));
    }, [savedItems]);

    const addToPlan = (workout: Workout) => {
        if (planItems.length >= 5) {
            return false;
        }
        if (!planItems.some((item) => item.id === workout.id)) {
            setPlanItems((prev) => [...prev, { ...workout, isDone: false }]);
        }
        return true;
    };

    const removeFromPlan = (id: string) => {
        setPlanItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleSave = (workout: Workout) => {
        setSavedItems((prev) => {
            const exists = prev.some((item) => item.id === workout.id);
            if (exists) {
                return prev.filter((item) => item.id !== workout.id);
            } else {
                return [...prev, workout];
            }
        });
    };

    const removeFromSaved = (id: string) => {
        setSavedItems((prev) => prev.filter((item) => item.id !== id));
    };

    const markAsDone = (id: string) => {
        setPlanItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isDone: true } : item
            )
        );
    };

    return (
        <PlanContext.Provider
            value={{
                planItems,
                savedItems,
                addToPlan,
                removeFromPlan,
                toggleSave,
                markAsDone,
                removeFromSaved,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
};