import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Users, 
  Eye, 
  DollarSign,
  Vote,
  Play
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from "@/hooks/use-mobile";
import SuperChatModal from "./SuperChatModal";
import PaidPollModal from "./PaidPollModal";

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
  
  const [isLiked, setIsLiked] = useState(false);
  const [viewerCount, setViewerCount] = useState(12847);
  const [showSuperChatModal, setShowSuperChatModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  // Authentication check
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const mockCreator = {
    id: 'creator-1',
    username: 'ProStreamer',
    display_name: 'Pro Streamer',
    avatar: '/placeholder.svg',
  };

  const mockStream = {
    title: 'Epic Gaming Session - Road to Rank 1!',
    category: 'Gaming',
  };

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
                <h1 className="text-2xl font-bold mb-2">{mockStream.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <Badge variant="outline">{mockStream.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {viewerCount.toLocaleString()} viewers
                  </div>
                </div>
                
                {/* Creator Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={mockCreator.avatar}
                    alt={mockCreator.display_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className="font-semibold">{mockCreator.display_name}</span>
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

        {/* Sidebar */}
        {!isMobile && (
          <div className="xl:col-span-1">
            <Card className="h-[600px] flex flex-col p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Live Chat
              </h3>
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>Chat messages will appear here</p>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Modals */}
      <SuperChatModal
        isOpen={showSuperChatModal}
        onClose={() => setShowSuperChatModal(false)}
        streamId={streamId || 'demo'}
        creatorId={mockCreator.id}
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