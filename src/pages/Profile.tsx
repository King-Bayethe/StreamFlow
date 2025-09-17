import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Heart, 
  DollarSign, 
  Eye, 
  Clock, 
  Edit, 
  Camera,
  Gift,
  UserPlus,
  Calendar,
  Play,
  ExternalLink,
  Save,
  Users,
  TrendingUp,
  Star
} from "lucide-react";

const Profile = () => {
  const { user, userRole, isCreator } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    username: isCreator ? "StreamCreator2024" : "StreamFan2024",
    email: user?.email || "user@example.com",
    fullName: isCreator ? "Jordan Smith" : "Alex Johnson",
    bio: isCreator ? "Creating amazing content daily! Gaming, tutorials & more 🎮✨" : "Love watching gaming streams and supporting amazing creators! 🎮✨",
    joinedDate: "March 2023",
    location: "San Francisco, CA"
  });

  // Mock data - would come from Supabase in real implementation
  const viewerStats = {
    totalTipsGiven: 150.50,
    totalWatchTime: "127h 45m",
    followedCount: 12,
    tipsCount: 15
  };

  const creatorStats = {
    followerCount: "15.2K",
    totalEarnings: 2850.00,
    totalStreams: 156,
    avgViewers: 485,
    totalViews: "125K"
  };

  const followedCreators = [
    {
      id: "1",
      username: "ProGamer_2024",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      isLive: true,
      followers: "125K",
      category: "Gaming"
    },
    {
      id: "2",
      username: "ArtisticMind",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=100&h=100&fit=crop&crop=face",
      isLive: false,
      followers: "89K",
      category: "Creative"
    }
  ];

  const recentFollowers = [
    {
      id: "1",
      username: "NewFan_2024",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      followedAt: "2h ago"
    },
    {
      id: "2", 
      username: "StreamLover",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      followedAt: "5h ago"
    }
  ];

  const tipHistory = [
    { id: "1", creator: "ProGamer_2024", amount: 25.00, message: "Amazing gameplay!", date: "2024-01-15" },
    { id: "2", creator: "ArtisticMind", amount: 10.00, message: "Love your art style", date: "2024-01-14" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-muted-foreground mt-2">
                {isCreator ? "Manage your creator profile and channel" : "Manage your account and viewing preferences"}
              </p>
            </div>
          </div>

          {/* Profile Overview Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>{userInfo.username[0]}</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{userInfo.username}</h2>
                  <p className="text-muted-foreground">{userInfo.fullName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{userInfo.bio}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {userInfo.joinedDate}</span>
                    </div>
                    {isCreator ? (
                      <>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{creatorStats.followerCount} followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <span>${creatorStats.totalEarnings.toFixed(2)} earned</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <span>${viewerStats.totalTipsGiven.toFixed(2)} in tips</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{viewerStats.totalWatchTime} watched</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isCreator ? 'grid-cols-3' : 'grid-cols-4'} lg:w-auto`}>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            {isCreator ? (
              <TabsTrigger value="followers" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Followers</span>
              </TabsTrigger>
            ) : (
              <>
                <TabsTrigger value="following" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Following</span>
                </TabsTrigger>
                <TabsTrigger value="tips" className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  <span className="hidden sm:inline">Tips</span>
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username"
                      value={userInfo.username}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName"
                      value={userInfo.fullName}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={userInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={userInfo.location}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio"
                    value={userInfo.bio}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                  />
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {isCreator ? (
                <>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{creatorStats.followerCount}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-accent">${creatorStats.totalEarnings.toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">Total Earnings</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">{creatorStats.totalStreams}</div>
                      <div className="text-sm text-muted-foreground">Streams</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{creatorStats.avgViewers}</div>
                      <div className="text-sm text-muted-foreground">Avg Viewers</div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-accent">${viewerStats.totalTipsGiven.toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">Tips Given</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{viewerStats.followedCount}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">{viewerStats.tipsCount}</div>
                      <div className="text-sm text-muted-foreground">Tips Sent</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-primary">{viewerStats.totalWatchTime}</div>
                      <div className="text-sm text-muted-foreground">Watch Time</div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          {/* Followers Tab (Creator only) */}
          {isCreator && (
            <TabsContent value="followers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Recent Followers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentFollowers.map(follower => (
                      <div key={follower.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={follower.avatar} />
                            <AvatarFallback>{follower.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{follower.username}</div>
                            <div className="text-sm text-muted-foreground">Followed {follower.followedAt}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Following Tab (Viewer only) */}
          {!isCreator && (
            <TabsContent value="following" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Following ({followedCreators.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {followedCreators.map(creator => (
                      <Card key={creator.id} className="hover-lift">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="relative">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={creator.avatar} />
                                <AvatarFallback>{creator.username[0]}</AvatarFallback>
                              </Avatar>
                              {creator.isLive && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{creator.username}</h4>
                              <p className="text-sm text-muted-foreground">{creator.followers} followers</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">{creator.category}</Badge>
                            <Badge variant={creator.isLive ? "default" : "secondary"}>
                              {creator.isLive ? "LIVE" : "Offline"}
                            </Badge>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Visit
                            </Button>
                            <Button size="sm" variant="outline">
                              <UserPlus className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Tips Tab (Viewer only) */}
          {!isCreator && (
            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tip History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tipHistory.map(tip => (
                      <div key={tip.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{tip.creator}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">"{tip.message}"</p>
                          <p className="text-xs text-muted-foreground">{tip.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-accent">${tip.amount.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-muted-foreground py-8">
                    No recent activity to display
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;