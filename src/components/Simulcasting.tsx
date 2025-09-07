import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Radio, 
  Youtube, 
  Twitch as TwitchIcon, 
  Settings, 
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Users,
  MessageSquare,
  Eye,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  isConnected: boolean;
  isStreaming: boolean;
  streamKey?: string;
  rtmpUrl?: string;
  viewerCount?: number;
  status: 'connected' | 'disconnected' | 'error' | 'streaming';
  lastSync?: string;
}

interface SimulcastingProps {
  userId: string;
}

const Simulcasting: React.FC<SimulcastingProps> = ({ userId }) => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'youtube',
      name: 'YouTube Live',
      icon: <Youtube className="h-5 w-5" />,
      isConnected: true,
      isStreaming: false,
      streamKey: 'yt_live_key_12345',
      rtmpUrl: 'rtmp://a.rtmp.youtube.com/live2',
      viewerCount: 0,
      status: 'connected',
      lastSync: new Date().toISOString()
    },
    {
      id: 'twitch',
      name: 'Twitch',
      icon: <TwitchIcon className="h-5 w-5" />,
      isConnected: true,
      isStreaming: false,
      streamKey: 'live_67890_abcdef',
      rtmpUrl: 'rtmp://live.twitch.tv/live',
      viewerCount: 0,
      status: 'connected',
      lastSync: new Date().toISOString()
    },
    {
      id: 'rumble',
      name: 'Rumble',
      icon: <Radio className="h-5 w-5" />,
      isConnected: false,
      isStreaming: false,
      status: 'disconnected'
    },
    {
      id: 'facebook',
      name: 'Facebook Live',
      icon: <Activity className="h-5 w-5" />,
      isConnected: false,
      isStreaming: false,
      status: 'disconnected'
    }
  ]);

  const [isSimulcasting, setIsSimulcasting] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['youtube', 'twitch']);
  const [showAddPlatform, setShowAddPlatform] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'streaming': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'streaming': return <Radio className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const togglePlatformConnection = async (platformId: string) => {
    setPlatforms(prev => prev.map(platform => {
      if (platform.id === platformId) {
        const newStatus = platform.isConnected ? 'disconnected' : 'connected';
        return {
          ...platform,
          isConnected: !platform.isConnected,
          status: newStatus,
          lastSync: new Date().toISOString()
        };
      }
      return platform;
    }));

    toast({
      title: "Platform Updated",
      description: `${platforms.find(p => p.id === platformId)?.name} ${platforms.find(p => p.id === platformId)?.isConnected ? 'disconnected' : 'connected'}`,
    });
  };

  const startSimulcast = async () => {
    const connectedPlatforms = platforms.filter(p => 
      p.isConnected && selectedPlatforms.includes(p.id)
    );

    if (connectedPlatforms.length === 0) {
      toast({
        title: "No Platforms Selected",
        description: "Please connect and select at least one platform to start simulcasting",
        variant: "destructive",
      });
      return;
    }

    setIsSimulcasting(true);
    
    // Update platform streaming status
    setPlatforms(prev => prev.map(platform => {
      if (selectedPlatforms.includes(platform.id) && platform.isConnected) {
        return {
          ...platform,
          isStreaming: true,
          status: 'streaming',
          viewerCount: Math.floor(Math.random() * 100) + 10
        };
      }
      return platform;
    }));

    toast({
      title: "Simulcast Started",
      description: `Now streaming to ${connectedPlatforms.length} platform(s)`,
    });
  };

  const stopSimulcast = async () => {
    setIsSimulcasting(false);
    
    setPlatforms(prev => prev.map(platform => ({
      ...platform,
      isStreaming: false,
      status: platform.isConnected ? 'connected' : 'disconnected',
      viewerCount: 0
    })));

    toast({
      title: "Simulcast Stopped",
      description: "Streaming has been stopped on all platforms",
    });
  };

  const togglePlatformSelection = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  // Simulate viewer count updates
  useEffect(() => {
    if (isSimulcasting) {
      const interval = setInterval(() => {
        setPlatforms(prev => prev.map(platform => {
          if (platform.isStreaming) {
            return {
              ...platform,
              viewerCount: Math.max(0, (platform.viewerCount || 0) + Math.floor(Math.random() * 20) - 10)
            };
          }
          return platform;
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSimulcasting]);

  const connectedCount = platforms.filter(p => p.isConnected).length;
  const streamingCount = platforms.filter(p => p.isStreaming).length;
  const totalViewers = platforms.reduce((sum, p) => sum + (p.viewerCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected Platforms</p>
                <p className="text-2xl font-bold">{connectedCount}</p>
              </div>
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Streams</p>
                <p className="text-2xl font-bold">{streamingCount}</p>
              </div>
              <Radio className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Viewers</p>
                <p className="text-2xl font-bold">{totalViewers.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-2xl font-bold">{isSimulcasting ? 'LIVE' : 'OFFLINE'}</p>
              </div>
              <div className={`h-8 w-8 rounded-full ${isSimulcasting ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Simulcast Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Platform Selection */}
          <div>
            <Label className="text-base font-semibold mb-4 block">Select Platforms to Stream</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <Card key={platform.id} className={`relative ${selectedPlatforms.includes(platform.id) && platform.isConnected ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {platform.icon}
                        <div>
                          <h4 className="font-semibold">{platform.name}</h4>
                          {platform.isStreaming && (
                            <p className="text-sm text-muted-foreground">
                              {platform.viewerCount?.toLocaleString()} viewers
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(platform.status)} text-white flex items-center gap-1`}>
                          {getStatusIcon(platform.status)}
                          {platform.status.toUpperCase()}
                        </Badge>
                        
                        {platform.isConnected && (
                          <Switch
                            checked={selectedPlatforms.includes(platform.id)}
                            onCheckedChange={() => togglePlatformSelection(platform.id)}
                            disabled={isSimulcasting}
                          />
                        )}
                      </div>
                    </div>

                    {platform.isConnected && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-muted-foreground">
                          <p>RTMP: {platform.rtmpUrl}</p>
                          <p>Key: {platform.streamKey?.substring(0, 12)}...</p>
                        </div>
                      </div>
                    )}

                    {!platform.isConnected && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => togglePlatformConnection(platform.id)}
                      >
                        Connect Platform
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Stream Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {isSimulcasting ? 'Live on Multiple Platforms' : 'Ready to Simulcast'}
              </h3>
              <p className="text-muted-foreground">
                {isSimulcasting 
                  ? `Currently streaming to ${streamingCount} platform(s)`
                  : `${selectedPlatforms.filter(id => platforms.find(p => p.id === id)?.isConnected).length} platform(s) selected`
                }
              </p>
            </div>
            
            <div className="flex gap-3">
              {isSimulcasting ? (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={stopSimulcast}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Stop Simulcast
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={startSimulcast}
                  disabled={selectedPlatforms.filter(id => platforms.find(p => p.id === id)?.isConnected).length === 0}
                >
                  <Radio className="h-4 w-4 mr-2" />
                  Start Simulcast
                </Button>
              )}
            </div>
          </div>

          {isSimulcasting && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <Radio className="h-5 w-5 animate-pulse" />
                <span className="font-semibold">Live Across Platforms</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your stream is being broadcast to {streamingCount} platform(s) simultaneously.
                Manage all conversations from the unified chat below.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Platform Management */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="connected" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="connected">Connected Platforms</TabsTrigger>
              <TabsTrigger value="available">Available Platforms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connected" className="space-y-4">
              {platforms.filter(p => p.isConnected).map((platform) => (
                <Card key={platform.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {platform.icon}
                        <div>
                          <h4 className="font-semibold">{platform.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last synced: {new Date(platform.lastSync!).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => togglePlatformConnection(platform.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {platforms.filter(p => p.isConnected).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No platforms connected yet.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available" className="space-y-4">
              {platforms.filter(p => !p.isConnected).map((platform) => (
                <Card key={platform.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {platform.icon}
                        <div>
                          <h4 className="font-semibold">{platform.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Connect to simulcast to this platform
                          </p>
                        </div>
                      </div>
                      
                      <Button onClick={() => togglePlatformConnection(platform.id)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulcasting;