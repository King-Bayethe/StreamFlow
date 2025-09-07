import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Scissors, 
  Play, 
  Download, 
  Share2, 
  TrendingUp,
  MessageSquare,
  Volume2,
  Activity,
  Zap,
  Clock,
  Star,
  Eye,
  Heart,
  Upload,
  Edit,
  Trash2,
  Settings,
  Video,
  Music,
  Hash,
  CheckCircle,
  XCircle,
  Loader2,
  Instagram,
  Youtube,
  Twitter,
  Facebook
} from "lucide-react";

interface HypeDetection {
  id: string;
  timestamp: string;
  duration: number;
  type: 'chat_spike' | 'audio_sentiment' | 'viewer_surge' | 'visual_motion';
  intensity: number;
  description: string;
  confidence: number;
  suggestedClip: {
    startTime: string;
    endTime: string;
    title: string;
    hashtags: string[];
    description: string;
  };
}

interface GeneratedClip {
  id: string;
  title: string;
  description: string;
  hashtags: string[];
  duration: number;
  format: 'vertical' | 'horizontal' | 'square';
  platform: string[];
  status: 'generating' | 'ready' | 'published' | 'failed';
  thumbnail: string;
  url?: string;
  metrics?: {
    views: number;
    likes: number;
    shares: number;
  };
  createdAt: Date;
  publishedAt?: Date;
}

