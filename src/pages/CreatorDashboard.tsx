import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DollarSign, 
  Eye, 
  Users, 
  TrendingUp,
  ExternalLink,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  Gift,
  HelpCircle,
  Radio,
  Zap,
  Settings,
  ArrowRight
} from "lucide-react";

const CreatorDashboard = () => {
  const { user } = useAuth();
  const [channelData, setChannelData] = useState({ name: '' });
  const [isLive, setIsLive] = useState(false);

  // Mock data for analytics
  const analyticsData = {
    totalEarnings: 2847.50,
    monthlyEarnings: 890.25,
    totalViewers: 125000,
    avgViewers: 2400,
    totalTips: 156,
    tipAmount: 1205.75,
    followers: 45200,
    hoursStreamed: 124
  };

  const recentStreams = [
    { id: "1", title: "Gaming Marathon", viewers: 3200, earnings: 145.50, duration: "4h 30m", date: "2024-01-15" },
    { id: "2", title: "Art Tutorial", viewers: 1800, earnings: 89.25, duration: "2h 15m", date: "2024-01-14" },
    { id: "3", title: "Music Session", viewers: 2100, earnings: 112.75, duration: "3h 45m", date: "2024-01-13" }
  ];

  // Quick action cards for navigation
  const quickActions = [
    {
      title: "Analytics",
      description: "View your performance metrics",
      icon: PieChart,
      link: "/creator/analytics",
      color: "text-blue-500"
    },
    {
      title: "Go Live",
      description: "Start streaming now",
      icon: Radio,
      link: "/creator/streaming",
      color: "text-red-500"
    },
    {
      title: "Engagement",
      description: "Interact with your community",
      icon: Users,
      link: "/creator/engagement",
      color: "text-green-500"
    },
    {
      title: "AI Suite",
      description: "Leverage AI tools",
      icon: Zap,
      link: "/creator/ai-suite",
      color: "text-purple-500"
    },
    {
      title: "Monetization",
      description: "Manage your earnings",
      icon: DollarSign,
      link: "/creator/monetization",
      color: "text-yellow-500"
    },
    {
      title: "Settings",
      description: "Configure your channel",
      icon: Settings,
      link: "/creator/settings",
      color: "text-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Creator Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">Manage your streams, earnings, and community</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={isLive ? "default" : "secondary"} className="px-3 py-1">
                {isLive ? "🔴 LIVE" : "⭕ Offline"}
              </Badge>
              <Button variant="outline" asChild>
                <a href="/support">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/channel/${channelData.name || 'setup-required'}`} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Channel
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analyticsData.totalEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Viewers</CardTitle>
                <Eye className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalViewers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <Users className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.followers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+156 this week</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Viewers</CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.avgViewers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+5.7% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStreams.map(stream => (
                    <div key={stream.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{stream.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {stream.viewers.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {stream.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {stream.date}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-accent">${stream.earnings}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tips Received</span>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-accent" />
                      <span className="font-semibold">{analyticsData.totalTips}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tip Revenue</span>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="font-semibold">${analyticsData.tipAmount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hours Streamed</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{analyticsData.hoursStreamed}h</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">This Month</span>
                    <span className="font-bold text-lg text-accent">${analyticsData.monthlyEarnings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.link}>
                  <Card className="hover-lift cursor-pointer transition-all duration-200 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-muted ${action.color}`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;