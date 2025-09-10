import { useState } from "react";
import { Headphones, Clock, Users, PhoneForwarded, Play, Square, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import StatsCard from "@/components/dashboard/StatsCard";

export default function Inbound() {
  const [isReceptionActive, setIsReceptionActive] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState("customer-support");
  const [selectedNumber, setSelectedNumber] = useState("main-line");

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

  const assistants = [
    { id: "customer-support", name: "Customer Support Pro", type: "Support" },
    { id: "sales-assistant", name: "Sales Assistant", type: "Sales" },
    { id: "tech-support", name: "Technical Support", type: "Technical" }
  ];

  const phoneNumbers = [
    { id: "main-line", number: "+1 (555) 123-4567", label: "Main Line" },
    { id: "support-line", number: "+1 (555) 987-6543", label: "Support Line" },
    { id: "sales-line", number: "+1 (555) 456-7890", label: "Sales Line" }
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                ? "AI receptionist is actively handling incoming calls"
                : "Reception is paused - calls will go to voicemail"
              }
            </p>
          </div>

          {/* Assistant Selection */}
          <div className="space-y-2">
            <Label>Active Assistant</Label>
            <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {assistants.map((assistant) => (
                  <SelectItem key={assistant.id} value={assistant.id}>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>{assistant.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {assistant.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Number Selection */}
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Select value={selectedNumber} onValueChange={setSelectedNumber}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {phoneNumbers.map((number) => (
                  <SelectItem key={number.id} value={number.id}>
                    <div>
                      <p className="font-medium">{number.number}</p>
                      <p className="text-xs text-muted-foreground">{number.label}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Live Calls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Calls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <div className="w-3 h-3 bg-success rounded-full mr-2 animate-pulse" />
            Live Calls ({liveCalls.length})
          </h3>
          
          <div className="space-y-4">
            {liveCalls.map((call) => (
              <Card key={call.id} className="p-4 card-premium">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{call.caller}</p>
                      <p className="text-sm text-muted-foreground">{call.region} • {call.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={
                        call.status === "Active" 
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {call.status}
                    </Badge>
                    
                    {call.status === "Handover Requested" && (
                      <Button size="sm" className="btn-gradient">
                        <User className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground italic">
                    "{call.transcript}"
                  </p>
                </div>
              </Card>
            ))}
          </div>
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