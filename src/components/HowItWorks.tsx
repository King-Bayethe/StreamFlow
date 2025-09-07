import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, MessageCircle, DollarSign, TrendingUp, Users, Zap } from "lucide-react";
import creatorSetup from "@/assets/creator-setup.jpg";

const HowItWorks = () => {
  const creatorSteps = [
    {
      icon: Video,
      title: "Start Streaming",
      description: "Set up your stream with our easy-to-use tools and go live instantly.",
      details: "Professional streaming tools, HD quality, multi-platform support"
    },
    {
      icon: MessageCircle,
      title: "Enable Paid Chat",
      description: "Turn on premium chat features and set your rates for interactions.",
      details: "Custom pricing, moderation tools, instant notifications"
    },
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Get paid instantly for every premium message and interaction.",
      details: "Real-time payments, detailed analytics, 85% revenue share"
    }
  ];

  const viewerSteps = [
    {
      icon: Users,
      title: "Discover Content",
      description: "Browse trending streams and find creators you love.",
      details: "Personalized recommendations, category filters, trending lists"
    },
    {
      icon: Zap,
      title: "Interact Premium",
      description: "Send premium messages, reactions, and requests to creators.",
      details: "Instant delivery, priority visibility, exclusive features"
    },
    {
      icon: TrendingUp,
      title: "Build Connections",
      description: "Form meaningful relationships with your favorite creators.",
      details: "Follow system, direct messages, exclusive content access"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're a creator looking to monetize your content or a viewer wanting premium interactions, we've made it simple.
          </p>
        </div>

        {/* Creator Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-primary">For Creators</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Turn your passion into profit with our comprehensive streaming and monetization platform.
              </p>
              <div className="space-y-6">
                {creatorSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground mb-1">{step.description}</p>
                      <p className="text-sm text-muted-foreground/80">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="hero" size="lg" className="mt-8">
                Start Creating
              </Button>
            </div>
            <div className="relative">
              <img 
                src={creatorSetup} 
                alt="Creator streaming setup"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-accent to-primary text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">$2,500</div>
                <div className="text-sm opacity-90">Avg. Monthly Earnings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Viewer Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <h3 className="text-3xl font-bold mb-6 text-secondary">For Viewers</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Get closer to your favorite creators with premium interactions and exclusive content.
              </p>
              <div className="space-y-6">
                {viewerSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground mb-1">{step.description}</p>
                      <p className="text-sm text-muted-foreground/80">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="premium" size="lg" className="mt-8">
                Start Watching
              </Button>
            </div>
            <div className="lg:order-1 grid grid-cols-2 gap-4">
              <Card className="p-6 text-center hover-lift">
                <MessageCircle className="w-8 h-8 mx-auto mb-4 text-primary" />
                <div className="text-2xl font-bold mb-2">50M+</div>
                <div className="text-sm text-muted-foreground">Premium Messages</div>
              </Card>
              <Card className="p-6 text-center hover-lift">
                <Users className="w-8 h-8 mx-auto mb-4 text-secondary" />
                <div className="text-2xl font-bold mb-2">2M+</div>
                <div className="text-sm text-muted-foreground">Active Viewers</div>
              </Card>
              <Card className="p-6 text-center hover-lift">
                <TrendingUp className="w-8 h-8 mx-auto mb-4 text-accent" />
                <div className="text-2xl font-bold mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </Card>
              <Card className="p-6 text-center hover-lift">
                <Zap className="w-8 h-8 mx-auto mb-4 text-primary" />
                <div className="text-2xl font-bold mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Live Support</div>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators and millions of viewers in the next generation of live streaming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Become a Creator
            </Button>
            <Button variant="outline" size="lg">
              Explore as Viewer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;