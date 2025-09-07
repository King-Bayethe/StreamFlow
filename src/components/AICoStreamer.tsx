import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Mic, 
  MicOff, 
  Bot, 
  MessageSquare, 
  Volume2, 
  VolumeX,
  Settings,
  Zap,
  Brain,
  Play,
  Pause,
  Activity
} from "lucide-react";

interface AICoStreamerProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

const AICoStreamer = ({ isActive, onToggle }: AICoStreamerProps) => {
  const [voice, setVoice] = useState<string>("alloy");
  const [personality, setPersonality] = useState<string>("friendly");
  const [interactionMode, setInteractionMode] = useState<string>("proactive");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [recentActions, setRecentActions] = useState<Array<{
    id: string;
    type: string;
    content: string;
    timestamp: Date;
  }>>([]);

  const voices = [
    { id: "alloy", name: "Alloy", description: "Neutral and clear" },
    { id: "echo", name: "Echo", description: "Warm and engaging" },
    { id: "fable", name: "Fable", description: "Expressive and lively" },
    { id: "onyx", name: "Onyx", description: "Deep and authoritative" },
    { id: "nova", name: "Nova", description: "Bright and energetic" },
    { id: "shimmer", name: "Shimmer", description: "Gentle and soothing" }
  ];

  const personalities = [
    { id: "friendly", name: "Friendly", description: "Warm and welcoming" },
    { id: "professional", name: "Professional", description: "Formal and informative" },
    { id: "energetic", name: "Energetic", description: "High-energy and exciting" },
    { id: "calm", name: "Calm", description: "Peaceful and relaxed" },
    { id: "humorous", name: "Humorous", description: "Funny and entertaining" }
  ];

  const interactionModes = [
    { id: "proactive", name: "Proactive", description: "Actively engages viewers" },
    { id: "reactive", name: "Reactive", description: "Responds to chat only" },
    { id: "scheduled", name: "Scheduled", description: "Speaks at set intervals" }
  ];

  // Simulate AI activity
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const actions = [
        { type: "chat_response", content: "Answered viewer question about stream schedule" },
        { type: "paid_message", content: "Read paid message from @viewer123" },
        { type: "dead_air", content: "Filled 30 seconds of silence with game commentary" },
        { type: "faq", content: "Automatically answered 'What's your setup?' question" },
        { type: "engagement", content: "Encouraged viewers to follow and subscribe" }
      ];

      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setRecentActions(prev => [
        {
          id: Date.now().toString(),
          ...randomAction,
          timestamp: new Date()
        },
        ...prev.slice(0, 9)
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Co-Streamer
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="ai-toggle">Active</Label>
            <Switch
              id="ai-toggle"
              checked={isActive}
              onCheckedChange={onToggle}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isActive ? (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <Activity className="h-4 w-4 text-green-600 animate-pulse" />
              <span className="text-sm text-green-700 dark:text-green-300">
                AI Co-Streamer is active and monitoring your stream
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Bot className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click the toggle to activate your AI co-streamer
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Voice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Voice Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Voice Type</Label>
              <div className="grid gap-2 mt-2">
                {voices.map((v) => (
                  <div
                    key={v.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      voice === v.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setVoice(v.id)}
                  >
                    <div className="font-medium">{v.name}</div>
                    <div className="text-sm text-muted-foreground">{v.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personality Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Personality
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Personality Type</Label>
              <div className="grid gap-2 mt-2">
                {personalities.map((p) => (
                  <div
                    key={p.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      personality === p.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setPersonality(p.id)}
                  >
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interaction Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Interaction Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Interaction Mode</Label>
            <div className="flex gap-2 mt-2">
              {interactionModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={interactionMode === mode.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInteractionMode(mode.id)}
                >
                  {mode.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="custom-prompt" className="text-sm font-medium">
              Custom Instructions
            </Label>
            <Textarea
              id="custom-prompt"
              placeholder="Add custom instructions for your AI co-streamer..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Recent AI Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            {recentActions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                {isActive 
                  ? "Waiting for activity..." 
                  : "Activate AI co-streamer to see activity"
                }
              </div>
            ) : (
              <div className="space-y-3">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="p-1 bg-primary/10 rounded">
                      {action.type === "chat_response" && <MessageSquare className="h-3 w-3" />}
                      {action.type === "paid_message" && <Volume2 className="h-3 w-3" />}
                      {action.type === "dead_air" && <Mic className="h-3 w-3" />}
                      {action.type === "faq" && <Brain className="h-3 w-3" />}
                      {action.type === "engagement" && <Zap className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{action.content}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICoStreamer;