import { BarChart3, TrendingUp, DollarSign, Clock, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import StatsCard from "@/components/dashboard/StatsCard";

export default function Analytics() {
  const stats = [
    {
      title: "Total Calls",
      value: 2847,
      change: { value: "+23% from last month", type: "increase" as const },
      icon: BarChart3,
      gradient: "from-primary to-accent",
      iconStyle: "bordered" as const,
      iconColor: "text-blue-500"
    },
    {
      title: "Success Rate",
      value: "68.2%",
      change: { value: "+5.1% from last month", type: "increase" as const },
      icon: TrendingUp,
      gradient: "from-success to-success/80",
      iconStyle: "bordered" as const,
      iconColor: "text-green-500"
    },
    {
      title: "Total Cost",
      value: "$1,423.50",
      change: { value: "+12% from last month", type: "increase" as const },
      icon: DollarSign,
      gradient: "from-warning to-warning/80",
      iconStyle: "bordered" as const,
      iconColor: "text-amber-500"
    },
    {
      title: "Avg. Duration",
      value: "4m 32s",
      change: { value: "+45s from last month", type: "increase" as const },
      icon: Clock,
      gradient: "from-secondary to-primary",
      iconStyle: "bordered" as const,
      iconColor: "text-purple-500"
    }
  ];

  const outboundMetrics = [
    { label: "Campaigns Run", value: "23", change: "+4" },
    { label: "Contacts Reached", value: "1,856", change: "+340" },
    { label: "Conversion Rate", value: "24.3%", change: "+2.1%" },
    { label: "Cost per Lead", value: "$12.40", change: "-$1.20" }
  ];

  const inboundMetrics = [
    { label: "Calls Received", value: "991", change: "+89" },
    { label: "Handover Rate", value: "15.2%", change: "-2.3%" },
    { label: "Resolution Rate", value: "84.7%", change: "+3.1%" },
    { label: "Avg. Wait Time", value: "12s", change: "-5s" }
  ];

  const assistantPerformance = [
    { name: "Sales Assistant Pro", calls: 856, success: "72%", cost: "$423.20" },
    { name: "Customer Support", calls: 643, success: "89%", cost: "$321.50" },
    { name: "Lead Qualifier", calls: 512, success: "65%", cost: "$256.80" },
    { name: "Appointment Setter", calls: 387, success: "78%", cost: "$193.40" }
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-poppins text-gradient-accent">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">Performance metrics and insights</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <DatePickerWithRange />
          <Select defaultValue="all-assistants">
            <SelectTrigger className="w-48 filter-select-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-assistants">All Assistants</SelectItem>
              <SelectItem value="sales">Sales Assistant</SelectItem>
              <SelectItem value="support">Customer Support</SelectItem>
              <SelectItem value="qualifier">Lead Qualifier</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="btn-ghost-premium">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="btn-gradient">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Outbound Metrics */}
        <Card className="p-6 card-premium">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 border-2 border-purple-500 bg-purple-500/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Outbound Performance</h3>
              <p className="text-sm text-muted-foreground">Campaign and calling metrics</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {outboundMetrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{metric.value}</span>
                  <span className="text-xs text-success">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Inbound Metrics */}
        <Card className="p-6 card-premium">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 border-2 border-teal-500 bg-teal-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-teal-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Inbound Performance</h3>
              <p className="text-sm text-muted-foreground">Reception and handling metrics</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {inboundMetrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{metric.value}</span>
                  <span className={`text-xs ${metric.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Assistant Performance */}
      <Card className="p-6 card-premium">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 border-2 border-amber-500 bg-amber-500/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Assistant Performance</h3>
              <p className="text-sm text-muted-foreground">Individual AI assistant metrics</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="btn-ghost-premium">
            View Details
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Assistant</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Calls</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Success Rate</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {assistantPerformance.map((assistant, index) => (
                <tr key={assistant.name} className="border-b border-border/25 hover:bg-muted/25 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 border-2 border-blue-500 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <span className="text-blue-500 text-sm font-bold">
                          {assistant.name.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{assistant.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold">{assistant.calls.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-success font-semibold">{assistant.success}</span>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold">{assistant.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Chart Placeholder */}
      <Card className="p-6 card-premium">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 border-2 border-emerald-500 bg-emerald-500/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Call Volume Trends</h3>
            <p className="text-sm text-muted-foreground">30-day performance overview</p>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-muted/25 rounded-lg border-2 border-dashed border-border">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">Interactive Chart Component</p>
            <p className="text-sm text-muted-foreground">Recharts integration ready</p>
          </div>
        </div>
      </Card>
    </div>
  );
}