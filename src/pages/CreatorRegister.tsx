import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Play, ArrowLeft, Video, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CreatorRegister = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  
  // Step 1: Account Creation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  // Step 2: Creator Profile
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) return false;
    
    setCheckingUsername(true);
    const { data, error } = await supabase.rpc('is_username_available', { 
      _username: username 
    });
    setCheckingUsername(false);
    
    if (error) {
      console.error('Error checking username:', error);
      return false;
    }
    
    return data;
  };

  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check username availability
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      toast({
        title: "Username unavailable",
        description: "This username is already taken. Please choose another one.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
  };

  const handleCreatorRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Sign up the user
      const { error: signUpError } = await signUp(email, password, username);
      
      if (signUpError) {
        toast({
          title: "Registration failed",
          description: signUpError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Get the current user
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        throw new Error('User not found after registration');
      }

      // Create creator profile
      const profileData = {
        user_id: currentUser.id,
        username: username,
        display_name: displayName,
        bio: bio,
        setup_completed: false,
        setup_step: 0
      };

      const { error: profileError } = await supabase
        .from('creator_profiles')
        .insert(profileData);

      if (profileError) {
        console.error('Error creating creator profile:', profileError);
      }

      // Create channel record
      const channelData = {
        creator_id: currentUser.id,
        name: username,
        display_name: displayName,
        description: bio || `Welcome to ${displayName}'s channel!`,
        status: 'active'
      };

      const { error: channelError } = await supabase
        .from('channels')
        .insert(channelData);

      if (channelError) {
        console.error('Error creating channel:', channelError);
        toast({
          title: "Channel creation failed",
          description: "Your account was created but there was an issue setting up your channel.",
          variant: "destructive",
        });
      }

      // Update user role to creator FIRST
      const { error: roleError } = await supabase.rpc('update_user_role_from_onboarding', {
        _user_id: currentUser.id,
        _selected_role: 'creator'
      });

      if (roleError) {
        console.error('Error updating user role:', roleError);
        toast({
          title: "Role assignment failed",
          description: "There was an issue setting up your creator role.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome to StreamFlow!",
        description: "Your creator account has been created successfully.",
      });

      // Redirect to creator welcome page
      navigate('/creator-welcome');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const renderAccountCreation = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          Create Creator Account
        </CardTitle>
        <CardDescription>
          Join StreamFlow as a content creator and start building your channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAccountCreation} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Channel Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose your channel name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />
            {checkingUsername && <p className="text-sm text-muted-foreground">Checking availability...</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={checkingUsername}>
            Continue to Profile Setup
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link 
            to="/login" 
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  const renderProfileSetup = () => (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Creator Profile</CardTitle>
        <CardDescription>
          Tell your future audience about yourself and your content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreatorRegistration} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="How should viewers see your name?"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Channel Description</Label>
            <Textarea
              id="bio"
              placeholder="Describe your channel and the content you'll create..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {bio.length}/500 characters
            </p>
          </div>
          
          <div className="bg-secondary/10 rounded-lg p-4 space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              What's Next?
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span>Channel branding & setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-3 w-3" />
                <span>Streaming preferences</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-3 w-3" />
                <span>Monetization options</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Creator Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Play className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StreamFlow
            </span>
          </div>
          <h1 className="text-3xl font-bold">Become a Creator</h1>
          <p className="text-muted-foreground">
            Step {step} of 2 - {step === 1 ? 'Account Creation' : 'Profile Setup'}
          </p>
        </div>

        {step === 1 && renderAccountCreation()}
        {step === 2 && renderProfileSetup()}
        
        <div className="text-center text-sm text-muted-foreground">
          Want to join as a viewer instead?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Regular Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatorRegister;