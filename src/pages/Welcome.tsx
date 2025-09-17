import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Video, Users, TrendingUp, Play, MessageCircle, 
  DollarSign, Settings, Eye, Zap, ArrowRight 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Welcome = () => {
  const navigate = useNavigate();
  const { user, userRole, isCreator } = useAuth();

  const handleGetStarted = () => {
    if (isCreator) {
      navigate('/creator-dashboard');
    } else {
      navigate('/browse');
    }
  };

  const handleExploreHub = () => {
    navigate('/viewer-hub');
  };

  const creatorFeatures = [
    {
      icon: Video,
      title: 'Start Streaming',
      description: 'Go live with your audience instantly',
      action: 'Create Stream',
      path: '/creator-dashboard'
    },
    {
      icon: DollarSign,
      title: 'Monetize Content',
      description: 'Earn through SuperChat and tips',
      action: 'View Analytics',
      path: '/creator-dashboard'
    },
    {
      icon: Users,
      title: 'Build Community',
      description: 'Engage with your followers',
      action: 'Manage Community',
      path: '/creator-dashboard'
    }
  ];

  const viewerFeatures = [
    {
      icon: Play,
      title: 'Watch Live Streams',
      description: 'Discover amazing content creators',
      action: 'Browse Streams',
      path: '/browse'
    },
    {
      icon: MessageCircle,
      title: 'Join Chat',
      description: 'Interact with streamers and community',
      action: 'Explore',
      path: '/viewer-hub'
    },
    {
      icon: Zap,
      title: 'SuperChat Support',
      description: 'Support creators with highlighted messages',
      action: 'Learn More',
      path: '/viewer-hub'
    }
  ];

  const features = isCreator ? creatorFeatures : viewerFeatures;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="text-2xl">
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                {isCreator ? 'Creator' : 'Viewer'}
              </Badge>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Welcome to StreamFlow! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            You're all set as a {isCreator ? 'content creator' : 'viewer'}
          </p>
          <p className="text-muted-foreground">
            Let's explore what you can do on the platform
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 border-primary/20 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {isCreator ? <Video className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                {isCreator ? 'Creator Dashboard' : 'Browse Streams'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {isCreator 
                  ? 'Access your streaming tools and analytics'
                  : 'Discover live streams and trending content'
                }
              </p>
              <Button onClick={handleGetStarted} className="w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                {isCreator ? 'Community Hub' : 'Viewer Hub'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {isCreator 
                  ? 'Manage your community and engagement'
                  : 'Explore trending content and join discussions'
                }
              </p>
              <Button variant="outline" onClick={handleExploreHub} className="w-full">
                Explore Hub
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            What You Can Do
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(feature.path)}
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
          <CardContent className="py-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Join Our Growing Community</h3>
              <p className="text-muted-foreground">
                StreamFlow is home to thousands of creators and viewers
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">1K+</div>
                <div className="text-sm text-muted-foreground">Active Creators</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Daily Viewers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Live Streams Daily</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Community Support</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Reminder */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Want to customize your experience?
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/profile')}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Edit Profile & Settings
          </Button>
        </div>
      </div>
    </div>
  );
};