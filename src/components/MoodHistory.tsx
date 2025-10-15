import { motion } from "framer-motion";
import { MoodEntry } from "@/hooks/useMoodHistory";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface MoodHistoryProps {
  history: MoodEntry[];
  onDelete?: (id: string) => void;
  limit?: number;
}

const moodEmojis: Record<string, string> = {
  happy: "🌞",
  sad: "🌧️",
  calm: "🌤️",
  anxious: "⚡",
  excited: "🌸",
  tired: "💤",
};

const moodLabels: Record<string, string> = {
  happy: "Joyeux",
  sad: "Triste",
  calm: "Calme",
  anxious: "Anxieux",
  excited: "Excité",
  tired: "Fatigué",
};

export const MoodHistory = ({ history, onDelete, limit }: MoodHistoryProps) => {
  const displayHistory = limit ? history.slice(0, limit) : history;

  if (history.length === 0) {
    return (
      <Card className="p-8 bg-card/50 backdrop-blur-sm text-center">
        <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">
          Aucune humeur enregistrée pour le moment.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Commencez par sélectionner votre humeur du jour ! 
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Historique de vos humeurs
      </h3>
      <div className="space-y-2">
        {displayHistory.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-3xl mt-1">
                    {moodEmojis[entry.mood]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">
                        {moodLabels[entry.mood]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(entry.timestamp), "d MMMM yyyy 'à' HH:mm", {
                          locale: fr,
                        })}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(entry.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      {limit && history.length > limit && (
        <p className="text-center text-sm text-muted-foreground">
          Et {history.length - limit} autres entrées...
        </p>
      )}
    </div>
  );
};


