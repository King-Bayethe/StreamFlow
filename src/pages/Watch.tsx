import { useState, useEffect } from "react";
import { PaymentModal } from "@/components/PaymentModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heart, 
  DollarSign, 
  Send, 
  Gift, 
  Star, 
  Users, 
  Eye, 
  Clock,
  Pin,
  Settings,
  Share2,
  UserPlus,
  Volume2,
  VolumeX,
  Maximize,
  Play,
  Pause
} from "lucide-react";
import { useParams } from "react-router-dom";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isPaid?: boolean;
  amount?: number;
  isPinned?: boolean;
  avatar?: string;
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  totalEarnings: number;
  bio: string;
  isFollowing: boolean;
}

const Watch = () => {
  const { streamId } = useParams();
  const [message, setMessage] = useState("");
  const [tipAmount, setTipAmount] = useState(5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerCount, setViewerCount] = useState(12847);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Mock data - in real app this would come from API
  const stream = {
    id: streamId || "1",
    title: "Epic Gaming Marathon - Building the Ultimate City",
    category: "Gaming",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    duration: "3h 24m",
    startedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000)
  };

  const creator: Creator = {
    id: "creator1",
    name: "ProGamer_2024",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    followers: 125000,
    totalEarnings: 85600,
    bio: "Professional gamer and content creator. Building amazing worlds one stream at a time! 🎮✨",
    isFollowing: false
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "GameFan123",
      message: "This build is incredible! Love the architecture design",
      timestamp: new Date(Date.now() - 30000),
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: "2", 
      username: "CityBuilder",
      message: "Amazing stream! Keep up the great work 🔥",
      timestamp: new Date(Date.now() - 45000),
      isPaid: true,
      amount: 10,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: "3",
      username: "ArchitectPro",
      message: "That bridge design is absolutely stunning! You should make a tutorial on city planning techniques",
      timestamp: new Date(Date.now() - 15000),
      isPaid: true,
      amount: 25,
      isPinned: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: "4",
      username: "StreamLover",
      message: "First time watching, this is so relaxing!",
      timestamp: new Date(Date.now() - 10000),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ]);

  const pinnedMessages = chatMessages.filter(msg => msg.isPinned);
  const regularMessages = chatMessages.filter(msg => !msg.isPinned);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "You",
      message: message.trim(),
      timestamp: new Date(),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const sendTip = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (amount: number, tipMessage: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "You",
      message: tipMessage || `Thanks for the amazing stream! 💝`,
      timestamp: new Date(),
      isPaid: true,
      amount: amount,
      isPinned: true, // Paid messages are automatically pinned
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  // Simulate real-time viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1800px] mx-auto p-4 gap-4 grid grid-cols-1 xl:grid-cols-4">
        {/* Main Video Section */}
        <div className="xl:col-span-3 space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden bg-black">
            <div className="relative aspect-video bg-black">
              <img 
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-full object-cover"
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <span className="text-white text-sm font-medium">{stream.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Live Indicator */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold live-indicator">
                LIVE
              </div>
              
              {/* Viewer Count */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {viewerCount.toLocaleString()}
              </div>
            </div>
          </Card>

          {/* Stream Info */}
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{stream.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <Badge variant="secondary">{stream.category}</Badge>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Started {stream.duration} ago
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {viewerCount.toLocaleString()} watching
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
              </div>
            </div>
          </Card>

          {/* Creator Profile */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <a 
                    href={`/channel/${creator.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xl font-semibold hover:text-primary transition-colors"
                  >
                    {creator.name}
                  </a>
                  <Badge variant="outline" className="text-xs">
                    {creator.followers.toLocaleString()} followers
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{creator.bio}</p>
                
                <div className="flex items-center gap-4">
                  <Button variant={creator.isFollowing ? "outline" : "default"}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    {creator.isFollowing ? "Following" : "Follow"}
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-accent">
                      ${creator.totalEarnings.toLocaleString()}
                    </span> total earnings
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Section */}
        <div className="xl:col-span-1">
          <Card className="h-[800px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Live Chat ({viewerCount.toLocaleString()})
              </h3>
            </div>

            {/* Pinned Messages */}
            {pinnedMessages.length > 0 && (
              <div className="p-4 bg-muted/50 border-b">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Pin className="w-3 h-3" />
                  Pinned Messages
                </h4>
                <div className="space-y-2">
                  {pinnedMessages.map(msg => (
                    <div key={msg.id} className="bg-background rounded-lg p-3 border border-accent/20">
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback>{msg.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-accent">{msg.username}</span>
                            {msg.isPaid && (
                              <Badge variant="secondary" className="text-xs">
                                ${msg.amount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {regularMessages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium text-sm ${msg.isPaid ? 'text-accent' : 'text-foreground'}`}>
                          {msg.username}
                        </span>
                        {msg.isPaid && (
                          <Badge variant="secondary" className="text-xs">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {msg.amount}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Tip Section */}
            <div className="p-4 border-t bg-muted/30">
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-2">Send a Tip</h4>
                <Button 
                  className="w-full bg-gradient-to-r from-accent to-primary text-white"
                  onClick={sendTip}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Send Tip with Message
                </Button>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button size="icon" onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Be respectful in chat</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>Highlight message for $2</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          creatorName={creator.name}
          creatorAvatar={creator.avatar}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

export default Watch;