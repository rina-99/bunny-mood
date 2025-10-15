import { useState, useEffect } from "react";
import { MoodType } from "@/components/MoodSelector";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface MoodEntry {
  id: string;
  mood: MoodType;
  date: string;
  timestamp: number;
  note?: string;
}

export const useMoodHistoryDB = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setHistory([]);
      setLoading(false);
    }
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (error) throw error;

      setHistory(data || []);
    } catch (error: any) {
      console.error('Error fetching history:', error);
      toast.error("Erreur lors du chargement de l'historique");
    } finally {
      setLoading(false);
    }
  };

  const addMoodEntry = async (mood: MoodType, note?: string) => {
    if (!user) {
      toast.error("Vous devez être connecté");
      return null;
    }

    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      mood,
      date: new Date().toISOString().split("T")[0],
      timestamp: Date.now(),
      note,
    };

    try {
      const { error } = await supabase
        .from('mood_entries')
        .insert([{
          id: entry.id,
          user_id: user.id,
          mood: entry.mood,
          date: entry.date,
          timestamp: entry.timestamp,
          note: entry.note,
        }]);

      if (error) throw error;

      setHistory((prev) => [entry, ...prev]);
      return entry;
    } catch (error: any) {
      console.error('Error adding mood:', error);
      toast.error("Erreur lors de l'enregistrement");
      return null;
    }
  };

  const updateMoodEntry = async (id: string, updates: Partial<MoodEntry>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('mood_entries')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setHistory((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
      );
    } catch (error: any) {
      console.error('Error updating mood:', error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const deleteMoodEntry = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('mood_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setHistory((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error: any) {
      console.error('Error deleting mood:', error);
      toast.error("Erreur lors de la suppression");
    }
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

  const clearHistory = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('mood_entries')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setHistory([]);
      toast.success("Historique effacé");
    } catch (error: any) {
      console.error('Error clearing history:', error);
      toast.error("Erreur lors de l'effacement");
    }
  };

  return {
    history,
    loading,
    addMoodEntry,
    updateMoodEntry,
    deleteMoodEntry,
    getTodaysMood,
    getMoodsByDateRange,
    clearHistory,
  };
};

