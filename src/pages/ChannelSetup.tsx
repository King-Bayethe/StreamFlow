import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Palette, Calendar, DollarSign, ArrowRight, ArrowLeft, 
  CheckCircle, Video, Users, TrendingUp, Play, Loader2 
} from 'lucide-react';

const ChannelSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, isCreator } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1: Channel Branding
  const [brandingColor, setBrandingColor] = useState('#6366f1');
  
  // Step 2: Content Categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Step 3: Streaming Schedule
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  
  // Step 4: Monetization Goals
  const [monetizationGoals, setMonetizationGoals] = useState<string[]>([]);

  const availableCategories = [
    'Gaming', 'Music', 'Art & Creative', 'Tech & Programming', 'Education',
    'Cooking', 'Fitness', 'Travel', 'Comedy', 'Talk Shows', 'Tutorials', 'Other'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const availableTimeSlots = [
    'Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Late Night (12AM-6AM)'
  ];

  const monetizationOptions = [
    'Viewer Donations', 'SuperChat', 'Sponsorships', 'Merchandise', 'Subscriptions', 'Affiliate Marketing'
  ];

  useEffect(() => {
    if (!user || !isCreator) {
      navigate('/register/creator');
    }
  }, [user, isCreator, navigate]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Update creator profile
      const profileData = {
        branding_color: brandingColor,
        content_categories: selectedCategories,
        streaming_schedule: {
          days: selectedDays,
          time_slots: timeSlots
        },
        monetization_goals: monetizationGoals,
        setup_completed: true,
        setup_step: 4
      };

      const { error: profileError } = await supabase
        .from('creator_profiles')
        .update(profileData)
        .eq('user_id', user?.id);

      if (profileError) {
        throw profileError;
      }

      // Update channel with setup data
      const channelData = {
        category: selectedCategories[0] || 'Other',
        tags: selectedCategories,
        channel_settings: {
          notifications_enabled: true,
          chat_enabled: true,
          subscriber_only_chat: false,
          mature_content: false,
          allow_clips: true,
          branding_color: brandingColor,
          streaming_schedule: {
            days: selectedDays,
            time_slots: timeSlots
          }
        }
      };

      const { error: channelError } = await supabase
        .from('channels')
        .update(channelData)
        .eq('creator_id', user?.id);

      if (channelError) {
        console.error('Channel update error:', channelError);
        // Don't throw here as profile was updated successfully
      }

      toast({
        title: "Channel Setup Complete! 🎉",
        description: "Your channel is ready to go. Welcome to StreamFlow!",
      });

      navigate('/creator-dashboard');
    } catch (error) {
      console.error('Setup completion error:', error);
      toast({
        title: "Setup Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const toggleTimeSlot = (slot: string) => {
    setTimeSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const toggleMonetization = (goal: string) => {
    setMonetizationGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const renderBrandingStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Channel Branding
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="brandingColor">Brand Color</Label>
          <div className="flex gap-4 items-center">
            <Input
              id="brandingColor"
              type="color"
              value={brandingColor}
              onChange={(e) => setBrandingColor(e.target.value)}
              className="w-20 h-10 p-1 border rounded"
            />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Choose a color that represents your channel. This will be used in your channel design and overlays.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border" style={{ backgroundColor: `${brandingColor}10` }}>
          <h4 className="font-medium mb-2" style={{ color: brandingColor }}>
            Preview: Your Channel Theme
          </h4>
          <p className="text-sm text-muted-foreground">
            This is how your brand color will look across your channel elements.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderCategoriesStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Content Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Select the categories that best describe your content (choose up to 5):
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableCategories.map((category) => (
            <div
              key={category}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                selectedCategories.includes(category)
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => toggleCategory(category)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category}</span>
                {selectedCategories.includes(category) && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Selected: {selectedCategories.length}/5
          </p>
          {selectedCategories.length > 5 && (
            <p className="text-sm text-destructive mt-1">
              Please select no more than 5 categories
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderScheduleStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Streaming Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base">Which days do you plan to stream?</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
            {daysOfWeek.map((day) => (
              <Badge
                key={day}
                variant={selectedDays.includes(day) ? "default" : "outline"}
                className="cursor-pointer justify-center py-2"
                onClick={() => toggleDay(day)}
              >
                {day.slice(0, 3)}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="text-base">What time slots work best for you?</Label>
          <div className="space-y-2 mt-3">
            {availableTimeSlots.map((slot) => (
              <div
                key={slot}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  timeSlots.includes(slot)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => toggleTimeSlot(slot)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{slot}</span>
                  {timeSlots.includes(slot) && (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderMonetizationStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Monetization Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Select the monetization methods you're interested in:
        </p>
        
        <div className="space-y-2">
          {monetizationOptions.map((option) => (
            <div
              key={option}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                monetizationGoals.includes(option)
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => toggleMonetization(option)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{option}</span>
                {monetizationGoals.includes(option) && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary/10 rounded-lg p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Ready to Launch!
          </h4>
          <p className="text-sm text-muted-foreground">
            You can always adjust these settings later in your Creator Dashboard.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Play className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StreamFlow
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Channel Setup</h1>
          <p className="text-muted-foreground">
            Let's configure your channel to get you started
          </p>
          
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStep} of 4
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {currentStep === 1 && renderBrandingStep()}
          {currentStep === 2 && renderCategoriesStep()}
          {currentStep === 3 && renderScheduleStep()}
          {currentStep === 4 && renderMonetizationStep()}
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {currentStep < 4 ? (
              <Button 
                onClick={handleNext}
                disabled={
                  (currentStep === 2 && selectedCategories.length === 0) ||
                  (currentStep === 2 && selectedCategories.length > 5)
                }
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Complete Setup <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelSetup;