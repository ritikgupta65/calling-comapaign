import { useState } from "react";
import { Phone, Headphones, Clock, DollarSign, CheckCircle, XCircle, AlertCircle, User, Calendar, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function History() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const outboundCampaigns = [
    {
      id: "1",
      name: "Q4 Lead Generation",
      assistant: "Sales Assistant Pro",
      number: "+1 (555) 123-4567",
      status: "Completed",
      totalCalls: 1250,
      startDate: "2024-01-20",
      endDate: "2024-02-09"
    },
    {
      id: "2", 
      name: "Product Demo Outreach",
      assistant: "Lead Qualifier",
      number: "+1 (555) 456-7890", 
      status: "Active",
      totalCalls: 890,
      startDate: "2024-02-01",
      endDate: null
    }
  ];

  const inboundCampaigns = [
    {
      id: "3",
      name: "Customer Support Line",
      assistant: "Customer Support Pro",
      number: "+1 (555) 987-6543",
      status: "Active",
      totalCalls: 2340,
      startDate: "2024-01-15",
      endDate: null
    },
    {
      id: "4",
      name: "Sales Inquiry Line", 
      assistant: "Sales Assistant",
      number: "+1 (555) 234-5678",
      status: "Paused",
      totalCalls: 567,
      startDate: "2024-01-25",
      endDate: null
    }
  ];

  const callDetails = [
    {
      id: "1",
      number: "+1 (555) 111-2222",
      assistantName: "Sales Assistant Pro",
      endReason: "Completed Successfully",
      successEvaluation: "High Interest",
      startTime: "2024-02-09 14:30:22",
      duration: "4m 32s",
      cost: "$0.23"
    },
    {
      id: "2",
      number: "+1 (555) 333-4444", 
      assistantName: "Sales Assistant Pro",
      endReason: "No Answer",
      successEvaluation: "No Contact",
      startTime: "2024-02-09 14:35:15",
      duration: "0m 45s",
      cost: "$0.04"
    },
    {
      id: "3",
      number: "+1 (555) 555-6666",
      assistantName: "Sales Assistant Pro", 
      endReason: "Call Declined",
      successEvaluation: "Not Interested",
      startTime: "2024-02-09 14:40:10",
      duration: "1m 12s",
      cost: "$0.08"
    },
    {
      id: "4",
      number: "+1 (555) 777-8888",
      assistantName: "Sales Assistant Pro",
      endReason: "Transferred to Human", 
      successEvaluation: "Qualified Lead",
      startTime: "2024-02-09 14:45:30",
      duration: "6m 45s",
      cost: "$0.34"
    },
    {
      id: "5",
      number: "+1 (555) 999-0000",
      assistantName: "Sales Assistant Pro",
      endReason: "Completed Successfully",
      successEvaluation: "Meeting Scheduled",
      startTime: "2024-02-09 14:52:18",
      duration: "8m 23s", 
      cost: "$0.42"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success/10 text-success border-success/20";
      case "Active": return "bg-primary/10 text-primary border-primary/20";
      case "Paused": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getEndReasonIcon = (reason: string) => {
    switch (reason) {
      case "Completed Successfully": return <CheckCircle className="w-4 h-4 text-success" />;
      case "Transferred to Human": return <User className="w-4 h-4 text-primary" />;
      case "No Answer": case "Call Declined": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getSuccessColor = (evaluation: string) => {
    switch (evaluation) {
      case "High Interest": case "Qualified Lead": case "Meeting Scheduled": 
        return "bg-success/10 text-success border-success/20";
      case "Not Interested": case "No Contact":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-warning/10 text-warning border-warning/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-poppins text-gradient-primary">
            Campaign History
          </h2>
          <p className="text-muted-foreground">View all campaigns and detailed call logs</p>
        </div>
      </div>

      {selectedCampaign ? (
        /* Call Details View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
              ← Back to Campaigns
            </Button>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {callDetails.length} Total Calls
              </Badge>
            </div>
          </div>

          <Card className="p-6 card-premium">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Call Details</h3>
              <div className="flex items-center space-x-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by Result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Calls</SelectItem>
                    <SelectItem value="successful">Successful</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="transferred">Transferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {callDetails.map((call) => (
                <Card key={call.id} className="p-4 card-premium hover:shadow-sm transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{call.number}</span>
                    </div>

                    <div className="text-sm">
                      <p className="font-medium">{call.assistantName}</p>
                      <p className="text-muted-foreground">AI Assistant</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getEndReasonIcon(call.endReason)}
                      <span className="text-sm">{call.endReason}</span>
                    </div>

                    <div>
                      <Badge variant="outline" className={getSuccessColor(call.successEvaluation)}>
                        {call.successEvaluation}
                      </Badge>
                    </div>

                    <div className="text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(call.startTime).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{call.duration}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <DollarSign className="w-3 h-3" />
                        <span>{call.cost}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        /* Campaign List View */
        <Tabs defaultValue="outbound" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="outbound" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Outbound Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="inbound" className="flex items-center space-x-2">
              <Headphones className="w-4 h-4" />
              <span>Inbound Campaigns</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="outbound" className="space-y-4">
            {outboundCampaigns.map((campaign) => (
              <Card key={campaign.id} className="p-6 card-premium hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Assistant: {campaign.assistant} • Number: {campaign.number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Started: {new Date(campaign.startDate).toLocaleDateString()}
                      {campaign.endDate && ` • Ended: ${new Date(campaign.endDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted/20">
                      {campaign.totalCalls} calls
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedCampaign(campaign.id)}
                  className="w-full"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Call Details
                </Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="inbound" className="space-y-4">
            {inboundCampaigns.map((campaign) => (
              <Card key={campaign.id} className="p-6 card-premium hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Assistant: {campaign.assistant} • Number: {campaign.number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Started: {new Date(campaign.startDate).toLocaleDateString()}
                      {campaign.endDate && ` • Ended: ${new Date(campaign.endDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted/20">
                      {campaign.totalCalls} calls
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedCampaign(campaign.id)}
                  className="w-full"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Call Details
                </Button>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}