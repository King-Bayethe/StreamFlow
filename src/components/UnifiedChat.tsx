import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Youtube, 
  Twitch as TwitchIcon, 
  Radio,
  Activity,
  Heart,
  Gift,
  Filter,
  Settings,
  Pin,
  Trash2,
  Ban,
  Clock,
  Users,
  Eye,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatMessage {
  id: string;
  platform: 'main' | 'youtube' | 'twitch' | 'rumble' | 'facebook';
  username: string;
  avatar?: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'tip' | 'follow' | 'subscribe' | 'join';
  amount?: number;
  isPinned?: boolean;
  isHighlighted?: boolean;
  badges?: string[];
}

interface UnifiedChatProps {
  isSimulcasting: boolean;
  activePlatforms: string[];
}

const UnifiedChat: React.FC<UnifiedChatProps> = ({ isSimulcasting, activePlatforms }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [messageFilter, setMessageFilter] = useState<'all' | 'tips' | 'follows' | 'messages'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const platforms = {
    main: { name: 'Main Platform', icon: <Radio className="h-4 w-4" />, color: 'bg-primary' },
    youtube: { name: 'YouTube', icon: <Youtube className="h-4 w-4" />, color: 'bg-red-500' },
    twitch: { name: 'Twitch', icon: <TwitchIcon className="h-4 w-4" />, color: 'bg-purple-500' },
    rumble: { name: 'Rumble', icon: <Radio className="h-4 w-4" />, color: 'bg-green-500' },
    facebook: { name: 'Facebook', icon: <Activity className="h-4 w-4" />, color: 'bg-blue-500' }
  };

  // Generate mock messages across platforms
  useEffect(() => {
    if (isSimulcasting) {
      const generateMessage = () => {
        const platformKeys = ['main', ...activePlatforms] as Array<keyof typeof platforms>;
        const randomPlatform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
        const messageTypes = ['message', 'tip', 'follow', 'subscribe'] as const;
        const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
        
        const usernames = [
          'GameMaster92', 'StreamFan', 'ProGamer', 'ChatLord', 'ViewerOne',
          'AwesomeUser', 'StreamLover', 'GamingGuru', 'ChatKing', 'SuperFan',
          'TopViewer', 'StreamQueen', 'GamerBoy', 'ChatStar', 'FanGirl'
        ];
        
        const messages = [
          'Great stream! 🔥', 'Love the content!', 'When is the next stream?',
          'Amazing gameplay!', 'Keep it up!', 'First time watching, love it!',
          'Can you play my favorite game?', 'Best streamer ever!', 'Hi from YouTube!',
          'Twitch viewer here!', 'Facebook fan!', 'New subscriber!', 'Long time follower'
        ];

        const newMessage: ChatMessage = {
          id: Date.now().toString() + Math.random(),
          platform: randomPlatform,
          username: usernames[Math.floor(Math.random() * usernames.length)],
          avatar: `/api/placeholder/32/32`,
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date(),
          type: randomType,
          amount: randomType === 'tip' ? Math.floor(Math.random() * 50) + 5 : undefined,
          badges: Math.random() > 0.7 ? ['Subscriber'] : undefined
        };

        setMessages(prev => [...prev.slice(-49), newMessage]);
      };

      const interval = setInterval(generateMessage, 2000 + Math.random() * 3000);
      return () => clearInterval(interval);
    }
  }, [isSimulcasting, activePlatforms]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      platform: 'main',
      username: 'Creator',
      avatar: '/api/placeholder/32/32',
      message: newMessage,
      timestamp: new Date(),
      type: 'message',
      badges: ['Creator', 'Verified']
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate sending to all platforms
    if (isSimulcasting) {
      toast({
        title: "Message Sent",
        description: `Message sent to ${activePlatforms.length + 1} platform(s)`,
      });
    }
  };

  const pinMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
    ));
    
    toast({
      title: "Message Pinned",
      description: "Message pinned for all viewers",
    });
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    
    toast({
      title: "Message Deleted",
      description: "Message removed from all platforms",
    });
  };

  const banUser = (username: string) => {
    setMessages(prev => prev.filter(msg => msg.username !== username));
    
    toast({
      title: "User Banned",
      description: `${username} has been banned from all platforms`,
      variant: "destructive",
    });
  };

  const filteredMessages = messages.filter(msg => {
    const platformFilter = selectedPlatforms.includes('all') || selectedPlatforms.includes(msg.platform);
    const typeFilter = messageFilter === 'all' || 
                      (messageFilter === 'tips' && msg.type === 'tip') ||
                      (messageFilter === 'follows' && (msg.type === 'follow' || msg.type === 'subscribe')) ||
                      (messageFilter === 'messages' && msg.type === 'message');
    return platformFilter && typeFilter;
  });

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'tip': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'follow': return <Heart className="h-4 w-4 text-red-500" />;
      case 'subscribe': return <Users className="h-4 w-4 text-blue-500" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getMessageText = (msg: ChatMessage) => {
    switch (msg.type) {
      case 'tip':
        return `${msg.message} (Tipped $${msg.amount})`;
      case 'follow':
        return `Started following you! ${msg.message}`;
      case 'subscribe':
        return `Subscribed to your channel! ${msg.message}`;
      default:
        return msg.message;
    }
  };

  const stats = {
    totalMessages: messages.length,
    totalTips: messages.filter(m => m.type === 'tip').length,
    totalFollows: messages.filter(m => m.type === 'follow').length,
    totalSubs: messages.filter(m => m.type === 'subscribe').length,
    tipAmount: messages.filter(m => m.type === 'tip').reduce((sum, m) => sum + (m.amount || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Chat Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages</p>
                <p className="text-xl font-bold">{stats.totalMessages}</p>
              </div>
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tips</p>
                <p className="text-xl font-bold">{stats.totalTips}</p>
              </div>
              <Gift className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Follows</p>
                <p className="text-xl font-bold">{stats.totalFollows}</p>
              </div>
              <Heart className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
                <p className="text-xl font-bold">{stats.totalSubs}</p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tips Total</p>
                <p className="text-xl font-bold">${stats.tipAmount}</p>
              </div>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unified Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Unified Chat Dashboard
            {isSimulcasting && (
              <Badge className="bg-green-500 text-white animate-pulse">
                Live Across {activePlatforms.length + 1} Platform(s)
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Platforms:</span>
                  <div className="flex gap-1">
                    <Button
                      variant={selectedPlatforms.includes('all') ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPlatforms(['all'])}
                    >
                      All
                    </Button>
                    {Object.entries(platforms).map(([key, platform]) => (
                      <Button
                        key={key}
                        variant={selectedPlatforms.includes(key) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          if (selectedPlatforms.includes(key)) {
                            setSelectedPlatforms(prev => prev.filter(p => p !== key));
                          } else {
                            setSelectedPlatforms(prev => [...prev.filter(p => p !== 'all'), key]);
                          }
                        }}
                        className="flex items-center gap-1"
                      >
                        {platform.icon}
                        {platform.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <div className="flex gap-1">
                    {['all', 'messages', 'tips', 'follows'].map((filter) => (
                      <Button
                        key={filter}
                        variant={messageFilter === filter ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMessageFilter(filter as any)}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <Card className="h-96">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {filteredMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          msg.isPinned ? 'bg-yellow-50 border border-yellow-200' : 
                          msg.type === 'tip' ? 'bg-green-50 border border-green-200' :
                          msg.type === 'follow' || msg.type === 'subscribe' ? 'bg-blue-50 border border-blue-200' :
                          'hover:bg-muted/50'
                        }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback>{msg.username[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${platforms[msg.platform].color} text-white`}>
                              {platforms[msg.platform].icon}
                              {platforms[msg.platform].name}
                            </Badge>
                            <span className="font-semibold text-sm">{msg.username}</span>
                            {msg.badges?.map((badge, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                            <span className="text-xs text-muted-foreground ml-auto">
                              {msg.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            {getMessageIcon(msg.type)}
                            <p className="text-sm">{getMessageText(msg)}</p>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => pinMessage(msg.id)}>
                              <Pin className="h-4 w-4 mr-2" />
                              {msg.isPinned ? 'Unpin' : 'Pin'} Message
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteMessage(msg.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Message
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => banUser(msg.username)}
                              className="text-red-600"
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Ban User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </Card>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isSimulcasting 
                    ? `Send message to ${activePlatforms.length + 1} platform(s)...` 
                    : "Enter your message..."
                  }
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={!isSimulcasting}
                />
                <Button onClick={sendMessage} disabled={!isSimulcasting || !newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {!isSimulcasting && (
                <p className="text-sm text-muted-foreground text-center">
                  Start simulcasting to manage chat across platforms
                </p>
              )}
            </TabsContent>

            <TabsContent value="moderation" className="space-y-4">
              <div className="text-center py-8">
                <Ban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Chat Moderation</h3>
                <p className="text-muted-foreground">
                  Advanced moderation tools for managing chat across all platforms
                </p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Chat Settings</h3>
                <p className="text-muted-foreground">
                  Configure chat preferences and platform-specific settings
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedChat;