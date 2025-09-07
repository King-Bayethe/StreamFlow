import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Clock, 
  Eye, 
  Heart,
  Search,
  Filter,
  Bookmark,
  Star,
  CalendarDays,
  TrendingUp
} from "lucide-react";

interface VODVideo {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadedAt: string;
  category: string;
  rating: number;
  isBookmarked: boolean;
  description: string;
  tags: string[];
}

const VODLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");

  const vodVideos: VODVideo[] = [
    {
      id: "1",
      title: "Epic Gaming Marathon - 10 Hour Highlight Reel",
      creator: "ProGamer_2024",
      creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      duration: "2h 45m",
      views: 125000,
      uploadedAt: "2 days ago",
      category: "Gaming",
      rating: 4.8,
      isBookmarked: true,
      description: "Best moments from our 10-hour gaming marathon featuring epic boss fights and viewer challenges.",
      tags: ["Gaming", "Highlights", "Epic", "Marathon"]
    },
    {
      id: "2",
      title: "Digital Art Masterclass: Character Design",
      creator: "ArtisticMind",
      creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      duration: "1h 32m",
      views: 87000,
      uploadedAt: "5 days ago",
      category: "Creative",
      rating: 4.9,
      isBookmarked: false,
      description: "Complete character design tutorial from concept to final illustration.",
      tags: ["Art", "Tutorial", "Character Design", "Digital"]
    },
    {
      id: "3",
      title: "Italian Cooking Masterclass with Chef Marco",
      creator: "ChefMarco",
      creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      duration: "3h 15m",
      views: 156000,
      uploadedAt: "1 week ago",
      category: "Lifestyle",
      rating: 4.7,
      isBookmarked: true,
      description: "Learn authentic Italian recipes from pasta to tiramisu in this comprehensive cooking session.",
      tags: ["Cooking", "Italian", "Recipe", "Tutorial"]
    },
    {
      id: "4",
      title: "Music Production Masterclass: EDM Essentials",
      creator: "BeatMakerPro",
      creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      duration: "2h 20m",
      views: 94000,
      uploadedAt: "3 days ago",
      category: "Music",
      rating: 4.6,
      isBookmarked: false,
      description: "Complete guide to EDM production including beat making, synthesis, and mixing techniques.",
      tags: ["Music", "EDM", "Production", "Tutorial"]
    },
    {
      id: "5",
      title: "Fitness Challenge: 30-Day Transformation",
      creator: "FitnessFan",
      creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      duration: "45m",
      views: 203000,
      uploadedAt: "1 day ago",
      category: "Fitness",
      rating: 4.5,
      isBookmarked: true,
      description: "Complete 30-day fitness transformation journey with daily workouts and nutrition tips.",
      tags: ["Fitness", "Challenge", "Workout", "Health"]
    },
    {
      id: "6",
      title: "Tech Talk: AI Revolution in 2024",
      creator: "TechGuru",
      creatorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      duration: "1h 55m",
      views: 341000,
      uploadedAt: "4 days ago",
      category: "Education",
      rating: 4.9,
      isBookmarked: false,
      description: "Deep dive into the latest AI developments and their impact on society and technology.",
      tags: ["Technology", "AI", "Innovation", "Future"]
    }
  ];

  const categories = ["all", "Gaming", "Creative", "Lifestyle", "Music", "Fitness", "Education"];

  const filteredVideos = vodVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "bookmarked" && video.isBookmarked) ||
                      (activeTab === "trending" && video.views > 100000);
    
    return matchesSearch && matchesCategory && matchesTab;
  }).sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.views - a.views;
      case "rating":
        return b.rating - a.rating;
      case "duration":
        return b.duration.localeCompare(a.duration);
      default: // recent
        return Date.parse(b.uploadedAt) - Date.parse(a.uploadedAt);
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">VOD Library</h2>
          <p className="text-muted-foreground">Watch recorded streams anytime</p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            All Videos
          </TabsTrigger>
          <TabsTrigger value="bookmarked" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            Bookmarked
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => (
              <Card 
                key={video.id} 
                className="group overflow-hidden hover-lift hover-glow border-0 card-gradient animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="lg" className="rounded-full">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </div>
                  
                  {/* Bookmark */}
                  <Button
                    size="icon"
                    variant={video.isBookmarked ? "default" : "outline"}
                    className="absolute top-3 right-3 w-8 h-8"
                  >
                    <Bookmark className={`w-4 h-4 ${video.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  {/* Category */}
                  <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground">
                    {video.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  {/* Creator */}
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={video.creatorAvatar} alt={video.creator} />
                      <AvatarFallback>{video.creator[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{video.creator}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {video.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {video.uploadedAt}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {video.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <a href={`/watch/${video.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Watch
                      </a>
                    </Button>
                    <Button size="icon" variant="outline">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setActiveTab("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VODLibrary;