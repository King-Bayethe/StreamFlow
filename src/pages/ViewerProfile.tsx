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
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  Settings, 
  Heart, 
  DollarSign, 
  Eye, 
  Clock, 
  Bell, 
  Lock, 
  Mail, 
  Edit, 
  Camera,
  Gift,
  UserPlus,
  Calendar,
  Play,
  ExternalLink,
  Shield,
  Smartphone,
  Monitor,
  Save,
  LogOut
} from "lucide-react";

const ViewerProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "StreamFan2024",
    email: "viewer@example.com",
    fullName: "Alex Johnson",
    bio: "Love watching gaming streams and supporting amazing creators! 🎮✨",
    joinedDate: "March 2023",
    location: "San Francisco, CA"
  });

  // Mock data
  const followedCreators = [
    {
      id: "1",
      username: "ProGamer_2024",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      isLive: true,
      followers: "125K",
      category: "Gaming",
      lastStream: "2h ago"
    },
    {
      id: "2",
      username: "ArtisticMind",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=100&h=100&fit=crop&crop=face",
      isLive: false,
      followers: "89K",
      category: "Creative",
      lastStream: "1d ago"
    },
    {
      id: "3",
      username: "ChefMarco",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      isLive: true,
      followers: "156K",
      category: "Lifestyle",
      lastStream: "30m ago"
    }
  ];

  const tipHistory = [
    { id: "1", creator: "ProGamer_2024", amount: 25.00, message: "Amazing gameplay!", date: "2024-01-15", streamTitle: "Epic Gaming Marathon" },
    { id: "2", creator: "ArtisticMind", amount: 10.00, message: "Love your art style", date: "2024-01-14", streamTitle: "Digital Art Tutorial" },
    { id: "3", creator: "ChefMarco", amount: 15.00, message: "Thanks for the recipe!", date: "2024-01-13", streamTitle: "Italian Cooking Class" },
    { id: "4", creator: "ProGamer_2024", amount: 50.00, message: "Keep up the great content!", date: "2024-01-12", streamTitle: "Speed Run Challenge" }
  ];

  const watchHistory = [
    { id: "1", creator: "ProGamer_2024", title: "Epic Gaming Marathon", duration: "2h 30m", watchedAt: "2024-01-15", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=150&fit=crop" },
    { id: "2", creator: "ArtisticMind", title: "Digital Art Tutorial", duration: "1h 45m", watchedAt: "2024-01-14", thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=150&fit=crop" },
    { id: "3", creator: "ChefMarco", title: "Italian Cooking Class", duration: "3h 15m", watchedAt: "2024-01-13", thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop" },
    { id: "4", creator: "MusicProducer", title: "Beat Making Session", duration: "1h 20m", watchedAt: "2024-01-12", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=150&fit=crop" }
  ];

  const totalTipsGiven = tipHistory.reduce((sum, tip) => sum + tip.amount, 0);
  const totalWatchTime = "127h 45m"; // Mock calculation

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
              <p className="text-muted-foreground mt-2">Manage your account and viewing preferences</p>
            </div>
            <Button variant="outline" className="w-fit">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
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
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span>${totalTipsGiven.toFixed(2)} in tips</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{totalWatchTime} watched</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Following</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
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
          </TabsContent>

          {/* Following Tab */}
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
                        
                        <p className="text-xs text-muted-foreground mb-3">
                          Last stream: {creator.lastStream}
                        </p>
                        
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

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">${totalTipsGiven.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Total Tips Given</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{tipHistory.length}</div>
                  <div className="text-sm text-muted-foreground">Tips Sent</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">{new Set(tipHistory.map(t => t.creator)).size}</div>
                  <div className="text-sm text-muted-foreground">Creators Supported</div>
                </CardContent>
              </Card>
            </div>

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
                          <Badge variant="outline" className="text-xs">{tip.streamTitle}</Badge>
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

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Watch History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {watchHistory.map(item => (
                    <Card key={item.id} className="hover-lift">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title}
                            className="w-20 h-15 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.creator}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.watchedAt}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Change Password</Label>
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button size="sm">Update Password</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SMS Authentication</div>
                        <div className="text-sm text-muted-foreground">Receive codes via text message</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Authentication</div>
                        <div className="text-sm text-muted-foreground">Receive codes via email</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Stream Notifications</div>
                        <div className="text-sm text-muted-foreground">When followed creators go live</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive updates via email</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">Browser and mobile notifications</div>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-muted-foreground">Promotions and news</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Device Preferences</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span className="text-sm">Mobile Notifications</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        <span className="text-sm">Desktop Notifications</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Profile Visibility</div>
                          <div className="text-sm text-muted-foreground">Make profile public</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Activity Status</div>
                          <div className="text-sm text-muted-foreground">Show when you're online</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Watch History</div>
                          <div className="text-sm text-muted-foreground">Allow others to see</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Data Analytics</div>
                          <div className="text-sm text-muted-foreground">Help improve the platform</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Personalized Ads</div>
                          <div className="text-sm text-muted-foreground">Show relevant advertisements</div>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Data Sharing</div>
                          <div className="text-sm text-muted-foreground">Share with partners</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-2">
                    <Button variant="outline">
                      Download My Data
                    </Button>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
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

export default ViewerProfile;