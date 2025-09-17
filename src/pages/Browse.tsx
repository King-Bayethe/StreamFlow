import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, Eye, Users, Clock, Play, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Stream {
  id: string;
  title: string;
  description: string;
  creator: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  thumbnail_url: string | null;
  viewer_count: number;
  status: "live" | "offline" | "scheduled";
  started_at: string | null;
  created_at: string;
}

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("viewers");
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const categories = ["all", "Gaming", "Creative", "Lifestyle", "Music", "Education", "Fitness"];
  const statusOptions = ["all", "live", "offline"];

  useEffect(() => {
    fetchStreams();
    
    // Set up real-time subscription for stream updates
    const channel = supabase
      .channel('stream-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'streams'
        },
        () => fetchStreams()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStreams = async () => {
    try {
      const { data, error } = await supabase
        .from('streams')
        .select(`
          id,
          title,
          description,
          creator_id,
          thumbnail_url,
          viewer_count,
          status,
          started_at,
          created_at
        `)
        .order('viewer_count', { ascending: false });

      if (error) throw error;

      // Get creator profiles separately
      const creatorIds = data?.map(stream => stream.creator_id) || [];
      
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, username, display_name, avatar_url')
        .in('user_id', creatorIds);

      if (profileError) throw profileError;

      const profileMap = profiles?.reduce((acc, profile) => {
        acc[profile.user_id] = profile;
        return acc;
      }, {} as Record<string, any>) || {};

      const formattedStreams: Stream[] = (data || []).map(stream => ({
        id: stream.id,
        title: stream.title,
        description: stream.description || '',
        creator: {
          username: profileMap[stream.creator_id]?.username || 'Unknown',
          display_name: profileMap[stream.creator_id]?.display_name,
          avatar_url: profileMap[stream.creator_id]?.avatar_url
        },
        thumbnail_url: stream.thumbnail_url,
        viewer_count: stream.viewer_count,
        status: stream.status as "live" | "offline" | "scheduled",
        started_at: stream.started_at,
        created_at: stream.created_at
      }));

      setStreams(formattedStreams);
    } catch (error) {
      console.error('Error fetching streams:', error);
      toast({
        title: "Error",
        description: "Failed to load streams. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedStreams = useMemo(() => {
    let filtered = streams.filter(stream => {
      const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stream.creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (stream.creator.display_name && stream.creator.display_name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = selectedStatus === "all" || stream.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "viewers":
          return b.viewer_count - a.viewer_count;
        case "title":
          return a.title.localeCompare(b.title);
        case "creator":
          return a.creator.username.localeCompare(b.creator.username);
        default:
          return 0;
      }
    });
  }, [streams, searchTerm, selectedStatus, sortBy]);

  return (
    <div className="bg-gradient-to-br from-muted/30 to-background">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border">
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
                  .reduce((sum, stream) => sum + stream.viewer_count, 0)
                  .toLocaleString()} total viewers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Streams Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading streams...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedStreams.map((stream, index) => (
              <Card 
                key={stream.id} 
                className="group overflow-hidden hover-lift hover-glow border-0 card-gradient animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <img 
                    src={stream.thumbnail_url || "/placeholder.svg"} 
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
                      OFFLINE
                    </div>
                  )}

                  {/* Duration for live streams */}
                  {stream.status === "live" && stream.started_at && (
                    <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {Math.floor((Date.now() - new Date(stream.started_at).getTime()) / (1000 * 60))}m
                    </div>
                  )}

                  {/* Viewer count for live streams */}
                  {stream.status === "live" && (
                    <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {stream.viewer_count.toLocaleString()}
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
                      <AvatarImage src={stream.creator.avatar_url || "/placeholder.svg"} alt={stream.creator.display_name || stream.creator.username} />
                      <AvatarFallback>{(stream.creator.display_name || stream.creator.username)[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-sm">
                      {stream.creator.display_name || stream.creator.username}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {stream.description}
                  </p>

                  {/* Join button */}
                  <Button 
                    className="w-full" 
                    variant={stream.status === "live" ? "default" : "secondary"}
                    asChild
                  >
                    <Link to={`/watch/${stream.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      {stream.status === "live" ? "Join Stream" : "View Stream"}
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

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