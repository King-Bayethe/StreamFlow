import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  AlertTriangle, 
  Ban, 
  Eye, 
  MessageSquare,
  CreditCard,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Settings,
  Zap
} from "lucide-react";

interface ModerationEvent {
  id: string;
  type: 'chat' | 'content' | 'payment' | 'user';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  user: string;
  timestamp: Date;
  action: string;
  status: 'pending' | 'resolved' | 'escalated';
}

const AITrustSafety = () => {
  const [isActive, setIsActive] = useState(true);
  const [autoActions, setAutoActions] = useState({
    chatFiltering: true,
    contentScanning: true,
    paymentVerification: true,
    spamDetection: true
  });

  const [moderationEvents, setModerationEvents] = useState<ModerationEvent[]>([
    {
      id: "1",
      type: "chat",
      severity: "high",
      description: "Hate speech detected in message",
      user: "user123",
      timestamp: new Date(),
      action: "Message deleted, user warned",
      status: "resolved"
    },
    {
      id: "2", 
      type: "content",
      severity: "medium",
      description: "Potentially NSFW visual content detected",
      user: "streamer",
      timestamp: new Date(Date.now() - 300000),
      action: "Content flagged for review",
      status: "pending"
    },
    {
      id: "3",
      type: "payment",
      severity: "critical",
      description: "Suspicious payment pattern detected",
      user: "donor456",
      timestamp: new Date(Date.now() - 600000),
      action: "Payment held for verification",
      status: "escalated"
    }
  ]);

  const [stats, setStats] = useState({
    messagesScanned: 15420,
    threatsBlocked: 87,
    paymentsVerified: 234,
    falsePositives: 3
  });

  // Simulate real-time moderation events
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const eventTypes = ['chat', 'content', 'payment', 'user'] as const;
      const severities = ['low', 'medium', 'high'] as const;
      const descriptions = [
        "Spam message detected and filtered",
        "Inappropriate language in chat",
        "Suspicious link shared",
        "Payment verification successful",
        "Content quality check passed"
      ];

      const newEvent: ModerationEvent = {
        id: Date.now().toString(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        user: `user${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(),
        action: "Auto-moderated",
        status: "resolved"
      };

      setModerationEvents(prev => [newEvent, ...prev.slice(0, 19)]);
      setStats(prev => ({
        ...prev,
        messagesScanned: prev.messagesScanned + Math.floor(Math.random() * 10),
        threatsBlocked: prev.threatsBlocked + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            AI Trust & Safety
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="safety-toggle">Active</Label>
            <Switch
              id="safety-toggle"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isActive ? (
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.messagesScanned.toLocaleString()}</div>
                <div className="text-xs text-green-700 dark:text-green-300">Messages Scanned</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.threatsBlocked}</div>
                <div className="text-xs text-red-700 dark:text-red-300">Threats Blocked</div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.paymentsVerified}</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Payments Verified</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.falsePositives}</div>
                <div className="text-xs text-orange-700 dark:text-orange-300">False Positives</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              AI Trust & Safety is disabled. Enable to start monitoring your stream.
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Recent Events</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Recent Events */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Moderation Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {moderationEvents.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No moderation events detected
                  </div>
                ) : (
                  <div className="space-y-3">
                    {moderationEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className={`p-1 rounded ${getSeverityColor(event.severity)}`}>
                          {event.type === 'chat' && <MessageSquare className="h-3 w-3" />}
                          {event.type === 'content' && <Eye className="h-3 w-3" />}
                          {event.type === 'payment' && <CreditCard className="h-3 w-3" />}
                          {event.type === 'user' && <Ban className="h-3 w-3" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-sm">{event.description}</div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(event.status)}
                              <Badge variant="outline" className="text-xs">
                                {event.severity}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            User: {event.user} • {event.action}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {event.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Auto-Moderation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Chat Filtering</Label>
                    <p className="text-sm text-muted-foreground">Auto-filter hate speech and spam</p>
                  </div>
                  <Switch
                    checked={autoActions.chatFiltering}
                    onCheckedChange={(checked) => 
                      setAutoActions(prev => ({ ...prev, chatFiltering: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Content Scanning</Label>
                    <p className="text-sm text-muted-foreground">Detect NSFW and inappropriate content</p>
                  </div>
                  <Switch
                    checked={autoActions.contentScanning}
                    onCheckedChange={(checked) => 
                      setAutoActions(prev => ({ ...prev, contentScanning: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Payment Verification</Label>
                    <p className="text-sm text-muted-foreground">Verify suspicious payment patterns</p>
                  </div>
                  <Switch
                    checked={autoActions.paymentVerification}
                    onCheckedChange={(checked) => 
                      setAutoActions(prev => ({ ...prev, paymentVerification: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Spam Detection</Label>
                    <p className="text-sm text-muted-foreground">Block repetitive and promotional content</p>
                  </div>
                  <Switch
                    checked={autoActions.spamDetection}
                    onCheckedChange={(checked) => 
                      setAutoActions(prev => ({ ...prev, spamDetection: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Sensitivity Levels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Hate Speech Detection</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs">Low</span>
                    <Progress value={75} className="flex-1" />
                    <span className="text-xs">High</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Spam Detection</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs">Low</span>
                    <Progress value={60} className="flex-1" />
                    <span className="text-xs">High</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Content Safety</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs">Low</span>
                    <Progress value={85} className="flex-1" />
                    <span className="text-xs">High</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Payment Verification</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs">Low</span>
                    <Progress value={70} className="flex-1" />
                    <span className="text-xs">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Effectiveness Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">97.3%</div>
                <p className="text-xs text-muted-foreground">Threats correctly identified</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.2s</div>
                <p className="text-xs text-muted-foreground">Average detection time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">False Positive Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2%</div>
                <p className="text-xs text-muted-foreground">Incorrect detections</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Threat Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hate Speech</span>
                  <div className="flex items-center gap-2">
                    <Progress value={23} className="w-20" />
                    <span className="text-sm text-muted-foreground">23%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spam</span>
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="w-20" />
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">NSFW Content</span>
                  <div className="flex items-center gap-2">
                    <Progress value={12} className="w-20" />
                    <span className="text-sm text-muted-foreground">12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Suspicious Payments</span>
                  <div className="flex items-center gap-2">
                    <Progress value={8} className="w-20" />
                    <span className="text-sm text-muted-foreground">8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Other</span>
                  <div className="flex items-center gap-2">
                    <Progress value={12} className="w-20" />
                    <span className="text-sm text-muted-foreground">12%</span>
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

export default AITrustSafety;