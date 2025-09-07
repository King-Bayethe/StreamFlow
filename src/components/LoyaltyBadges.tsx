import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Star, 
  Heart, 
  Trophy, 
  Flame, 
  Zap,
  Shield,
  Diamond,
  Target,
  Clock,
  Users,
  TrendingUp,
  Gift,
  Award
} from "lucide-react";

interface BadgeConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  requirement: {
    type: "watch_time" | "tips" | "follows" | "subscriptions" | "streak" | "special";
    value: number;
    description: string;
  };
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface UserBadge {
  userId: string;
  username: string;
  avatar: string;
  badgeId: string;
  earnedAt: Date;
  progress?: number;
}

const LoyaltyBadges = () => {
  const [badgeConfigs] = useState<BadgeConfig[]>([
    {
      id: "newcomer",
      name: "Newcomer",
      description: "Welcome to the stream!",
      icon: <Star className="w-4 h-4" />,
      color: "text-gray-500",
      requirement: {
        type: "watch_time",
        value: 30,
        description: "Watch for 30 minutes"
      },
      rarity: "common"
    },
    {
      id: "loyal_viewer",
      name: "Loyal Viewer",
      description: "A dedicated member of the community",
      icon: <Heart className="w-4 h-4" />,
      color: "text-pink-500",
      requirement: {
        type: "watch_time",
        value: 600,
        description: "Watch for 10 hours total"
      },
      rarity: "rare"
    },
    {
      id: "super_fan",
      name: "Super Fan",
      description: "Goes above and beyond!",
      icon: <Flame className="w-4 h-4" />,
      color: "text-orange-500",
      requirement: {
        type: "watch_time",
        value: 3600,
        description: "Watch for 60 hours total"
      },
      rarity: "epic"
    },
    {
      id: "big_tipper",
      name: "Big Tipper",
      description: "Generous supporter",
      icon: <Crown className="w-4 h-4" />,
      color: "text-yellow-500",
      requirement: {
        type: "tips",
        value: 100,
        description: "Tip $100 total"
      },
      rarity: "epic"
    },
    {
      id: "legend",
      name: "Stream Legend",
      description: "A true legend of the community",
      icon: <Trophy className="w-4 h-4" />,
      color: "text-purple-500",
      requirement: {
        type: "special",
        value: 1,
        description: "Special recognition from streamer"
      },
      rarity: "legendary"
    },
    {
      id: "speed_demon",
      name: "Speed Demon",
      description: "Lightning fast reactions",
      icon: <Zap className="w-4 h-4" />,
      color: "text-blue-500",
      requirement: {
        type: "special",
        value: 1,
        description: "First to participate in polls/giveaways"
      },
      rarity: "rare"
    },
    {
      id: "guardian",
      name: "Stream Guardian",
      description: "Protector of the community",
      icon: <Shield className="w-4 h-4" />,
      color: "text-green-500",
      requirement: {
        type: "special",
        value: 1,
        description: "Help moderate chat"
      },
      rarity: "epic"
    },
    {
      id: "diamond_member",
      name: "Diamond Member",
      description: "The ultimate supporter",
      icon: <Diamond className="w-4 h-4" />,
      color: "text-cyan-500",
      requirement: {
        type: "subscriptions",
        value: 12,
        description: "Subscribe for 12 months"
      },
      rarity: "legendary"
    }
  ]);

  const [userBadges] = useState<UserBadge[]>([
    {
      userId: "1",
      username: "StreamFan2024",
      avatar: "/placeholder.svg",
      badgeId: "loyal_viewer",
      earnedAt: new Date(Date.now() - 86400000)
    },
    {
      userId: "2",
      username: "BigTipper",
      avatar: "/placeholder.svg",
      badgeId: "big_tipper",
      earnedAt: new Date(Date.now() - 172800000)
    },
    {
      userId: "3",
      username: "SuperFan99",
      avatar: "/placeholder.svg",
      badgeId: "super_fan",
      earnedAt: new Date(Date.now() - 259200000)
    },
    {
      userId: "4",
      username: "LegendaryViewer",
      avatar: "/placeholder.svg",
      badgeId: "legend",
      earnedAt: new Date(Date.now() - 345600000)
    }
  ]);

  const [mockProgress] = useState([
    {
      userId: "viewer1",
      username: "NewViewer123",
      avatar: "/placeholder.svg",
      badgeId: "newcomer",
      progress: 75,
      currentValue: 22.5,
      targetValue: 30
    },
    {
      userId: "viewer2",
      username: "AlmostLoyal",
      avatar: "/placeholder.svg",
      badgeId: "loyal_viewer",
      progress: 45,
      currentValue: 270,
      targetValue: 600
    }
  ]);

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800";
      case "rare": return "bg-blue-100 text-blue-800";
      case "epic": return "bg-purple-100 text-purple-800";
      case "legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const awardBadge = (userId: string, badgeId: string) => {
    // In a real app, this would call an API
    console.log(`Awarding badge ${badgeId} to user ${userId}`);
  };

  const totalBadgesEarned = userBadges.length;
  const recentBadges = userBadges.slice(0, 5);
  const legendaryBadges = userBadges.filter(ub => 
    badgeConfigs.find(bc => bc.id === ub.badgeId)?.rarity === "legendary"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Loyalty Badges
          </h3>
          <p className="text-muted-foreground">Reward your most dedicated viewers with special badges</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            {totalBadgesEarned} badges earned
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="badges">All Badges</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="recent">Recent Awards</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">{badgeConfigs.length}</div>
                <div className="text-sm text-muted-foreground">Total Badges</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto text-secondary mb-2" />
                <div className="text-2xl font-bold">{totalBadgesEarned}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                <div className="text-2xl font-bold">{legendaryBadges.length}</div>
                <div className="text-sm text-muted-foreground">Legendary</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto text-accent mb-2" />
                <div className="text-2xl font-bold">{mockProgress.length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {badgeConfigs.filter(badge => badge.rarity === "legendary" || badge.rarity === "epic").map((badge) => (
                  <div key={badge.id} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-muted ${badge.color}`}>
                      {badge.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    <Badge className={getBadgeRarityColor(badge.rarity)} variant="outline">
                      {badge.rarity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Badges Tab */}
        <TabsContent value="badges" className="space-y-6">
          <div className="grid gap-4">
            {badgeConfigs.map((badge) => {
              const earnedCount = userBadges.filter(ub => ub.badgeId === badge.id).length;
              
              return (
                <Card key={badge.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-muted ${badge.color}`}>
                          {badge.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{badge.requirement.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getBadgeRarityColor(badge.rarity)} variant="outline">
                          {badge.rarity}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {earnedCount} viewer{earnedCount !== 1 ? 's' : ''} earned
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Viewers Making Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProgress.map((progress) => {
                  const badge = badgeConfigs.find(b => b.id === progress.badgeId);
                  if (!badge) return null;

                  return (
                    <div key={progress.userId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={progress.avatar} />
                            <AvatarFallback>{progress.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{progress.username}</div>
                            <div className="text-sm text-muted-foreground">
                              Working towards: {badge.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{progress.progress}%</div>
                          <div className="text-xs text-muted-foreground">
                            {progress.currentValue} / {progress.targetValue}
                          </div>
                        </div>
                      </div>
                      <Progress value={progress.progress} className="h-2" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{badge.requirement.description}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => awardBadge(progress.userId, progress.badgeId)}
                        >
                          Award Now
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Awards Tab */}
        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Badge Awards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBadges.map((userBadge) => {
                  const badge = badgeConfigs.find(b => b.id === userBadge.badgeId);
                  if (!badge) return null;

                  return (
                    <div key={`${userBadge.userId}-${userBadge.badgeId}`} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={userBadge.avatar} />
                            <AvatarFallback>{userBadge.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{userBadge.username}</div>
                            <div className="text-sm text-muted-foreground">
                              Earned the "{badge.name}" badge
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-muted ${badge.color}`}>
                            {badge.icon}
                          </div>
                          <div className="text-right">
                            <Badge className={getBadgeRarityColor(badge.rarity)} variant="outline">
                              {badge.rarity}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {getTimeAgo(userBadge.earnedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltyBadges;