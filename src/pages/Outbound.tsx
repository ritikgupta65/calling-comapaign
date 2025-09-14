import { useState } from "react";
import { Phone, TrendingUp, Users, AlertTriangle, PhoneCall, Filter, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import StatsCard from "@/components/dashboard/StatsCard";
import CampaignSetup from "@/components/outbound/CampaignSetup";

export default function Outbound() {
  const [activeCampaign, setActiveCampaign] = useState({
    id: "default-campaign",
    name: "Q4 Lead Generation",
    assistant: "Sales Assistant Pro",
    number: "+1 (555) 123-4567",
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

  const additionalStats = [
    { title: "Total Cost", value: "$162.35", icon: Users },
    { title: "Avg. Duration", value: "3m 45s", icon: AlertTriangle }
  ];

  const allStats = [...stats, ...additionalStats];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Analytics Section */}
      <Card className="p-6 card-premium">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Outbound Analytics</h3>
          <div className="flex items-center space-x-3">
            <DatePickerWithRange />
            <Select defaultValue="all-assistants">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Assistants" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-assistants">All Assistants</SelectItem>
                <SelectItem value="sales-pro">Sales Assistant Pro</SelectItem>
                <SelectItem value="customer-support">Customer Support</SelectItem>
                <SelectItem value="lead-qualifier">Lead Qualifier</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allStats.map((stat, index) => (
            <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
              <StatsCard {...stat} />
            </div>
          ))}
        </div>
      </Card>

      {/* Campaign Setup & Management */}
      <CampaignSetup 
        onCampaignStart={handleCampaignStart}
        activeCampaign={activeCampaign}
      />
    </div>
  );
}