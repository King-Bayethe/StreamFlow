import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Target,
  Brain,
  BarChart3,
  Calendar,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const AIAudienceInsights = () => {
  const [insights, setInsights] = useState({
    optimalSchedule: [
      { day: "Monday", time: "7:00 PM", confidence: 89 },
      { day: "Wednesday", time: "8:00 PM", confidence: 92 },
      { day: "Friday", time: "9:00 PM", confidence: 95 },
      { day: "Saturday", time: "3:00 PM", confidence: 87 }
    ],
    pricingRecommendations: {
      subscriptions: { current: 9.99, suggested: 12.99, increase: 30 },
      donations: { current: 5.00, suggested: 7.50, increase: 50 },
      premiumChat: { current: 2.00, suggested: 3.00, increase: 50 }
    },
    engagementTactics: [
      {
        tactic: "Q&A Sessions",
        effectiveness: 94,
        description: "Weekly Q&A increases viewer retention by 40%",
        status: "recommended"
      },
      {
        tactic: "Interactive Polls",
        effectiveness: 87,
        description: "Polls during gameplay boost engagement by 35%",
        status: "implement"
      },
      {
        tactic: "Subscriber-Only Chat",
        effectiveness: 82,
        description: "Limited-time subscriber chat increases conversions",
        status: "test"
      }
    ],
    competitorAnalysis: {
      avgViewers: 1250,
      yourPosition: 3,
      growthOpportunity: 45,
      keyAdvantages: ["Consistent schedule", "High engagement", "Premium content"]
    }
  });

  const [metrics, setMetrics] = useState({
    viewerRetention: 78,
    conversionRate: 4.2,
    avgSessionTime: 42,
    revenueGrowth: 23
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Viewer Retention</p>
                <p className="text-2xl font-bold">{metrics.viewerRetention}%</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+5.2% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{metrics.conversionRate}%</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+1.1% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Session</p>
                <p className="text-2xl font-bold">{metrics.avgSessionTime}m</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+3.5m vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Growth</p>
                <p className="text-2xl font-bold">+{metrics.revenueGrowth}%</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">Above industry avg</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="competition">Competition</TabsTrigger>
        </TabsList>

        {/* Optimal Schedule */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                AI-Recommended Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {insights.optimalSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{schedule.day}</div>
                        <div className="text-sm text-muted-foreground">{schedule.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{schedule.confidence}% confidence</Badge>
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">AI Insight</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Your audience is most active during evening hours on weekdays and afternoon on weekends. 
                      Friday 9 PM shows the highest engagement potential.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Strategy */}
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Subscription Tier</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      +30% Revenue
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">${insights.pricingRecommendations.subscriptions.current}</div>
                    <div className="text-muted-foreground">→</div>
                    <div className="text-2xl font-bold text-green-600">${insights.pricingRecommendations.subscriptions.suggested}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on your content quality and audience engagement, you can increase subscription pricing.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Donation Minimum</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      +50% Average
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">${insights.pricingRecommendations.donations.current}</div>
                    <div className="text-muted-foreground">→</div>
                    <div className="text-2xl font-bold text-green-600">${insights.pricingRecommendations.donations.suggested}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Higher minimum donations often lead to larger individual contributions.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Premium Chat</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      +50% Visibility
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">${insights.pricingRecommendations.premiumChat.current}</div>
                    <div className="text-muted-foreground">→</div>
                    <div className="text-2xl font-bold text-green-600">${insights.pricingRecommendations.premiumChat.suggested}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Premium chat features justify higher pricing for guaranteed attention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tactics */}
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Engagement Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.engagementTactics.map((tactic, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{tactic.tactic}</h4>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{tactic.effectiveness}%</div>
                        <Badge variant={
                          tactic.status === "recommended" ? "default" :
                          tactic.status === "implement" ? "secondary" : "outline"
                        }>
                          {tactic.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={tactic.effectiveness} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{tactic.description}</p>
                    <Button 
                      size="sm" 
                      className="mt-3"
                      variant={tactic.status === "recommended" ? "default" : "outline"}
                    >
                      {tactic.status === "recommended" ? "Implement Now" : 
                       tactic.status === "implement" ? "Set Up" : "Test"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competition Analysis */}
        <TabsContent value="competition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Competitive Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">#{insights.competitorAnalysis.yourPosition}</div>
                  <div className="text-sm text-muted-foreground">Your ranking in category</div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Average Competitor Viewers</h4>
                    <div className="text-2xl font-bold">{insights.competitorAnalysis.avgViewers.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      You're performing above average in your category
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Growth Opportunity</h4>
                    <div className="text-2xl font-bold text-green-600">+{insights.competitorAnalysis.growthOpportunity}%</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Potential audience increase with optimization
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Your Key Advantages</h4>
                  <div className="grid gap-2">
                    {insights.competitorAnalysis.keyAdvantages.map((advantage, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAudienceInsights;