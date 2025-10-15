import { motion, AnimatePresence } from "framer-motion";
import { MoodType } from "./MoodSelector";
import bunnyHappy from "@/assets/bunny-happy.png";
import bunnySad from "@/assets/bunny-sad.png";
import bunnyCalm from "@/assets/bunny-calm.png";
import bunnyAnxious from "@/assets/bunny-anxious.png";
import bunnyExcited from "@/assets/bunny-excited.png";
import bunnyTired from "@/assets/bunny-tired.png";

interface BunnyCharacterProps {
  mood: MoodType | null;
}

const bunnyVariants = {
  happy: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.8, repeat: 2 },
  },
  sad: {
    y: [0, 5, 0],
    opacity: [1, 0.7, 1],
    transition: { duration: 1.5, repeat: 1 },
  },
  calm: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.9, 1],
    transition: { duration: 2, repeat: Infinity },
  },
  anxious: {
    x: [-5, 5, -5, 5, 0],
    rotate: [-2, 2, -2, 2, 0],
    transition: { duration: 0.4, repeat: 3 },
  },
  excited: {
    scale: [1, 1.2, 1, 1.1, 1],
    rotate: [0, -10, 10, -5, 0],
    y: [0, -30, 0, -15, 0],
    transition: { duration: 1, repeat: 2 },
  },
  tired: {
    y: [0, 10],
    opacity: [1, 0.6],
    transition: { duration: 1.5 },
  },
};

const getMoodEmoji = (mood: MoodType | null) => {
  switch (mood) {
    case "happy":
      return "✨";
    case "sad":
      return "☔";
    case "calm":
      return "🧘";
    case "anxious":
      return "💫";
    case "excited":
      return "🎉";
    case "tired":
      return "😴";
    default:
      return null;
  }
};

const getMoodMessage = (mood: MoodType | null) => {
  switch (mood) {
    case "happy":
      return "Yay! Let's celebrate!";
    case "sad":
      return "I'm here for you 💙";
    case "calm":
      return "Peace and serenity...";
    case "anxious":
      return "Take a deep breath with me";
    case "excited":
      return "Woohoo! Amazing energy!";
    case "tired":
      return "Rest is important too";
    default:
      return "Sélectionnez votre humeur pour commencer";
  }
};

const getBunnyImage = (mood: MoodType | null) => {
  switch (mood) {
    case "happy":
      return bunnyHappy;
    case "sad":
      return bunnySad;
    case "calm":
      return bunnyCalm;
    case "anxious":
      return bunnyAnxious;
    case "excited":
      return bunnyExcited;
    case "tired":
      return bunnyTired;
    default:
      return bunnyHappy; // fallback
  }
};

export const BunnyCharacter = ({ mood }: BunnyCharacterProps) => {
  const moodEmoji = getMoodEmoji(mood);
  const moodMessage = getMoodMessage(mood);
  const bunnyImage = getBunnyImage(mood);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <AnimatePresence mode="wait">
          {mood ? (
            <motion.div
              key={mood}
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative z-10"
            >
              <motion.div
                animate={bunnyVariants[mood]}
              >
                <img 
                  src={bunnyImage} 
                  alt={`Lapin ${mood}`}
                  loading="lazy"
                  decoding="async"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
            >
              <img 
                src={bunnyHappy} 
                alt="Lapin accueil"
                loading="lazy"
                decoding="async"
                className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl opacity-50"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {moodEmoji && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: 1,
                y: [-20, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-4 -right-4 text-5xl"
            >
              {moodEmoji}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated tears for sad mood */}
        {mood === "sad" && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                initial={{ 
                  opacity: 0,
                  x: i % 2 === 0 ? -20 : 20,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, 80],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeIn",
                }}
                style={{
                  left: "50%",
                  top: "40%",
                }}
              >
                💧
              </motion.div>
            ))}
          </>
        )}

        {/* Floating hearts for happy mood */}
        {mood === "happy" && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  opacity: 0,
                  x: (Math.random() - 0.5) * 60,
                  y: 50,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [50, -80],
                  x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 100],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                💗
              </motion.div>
            ))}
          </>
        )}

        {/* Floating particles for excited mood */}
        {mood === "excited" && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  opacity: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, -80 - Math.random() * 50],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: 2,
                }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}

        {/* Zzz for tired mood */}
        {mood === "tired" && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  opacity: 0,
                  x: 30,
                  y: -20,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [30, 50],
                  y: [-20, -50],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.6,
                  repeat: Infinity,
                }}
                style={{
                  left: "50%",
                  top: "20%",
                }}
              >
                💤
              </motion.div>
            ))}
          </>
        )}

        {/* Stress marks for anxious mood */}
        {mood === "anxious" && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 1],
                  rotate: [0, 180],
                  x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                  y: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.2,
                  repeat: 3,
                }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                ⚡
              </motion.div>
            ))}
          </>
        )}

        {/* Peaceful aura for calm mood */}
        {mood === "calm" && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-primary/30"
                initial={{ 
                  width: 100,
                  height: 100,
                  opacity: 0.5,
                }}
                animate={{
                  width: [100, 200, 250],
                  height: [100, 200, 250],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </>
        )}
      </div>

      <motion.div
        key={moodMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="text-lg md:text-xl font-medium text-foreground px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm shadow-md">
          {moodMessage}
        </p>
      </motion.div>
    </div>
  );
};
