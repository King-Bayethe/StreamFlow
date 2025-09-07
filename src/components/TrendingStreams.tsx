import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart, DollarSign, Clock } from "lucide-react";

const TrendingStreams = () => {
  const streams = [
    {
      id: 1,
      title: "Gaming & Chill Session",
      creator: "StreamerPro",
      viewers: 12500,
      earnings: 850,
      duration: "3h 24m",
      category: "Gaming",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
      isLive: true
    },
    {
      id: 2,
      title: "Art & Design Workshop",
      creator: "CreativeArt",
      viewers: 8200,
      earnings: 1200,
      duration: "2h 15m",
      category: "Creative",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
      isLive: true
    },
    {
      id: 3,
      title: "Cooking Masterclass",
      creator: "ChefMaster",
      viewers: 15800,
      earnings: 2100,
      duration: "1h 45m",
      category: "Lifestyle",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center",
      isLive: true
    },
    {
      id: 4,
      title: "Music Production Live",
      creator: "BeatMaker",
      viewers: 6700,
      earnings: 920,
      duration: "4h 12m",
      category: "Music",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
      isLive: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Trending Streams
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing content from top creators earning real money through premium interactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {streams.map((stream, index) => (
            <Card key={stream.id} className="group overflow-hidden hover-lift hover-glow border-0 card-gradient" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {stream.isLive && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold live-indicator">
                    LIVE
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                  {stream.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {stream.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {stream.title}
                </h3>
                <p className="text-muted-foreground mb-3">{stream.creator}</p>
                
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Eye className="w-4 h-4 mr-1" />
                    {stream.viewers.toLocaleString()}
                  </div>
                  <div className="flex items-center text-accent font-semibold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ${stream.earnings}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all" asChild>
                  <a href={`/watch/${stream.id}`}>Watch Now</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="premium" size="lg">
            View All Streams
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingStreams;