import { useState, useEffect } from "react";
import { Headphones, Clock, Users, PhoneForwarded, Play, User, Plus, X, Pause, BarChart3, Calendar, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import StatsCard from "@/components/dashboard/StatsCard";
import { useNavigate } from "react-router-dom";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function Inbound() {
  const navigate = useNavigate();
  const [isReceptionActive, setIsReceptionActive] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<{id: string, assistant: string} | null>(null);
  const [activeCampaigns, setActiveCampaigns] = useState([
    {
      id: "1",
      assistant: "Customer Support Pro",
      number: "+1 (555) 123-4567",
      status: "running" as "running" | "paused"
    }
  ]);
  const [buttonStates, setButtonStates] = useState<{[key: string]: {action: string, timestamp: number}}>({});
  const [campaignStates, setCampaignStates] = useState<{[key: string]: {
    status: "running" | "paused", 
    activeAction: "none" | "pause" | "resume" | "live"
  }}>({});

  // Initialize existing campaigns with default state
  useEffect(() => {
    activeCampaigns.forEach(campaign => {
      if (!campaignStates[campaign.id]) {
        setCampaignStates(prev => ({
          ...prev,
          [campaign.id]: {
            status: "running",
            activeAction: "none"
          }
        }));
      }
    });
  }, [activeCampaigns, campaignStates]);

  // Auto-pause/resume all inbound campaigns when reception status changes
  useEffect(() => {
    if (!isReceptionActive) {
      // When reception is turned off, pause all running campaigns
      setActiveCampaigns(prevCampaigns => 
        prevCampaigns.map(campaign => ({
          ...campaign,
          status: "paused" as "running" | "paused"
        }))
      );
      
      // Update all campaign states to paused
      setCampaignStates(prev => {
        const updatedStates = { ...prev };
        activeCampaigns.forEach(campaign => {
          if (updatedStates[campaign.id]) {
            updatedStates[campaign.id] = {
              status: "paused",
              activeAction: "pause"
            };
          }
        });
        return updatedStates;
      });
    } else {
      // When reception is turned back on, resume all paused campaigns
      setActiveCampaigns(prevCampaigns => 
        prevCampaigns.map(campaign => ({
          ...campaign,
          status: "running" as "running" | "paused"
        }))
      );
      
      // Update all campaign states to running
      setCampaignStates(prev => {
        const updatedStates = { ...prev };
        activeCampaigns.forEach(campaign => {
          if (updatedStates[campaign.id]) {
            updatedStates[campaign.id] = {
              status: "running",
              activeAction: "none"
            };
          }
        });
        return updatedStates;
      });
    }
  }, [isReceptionActive]);

  const stats = [
    {
      title: "Calls Received",
      value: 89,
      change: { value: "+15% from yesterday", type: "increase" as const },
      icon: Headphones,
      gradient: "from-secondary to-primary",
      iconStyle: "bordered" as const,
      iconColor: "text-blue-600"
    },
    {
      title: "Avg. Duration",
      value: "3m 45s",
      change: { value: "+30s from yesterday", type: "increase" as const },
      icon: Clock,
      gradient: "from-primary to-accent",
      iconStyle: "bordered" as const,
      iconColor: "text-emerald-500"
    },
    {
      title: "Handover Rate",
      value: "12%",
      change: { value: "-3% from yesterday", type: "decrease" as const },
      icon: PhoneForwarded,
      gradient: "from-accent to-secondary",
      iconStyle: "bordered" as const,
      iconColor: "text-orange-500"
    },
    {
      title: "Active Calls",
      value: 3,
      change: { value: "2 waiting", type: "neutral" as const },
      icon: Users,
      gradient: "from-warning to-warning/80",
      iconStyle: "bordered" as const,
      iconColor: "text-violet-500"
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

  const handleNewCampaign = () => {
    if (selectedAssistant) {
      const assistant = availableAssistants.find(a => a.id === selectedAssistant);
      if (assistant) {
        const newCampaignId = Date.now().toString();
        setActiveCampaigns([...activeCampaigns, {
          id: newCampaignId,
          assistant: assistant.name,
          number: assistant.number,
          status: "running" as "running" | "paused"
        }]);
        
        // Initialize campaign state
        setCampaignStates(prev => ({
          ...prev,
          [newCampaignId]: {
            status: "running",
            activeAction: "none"
          }
        }));
        
        setSelectedAssistant("");
      }
    }
  };

  const handleRemoveCampaign = (campaignId: string) => {
    const campaign = activeCampaigns.find(c => c.id === campaignId);
    if (campaign) {
      setCampaignToDelete({ id: campaignId, assistant: campaign.assistant });
      setShowDeleteDialog(true);
    }
  };

  const confirmRemoveCampaign = () => {
    if (campaignToDelete) {
      setActiveCampaigns(activeCampaigns.filter(c => c.id !== campaignToDelete.id));
      setShowDeleteDialog(false);
      setCampaignToDelete(null);
    }
  };

  const cancelRemoveCampaign = () => {
    setShowDeleteDialog(false);
    setCampaignToDelete(null);
  };

  const handleLiveReport = () => {
    navigate("/live-report");
  };

  // Helper function to get button color based on campaign state
  const getButtonColor = (campaignId: string, buttonType: 'pause' | 'live') => {
    const state = campaignStates[campaignId];
    if (!state) {
      return 'btn-state-blue'; // Default state - all buttons blue
    }
    
    const { activeAction } = state;
    
    switch (activeAction) {
      case 'pause':
        // When Pause is clicked: Pause/Resume → Orange, Live → Grey
        if (buttonType === 'pause') return 'btn-state-orange';
        return 'btn-state-grey'; // live disabled
        
      case 'resume':
        // When Resume is clicked: Pause/Resume → Green, Live → Blue
        if (buttonType === 'pause') return 'btn-state-green';
        return 'btn-state-blue'; // live active
        
      case 'live':
        // When Live is clicked: Live → Green, Pause/Resume → Blue
        if (buttonType === 'live') return 'btn-state-green';
        return 'btn-state-blue'; // pause active
        
      default:
        // Default state: All buttons blue
        return 'btn-state-blue';
    }
  };
  
  // Helper function to check if button should be disabled
  const isButtonDisabled = (campaignId: string, buttonType: 'pause' | 'live') => {
    const state = campaignStates[campaignId];
    if (!state) return false;
    
    const { activeAction } = state;
    
    // When Pause is clicked: Live is disabled
    if (activeAction === 'pause') {
      return buttonType === 'live';
    }
    
    // When Resume or Live is clicked: No buttons are disabled
    // Default state: No buttons are disabled
    return false;
  };
  
  // Helper function to get button text and icon for pause/resume
  const getPauseButtonContent = (campaignId: string) => {
    const state = campaignStates[campaignId];
    
    // If campaign is paused, show "Resume" button
    const isPaused = state?.status === "paused";
    
    if (isPaused) {
      return {
        icon: <Play className="w-4 h-4 mr-1" />,
        text: "Resume"
      };
    } else {
      return {
        icon: <Pause className="w-4 h-4 mr-1" />,
        text: "Pause"
      };
    }
  };

  const handlePause = (campaignId: string) => {
    const currentState = campaignStates[campaignId];
    const isCurrentlyPaused = currentState?.status === "paused";
    
    let newStatus: "running" | "paused";
    let newActiveAction: "none" | "pause" | "resume" | "live";
    
    if (isCurrentlyPaused) {
      // If currently paused, "Resume" button was clicked
      newStatus = "running";
      newActiveAction = "resume";
    } else {
      // If not paused, "Pause" button was clicked
      newStatus = "paused";
      newActiveAction = "pause";
    }
    
    // Update campaign status
    setActiveCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: newStatus }
          : campaign
      )
    );
    
    // Update campaign state for button colors
    setCampaignStates(prev => ({
      ...prev,
      [campaignId]: {
        status: newStatus,
        activeAction: newActiveAction
      }
    }));
    
    // Add button click feedback
    setButtonStates(prev => ({
      ...prev,
      [`${campaignId}-pause`]: { action: 'clicked', timestamp: Date.now() }
    }));
    
    // Remove click feedback after animation
    setTimeout(() => {
      setButtonStates(prev => {
        const newStates = { ...prev };
        delete newStates[`${campaignId}-pause`];
        return newStates;
      });
    }, 200);
  };

  const handleInboundLiveReport = (campaignId: string) => {
    // Update campaign state for button colors
    setCampaignStates(prev => ({
      ...prev,
      [campaignId]: {
        ...prev[campaignId],
        activeAction: "live"
      }
    }));
    
    // Add button click feedback
    setButtonStates(prev => ({
      ...prev,
      [`${campaignId}-report`]: { action: 'clicked', timestamp: Date.now() }
    }));
    
    // Remove click feedback after animation
    setTimeout(() => {
      setButtonStates(prev => {
        const newStates = { ...prev };
        delete newStates[`${campaignId}-report`];
        return newStates;
      });
    }, 200);
    
    console.log("Live report activated for inbound campaign:", campaignId);
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

      {/* Inbound Analysis Section */}
      <Card className="p-6 card-premium">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Inbound Analysis</h3>
          <div className="flex items-center space-x-3">
            <DatePickerWithRange />
            <Select defaultValue="all-assistants">
              <SelectTrigger className="w-40 filter-select-trigger">
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
            <Button size="sm" className="btn-action-primary">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button size="sm" className="btn-action-primary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.slice(0, 3).map((stat, index) => (
            <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
              <StatsCard {...stat} />
            </div>
          ))}
          <div style={{ animationDelay: "300ms" }} className="animate-slide-up">
            <StatsCard 
              title="Active Calls"
              value={stats[3].value}
              change={stats[3].change}
              icon={stats[3].icon}
              gradient={stats[3].gradient}
              iconStyle="bordered"
              iconColor="text-violet-500"
            />
          </div>
        </div>
      </Card>

      {/* Reception Control Panel */}
      <Card className="p-6 card-gradient border-secondary/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg border-2 border-blue-500 bg-blue-500/10">
            <Headphones className="w-5 h-5 text-blue-500" />
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
                  <SelectTrigger className="flex-1 filter-select-trigger">
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
                  className="btn-action-primary"
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
                      <div className="w-10 h-10 border-2 border-cyan-500 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-cyan-500" />
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
                          isReceptionActive && campaignStates[campaign.id]?.status !== "paused"
                            ? "bg-success/10 text-success border-success/20"
                            : campaignStates[campaign.id]?.status === "paused"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-muted/10 text-muted-foreground border-muted/20"
                        }
                      >
                        {!isReceptionActive 
                          ? "Inactive" 
                          : campaignStates[campaign.id]?.status === "paused" 
                          ? "Paused" 
                          : "Active"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handlePause(campaign.id)}
                      disabled={isButtonDisabled(campaign.id, 'pause')}
                      className={`
                        ${getButtonColor(campaign.id, 'pause')}
                        ${buttonStates[`${campaign.id}-pause`]?.action === 'clicked' ? 'btn-clicked' : ''}
                      `}
                    >
                      {getPauseButtonContent(campaign.id).icon}
                      {getPauseButtonContent(campaign.id).text}
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleInboundLiveReport(campaign.id)}
                      disabled={isButtonDisabled(campaign.id, 'live')}
                      className={`
                        ${getButtonColor(campaign.id, 'live')}
                        ${buttonStates[`${campaign.id}-report`]?.action === 'clicked' ? 'btn-clicked' : ''}
                      `}
                    >
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Live
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveCampaign(campaign.id)}
                      className="btn-professional-ghost text-destructive hover:bg-destructive/10 hover:text-destructive"
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
              <Card key={call.id} className="p-4 card-premium hover:border-blue-500 hover:border-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border-2 border-slate-500 bg-slate-500/10 rounded-lg flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-slate-500" />
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

      {/* Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the campaign "{campaignToDelete?.assistant}"? 
              This action cannot be undone and the campaign will be stopped immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelRemoveCampaign}>
              Keep Campaign
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemoveCampaign}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Campaign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}