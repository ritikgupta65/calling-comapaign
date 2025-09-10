import { useState } from "react";
import { Upload, Play, Square, Pause, Users, Phone, Bot, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CampaignSetupProps {
  onCampaignStart: (config: any) => void;
  activeCampaign?: any;
}

export default function CampaignSetup({ onCampaignStart, activeCampaign }: CampaignSetupProps) {
  const [campaignName, setCampaignName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [parallelCalls, setParallelCalls] = useState([3]);
  const [isDragOver, setIsDragOver] = useState(false);

  const assistants = [
    { id: "1", name: "Sales Assistant Pro", type: "Sales", status: "active" },
    { id: "2", name: "Customer Support", type: "Support", status: "active" },
    { id: "3", name: "Lead Qualifier", type: "Qualification", status: "active" },
    { id: "4", name: "Appointment Setter", type: "Scheduling", status: "active" }
  ];

  const twilioNumbers = [
    { id: "1", number: "+1 (555) 123-4567", location: "New York" },
    { id: "2", number: "+1 (555) 987-6543", location: "California" },
    { id: "3", number: "+1 (555) 456-7890", location: "Texas" }
  ];

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
    const config = {
      name: campaignName,
      file: selectedFile,
      assistant: selectedAssistant,
      number: selectedNumber,
      parallelCalls: parallelCalls[0]
    };
    onCampaignStart(config);
  };

  const campaignProgress = activeCampaign ? 
    ((activeCampaign.completed + activeCampaign.failed) / activeCampaign.total) * 100 : 0;

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
        
        {activeCampaign && (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-4 py-2">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            Campaign Active
          </Badge>
        )}
      </div>

      {/* Active Campaign Status */}
      {activeCampaign && (
        <Card className="p-6 card-gradient border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{activeCampaign.name}</h3>
              <p className="text-sm text-muted-foreground">
                {activeCampaign.total} contacts • Started {activeCampaign.startTime}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-warning text-warning hover:bg-warning/10">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(campaignProgress)}% Complete</span>
            </div>
            <Progress value={campaignProgress} className="h-2" />
            
            <div className="grid grid-cols-4 gap-4 pt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-muted-foreground">{activeCampaign.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{activeCampaign.completed}</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{activeCampaign.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{activeCampaign.failed}</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Campaign Setup Form */}
      <Card className="p-6 card-premium">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Play className="w-5 h-5 text-white" />
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
                className="transition-all duration-300 focus:shadow-glow"
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
                <SelectTrigger className="transition-all duration-300 focus:shadow-glow">
                  <SelectValue placeholder="Choose an assistant" />
                </SelectTrigger>
                <SelectContent>
                  {assistants.map((assistant) => (
                    <SelectItem key={assistant.id} value={assistant.id}>
                      <div className="flex items-center space-x-3">
                        <Bot className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium">{assistant.name}</p>
                          <p className="text-xs text-muted-foreground">{assistant.type}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone Number Selection */}
            <div className="space-y-2">
              <Label>Twilio Number</Label>
              <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                <SelectTrigger className="transition-all duration-300 focus:shadow-glow">
                  <SelectValue placeholder="Select a phone number" />
                </SelectTrigger>
                <SelectContent>
                  {twilioNumbers.map((number) => (
                    <SelectItem key={number.id} value={number.id}>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium">{number.number}</p>
                          <p className="text-xs text-muted-foreground">{number.location}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Parallel Calls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Parallel Calls</Label>
                <Badge variant="outline">{parallelCalls[0]} concurrent</Badge>
              </div>
              <Slider
                value={parallelCalls}
                onValueChange={setParallelCalls}
                max={10}
                min={1}
                step={1}
                className="transition-all duration-300"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative (1)</span>
                <span>Aggressive (10)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border/50">
          <Button variant="outline" className="btn-ghost-premium">
            <Settings className="w-4 h-4 mr-2" />
            Advanced Settings
          </Button>
          <Button 
            onClick={handleStartCampaign}
            disabled={!campaignName || !selectedFile || !selectedAssistant || !selectedNumber}
            className="btn-hero"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Campaign
          </Button>
        </div>
      </Card>
    </div>
  );
}