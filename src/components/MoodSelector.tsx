import { motion } from "framer-motion";

export type MoodType = "happy" | "sad" | "calm" | "anxious" | "excited" | "tired";

interface Mood {
  id: MoodType;
  emoji: string;
  label: string;
  color: string;
}

const moods: Mood[] = [
  { id: "happy", emoji: "🌞", label: "Joyeux", color: "hsl(var(--mood-happy))" },
  { id: "sad", emoji: "🌧️", label: "Triste", color: "hsl(var(--mood-sad))" },
  { id: "calm", emoji: "🌤️", label: "Calme", color: "hsl(var(--mood-calm))" },
  { id: "anxious", emoji: "⚡", label: "Anxieux", color: "hsl(var(--mood-anxious))" },
  { id: "excited", emoji: "🌸", label: "Excité", color: "hsl(var(--mood-excited))" },
  { id: "tired", emoji: "💤", label: "Fatigué", color: "hsl(var(--mood-tired))" },
];

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onMoodSelect: (mood: MoodType) => void;
}

export const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  const handleKeyDown = (e: React.KeyboardEvent, moodId: MoodType) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMoodSelect(moodId);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground"
        id="mood-selector-title"
      >
        Comment vous sentez-vous aujourd'hui ? ✨
      </motion.h2>
      
      <div 
        className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"
        role="group"
        aria-labelledby="mood-selector-title"
      >
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            onKeyDown={(e) => handleKeyDown(e, mood.id)}
            className={`
              relative flex flex-col items-center justify-center
              p-4 md:p-6 rounded-3xl
              transition-all duration-300 backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${selectedMood === mood.id 
                ? "bg-card shadow-[var(--card-glow)] scale-105" 
                : "bg-card/40 hover:bg-card/60 hover:shadow-md hover:scale-105"
              }
            `}
            style={{
              borderColor: selectedMood === mood.id ? mood.color : "transparent",
              borderWidth: selectedMood === mood.id ? "3px" : "0px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Sélectionner l'humeur ${mood.label}`}
            aria-pressed={selectedMood === mood.id}
            tabIndex={0}
          >
            <motion.div
              className="text-4xl md:text-5xl mb-2"
              animate={selectedMood === mood.id ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              {mood.emoji}
            </motion.div>
            <span className={`
              text-xs md:text-sm font-medium
              ${selectedMood === mood.id ? "text-foreground" : "text-muted-foreground"}
            `}>
              {mood.label}
            </span>
            
            {selectedMood === mood.id && (
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-20"
                style={{ backgroundColor: mood.color }}
                layoutId="mood-highlight"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                aria-hidden="true"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
