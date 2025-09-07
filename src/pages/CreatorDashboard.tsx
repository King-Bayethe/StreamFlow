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
  Monitor,
  MessageSquare,
  HelpCircle,
  Crown,
  Trophy,
  Shield
} from "lucide-react";
import StreamingControls from '@/components/StreamingControls';
import StreamMetrics from '@/components/StreamMetrics';
import StreamRecordings from '@/components/StreamRecordings';
import OBSIntegrationGuide from '@/components/OBSIntegrationGuide';
import Simulcasting from '@/components/Simulcasting';
import UnifiedChat from '@/components/UnifiedChat';
import Analytics from '@/components/Analytics';
import LivePolls from '@/components/LivePolls';
import QASession from '@/components/QASession';
import Giveaways from '@/components/Giveaways';
import LoyaltyBadges from '@/components/LoyaltyBadges';
import StreamOverlays from '@/components/StreamOverlays';
import ViewerGamification from '@/components/ViewerGamification';
import AIClippingSystem from '@/components/AIClippingSystem';
import AICoStreamer from '@/components/AICoStreamer';
import AIAudienceInsights from '@/components/AIAudienceInsights';
import AITrustSafety from '@/components/AITrustSafety';
import AIDiscoveryEngine from '@/components/AIDiscoveryEngine';
import AILiveCaptions from '@/components/AILiveCaptions';
import AIAgentMarketplace from '@/components/AIAgentMarketplace';

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
                <a href="/support">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </a>
              </Button>
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="streaming" className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Streaming
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="monetization" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Monetization
            </TabsTrigger>
            <TabsTrigger value="ai-suite" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Suite
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Analytics />
          </TabsContent>

          {/* Streaming Tab */}
          <TabsContent value="streaming" className="space-y-6">
            <Tabs defaultValue="controls" className="space-y-4">
              <TabsList>
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="simulcast">Simulcast</TabsTrigger>
                <TabsTrigger value="chat">Unified Chat</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="recordings">Recordings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="controls">
                <StreamingControls userId="mock-user-id" />
                <div className="mt-6">
                  <OBSIntegrationGuide 
                    rtmpUrl="rtmp://live.example.com/live" 
                    streamKey="sk_live_12345abcdef67890" 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="simulcast">
                <Simulcasting userId="mock-user-id" />
              </TabsContent>
              
              <TabsContent value="chat">
                <UnifiedChat 
                  isSimulcasting={isLive} 
                  activePlatforms={['youtube', 'twitch']} 
                />
              </TabsContent>
              
              <TabsContent value="metrics">
                <StreamMetrics 
                  streamId="mock-stream-id" 
                  isLive={isLive} 
                />
              </TabsContent>
              
              <TabsContent value="recordings">
                <StreamRecordings userId="mock-user-id" />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Unified Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <UnifiedChat 
              isSimulcasting={isLive} 
              activePlatforms={['youtube', 'twitch']} 
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

          {/* Engagement Tabs */}
          <TabsContent value="polls" className="space-y-6">
            <LivePolls isLive={isLive} />
          </TabsContent>

          <TabsContent value="qa" className="space-y-6">
            <QASession isLive={isLive} />
          </TabsContent>

          <TabsContent value="giveaways" className="space-y-6">
            <Giveaways isLive={isLive} />
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <LoyaltyBadges />
          </TabsContent>

          <TabsContent value="overlays" className="space-y-6">
            <StreamOverlays isLive={isLive} />
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <ViewerGamification />
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Analytics />
          </TabsContent>

          {/* Streaming Tab */}
          <TabsContent value="streaming" className="space-y-6">
            <Tabs defaultValue="controls" className="space-y-4">
              <TabsList>
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="simulcast">Simulcast</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="recordings">Recordings</TabsTrigger>
              </TabsList>

              <TabsContent value="controls">
                <StreamingControls userId="user-id" />
              </TabsContent>

              <TabsContent value="simulcast">
                <Simulcasting userId="user-id" />
              </TabsContent>

              <TabsContent value="chat">
                <UnifiedChat isSimulcasting={false} activePlatforms={[]} />
              </TabsContent>

              <TabsContent value="metrics">
                <StreamMetrics streamId="stream-id" isLive={isLive} />
              </TabsContent>

              <TabsContent value="recordings">
                <StreamRecordings userId="user-id" />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <Tabs defaultValue="polls" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="polls">Polls</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
                <TabsTrigger value="giveaways">Giveaways</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="overlays">Overlays</TabsTrigger>
                <TabsTrigger value="gamification">Gamification</TabsTrigger>
              </TabsList>

              <TabsContent value="polls">
                <LivePolls isLive={isLive} />
              </TabsContent>

              <TabsContent value="qa">
                <QASession isLive={isLive} />
              </TabsContent>

              <TabsContent value="giveaways">
                <Giveaways isLive={isLive} />
              </TabsContent>

              <TabsContent value="badges">
                <LoyaltyBadges />
              </TabsContent>

              <TabsContent value="overlays">
                <StreamOverlays isLive={isLive} />
              </TabsContent>

              <TabsContent value="gamification">
                <ViewerGamification />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Monetization Tab */}
          <TabsContent value="monetization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monetization Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Monetization features coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Suite Tab */}
          <TabsContent value="ai-suite" className="space-y-6">
            <Tabs defaultValue="clipping" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
                <TabsTrigger value="clipping">Auto-Clipping</TabsTrigger>
                <TabsTrigger value="co-streamer">Co-Streamer</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
                <TabsTrigger value="discovery">Discovery</TabsTrigger>
                <TabsTrigger value="captions">Captions</TabsTrigger>
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              </TabsList>

              <TabsContent value="clipping">
                <AIClippingSystem />
              </TabsContent>

              <TabsContent value="co-streamer">
                <AICoStreamer isActive={false} onToggle={() => {}} />
              </TabsContent>

              <TabsContent value="insights">
                <AIAudienceInsights />
              </TabsContent>

              <TabsContent value="safety">
                <AITrustSafety />
              </TabsContent>

              <TabsContent value="discovery">
                <AIDiscoveryEngine />
              </TabsContent>

              <TabsContent value="captions">
                <AILiveCaptions />
              </TabsContent>

              <TabsContent value="marketplace">
                <AIAgentMarketplace />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Tabs defaultValue="chat-moderation" className="space-y-4">
              <TabsList>
                <TabsTrigger value="chat-moderation">Chat Moderation</TabsTrigger>
                <TabsTrigger value="user-management">User Management</TabsTrigger>
                <TabsTrigger value="content-filters">Content Filters</TabsTrigger>
              </TabsList>

              <TabsContent value="chat-moderation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Chat Moderation Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Blocked Keywords</h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add keyword to block..."
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            if (newKeyword && !blockedKeywords.includes(newKeyword)) {
                              setBlockedKeywords([...blockedKeywords, newKeyword]);
                              setNewKeyword("");
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blockedKeywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="secondary"
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => setBlockedKeywords(blockedKeywords.filter(k => k !== keyword))}
                          >
                            {keyword} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium">Auto-Moderation</h3>
                      
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
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;