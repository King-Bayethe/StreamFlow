import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIClippingSystem from '@/components/AIClippingSystem';
import AICoStreamer from '@/components/AICoStreamer';
import AIAudienceInsights from '@/components/AIAudienceInsights';
import AITrustSafety from '@/components/AITrustSafety';
import AIDiscoveryEngine from '@/components/AIDiscoveryEngine';
import AILiveCaptions from '@/components/AILiveCaptions';
import AIAgentMarketplace from '@/components/AIAgentMarketplace';
import AIContentOptimizer from '@/components/AIContentOptimizer';

const CreatorAISuite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Suite
          </h1>
          <p className="text-muted-foreground mt-2">Leverage AI to enhance your streaming experience</p>
        </div>

        <Tabs defaultValue="clipping" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="clipping">Auto-Clipping</TabsTrigger>
            <TabsTrigger value="co-streamer">Co-Streamer</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="optimizer">Optimizer</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
            <TabsTrigger value="captions">Captions</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="clipping">
            <AIClippingSystem />
          </TabsContent>

          <TabsContent value="co-streamer">
            <AICoStreamer isActive={false} onToggle={() => {}} />
          </TabsContent>

          <TabsContent value="insights">
            <AIAudienceInsights />
          </TabsContent>

          <TabsContent value="optimizer">
            <AIContentOptimizer />
          </TabsContent>

          <TabsContent value="safety">
            <AITrustSafety />
          </TabsContent>

          <TabsContent value="discovery">
            <AIDiscoveryEngine />
          </TabsContent>

          <TabsContent value="captions">
            <AILiveCaptions />
          </TabsContent>

          <TabsContent value="marketplace">
            <AIAgentMarketplace />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorAISuite;