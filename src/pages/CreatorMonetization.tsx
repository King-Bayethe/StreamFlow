import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SuperChatDashboard from '@/components/SuperChatDashboard';
import RevenueAnalytics from '@/components/RevenueAnalytics';
import { DollarSign } from "lucide-react";

const CreatorMonetization = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Monetization
          </h1>
          <p className="text-muted-foreground mt-2">Manage your earnings and revenue streams</p>
        </div>

        <div className="space-y-6">
          <RevenueAnalytics />
          <SuperChatDashboard streamId="mock-stream" />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Additional Revenue Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">More monetization features coming soon!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Including subscription tiers, merchandise integration, and advanced payment options.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatorMonetization;