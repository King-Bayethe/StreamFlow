import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, DollarSign, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Play className="h-12 w-12 text-primary" />
          <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            StreamFlow
          </span>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">
          Monetized Live Streaming Platform
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Experience the future of live streaming with Super Chat, paid polls, and real-time viewer interactions.
        </p>

        <div className="grid grid-cols-3 gap-4 text-center mb-8">
          <div className="space-y-2">
            <Play className="h-6 w-6 text-primary mx-auto" />
            <p className="text-sm font-medium">Stream Live</p>
          </div>
          <div className="space-y-2">
            <DollarSign className="h-6 w-6 text-secondary mx-auto" />
            <p className="text-sm font-medium">Earn Money</p>
          </div>
          <div className="space-y-2">
            <Users className="h-6 w-6 text-accent mx-auto" />
            <p className="text-sm font-medium">Build Community</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link to="/auth">
            <Button size="lg" className="mr-4">
              Get Started
            </Button>
          </Link>
          <Link to="/watch">
            <Button size="lg" variant="outline">
              Watch Demo Stream
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
