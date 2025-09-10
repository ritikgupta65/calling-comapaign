import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon: LucideIcon;
  gradient?: string;
  loading?: boolean;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient = "from-primary to-accent",
  loading = false 
}: StatsCardProps) {
  if (loading) {
    return (
      <Card className="p-6 card-premium">
        <div className="flex items-center justify-between mb-4">
          <div className="skeleton-gradient h-4 w-24 rounded"></div>
          <div className="skeleton-gradient h-10 w-10 rounded-lg"></div>
        </div>
        <div className="skeleton-gradient h-8 w-20 rounded mb-2"></div>
        <div className="skeleton-gradient h-3 w-16 rounded"></div>
      </Card>
    );
  }

  const changeColor = change?.type === "increase" 
    ? "text-success" 
    : change?.type === "decrease" 
    ? "text-destructive" 
    : "text-muted-foreground";

  return (
    <Card className="p-6 card-premium hover:shadow-glow transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-bold font-poppins text-foreground">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        
        {change && (
          <p className={`text-sm flex items-center ${changeColor}`}>
            <span className="mr-1">
              {change.type === "increase" ? "↗" : change.type === "decrease" ? "↘" : "→"}
            </span>
            {change.value}
          </p>
        )}
      </div>
    </Card>
  );
}