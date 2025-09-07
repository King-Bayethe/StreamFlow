import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bot, 
  Star, 
  Download, 
  Search, 
  Filter,
  Shield,
  MessageSquare,
  Video,
  DollarSign,
  Zap,
  Heart,
  Users,
  TrendingUp,
  Settings,
  Play,
  Pause,
  MoreHorizontal
} from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  rating: number;
  reviews: number;
  price: string;
  features: string[];
  avatar: string;
  installed: boolean;
  active?: boolean;
  popularity: number;
  lastUpdated: string;
}

const AIAgentMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  
  const [agents] = useState<AIAgent[]>([
    {
      id: "1",
      name: "ChatGuard Pro",
      description: "Advanced chat moderation with real-time toxicity detection, spam filtering, and automated warnings",
      category: "moderation",
      provider: "ModTech AI",
      rating: 4.8,
      reviews: 1247,
      price: "$9.99/month",
      features: ["Real-time toxicity detection", "Smart spam filtering", "Auto-warnings", "Custom filters"],
      avatar: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=40&h=40&fit=crop&crop=face",
      installed: true,
      active: true,
      popularity: 95,
      lastUpdated: "2 days ago"
    },
    {
      id: "2", 
      name: "HighlightMaster",
      description: "AI-powered highlight generation that detects epic moments and creates viral-ready clips automatically",
      category: "content",
      provider: "ViralAI",
      rating: 4.6,
      reviews: 892,
      price: "$14.99/month",
      features: ["Auto-highlight detection", "Viral clip creation", "Multi-platform export", "Trending hashtags"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      installed: false,
      popularity: 87,
      lastUpdated: "1 week ago"
    },
    {
      id: "3",
      name: "SponsorBot",
      description: "Automated sponsorship outreach that finds brand deals and negotiates partnerships on your behalf",
      category: "business",
      provider: "DealFlow AI",
      rating: 4.3,
      reviews: 456,
      price: "$19.99/month",
      features: ["Brand matching", "Auto outreach", "Deal negotiation", "Contract management"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      installed: false,
      popularity: 72,
      lastUpdated: "3 days ago"
    },
    {
      id: "4",
      name: "VirtualHost Alex",
      description: "AI co-host that can read donations, interact with chat, fill dead air, and keep your stream engaging",
      category: "hosting",
      provider: "StreamBuddy",
      rating: 4.7,
      reviews: 634,
      price: "$12.99/month",
      features: ["Voice synthesis", "Chat interaction", "Dead air detection", "Donation reading"],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      installed: true,
      active: false,
      popularity: 89,
      lastUpdated: "5 days ago"
    },
    {
      id: "5",
      name: "TrendAnalyzer",
      description: "Market intelligence agent that tracks trending topics, optimal posting times, and competitor strategies",
      category: "analytics",
      provider: "DataStream",
      rating: 4.4,
      reviews: 278,
      price: "$7.99/month",
      features: ["Trend tracking", "Competitor analysis", "Optimal timing", "Growth insights"],
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      installed: false,
      popularity: 76,
      lastUpdated: "1 day ago"
    },
    {
      id: "6",
      name: "RevenueOptimizer",
      description: "Smart pricing agent that optimizes subscription tiers, donation goals, and monetization strategies",
      category: "monetization",
      provider: "ProfitAI",
      rating: 4.5,
      reviews: 567,
      price: "$16.99/month",
      features: ["Dynamic pricing", "Revenue optimization", "A/B testing", "Performance tracking"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      installed: false,
      popularity: 81,
      lastUpdated: "4 days ago"
    }
  ]);

  const categories = [
    { id: "all", name: "All Categories", icon: Bot },
    { id: "moderation", name: "Moderation", icon: Shield },
    { id: "content", name: "Content Creation", icon: Video },
    { id: "hosting", name: "Virtual Hosting", icon: MessageSquare },
    { id: "business", name: "Business", icon: DollarSign },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
    { id: "monetization", name: "Monetization", icon: DollarSign }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "popularity": return b.popularity - a.popularity;
      case "rating": return b.rating - a.rating;
      case "price": return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
      default: return 0;
    }
  });

  const installedAgents = agents.filter(agent => agent.installed);

  const toggleAgent = (agentId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling agent ${agentId}`);
  };

  const installAgent = (agentId: string) => {
    // In a real app, this would make an API call
    console.log(`Installing agent ${agentId}`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="installed">My Agents ({installedAgents.length})</TabsTrigger>
        </TabsList>

        {/* Marketplace */}
        <TabsContent value="marketplace" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search AI agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Agent Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={agent.avatar} />
                        <AvatarFallback>{agent.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{agent.provider}</p>
                      </div>
                    </div>
                    <Badge variant={agent.installed ? "default" : "secondary"}>
                      {agent.installed ? "Installed" : "Available"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{agent.rating}</span>
                      <span className="text-sm text-muted-foreground">({agent.reviews})</span>
                    </div>
                    <div className="text-sm font-bold">{agent.price}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {agent.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {agent.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {agent.installed ? (
                      <Button variant="outline" className="flex-1" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    ) : (
                      <Button 
                        className="flex-1" 
                        size="sm"
                        onClick={() => installAgent(agent.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Install
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Installed Agents */}
        <TabsContent value="installed" className="space-y-4">
          {installedAgents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Agents Installed</h3>
                <p className="text-muted-foreground mb-4">
                  Browse the marketplace to find AI agents that can help automate and enhance your streaming workflow.
                </p>
                <Button>Browse Marketplace</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {installedAgents.map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={agent.avatar} />
                          <AvatarFallback>{agent.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-muted-foreground">{agent.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant={agent.active ? "default" : "secondary"}>
                              {agent.active ? "Active" : "Inactive"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Updated {agent.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant={agent.active ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleAgent(agent.id)}
                        >
                          {agent.active ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAgentMarketplace;