import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Scissors, 
  Zap, 
  Sparkles, 
  TrendingUp,
  MessageSquare,
  Volume2,
  Eye,
  Download,
  Share2,
  Play,
  Clock,
  Hash,
  Trophy,
  Flame,
  Heart,
  Users,
  Settings,
  Wand2,
  FileVideo,
  Target
} from "lucide-react";

interface HypeMoment {
  id: string;
  timestamp: string;
  duration: number;
  confidence: number;
  triggers: {
    chatSpike: number;
    audioSentiment: number;
    visualMotion: number;
  };
  metrics: {
    chatVelocity: number;
    emotionScore: number;
    motionIntensity: number;
    viewerReactions: number;
  };
  preview: string;
  status: "detecting" | "processing" | "ready" | "published";
}

interface AIClip {
  id: string;
  title: string;
  description: string;
  hashtags: string[];
  duration: number;
  hypeMoment: HypeMoment;
  videoUrl: string;
  thumbnailUrl: string;
  platforms: {
    tiktok: boolean;
    instagram: boolean;
    youtube: boolean;
    twitter: boolean;
  };
  analytics: {
    estimatedViews: number;
    viralPotential: number;
    engagementScore: number;
  };
  createdAt: Date;
}

const AIClippingSystem = () => {
  const [activeTab, setActiveTab] = useState("detection");
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [detectionSensitivity, setDetectionSensitivity] = useState(75);
  
  // Mock real-time hype moments
  const [hypeMoments, setHypeMoments] = useState<HypeMoment[]>([
    {
      id: "hype1",
      timestamp: "02:15:30",
      duration: 45,
      confidence: 95,
      triggers: {
        chatSpike: 230,
        audioSentiment: 0.89,
        visualMotion: 0.76
      },
      metrics: {
        chatVelocity: 45,
        emotionScore: 0.92,
        motionIntensity: 0.83,
        viewerReactions: 156
      },
      preview: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      status: "ready"
    },
    {
      id: "hype2", 
      timestamp: "01:42:18",
      duration: 32,
      confidence: 87,
      triggers: {
        chatSpike: 180,
        audioSentiment: 0.82,
        visualMotion: 0.69
      },
      metrics: {
        chatVelocity: 38,
        emotionScore: 0.85,
        motionIntensity: 0.71,
        viewerReactions: 124
      },
      preview: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      status: "processing"
    },
    {
      id: "hype3",
      timestamp: "00:58:45",
      duration: 28,
      confidence: 78,
      triggers: {
        chatSpike: 150,
        audioSentiment: 0.75,
        visualMotion: 0.64
      },
      metrics: {
        chatVelocity: 32,
        emotionScore: 0.79,
        motionIntensity: 0.68,
        viewerReactions: 98
      },
      preview: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      status: "detecting"
    }
  ]);

  // Mock generated clips
  const [aiClips, setAiClips] = useState<AIClip[]>([
    {
      id: "clip1",
      title: "INSANE City Build Reveals Epic Bridge Design! 🔥",
      description: "Watch this mind-blowing moment when our streamer reveals the most incredible bridge design in city building history! The chat went absolutely crazy! 🏗️✨ #CityBuilder #Gaming #Epic",
      hashtags: ["#CityBuilder", "#Gaming", "#Epic", "#Viral", "#StreamHighlights", "#Architecture", "#Design"],
      duration: 45,
      hypeMoment: hypeMoments[0],
      videoUrl: "https://example.com/clip1.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      platforms: {
        tiktok: true,
        instagram: true, 
        youtube: true,
        twitter: false
      },
      analytics: {
        estimatedViews: 125000,
        viralPotential: 92,
        engagementScore: 88
      },
      createdAt: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: "clip2",
      title: "Chat EXPLODED When This Happened! 😱",
      description: "The moment that broke the internet! Viewers couldn't contain their excitement when this incredible play happened live on stream! 🎮🔥 #StreamMoments #Hype",
      hashtags: ["#StreamMoments", "#Hype", "#Gaming", "#Reaction", "#Viral", "#LiveStream"],
      duration: 32,
      hypeMoment: hypeMoments[1],
      videoUrl: "https://example.com/clip2.mp4", 
      thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      platforms: {
        tiktok: true,
        instagram: false,
        youtube: true,
        twitter: true
      },
      analytics: {
        estimatedViews: 89000,
        viralPotential: 85,
        engagementScore: 82
      },
      createdAt: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]);

  // Real-time metrics
  const [realtimeMetrics, setRealtimeMetrics] = useState({
    chatActivity: 0,
    audioEnergy: 0,
    visualMotion: 0,
    currentHypeLevel: 0
  });

  // Simulate real-time detection
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeMetrics({
        chatActivity: Math.random() * 100,
        audioEnergy: Math.random() * 100,
        visualMotion: Math.random() * 100,
        currentHypeLevel: Math.random() * 100
      });

      // Randomly add new hype moments
      if (Math.random() > 0.95) {
        const newMoment: HypeMoment = {
          id: `hype_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          duration: Math.floor(Math.random() * 60) + 20,
          confidence: Math.floor(Math.random() * 40) + 60,
          triggers: {
            chatSpike: Math.floor(Math.random() * 200) + 50,
            audioSentiment: Math.random() * 0.5 + 0.5,
            visualMotion: Math.random() * 0.5 + 0.5
          },
          metrics: {
            chatVelocity: Math.floor(Math.random() * 50) + 20,
            emotionScore: Math.random() * 0.4 + 0.6,
            motionIntensity: Math.random() * 0.4 + 0.6,
            viewerReactions: Math.floor(Math.random() * 100) + 50
          },
          preview: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
          status: "detecting"
        };
        
        setHypeMoments(prev => [newMoment, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateClip = async (hypeMoment: HypeMoment) => {
    // Update status to processing
    setHypeMoments(prev => 
      prev.map(moment => 
        moment.id === hypeMoment.id 
          ? { ...moment, status: "processing" as const }
          : moment
      )
    );

    // Simulate AI processing delay
    setTimeout(() => {
      const newClip: AIClip = {
        id: `clip_${Date.now()}`,
        title: `Epic Stream Moment at ${hypeMoment.timestamp}! 🔥`,
        description: `Incredible moment captured during live stream! Chat activity spiked ${hypeMoment.triggers.chatSpike}% with amazing viewer reactions! 🎮✨ #StreamHighlights #Gaming #Viral`,
        hashtags: ["#StreamHighlights", "#Gaming", "#Viral", "#LiveStream", "#Epic", "#Hype"],
        duration: hypeMoment.duration,
        hypeMoment,
        videoUrl: "https://example.com/generated-clip.mp4",
        thumbnailUrl: hypeMoment.preview,
        platforms: {
          tiktok: true,
          instagram: true,
          youtube: true,
          twitter: false
        },
        analytics: {
          estimatedViews: Math.floor(Math.random() * 100000) + 50000,
          viralPotential: hypeMoment.confidence,
          engagementScore: Math.floor(hypeMoment.confidence * 0.9)
        },
        createdAt: new Date()
      };

      setAiClips(prev => [newClip, ...prev]);
      
      // Update hype moment status
      setHypeMoments(prev => 
        prev.map(moment => 
          moment.id === hypeMoment.id 
            ? { ...moment, status: "ready" as const }
            : moment
        )
      );
    }, 3000);
  };

  const getStatusColor = (status: HypeMoment["status"]) => {
    switch (status) {
      case "detecting": return "bg-blue-500";
      case "processing": return "bg-yellow-500";
      case "ready": return "bg-green-500";
      case "published": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: HypeMoment["status"]) => {
    switch (status) {
      case "detecting": return <Eye className="w-4 h-4" />;
      case "processing": return <Wand2 className="w-4 h-4 animate-spin" />;
      case "ready": return <Scissors className="w-4 h-4" />;
      case "published": return <Share2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Scissors className="w-6 h-6 text-primary" />
            AI Clipping System
          </h2>
          <p className="text-muted-foreground">Automatically detect and create viral moments from your stream</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Detection Sensitivity:</span>
            <div className="w-24">
              <Progress value={detectionSensitivity} />
            </div>
            <span className="text-sm font-medium">{detectionSensitivity}%</span>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Chat Activity</span>
            <MessageSquare className="w-4 h-4 text-blue-500" />
          </div>
          <div className="space-y-2">
            <Progress value={realtimeMetrics.chatActivity} className="h-2" />
            <span className="text-xs text-muted-foreground">{Math.floor(realtimeMetrics.chatActivity)}% intensity</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Audio Energy</span>
            <Volume2 className="w-4 h-4 text-green-500" />
          </div>
          <div className="space-y-2">
            <Progress value={realtimeMetrics.audioEnergy} className="h-2" />
            <span className="text-xs text-muted-foreground">{Math.floor(realtimeMetrics.audioEnergy)}% excitement</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Visual Motion</span>
            <Eye className="w-4 h-4 text-purple-500" />
          </div>
          <div className="space-y-2">
            <Progress value={realtimeMetrics.visualMotion} className="h-2" />
            <span className="text-xs text-muted-foreground">{Math.floor(realtimeMetrics.visualMotion)}% movement</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Hype Level</span>
            <Flame className="w-4 h-4 text-red-500" />
          </div>
          <div className="space-y-2">
            <Progress value={realtimeMetrics.currentHypeLevel} className="h-2" />
            <span className="text-xs text-muted-foreground">{Math.floor(realtimeMetrics.currentHypeLevel)}% viral potential</span>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="detection" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Live Detection
          </TabsTrigger>
          <TabsTrigger value="clips" className="flex items-center gap-2">
            <FileVideo className="w-4 h-4" />
            Generated Clips
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Live Detection Tab */}
        <TabsContent value="detection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Detected Hype Moments
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {isAnalyzing ? "Live" : "Paused"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hypeMoments.map((moment) => (
                  <Card key={moment.id} className="relative overflow-hidden hover-lift">
                    <div className="relative">
                      <img 
                        src={moment.preview} 
                        alt={`Hype moment at ${moment.timestamp}`}
                        className="w-full h-32 object-cover"
                      />
                      
                      {/* Status Indicator */}
                      <div className={`absolute top-2 left-2 ${getStatusColor(moment.status)} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                        {getStatusIcon(moment.status)}
                        {moment.status.charAt(0).toUpperCase() + moment.status.slice(1)}
                      </div>
                      
                      {/* Confidence Score */}
                      <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
                        {moment.confidence}%
                      </div>
                      
                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {moment.duration}s
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-lg">{moment.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {moment.confidence}% confidence
                        </Badge>
                      </div>
                      
                      {/* Trigger Metrics */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            Chat Spike
                          </span>
                          <span className="font-medium">{moment.triggers.chatSpike}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            Sentiment
                          </span>
                          <span className="font-medium">{(moment.triggers.audioSentiment * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Motion
                          </span>
                          <span className="font-medium">{(moment.triggers.visualMotion * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {moment.status === "ready" ? (
                          <Button 
                            className="flex-1 bg-gradient-to-r from-primary to-secondary"
                            onClick={() => generateClip(moment)}
                          >
                            <Wand2 className="w-4 h-4 mr-2" />
                            Generate Clip
                          </Button>
                        ) : moment.status === "processing" ? (
                          <Button className="flex-1" disabled>
                            <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </Button>
                        ) : (
                          <Button className="flex-1" variant="outline" disabled>
                            <Eye className="w-4 h-4 mr-2" />
                            Analyzing...
                          </Button>
                        )}
                        <Button size="icon" variant="outline">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generated Clips Tab */}
        <TabsContent value="clips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AI-Generated Clips
                <Badge variant="secondary">{aiClips.length} clips ready</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {aiClips.map((clip) => (
                  <Card key={clip.id} className="overflow-hidden hover-lift">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                      {/* Video Preview */}
                      <div className="relative">
                        <img 
                          src={clip.thumbnailUrl} 
                          alt={clip.title}
                          className="w-full h-40 lg:h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button size="lg" className="rounded-full">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {clip.duration}s
                        </div>
                      </div>
                      
                      {/* Content Details */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="font-bold text-lg mb-2">{clip.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{clip.description}</p>
                        </div>
                        
                        {/* Hashtags */}
                        <div className="flex flex-wrap gap-1">
                          {clip.hashtags.slice(0, 5).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {clip.hashtags.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{clip.hashtags.length - 5} more
                            </Badge>
                          )}
                        </div>
                        
                        {/* Platform Support */}
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">Optimized for:</span>
                          <div className="flex gap-2">
                            {clip.platforms.tiktok && <Badge className="bg-black text-white">TikTok</Badge>}
                            {clip.platforms.instagram && <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Instagram</Badge>}
                            {clip.platforms.youtube && <Badge className="bg-red-500 text-white">YouTube</Badge>}
                            {clip.platforms.twitter && <Badge className="bg-blue-500 text-white">Twitter</Badge>}
                          </div>
                        </div>
                        
                        {/* Analytics Predictions */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-primary">{clip.analytics.estimatedViews.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Est. Views</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-500">{clip.analytics.viralPotential}%</div>
                            <div className="text-xs text-muted-foreground">Viral Potential</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-500">{clip.analytics.engagementScore}%</div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="w-4 h-4 mr-2" />
                            Auto-Post
                          </Button>
                          <Button size="icon" variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{hypeMoments.length}</div>
              <div className="text-sm text-muted-foreground">Hype Moments</div>
            </Card>
            
            <Card className="p-6 text-center">
              <Scissors className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{aiClips.length}</div>
              <div className="text-sm text-muted-foreground">Clips Generated</div>
            </Card>
            
            <Card className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </Card>
            
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">2.1M</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Detection Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Chat Detection Accuracy</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <Progress value={94} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Audio Sentiment Analysis</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Visual Motion Detection</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Clips */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Clips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiClips.slice(0, 3).map((clip, index) => (
                  <div key={clip.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <img 
                      src={clip.thumbnailUrl} 
                      alt={clip.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{clip.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{clip.analytics.estimatedViews.toLocaleString()} views</span>
                        <span>{clip.analytics.viralPotential}% viral</span>
                        <span>{clip.analytics.engagementScore}% engagement</span>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {clip.duration}s
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIClippingSystem;