import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield,
  Ban,
  Trash2,
  MessageSquare,
  AlertTriangle,
  Filter,
  Clock,
  Users,
  Eye,
  Settings,
  Plus,
  Volume2,
  VolumeX,
  Flag,
  Heart,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  username: string;
  avatar?: string;
  message: string;
  timestamp: Date;
  platform: string;
  isModerated: boolean;
  isFlagged: boolean;
  moderationReason?: string;
}

interface BannedUser {
  id: string;
  username: string;
  reason: string;
  bannedAt: Date;
  bannedBy: string;
  isPermanent: boolean;
  expiresAt?: Date;
}

interface ModerationRule {
  id: string;
  name: string;
  type: 'keyword' | 'link' | 'caps' | 'spam' | 'length';
  pattern: string;
  action: 'delete' | 'timeout' | 'flag';
  isActive: boolean;
}

const ChatModerationPanel = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [moderationRules, setModerationRules] = useState<ModerationRule[]>([
    {
      id: '1',
      name: 'Spam Filter',
      type: 'spam',
      pattern: 'repeated_messages',
      action: 'timeout',
      isActive: true
    },
    {
      id: '2',
      name: 'All Caps',
      type: 'caps',
      pattern: 'ALL_CAPS_DETECTION',
      action: 'flag',
      isActive: true
    },
    {
      id: '3',
      name: 'Link Filter',
      type: 'link',
      pattern: 'http|www\\.',
      action: 'delete',
      isActive: false
    }
  ]);
  const [settings, setSettings] = useState({
    autoModeration: true,
    slowMode: false,
    slowModeDelay: 5,
    subscribersOnly: false,
    followersOnly: false,
    minimumFollowTime: 10,
    moderatorNotifications: true,
    chatHistory: true
  });
  const [newRule, setNewRule] = useState({
    name: '',
    type: 'keyword' as ModerationRule['type'],
    pattern: '',
    action: 'flag' as ModerationRule['action']
  });

  // Mock chat messages for demonstration
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        username: 'ChatUser123',
        message: 'Great stream! Keep it up! 🔥',
        timestamp: new Date(Date.now() - 30000),
        platform: 'main',
        isModerated: false,
        isFlagged: false
      },
      {
        id: '2',
        username: 'SpamBot99',
        message: 'CHECK OUT MY CHANNEL!!!',
        timestamp: new Date(Date.now() - 60000),
        platform: 'twitch',
        isModerated: true,
        isFlagged: true,
        moderationReason: 'All caps spam'
      },
      {
        id: '3',
        username: 'RegularViewer',
        message: 'What game are you playing next?',
        timestamp: new Date(Date.now() - 90000),
        platform: 'youtube',
        isModerated: false,
        isFlagged: false
      }
    ];
    setMessages(mockMessages);

    const mockBannedUsers: BannedUser[] = [
      {
        id: '1',
        username: 'ToxicUser123',
        reason: 'Harassment and hate speech',
        bannedAt: new Date(Date.now() - 86400000),
        bannedBy: 'CreatorMod',
        isPermanent: true
      },
      {
        id: '2',
        username: 'SpamAccount',
        reason: 'Repeated spam messages',
        bannedAt: new Date(Date.now() - 43200000),
        bannedBy: 'AutoMod',
        isPermanent: false,
        expiresAt: new Date(Date.now() + 43200000)
      }
    ];
    setBannedUsers(mockBannedUsers);
  }, []);

  const moderateMessage = (messageId: string, action: 'delete' | 'timeout' | 'flag', reason?: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isModerated: true, moderationReason: reason }
          : msg
      )
    );

    toast({
      title: "Message Moderated",
      description: `Message ${action}d successfully`,
    });
  };

  const banUser = (username: string, reason: string, duration?: number) => {
    const newBan: BannedUser = {
      id: Date.now().toString(),
      username,
      reason,
      bannedAt: new Date(),
      bannedBy: 'Creator',
      isPermanent: !duration,
      expiresAt: duration ? new Date(Date.now() + duration * 60000) : undefined
    };

    setBannedUsers(prev => [newBan, ...prev]);
    
    // Remove user's messages
    setMessages(prev => prev.filter(msg => msg.username !== username));

    toast({
      title: "User Banned",
      description: `${username} has been ${duration ? `banned for ${duration} minutes` : 'permanently banned'}`,
    });
  };

  const unbanUser = (userId: string) => {
    const user = bannedUsers.find(u => u.id === userId);
    setBannedUsers(prev => prev.filter(u => u.id !== userId));
    
    toast({
      title: "User Unbanned",
      description: `${user?.username} has been unbanned`,
    });
  };

  const addModerationRule = () => {
    if (!newRule.name || !newRule.pattern) {
      toast({
        title: "Invalid Rule",
        description: "Please provide a name and pattern for the rule",
        variant: "destructive"
      });
      return;
    }

    const rule: ModerationRule = {
      id: Date.now().toString(),
      ...newRule,
      isActive: true
    };

    setModerationRules(prev => [rule, ...prev]);
    setNewRule({ name: '', type: 'keyword', pattern: '', action: 'flag' });

    toast({
      title: "Rule Added",
      description: "New moderation rule has been created",
    });
  };

  const toggleRule = (ruleId: string) => {
    setModerationRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
  };

  const deleteRule = (ruleId: string) => {
    setModerationRules(prev => prev.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "Moderation rule has been removed",
    });
  };

  const flaggedMessages = messages.filter(msg => msg.isFlagged);
  const moderatedMessages = messages.filter(msg => msg.isModerated);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Chat Moderation
          </h3>
          <p className="text-muted-foreground">Advanced chat moderation and safety tools</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${settings.autoModeration ? 'text-green-500' : 'text-gray-400'}`} />
            <span className="text-sm">Auto-Mod {settings.autoModeration ? 'ON' : 'OFF'}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="live">Live Chat</TabsTrigger>
          <TabsTrigger value="flagged">Flagged ({flaggedMessages.length})</TabsTrigger>
          <TabsTrigger value="banned">Banned Users</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Live Chat Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <div key={message.id} className={`p-3 rounded-lg border ${
                          message.isModerated ? 'bg-red-50 border-red-200' : 
                          message.isFlagged ? 'bg-yellow-50 border-yellow-200' : 
                          'bg-background'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={message.avatar} />
                                <AvatarFallback>{message.username[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm">{message.username}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {message.platform}
                                  </Badge>
                                  {message.isFlagged && (
                                    <Flag className="w-3 h-3 text-yellow-500" />
                                  )}
                                  {message.isModerated && (
                                    <Shield className="w-3 h-3 text-red-500" />
                                  )}
                                </div>
                                <p className="text-sm">{message.message}</p>
                                {message.moderationReason && (
                                  <p className="text-xs text-red-600 mt-1">
                                    Reason: {message.moderationReason}
                                  </p>
                                )}
                                <div className="text-xs text-muted-foreground mt-1">
                                  {message.timestamp.toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                            {!message.isModerated && (
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => moderateMessage(message.id, 'flag', 'Flagged for review')}
                                >
                                  <Flag className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => moderateMessage(message.id, 'delete', 'Message deleted')}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => banUser(message.username, 'Inappropriate behavior', 10)}
                                >
                                  <Ban className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slow Mode</span>
                    <Switch
                      checked={settings.slowMode}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, slowMode: checked }))}
                    />
                  </div>
                  
                  {settings.slowMode && (
                    <div className="space-y-2">
                      <Label htmlFor="slow-delay">Delay (seconds)</Label>
                      <Input
                        id="slow-delay"
                        type="number"
                        min="1"
                        max="120"
                        value={settings.slowModeDelay}
                        onChange={(e) => setSettings(prev => ({ ...prev, slowModeDelay: parseInt(e.target.value) || 5 }))}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subscribers Only</span>
                    <Switch
                      checked={settings.subscribersOnly}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, subscribersOnly: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Followers Only</span>
                    <Switch
                      checked={settings.followersOnly}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, followersOnly: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Chat Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Messages</span>
                    <span className="font-semibold">{messages.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Flagged</span>
                    <span className="font-semibold text-yellow-600">{flaggedMessages.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Moderated</span>
                    <span className="font-semibold text-red-600">{moderatedMessages.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Banned Users</span>
                    <span className="font-semibold">{bannedUsers.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Flagged Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {flaggedMessages.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No flagged messages</h3>
                      <p className="text-muted-foreground">Flagged messages will appear here for review</p>
                    </div>
                  ) : (
                    flaggedMessages.map((message) => (
                      <div key={message.id} className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={message.avatar} />
                              <AvatarFallback>{message.username[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{message.username}</span>
                                <Badge variant="outline">{message.platform}</Badge>
                              </div>
                              <p className="text-sm mb-2">{message.message}</p>
                              <div className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => moderateMessage(message.id, 'delete', 'Approved deletion')}
                            >
                              Delete
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => banUser(message.username, 'Flagged content', 30)}
                            >
                              Ban User
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ban className="w-5 h-5" />
                Banned Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bannedUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <Ban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No banned users</h3>
                    <p className="text-muted-foreground">Banned users will appear here</p>
                  </div>
                ) : (
                  bannedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{user.username}</span>
                          <Badge variant={user.isPermanent ? "destructive" : "secondary"}>
                            {user.isPermanent ? "Permanent" : "Temporary"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Reason: {user.reason}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Banned by {user.bannedBy} on {user.bannedAt.toLocaleDateString()}
                          {!user.isPermanent && user.expiresAt && (
                            <span> • Expires {user.expiresAt.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => unbanUser(user.id)}
                      >
                        Unban
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Moderation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    placeholder="Rule name"
                    value={newRule.name}
                    onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rule-type">Type</Label>
                  <select
                    id="rule-type"
                    className="w-full h-10 px-3 border border-input rounded-md"
                    value={newRule.type}
                    onChange={(e) => setNewRule(prev => ({ ...prev, type: e.target.value as ModerationRule['type'] }))}
                  >
                    <option value="keyword">Keyword</option>
                    <option value="link">Link</option>
                    <option value="caps">All Caps</option>
                    <option value="spam">Spam</option>
                    <option value="length">Message Length</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-pattern">Pattern</Label>
                  <Input
                    id="rule-pattern"
                    placeholder="Pattern or keyword"
                    value={newRule.pattern}
                    onChange={(e) => setNewRule(prev => ({ ...prev, pattern: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-action">Action</Label>
                  <select
                    id="rule-action"
                    className="w-full h-10 px-3 border border-input rounded-md"
                    value={newRule.action}
                    onChange={(e) => setNewRule(prev => ({ ...prev, action: e.target.value as ModerationRule['action'] }))}
                  >
                    <option value="flag">Flag</option>
                    <option value="delete">Delete</option>
                    <option value="timeout">Timeout</option>
                  </select>
                </div>
              </div>

              <Button onClick={addModerationRule} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>

              <div className="space-y-3">
                {moderationRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{rule.name}</span>
                        <Badge variant="outline">{rule.type}</Badge>
                        <Badge variant={
                          rule.action === 'delete' ? 'destructive' : 
                          rule.action === 'timeout' ? 'secondary' : 
                          'default'
                        }>
                          {rule.action}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pattern: {rule.pattern}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteRule(rule.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Moderation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-moderation">Auto-moderation</Label>
                  <p className="text-sm text-muted-foreground">Automatically moderate messages based on rules</p>
                </div>
                <Switch
                  id="auto-moderation"
                  checked={settings.autoModeration}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoModeration: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mod-notifications">Moderator notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for moderation actions</p>
                </div>
                <Switch
                  id="mod-notifications"
                  checked={settings.moderatorNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, moderatorNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="chat-history">Chat history</Label>
                  <p className="text-sm text-muted-foreground">Keep chat history for moderation review</p>
                </div>
                <Switch
                  id="chat-history"
                  checked={settings.chatHistory}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, chatHistory: checked }))}
                />
              </div>

              {settings.followersOnly && (
                <div className="space-y-2">
                  <Label htmlFor="follow-time">Minimum follow time (minutes)</Label>
                  <Input
                    id="follow-time"
                    type="number"
                    min="1"
                    max="1440"
                    value={settings.minimumFollowTime}
                    onChange={(e) => setSettings(prev => ({ ...prev, minimumFollowTime: parseInt(e.target.value) || 10 }))}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatModerationPanel;