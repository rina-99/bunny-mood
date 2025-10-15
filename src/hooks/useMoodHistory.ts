import { useState, useEffect } from "react";
import { MoodType } from "@/components/MoodSelector";

export interface MoodEntry {
  id: string;
  mood: MoodType;
  date: string;
  timestamp: number;
  note?: string;
}

const STORAGE_KEY = "mood-bunny-history";

export const useMoodHistory = () => {
  const [history, setHistory] = useState<MoodEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading mood history:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving mood history:", error);
    }
  }, [history]);

  const addMoodEntry = (mood: MoodType, note?: string) => {
    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      mood,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      timestamp: Date.now(),
      note,
    };

    setHistory((prev) => [entry, ...prev]);
    return entry;
  };

  const updateMoodEntry = (id: string, updates: Partial<MoodEntry>) => {
    setHistory((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const deleteMoodEntry = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const getTodaysMood = (): MoodEntry | null => {
    const today = new Date().toISOString().split("T")[0];
    return history.find((entry) => entry.date === today) || null;
  };

  const getMoodsByDateRange = (startDate: string, endDate: string) => {
    return history.filter(
      (entry) => entry.date >= startDate && entry.date <= endDate
    );
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addMoodEntry,
    updateMoodEntry,
    deleteMoodEntry,
    getTodaysMood,
    getMoodsByDateRange,
    clearHistory,
  };
};

