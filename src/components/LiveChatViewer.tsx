import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Heart, 
  Gift, 
  Crown, 
  Star,
  Pin,
  MessageCircle,
  Users,
  DollarSign,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  username: string;
  content: string;
  created_at: string;
  is_paid?: boolean;
  amount_cents?: number;
  pinned_until?: string;
  user_level?: number;
  badges?: string[];
}

interface LiveChatViewerProps {
  streamId: string;
  className?: string;
}

const LiveChatViewer = ({ streamId, className }: LiveChatViewerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to real-time chat messages
  useEffect(() => {
    const channel = supabase
      .channel(`stream-chat-${streamId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `stream_id=eq.${streamId}`
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Load recent messages
    loadRecentMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [streamId]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadRecentMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('stream_id', streamId)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      setMessages(data?.reverse() || []);
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to chat",
        variant: "destructive",
      });
      return;
    }

    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          stream_id: streamId,
          user_id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous',
          content: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage("");
    } catch (error: any) {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getMessageTier = (amountCents?: number) => {
    if (!amountCents) return null;
    const amount = amountCents / 100;
    
    if (amount >= 25) return { color: "bg-pink-500", icon: Crown, label: "VIP" };
    if (amount >= 10) return { color: "bg-purple-500", icon: Star, label: "Premium" };
    if (amount >= 5) return { color: "bg-green-500", icon: Gift, label: "Highlight" };
    return { color: "bg-blue-500", icon: DollarSign, label: "Support" };
  };

  const isPinned = (message: ChatMessage) => {
    return message.pinned_until && new Date(message.pinned_until) > new Date();
  };

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Live Chat
            {isConnected ? (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {viewerCount}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4 max-h-96">
          <div className="space-y-3">
            {messages.map((message) => {
              const tier = getMessageTier(message.amount_cents);
              const pinned = isPinned(message);
              
              return (
                <div key={message.id} className={`group ${pinned ? 'order-first' : ''}`}>
                  {/* Super Chat Message */}
                  {message.is_paid && tier && (
                    <div className={`p-3 rounded-lg border-l-4 ${tier.color} bg-muted/50 mb-2`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded ${tier.color} text-white`}>
                            <tier.icon className="h-3 w-3" />
                          </div>
                          <Badge variant="secondary">{tier.label}</Badge>
                          <span className="font-medium text-primary">
                            ${((message.amount_cents || 0) / 100).toFixed(2)}
                          </span>
                          {pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {message.username[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <span className="font-medium text-sm">{message.username}</span>
                            {message.user_level && message.user_level >= 10 && (
                              <Crown className="h-3 w-3 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm break-words">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Regular Chat Message */}
                  {!message.is_paid && (
                    <div className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 transition-colors">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {message.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium text-sm truncate">{message.username}</span>
                          {message.user_level && message.user_level >= 10 && (
                            <Crown className="h-3 w-3 text-yellow-500" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm break-words">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <Separator />

        {/* Message Input */}
        <div className="p-4">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={user ? "Type your message..." : "Sign in to chat"}
              disabled={!user || !isConnected}
              maxLength={200}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!user || !newMessage.trim() || !isConnected}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          {!user && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Please sign in to participate in chat
            </p>
          )}
          
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>{newMessage.length}/200</span>
            <div className="flex items-center gap-1">
              Connection: 
              <span className={isConnected ? "text-green-500" : "text-red-500"}>
                {isConnected ? "Live" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveChatViewer;