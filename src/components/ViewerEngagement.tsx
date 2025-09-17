import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Trophy,
  Star,
  Heart,
  Gift,
  Crown,
  Zap,
  Target,
  Medal,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ViewerEngagementProps {
  streamId: string;
  className?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface LoyaltyStatus {
  level: number;
  xp: number;
  nextLevelXp: number;
  totalTipsGiven: number;
  messagesCount: number;
  pollVotes: number;
  badges: string[];
  streakDays: number;
}

const ViewerEngagement = ({ streamId, className }: ViewerEngagementProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loyaltyStatus, setLoyaltyStatus] = useState<LoyaltyStatus>({
    level: 12,
    xp: 2850,
    nextLevelXp: 3000,
    totalTipsGiven: 125.50,
    messagesCount: 847,
    pollVotes: 23,
    badges: ['supporter', 'chat_champion', 'loyal_viewer'],
    streakDays: 7
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Tip',
      description: 'Send your first Super Chat',
      icon: 'gift',
      earned: true,
      earnedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Chat Master',
      description: 'Send 100 chat messages',
      icon: 'message',
      earned: true,
      earnedAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Poll Participant',
      description: 'Vote in 10 polls',
      icon: 'vote',
      earned: true,
      earnedAt: '2024-01-25'
    },
    {
      id: '4',
      name: 'Generous Supporter',
      description: 'Tip $100 total',
      icon: 'crown',
      earned: true,
      progress: 125,
      maxProgress: 100
    },
    {
      id: '5',
      name: 'Stream Regular',
      description: 'Watch streams for 7 days in a row',
      icon: 'star',
      earned: true,
      progress: 7,
      maxProgress: 7
    },
    {
      id: '6',
      name: 'Big Spender',
      description: 'Send a $25+ Super Chat',
      icon: 'diamond',
      earned: false,
      progress: 10,
      maxProgress: 25
    }
  ]);

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'supporter': return <Heart className="w-4 h-4" />;
      case 'chat_champion': return <Trophy className="w-4 h-4" />;
      case 'loyal_viewer': return <Star className="w-4 h-4" />;
      case 'vip': return <Crown className="w-4 h-4" />;
      default: return <Medal className="w-4 h-4" />;
    }
  };

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'gift': return <Gift className="w-5 h-5" />;
      case 'message': return <Sparkles className="w-5 h-5" />;
      case 'vote': return <Target className="w-5 h-5" />;
      case 'crown': return <Crown className="w-5 h-5" />;
      case 'star': return <Star className="w-5 h-5" />;
      case 'diamond': return <Zap className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const xpProgress = (loyaltyStatus.xp / loyaltyStatus.nextLevelXp) * 100;

  const handleFollowStreamer = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to follow streamers",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Followed!",
      description: "You're now following this streamer",
    });
  };

  if (!user) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <div>
              <h3 className="font-semibold mb-2">Join the Community</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Sign in to earn XP, unlock achievements, and engage with the stream
              </p>
              <Button>Sign In</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Loyalty Status */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-primary" />
              </div>
              <span>Level {loyaltyStatus.level}</span>
            </div>
            <Badge variant="secondary">{loyaltyStatus.streakDays} day streak</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Experience</span>
              <span>{loyaltyStatus.xp} / {loyaltyStatus.nextLevelXp} XP</span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                ${loyaltyStatus.totalTipsGiven}
              </div>
              <div className="text-xs text-muted-foreground">Total Tips</div>
            </div>
            <div>
              <div className="text-lg font-bold text-secondary">
                {loyaltyStatus.messagesCount}
              </div>
              <div className="text-xs text-muted-foreground">Messages</div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {loyaltyStatus.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {getBadgeIcon(badge)}
                {badge.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Engagement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={handleFollowStreamer} className="w-full">
            <Heart className="w-4 h-4 mr-2" />
            Follow Streamer
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Gift className="w-4 h-4 mr-2" />
              Super Chat
            </Button>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Vote in Poll
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.slice(0, 4).map((achievement) => (
            <div 
              key={achievement.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                achievement.earned 
                  ? 'bg-muted/50 border-border' 
                  : 'bg-background border-dashed border-muted-foreground/30'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                achievement.earned 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {getAchievementIcon(achievement.icon)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-medium text-sm ${
                    achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </h4>
                  {achievement.earned && (
                    <Badge variant="secondary" className="text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                
                {!achievement.earned && achievement.progress && achievement.maxProgress && (
                  <div className="space-y-1">
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-1.5"
                    />
                    <div className="text-xs text-muted-foreground">
                      {achievement.progress} / {achievement.maxProgress}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full">
            View All Achievements
          </Button>
        </CardContent>
      </Card>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Top Supporters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'SuperFan123', amount: 250.75, rank: 1 },
              { name: 'GamerPro', amount: 189.50, rank: 2 },
              { name: 'ChatMaster', amount: 125.25, rank: 3 },
            ].map((supporter) => (
              <div key={supporter.rank} className="flex items-center justify-between p-2 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    supporter.rank === 1 ? 'bg-yellow-500 text-white' :
                    supporter.rank === 2 ? 'bg-gray-400 text-white' :
                    'bg-orange-500 text-white'
                  }`}>
                    {supporter.rank}
                  </div>
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {supporter.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{supporter.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  ${supporter.amount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewerEngagement;