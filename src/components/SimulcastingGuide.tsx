import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Radio, 
  Youtube, 
  Activity, 
  MessageSquare,
  Users,
  Eye,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Settings,
  Zap
} from 'lucide-react';

const SimulcastingGuide: React.FC = () => {
  const features = [
    {
      icon: <Radio className="h-8 w-8 text-blue-500" />,
      title: "Multi-Platform Streaming",
      description: "Simultaneously broadcast to YouTube, Twitch, Rumble, and Facebook while hosting your main audience on our platform."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      title: "Unified Chat Management",
      description: "Manage conversations from all platforms in one dashboard. See, respond, and moderate chat from everywhere."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Audience Aggregation",
      description: "Combine viewer counts, engagement metrics, and analytics from all platforms for complete audience insights."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
      title: "Unified Monetization",
      description: "Collect tips, subscriptions, and donations from all platforms while keeping your main revenue stream here."
    }
  ];

  const platforms = [
    { name: "YouTube Live", icon: <Youtube className="h-6 w-6" />, status: "Supported", color: "bg-red-500" },
    { name: "Twitch", icon: <Activity className="h-6 w-6" />, status: "Supported", color: "bg-purple-500" },
    { name: "Rumble", icon: <Radio className="h-6 w-6" />, status: "Supported", color: "bg-green-500" },
    { name: "Facebook Live", icon: <Activity className="h-6 w-6" />, status: "Supported", color: "bg-blue-500" }
  ];

  const steps = [
    {
      step: 1,
      title: "Connect Your Platforms",
      description: "Link your YouTube, Twitch, Rumble, and Facebook accounts using OAuth authentication.",
      icon: <Settings className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Configure Stream Settings",
      description: "Set up RTMP endpoints, stream keys, and quality settings for each platform.",
      icon: <Zap className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Start Simulcasting",
      description: "Begin broadcasting to all connected platforms with a single click while managing everything from one place.",
      icon: <Radio className="h-5 w-5" />
    },
    {
      step: 4,
      title: "Manage Unified Chat",
      description: "Interact with your entire audience across all platforms from our centralized chat dashboard.",
      icon: <MessageSquare className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Simulcasting & Unified Chat
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stream to multiple platforms simultaneously while keeping your audience unified. 
          Manage all conversations from one powerful dashboard.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supported Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((platform, index) => (
              <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                  {platform.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{platform.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {platform.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Simulcasting Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {step.icon}
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Use Simulcasting?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Maximize Reach</h3>
              <p className="text-muted-foreground">
                Reach audiences across multiple platforms without additional effort.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Increase Revenue</h3>
              <p className="text-muted-foreground">
                Collect monetization from all platforms while maintaining your primary income here.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Unified Experience</h3>
              <p className="text-muted-foreground">
                Manage your entire community from one powerful dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Preview */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Simulcasting Impact</h3>
            <p className="text-muted-foreground">
              See how creators are growing with multi-platform streaming
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">300%</div>
              <div className="text-sm text-muted-foreground">Average reach increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">250%</div>
              <div className="text-sm text-muted-foreground">Revenue growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Time saved on management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">4.8/5</div>
              <div className="text-sm text-muted-foreground">Creator satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulcastingGuide;