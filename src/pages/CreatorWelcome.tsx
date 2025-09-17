import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Play, 
  Settings, 
  DollarSign, 
  Users, 
  BarChart3, 
  Zap,
  ArrowRight,
  CheckCircle,
  Circle,
  Video,
  MessageSquare,
  TrendingUp,
  Gift,
  Crown,
  Radio,
  Monitor,
  PieChart,
  Shield,
  Headphones,
  Mic,
  Camera,
  Gamepad2,
  Palette,
  Bell,
  Globe,
  Star,
  Target,
  Rocket
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const CreatorWelcome = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeGuide, setActiveGuide] = useState("getting-started");

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const gettingStartedSteps = [
    { id: 1, title: "Complete your creator profile", description: "Add your bio, avatar, and social links" },
    { id: 2, title: "Set up your stream key", description: "Generate and configure your RTMP stream key" },
    { id: 3, title: "Install OBS Studio", description: "Download and set up your streaming software" },
    { id: 4, title: "Configure OBS settings", description: "Optimize your stream quality and performance" },
    { id: 5, title: "Test your first stream", description: "Go live for a few minutes to test everything" }
  ];

  const monetizationSteps = [
    { id: 6, title: "Enable SuperChat", description: "Let viewers send paid messages during streams" },
    { id: 7, title: "Create paid polls", description: "Engage viewers with interactive paid polls" },
    { id: 8, title: "Set up subscription tiers", description: "Offer exclusive content to subscribers" },
    { id: 9, title: "Configure donation goals", description: "Set goals and track progress with your audience" },
    { id: 10, title: "Review payout settings", description: "Set up your bank account for earnings" }
  ];

  const features = [
    {
      icon: Video,
      title: "Stream Management",
      description: "Professional streaming tools with OBS integration, simulcasting to multiple platforms, and HD recording.",
      color: "text-red-500"
    },
    {
      icon: DollarSign,
      title: "Monetization",
      description: "SuperChat, paid polls, subscription tiers, and direct donations to maximize your revenue.",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Moderation tools, loyalty badges, giveaways, and engagement features to grow your audience.",
      color: "text-blue-500"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Detailed analytics on viewership, earnings, engagement, and growth trends.",
      color: "text-purple-500"
    },
    {
      icon: Zap,
      title: "AI-Powered Tools",
      description: "Auto-clipping, content optimization, audience insights, and intelligent moderation.",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Safety & Moderation",
      description: "Advanced moderation tools, keyword filtering, and community guidelines enforcement.",
      color: "text-orange-500"
    }
  ];

  const progressPercentage = (completedSteps.length / (gettingStartedSteps.length + monetizationSteps.length)) * 100;

  return (
    <>
      <SEOHead 
        title="Creator Welcome - Get Started with StreamFlow"
        description="Complete guide for new creators to set up streaming, monetization, and community features on StreamFlow"
        keywords={["streaming tutorial", "creator guide", "OBS setup", "monetization", "SuperChat"]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto p-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Welcome to StreamFlow Creator
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent mb-4">
              Start Your Streaming Journey
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Everything you need to become a successful creator. Follow our step-by-step guide to set up your stream, 
              build your community, and start earning from day one.
            </p>

            {/* Progress Overview */}
            <Card className="max-w-md mx-auto mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Setup Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedSteps.length}/{gettingStartedSteps.length + monetizationSteps.length}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {completedSteps.length === 0 ? "Let's get started!" : 
                   progressPercentage === 100 ? "Congratulations! You're all set!" :
                   "Keep going, you're doing great!"}
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/channel-setup">
                  <Settings className="w-5 h-5" />
                  Complete Channel Setup
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/creator-dashboard">
                  <Play className="w-5 h-5" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="gap-2" asChild>
                <Link to="/support">
                  <MessageSquare className="w-5 h-5" />
                  Get Help
                </Link>
              </Button>
            </div>
          </div>

          {/* Feature Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">What You Can Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${feature.color}`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tutorial Tabs */}
          <Tabs value={activeGuide} onValueChange={setActiveGuide} className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="getting-started" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Getting Started
              </TabsTrigger>
              <TabsTrigger value="streaming" className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Streaming Setup
              </TabsTrigger>
              <TabsTrigger value="monetization" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Monetization
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Advanced Tips
              </TabsTrigger>
            </TabsList>

            {/* Getting Started Guide */}
            <TabsContent value="getting-started" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Essential Setup Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {gettingStartedSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <button
                        onClick={() => toggleStep(step.id)}
                        className="mt-1 transition-colors"
                      >
                        {completedSteps.includes(step.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Streaming Setup Guide */}
            <TabsContent value="streaming" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Equipment Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Camera className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="font-medium">Camera</p>
                          <p className="text-sm text-muted-foreground">Webcam or DSLR for video</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mic className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="font-medium">Microphone</p>
                          <p className="text-sm text-muted-foreground">USB or XLR mic for clear audio</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Headphones className="w-4 h-4 text-purple-500" />
                        <div>
                          <p className="font-medium">Headphones</p>
                          <p className="text-sm text-muted-foreground">Monitor your audio quality</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Monitor className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="font-medium">Lighting</p>
                          <p className="text-sm text-muted-foreground">Ring light or softbox setup</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      OBS Studio Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium text-sm">1. Download OBS Studio</p>
                        <p className="text-xs text-muted-foreground">Free and open-source streaming software</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium text-sm">2. Add Your Stream Key</p>
                        <p className="text-xs text-muted-foreground">Copy from StreamFlow dashboard</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium text-sm">3. Configure Scenes</p>
                        <p className="text-xs text-muted-foreground">Set up your camera, game capture, etc.</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium text-sm">4. Test Your Stream</p>
                        <p className="text-xs text-muted-foreground">Go live for a few minutes to test</p>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link to="/creator-dashboard">
                        Get Stream Key
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Monetization Guide */}
            <TabsContent value="monetization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Revenue Streams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {monetizationSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <button
                        onClick={() => toggleStep(step.id)}
                        className="mt-1 transition-colors"
                      >
                        {completedSteps.includes(step.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MessageSquare className="w-5 h-5 text-blue-500" />
                      SuperChat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Viewers pay to highlight their messages during live streams.
                    </p>
                    <Badge variant="secondary">$1 - $500 per message</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <PieChart className="w-5 h-5 text-purple-500" />
                      Paid Polls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Interactive polls where viewers pay to vote on decisions.
                    </p>
                    <Badge variant="secondary">$0.50+ per vote</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      Subscriptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Monthly subscriptions for exclusive content and perks.
                    </p>
                    <Badge variant="secondary">$4.99+ per month</Badge>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Advanced Tips */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Growth Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="font-medium text-sm text-green-800 dark:text-green-300">Consistency is Key</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Stream regularly at the same times</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="font-medium text-sm text-blue-800 dark:text-blue-300">Engage Your Audience</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">Respond to chat and build community</p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="font-medium text-sm text-purple-800 dark:text-purple-300">Use AI Tools</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">Auto-clips and content optimization</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Branding Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <p className="font-medium text-sm text-orange-800 dark:text-orange-300">Visual Identity</p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">Consistent colors, logo, and overlays</p>
                    </div>
                    <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg border border-pink-200 dark:border-pink-800">
                      <p className="font-medium text-sm text-pink-800 dark:text-pink-300">Unique Personality</p>
                      <p className="text-xs text-pink-600 dark:text-pink-400">Be authentic and memorable</p>
                    </div>
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <p className="font-medium text-sm text-indigo-800 dark:text-indigo-300">Cross-Platform</p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400">Maintain consistency across socials</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-center">Ready to Get Started?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/channel-setup">
                    <Settings className="w-5 h-5" />
                    Complete Setup
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link to="/creator-dashboard">
                    <Play className="w-5 h-5" />
                    Start Streaming Now
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" className="gap-2" asChild>
                  <Link to="/support">
                    <MessageSquare className="w-5 h-5" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreatorWelcome;