import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatorPollManager from '@/components/CreatorPollManager';
import QASession from '@/components/QASession';
import Giveaways from '@/components/Giveaways';
import LoyaltyBadges from '@/components/LoyaltyBadges';
import StreamOverlays from '@/components/StreamOverlays';
import ViewerGamification from '@/components/ViewerGamification';

const CreatorEngagement = () => {
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Community Engagement
          </h1>
          <p className="text-muted-foreground mt-2">Build and interact with your community</p>
        </div>

        <Tabs defaultValue="polls" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="polls">Polls</TabsTrigger>
            <TabsTrigger value="qa">Q&A</TabsTrigger>
            <TabsTrigger value="giveaways">Giveaways</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="overlays">Overlays</TabsTrigger>
            <TabsTrigger value="gamification">Gamification</TabsTrigger>
          </TabsList>

          <TabsContent value="polls">
            <CreatorPollManager streamId="mock-stream" isLive={isLive} />
          </TabsContent>

          <TabsContent value="qa">
            <QASession isLive={isLive} />
          </TabsContent>

          <TabsContent value="giveaways">
            <Giveaways isLive={isLive} />
          </TabsContent>

          <TabsContent value="badges">
            <LoyaltyBadges />
          </TabsContent>

          <TabsContent value="overlays">
            <StreamOverlays isLive={isLive} />
          </TabsContent>

          <TabsContent value="gamification">
            <ViewerGamification />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorEngagement;