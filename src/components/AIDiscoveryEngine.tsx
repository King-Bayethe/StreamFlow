import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  TrendingUp, 
  Eye, 
  Heart, 
  Play, 
  Clock,
  Star,
  Users,
  Bookmark,
  Share2,
  Settings,
  Brain,
  Target
} from "lucide-react";

interface RecommendedContent {
  id: string;
  type: 'stream' | 'vod' | 'highlight';
  title: string;
  creator: string;
  thumbnail: string;
  viewers?: number;
  duration?: string;
  matchScore: number;
  tags: string[];
  reason: string;
}

const AIDiscoveryEngine = () => {
  const [recommendations, setRecommendations] = useState<RecommendedContent[]>([
    {
      id: "1",
      type: "stream",
      title: "Epic Gaming Marathon - 24 Hour Challenge",
      creator: "ProGamer123",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      viewers: 2847,
      matchScore: 95,
      tags: ["Gaming", "Marathon", "Interactive"],
      reason: "Based on your love for long gaming sessions"
    },
    {
      id: "2", 
      type: "vod",
      title: "Complete React Tutorial Series",
      creator: "CodeMaster",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      duration: "2:30:45",
      matchScore: 89,
      tags: ["Programming", "Tutorial", "React"],
      reason: "Matches your interest in web development"
    },
    {
      id: "3",
      type: "highlight",
      title: "Insane Clutch Moment",
      creator: "EsportsLegend",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      duration: "0:45",
      matchScore: 92,
      tags: ["Esports", "Highlight", "Clutch"],
      reason: "Similar to your recently watched content"
    },
    {
      id: "4",
      type: "stream",
      title: "Cooking Stream: Making Italian Pasta",
      creator: "ChefStreamer",
      thumbnail: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=300&fit=crop",
      viewers: 892,
      matchScore: 78,
      tags: ["Cooking", "Tutorial", "Italian"],
      reason: "Exploring new interests based on your profile"
    }
  ]);

  const [userPreferences, setUserPreferences] = useState({
    categories: ["Gaming", "Technology", "Education"],
    viewingTime: "Evening",
    contentLength: "Medium",
    interactivity: "High"
  });

  const [discoveryStats, setDiscoveryStats] = useState({
    totalRecommendations: 1247,
    clickThroughRate: 23.5,
    averageWatchTime: 42.8,
    satisfaction: 4.6
  });

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recommendations</p>
                <p className="text-2xl font-bold">{discoveryStats.totalRecommendations}</p>
              </div>
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold">{discoveryStats.clickThroughRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Watch Time</p>
                <p className="text-2xl font-bold">{discoveryStats.averageWatchTime}m</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">{discoveryStats.satisfaction}/5</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Personalized Recommendations */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Recommendations
                <Badge variant="secondary" className="ml-auto">Personalized</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recommendations.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                      {item.type === 'stream' && (
                        <Badge className="absolute top-1 left-1 text-xs bg-red-600">
                          LIVE
                        </Badge>
                      )}
                      {item.duration && (
                        <Badge variant="secondary" className="absolute bottom-1 right-1 text-xs">
                          {item.duration}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium line-clamp-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.creator}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-primary" />
                          <span className="text-sm font-medium">{item.matchScore}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        {item.viewers && (
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.viewers.toLocaleString()} viewers</span>
                          </div>
                        )}
                        <div className="flex gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {item.reason}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Watch
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trending Content */}
        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://images.unsplash.com/photo-${1540000000000 + rank}?w=40&h=40&fit=crop&crop=face`} />
                      <AvatarFallback>T{rank}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">Trending Stream #{rank}</h4>
                      <p className="text-sm text-muted-foreground">Creator Name</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Eye className="h-3 w-3" />
                        <span>{(5000 - rank * 200).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{20 + rank}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discovery Settings */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Preferred Categories</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Gaming", "Technology", "Education", "Music", "Art", "Cooking", "Sports", "News"].map((category) => (
                      <Badge
                        key={category}
                        variant={userPreferences.categories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          setUserPreferences(prev => ({
                            ...prev,
                            categories: prev.categories.includes(category)
                              ? prev.categories.filter(c => c !== category)
                              : [...prev.categories, category]
                          }));
                        }}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Viewing Time</label>
                  <div className="flex gap-2 mt-2">
                    {["Morning", "Afternoon", "Evening", "Late Night"].map((time) => (
                      <Button
                        key={time}
                        size="sm"
                        variant={userPreferences.viewingTime === time ? "default" : "outline"}
                        onClick={() => setUserPreferences(prev => ({ ...prev, viewingTime: time }))}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Content Length</label>
                  <div className="flex gap-2 mt-2">
                    {["Short", "Medium", "Long", "Any"].map((length) => (
                      <Button
                        key={length}
                        size="sm"
                        variant={userPreferences.contentLength === length ? "default" : "outline"}
                        onClick={() => setUserPreferences(prev => ({ ...prev, contentLength: length }))}
                      >
                        {length}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Algorithm Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Watch History Weight</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Social Signals</span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Trending Factor</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Creator Similarity</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-2">Your Profile Strength</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="flex-1" />
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Strong profile enables better recommendations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIDiscoveryEngine;