import { useState } from "react";
import { ArrowLeft, Download, Phone, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface Contact {
  id: string;
  name: string;
  phone: string;
  status: "not-called" | "calling" | "connected" | "failed" | "spam";
  duration?: string;
  transcript?: string;
  timestamp?: string;
}

export default function LiveReport() {
  const navigate = useNavigate();
  const [campaignData] = useState({
    name: "Q4 Lead Generation",
    total: 1250,
    completed: 342,
    pending: 756,
    failed: 152,
    startTime: "2 hours ago",
    progress: 27.4
  });

  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      status: "connected",
      duration: "3m 45s",
      transcript: "Interested in pricing, requested quote",
      timestamp: "2 hours ago"
    },
    {
      id: "2", 
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      status: "failed",
      timestamp: "2 hours ago"
    },
    {
      id: "3",
      name: "Mike Davis",
      phone: "+1 (555) 456-7890", 
      status: "connected",
      duration: "2m 12s",
      transcript: "Asked for demo, scheduled for next week",
      timestamp: "1 hour ago"
    },
    {
      id: "4",
      name: "Emily Wilson",
      phone: "+1 (555) 234-5678",
      status: "spam",
      timestamp: "1 hour ago"
    },
    {
      id: "5",
      name: "David Brown",
      phone: "+1 (555) 345-6789",
      status: "calling",
      timestamp: "Just now"
    },
    {
      id: "6",
      name: "Lisa Anderson",
      phone: "+1 (555) 567-8901",
      status: "not-called"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-success/10 text-success border-success/20";
      case "failed": return "bg-destructive/10 text-destructive border-destructive/20";
      case "spam": return "bg-warning/10 text-warning border-warning/20";
      case "calling": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected": return <CheckCircle className="w-4 h-4" />;
      case "failed": return <XCircle className="w-4 h-4" />;
      case "spam": return <AlertTriangle className="w-4 h-4" />;
      case "calling": return <Phone className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const connectedPercentage = (campaignData.completed / campaignData.total) * 100;
  const pendingPercentage = (campaignData.pending / campaignData.total) * 100;
  const failedPercentage = (campaignData.failed / campaignData.total) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold font-poppins">{campaignData.name}</h1>
              <p className="text-muted-foreground">Live Campaign Report</p>
            </div>
          </div>
          
          <Button variant="outline" className="hover:bg-muted">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 card-premium">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Campaign Progress</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {campaignData.progress}% Complete
              </Badge>
            </div>
            
            {/* Multi-color Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress Overview</span>
                <span>{campaignData.completed + campaignData.failed} / {campaignData.total} calls</span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-success transition-all duration-300"
                  style={{ width: `${connectedPercentage}%` }}
                />
                <div 
                  className="absolute top-0 h-full bg-destructive transition-all duration-300"
                  style={{ 
                    left: `${connectedPercentage}%`, 
                    width: `${failedPercentage}%` 
                  }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Connected ({campaignData.completed})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-destructive rounded-full" />
                    <span>Failed ({campaignData.failed})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-muted rounded-full" />
                    <span>Pending ({campaignData.pending})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4 card-premium">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaignData.total}</p>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-premium">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaignData.completed}</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-premium">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaignData.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-premium">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaignData.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact List */}
        <Card className="card-premium">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Contact Details</h3>
            <p className="text-sm text-muted-foreground">Detailed view of all contacts in this campaign</p>
          </div>
          
          <div className="divide-y">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getStatusIcon(contact.status)}
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {contact.duration && (
                      <span className="text-sm text-muted-foreground">{contact.duration}</span>
                    )}
                    {contact.timestamp && (
                      <span className="text-sm text-muted-foreground">{contact.timestamp}</span>
                    )}
                    <Badge variant="outline" className={getStatusColor(contact.status)}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1).replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                
                {contact.transcript && (
                  <div className="mt-3 ml-14">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground italic">"{contact.transcript}"</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}