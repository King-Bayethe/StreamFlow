import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  Star, 
  Crown, 
  Zap,
  Play,
  Eye,
  MessageCircle,
  Gift,
  Bookmark,
  Shield,
  Users,
  Trophy,
  Sparkles
} from "lucide-react";

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
  features: string[];
  description: string;
}

const SubscriptionTiers = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [currentTier, setCurrentTier] = useState("free");

  const tiers: SubscriptionTier[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      yearlyPrice: 0,
      icon: <Eye className="w-6 h-6" />,
      color: "text-muted-foreground",
      description: "Perfect for casual viewers",
      features: [
        "Watch live streams",
        "Basic chat participation",
        "Standard video quality",
        "Limited watch history",
        "Community features"
      ]
    },
    {
      id: "supporter",
      name: "Supporter",
      price: 4.99,
      yearlyPrice: 49.99,
      icon: <Star className="w-6 h-6" />,
      color: "text-blue-500",
      popular: true,
      description: "Enhanced viewing experience",
      features: [
        "HD video quality",
        "Unlimited watch history",
        "Priority chat",
        "Exclusive emotes",
        "No ads",
        "Creator badges",
        "VOD access",
        "Mobile notifications"
      ]
    },
    {
      id: "vip",
      name: "VIP",
      price: 9.99,
      yearlyPrice: 99.99,
      icon: <Crown className="w-6 h-6" />,
      color: "text-purple-500",
      description: "Premium features for power users",
      features: [
        "Everything in Supporter",
        "4K video quality",
        "VIP chat privileges",
        "Custom profile themes",
        "Early access to features",
        "Exclusive content",
        "Priority support",
        "Advanced analytics",
        "Multiple device sync"
      ]
    },
    {
      id: "legend",
      name: "Legend",
      price: 19.99,
      yearlyPrice: 199.99,
      icon: <Trophy className="w-6 h-6" />,
      color: "text-yellow-500",
      description: "Ultimate experience for true fans",
      features: [
        "Everything in VIP",
        "Exclusive legend badge",
        "Direct creator messaging",
        "Behind-the-scenes content",
        "Creator meet & greets",
        "Custom emote creation",
        "API access",
        "White-label options",
        "Premium community",
        "24/7 dedicated support"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Play className="w-5 h-5" />,
      title: "Premium Content",
      description: "Access exclusive streams and VODs"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Enhanced Chat",
      description: "Priority messages and custom emotes"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Creator Support",
      description: "Directly support your favorite creators"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Ad-Free Experience",
      description: "Enjoy uninterrupted streaming"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock premium features and support your favorite creators with our flexible subscription plans
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={`text-sm ${!isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`text-sm ${isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
            Yearly
          </span>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Save 17%
          </Badge>
        </div>
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => {
          const price = isYearly ? tier.yearlyPrice : tier.price;
          const monthlyPrice = isYearly ? tier.yearlyPrice / 12 : tier.price;
          const isCurrentTier = currentTier === tier.id;
          
          return (
            <Card 
              key={tier.id} 
              className={`relative overflow-hidden hover-lift transition-all duration-300 ${
                tier.popular ? 'ring-2 ring-primary/50 shadow-lg' : ''
              } ${isCurrentTier ? 'border-primary bg-primary/5' : ''}`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${tier.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`mx-auto mb-4 ${tier.color}`}>
                  {tier.icon}
                </div>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
                  </div>
                  {price > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {isYearly ? `/year ($${monthlyPrice.toFixed(2)}/month)` : '/month'}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full"
                  variant={isCurrentTier ? "outline" : tier.popular ? "default" : "outline"}
                  disabled={isCurrentTier}
                >
                  {isCurrentTier ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Current Plan
                    </>
                  ) : price === 0 ? (
                    "Current Plan"
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      {currentTier === "free" ? "Upgrade Now" : "Switch Plan"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="bg-muted/30 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-center mb-8">Why Subscribe?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {benefit.icon}
              </div>
              <h4 className="font-semibold">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  {tiers.map(tier => (
                    <th key={tier.id} className="text-center py-3 px-4">
                      <div className={`${tier.color}`}>{tier.icon}</div>
                      <div className="text-sm mt-1">{tier.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Video Quality</td>
                  <td className="text-center py-3 px-4">720p</td>
                  <td className="text-center py-3 px-4">1080p HD</td>
                  <td className="text-center py-3 px-4">4K Ultra HD</td>
                  <td className="text-center py-3 px-4">4K + HDR</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Chat Priority</td>
                  <td className="text-center py-3 px-4">Basic</td>
                  <td className="text-center py-3 px-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-3 px-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-3 px-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Exclusive Content</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">Limited</td>
                  <td className="text-center py-3 px-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-3 px-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Support Level</td>
                  <td className="text-center py-3 px-4">Community</td>
                  <td className="text-center py-3 px-4">Email</td>
                  <td className="text-center py-3 px-4">Priority</td>
                  <td className="text-center py-3 px-4">24/7 Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Current Subscription Status */}
      {currentTier !== "free" && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Your Current Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    You're currently subscribed to the {tiers.find(t => t.id === currentTier)?.name} plan
                  </p>
                </div>
              </div>
              <Button variant="outline">
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionTiers;