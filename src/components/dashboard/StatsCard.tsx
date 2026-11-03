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
  iconStyle?: "gradient" | "bordered";
  iconColor?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient = "from-primary to-accent",
  loading = false,
  iconStyle = "gradient",
  iconColor = "text-primary"
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

  // Convert icon color to border color
  return (
    <Card className="flex h-full flex-col p-5 card-premium transition-colors duration-150 hover:border-border-strong group">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[13px] font-medium text-muted-foreground">{title}</h3>
        {iconStyle === "bordered" ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white/[.05]">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
      
      <div className="mt-auto space-y-3">
        <p className="font-poppins text-[28px] font-semibold tracking-tight text-foreground tabular-nums">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        
        {change && (
          <p className="flex items-center gap-2 text-xs">
            <span className={`font-medium ${changeColor}`}>
              {change.type === "increase" ? "↗" : change.type === "decrease" ? "↘" : "→"}
              {" "}{change.value.replace(/ from last week$/, "")}
            </span>
            <span className="text-muted-foreground">from last week</span>
          </p>
        ) || <p className="text-xs text-muted-foreground">—</p>}
      </div>
    </Card>
  );
}