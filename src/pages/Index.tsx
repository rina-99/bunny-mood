import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodSelector, MoodType } from "@/components/MoodSelector";
import { BunnyCharacter } from "@/components/BunnyCharacter";
import { WellnessTips } from "@/components/WellnessTips";
import { MoodNote } from "@/components/MoodNote";
import { MoodHistory } from "@/components/MoodHistory";
import { MoodChart } from "@/components/MoodChart";
import { LoginForm } from "@/components/Auth/LoginForm";
import { UserMenu } from "@/components/Auth/UserMenu";
import { Admin } from "./Admin";
import { useMoodHistory } from "@/hooks/useMoodHistory";
import { useMoodHistoryDB } from "@/hooks/useMoodHistoryDB";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { BookOpen, X } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const localHistory = useMoodHistory();
  const dbHistory = useMoodHistoryDB();
  
  const {
    history,
    addMoodEntry,
    deleteMoodEntry,
    getTodaysMood,
  } = user ? dbHistory : localHistory;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const todaysMood = getTodaysMood();
    if (todaysMood) {
      setSelectedMood(todaysMood.mood);
    }
  }, []);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setShowNote(true);
  };

  const handleSaveNote = async (note: string) => {
    if (selectedMood) {
      await addMoodEntry(selectedMood, note);
      setShowNote(false);
      toast.success("Votre humeur a été enregistrée ! 🎉");
    }
  };

  const handleDeleteEntry = async (id: string) => {
    await deleteMoodEntry(id);
    toast.success("Entrée supprimée");
  };

  if (showAdmin) {
    return <Admin onBack={() => setShowAdmin(false)} />;
  }

  if (!user && !authLoading) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "var(--gradient-bg)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold text-foreground mb-3">
              Mood Bunny 🐰
            </h1>
            <p className="text-muted-foreground">
              Suivez votre humeur quotidienne et améliorez votre bien-être
            </p>
          </motion.div>

          <LoginForm 
            onToggleMode={() => setIsSignUp(!isSignUp)}
            isSignUp={isSignUp}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "var(--gradient-bg)" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
            Mood Bunny
          </h1>
          <p className="text-muted-foreground text-sm md:text-base capitalize">
            {formattedDate}
          </p>
          <div className="mt-4 flex gap-3 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="gap-2"
            >
              {showHistory ? <X className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              {showHistory ? "Fermer l'historique" : "Voir l'historique"}
            </Button>
            {user && <UserMenu onAdminClick={() => setShowAdmin(true)} isAdmin={true} />}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {history.length > 0 && <MoodChart history={history} days={7} />}
                <MoodHistory 
                  history={history} 
                  onDelete={handleDeleteEntry}
                  limit={5}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BunnyCharacter mood={selectedMood} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
          </motion.div>

          <AnimatePresence>
            {showNote && selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <MoodNote
                  onSave={handleSaveNote}
                  onCancel={() => setShowNote(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {selectedMood && !showNote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <WellnessTips mood={selectedMood} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
