import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { 
  Play, 
  Star, 
  Heart, 
  Gift, 
  Users, 
  Eye,
  Clock,
  TrendingUp,
  Bookmark,
  Crown,
  Trophy,
  Sparkles,
  Target,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import VODLibrary from "@/components/VODLibrary";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import SubscriptionTiers from "@/components/SubscriptionTiers";

interface LiveStream {
  id: string;
  title: string;
  creator: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  thumbnail_url: string | null;
  viewer_count: number;
  status: string;
}

const ViewerHub = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock user data - this could be fetched from user_profiles table
  const userStats = {
    watchTime: "127h 45m",
    tipsGiven: 250.75,
    followedCreators: 12,
    level: 25,
    xp: 12750,
    nextLevelXP: 15000,
    badges: ["supporter", "loyal_viewer", "early_adopter"],
    currentTier: "Supporter"
  };

  useEffect(() => {
    fetchLiveStreams();
    
    // Set up real-time subscription for stream updates
    const channel = supabase
      .channel('live-streams')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'streams',
          filter: 'status=eq.live'
        },
        () => fetchLiveStreams()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLiveStreams = async () => {
    try {
      const { data: streams, error } = await supabase
        .from('streams')
        .select(`
          id,
          title,
          creator_id,
          thumbnail_url,
          viewer_count,
          status
        `)
        .eq('status', 'live')
        .order('viewer_count', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Get creator profiles
      const creatorIds = streams?.map(stream => stream.creator_id) || [];
      
      const { data: profiles, error: profileError } = await supabase
        .from('creator_profiles')
        .select('user_id, username, display_name, avatar_url')
        .in('user_id', creatorIds);

      if (profileError) throw profileError;

      const profileMap = profiles?.reduce((acc, profile) => {
        acc[profile.user_id] = profile;
        return acc;
      }, {} as Record<string, any>) || {};

      const formattedStreams: LiveStream[] = (streams || []).map(stream => ({
        id: stream.id,
        title: stream.title,
        creator: {
          username: profileMap[stream.creator_id]?.username || 'Unknown',
          display_name: profileMap[stream.creator_id]?.display_name,
          avatar_url: profileMap[stream.creator_id]?.avatar_url
        },
        thumbnail_url: stream.thumbnail_url,
        viewer_count: stream.viewer_count,
        status: stream.status
      }));

      setLiveStreams(formattedStreams);
    } catch (error) {
      console.error('Error fetching live streams:', error);
      toast({
        title: "Error",
        description: "Failed to load live streams.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const recentAchievements = [
    { badge: "loyal_viewer", name: "Loyal Viewer", earned: "2 days ago" },
    { badge: "tip_master", name: "Tip Master", earned: "1 week ago" },
    { badge: "chat_champion", name: "Chat Champion", earned: "2 weeks ago" }
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "supporter": return <Heart className="w-4 h-4" />;
      case "loyal_viewer": return <Star className="w-4 h-4" />;
      case "early_adopter": return <Crown className="w-4 h-4" />;
      case "tip_master": return <Gift className="w-4 h-4" />;
      case "chat_champion": return <Trophy className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const xpProgress = (userStats.xp / userStats.nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Viewer Hub
              </h1>
              <p className="text-muted-foreground mt-2">Your personalized streaming experience</p>
            </div>
            
            {/* User Stats Quick View */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Level {userStats.level}</div>
                <div className="text-sm font-medium">
                  {userStats.xp.toLocaleString()} / {userStats.nextLevelXP.toLocaleString()} XP
                </div>
              </div>
              <div className="w-20 h-2 bg-muted rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userStats.watchTime}</div>
              <div className="text-sm text-muted-foreground">Watch Time</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">${userStats.tipsGiven}</div>
              <div className="text-sm text-muted-foreground">Tips Given</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{userStats.followedCreators}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">{userStats.badges.length}</div>
              <div className="text-sm text-muted-foreground">Badges</div>
            </Card>
          </div>

          {/* Current Subscription */}
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{userStats.currentTier} Member</h3>
                    <p className="text-sm text-muted-foreground">
                      Enjoying premium features and supporting creators
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  Manage Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              For You
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Upgrade
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Live Streams from Followed Creators */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Live from Your Followed Creators
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveStreams.slice(0, 3).map((stream) => (
                  <Card key={stream.id} className="group overflow-hidden hover-lift hover-glow border-0 card-gradient cursor-pointer">
                    <div className="relative">
                      <img 
                        src={stream.thumbnail_url || '/placeholder.svg'} 
                        alt={stream.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="lg" className="rounded-full">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold live-indicator">
                        {stream.status.toUpperCase()}
                      </div>
                      
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {stream.viewer_count.toLocaleString()}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {stream.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={stream.creator.avatar_url || '/placeholder.svg'} alt={stream.creator.display_name || stream.creator.username} />
                          <AvatarFallback>{(stream.creator.display_name || stream.creator.username)[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{stream.creator.display_name || stream.creator.username}</span>
                      </div>
                      
                      <Button className="w-full" asChild>
                        <Link to={`/watch/${stream.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trending Streams */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Trending Now
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveStreams.slice(0, 6).map((stream) => (
                  <Card key={stream.id} className="group overflow-hidden hover-lift hover-glow border-0 card-gradient cursor-pointer">
                    <div className="relative">
                      <img 
                        src={stream.thumbnail_url || '/placeholder.svg'} 
                        alt={stream.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="lg" className="rounded-full">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold live-indicator">
                        {stream.status.toUpperCase()}
                      </div>
                      
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {stream.viewer_count.toLocaleString()}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {stream.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={stream.creator.avatar_url || '/placeholder.svg'} alt={stream.creator.display_name || stream.creator.username} />
                          <AvatarFallback>{(stream.creator.display_name || stream.creator.username)[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{stream.creator.display_name || stream.creator.username}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" asChild>
                          <Link to={`/watch/${stream.id}`}>
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </Link>
                        </Button>
                        <Button size="icon" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        {getBadgeIcon(achievement.badge)}
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.earned}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library">
            <VODLibrary />
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations">
            <PersonalizedRecommendations />
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <SubscriptionTiers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ViewerHub;