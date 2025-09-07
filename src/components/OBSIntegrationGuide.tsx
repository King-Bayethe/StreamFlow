import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Settings, 
  Download, 
  Copy, 
  CheckCircle,
  Video,
  Mic,
  Cog,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OBSIntegrationGuideProps {
  rtmpUrl: string;
  streamKey: string;
}

const OBSIntegrationGuide: React.FC<OBSIntegrationGuideProps> = ({ 
  rtmpUrl, 
  streamKey 
}) => {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({
      title: "Copied",
      description: `${field} copied to clipboard`,
    });
  };

  const recommendedSettings = {
    video: {
      resolution: "1920x1080",
      fps: "30",
      downscaleFilter: "Bicubic",
    },
    audio: {
      sampleRate: "44.1 kHz",
      channels: "Stereo",
      bitrate: "128 kbps",
    },
    encoding: {
      encoder: "x264",
      rateControl: "CBR",
      bitrate: "2500",
      keyframe: "2",
      profile: "main",
      tune: "none",
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            OBS Studio Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Follow this guide to connect OBS Studio to your streaming platform and start broadcasting.
          </p>

          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="scenes">Scenes</TabsTrigger>
              <TabsTrigger value="troubleshoot">Help</TabsTrigger>
            </TabsList>

            {/* Setup Tab */}
            <TabsContent value="setup" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 1: Download OBS Studio</h3>
                <p className="text-muted-foreground">
                  Download the latest version of OBS Studio from the official website.
                </p>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download OBS Studio
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 2: Configure Stream Settings</h3>
                <p className="text-muted-foreground">
                  In OBS Studio, go to Settings → Stream and configure the following:
                </p>
                
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Service</p>
                        <p className="text-sm text-muted-foreground">Custom...</p>
                      </div>
                      <Badge variant="outline">Required</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">Server</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {rtmpUrl}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(rtmpUrl, 'RTMP URL')}
                      >
                        {copiedField === 'RTMP URL' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">Stream Key</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {streamKey.substring(0, 12)}...
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(streamKey, 'Stream Key')}
                      >
                        {copiedField === 'Stream Key' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 3: Start Streaming</h3>
                <p className="text-muted-foreground">
                  Once configured, click "Start Streaming" in OBS Studio to begin broadcasting.
                </p>
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">
                    Your stream will appear as "Live" in your dashboard once OBS connects.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Video Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Base Resolution</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.video.resolution}</p>
                      </div>
                      <div>
                        <p className="font-medium">Output Resolution</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.video.resolution}</p>
                      </div>
                      <div>
                        <p className="font-medium">FPS</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.video.fps}</p>
                      </div>
                      <div>
                        <p className="font-medium">Downscale Filter</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.video.downscaleFilter}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cog className="h-5 w-5" />
                      Output Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Encoder</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.encoding.encoder}</p>
                      </div>
                      <div>
                        <p className="font-medium">Rate Control</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.encoding.rateControl}</p>
                      </div>
                      <div>
                        <p className="font-medium">Bitrate</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.encoding.bitrate} kbps</p>
                      </div>
                      <div>
                        <p className="font-medium">Keyframe Interval</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.encoding.keyframe} seconds</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="h-5 w-5" />
                      Audio Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Sample Rate</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.audio.sampleRate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Channels</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.audio.channels}</p>
                      </div>
                      <div>
                        <p className="font-medium">Audio Bitrate</p>
                        <p className="text-sm text-muted-foreground">{recommendedSettings.audio.bitrate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Scenes Tab */}
            <TabsContent value="scenes" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recommended Scene Setup</h3>
                <p className="text-muted-foreground">
                  Create these basic scenes to get started with your stream.
                </p>
              </div>

              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🎮 Gaming Scene</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Game Capture Source</li>
                      <li>Webcam (Video Capture Device)</li>
                      <li>Microphone Audio Input</li>
                      <li>Desktop Audio</li>
                      <li>Overlay graphics/alerts</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">💬 Just Chatting Scene</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Webcam (fullscreen or large)</li>
                      <li>Background image or color</li>
                      <li>Microphone Audio Input</li>
                      <li>Chat overlay (optional)</li>
                      <li>Social media graphics</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🔴 Starting Soon / BRB Scene</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Static image or animated background</li>
                      <li>Text with stream schedule</li>
                      <li>Background music (low volume)</li>
                      <li>Social media links</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Troubleshooting Tab */}
            <TabsContent value="troubleshoot" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Common Issues & Solutions</h3>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Stream Not Starting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Verify RTMP URL and Stream Key are correct</li>
                      <li>Check your internet connection</li>
                      <li>Ensure no firewall is blocking OBS</li>
                      <li>Try restarting OBS Studio</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      Poor Stream Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Lower your bitrate (try 1500-2000 kbps)</li>
                      <li>Reduce output resolution to 720p</li>
                      <li>Close unnecessary applications</li>
                      <li>Use hardware encoding if available</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      High CPU Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Switch to hardware encoding (NVENC/AMF)</li>
                      <li>Lower CPU usage preset in encoder settings</li>
                      <li>Reduce number of sources in scenes</li>
                      <li>Upgrade your CPU or GPU</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Need More Help?</h4>
                <p className="text-sm text-blue-800">
                  Check the OBS Studio documentation or join our community Discord for live support.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OBSIntegrationGuide;