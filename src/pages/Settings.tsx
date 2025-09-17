import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Settings as SettingsIcon,
  Bell, 
  Lock, 
  Mail,
  Shield,
  Search,
  Plus,
  XCircle,
  Ban,
  Filter,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  LogOut
} from "lucide-react";

const Settings = () => {
  const { user, userRole, isCreator, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    streamStart: true,
    pollNotifications: false,
    creatorAnnouncements: true,
    newFollower: isCreator,
    chatMentions: true,
    emailDigest: false,
    pushNotifications: true
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showTips: !isCreator,
    showActivity: true,
    showWatchTime: !isCreator,
    showProfile: true,
    allowDirectMessages: true,
    showOnlineStatus: true
  });

  // Creator-specific moderation settings
  const [bannedUsers, setBannedUsers] = useState([
    { id: "1", username: "ToxicUser123", reason: "Harassment", bannedAt: "2024-01-15" },
    { id: "2", username: "SpamBot", reason: "Spam", bannedAt: "2024-01-14" }
  ]);
  const [blockedKeywords, setBlockedKeywords] = useState(["spam", "hate", "inappropriate"]);
  const [newKeyword, setNewKeyword] = useState("");

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

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-muted-foreground mt-2">Manage your account preferences and security</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isCreator ? 'grid-cols-5' : 'grid-cols-3'} lg:w-auto`}>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            {isCreator && (
              <>
                <TabsTrigger value="moderation" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Moderation</span>
                </TabsTrigger>
                <TabsTrigger value="stream" className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Stream</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Account Settings Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword"
                      type="password"
                      value={accountSettings.currentPassword}
                      onChange={(e) => setAccountSettings({...accountSettings, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword"
                      type="password"
                      value={accountSettings.newPassword}
                      onChange={(e) => setAccountSettings({...accountSettings, newPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      value={accountSettings.confirmPassword}
                      onChange={(e) => setAccountSettings({...accountSettings, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Update Account Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Stream Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Stream start notifications</Label>
                      <p className="text-xs text-muted-foreground">Get notified when creators you follow go live</p>
                    </div>
                    <Switch 
                      checked={notifications.streamStart}
                      onCheckedChange={(checked) => setNotifications({...notifications, streamStart: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Poll notifications</Label>
                      <p className="text-xs text-muted-foreground">Get notified about new polls from creators</p>
                    </div>
                    <Switch 
                      checked={notifications.pollNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, pollNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Creator announcements</Label>
                      <p className="text-xs text-muted-foreground">Receive announcements from creators you follow</p>
                    </div>
                    <Switch 
                      checked={notifications.creatorAnnouncements}
                      onCheckedChange={(checked) => setNotifications({...notifications, creatorAnnouncements: checked})}
                    />
                  </div>

                  {isCreator && (
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">New follower notifications</Label>
                        <p className="text-xs text-muted-foreground">Get notified when someone follows your channel</p>
                      </div>
                      <Switch 
                        checked={notifications.newFollower}
                        onCheckedChange={(checked) => setNotifications({...notifications, newFollower: checked})}
                      />
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Communication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Chat mentions</Label>
                      <p className="text-xs text-muted-foreground">Get notified when someone mentions you in chat</p>
                    </div>
                    <Switch 
                      checked={notifications.chatMentions}
                      onCheckedChange={(checked) => setNotifications({...notifications, chatMentions: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Email digest</Label>
                      <p className="text-xs text-muted-foreground">Weekly summary of your activity</p>
                    </div>
                    <Switch 
                      checked={notifications.emailDigest}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailDigest: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Push notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive notifications on your devices</p>
                    </div>
                    <Switch 
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                    />
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Profile Visibility</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Show profile publicly</Label>
                      <p className="text-xs text-muted-foreground">Allow others to view your profile</p>
                    </div>
                    <Switch 
                      checked={privacy.showProfile}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showProfile: checked})}
                    />
                  </div>

                  {!isCreator && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Show tip history</Label>
                          <p className="text-xs text-muted-foreground">Display your tip activity to others</p>
                        </div>
                        <Switch 
                          checked={privacy.showTips}
                          onCheckedChange={(checked) => setPrivacy({...privacy, showTips: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Show watch time</Label>
                          <p className="text-xs text-muted-foreground">Display your total watch time</p>
                        </div>
                        <Switch 
                          checked={privacy.showWatchTime}
                          onCheckedChange={(checked) => setPrivacy({...privacy, showWatchTime: checked})}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Show activity status</Label>
                      <p className="text-xs text-muted-foreground">Let others see when you're online</p>
                    </div>
                    <Switch 
                      checked={privacy.showOnlineStatus}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showOnlineStatus: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Communication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Allow direct messages</Label>
                      <p className="text-xs text-muted-foreground">Let others send you private messages</p>
                    </div>
                    <Switch 
                      checked={privacy.allowDirectMessages}
                      onCheckedChange={(checked) => setPrivacy({...privacy, allowDirectMessages: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Show recent activity</Label>
                      <p className="text-xs text-muted-foreground">Display your recent streams and interactions</p>
                    </div>
                    <Switch 
                      checked={privacy.showActivity}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showActivity: checked})}
                    />
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab (Creator only) */}
          {isCreator && (
            <TabsContent value="moderation" className="space-y-6">
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
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      />
                      <Button onClick={addKeyword}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {blockedKeywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        >
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
                  </div>

                  <Separator />

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
            </TabsContent>
          )}

          {/* Stream Settings Tab (Creator only) */}
          {isCreator && (
            <TabsContent value="stream" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Stream Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Chat Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Enable follower-only chat</Label>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Subscriber-only chat</Label>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Slow mode (30s between messages)</Label>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Content Filters</h3>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Block links in chat</Label>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Filter excessive caps</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Stream Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;