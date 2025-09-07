import { Button } from "@/components/ui/button";
import { Play, Users, DollarSign } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner} 
          alt="Live streaming platform background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/70 to-accent/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stream Live,
            <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent"> Earn More</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Connect with your audience through premium live streaming and monetize every interaction with paid chat features.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12 animate-slide-up">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">500K+</span>
              </div>
              <p className="text-white/80">Active Creators</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Play className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">10M+</span>
              </div>
              <p className="text-white/80">Hours Streamed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">$50M+</span>
              </div>
              <p className="text-white/80">Creator Earnings</p>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
              <a href="/dashboard">
                <Play className="w-5 h-5 mr-2" />
                Start Streaming
              </a>
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-4" asChild>
              <a href="/browse">
                <Users className="w-5 h-5 mr-2" />
                Browse Streams
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-accent/20 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-secondary/20 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;