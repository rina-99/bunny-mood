import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Users, Activity, Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface UserStats {
  id: string;
  email: string;
  username: string;
  created_at: string;
  mood_count: number;
  last_mood_date?: string;
}

interface AdminProps {
  onBack: () => void;
}

export const Admin = ({ onBack }: AdminProps) => {
  const [users, setUsers] = useState<UserStats[]>([]);
  const [totalMoods, setTotalMoods] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const usersWithStats = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { count } = await supabase
            .from('mood_entries')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', profile.id);

          const { data: lastMood } = await supabase
            .from('mood_entries')
            .select('date')
            .eq('user_id', profile.id)
            .order('timestamp', { ascending: false })
            .limit(1)
            .single();

          return {
            ...profile,
            mood_count: count || 0,
            last_mood_date: lastMood?.date,
          };
        })
      );

      setUsers(usersWithStats);

      const { count: totalCount } = await supabase
        .from('mood_entries')
        .select('*', { count: 'exact', head: true });

      setTotalMoods(totalCount || 0);
    } catch (error: any) {
      toast.error("Erreur lors du chargement des statistiques");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "var(--gradient-bg)" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-2">
            Administration
          </h1>
          <p className="text-muted-foreground">
            Statistiques et gestion des utilisateurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Utilisateurs</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-accent/10">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalMoods}</p>
                  <p className="text-sm text-muted-foreground">Humeurs totales</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {users.length > 0 ? Math.round(totalMoods / users.length) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Moy. par utilisateur</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4">Utilisateurs inscrits</h2>
          <div className="space-y-3">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 bg-card/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{user.username}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-8 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{user.mood_count}</p>
                        <p className="text-xs text-muted-foreground">Humeurs</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {user.last_mood_date
                            ? format(new Date(user.last_mood_date), "dd MMM", { locale: fr })
                            : "Jamais"}
                        </p>
                        <p className="text-xs text-muted-foreground">Dernière humeur</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {format(new Date(user.created_at), "dd/MM/yyyy", { locale: fr })}
                        </p>
                        <p className="text-xs text-muted-foreground">Inscription</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {users.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">Aucun utilisateur inscrit pour le moment</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

