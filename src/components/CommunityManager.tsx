import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Crown,
  Trophy,
  Gift,
  Users,
  Heart,
  Star,
  Zap,
  Target,
  Mail,
  MessageSquare,
  Award,
  Plus,
  Settings,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  Medal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommunityMember {
  id: string;
  username: string;
  avatar?: string;
  joinDate: Date;
  totalSpent: number;
  messagesCount: number;
  streamHoursWatched: number;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary';
  badges: string[];
  loyaltyPoints: number;
  lastActive: Date;
}

interface Milestone {
  id: string;
  type: 'followers' | 'subscribers' | 'revenue' | 'hours' | 'custom';
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  isCompleted: boolean;
  completedAt?: Date;
  isActive: boolean;
}

interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'badge' | 'emote' | 'access' | 'physical' | 'discount';
  isAvailable: boolean;
  quantity?: number;
  redemptions: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'participation' | 'engagement' | 'milestone' | 'creative';
  startDate: Date;
  endDate: Date;
  reward: string;
  participants: number;
  isActive: boolean;
  requirements: string[];
}

const CommunityManager = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data initialization
  useEffect(() => {
    const mockMembers: CommunityMember[] = [
      {
        id: '1',
        username: 'SuperFan123',
        joinDate: new Date(Date.now() - 31536000000), // 1 year ago
        totalSpent: 450.75,
        messagesCount: 1250,
        streamHoursWatched: 340,
        tier: 'legendary',
        badges: ['founder', 'top-supporter', 'veteran'],
        loyaltyPoints: 8500,
        lastActive: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        username: 'StreamLover',
        joinDate: new Date(Date.now() - 15552000000), // 6 months ago
        totalSpent: 189.50,
        messagesCount: 680,
        streamHoursWatched: 120,
        tier: 'gold',
        badges: ['regular', 'chatty'],
        loyaltyPoints: 3200,
        lastActive: new Date(Date.now() - 7200000)
      },
      {
        id: '3',
        username: 'NewViewer',
        joinDate: new Date(Date.now() - 2592000000), // 1 month ago
        totalSpent: 25.00,
        messagesCount: 85,
        streamHoursWatched: 15,
        tier: 'bronze',
        badges: ['newcomer'],
        loyaltyPoints: 450,
        lastActive: new Date(Date.now() - 1800000)
      }
    ];
    setMembers(mockMembers);

    const mockMilestones: Milestone[] = [
      {
        id: '1',
        type: 'followers',
        title: '50K Followers Celebration',
        description: 'Reach 50,000 followers for a special celebration stream',
        target: 50000,
        current: 45200,
        reward: '24-hour marathon stream with viewer games',
        isCompleted: false,
        isActive: true
      },
      {
        id: '2',
        type: 'revenue',
        title: 'Monthly Revenue Goal',
        description: 'Reach $5,000 in monthly revenue',
        target: 5000,
        current: 3247,
        reward: 'Community game night and pizza party',
        isCompleted: false,
        isActive: true
      },
      {
        id: '3',
        type: 'hours',
        title: 'Streaming Dedication',
        description: 'Stream for 100 hours this month',
        target: 100,
        current: 67,
        reward: 'New streaming setup reveal',
        isCompleted: false,
        isActive: true
      }
    ];
    setMilestones(mockMilestones);

    const mockRewards: LoyaltyReward[] = [
      {
        id: '1',
        name: 'VIP Badge',
        description: 'Exclusive VIP badge for your profile',
        pointsCost: 1000,
        type: 'badge',
        isAvailable: true,
        redemptions: 45
      },
      {
        id: '2',
        name: 'Custom Emote',
        description: 'Get your own custom emote in chat',
        pointsCost: 5000,
        type: 'emote',
        isAvailable: true,
        quantity: 10,
        redemptions: 3
      },
      {
        id: '3',
        name: 'Discord VIP Access',
        description: 'Access to exclusive VIP Discord channels',
        pointsCost: 2500,
        type: 'access',
        isAvailable: true,
        redemptions: 28
      },
      {
        id: '4',
        name: 'Signed Merch',
        description: 'Signed merchandise shipped to your door',
        pointsCost: 10000,
        type: 'physical',
        isAvailable: true,
        quantity: 5,
        redemptions: 1
      }
    ];
    setLoyaltyRewards(mockRewards);

    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'Chat Champion',
        description: 'Be active in chat for 7 consecutive streams',
        type: 'participation',
        startDate: new Date(Date.now() - 172800000),
        endDate: new Date(Date.now() + 432000000),
        reward: '500 loyalty points + Chat Champion badge',
        participants: 156,
        isActive: true,
        requirements: ['Attend 7 streams', 'Send at least 10 messages per stream', 'No toxic behavior']
      },
      {
        id: '2',
        title: 'Art Contest',
        description: 'Create fan art featuring the streamer',
        type: 'creative',
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now() + 1209600000),
        reward: 'Featured artwork + $100 prize',
        participants: 23,
        isActive: true,
        requirements: ['Original artwork only', 'Include streamer as main subject', 'Submit via Discord']
      }
    ];
    setChallenges(mockChallenges);
  }, []);

  const getTierColor = (tier: CommunityMember['tier']) => {
    const colors = {
      bronze: 'bg-amber-600',
      silver: 'bg-gray-400', 
      gold: 'bg-yellow-500',
      diamond: 'bg-blue-500',
      legendary: 'bg-purple-600'
    };
    return colors[tier];
  };

  const getTierIcon = (tier: CommunityMember['tier']) => {
    switch (tier) {
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'diamond': return <Medal className="w-4 h-4" />;
      case 'gold': return <Trophy className="w-4 h-4" />;
      case 'silver': return <Award className="w-4 h-4" />;
      case 'bronze': return <Star className="w-4 h-4" />;
    }
  };

  const createMilestone = () => {
    // Implementation for creating new milestone
    toast({
      title: "Feature Coming Soon",
      description: "Milestone creation will be available soon"
    });
  };

  const createChallenge = () => {
    // Implementation for creating new challenge
    toast({
      title: "Feature Coming Soon", 
      description: "Challenge creation will be available soon"
    });
  };

  const totalMembers = members.length;
  const totalLoyaltyPoints = members.reduce((sum, member) => sum + member.loyaltyPoints, 0);
  const activeMilestones = milestones.filter(m => m.isActive && !m.isCompleted).length;
  const activeChallenges = challenges.filter(c => c.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Community Manager
          </h3>
          <p className="text-muted-foreground">Build and engage your streaming community</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Active Members</div>
            <div className="text-xl font-bold">{totalMembers}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Loyalty Points</div>
            <div className="text-xl font-bold">{totalLoyaltyPoints.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Community Members</p>
                <p className="text-2xl font-bold">{totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Milestones</p>
                <p className="text-2xl font-bold">{activeMilestones}</p>
              </div>
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Challenges</p>
                <p className="text-2xl font-bold">{activeChallenges}</p>
              </div>
              <Zap className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Loyalty Rewards</p>
                <p className="text-2xl font-bold">{loyaltyRewards.length}</p>
              </div>
              <Gift className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Community Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Community Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New members this week</span>
                    <span className="font-semibold">+47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Engagement rate</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Retention rate</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. watch time</span>
                    <span className="font-semibold">2.4 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.slice(0, 3).map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.username[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{member.username}</span>
                            <Badge className={`${getTierColor(member.tier)} text-white text-xs`}>
                              <span className="flex items-center gap-1">
                                {getTierIcon(member.tier)}
                                {member.tier}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">${member.totalSpent.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{member.loyaltyPoints} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Community Milestones</h4>
            <Button onClick={createMilestone}>
              <Plus className="w-4 h-4 mr-2" />
              Create Milestone
            </Button>
          </div>

          <div className="grid gap-4">
            {milestones.map((milestone) => (
              <Card key={milestone.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <Badge variant={milestone.isCompleted ? "default" : "secondary"}>
                      {milestone.isCompleted ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress: {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}</span>
                      <span className="font-semibold">
                        {((milestone.current / milestone.target) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={(milestone.current / milestone.target) * 100} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Gift className="w-4 h-4" />
                        Reward: {milestone.reward}
                      </div>
                      {milestone.isCompleted && milestone.completedAt && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Completed {milestone.completedAt.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Loyalty Rewards</h4>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Reward
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loyaltyRewards.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold mb-1">{reward.name}</h4>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                    </div>
                    <Badge variant={reward.type === 'physical' ? 'default' : 'secondary'}>
                      {reward.type}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cost</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{reward.pointsCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {reward.quantity && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Available</span>
                        <span className="font-semibold">{reward.quantity - reward.redemptions}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Redeemed</span>
                      <span className="font-semibold">{reward.redemptions}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Switch 
                        checked={reward.isAvailable}
                        onCheckedChange={() => {
                          setLoyaltyRewards(prev => 
                            prev.map(r => 
                              r.id === reward.id 
                                ? { ...r, isAvailable: !r.isAvailable }
                                : r
                            )
                          );
                        }}
                      />
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Community Challenges</h4>
            <Button onClick={createChallenge}>
              <Plus className="w-4 h-4 mr-2" />
              Create Challenge
            </Button>
          </div>

          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                      <Badge variant="outline">{challenge.type}</Badge>
                    </div>
                    <Badge variant={challenge.isActive ? "default" : "secondary"}>
                      {challenge.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div className="font-medium">Start Date</div>
                        <div className="text-muted-foreground">{challenge.startDate.toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div className="font-medium">End Date</div>
                        <div className="text-muted-foreground">{challenge.endDate.toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div className="font-medium">Participants</div>
                        <div className="text-muted-foreground">{challenge.participants}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium">Requirements:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {challenge.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">Reward: {challenge.reward}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Entries
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{member.username}</span>
                          <Badge className={`${getTierColor(member.tier)} text-white`}>
                            <span className="flex items-center gap-1">
                              {getTierIcon(member.tier)}
                              {member.tier}
                            </span>
                          </Badge>
                          {member.badges.map(badge => (
                            <Badge key={badge} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Joined {member.joinDate.toLocaleDateString()} • 
                          {member.messagesCount} messages • 
                          {member.streamHoursWatched}h watched
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${member.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.loyaltyPoints.toLocaleString()} points
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active {Math.floor((Date.now() - member.lastActive.getTime()) / 3600000)}h ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityManager;