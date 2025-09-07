import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Megaphone, 
  Heart, 
  Star, 
  Gift, 
  Crown, 
  Zap,
  Settings,
  Eye,
  EyeOff,
  Play,
  Pause,
  Volume2,
  Palette,
  Type,
  Move,
  RotateCcw,
  Monitor
} from "lucide-react";

interface OverlayElement {
  id: string;
  type: "shoutout" | "follower" | "tip" | "subscriber" | "poll" | "giveaway";
  content: {
    title: string;
    message: string;
    username?: string;
    amount?: number;
    avatar?: string;
  };
  style: {
    position: { x: number; y: number };
    size: "small" | "medium" | "large";
    theme: "default" | "neon" | "minimal" | "gaming";
    animation: "fade" | "slide" | "bounce" | "glow";
    duration: number;
  };
  isVisible: boolean;
  isActive: boolean;
  timestamp: Date;
}

interface OverlayPreset {
  id: string;
  name: string;
  description: string;
  elements: Partial<OverlayElement>[];
}

const StreamOverlays = ({ isLive }: { isLive: boolean }) => {
  const [overlays, setOverlays] = useState<OverlayElement[]>([
    {
      id: "1",
      type: "shoutout",
      content: {
        title: "Shoutout",
        message: "Thanks for the amazing gameplay tips!",
        username: "GameMaster2024",
        avatar: "/placeholder.svg"
      },
      style: {
        position: { x: 20, y: 80 },
        size: "large",
        theme: "gaming",
        animation: "glow",
        duration: 5000
      },
      isVisible: false,
      isActive: true,
      timestamp: new Date()
    }
  ]);

  const [selectedOverlay, setSelectedOverlay] = useState<OverlayElement | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [newOverlay, setNewOverlay] = useState({
    type: "shoutout" as const,
    content: {
      title: "",
      message: "",
      username: "",
      amount: 0
    },
    style: {
      position: { x: 50, y: 50 },
      size: "medium" as const,
      theme: "default" as const,
      animation: "fade" as const,
      duration: 3000
    }
  });

  const presets: OverlayPreset[] = [
    {
      id: "minimal",
      name: "Minimal Setup",
      description: "Clean and simple overlays",
      elements: [
        {
          type: "follower",
          style: { 
            theme: "minimal", 
            animation: "fade", 
            size: "medium",
            position: { x: 50, y: 30 },
            duration: 3000
          }
        },
        {
          type: "tip",
          style: { 
            theme: "minimal", 
            animation: "slide", 
            size: "small",
            position: { x: 80, y: 70 },
            duration: 4000
          }
        }
      ]
    },
    {
      id: "gaming",
      name: "Gaming Pro",
      description: "High-energy gaming overlays",
      elements: [
        {
          type: "shoutout",
          style: { 
            theme: "gaming", 
            animation: "glow", 
            size: "large",
            position: { x: 30, y: 40 },
            duration: 5000
          }
        },
        {
          type: "subscriber",
          style: { 
            theme: "gaming", 
            animation: "bounce", 
            size: "medium",
            position: { x: 70, y: 60 },
            duration: 4000
          }
        }
      ]
    },
    {
      id: "neon",
      name: "Neon Vibes",
      description: "Bright and colorful overlays",
      elements: [
        {
          type: "follower",
          style: { 
            theme: "neon", 
            animation: "glow", 
            size: "medium",
            position: { x: 40, y: 50 },
            duration: 3500
          }
        },
        {
          type: "tip",
          style: { 
            theme: "neon", 
            animation: "bounce", 
            size: "large",
            position: { x: 60, y: 30 },
            duration: 4500
          }
        }
      ]
    }
  ];

  useEffect(() => {
    // Auto-hide overlays after their duration
    const interval = setInterval(() => {
      setOverlays(prev => 
        prev.map(overlay => {
          if (overlay.isVisible && overlay.timestamp) {
            const elapsed = Date.now() - overlay.timestamp.getTime();
            if (elapsed > overlay.style.duration) {
              return { ...overlay, isVisible: false };
            }
          }
          return overlay;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createOverlay = () => {
    const overlay: OverlayElement = {
      id: Date.now().toString(),
      type: newOverlay.type,
      content: newOverlay.content,
      style: newOverlay.style,
      isVisible: false,
      isActive: true,
      timestamp: new Date()
    };

    setOverlays(prev => [...prev, overlay]);
    resetForm();
  };

  const resetForm = () => {
    setNewOverlay({
      type: "shoutout",
      content: {
        title: "",
        message: "",
        username: "",
        amount: 0
      },
      style: {
        position: { x: 50, y: 50 },
        size: "medium",
        theme: "default",
        animation: "fade",
        duration: 3000
      }
    });
  };

  const triggerOverlay = (overlayId: string, customContent?: any) => {
    setOverlays(prev => 
      prev.map(overlay => 
        overlay.id === overlayId 
          ? { 
              ...overlay, 
              isVisible: true, 
              timestamp: new Date(),
              content: customContent ? { ...overlay.content, ...customContent } : overlay.content
            }
          : overlay
      )
    );
  };

  const hideOverlay = (overlayId: string) => {
    setOverlays(prev => 
      prev.map(overlay => 
        overlay.id === overlayId 
          ? { ...overlay, isVisible: false }
          : overlay
      )
    );
  };

  const deleteOverlay = (overlayId: string) => {
    setOverlays(prev => prev.filter(overlay => overlay.id !== overlayId));
  };

  const updateOverlayPosition = (overlayId: string, position: { x: number; y: number }) => {
    setOverlays(prev => 
      prev.map(overlay => 
        overlay.id === overlayId 
          ? { ...overlay, style: { ...overlay.style, position } }
          : overlay
      )
    );
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "neon":
        return "bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg shadow-pink-500/50";
      case "minimal":
        return "bg-white/90 text-gray-900 shadow-md border";
      case "gaming":
        return "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50";
      default:
        return "bg-primary text-primary-foreground shadow-lg";
    }
  };

  const getAnimationClasses = (animation: string) => {
    switch (animation) {
      case "slide":
        return "animate-slide-in-right";
      case "bounce":
        return "animate-bounce";
      case "glow":
        return "animate-pulse";
      default:
        return "animate-fade-in";
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return "text-sm p-2";
      case "large":
        return "text-lg p-4";
      default:
        return "text-base p-3";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Stream Overlays
          </h3>
          <p className="text-muted-foreground">Create and manage shoutout overlays and alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? "Done Editing" : "Edit Mode"}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      {showPreview && (
        <Card className="relative h-64 bg-gradient-to-br from-muted/30 to-background overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Stream Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="relative h-full">
            {overlays.filter(o => o.isVisible).map((overlay) => (
              <div
                key={overlay.id}
                className={`absolute ${getThemeClasses(overlay.style.theme)} ${getAnimationClasses(overlay.style.animation)} ${getSizeClasses(overlay.style.size)} rounded-lg max-w-xs`}
                style={{
                  left: `${overlay.style.position.x}%`,
                  top: `${overlay.style.position.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="flex items-center gap-2">
                  {overlay.content.avatar && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={overlay.content.avatar} />
                      <AvatarFallback>{overlay.content.username?.[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    {overlay.content.title && (
                      <div className="font-semibold text-sm">{overlay.content.title}</div>
                    )}
                    {overlay.content.username && (
                      <div className="font-medium">{overlay.content.username}</div>
                    )}
                    {overlay.content.message && (
                      <div className="text-sm opacity-90">{overlay.content.message}</div>
                    )}
                    {overlay.content.amount && (
                      <div className="font-bold">${overlay.content.amount}</div>
                    )}
                  </div>
                  {overlay.type === "tip" && <Gift className="w-5 h-5" />}
                  {overlay.type === "follower" && <Heart className="w-5 h-5" />}
                  {overlay.type === "subscriber" && <Crown className="w-5 h-5" />}
                  {overlay.type === "shoutout" && <Megaphone className="w-5 h-5" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={() => triggerOverlay("1", {
            title: "New Follower!",
            username: "NewViewer123",
            message: "Thanks for following!"
          })}
          className="h-20 flex flex-col items-center justify-center"
          disabled={!isLive}
        >
          <Heart className="w-6 h-6 mb-1" />
          Test Follower
        </Button>
        <Button
          onClick={() => triggerOverlay("1", {
            title: "Tip Received!",
            username: "GenerousFan",
            message: "Keep up the great content!",
            amount: 25
          })}
          className="h-20 flex flex-col items-center justify-center"
          disabled={!isLive}
        >
          <Gift className="w-6 h-6 mb-1" />
          Test Tip
        </Button>
        <Button
          onClick={() => triggerOverlay("1", {
            title: "Shoutout Time!",
            username: "AmazingCreator",
            message: "Check out this awesome streamer!"
          })}
          className="h-20 flex flex-col items-center justify-center"
          disabled={!isLive}
        >
          <Megaphone className="w-6 h-6 mb-1" />
          Test Shoutout
        </Button>
        <Button
          onClick={() => triggerOverlay("1", {
            title: "New Subscriber!",
            username: "LoyalViewer",
            message: "Thanks for subscribing!"
          })}
          className="h-20 flex flex-col items-center justify-center"
          disabled={!isLive}
        >
          <Crown className="w-6 h-6 mb-1" />
          Test Subscribe
        </Button>
      </div>

      {/* Create New Overlay */}
      <Card>
        <CardHeader>
          <CardTitle>Create Custom Overlay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Overlay Type</Label>
              <Select
                value={newOverlay.type}
                onValueChange={(value) => setNewOverlay(prev => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shoutout">Shoutout</SelectItem>
                  <SelectItem value="follower">New Follower</SelectItem>
                  <SelectItem value="tip">Tip Alert</SelectItem>
                  <SelectItem value="subscriber">New Subscriber</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={newOverlay.style.theme}
                onValueChange={(value) => setNewOverlay(prev => ({ 
                  ...prev, 
                  style: { ...prev.style, theme: value as any }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newOverlay.content.title}
                onChange={(e) => setNewOverlay(prev => ({
                  ...prev,
                  content: { ...prev.content, title: e.target.value }
                }))}
                placeholder="e.g., New Follower!"
              />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={newOverlay.content.username}
                onChange={(e) => setNewOverlay(prev => ({
                  ...prev,
                  content: { ...prev.content, username: e.target.value }
                }))}
                placeholder="e.g., ViewerName"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={newOverlay.content.message}
              onChange={(e) => setNewOverlay(prev => ({
                ...prev,
                content: { ...prev.content, message: e.target.value }
              }))}
              placeholder="Custom message for the overlay..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Size</Label>
              <Select
                value={newOverlay.style.size}
                onValueChange={(value) => setNewOverlay(prev => ({ 
                  ...prev, 
                  style: { ...prev.style, size: value as any }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Animation</Label>
              <Select
                value={newOverlay.style.animation}
                onValueChange={(value) => setNewOverlay(prev => ({ 
                  ...prev, 
                  style: { ...prev.style, animation: value as any }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                  <SelectItem value="bounce">Bounce</SelectItem>
                  <SelectItem value="glow">Glow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (ms)</Label>
              <Input
                type="number"
                value={newOverlay.style.duration}
                onChange={(e) => setNewOverlay(prev => ({ 
                  ...prev, 
                  style: { ...prev.style, duration: parseInt(e.target.value) || 3000 }
                }))}
                min="1000"
                max="10000"
                step="500"
              />
            </div>
          </div>

          <Button onClick={createOverlay} className="w-full">
            Create Overlay
          </Button>
        </CardContent>
      </Card>

      {/* Preset Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Preset Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {presets.map((preset) => (
              <div key={preset.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{preset.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                <Button variant="outline" className="w-full">
                  Apply Preset
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overlay Management */}
      <Card>
        <CardHeader>
          <CardTitle>Active Overlays</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {overlays.map((overlay) => (
              <div key={overlay.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    {overlay.type === "shoutout" && <Megaphone className="w-5 h-5" />}
                    {overlay.type === "follower" && <Heart className="w-5 h-5" />}
                    {overlay.type === "tip" && <Gift className="w-5 h-5" />}
                    {overlay.type === "subscriber" && <Crown className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-medium">{overlay.content.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {overlay.style.theme} • {overlay.style.size} • {overlay.style.animation}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={overlay.isVisible ? "default" : "secondary"}>
                    {overlay.isVisible ? "Visible" : "Hidden"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => triggerOverlay(overlay.id)}
                    disabled={!isLive}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => hideOverlay(overlay.id)}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamOverlays;