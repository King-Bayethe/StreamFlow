import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, Eye, Users, Clock, Play } from "lucide-react";

interface Stream {
  id: number;
  title: string;
  creator: string;
  creatorAvatar: string;
  thumbnail: string;
  viewers: number;
  category: string;
  status: "live" | "upcoming";
  scheduledFor?: string;
  duration?: string;
  tags: string[];
}

const mockStreams: Stream[] = [
  {
    id: 1,
    title: "Epic Gaming Marathon - 24H Stream",
    creator: "ProGamer_2024",
    creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
    viewers: 12500,
    category: "Gaming",
    status: "live",
    duration: "8h 24m",
    tags: ["FPS", "Competitive", "Interactive"]
  },
  {
    id: 2,
    title: "Digital Art Masterclass",
    creator: "ArtisticMind",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
    viewers: 3200,
    category: "Creative",
    status: "live",
    duration: "2h 15m",
    tags: ["Art", "Tutorial", "Beginner-Friendly"]
  },
  {
    id: 3,
    title: "Cooking with Chef Marco",
    creator: "ChefMarco",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center",
    viewers: 8700,
    category: "Lifestyle",
    status: "live",
    duration: "1h 45m",
    tags: ["Cooking", "Italian", "Interactive"]
  },
  {
    id: 4,
    title: "Music Production Workshop",
    creator: "BeatMakerPro",
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
    viewers: 5400,
    category: "Music",
    status: "upcoming",
    scheduledFor: "2h 30m",
    tags: ["EDM", "Production", "Tutorial"]
  },
  {
    id: 5,
    title: "Tech Talk: AI Revolution",
    creator: "TechGuru",
    creatorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=center",
    viewers: 0,
    category: "Education",
    status: "upcoming",
    scheduledFor: "4h 15m",
    tags: ["AI", "Technology", "Discussion"]
  },
  {
    id: 6,
    title: "Fitness Challenge Stream",
    creator: "FitnessFan",
    creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    viewers: 2800,
    category: "Fitness",
    status: "live",
    duration: "1h 12m",
    tags: ["Workout", "Motivation", "Live"]
  }
];

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("viewers");

  const categories = ["all", "Gaming", "Creative", "Lifestyle", "Music", "Education", "Fitness"];
  const statusOptions = ["all", "live", "upcoming"];

  const filteredAndSortedStreams = useMemo(() => {
    let filtered = mockStreams.filter(stream => {
      const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stream.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stream.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || stream.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || stream.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "viewers":
          return b.viewers - a.viewers;
        case "title":
          return a.title.localeCompare(b.title);
        case "creator":
          return a.creator.localeCompare(b.creator);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Browse Streams
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover amazing live streams and upcoming content
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search streams, creators, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-80"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-40">
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

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All" : status === "live" ? "Live" : "Upcoming"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-32">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewers">Viewers</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="creator">Creator</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedStreams.length} streams found
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>
                {filteredAndSortedStreams
                  .filter(stream => stream.status === "live")
                  .reduce((sum, stream) => sum + stream.viewers, 0)
                  .toLocaleString()} total viewers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Streams Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedStreams.map((stream, index) => (
            <Card 
              key={stream.id} 
              className="group overflow-hidden hover-lift hover-glow border-0 card-gradient animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Status indicator */}
                {stream.status === "live" ? (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold live-indicator">
                    LIVE
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
                    UPCOMING
                  </div>
                )}

                {/* Category badge */}
                <Badge variant="secondary" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground">
                  {stream.category}
                </Badge>

                {/* Duration or scheduled time */}
                <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {stream.status === "live" ? stream.duration : `In ${stream.scheduledFor}`}
                </div>

                {/* Viewer count for live streams */}
                {stream.status === "live" && (
                  <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {stream.viewers.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {stream.title}
                </h3>
                
                {/* Creator info */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={stream.creatorAvatar} alt={stream.creator} />
                    <AvatarFallback>{stream.creator[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground text-sm">{stream.creator}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {stream.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Join button */}
                <Button 
                  className="w-full" 
                  variant={stream.status === "live" ? "default" : "secondary"}
                  asChild
                >
                  <a href={`/watch/${stream.id}`}>
                    <Play className="w-4 h-4 mr-2" />
                    {stream.status === "live" ? "Join Stream" : "Set Reminder"}
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredAndSortedStreams.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No streams found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;