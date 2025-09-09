import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Heart, 
  MessageCircle, 
  Gift, 
  Star, 
  Users, 
  Eye, 
  Send,
  Crown,
  Flame,
  Trophy,
  Zap,
  ThumbsUp,
  Share2,
  Bookmark,
  Settings,
  Volume2,
  VolumeX,
  Maximize,
  Play,
  Pause,
  Pin,
  ChevronUp,
  X
} from "lucide-react";
import LivePolls from "./LivePolls";
import GamifiedChat from "./GamifiedChat";
import { useParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isPaid?: boolean;
  amount?: number;
  isPinned?: boolean;
  avatar: string;
  level: number;
  badges: string[];
  xpGained?: number;
}

interface ActivePoll {
  id: string;
  question: string;
  options: Array<{ text: string; votes: number }>;
  totalVotes: number;
  timeRemaining: number;
}

interface Giveaway {
  id: string;
  title: string;
  prize: string;
  timeRemaining: number;
  participants: number;
  requirements: string[];
}

const InteractiveStreamPage = () => {
  const { streamId } = useParams();
  const isMobile = useIsMobile();
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [viewerCount, setViewerCount] = useState(12847);
  const [activeTab, setActiveTab] = useState("chat");
  const [likes, setLikes] = useState(1247);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Mock data
  const stream = {
    id: streamId || "1",
    title: "Epic Gaming Marathon - Building the Ultimate City",
    category: "Gaming",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    duration: "3h 24m",
    startedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000)
  };

  const creator = {
    id: "creator1",
    name: "ProGamer_2024",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    followers: 125000,
    tier: "VIP",
    isVerified: true
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
      {
        id: "1",
        username: "GameMaster_Pro",
        message: "This city build is absolutely incredible! The detail is amazing 🏗️",
        timestamp: new Date(Date.now() - 30000),
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face",
        level: 47,
        badges: ["vip", "supporter"],
        xpGained: 15
      },
      {
        id: "2",
        username: "ArchitectFan",
        message: "Thanks for the amazing stream! Here's a tip for your awesome work! 💰",
        timestamp: new Date(Date.now() - 45000),
        isPaid: true,
        amount: 25,
        isPinned: true,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=40&h=40&fit=crop&crop=face",
        level: 23,
        badges: ["legend", "first_time"],
        xpGained: 50
      },
      {
        id: "3",
        username: "CityPlanner_2024",
        message: "That bridge design technique is brilliant! Can you show the traffic flow simulation?",
        timestamp: new Date(Date.now() - 15000),
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        level: 32,
        badges: ["expert"],
        xpGained: 20
      },
      {
        id: "4",
        username: "NewViewer_123",
        message: "First time watching, this is so relaxing and educational!",
        timestamp: new Date(Date.now() - 10000),
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        level: 1,
        badges: ["newcomer"],
        xpGained: 5
      }
  ]);

  const activePoll: ActivePoll = {
    id: "poll1",
    question: "What should we build next in the city?",
    options: [
      { text: "Shopping District", votes: 342 },
      { text: "Industrial Zone", votes: 187 },
      { text: "Entertainment Complex", votes: 298 },
      { text: "Residential Area", votes: 156 }
    ],
    totalVotes: 983,
    timeRemaining: 120
  };

  const activeGiveaway: Giveaway = {
    id: "giveaway1",
    title: "Gaming Setup Giveaway",
    prize: "RTX 4080 Graphics Card",
    timeRemaining: 1800,
    participants: 2341,
    requirements: ["Follow the channel", "Be active in chat", "Watch for 30+ minutes"]
  };

  const topTippers = [
    { username: "MegaSupporter", amount: 500, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" },
    { username: "GenerousViewer", amount: 250, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=40&h=40&fit=crop" },
    { username: "CityFan", amount: 150, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "You",
      message: message.trim(),
      timestamp: new Date(),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: 25,
      badges: ["supporter"],
      xpGained: 10
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className={`max-w-[1800px] mx-auto ${isMobile ? 'p-0' : 'p-4'} gap-4 grid grid-cols-1 ${isMobile ? '' : 'xl:grid-cols-4'}`}>
        {/* Main Video Section */}
        <div className={`${isMobile ? '' : 'xl:col-span-3'} space-y-4`}>
          {/* Video Player */}
          <Card className={`overflow-hidden bg-black ${isMobile ? 'rounded-none' : ''}`}>
            <div className="relative aspect-video bg-black">
              <img 
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-full object-cover"
              />
              
              {/* Video Controls Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent ${isMobile ? 'opacity-100' : 'opacity-0 hover:opacity-100'} transition-opacity`}>
                <div className={`absolute bottom-4 ${isMobile ? 'left-2 right-2' : 'left-4 right-4'} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <Button 
                      size={isMobile ? "default" : "sm"} 
                      variant="ghost" 
                      className={`text-white hover:bg-white/20 ${isMobile ? 'h-11 w-11' : ''}`}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} /> : <Play className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />}
                    </Button>
                    <Button 
                      size={isMobile ? "default" : "sm"} 
                      variant="ghost" 
                      className={`text-white hover:bg-white/20 ${isMobile ? 'h-11 w-11' : ''}`}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} /> : <Volume2 className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />}
                    </Button>
                    {!isMobile && <span className="text-white text-sm font-medium">{stream.duration}</span>}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size={isMobile ? "default" : "sm"} 
                      variant="ghost" 
                      className={`text-white hover:bg-white/20 ${isMobile ? 'h-11 w-11' : ''}`}
                    >
                      <Settings className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                    </Button>
                    <Button 
                      size={isMobile ? "default" : "sm"} 
                      variant="ghost" 
                      className={`text-white hover:bg-white/20 ${isMobile ? 'h-11 w-11' : ''}`}
                    >
                      <Maximize className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
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

              {/* Interactive Overlay - Active Poll */}
              {!isMobile && (
                <div className="absolute bottom-20 left-4 right-4">
                  <Card className="bg-black/80 backdrop-blur-sm text-white border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">Live Poll</h4>
                        <Badge variant="secondary" className="text-xs">
                          {formatTime(activePoll.timeRemaining)}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{activePoll.question}</p>
                      <div className="space-y-2">
                        {activePoll.options.map((option, index) => {
                          const percentage = (option.votes / activePoll.totalVotes) * 100;
                          return (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>{option.text}</span>
                                <span>{option.votes} votes</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </Card>

          {/* Stream Info & Actions */}
          <Card className={`${isMobile ? 'rounded-none p-4' : 'p-6'}`}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2`}>{stream.title}</h1>
                <div className={`flex items-center ${isMobile ? 'flex-wrap' : ''} gap-4 text-sm text-muted-foreground mb-4`}>
                  <Badge variant="secondary">{stream.category}</Badge>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {viewerCount.toLocaleString()} watching
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {likes.toLocaleString()} likes
                  </div>
                </div>
                
                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}>
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{creator.name}</span>
                      {creator.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                      <Badge variant="outline" className="text-xs">{creator.tier}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{creator.followers.toLocaleString()} followers</p>
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center ${isMobile ? 'flex-wrap' : ''} gap-2`}>
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  size={isMobile ? "default" : "sm"}
                  onClick={handleLike}
                  className={isMobile ? 'h-11' : ''}
                >
                  <Heart className={`w-4 h-4 ${isMobile ? '' : 'mr-2'} ${isLiked ? 'fill-current' : ''}`} />
                  {!isMobile && (isLiked ? 'Liked' : 'Like')}
                </Button>
                <Button 
                  variant={isFollowing ? "outline" : "default"} 
                  size={isMobile ? "default" : "sm"}
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={isMobile ? 'h-11' : ''}
                >
                  {!isMobile && (isFollowing ? 'Following' : 'Follow')}
                  {isMobile && <Users className="w-4 h-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "sm"} 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isMobile ? 'h-11' : ''}
                >
                  <Bookmark className={`w-4 h-4 ${isMobile ? '' : 'mr-2'} ${isBookmarked ? 'fill-current' : ''}`} />
                  {!isMobile && 'Save'}
                </Button>
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "sm"}
                  className={isMobile ? 'h-11' : ''}
                >
                  <Share2 className={`w-4 h-4 ${isMobile ? '' : 'mr-2'}`} />
                  {!isMobile && 'Share'}
                </Button>
                <Button className={`bg-gradient-to-r from-accent to-primary ${isMobile ? 'h-11' : ''}`}>
                  <Gift className={`w-4 h-4 ${isMobile ? '' : 'mr-2'}`} />
                  {!isMobile && 'Tip Creator'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Top Tippers */}
          {!isMobile && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Top Supporters Today
              </h3>
              <div className="flex items-center gap-6">
                {topTippers.map((tipper, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={tipper.avatar} alt={tipper.username} />
                        <AvatarFallback>{tipper.username[0]}</AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <Crown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tipper.username}</p>
                      <p className="text-sm text-accent">${tipper.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="xl:col-span-1">
            <Card className="h-[800px] flex flex-col">
              {/* Sidebar Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="chat" className="text-xs">
                      <MessageCircle className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="polls" className="text-xs">
                      <Star className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="giveaway" className="text-xs">
                      <Gift className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="viewers" className="text-xs">
                      <Users className="w-4 h-4" />
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Chat Tab */}
                <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Live Chat ({viewerCount.toLocaleString()})
                    </h3>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <GamifiedChat messages={chatMessages} />
                  </ScrollArea>

                  <div className="p-4 border-t">
                    <div className="flex gap-2 mb-2">
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
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Be respectful in chat</span>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>Earn XP by chatting!</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Polls Tab */}
                <TabsContent value="polls" className="flex-1 flex flex-col m-0">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Live Polls
                    </h3>
                  </div>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <LivePolls isLive={true} />
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Giveaway Tab */}
                <TabsContent value="giveaway" className="flex-1 flex flex-col m-0">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Active Giveaway
                    </h3>
                  </div>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <Card className="p-4 border-accent/20 bg-accent/5">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{activeGiveaway.title}</h4>
                          <Badge variant="secondary">
                            {formatTime(activeGiveaway.timeRemaining)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-accent" />
                            <span className="font-medium">{activeGiveaway.prize}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{activeGiveaway.participants.toLocaleString()} participants</span>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Requirements:</p>
                            <ul className="text-xs space-y-1">
                              {activeGiveaway.requirements.map((req, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-accent rounded-full" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Button className="w-full bg-gradient-to-r from-accent to-primary">
                            <Gift className="w-4 h-4 mr-2" />
                            Enter Giveaway
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Viewers Tab */}
                <TabsContent value="viewers" className="flex-1 flex flex-col m-0">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Active Viewers
                    </h3>
                  </div>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                      {[...Array(20)].map((_, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=32&h=32&fit=crop&crop=face`} />
                            <AvatarFallback>U{index + 1}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">Viewer_{index + 1}</p>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="text-xs">
                                Level {Math.floor(Math.random() * 50) + 1}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}

        {/* Mobile Bottom Sheet for Chat and Interactions */}
        {isMobile && (
          <>
            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
              <div className="flex items-center justify-around p-4">
                <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="default" className="flex flex-col gap-1 h-auto py-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs">Chat</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[70vh] p-0">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="font-semibold flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Live Chat ({viewerCount.toLocaleString()})
                        </h3>
                      </div>

                      <ScrollArea className="flex-1 p-4">
                        <GamifiedChat messages={chatMessages} />
                      </ScrollArea>

                      <div className="p-4 border-t">
                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1 h-11"
                          />
                          <Button size="default" onClick={sendMessage} className="h-11 w-11">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Be respectful in chat</span>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>Earn XP by chatting!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Button 
                  variant="ghost" 
                  size="default" 
                  className="flex flex-col gap-1 h-auto py-2"
                  onClick={() => setActiveTab("polls")}
                >
                  <Star className="w-5 h-5" />
                  <span className="text-xs">Polls</span>
                </Button>

                <Button 
                  variant="ghost" 
                  size="default" 
                  className="flex flex-col gap-1 h-auto py-2"
                  onClick={() => setActiveTab("giveaway")}
                >
                  <Gift className="w-5 h-5" />
                  <span className="text-xs">Giveaway</span>
                </Button>

                <Button 
                  variant="ghost" 
                  size="default" 
                  className="flex flex-col gap-1 h-auto py-2"
                  onClick={() => setActiveTab("viewers")}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Viewers</span>
                </Button>
              </div>
            </div>

            {/* Mobile Poll Overlay */}
            {activeTab === "polls" && (
              <div className="fixed inset-x-4 bottom-24 z-40">
                <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">Live Poll</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {formatTime(activePoll.timeRemaining)}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setActiveTab("chat")}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{activePoll.question}</p>
                    <div className="space-y-2">
                      {activePoll.options.map((option, index) => {
                        const percentage = (option.votes / activePoll.totalVotes) * 100;
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{option.text}</span>
                              <span>{option.votes} votes</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Mobile Giveaway Overlay */}
            {activeTab === "giveaway" && (
              <div className="fixed inset-x-4 bottom-24 z-40 max-h-[50vh] overflow-hidden">
                <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{activeGiveaway.title}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab("chat")}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-accent" />
                        <span className="font-medium">{activeGiveaway.prize}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{activeGiveaway.participants.toLocaleString()} participants</span>
                        </div>
                        <Badge variant="secondary">
                          {formatTime(activeGiveaway.timeRemaining)}
                        </Badge>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-accent to-primary h-11">
                        <Gift className="w-4 h-4 mr-2" />
                        Enter Giveaway
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Mobile Viewers Overlay */}
            {activeTab === "viewers" && (
              <div className="fixed inset-x-4 bottom-24 z-40 max-h-[50vh]">
                <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Active Viewers
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab("chat")}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <ScrollArea className="h-48">
                      <div className="space-y-3">
                        {[...Array(10)].map((_, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=32&h=32&fit=crop&crop=face`} />
                              <AvatarFallback>U{index + 1}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">Viewer_{index + 1}</p>
                              <Badge variant="outline" className="text-xs">
                                Level {Math.floor(Math.random() * 50) + 1}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Add bottom padding to prevent content being hidden behind mobile nav */}
            <div className="h-24" />
          </>
        )}
      </div>
    </div>
  );
};

export default InteractiveStreamPage;