import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Ban, 
  Filter, 
  Shield, 
  Search, 
  Plus, 
  XCircle 
} from "lucide-react";

const CreatorSettings = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Creator Settings
          </h1>
          <p className="text-muted-foreground mt-2">Configure your channel and moderation preferences</p>
        </div>

        <div className="space-y-6">
          {/* Chat Moderation */}
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

          {/* Banned Users Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Additional Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Stream Protection</h4>
                    
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

                  <div className="space-y-3">
                    <h4 className="font-medium">Content Filters</h4>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Block links in chat</Label>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Filter excessive caps</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSettings;