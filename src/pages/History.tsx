import { useState } from "react";
import { Calendar, Clock, Phone, Headphones, User, CheckCircle, XCircle, Filter, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const outboundCampaigns = [
    {
      id: "1",
      name: "Q4 Lead Generation",
      assistant: "Sales Assistant Pro",
      type: "outbound",
      status: "completed",
      totalCalls: 1250,
      successRate: "27.4%",
      date: "2024-02-09"
    },
    {
      id: "2", 
      name: "Holiday Promotions",
      assistant: "Customer Support",
      type: "outbound",
      status: "active",
      totalCalls: 856,
      successRate: "31.2%",
      date: "2024-02-08"
    }
  ];

  const inboundCampaigns = [
    {
      id: "3",
      name: "Customer Support Line",
      assistant: "Customer Support Pro",
      type: "inbound",
      status: "active",
      totalCalls: 342,
      successRate: "94.2%",
      date: "2024-02-09"
    },
    {
      id: "4",
      name: "Sales Inquiries",
      assistant: "Sales Assistant",
      type: "inbound", 
      status: "completed",
      totalCalls: 167,
      successRate: "89.1%",
      date: "2024-02-08"
    }
  ];

  const callLogs = [
    {
      id: "1",
      number: "+1 (555) 123-4567",
      assistantName: "Sales Assistant Pro",
      endReason: "Call Completed",
      successEvaluation: "Success",
      startTime: "2024-02-09 14:30:22",
      duration: "3m 45s",
      cost: "$0.12"
    },
    {
      id: "2",
      number: "+1 (555) 987-6543", 
      assistantName: "Sales Assistant Pro",
      endReason: "Voicemail",
      successEvaluation: "No Answer",
      startTime: "2024-02-09 14:25:15",
      duration: "1m 02s",
      cost: "$0.03"
    },
    {
      id: "3",
      number: "+1 (555) 456-7890",
      assistantName: "Sales Assistant Pro", 
      endReason: "Call Declined",
      successEvaluation: "Failed",
      startTime: "2024-02-09 14:20:08",
      duration: "0m 15s",
      cost: "$0.01"
    },
    {
      id: "4",
      number: "+1 (555) 234-5678",
      assistantName: "Sales Assistant Pro",
      endReason: "Call Completed",
      successEvaluation: "Success",
      startTime: "2024-02-09 14:15:33",
      duration: "5m 12s", 
      cost: "$0.18"
    },
    {
      id: "5",
      number: "+1 (555) 345-6789",
      assistantName: "Sales Assistant Pro",
      endReason: "Busy Signal",
      successEvaluation: "No Answer",
      startTime: "2024-02-09 14:10:41",
      duration: "0m 08s",
      cost: "$0.01"
    }
  ];

  const handleCampaignClick = (campaign: any) => {
    setSelectedCampaign(campaign);
  };

  const getSuccessIcon = (evaluation: string) => {
    return evaluation === "Success" ? 
      <CheckCircle className="w-4 h-4 text-success" /> : 
      <XCircle className="w-4 h-4 text-destructive" />;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted/20">
        Completed
      </Badge>
    );
  };

  if (selectedCampaign) {
    return (
      <div className="space-y-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedCampaign(null)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <div>
              <h2 className="text-2xl font-bold font-poppins text-gradient-primary">
                {selectedCampaign.name} - Call Logs
              </h2>
              <p className="text-muted-foreground">
                {selectedCampaign.assistant} • {selectedCampaign.totalCalls} total calls
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select defaultValue="all-calls">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Calls" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-calls">All Calls</SelectItem>
                <SelectItem value="success">Success Only</SelectItem>
                <SelectItem value="failed">Failed Only</SelectItem>
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

        {/* Call Logs Table */}
        <Card className="p-6 card-premium">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone Number</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Assistant</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">End Reason</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Success</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Start Time</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cost</th>
                </tr>
              </thead>
              <tbody>
                {callLogs.map((call) => (
                  <tr key={call.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono">{call.number}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>{call.assistantName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{call.endReason}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getSuccessIcon(call.successEvaluation)}
                        <span className="text-sm">{call.successEvaluation}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono">{call.startTime}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-mono">{call.duration}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-primary">{call.cost}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-poppins text-gradient-primary">
            Campaign History
          </h2>
          <p className="text-muted-foreground">View all inbound and outbound campaign records</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <DatePickerWithRange />
          <Select defaultValue="all-campaigns">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-campaigns">All Campaigns</SelectItem>
              <SelectItem value="outbound">Outbound Only</SelectItem>
              <SelectItem value="inbound">Inbound Only</SelectItem>
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

      {/* Campaign Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Outbound Campaigns */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Phone className="w-5 h-5 mr-2 text-primary" />
            Outbound Campaigns ({outboundCampaigns.length})
          </h3>
          
          <div className="space-y-4">
            {outboundCampaigns.map((campaign) => (
              <Card 
                key={campaign.id} 
                className="p-4 card-premium hover:shadow-glow transition-all duration-300 cursor-pointer"
                onClick={() => handleCampaignClick(campaign)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.assistant}</p>
                    </div>
                  </div>
                  
                  {getStatusBadge(campaign.status)}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Calls</p>
                    <p className="font-medium">{campaign.totalCalls}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-medium">{campaign.successRate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{campaign.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Inbound Campaigns */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Headphones className="w-5 h-5 mr-2 text-secondary" />
            Inbound Campaigns ({inboundCampaigns.length})
          </h3>
          
          <div className="space-y-4">
            {inboundCampaigns.map((campaign) => (
              <Card 
                key={campaign.id} 
                className="p-4 card-premium hover:shadow-glow transition-all duration-300 cursor-pointer"
                onClick={() => handleCampaignClick(campaign)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.assistant}</p>
                    </div>
                  </div>
                  
                  {getStatusBadge(campaign.status)}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Calls</p>
                    <p className="font-medium">{campaign.totalCalls}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-medium">{campaign.successRate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{campaign.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}