import { motion, AnimatePresence } from "framer-motion";
import { MoodType } from "./MoodSelector";
import { Card } from "./ui/card";
import { Lightbulb, Heart, Coffee, Wind, Sparkles, Moon } from "lucide-react";

interface WellnessTipsProps {
  mood: MoodType | null;
}

const tipsData: Record<MoodType, { icon: any; tips: string[] }> = {
  happy: {
    icon: Sparkles,
    tips: [
      "Partagez votre joie avec vos proches ! 💫",
      "Profitez-en pour faire une activité que vous aimez",
      "Capturez ce moment dans un journal de gratitude",
      "Écoutez de la musique entraînante",
    ],
  },
  sad: {
    icon: Heart,
    tips: [
      "C'est normal de se sentir triste parfois 💙",
      "Appelez un ami proche ou un être cher",
      "Regardez une vidéo ou un film réconfortant",
      "Faites-vous une tisane chaude et prenez du temps pour vous",
      "N'hésitez pas à demander de l'aide si nécessaire",
    ],
  },
  calm: {
    icon: Wind,
    tips: [
      "Profitez de ce moment de sérénité ☁️",
      "Essayez une méditation de 5 minutes",
      "Lisez quelques pages d'un bon livre",
      "Promenez-vous dans la nature si possible",
      "Pratiquez des exercices de respiration profonde",
    ],
  },
  anxious: {
    icon: Lightbulb,
    tips: [
      "Respirez profondément : inspirez 4s, retenez 4s, expirez 4s",
      "Faites une liste de ce qui vous préoccupe",
      "Concentrez-vous sur ce que vous pouvez contrôler",
      "Essayez une courte séance de yoga ou d'étirements",
      "Appelez quelqu'un en qui vous avez confiance",
    ],
  },
  excited: {
    icon: Sparkles,
    tips: [
      "Canalisez cette énergie positive ! ",
      "Commencez ce projet que vous repoussez",
      "Faites de l'exercice pour utiliser cette énergie",
      "Partagez votre enthousiasme avec d'autres",
      "Notez vos idées créatives tant qu'elles affluent",
    ],
  },
  tired: {
    icon: Moon,
    tips: [
      "Votre corps a besoin de repos 💤",
      "Accordez-vous une pause de 15-20 minutes",
      "Hydratez-vous bien",
      "Évitez les écrans si possible",
      "Planifiez une soirée détente et un coucher tôt",
      "Une courte sieste peut vous recharger",
    ],
  },
};

export const WellnessTips = ({ mood }: WellnessTipsProps) => {
  if (!mood) return null;

  const { icon: Icon, tips } = tipsData[mood];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Conseils bien-être
            </h3>
          </div>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

