import { useState } from "react";
import { Settings as SettingsIcon, Key, Phone, Webhook, User, CreditCard, Users, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const [vapiKey, setVapiKey] = useState("");
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [n8nWebhook, setN8nWebhook] = useState("");

  const connectionStatus = {
    vapi: false,
    twilio: false,
    n8n: false
  };

  const testConnection = (service: string) => {
    console.log(`Testing ${service} connection...`);
    // Connection testing logic would go here
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-poppins text-gradient-primary">
          Settings & Configuration
        </h2>
        <p className="text-muted-foreground">Manage your integrations and account settings</p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          {/* API Integrations */}
          <Card className="p-6 card-premium">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 border-2 border-blue-500 bg-blue-500/10 rounded-lg">
                <Key className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">API Integrations</h3>
                <p className="text-sm text-muted-foreground">Connect your external services</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Vapi Integration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 border-2 border-purple-500 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-purple-500 font-bold text-sm">V</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Vapi AI</h4>
                      <p className="text-sm text-muted-foreground">Voice AI platform integration</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={connectionStatus.vapi 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-destructive/10 text-destructive border-destructive/20"
                    }
                  >
                    {connectionStatus.vapi ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <Label htmlFor="vapi-key">API Key</Label>
                    <Input
                      id="vapi-key"
                      type="password"
                      placeholder="Enter your Vapi API key"
                      value={vapiKey}
                      onChange={(e) => setVapiKey(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={() => testConnection("Vapi")}
                      variant="outline"
                      className="w-full btn-ghost-premium"
                    >
                      Test Connection
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Twilio Integration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 border-2 border-teal-500 bg-teal-500/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Twilio</h4>
                      <p className="text-sm text-muted-foreground">Phone number and SMS services</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={connectionStatus.twilio 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-destructive/10 text-destructive border-destructive/20"
                    }
                  >
                    {connectionStatus.twilio ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twilio-sid">Account SID</Label>
                    <Input
                      id="twilio-sid"
                      type="password"
                      placeholder="AC..."
                      value={twilioSid}
                      onChange={(e) => setTwilioSid(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twilio-token">Auth Token</Label>
                    <Input
                      id="twilio-token"
                      type="password"
                      placeholder="Enter auth token"
                      value={twilioToken}
                      onChange={(e) => setTwilioToken(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={() => testConnection("Twilio")}
                  variant="outline"
                  className="btn-ghost-premium"
                >
                  Test Connection
                </Button>
              </div>

              <Separator />

              {/* N8N Integration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 border-2 border-amber-500 bg-amber-500/10 rounded-lg flex items-center justify-center">
                      <Webhook className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">N8N Automation</h4>
                      <p className="text-sm text-muted-foreground">Workflow automation webhooks</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={connectionStatus.n8n 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-destructive/10 text-destructive border-destructive/20"
                    }
                  >
                    {connectionStatus.n8n ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <Label htmlFor="n8n-webhook">Webhook URL</Label>
                    <Input
                      id="n8n-webhook"
                      placeholder="https://your-n8n-instance.com/webhook/..."
                      value={n8nWebhook}
                      onChange={(e) => setN8nWebhook(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={() => testConnection("N8N")}
                      className="w-full btn-action-primary"
                    >
                      Test Webhook
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-border/50">
              <Button className="btn-action-primary">
                Save Integration Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="p-6 card-premium">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 border-2 border-cyan-500 bg-cyan-500/10 rounded-lg">
                <User className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Account Information</h3>
                <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@company.com" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Corp" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-8 (Pacific Time)" />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="btn-gradient">Update Profile</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6 card-premium">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 border-2 border-green-500 bg-green-500/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">Manage your plan and billing details</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                <div>
                  <h4 className="font-semibold text-primary">Professional Plan</h4>
                  <p className="text-sm text-muted-foreground">$149/month • 10,000 calls included</p>
                </div>
                <Badge className="bg-primary text-primary-foreground">Active</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-2xl font-bold">3,247</p>
                  <p className="text-sm text-muted-foreground">Calls Used</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-2xl font-bold">6,753</p>
                  <p className="text-sm text-muted-foreground">Calls Remaining</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-2xl font-bold">Nov 15</p>
                  <p className="text-sm text-muted-foreground">Next Billing</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" className="btn-ghost-premium">View Invoices</Button>
              <Button className="btn-gradient">Upgrade Plan</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6 card-premium">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 border-2 border-indigo-500 bg-indigo-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Team Management</h3>
                  <p className="text-sm text-muted-foreground">Manage team members and permissions</p>
                </div>
              </div>
              
              <Button className="btn-gradient">
                Invite Member
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { name: "John Doe", email: "john@company.com", role: "Admin", status: "Active" },
                { name: "Jane Smith", email: "jane@company.com", role: "User", status: "Active" },
                { name: "Mike Johnson", email: "mike@company.com", role: "User", status: "Pending" }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 border-2 border-rose-500 bg-rose-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-rose-500 font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{member.role}</Badge>
                    <Badge 
                      variant="outline"
                      className={member.status === "Active" 
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {member.status}
                    </Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}