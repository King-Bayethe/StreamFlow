import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Video, Zap, TrendingUp, Play, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
}

const steps: OnboardingStep[] = [
  {
    id: 'role',
    title: 'Choose Your Role',
    description: 'What best describes how you plan to use StreamFlow?'
  },
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Let others know who you are'
  },
  {
    id: 'welcome',
    title: 'Welcome to StreamFlow',
    description: 'You\'re all set! Let\'s explore the platform'
  }
];

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { user, refreshUserRole } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'user' | 'creator' | null>(null);
  const [profile, setProfile] = useState({
    username: '',
    displayName: '',
    bio: '',
    avatarUrl: ''
  });

  const handleRoleSelection = (role: 'user' | 'creator') => {
    setSelectedRole(role);
  };

  const handleNextStep = async () => {
    if (currentStep === 0) {
      if (!selectedRole) {
        toast.error('Please select a role to continue');
        return;
      }
      setCurrentStep(1);
    } else if (currentStep === 1) {
      await handleProfileSubmit();
    } else {
      onComplete();
    }
  };

  const handleProfileSubmit = async () => {
    if (!profile.username.trim()) {
      toast.error('Username is required');
      return;
    }

    setLoading(true);
    try {
      // Check if username is available
      const { data: isAvailable } = await supabase.rpc('is_username_available', {
        _username: profile.username,
        _user_id: user?.id
      });

      if (!isAvailable) {
        toast.error('Username is already taken');
        setLoading(false);
        return;
      }

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          display_name: profile.displayName || profile.username,
          avatar_url: profile.avatarUrl
        })
        .eq('user_id', user?.id);

      if (profileError) throw profileError;

      // Update user profile with bio
      const { error: userProfileError } = await supabase
        .from('user_profiles')
        .update({
          bio: profile.bio
        })
        .eq('user_id', user?.id);

      if (userProfileError) throw userProfileError;

      // Update role and mark onboarding as complete
      const { error: roleError } = await supabase.rpc('update_user_role_from_onboarding', {
        _user_id: user?.id,
        _selected_role: selectedRole
      });

      if (roleError) throw roleError;

      await refreshUserRole();
      setCurrentStep(2);
      toast.success('Profile created successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Your Role</h2>
        <p className="text-muted-foreground">Select how you plan to use StreamFlow</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className={`cursor-pointer transition-all hover-lift ${selectedRole === 'user' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleRoleSelection('user')}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Viewer</CardTitle>
                <p className="text-sm text-muted-foreground">Watch and interact with streams</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Play className="h-4 w-4 text-green-600" />
                <span>Watch live streams</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-green-600" />
                <span>Join chat discussions</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-green-600" />
                <span>Send SuperChat messages</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover-lift ${selectedRole === 'creator' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleRoleSelection('creator')}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <Video className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle>Creator</CardTitle>
                <p className="text-sm text-muted-foreground">Stream and build your audience</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Video className="h-4 w-4 text-green-600" />
                <span>Create live streams</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>Monetize your content</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-green-600" />
                <span>Build your community</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProfileSetup = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
      </div>

      <div className="flex justify-center mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={profile.avatarUrl} alt="Profile" />
          <AvatarFallback className="text-lg">
            {profile.username.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            value={profile.username}
            onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Enter your username"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            value={profile.displayName}
            onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
            placeholder="How should others see your name?"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell us about yourself..."
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderWelcome = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
        <Zap className="h-10 w-10 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-4">Welcome to StreamFlow!</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Your {selectedRole === 'creator' ? 'creator' : 'viewer'} account is ready
        </p>
      </div>

      <div className="grid gap-4 max-w-md mx-auto">
        <Badge variant="outline" className="p-3">
          <Users className="h-4 w-4 mr-2" />
          Join our growing community
        </Badge>
        <Badge variant="outline" className="p-3">
          <Video className="h-4 w-4 mr-2" />
          {selectedRole === 'creator' ? 'Start streaming now' : 'Discover amazing content'}
        </Badge>
        <Badge variant="outline" className="p-3">
          <TrendingUp className="h-4 w-4 mr-2" />
          {selectedRole === 'creator' ? 'Grow your audience' : 'Support your favorite creators'}
        </Badge>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderRoleSelection();
      case 1:
        return renderProfileSetup();
      case 2:
        return renderWelcome();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="pb-8">
          {renderCurrentStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0 || loading}
            >
              Back
            </Button>
            
            <Button
              onClick={handleNextStep}
              disabled={loading || (currentStep === 0 && !selectedRole)}
              className="ml-auto"
            >
              {loading ? 'Saving...' : currentStep === 2 ? 'Get Started' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};