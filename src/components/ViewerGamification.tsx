import { useState, useEffect } from "react";
import { GamifiedChatPreview } from "@/components/GamifiedChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  TrendingUp, 
  Award, 
  Target,
  Gift,
  MessageCircle,
  Clock,
  Users,
  Flame,
  Medal,
  Gem,
  Shield,
  Sparkles,
  ChevronUp,
  ChevronDown
} from "lucide-react";

interface ViewerProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
  badges: string[];
  weeklyXp: number;
  totalTips: number;
  weeklyTips: number;
  watchTime: number;
  weeklyWatchTime: number;
  messagesCount: number;
  weeklyMessages: number;
  streak: number;
  rank: number;
  previousRank: number;
  isOnline: boolean;
  lastSeen: Date;
}

interface XPAction {
  action: string;
  xp: number;
  description: string;
  icon: React.ReactNode;
}

interface LeaderboardEntry {
  viewer: ViewerProfile;
  score: number;
  change: number;
  category: "xp" | "tips" | "watch_time" | "messages";
}

const ViewerGamification = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [leaderboardType, setLeaderboardType] = useState<"xp" | "tips" | "watch_time" | "messages">("xp");

  // Mock data for demonstration
  const [topViewers] = useState<ViewerProfile[]>([
    {
      id: "1",
      username: "StreamLegend",
      avatar: "/placeholder.svg",
      level: 45,
      xp: 890,
      xpToNextLevel: 1100,
      totalXp: 45890,
      badges: ["legend", "big_tipper", "loyal_viewer", "speed_demon"],
      weeklyXp: 2450,
      totalTips: 580.50,
      weeklyTips: 125.75,
      watchTime: 2840,
      weeklyWatchTime: 420,
      messagesCount: 1250,
      weeklyMessages: 180,
      streak: 28,
      rank: 1,
      previousRank: 1,
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: "2",
      username: "XPHunter",
      avatar: "/placeholder.svg",
      level: 38,
      xp: 650,
      xpToNextLevel: 1100,
      totalXp: 38650,
      badges: ["super_fan", "guardian", "loyal_viewer"],
      weeklyXp: 1890,
      totalTips: 290.25,
      weeklyTips: 45.50,
      watchTime: 1920,
      weeklyWatchTime: 315,
      messagesCount: 890,
      weeklyMessages: 142,
      streak: 15,
      rank: 2,
      previousRank: 3,
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: "3",
      username: "ChatMaster",
      avatar: "/placeholder.svg",
      level: 42,
      xp: 320,
      xpToNextLevel: 1100,
      totalXp: 42320,
      badges: ["guardian", "speed_demon", "newcomer"],
      weeklyXp: 1650,
      totalTips: 145.80,
      weeklyTips: 32.25,
      watchTime: 1680,
      weeklyWatchTime: 285,
      messagesCount: 1450,
      weeklyMessages: 220,
      streak: 12,
      rank: 3,
      previousRank: 2,
      isOnline: true,
      lastSeen: new Date()
    }
  ]);

  const [xpActions] = useState<XPAction[]>([
    {
      action: "watching",
      xp: 1,
      description: "Per minute of watching",
      icon: <Clock className="w-4 h-4" />
    },
    {
      action: "chatting",
      xp: 5,
      description: "Per chat message",
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      action: "following",
      xp: 100,
      description: "Follow the streamer",
      icon: <Star className="w-4 h-4" />
    },
    {
      action: "subscribing",
      xp: 500,
      description: "Subscribe to the channel",
      icon: <Crown className="w-4 h-4" />
    },
    {
      action: "tipping",
      xp: 10,
      description: "Per dollar tipped",
      icon: <Gift className="w-4 h-4" />
    },
    {
      action: "sharing",
      xp: 50,
      description: "Share the stream",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      action: "poll_voting",
      xp: 15,
      description: "Vote in polls",
      icon: <Target className="w-4 h-4" />
    },
    {
      action: "daily_login",
      xp: 25,
      description: "Daily check-in bonus",
      icon: <Zap className="w-4 h-4" />
    }
  ]);

  const getLevelInfo = (level: number) => {
    const baseXP = 1000;
    const multiplier = 1.1;
    const requiredXP = Math.floor(baseXP * Math.pow(multiplier, level - 1));
    return { requiredXP };
  };

  const getLevelTier = (level: number) => {
    if (level >= 50) return { name: "Legendary", color: "text-yellow-500", bgColor: "bg-yellow-100" };
    if (level >= 40) return { name: "Master", color: "text-purple-500", bgColor: "bg-purple-100" };
    if (level >= 30) return { name: "Expert", color: "text-blue-500", bgColor: "bg-blue-100" };
    if (level >= 20) return { name: "Advanced", color: "text-green-500", bgColor: "bg-green-100" };
    if (level >= 10) return { name: "Intermediate", color: "text-orange-500", bgColor: "bg-orange-100" };
    return { name: "Beginner", color: "text-gray-500", bgColor: "bg-gray-100" };
  };

  const getLeaderboard = (): LeaderboardEntry[] => {
    return topViewers.map((viewer, index) => ({
      viewer,
      score: leaderboardType === "xp" ? viewer.weeklyXp :
             leaderboardType === "tips" ? viewer.weeklyTips :
             leaderboardType === "watch_time" ? viewer.weeklyWatchTime :
             viewer.weeklyMessages,
      change: viewer.rank - viewer.previousRank,
      category: leaderboardType
    })).sort((a, b) => b.score - a.score);
  };

  const getScoreLabel = (type: string) => {
    switch (type) {
      case "xp": return "XP";
      case "tips": return "$";
      case "watch_time": return "min";
      case "messages": return "msgs";
      default: return "";
    }
  };

  const getRankChange = (change: number) => {
    if (change > 0) return { icon: <ChevronUp className="w-3 h-3 text-green-500" />, color: "text-green-500" };
    if (change < 0) return { icon: <ChevronDown className="w-3 h-3 text-red-500" />, color: "text-red-500" };
    return { icon: null, color: "text-muted-foreground" };
  };

  const badgeIcons: Record<string, React.ReactNode> = {
    "legend": <Trophy className="w-4 h-4 text-yellow-500" />,
    "big_tipper": <Crown className="w-4 h-4 text-purple-500" />,
    "loyal_viewer": <Star className="w-4 h-4 text-blue-500" />,
    "speed_demon": <Zap className="w-4 h-4 text-orange-500" />,
    "super_fan": <Flame className="w-4 h-4 text-red-500" />,
    "guardian": <Shield className="w-4 h-4 text-green-500" />,
    "newcomer": <Sparkles className="w-4 h-4 text-pink-500" />
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Viewer Gamification
          </h3>
          <p className="text-muted-foreground">Engage and reward your most active viewers</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {topViewers.filter(v => v.isOnline).length} online
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="levels">Levels & XP</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                <div className="text-2xl font-bold">{topViewers.length}</div>
                <div className="text-sm text-muted-foreground">Active Viewers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">
                  {topViewers.reduce((sum, v) => sum + v.weeklyXp, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Weekly XP</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Gift className="w-8 h-8 mx-auto text-accent mb-2" />
                <div className="text-2xl font-bold">
                  ${topViewers.reduce((sum, v) => sum + v.weeklyTips, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Weekly Tips</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto text-secondary mb-2" />
                <div className="text-2xl font-bold">
                  {Math.round(topViewers.reduce((sum, v) => sum + v.weeklyWatchTime, 0) / 60)}h
                </div>
                <div className="text-sm text-muted-foreground">Watch Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5" />
                  Top Contributors This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topViewers.slice(0, 3).map((viewer, index) => {
                    const tier = getLevelTier(viewer.level);
                    return (
                      <div key={viewer.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? "bg-yellow-100 text-yellow-800" :
                            index === 1 ? "bg-gray-100 text-gray-800" :
                            "bg-orange-100 text-orange-800"
                          }`}>
                            {index + 1}
                          </div>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={viewer.avatar} />
                            <AvatarFallback>{viewer.username[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{viewer.username}</span>
                            <Badge className={`${tier.bgColor} ${tier.color} text-xs`}>
                              Lv.{viewer.level}
                            </Badge>
                            {viewer.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {viewer.weeklyXp} XP • ${viewer.weeklyTips} tips
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {viewer.badges.slice(0, 3).map((badgeId) => (
                            <div key={badgeId} className="w-6 h-6 flex items-center justify-center">
                              {badgeIcons[badgeId]}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Engagement Streaks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topViewers
                    .sort((a, b) => b.streak - a.streak)
                    .slice(0, 5)
                    .map((viewer) => (
                      <div key={viewer.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={viewer.avatar} />
                            <AvatarFallback>{viewer.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{viewer.username}</div>
                            <div className="text-sm text-muted-foreground">
                              {viewer.streak} day streak
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="font-bold text-orange-500">{viewer.streak}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Weekly Leaderboard
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={leaderboardType === "xp" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLeaderboardType("xp")}
                  >
                    XP
                  </Button>
                  <Button
                    variant={leaderboardType === "tips" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLeaderboardType("tips")}
                  >
                    Tips
                  </Button>
                  <Button
                    variant={leaderboardType === "watch_time" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLeaderboardType("watch_time")}
                  >
                    Watch Time
                  </Button>
                  <Button
                    variant={leaderboardType === "messages" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLeaderboardType("messages")}
                  >
                    Messages
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {getLeaderboard().map((entry, index) => {
                    const tier = getLevelTier(entry.viewer.level);
                    const rankChange = getRankChange(entry.change);
                    
                    return (
                      <div 
                        key={entry.viewer.id} 
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          index < 3 ? "bg-gradient-to-r from-primary/5 to-secondary/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 w-12">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? "bg-yellow-100 text-yellow-800" :
                            index === 1 ? "bg-gray-100 text-gray-800" :
                            index === 2 ? "bg-orange-100 text-orange-800" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {index + 1}
                          </div>
                          {rankChange.icon}
                        </div>
                        
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={entry.viewer.avatar} />
                          <AvatarFallback>{entry.viewer.username[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{entry.viewer.username}</span>
                            <Badge className={`${tier.bgColor} ${tier.color} text-xs`}>
                              Lv.{entry.viewer.level}
                            </Badge>
                            {entry.viewer.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {entry.viewer.badges.length} badges • {entry.viewer.streak} day streak
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {getScoreLabel(leaderboardType)}{entry.score.toLocaleString()}
                          </div>
                          <div className={`text-sm ${rankChange.color}`}>
                            {entry.change > 0 ? `+${entry.change}` : entry.change}
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          {entry.viewer.badges.slice(0, 3).map((badgeId) => (
                            <div key={badgeId} className="w-5 h-5 flex items-center justify-center">
                              {badgeIcons[badgeId]}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Levels & XP Tab */}
        <TabsContent value="levels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                XP Actions & Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {xpActions.map((action) => (
                  <div key={action.action} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium capitalize">{action.action.replace('_', ' ')}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">+{action.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Level Tiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Beginner", level: "1-9", color: "text-gray-500", bgColor: "bg-gray-100" },
                  { name: "Intermediate", level: "10-19", color: "text-orange-500", bgColor: "bg-orange-100" },
                  { name: "Advanced", level: "20-29", color: "text-green-500", bgColor: "bg-green-100" },
                  { name: "Expert", level: "30-39", color: "text-blue-500", bgColor: "bg-blue-100" },
                  { name: "Master", level: "40-49", color: "text-purple-500", bgColor: "bg-purple-100" },
                  { name: "Legendary", level: "50+", color: "text-yellow-500", bgColor: "bg-yellow-100" }
                ].map((tier) => (
                  <div key={tier.name} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Badge className={`${tier.bgColor} ${tier.color}`}>
                      Level {tier.level}
                    </Badge>
                    <div className="flex-1">
                      <div className="font-semibold">{tier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {tier.name === "Legendary" ? "The ultimate achievement!" :
                         tier.name === "Master" ? "Elite status with exclusive perks" :
                         tier.name === "Expert" ? "Advanced privileges and recognition" :
                         tier.name === "Advanced" ? "Special badges and features unlocked" :
                         tier.name === "Intermediate" ? "Basic gamification features" :
                         "Starting your journey"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {tier.name === "Legendary" && <Crown className="w-5 h-5 text-yellow-500" />}
                      {tier.name === "Master" && <Gem className="w-5 h-5 text-purple-500" />}
                      {tier.name === "Expert" && <Star className="w-5 h-5 text-blue-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Highlights Tab */}
        <TabsContent value="highlights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Top Tippers Showcase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topViewers
                    .sort((a, b) => b.totalTips - a.totalTips)
                    .slice(0, 5)
                    .map((viewer, index) => (
                      <div key={viewer.id} className="flex items-center gap-3 p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={viewer.avatar} />
                            <AvatarFallback>{viewer.username[0]}</AvatarFallback>
                          </Avatar>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{viewer.username}</span>
                            {index === 0 && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                Top Tipper
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Level {viewer.level} • {viewer.badges.length} badges
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-accent">
                            ${viewer.totalTips.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${viewer.weeklyTips.toFixed(2)} this week
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      viewer: topViewers[0],
                      achievement: "Reached Level 45",
                      time: "2 hours ago",
                      icon: <Star className="w-4 h-4 text-yellow-500" />
                    },
                    {
                      viewer: topViewers[1],
                      achievement: "Earned Guardian Badge",
                      time: "4 hours ago",
                      icon: <Shield className="w-4 h-4 text-green-500" />
                    },
                    {
                      viewer: topViewers[2],
                      achievement: "30-day Streak",
                      time: "6 hours ago",
                      icon: <Flame className="w-4 h-4 text-orange-500" />
                    }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={achievement.viewer.avatar} />
                        <AvatarFallback>{achievement.viewer.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{achievement.viewer.username}</div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.achievement}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {achievement.icon}
                        <div className="text-xs text-muted-foreground">
                          {achievement.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Chat Integration Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Live Chat Integration Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GamifiedChatPreview />
              <p className="text-sm text-muted-foreground mt-3">
                Level badges, achievement icons, and XP rewards automatically appear in live chat with highlighted messages for top contributors
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ViewerGamification;