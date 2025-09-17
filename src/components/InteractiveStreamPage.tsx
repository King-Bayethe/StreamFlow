import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  MessageCircle, 
  Users, 
  Eye, 
  DollarSign,
  Vote,
  Play,
  Trophy,
  Loader2
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SuperChatModal from "./SuperChatModal";
import PaidPollModal from "./PaidPollModal";
import LiveChatViewer from "./LiveChatViewer";
import LivePollsViewer from "./LivePollsViewer";
import ViewerEngagement from "./ViewerEngagement";

interface StreamData {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  status: string;
  creator: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number; revenue: number }[];
  min_payment_cents: number;
  total_votes: number;
  total_revenue_cents: number;
  ends_at: string;
  creator_id: string;
}

const InteractiveStreamPage = () => {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isLiked, setIsLiked] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [showSuperChatModal, setShowSuperChatModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [streamData, setStreamData] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);

  // Authentication check
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (streamId) {
      fetchStreamData();
    }
  }, [user, navigate, streamId]);

  // Real-time viewer count updates
  useEffect(() => {
    if (!streamId) return;

    const channel = supabase
      .channel(`stream-${streamId}`)
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        setViewerCount(Object.keys(newState).length);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        setViewerCount(prev => prev + newPresences.length);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        setViewerCount(prev => Math.max(0, prev - leftPresences.length));
      })
      .subscribe();

    // Track viewer presence
    if (user) {
      channel.track({
        user_id: user.id,
        username: user.user_metadata?.username || user.email?.split('@')[0],
        joined_at: new Date().toISOString(),
      });
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [streamId, user]);

  const fetchStreamData = async () => {
    if (!streamId) return;
    
    try {
      const { data, error } = await supabase
        .from('streams')
        .select(`
          id,
          title,
          description,
          thumbnail_url,
          status,
          creator_id
        `)
        .eq('id', streamId)
        .single();

      if (error) throw error;

      // Get creator profile from creator_profiles table
      const { data: profile, error: profileError } = await supabase
        .from('creator_profiles')
        .select('user_id, username, display_name, avatar_url')
        .eq('user_id', data.creator_id)
        .single();

      if (profileError) throw profileError;

      setStreamData({
        ...data,
        creator: {
          id: profile.user_id,
          username: profile.username,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url
        }
      });
    } catch (error) {
      console.error('Error fetching stream:', error);
      toast({
        title: "Error",
        description: "Stream not found or failed to load.",
        variant: "destructive"
      });
      navigate('/browse');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading stream...</p>
        </div>
      </div>
    );
  }

  if (!streamData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Stream Not Found</h2>
          <p className="text-muted-foreground mb-4">The stream you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/browse')}>
            Browse Streams
          </Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1800px] mx-auto p-4 gap-4 grid grid-cols-1 xl:grid-cols-4">
        {/* Main Video Section */}
        <div className="xl:col-span-3 space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden bg-black">
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Live Stream Player</p>
                  <p className="text-sm opacity-75">Interactive monetized streaming</p>
                </div>
              </div>

              {/* Live Indicator */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white live-indicator font-bold">
                  LIVE
                </Badge>
              </div>

              {/* Viewer Count */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {viewerCount.toLocaleString()}
              </div>
            </div>
          </Card>

          {/* Stream Info */}
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{streamData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <Badge variant="outline">
                    {streamData.status === 'live' ? 'LIVE' : 'OFFLINE'}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {viewerCount.toLocaleString()} viewers
                  </div>
                </div>
                
                {/* Creator Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={streamData.creator.avatar_url || '/placeholder.svg'}
                    alt={streamData.creator.display_name || streamData.creator.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className="font-semibold">
                      {streamData.creator.display_name || streamData.creator.username}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  Like
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSuperChatModal(true)}
                  className="bg-gradient-to-r from-primary to-secondary text-white border-0"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Super Chat
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Sidebar */}
        {!isMobile && (
          <div className="xl:col-span-1 space-y-4">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat" className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="polls" className="flex items-center gap-1">
                  <Vote className="h-3 w-3" />
                  Polls
                </TabsTrigger>
                <TabsTrigger value="engagement" className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  Stats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-4">
                <LiveChatViewer streamId={streamId || 'demo'} className="h-[500px]" />
              </TabsContent>

              <TabsContent value="polls" className="mt-4">
                <div className="max-h-[500px] overflow-y-auto">
                  <LivePollsViewer streamId={streamId || 'demo'} />
                </div>
              </TabsContent>

              <TabsContent value="engagement" className="mt-4">
                <div className="max-h-[500px] overflow-y-auto">
                  <ViewerEngagement streamId={streamId || 'demo'} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Modals */}
      <SuperChatModal
        isOpen={showSuperChatModal}
        onClose={() => setShowSuperChatModal(false)}
        streamId={streamId || 'demo'}
        creatorId={streamData.creator.id}
      />
      
      <PaidPollModal
        isOpen={showPollModal}
        onClose={() => setShowPollModal(false)}
        poll={selectedPoll}
      />
    </div>
  );
};

export default InteractiveStreamPage;