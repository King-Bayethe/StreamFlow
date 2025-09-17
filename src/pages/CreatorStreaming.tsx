import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StreamingControls from '@/components/StreamingControls';
import StreamMetrics from '@/components/StreamMetrics';
import StreamRecordings from '@/components/StreamRecordings';
import OBSIntegrationGuide from '@/components/OBSIntegrationGuide';
import Simulcasting from '@/components/Simulcasting';
import UnifiedChat from '@/components/UnifiedChat';

const CreatorStreaming = () => {
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Streaming Controls
          </h1>
          <p className="text-muted-foreground mt-2">Manage your live streams and broadcasting</p>
        </div>

        <Tabs defaultValue="controls" className="space-y-6">
          <TabsList>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="simulcast">Simulcast</TabsTrigger>
            <TabsTrigger value="chat">Unified Chat</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="controls">
            <StreamingControls userId="mock-user-id" />
            <div className="mt-6">
              <OBSIntegrationGuide 
                rtmpUrl="rtmp://live.example.com/live" 
                streamKey="sk_live_12345abcdef67890" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="simulcast">
            <Simulcasting userId="mock-user-id" />
          </TabsContent>
          
          <TabsContent value="chat">
            <UnifiedChat 
              isSimulcasting={isLive} 
              activePlatforms={['youtube', 'twitch']} 
            />
          </TabsContent>
          
          <TabsContent value="metrics">
            <StreamMetrics 
              streamId="mock-stream-id" 
              isLive={isLive} 
            />
          </TabsContent>
          
          <TabsContent value="recordings">
            <StreamRecordings userId="mock-user-id" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorStreaming;