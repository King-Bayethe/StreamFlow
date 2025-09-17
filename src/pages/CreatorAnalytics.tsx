import Analytics from '@/components/Analytics';

const CreatorAnalytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="text-muted-foreground mt-2">Track your performance and audience insights</p>
        </div>
        
        <Analytics />
      </div>
    </div>
  );
};

export default CreatorAnalytics;