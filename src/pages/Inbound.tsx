import { useState } from "react";
import { Headphones, Clock, Users, PhoneForwarded, Play, Square, User, Plus, X, Pause, BarChart3, Calendar, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import StatsCard from "@/components/dashboard/StatsCard";
import { useNavigate } from "react-router-dom";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function Inbound() {
  const navigate = useNavigate();
  const [isReceptionActive, setIsReceptionActive] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [activeCampaigns, setActiveCampaigns] = useState([
    {
      id: "1",
      assistant: "Customer Support Pro",
      number: "+1 (555) 123-4567",
      status: "active" as const
    }
  ]);

  const stats = [
    {
      title: "Calls Received",
      value: 89,
      change: { value: "+15% from yesterday", type: "increase" as const },
      icon: Headphones,
      gradient: "from-secondary to-primary"
    },
    {
      title: "Avg. Duration",
      value: "3m 45s",
      change: { value: "+30s from yesterday", type: "increase" as const },
      icon: Clock,
      gradient: "from-primary to-accent"
    },
    {
      title: "Handover Rate",
      value: "12%",
      change: { value: "-3% from yesterday", type: "decrease" as const },
      icon: PhoneForwarded,
      gradient: "from-accent to-secondary"
    },
    {
      title: "Active Calls",
      value: 3,
      change: { value: "2 waiting", type: "neutral" as const },
      icon: Users,
      gradient: "from-warning to-warning/80"
    }
  ];

  const liveCalls = [
    {
      id: "1",
      caller: "+1 (555) 123-4567",
      duration: "2m 34s",
      status: "Active",
      transcript: "Hi, I'm calling about your software pricing plans...",
      region: "New York"
    },
    {
      id: "2", 
      caller: "+1 (555) 987-6543",
      duration: "1m 12s",
      status: "Active",
      transcript: "I need help with my account login issues...",
      region: "California"
    },
    {
      id: "3",
      caller: "+1 (555) 456-7890", 
      duration: "4m 56s",
      status: "Handover Requested",
      transcript: "This is a complex technical issue that needs human assistance...",
      region: "Texas"
    }
  ];

  const recentCalls = [
    {
      id: "4",
      caller: "+1 (555) 234-5678",
      duration: "3m 22s", 
      status: "Completed",
      summary: "General inquiry about pricing resolved",
      timestamp: "5 minutes ago"
    },
    {
      id: "5",
      caller: "+1 (555) 345-6789",
      duration: "7m 45s",
      status: "Transferred",
      summary: "Technical support - transferred to engineering",
      timestamp: "12 minutes ago"
    },
    {
      id: "6",
      caller: "+1 (555) 567-8901",
      duration: "2m 15s",
      status: "Completed", 
      summary: "Appointment scheduled successfully",
      timestamp: "18 minutes ago"
    }
  ];

  const allAssistants = [
    { id: "customer-support", name: "Customer Support Pro", type: "Support", number: "+1 (555) 123-4567" },
    { id: "sales-assistant", name: "Sales Assistant", type: "Sales", number: "+1 (555) 987-6543" },
    { id: "tech-support", name: "Technical Support", type: "Technical", number: "+1 (555) 456-7890" },
    { id: "billing-support", name: "Billing Support", type: "Billing", number: "+1 (555) 234-5678" }
  ];

  const availableAssistants = allAssistants.filter(assistant => 
    !activeCampaigns.some(campaign => campaign.assistant === assistant.name)
  );

  const inboundStats = [
    { title: "Total Calls", value: "1,847", icon: Headphones },
    { title: "Success Rate", value: "94.2%", icon: BarChart3 },
    { title: "Total Cost", value: "$92.35", icon: Users },
    { title: "Avg. Duration", value: "4m 12s", icon: Clock }
  ];

  const handleNewCampaign = () => {
    if (selectedAssistant) {
      const assistant = availableAssistants.find(a => a.id === selectedAssistant);
      if (assistant) {
        setActiveCampaigns([...activeCampaigns, {
          id: Date.now().toString(),
          assistant: assistant.name,
          number: assistant.number,
          status: "active" as const
        }]);
        setSelectedAssistant("");
      }
    }
  };

  const handleRemoveCampaign = (campaignId: string) => {
    setActiveCampaigns(activeCampaigns.filter(c => c.id !== campaignId));
  };

  const handleLiveReport = () => {
    navigate("/live-report");
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-poppins text-gradient-secondary">
            Inbound Reception
          </h2>
          <p className="text-muted-foreground">AI-powered call handling & routing</p>
        </div>
        
        <Badge 
          variant="outline" 
          className={`px-4 py-2 ${
            isReceptionActive 
              ? "bg-success/10 text-success border-success/20" 
              : "bg-muted/10 text-muted-foreground border-muted/20"
          }`}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isReceptionActive ? "bg-success animate-pulse" : "bg-muted-foreground"
          }`} />
          {isReceptionActive ? "Reception Active" : "Reception Inactive"}
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <Card className="p-6 card-premium">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Inbound Analytics</h3>
          <div className="flex items-center space-x-3">
            <DatePickerWithRange />
            <Select defaultValue="all-assistants">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Assistants" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-assistants">All Assistants</SelectItem>
                {allAssistants.map((assistant) => (
                  <SelectItem key={assistant.id} value={assistant.id}>
                    {assistant.name}
                  </SelectItem>
                ))}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {inboundStats.map((stat, index) => (
            <Card key={stat.title} className="p-4 card-premium">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <stat.icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Reception Control Panel */}
      <Card className="p-6 card-gradient border-secondary/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-secondary rounded-lg">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Reception Control</h3>
            <p className="text-sm text-muted-foreground">Configure AI receptionist settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reception Toggle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="reception-toggle" className="font-medium">Reception Status</Label>
              <Switch
                id="reception-toggle"
                checked={isReceptionActive}
                onCheckedChange={setIsReceptionActive}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {isReceptionActive 
                ? "AI receptionist is actively handling incoming calls. All inbound campaigns are active."
                : "Reception is paused - all inbound campaigns are inactive. Calls will go to voicemail."
              }
            </p>
          </div>

            {/* New Campaign Setup */}
            <div className="space-y-4">
              <Label>Add New Inbound Campaign</Label>
              <div className="flex space-x-2">
                <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select assistant" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAssistants.map((assistant) => (
                      <SelectItem key={assistant.id} value={assistant.id}>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-success rounded-full" />
                            <span>{assistant.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {assistant.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{assistant.number}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleNewCampaign} 
                  disabled={!selectedAssistant || !isReceptionActive}
                  className="btn-professional"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Campaign
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Each assistant will be assigned their dedicated phone number
              </p>
            </div>
        </div>
      </Card>

      {/* Active Campaigns & Recent Calls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Inbound Campaigns */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isReceptionActive ? 'bg-success animate-pulse' : 'bg-muted'}`} />
            Active Inbound Campaigns ({activeCampaigns.length})
          </h3>
          
          {activeCampaigns.length > 0 ? (
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <Card key={campaign.id} className="p-4 card-premium">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{campaign.assistant}</p>
                        <p className="text-sm text-muted-foreground">{campaign.number}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={
                          isReceptionActive 
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-muted/10 text-muted-foreground border-muted/20"
                        }
                      >
                        {isReceptionActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="hover:bg-muted">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Square className="w-4 h-4 mr-1" />
                      Stop
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLiveReport} className="hover:bg-muted">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Live Report
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveCampaign(campaign.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 card-premium border-dashed border-muted">
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <Headphones className="w-6 h-6 text-muted-foreground" />
                </div>
                <h4 className="font-medium mb-1">No Active Campaigns</h4>
                <p className="text-sm text-muted-foreground">Add an assistant to start receiving calls</p>
              </div>
            </Card>
          )}
        </div>

        {/* Recent Calls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Calls</h3>
          
          <div className="space-y-4">
            {recentCalls.map((call) => (
              <Card key={call.id} className="p-4 card-premium hover:shadow-glow transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{call.caller}</p>
                      <p className="text-xs text-muted-foreground">{call.duration} • {call.timestamp}</p>
                    </div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={
                      call.status === "Completed" 
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {call.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {call.summary}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}