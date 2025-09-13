import { useState } from "react";
import { Upload, Play, Square, Pause, Users, Phone, Bot, Settings, BarChart3, X, Calendar, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface CampaignSetupProps {
  onCampaignStart: (config: any) => void;
  activeCampaign?: any;
}

export default function CampaignSetup({ onCampaignStart, activeCampaign }: CampaignSetupProps) {
  const navigate = useNavigate();
  
  const assistants = [
    { id: "1", name: "Sales Assistant Pro", type: "Sales", status: "active", number: "+1 (555) 123-4567" },
    { id: "2", name: "Customer Support", type: "Support", status: "active", number: "+1 (555) 987-6543" },
    { id: "3", name: "Lead Qualifier", type: "Qualification", status: "active", number: "+1 (555) 456-7890" },
    { id: "4", name: "Appointment Setter", type: "Scheduling", status: "active", number: "+1 (555) 234-5678" }
  ];

  const [campaignName, setCampaignName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [parallelCalls, setParallelCalls] = useState([3]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState<"running" | "paused" | "stopped">("running");
  const [activeCampaigns, setActiveCampaigns] = useState<any[]>([]);
  const [availableAssistants, setAvailableAssistants] = useState(assistants);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    // File processing logic would go here
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0] && files[0].type === "text/csv") {
      handleFileUpload(files[0]);
    }
  };

  const handleStartCampaign = () => {
    const selectedAssistantData = availableAssistants.find(a => a.id === selectedAssistant);
    if (selectedAssistantData && campaignName && selectedFile) {
      const newCampaign = {
        id: Date.now().toString(),
        name: campaignName,
        assistant: selectedAssistantData.name,
        number: selectedAssistantData.number,
        status: "active",
        total: 1250,
        completed: 342,
        pending: 756,
        failed: 152,
        startTime: "Just now"
      };
      
      setActiveCampaigns([...activeCampaigns, newCampaign]);
      setAvailableAssistants(availableAssistants.filter(a => a.id !== selectedAssistant));
      
      // Reset form
      setCampaignName("");
      setSelectedFile(null);
      setSelectedAssistant("");
    }
  };

  const handleRemoveCampaign = (campaignId: string) => {
    const campaignToRemove = activeCampaigns.find(c => c.id === campaignId);
    if (campaignToRemove) {
      const assistantToRestore = assistants.find(a => a.name === campaignToRemove.assistant);
      if (assistantToRestore) {
        setAvailableAssistants([...availableAssistants, assistantToRestore]);
      }
      setActiveCampaigns(activeCampaigns.filter(c => c.id !== campaignId));
    }
  };

  const handlePause = () => {
    setCampaignStatus(campaignStatus === "paused" ? "running" : "paused");
    console.log("Toggling campaign pause");
  };

  const handleStop = () => {
    setCampaignStatus("stopped");
    console.log("Stopping campaign");
  };

  const handleLiveReport = () => {
    navigate("/live-report");
  };

  const outboundStats = [
    { title: "Total Calls", value: "3,247", icon: Phone },
    { title: "Success Rate", value: "27.4%", icon: BarChart3 },
    { title: "Total Cost", value: "$162.35", icon: Users },
    { title: "Avg. Duration", value: "3m 45s", icon: Settings }
  ];

  // Use activeCampaigns instead of single activeCampaign for rendering
  const campaignsToShow = activeCampaigns.length > 0 ? activeCampaigns : (activeCampaign ? [activeCampaign] : []);

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-poppins text-gradient-primary">
            Outbound Campaigns
          </h2>
          <p className="text-muted-foreground">AI-powered automated calling</p>
        </div>
        
        {campaignsToShow.length > 0 && (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-4 py-2">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            {campaignsToShow.length} Campaign{campaignsToShow.length > 1 ? 's' : ''} Active
          </Badge>
        )}
      </div>


      {/* New Campaign Setup Form */}
      <Card className="p-6 card-premium">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Play className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">New Campaign Setup</h3>
            <p className="text-sm text-muted-foreground">Configure your AI calling campaign</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Campaign Name */}
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                placeholder="e.g., Q4 Lead Generation"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="transition-all duration-300"
              />
            </div>

            {/* CSV Upload */}
            <div className="space-y-2">
              <Label>Contact List (CSV)</Label>
              <div
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer
                  ${isDragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                `}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                {selectedFile ? (
                  <div>
                    <p className="font-medium text-success">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready to upload
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">Drop your CSV file here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Assistant Selection */}
            <div className="space-y-2">
              <Label>AI Assistant</Label>
              <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Choose an assistant" />
                </SelectTrigger>
                <SelectContent>
                  {availableAssistants.map((assistant) => (
                    <SelectItem key={assistant.id} value={assistant.id}>
                      <div className="flex items-center space-x-3">
                        <Bot className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium">{assistant.name}</p>
                          <p className="text-xs text-muted-foreground">{assistant.type} • {assistant.number}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {availableAssistants.length === 0 && (
                <p className="text-xs text-muted-foreground">All assistants are currently assigned to active campaigns</p>
              )}
            </div>

            {/* Parallel Calls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Parallel Calls</Label>
                <span className="text-sm font-medium">{parallelCalls[0]}</span>
              </div>
              <Slider
                value={parallelCalls}
                onValueChange={setParallelCalls}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Number of simultaneous calls to make
              </p>
            </div>

            {/* Start Campaign Button */}
            <Button 
              onClick={handleStartCampaign}
              disabled={!campaignName || !selectedFile || !selectedAssistant}
              className="w-full btn-professional"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Campaign
            </Button>
          </div>
        </div>
      </Card>

      {/* Active Campaign Status */}
      {campaignsToShow.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Campaigns ({campaignsToShow.length})</h3>
          {campaignsToShow.map((campaign) => (
            <Card key={campaign.id} className="p-6 card-premium border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{campaign.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Assistant: {campaign.assistant} • Number: {campaign.number}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.total} contacts • Started {campaign.startTime}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={campaignStatus === "paused" ? "success" : "outline"} 
                    size="sm" 
                    onClick={handlePause}
                  >
                    {campaignStatus === "paused" ? (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    )}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleStop}>
                    <Square className="w-4 h-4 mr-1" />
                    Stop
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLiveReport}>
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
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(((campaign.completed + campaign.failed) / campaign.total) * 100)}% Complete</span>
                </div>
                
                {/* Three-color Progress Bar */}
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  {/* Connected (Green) */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-success transition-all duration-300"
                    style={{ width: `${(campaign.completed / campaign.total) * 100}%` }}
                  />
                  {/* Failed (Red) */}
                  <div 
                    className="absolute top-0 h-full bg-destructive transition-all duration-300"
                    style={{ 
                      left: `${(campaign.completed / campaign.total) * 100}%`, 
                      width: `${(campaign.failed / campaign.total) * 100}%` 
                    }}
                  />
                  {/* Pending (Orange) - fills remaining space */}
                  <div 
                    className="absolute top-0 h-full bg-warning transition-all duration-300"
                    style={{ 
                      left: `${((campaign.completed + campaign.failed) / campaign.total) * 100}%`, 
                      width: `${(campaign.pending / campaign.total) * 100}%` 
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>Connected ({campaign.completed})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-warning rounded-full" />
                      <span>Pending ({campaign.pending})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                      <span>Failed ({campaign.failed})</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-muted-foreground">{campaign.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{campaign.completed}</p>
                    <p className="text-xs text-muted-foreground">Connected</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">{campaign.pending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-destructive">{campaign.failed}</p>
                    <p className="text-xs text-muted-foreground">Failed</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 card-premium border-dashed border-muted">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Outbound Campaign Active</h3>
            <p className="text-muted-foreground">Start a new campaign to begin making calls</p>
          </div>
        </Card>
      )}
    </div>
  );
}