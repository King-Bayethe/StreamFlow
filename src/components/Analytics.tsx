import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  DollarSign, 
  Eye, 
  MessageCircle,
  Gift,
  Target,
  Calendar,
  Activity,
  Zap,
  Crown,
  Star,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from "recharts";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for charts
  const viewerData = [
    { date: "Mon", viewers: 1200, revenue: 45.20, watchTime: 2.5 },
    { date: "Tue", viewers: 1850, revenue: 68.50, watchTime: 3.2 },
    { date: "Wed", viewers: 2100, revenue: 89.75, watchTime: 3.8 },
    { date: "Thu", viewers: 1650, revenue: 52.30, watchTime: 2.9 },
    { date: "Fri", viewers: 2800, revenue: 125.40, watchTime: 4.1 },
    { date: "Sat", viewers: 3200, revenue: 189.60, watchTime: 5.2 },
    { date: "Sun", viewers: 2950, revenue: 165.80, watchTime: 4.8 },
  ];

  const engagementHeatmap = [
    { hour: "00:00", engagement: 15 },
    { hour: "01:00", engagement: 8 },
    { hour: "02:00", engagement: 5 },
    { hour: "03:00", engagement: 3 },
    { hour: "04:00", engagement: 2 },
    { hour: "05:00", engagement: 4 },
    { hour: "06:00", engagement: 12 },
    { hour: "07:00", engagement: 25 },
    { hour: "08:00", engagement: 45 },
    { hour: "09:00", engagement: 65 },
    { hour: "10:00", engagement: 75 },
    { hour: "11:00", engagement: 85 },
    { hour: "12:00", engagement: 95 },
    { hour: "13:00", engagement: 88 },
    { hour: "14:00", engagement: 92 },
    { hour: "15:00", engagement: 78 },
    { hour: "16:00", engagement: 85 },
    { hour: "17:00", engagement: 95 },
    { hour: "18:00", engagement: 100 },
    { hour: "19:00", engagement: 98 },
    { hour: "20:00", engagement: 95 },
    { hour: "21:00", engagement: 88 },
    { hour: "22:00", engagement: 75 },
    { hour: "23:00", engagement: 45 },
  ];

  const revenueBreakdown = [
    { name: "Tips", value: 1250.50, color: "hsl(var(--primary))" },
    { name: "Subscriptions", value: 890.25, color: "hsl(var(--secondary))" },
    { name: "Merchandise", value: 450.75, color: "hsl(var(--accent))" },
    { name: "Sponsorships", value: 750.00, color: "hsl(var(--muted-foreground))" },
  ];

  const topTippers = [
    { id: 1, username: "StreamSupporter42", amount: 125.50, tips: 15, avatar: "/placeholder.svg" },
    { id: 2, username: "GenerousViewer", amount: 98.75, tips: 12, avatar: "/placeholder.svg" },
    { id: 3, username: "BigTipper", amount: 87.25, tips: 8, avatar: "/placeholder.svg" },
    { id: 4, username: "LoyalFan99", amount: 76.50, tips: 18, avatar: "/placeholder.svg" },
    { id: 5, username: "StreamLover", amount: 65.25, tips: 10, avatar: "/placeholder.svg" },
  ];

  const keyMetrics = {
    peakViewers: 3250,
    avgWatchTime: "12m 35s",
    chatConversionRate: 8.4,
    followerGrowth: 156,
    totalRevenue: 3341.50,
    monthlyGrowth: 15.7
  };

  const getEngagementColor = (value: number) => {
    if (value >= 80) return "hsl(var(--primary))";
    if (value >= 60) return "hsl(var(--secondary))";
    if (value >= 40) return "hsl(var(--accent))";
    return "hsl(var(--muted-foreground))";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">Comprehensive insights into your streaming performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Peak Viewers</p>
                <p className="text-2xl font-bold">{keyMetrics.peakViewers.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-500">+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Watch Time</p>
                <p className="text-2xl font-bold">{keyMetrics.avgWatchTime}</p>
              </div>
              <Clock className="w-8 h-8 text-secondary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-500">+8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chat Conversion</p>
                <p className="text-2xl font-bold">{keyMetrics.chatConversionRate}%</p>
              </div>
              <Target className="w-8 h-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-500">+2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Followers</p>
                <p className="text-2xl font-bold">{keyMetrics.followerGrowth}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-500">+18.7%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${keyMetrics.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-500">+{keyMetrics.monthlyGrowth}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <Activity className="w-8 h-8 text-secondary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-500">+5.3%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Viewer Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    viewers: {
                      label: "Viewers",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={viewerData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="viewers" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    tips: { label: "Tips", color: "hsl(var(--primary))" },
                    subscriptions: { label: "Subscriptions", color: "hsl(var(--secondary))" },
                    merchandise: { label: "Merchandise", color: "hsl(var(--accent))" },
                    sponsorships: { label: "Sponsorships", color: "hsl(var(--muted-foreground))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value}`}
                      >
                        {revenueBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Watch Time & Revenue Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  watchTime: {
                    label: "Watch Time (hours)",
                    color: "hsl(var(--secondary))",
                  },
                  revenue: {
                    label: "Revenue ($)",
                    color: "hsl(var(--accent))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewerData}>
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="watchTime" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={3}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Engagement Heatmap (24h)
              </CardTitle>
              <p className="text-sm text-muted-foreground">Peak engagement times throughout the day</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  engagement: {
                    label: "Engagement %",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementHeatmap}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="engagement" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chat Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Messages per minute</span>
                  <Badge variant="secondary">24.5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active chatters</span>
                  <Badge variant="secondary">189</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emote usage rate</span>
                  <Badge variant="secondary">67%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Moderator actions</span>
                  <Badge variant="secondary">12</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interaction Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Follows</span>
                    <span>8.4%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chat Participation</span>
                    <span>12.1%</span>
                  </div>
                  <Progress value={121} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tips Conversion</span>
                    <span>3.7%</span>
                  </div>
                  <Progress value={37} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subscription Rate</span>
                    <span>2.1%</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Top Tippers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTippers.map((tipper, index) => (
                    <div key={tipper.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={tipper.avatar} />
                            <AvatarFallback>{tipper.username[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-medium">{tipper.username}</p>
                          <p className="text-sm text-muted-foreground">{tipper.tips} tips</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">${tipper.amount}</p>
                        {index === 0 && <Crown className="w-4 h-4 text-yellow-500 mx-auto" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueBreakdown.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{source.name}</span>
                      <span className="font-semibold">${source.value.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(source.value / revenueBreakdown.reduce((sum, item) => sum + item.value, 0)) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Historical Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue ($)",
                    color: "hsl(var(--accent))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewerData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>18-24</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>25-34</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>35-44</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>45+</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>United States</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>United Kingdom</span>
                    <span>18%</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Canada</span>
                    <span>12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Germany</span>
                    <span>8%</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Desktop</span>
                    <span>52%</span>
                  </div>
                  <Progress value={52} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mobile</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tablet</span>
                    <span>13%</span>
                  </div>
                  <Progress value={13} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Retention & Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">78%</div>
                  <div className="text-sm text-muted-foreground">7-day retention</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">65%</div>
                  <div className="text-sm text-muted-foreground">30-day retention</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">+24%</div>
                  <div className="text-sm text-muted-foreground">Monthly growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.2x</div>
                  <div className="text-sm text-muted-foreground">Return rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;