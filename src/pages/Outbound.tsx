import { useState } from "react";
import { Phone, TrendingUp, Users, AlertTriangle, PhoneCall } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import CampaignSetup from "@/components/outbound/CampaignSetup";

export default function Outbound() {
  const [activeCampaign, setActiveCampaign] = useState({
    name: "Q4 Lead Generation",
    total: 1250,
    completed: 342,
    pending: 756,
    failed: 152,
    startTime: "2 hours ago"
  });

  const handleCampaignStart = (config: any) => {
    console.log("Starting campaign with config:", config);
    // Campaign start logic would go here
  };

  const stats = [
    {
      title: "Total Calls",
      value: 1250,
      change: { value: "+12% from last week", type: "increase" as const },
      icon: PhoneCall,
      gradient: "from-primary to-accent"
    },
    {
      title: "Connected",
      value: 342,
      change: { value: "+8% from last week", type: "increase" as const },
      icon: Phone,
      gradient: "from-success to-success/80"
    },
    {
      title: "Success Rate",
      value: "27.4%",
      change: { value: "+2.1% from last week", type: "increase" as const },
      icon: TrendingUp,
      gradient: "from-secondary to-primary"
    },
    {
      title: "Failed/Spam",
      value: 152,
      change: { value: "-5% from last week", type: "decrease" as const },
      icon: AlertTriangle,
      gradient: "from-destructive to-destructive/80"
    }
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Campaign Setup & Management */}
      <CampaignSetup 
        onCampaignStart={handleCampaignStart}
        activeCampaign={activeCampaign}
      />
    </div>
  );
}