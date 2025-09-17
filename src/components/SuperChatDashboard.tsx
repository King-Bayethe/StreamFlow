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
import { 
  MessageSquare,
  DollarSign,
  Pin,
  Trash2,
  Reply,
  Eye,
  EyeOff,
  TrendingUp,
  Users,
  Clock,
  Gift,
  Crown,
  Settings,
  Heart,
  Star
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SuperChatMessage {
  id: string;
  username: string;
  avatar?: string;
  message: string;
  amount: number;
  currency: string;
  timestamp: Date;
  isPinned: boolean;
  isHidden: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  pinDuration: number;
}

interface SuperChatTier {
  name: string;
  minAmount: number;
  color: string;
  icon: React.ReactNode;
  pinDuration: number;
}

const SuperChatDashboard = ({ streamId }: { streamId?: string }) => {
  const { toast } = useToast();
  const [superChats, setSuperChats] = useState<SuperChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    autoPin: true,
    autoModeration: true,
    showOnOverlay: true,
    minAmount: 1.00
  });

  const tiers: SuperChatTier[] = [
    { name: 'Bronze', minAmount: 1, color: 'bg-amber-600', icon: <Gift className="w-4 h-4" />, pinDuration: 30 },
    { name: 'Silver', minAmount: 5, color: 'bg-gray-400', icon: <Star className="w-4 h-4" />, pinDuration: 120 },
    { name: 'Gold', minAmount: 10, color: 'bg-yellow-500', icon: <Crown className="w-4 h-4" />, pinDuration: 300 },
    { name: 'Diamond', minAmount: 50, color: 'bg-blue-500', icon: <Crown className="w-4 h-4" />, pinDuration: 600 }
  ];

  useEffect(() => {
    loadSuperChats();
    
    // Set up real-time subscription for new Super Chats
    const subscription = supabase
      .channel('superchat-updates')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: 'is_paid=eq.true' },
        (payload) => {
          const newMessage = payload.new;
          addSuperChat({
            id: newMessage.id,
            username: newMessage.username,
            message: newMessage.content,
            amount: newMessage.amount_cents / 100,
            currency: newMessage.currency || 'USD',
            timestamp: new Date(newMessage.created_at),
            isPinned: newMessage.pinned_until ? new Date(newMessage.pinned_until) > new Date() : false,
            isHidden: false,
            tier: getTierFromAmount(newMessage.amount_cents / 100),
            pinDuration: calculatePinDuration(newMessage.amount_cents / 100)
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [streamId]);

  const loadSuperChats = async () => {
    try {
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('is_paid', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const formattedMessages = messages?.map(msg => ({
        id: msg.id,
        username: msg.username,
        message: msg.content,
        amount: msg.amount_cents / 100,
        currency: msg.currency || 'USD',
        timestamp: new Date(msg.created_at),
        isPinned: msg.pinned_until ? new Date(msg.pinned_until) > new Date() : false,
        isHidden: false,
        tier: getTierFromAmount(msg.amount_cents / 100),
        pinDuration: calculatePinDuration(msg.amount_cents / 100)
      })) || [];

      setSuperChats(formattedMessages);
    } catch (error) {
      console.error('Error loading Super Chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierFromAmount = (amount: number): SuperChatMessage['tier'] => {
    if (amount >= 50) return 'diamond';
    if (amount >= 10) return 'gold';
    if (amount >= 5) return 'silver';
    return 'bronze';
  };

  const calculatePinDuration = (amount: number): number => {
    const tier = tiers.find(t => amount >= t.minAmount) || tiers[0];
    return tier.pinDuration;
  };

  const addSuperChat = (newChat: SuperChatMessage) => {
    setSuperChats(prev => [newChat, ...prev]);
    
    if (settings.autoPin) {
      toast({
        title: "New Super Chat!",
        description: `$${newChat.amount.toFixed(2)} from ${newChat.username}`,
      });
    }
  };

  const togglePin = async (messageId: string) => {
    try {
      const message = superChats.find(m => m.id === messageId);
      if (!message) return;

      const newPinnedUntil = message.isPinned 
        ? null 
        : new Date(Date.now() + message.pinDuration * 1000);

      const { error } = await supabase
        .from('chat_messages')
        .update({ pinned_until: newPinnedUntil?.toISOString() })
        .eq('id', messageId);

      if (error) throw error;

      setSuperChats(prev => 
        prev.map(chat => 
          chat.id === messageId 
            ? { ...chat, isPinned: !chat.isPinned }
            : chat
        )
      );

      toast({
        title: message.isPinned ? "Message Unpinned" : "Message Pinned",
        description: `Super Chat ${message.isPinned ? 'unpinned' : 'pinned'}`
      });
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const hideMessage = (messageId: string) => {
    setSuperChats(prev => 
      prev.map(chat => 
        chat.id === messageId 
          ? { ...chat, isHidden: !chat.isHidden }
          : chat
      )
    );
    
    toast({
      title: "Message Hidden",
      description: "Super Chat has been hidden from display"
    });
  };

  const replyToSuperChat = (messageId: string) => {
    const message = superChats.find(m => m.id === messageId);
    if (message) {
      toast({
        title: "Reply Feature",
        description: `Would reply to ${message.username}'s Super Chat`,
      });
    }
  };

  const getTierInfo = (tier: SuperChatMessage['tier']) => {
    return tiers.find(t => t.name.toLowerCase() === tier) || tiers[0];
  };

  const totalRevenue = superChats.reduce((sum, chat) => sum + chat.amount, 0);
  const todayRevenue = superChats
    .filter(chat => {
      const today = new Date();
      const chatDate = chat.timestamp;
      return chatDate.toDateString() === today.toDateString();
    })
    .reduce((sum, chat) => sum + chat.amount, 0);

  if (loading) {
    return <div className="p-8 text-center">Loading Super Chats...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Super Chat Dashboard
          </h3>
          <p className="text-muted-foreground">Monitor and manage Super Chat messages</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Today</div>
            <div className="text-xl font-bold">${todayRevenue.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-xl font-bold">${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">Live Feed</TabsTrigger>
          <TabsTrigger value="pinned">Pinned</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Live Super Chat Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {superChats.length === 0 ? (
                  <div className="text-center py-12">
                    <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Super Chats yet</h3>
                    <p className="text-muted-foreground">Super Chats will appear here when viewers send them</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {superChats.filter(chat => !chat.isHidden).map((chat) => {
                      const tierInfo = getTierInfo(chat.tier);
                      return (
                        <Card key={chat.id} className={`${tierInfo.color} bg-opacity-20 border-l-4 border-l-current`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={chat.avatar} />
                                  <AvatarFallback>{chat.username[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">{chat.username}</span>
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                      {tierInfo.icon}
                                      ${chat.amount.toFixed(2)}
                                    </Badge>
                                    {chat.isPinned && (
                                      <Badge variant="outline">
                                        <Pin className="w-3 h-3 mr-1" />
                                        Pinned
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm mb-2">{chat.message}</p>
                                  <div className="text-xs text-muted-foreground">
                                    {chat.timestamp.toLocaleTimeString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 ml-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => togglePin(chat.id)}
                                >
                                  <Pin className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => replyToSuperChat(chat.id)}
                                >
                                  <Reply className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => hideMessage(chat.id)}
                                >
                                  <EyeOff className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pinned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pin className="w-5 h-5" />
                Pinned Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {superChats.filter(chat => chat.isPinned && !chat.isHidden).map((chat) => {
                    const tierInfo = getTierInfo(chat.tier);
                    return (
                      <Card key={chat.id} className={`${tierInfo.color} bg-opacity-20 border-l-4 border-l-current`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={chat.avatar} />
                                <AvatarFallback>{chat.username[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm">{chat.username}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    ${chat.amount.toFixed(2)}
                                  </Badge>
                                </div>
                                <p className="text-sm">{chat.message}</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => togglePin(chat.id)}
                            >
                              <Pin className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Super Chats</p>
                    <p className="text-2xl font-bold">{superChats.length}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Amount</p>
                    <p className="text-2xl font-bold">
                      ${superChats.length > 0 ? (totalRevenue / superChats.length).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Unique Supporters</p>
                    <p className="text-2xl font-bold">
                      {new Set(superChats.map(chat => chat.username)).size}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Super Chat Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {tiers.map((tier) => {
                  const tierChats = superChats.filter(chat => chat.tier === tier.name.toLowerCase());
                  const tierRevenue = tierChats.reduce((sum, chat) => sum + chat.amount, 0);
                  
                  return (
                    <Card key={tier.name} className={`${tier.color} bg-opacity-20`}>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          {tier.icon}
                          <span className="ml-2 font-semibold">{tier.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">${tier.minAmount}+ minimum</p>
                        <div className="space-y-1">
                          <p className="text-lg font-bold">{tierChats.length}</p>
                          <p className="text-xs text-muted-foreground">messages</p>
                          <p className="text-sm font-semibold">${tierRevenue.toFixed(2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Super Chat Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-pin">Auto-pin Super Chats</Label>
                  <p className="text-sm text-muted-foreground">Automatically pin Super Chats based on amount</p>
                </div>
                <Switch
                  id="auto-pin"
                  checked={settings.autoPin}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoPin: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-moderation">Auto-moderation</Label>
                  <p className="text-sm text-muted-foreground">Filter inappropriate Super Chat messages</p>
                </div>
                <Switch
                  id="auto-moderation"
                  checked={settings.autoModeration}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoModeration: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-overlay">Show on stream overlay</Label>
                  <p className="text-sm text-muted-foreground">Display Super Chats on your stream overlay</p>
                </div>
                <Switch
                  id="show-overlay"
                  checked={settings.showOnOverlay}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showOnOverlay: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-amount">Minimum Super Chat Amount</Label>
                <Input
                  id="min-amount"
                  type="number"
                  min="0.50"
                  max="100"
                  step="0.50"
                  value={settings.minAmount}
                  onChange={(e) => setSettings(prev => ({ ...prev, minAmount: parseFloat(e.target.value) || 1.00 }))}
                />
                <p className="text-xs text-muted-foreground">Minimum amount required for Super Chat messages</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperChatDashboard;