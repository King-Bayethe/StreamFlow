import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  Eye, 
  Play, 
  Calendar, 
  Clock,
  ExternalLink,
  Share2,
  Bell,
  Heart,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Twitch,
  Globe,
  CheckCircle,
  Star,
  VideoIcon,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';

interface Creator {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  banner: string;
  followers: number;
  totalViews: number;
  isVerified: boolean;
  isLive: boolean;
  currentViewers?: number;
  streamTitle?: string;
  socialLinks: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    twitch?: string;
    tiktok?: string;
    website?: string;
  };
  tags: string[];
  joinedDate: string;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  isPinned?: boolean;
  isTrailer?: boolean;
}

const Channel: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch based on username
    const mockCreator: Creator = {
      id: 'creator-1',
      username: username || 'gaming-pro',
      displayName: 'Gaming Pro Studio',
      bio: 'Welcome to my channel! I stream the latest games, provide tutorials, and share epic gaming moments. Join our community of 45K+ gamers!',
      avatar: '/api/placeholder/200/200',
      banner: '/api/placeholder/1200/300',
      followers: 45230,
      totalViews: 2847593,
      isVerified: true,
      isLive: true,
      currentViewers: 1247,
      streamTitle: 'Epic Boss Battles & New Game Reviews',
      socialLinks: {
        youtube: 'https://youtube.com/gaming-pro',
        twitter: 'https://twitter.com/gaming-pro',
        instagram: 'https://instagram.com/gaming-pro',
        twitch: 'https://twitch.tv/gaming-pro',
        website: 'https://gaming-pro.com'
      },
      tags: ['Gaming', 'Reviews', 'Tutorials', 'Live Streams'],
      joinedDate: '2022-03-15'
    };

    const mockVideos: VideoItem[] = [
      {
        id: 'v1',
        title: 'Channel Trailer - Welcome to Gaming Pro!',
        description: 'Get to know what this channel is all about',
        thumbnail: '/api/placeholder/320/180',
        duration: '2:35',
        views: 15420,
        uploadDate: '2024-01-01',
        isPinned: true,
        isTrailer: true
      },
      {
        id: 'v2',
        title: 'Ultimate Gaming Setup Tour 2024',
        description: 'Complete breakdown of my streaming setup',
        thumbnail: '/api/placeholder/320/180',
        duration: '12:47',
        views: 89234,
        uploadDate: '2024-01-10'
      },
      {
        id: 'v3',
        title: 'Top 10 Games to Watch in 2024',
        description: 'My predictions for the biggest games this year',
        thumbnail: '/api/placeholder/320/180',
        duration: '15:23',
        views: 156789,
        uploadDate: '2024-01-08'
      },
      {
        id: 'v4',
        title: 'Live Stream Highlights - Epic Wins',
        description: 'Best moments from last week\'s streams',
        thumbnail: '/api/placeholder/320/180',
        duration: '8:52',
        views: 45632,
        uploadDate: '2024-01-05'
      },
      {
        id: 'v5',
        title: 'Beginner\'s Guide to Competitive Gaming',
        description: 'Everything you need to know to get started',
        thumbnail: '/api/placeholder/320/180',
        duration: '18:45',
        views: 234567,
        uploadDate: '2024-01-03'
      },
      {
        id: 'v6',
        title: 'Gaming News Weekly - January Edition',
        description: 'All the latest gaming news and updates',
        thumbnail: '/api/placeholder/320/180',
        duration: '11:30',
        views: 67891,
        uploadDate: '2023-12-28'
      }
    ];

    setCreator(mockCreator);
    setVideos(mockVideos);
    setLoading(false);
  }, [username]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You ${isFollowing ? 'unfollowed' : 'are now following'} ${creator?.displayName}`,
    });
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    toast({
      title: isSubscribed ? "Unsubscribed" : "Subscribed",
      description: `You ${isSubscribed ? 'unsubscribed from' : 'subscribed to'} ${creator?.displayName}`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Channel link copied to clipboard",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return <Youtube className="h-5 w-5" />;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'twitch': return <Twitch className="h-5 w-5" />;
      case 'tiktok': return <VideoIcon className="h-5 w-5" />;
      case 'website': return <Globe className="h-5 w-5" />;
      default: return <ExternalLink className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-64 bg-muted"></div>
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="h-32 bg-muted rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Channel not found</h1>
          <p className="text-muted-foreground">The creator you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const pinnedVideos = videos.filter(v => v.isPinned);
  const regularVideos = videos.filter(v => !v.isPinned);
  const trailerVideo = videos.find(v => v.isTrailer);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Optimization */}
      <SEOHead
        title={`${creator.displayName} (@${creator.username}) - Live Streaming Channel`}
        description={`${creator.bio} Follow ${creator.displayName} for live streams, videos, and exclusive content. ${formatNumber(creator.followers)} followers and ${formatNumber(creator.totalViews)} total views.`}
        canonical={window.location.href}
        ogImage={creator.banner}
        keywords={[
          creator.displayName,
          creator.username,
          'live streaming',
          'content creator',
          ...creator.tags.map(tag => tag.toLowerCase())
        ]}
        author={creator.displayName}
        type="profile"
      />
      
      
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src={creator.banner} 
          alt={`${creator.displayName} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        
        {/* Live indicator */}
        {creator.isLive && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-red-600 text-white animate-pulse">
              🔴 LIVE • {formatNumber(creator.currentViewers || 0)} viewers
            </Badge>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src={creator.avatar} alt={creator.displayName} />
                  <AvatarFallback className="text-2xl font-bold">
                    {creator.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {creator.isVerified && (
                  <div className="absolute -bottom-1 -right-1">
                    <CheckCircle className="h-8 w-8 text-blue-500 bg-background rounded-full" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{creator.displayName}</h1>
                    <p className="text-muted-foreground text-lg mb-1">@{creator.username}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{formatNumber(creator.followers)} followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{formatNumber(creator.totalViews)} total views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDate(creator.joinedDate)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creator.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleFollow}
                      variant={isFollowing ? "outline" : "default"}
                      size="lg"
                      className="min-w-32"
                    >
                      {isFollowing ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <Users className="h-4 w-4 mr-2" />
                          Follow
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={handleSubscribe}
                      variant={isSubscribed ? "outline" : "premium"}
                      size="lg"
                      className="min-w-32"
                    >
                      {isSubscribed ? (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          Subscribed
                        </>
                      ) : (
                        <>
                          <Bell className="h-4 w-4 mr-2" />
                          Subscribe
                        </>
                      )}
                    </Button>

                    <Button variant="outline" size="lg" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {creator.bio}
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {Object.entries(creator.socialLinks).map(([platform, url]) => (
                    <Button
                      key={platform}
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {getSocialIcon(platform)}
                        <span className="ml-2 capitalize">{platform}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Stream Banner */}
        {creator.isLive && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className="bg-red-600 text-white">
                    🔴 LIVE NOW
                  </Badge>
                  <div>
                    <h3 className="font-semibold text-lg">{creator.streamTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(creator.currentViewers || 0)} viewers watching now
                    </p>
                  </div>
                </div>
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Live
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-8">
            {/* Pinned/Trailer Section */}
            {trailerVideo && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Channel Trailer</h2>
                <Card className="mb-8">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative aspect-video bg-muted">
                        <img 
                          src={trailerVideo.thumbnail} 
                          alt={trailerVideo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="lg" className="rounded-full h-16 w-16">
                            <Play className="h-8 w-8" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="secondary">{trailerVideo.duration}</Badge>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-2">{trailerVideo.title}</h3>
                        <p className="text-muted-foreground mb-4">{trailerVideo.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span>{formatNumber(trailerVideo.views)} views</span>
                          <span>{formatDate(trailerVideo.uploadDate)}</span>
                        </div>
                        <Button>
                          <Play className="h-4 w-4 mr-2" />
                          Watch Trailer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Videos */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularVideos.map((video) => (
                  <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="secondary">{video.duration}</Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                          <Button size="lg" className="rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatNumber(video.views)} views</span>
                          <span>•</span>
                          <span>{formatDate(video.uploadDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {creator.displayName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{creator.bio}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Channel Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Followers</span>
                        <span className="font-semibold">{formatNumber(creator.followers)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Views</span>
                        <span className="font-semibold">{formatNumber(creator.totalViews)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Videos</span>
                        <span className="font-semibold">{videos.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Joined</span>
                        <span className="font-semibold">{formatDate(creator.joinedDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Connect</h3>
                    <div className="space-y-3">
                      {Object.entries(creator.socialLinks).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                        >
                          {getSocialIcon(platform)}
                          <span className="capitalize">{platform}</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Join the Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with other fans and get the latest updates from {creator.displayName}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button>
                      <Bell className="h-4 w-4 mr-2" />
                      Subscribe for Updates
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Follow on Social
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Channel;