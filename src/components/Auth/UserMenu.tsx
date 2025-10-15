import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, LogOut, Settings, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface UserMenuProps {
  onAdminClick?: () => void;
  isAdmin?: boolean;
}

export const UserMenu = ({ onAdminClick, isAdmin = false }: UserMenuProps) => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie ! 👋");
    } catch (error: any) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  if (!user) return null;

  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Utilisateur';

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <User className="w-4 h-4" />
        <span className="hidden md:inline">{username}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 z-50"
            >
              <Card className="p-4 bg-card/95 backdrop-blur-sm min-w-[200px]">
                <div className="space-y-2">
                  <div className="px-2 py-1 border-b">
                    <p className="font-semibold text-sm">{username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>

                  {isAdmin && onAdminClick && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        onAdminClick();
                        setIsOpen(false);
                      }}
                    >
                      <Shield className="w-4 h-4" />
                      Panneau Admin
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

