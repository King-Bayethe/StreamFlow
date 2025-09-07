import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Eye, 
  Clock,
  Star,
  TrendingUp,
  Users,
  Heart,
  Zap,
  Target,
  ThumbsUp,
  Bookmark
} from "lucide-react";

interface Recommendation {
  id: string;
  type: "stream" | "creator" | "category";
  title: string;
  creator?: string;
  creatorAvatar?: string;
  thumbnail: string;
  viewers?: number;
  rating?: number;
  category: string;
  reason: string;
  isLive?: boolean;
  duration?: string;
  tags: string[];
  confidence: number;
}

const PersonalizedRecommendations = () => {
  const [activeTab, setActiveTab] = useState("foryou");

  const recommendations: Recommendation[] = [
    {
      id: "1",
      type: "stream",
      title: "Epic Gaming Marathon - Boss Rush Challenge",
      creator: "ProGamer_2024",
      creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      viewers: 12500,
      rating: 4.8,
      category: "Gaming",
      reason: "Based on your gaming watch history",
      isLive: true,
      tags: ["Gaming", "Challenge", "Interactive"],
      confidence: 95
    },
    {
      id: "2",
      type: "creator",
      title: "Digital Art Speed Painting",
      creator: "ArtisticMind",
      creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      viewers: 3200,
      rating: 4.9,
      category: "Creative",
      reason: "New creator similar to your favorites",
      isLive: true,
      tags: ["Art", "Speed Painting", "Creative"],
      confidence: 87
    },
    {
      id: "3",
      type: "stream",
      title: "Advanced Italian Cooking Techniques",
      creator: "ChefMarco",
      creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      viewers: 8700,
      rating: 4.7,
      category: "Lifestyle",
      reason: "You liked similar cooking streams",
      isLive: false,
      duration: "2h 15m",
      tags: ["Cooking", "Italian", "Advanced"],
      confidence: 92
    },
    {
      id: "4",
      type: "category",
      title: "Music Production Workshop",
      creator: "BeatMakerPro",
      creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      viewers: 5400,
      rating: 4.6,
      category: "Music",
      reason: "Trending in Music category",
      isLive: true,
      tags: ["Music", "Production", "Tutorial"],
      confidence: 78
    },
    {
      id: "5",
      type: "stream",
      title: "Fitness Challenge: Morning Workout",
      creator: "FitnessFan",
      creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      viewers: 2800,
      rating: 4.5,
      category: "Fitness",
      reason: "Perfect for your morning routine",
      isLive: true,
      tags: ["Fitness", "Morning", "Workout"],
      confidence: 89
    },
    {
      id: "6",
      type: "creator",
      title: "Tech Innovation Showcase",
      creator: "TechGuru",
      creatorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      viewers: 15600,
      rating: 4.8,
      category: "Education",
      reason: "Highly rated in your interests",
      isLive: false,
      duration: "1h 30m",
      tags: ["Technology", "Innovation", "AI"],
      confidence: 93
    }
  ];

  const trendingStreams = recommendations.filter(r => r.isLive && r.viewers && r.viewers > 5000);
  const newCreators = recommendations.filter(r => r.type === "creator");
  const personalPicks = recommendations.filter(r => r.confidence > 90);

  const getReasonIcon = (reason: string) => {
    if (reason.includes("watch history")) return <Eye className="w-4 h-4" />;
    if (reason.includes("favorites")) return <Heart className="w-4 h-4" />;
    if (reason.includes("similar")) return <Target className="w-4 h-4" />;
    if (reason.includes("trending")) return <TrendingUp className="w-4 h-4" />;
    if (reason.includes("routine")) return <Clock className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 80) return "text-yellow-500";
    return "text-orange-500";
  };

  const RecommendationCard = ({ rec, showConfidence = false }: { rec: Recommendation, showConfidence?: boolean }) => (
    <Card className="group overflow-hidden hover-lift hover-glow border-0 card-gradient cursor-pointer">
      <div className="relative">
        <img 
          src={rec.thumbnail} 
          alt={rec.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="lg" className="rounded-full">
            <Play className="w-6 h-6" />
          </Button>
        </div>
        
        {/* Status */}
        {rec.isLive ? (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold live-indicator">
            LIVE
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
            VOD
          </div>
        )}
        
        {/* Category */}
        <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground">
          {rec.category}
        </Badge>
        
        {/* Duration or Viewers */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center">
          {rec.isLive ? (
            <>
              <Users className="w-3 h-3 mr-1" />
              {rec.viewers?.toLocaleString()}
            </>
          ) : (
            <>
              <Clock className="w-3 h-3 mr-1" />
              {rec.duration}
            </>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {rec.title}
        </h3>
        
        {/* Creator */}
        {rec.creator && (
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="w-6 h-6">
              <AvatarImage src={rec.creatorAvatar} alt={rec.creator} />
              <AvatarFallback>{rec.creator[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{rec.creator}</span>
          </div>
        )}
        
        {/* Reason */}
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          {getReasonIcon(rec.reason)}
          <span>{rec.reason}</span>
          {showConfidence && (
            <Badge variant="outline" className={`text-xs ${getConfidenceColor(rec.confidence)}`}>
              {rec.confidence}% match
            </Badge>
          )}
        </div>
        
        {/* Rating */}
        {rec.rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">{rec.rating}</span>
            <span className="text-sm text-muted-foreground">rating</span>
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {rec.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <a href={`/watch/${rec.id}`}>
              <Play className="w-4 h-4 mr-2" />
              {rec.isLive ? "Join" : "Watch"}
            </a>
          </Button>
          <Button size="icon" variant="outline">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <p className="text-muted-foreground">Personalized content based on your preferences</p>
        </div>
        <Button variant="outline" size="sm">
          <Zap className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="foryou" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            For You
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="creators" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            New Creators
          </TabsTrigger>
          <TabsTrigger value="picks" className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            Top Picks
          </TabsTrigger>
        </TabsList>

        {/* For You Tab */}
        <TabsContent value="foryou" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={rec.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <RecommendationCard rec={rec} showConfidence />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Trending Tab */}
        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingStreams.map((rec, index) => (
              <div key={rec.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <RecommendationCard rec={rec} />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* New Creators Tab */}
        <TabsContent value="creators" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newCreators.map((rec, index) => (
              <div key={rec.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <RecommendationCard rec={rec} />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Top Picks Tab */}
        <TabsContent value="picks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalPicks.map((rec, index) => (
              <div key={rec.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <RecommendationCard rec={rec} showConfidence />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Match accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">Gaming</div>
              <div className="text-sm text-muted-foreground">Top interest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">Weekends</div>
              <div className="text-sm text-muted-foreground">Peak viewing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;