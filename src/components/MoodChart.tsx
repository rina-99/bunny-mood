import { useMemo } from "react";
import { Card } from "./ui/card";
import { MoodEntry } from "@/hooks/useMoodHistory";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";

interface MoodChartProps {
  history: MoodEntry[];
  days?: number;
}

const moodColors: Record<string, string> = {
  happy: "#FFD700",
  sad: "#6B7280",
  calm: "#87CEEB",
  anxious: "#FF6B6B",
  excited: "#FF69B4",
  tired: "#9CA3AF",
};

const moodLabels: Record<string, string> = {
  happy: "Joyeux",
  sad: "Triste",
  calm: "Calme",
  anxious: "Anxieux",
  excited: "Excité",
  tired: "Fatigué",
};

const moodValues: Record<string, number> = {
  happy: 5,
  excited: 4,
  calm: 3,
  tired: 2,
  anxious: 1,
  sad: 0,
};

export const MoodChart = ({ history, days = 7 }: MoodChartProps) => {
  const chartData = useMemo(() => {
    const data: Array<{ date: string; mood: string; value: number; color: string }> = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, "yyyy-MM-dd");
      const entry = history.find((h) => h.date === dateStr);

      if (entry) {
        data.push({
          date: format(date, "dd/MM", { locale: fr }),
          mood: entry.mood,
          value: moodValues[entry.mood],
          color: moodColors[entry.mood],
        });
      } else {
        data.push({
          date: format(date, "dd/MM", { locale: fr }),
          mood: "",
          value: 0,
          color: "#E5E7EB",
        });
      }
    }

    return data;
  }, [history, days]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.mood) {
        return (
          <div className="bg-card p-3 rounded-lg shadow-lg border">
            <p className="font-semibold">{data.date}</p>
            <p className="text-sm text-muted-foreground">
              {moodLabels[data.mood]}
            </p>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Évolution des 7 derniers jours
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="date"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {Object.entries(moodLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: moodColors[key] }}
            />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};