const AIClippingSystem = () => {
  const [isLiveDetection, setIsLiveDetection] = useState(false);
  const [autoPublish, setAutoPublish] = useState(false);
  const [clipThemes, setClipThemes] = useState<string[]>(['funny', 'hype', 'educational']);
  
  const [hypeDetections, setHypeDetections] = useState<HypeDetection[]>([
    {
      id: '1',
      timestamp: '15:23',
      duration: 45,
      type: 'chat_spike',
      intensity: 92,
      description: 'Massive chat spike during epic fail moment',
      confidence: 87,
      suggestedClip: {
        startTime: '15:18',
        endTime: '16:03',
        title: 'EPIC FAIL - Chat Goes WILD! 😱',
        hashtags: ['#EpicFail', '#GamerMoments', '#Viral', '#Funny'],
        description: 'This moment had everyone in chat going absolutely crazy! The reactions were priceless 😂'
      }
    },
    {
      id: '2',
      timestamp: '28:45',
      duration: 30,
      type: 'audio_sentiment',
      intensity: 88,
      description: 'High-energy celebration with crowd cheering',
      confidence: 91,
      suggestedClip: {
        startTime: '28:30',
        endTime: '29:15',
        title: 'CLUTCH Victory Celebration! 🏆',
        hashtags: ['#Clutch', '#Victory', '#Gaming', '#Hype'],
        description: 'The most insane clutch play you\'ll see today! The celebration says it all 🔥'
      }
    }
  ]);

  const [generatedClips, setGeneratedClips] = useState<GeneratedClip[]>([
    {
      id: '1',
      title: 'EPIC FAIL - Chat Goes WILD! 😱',
      description: 'This moment had everyone in chat going absolutely crazy! The reactions were priceless 😂',
      hashtags: ['#EpicFail', '#GamerMoments', '#Viral', '#Funny'],
      duration: 45,
      format: 'vertical',
      platform: ['TikTok', 'Instagram Reels'],
      status: 'ready',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop',
      url: '#',
      metrics: { views: 12500, likes: 892, shares: 156 },
      createdAt: new Date(),
      publishedAt: new Date()
    },
    {
      id: '2',
      title: 'CLUTCH Victory Celebration! 🏆',
      description: 'The most insane clutch play you\'ll see today! The celebration says it all 🔥',
      hashtags: ['#Clutch', '#Victory', '#Gaming', '#Hype'],
      duration: 30,
      format: 'vertical',
      platform: ['TikTok', 'YouTube Shorts'],
      status: 'generating',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop',
      createdAt: new Date()
    }
  ]);

  const [stats, setStats] = useState({
    totalClips: 127,
    totalViews: 2840000,
    averageEngagement: 12.5,
    viralClips: 8
  });

  // Simulate real-time hype detection
  useEffect(() => {
    if (!isLiveDetection) return;

    const interval = setInterval(() => {
      const detectionTypes = ['chat_spike', 'audio_sentiment', 'viewer_surge', 'visual_motion'] as const;
      const descriptions = [
        'Chat exploded with reactions',
        'Intense excitement in audio',
        'Viewer count spiked rapidly',
        'High visual motion detected',
        'Emotional peak detected'
      ];

      const newDetection: HypeDetection = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        duration: Math.floor(Math.random() * 60) + 15,
        type: detectionTypes[Math.floor(Math.random() * detectionTypes.length)],
        intensity: Math.floor(Math.random() * 30) + 70,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        confidence: Math.floor(Math.random() * 20) + 80,
        suggestedClip: {
          startTime: new Date().toLocaleTimeString().slice(0, 5),
          endTime: new Date(Date.now() + 60000).toLocaleTimeString().slice(0, 5),
          title: 'AI Generated Clip Title',
          hashtags: ['#Viral', '#Gaming', '#Hype'],
          description: 'AI generated description for this epic moment!'
        }
      };

      setHypeDetections(prev => [newDetection, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isLiveDetection]);

  const generateClip = (detection: HypeDetection) => {
    const newClip: GeneratedClip = {
      id: Date.now().toString(),
      title: detection.suggestedClip.title,
      description: detection.suggestedClip.description,
      hashtags: detection.suggestedClip.hashtags,
      duration: detection.duration,
      format: 'vertical',
      platform: ['TikTok', 'Instagram Reels'],
      status: 'generating',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop',
      createdAt: new Date()
    };

    setGeneratedClips(prev => [newClip, ...prev]);

    // Simulate generation process
    setTimeout(() => {
      setGeneratedClips(prev => 
        prev.map(clip => 
          clip.id === newClip.id 
            ? { ...clip, status: 'ready', url: '#' }
            : clip
        )
      );
    }, 3000);
  };

  const publishClip = (clipId: string, platforms: string[]) => {
    setGeneratedClips(prev =>
      prev.map(clip =>
        clip.id === clipId
          ? { 
              ...clip, 
              status: 'published', 
              platform: platforms,
              publishedAt: new Date(),
              metrics: { views: 0, likes: 0, shares: 0 }
            }
          : clip
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat_spike': return <MessageSquare className="h-4 w-4" />;
      case 'audio_sentiment': return <Volume2 className="h-4 w-4" />;
      case 'viewer_surge': return <TrendingUp className="h-4 w-4" />;
      case 'visual_motion': return <Activity className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generating': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'ready': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'published': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tiktok': return <Video className="h-4 w-4" />;
      case 'instagram reels': case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'youtube shorts': case 'youtube': return <Youtube className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      default: return <Share2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5" />
            AI Auto-Clipping System
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="live-detection">Live Detection</Label>
              <Switch
                id="live-detection"
                checked={isLiveDetection}
                onCheckedChange={setIsLiveDetection}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-publish">Auto-Publish</Label>
              <Switch
                id="auto-publish"
                checked={autoPublish}
                onCheckedChange={setAutoPublish}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLiveDetection ? (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <Activity className="h-4 w-4 text-green-600 animate-pulse" />
              <span className="text-sm text-green-700 dark:text-green-300">
                Live detection active - Monitoring for hype moments
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Enable live detection to automatically find highlight moments
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clips</p>
                <p className="text-2xl font-bold">{stats.totalClips}</p>
              </div>
              <Video className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{(stats.totalViews / 1000000).toFixed(1)}M</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Engagement</p>
                <p className="text-2xl font-bold">{stats.averageEngagement}%</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Viral Clips</p>
                <p className="text-2xl font-bold">{stats.viralClips}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="detection" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="detection">Live Detection</TabsTrigger>
          <TabsTrigger value="clips">Generated Clips</TabsTrigger>
          <TabsTrigger value="publishing">Publishing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Live Detection */}
        <TabsContent value="detection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Real-Time Hype Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {hypeDetections.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    {isLiveDetection 
                      ? "Monitoring for hype moments..." 
                      : "Enable live detection to see real-time highlights"
                    }
                  </div>
                ) : (
                  <div className="space-y-4">
                    {hypeDetections.map((detection) => (
                      <div key={detection.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              {getTypeIcon(detection.type)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {detection.timestamp} • {detection.duration}s
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {detection.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {detection.intensity}% intensity
                            </Badge>
                            <Badge variant="outline">
                              {detection.confidence}% confidence
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded-lg mb-3">
                          <h4 className="font-medium text-sm mb-2">Suggested Clip:</h4>
                          <p className="text-sm font-medium">{detection.suggestedClip.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {detection.suggestedClip.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {detection.suggestedClip.hashtags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => generateClip(detection)}
                          >
                            <Scissors className="h-3 w-3 mr-1" />
                            Generate Clip
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generated Clips */}
        <TabsContent value="clips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Generated Clips Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {generatedClips.map((clip) => (
                  <div key={clip.id} className="border rounded-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src={clip.thumbnail} 
                        alt={clip.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={getStatusColor(clip.status)}>
                          {clip.status === 'generating' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                          {clip.status === 'ready' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {clip.status === 'published' && <Upload className="h-3 w-3 mr-1" />}
                          {clip.status === 'failed' && <XCircle className="h-3 w-3 mr-1" />}
                          {clip.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary">{clip.duration}s</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-medium line-clamp-2 mb-2">{clip.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {clip.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {clip.hashtags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {clip.platform.map((platform, index) => (
                          <div key={index} className="flex items-center gap-1">
                            {getPlatformIcon(platform)}
                            <span className="text-xs">{platform}</span>
                          </div>
                        ))}
                      </div>
                      
                      {clip.metrics && (
                        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
                          <div className="text-center">
                            <div className="font-medium">{clip.metrics.views}</div>
                            <div>Views</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{clip.metrics.likes}</div>
                            <div>Likes</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{clip.metrics.shares}</div>
                            <div>Shares</div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {clip.status === 'ready' && (
                          <>
                            <Button size="sm" className="flex-1">
                              <Upload className="h-3 w-3 mr-1" />
                              Publish
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        {clip.status === 'published' && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View Stats
                          </Button>
                        )}
                        {clip.status === 'generating' && (
                          <Button size="sm" disabled className="flex-1">
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            Generating...
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publishing Settings */}
        <TabsContent value="publishing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'TikTok', icon: Video, connected: true },
                  { name: 'Instagram', icon: Instagram, connected: true },
                  { name: 'YouTube Shorts', icon: Youtube, connected: false },
                  { name: 'Twitter', icon: Twitter, connected: false }
                ].map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <platform.icon className="h-5 w-5" />
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={platform.connected ? "default" : "secondary"}>
                        {platform.connected ? "Connected" : "Not Connected"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {platform.connected ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auto-Publish Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Minimum confidence score</Label>
                  <div className="w-20">
                    <Input type="number" defaultValue="85" min="0" max="100" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Auto-publish viral clips</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Require manual approval</Label>
                  <Switch />
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Default hashtags</Label>
                  <Textarea 
                    placeholder="#gaming #viral #highlights #streamer"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Detection Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Clip Themes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['funny', 'hype', 'educational', 'drama', 'clutch', 'fails'].map((theme) => (
                      <Badge
                        key={theme}
                        variant={clipThemes.includes(theme) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          setClipThemes(prev =>
                            prev.includes(theme)
                              ? prev.filter(t => t !== theme)
                              : [...prev, theme]
                          );
                        }}
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Sensitivity Levels</Label>
                  <div className="space-y-3 mt-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Chat Activity</span>
                        <span>High</span>
                      </div>
                      <Progress value={80} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Audio Sentiment</span>
                        <span>Medium</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Visual Motion</span>
                        <span>Low</span>
                      </div>
                      <Progress value={40} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clip Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clip-length">Default clip length</Label>
                  <Select defaultValue="45">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="45">45 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format">Default format</Label>
                  <Select defaultValue="vertical">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vertical">Vertical (9:16)</SelectItem>
                      <SelectItem value="square">Square (1:1)</SelectItem>
                      <SelectItem value="horizontal">Horizontal (16:9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quality">Video quality</Label>
                  <Select defaultValue="1080p">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="4k">4K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIClippingSystem;