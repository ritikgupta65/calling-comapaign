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
  const getBorderColor = (iconColor: string) => {
    const colorMap: { [key: string]: string } = {
      'text-blue-500': 'border-blue-500',
      'text-blue-600': 'border-blue-600',
      'text-green-500': 'border-green-500',
      'text-emerald-500': 'border-emerald-500',
      'text-purple-500': 'border-purple-500',
      'text-violet-500': 'border-violet-500',
      'text-red-500': 'border-red-500',
      'text-amber-500': 'border-amber-500',
      'text-orange-500': 'border-orange-500',
      'text-cyan-500': 'border-cyan-500',
    };
    return colorMap[iconColor] || iconColor.replace('text-', 'border-');
  };

  // Convert icon color to background color with opacity
  const getBackgroundColor = (iconColor: string) => {
    const colorMap: { [key: string]: string } = {
      'text-blue-500': 'bg-blue-500/10',
      'text-blue-600': 'bg-blue-600/10',
      'text-green-500': 'bg-green-500/10',
      'text-emerald-500': 'bg-emerald-500/10',
      'text-purple-500': 'bg-purple-500/10',
      'text-violet-500': 'bg-violet-500/10',
      'text-red-500': 'bg-red-500/10',
      'text-amber-500': 'bg-amber-500/10',
      'text-orange-500': 'bg-orange-500/10',
      'text-cyan-500': 'bg-cyan-500/10',
    };
    return colorMap[iconColor] || iconColor.replace('text-', 'bg-') + '/10';
  };

  return (
    <Card className="p-6 card-premium hover:border-blue-500 hover:border-2 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {iconStyle === "bordered" ? (
          <div className={`p-2 rounded-lg border-2 group-hover:scale-110 transition-transform duration-300 ${getBorderColor(iconColor)} ${getBackgroundColor(iconColor)}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        ) : (
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
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