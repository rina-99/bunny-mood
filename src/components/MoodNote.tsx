import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Save, X } from "lucide-react";

interface MoodNoteProps {
  initialNote?: string;
  onSave: (note: string) => void;
  onCancel?: () => void;
}

export const MoodNote = ({ initialNote = "", onSave, onCancel }: MoodNoteProps) => {
  const [note, setNote] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulation
    onSave(note);
    setIsSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Ajouter une note 📝
        </h3>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Comment vous sentez-vous aujourd'hui ? Qu'est-ce qui s'est passé ?"
          className="min-h-[120px] mb-4 resize-none"
          maxLength={500}
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {note.length}/500 caractères
          </span>
          <div className="flex gap-2">
            {onCancel && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={isSaving}
              >
                <X className="w-4 h-4 mr-1" />
                Annuler
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving || note.trim().length === 0}
            >
              <Save className="w-4 h-4 mr-1" />
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};


