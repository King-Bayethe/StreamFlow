import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DollarSign, 
  Eye, 
  Users, 
  TrendingUp, 
  Play, 
  Pause, 
  Settings, 
  Copy,
  ExternalLink,
  Ban,
  Volume2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  Zap,
  Gift,
  CreditCard,
  Download,
  Filter,
  Search,
  Plus,
  Trash2,
  Edit,
  Radio,
  Video,
  Monitor
} from "lucide-react";
import StreamingControls from '@/components/StreamingControls';
import StreamMetrics from '@/components/StreamMetrics';
import StreamRecordings from '@/components/StreamRecordings';
import OBSIntegrationGuide from '@/components/OBSIntegrationGuide';

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState("Epic Gaming Session");
  const [streamDescription, setStreamDescription] = useState("Join me for an amazing gaming adventure!");
  const [bannedUsers, setBannedUsers] = useState([
    { id: "1", username: "ToxicUser123", reason: "Harassment", bannedAt: "2024-01-15" },
    { id: "2", username: "SpamBot", reason: "Spam", bannedAt: "2024-01-14" }
  ]);
  const [blockedKeywords, setBlockedKeywords] = useState(["spam", "hate", "inappropriate"]);
  const [newKeyword, setNewKeyword] = useState("");

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

  const payoutHistory = [
    { id: "1", amount: 500.00, status: "completed", date: "2024-01-10", method: "Bank Transfer" },
    { id: "2", amount: 750.25, status: "pending", date: "2024-01-08", method: "Bank Transfer" },
    { id: "3", amount: 425.50, status: "completed", date: "2024-01-03", method: "Bank Transfer" }
  ];

  const embedUrl = `https://streamplay.app/embed/${isLive ? 'live' : 'offline'}/creator-123`;

  const addKeyword = () => {
    if (newKeyword.trim() && !blockedKeywords.includes(newKeyword.trim().toLowerCase())) {
      setBlockedKeywords([...blockedKeywords, newKeyword.trim().toLowerCase()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setBlockedKeywords(blockedKeywords.filter(k => k !== keyword));
  };

  const removeBannedUser = (userId: string) => {
    setBannedUsers(bannedUsers.filter(u => u.id !== userId));
  };

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
                <a href="/watch/creator-123" target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Channel
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="streaming" className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Streaming
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="recordings" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Recordings
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Earnings
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Moderation
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
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
          </TabsContent>

          {/* Streaming Controls Tab */}
          <TabsContent value="streaming" className="space-y-6">
            <StreamingControls userId="mock-user-id" />
            <OBSIntegrationGuide 
              rtmpUrl="rtmp://live.example.com/live" 
              streamKey="sk_live_12345abcdef67890" 
            />
          </TabsContent>

          {/* Stream Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <StreamMetrics 
              streamId="mock-stream-id" 
              isLive={isLive} 
            />
          </TabsContent>

          {/* Recordings Tab */}
          <TabsContent value="recordings" className="space-y-6">
            <StreamRecordings userId="mock-user-id" />
          </TabsContent>

          {/* Legacy Streams Management Tab */}
          <TabsContent value="streams" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Go Live Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Stream Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="streamTitle">Stream Title</Label>
                    <Input
                      id="streamTitle"
                      value={streamTitle}
                      onChange={(e) => setStreamTitle(e.target.value)}
                      placeholder="Enter your stream title..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="streamDescription">Description</Label>
                    <Textarea
                      id="streamDescription"
                      value={streamDescription}
                      onChange={(e) => setStreamDescription(e.target.value)}
                      placeholder="Describe your stream..."
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="liveToggle" className="text-sm font-medium">
                      Stream Status
                    </Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="liveToggle"
                        checked={isLive}
                        onCheckedChange={setIsLive}
                      />
                      <Badge variant={isLive ? "default" : "secondary"}>
                        {isLive ? "LIVE" : "Offline"}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full" variant={isLive ? "destructive" : "default"}>
                    {isLive ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        End Stream
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Stream
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Embed & URLs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Embed & Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Stream URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        value="https://streamplay.app/creator-123" 
                        readOnly 
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Embed URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={embedUrl}
                        readOnly 
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Embed Code</Label>
                    <Textarea
                      value={`<iframe src="${embedUrl}" width="800" height="450" frameborder="0" allowfullscreen></iframe>`}
                      readOnly
                      rows={3}
                      className="text-xs font-mono"
                    />
                  </div>

                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Test Embed
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Balance Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Earnings Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">${analyticsData.totalEarnings.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Earned</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">$1,250.75</div>
                      <div className="text-sm text-muted-foreground">Available Balance</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">$750.25</div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Payout History</h4>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {payoutHistory.map(payout => (
                        <div key={payout.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">${payout.amount.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">{payout.date} • {payout.method}</div>
                          </div>
                          <Badge variant={payout.status === "completed" ? "default" : "secondary"}>
                            {payout.status === "completed" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {payout.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stripe Connect */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Stripe Connected</div>
                      <div className="text-sm text-muted-foreground">Ready to receive payments</div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Payment Settings
                  </Button>

                  <Button className="w-full">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Request Payout
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Next automatic payout: Jan 25, 2024
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Banned Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ban className="w-5 h-5" />
                    Banned Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Search users..." className="flex-1" />
                      <Button size="icon" variant="outline">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>

                    <ScrollArea className="h-64">
                      <div className="space-y-2">
                        {bannedUsers.map(user => (
                          <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <div className="font-medium">{user.username}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.reason} • {user.bannedAt}
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => removeBannedUser(user.id)}
                            >
                              Unban
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <Button className="w-full" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User to Ban List
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Blocked Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add keyword..."
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                        className="flex-1"
                      />
                      <Button onClick={addKeyword}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {blockedKeywords.map(keyword => (
                        <Badge key={keyword} variant="outline" className="flex items-center gap-1">
                          {keyword}
                          <button 
                            onClick={() => removeKeyword(keyword)}
                            className="ml-1 hover:text-destructive"
                          >
                            <XCircle className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Auto-Moderation Settings</h4>
                      
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Auto-mute spam</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Auto-delete offensive messages</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Require approval for new followers</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;