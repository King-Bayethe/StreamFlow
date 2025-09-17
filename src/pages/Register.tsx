import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Play, Users, DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  
  // Step 1: Account Creation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  // Step 2: Role Selection
  const [selectedRole, setSelectedRole] = useState<'user' | 'creator'>('user');
  
  // Step 3: Profile Completion
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

  const handleRoleSelection = () => {
    setStep(3);
  };

  const handleProfileCompletion = async (e: React.FormEvent) => {
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

      // Create profile based on selected role
      const profileData = {
        user_id: (await supabase.auth.getUser()).data.user?.id,
        username: username,
        display_name: displayName,
        bio: bio
      };

      if (selectedRole === 'creator') {
        const { error: profileError } = await supabase
          .from('creator_profiles')
          .insert(profileData);

        if (profileError) {
          console.error('Error creating creator profile:', profileError);
        }
      } else {
        const { error: profileError } = await supabase
          .from('viewer_profiles')
          .insert(profileData);

        if (profileError) {
          console.error('Error creating viewer profile:', profileError);
        }
      }

      // Update user role
      await supabase.rpc('update_user_role_from_onboarding', {
        _user_id: (await supabase.auth.getUser()).data.user?.id,
        _selected_role: selectedRole
      });

      toast({
        title: "Welcome to StreamFlow!",
        description: "Your account has been created successfully.",
      });

      navigate('/welcome');
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
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Start your StreamFlow journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAccountCreation} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a unique username"
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full" disabled={checkingUsername}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
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

  const renderRoleSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Role</CardTitle>
        <CardDescription>
          How do you plan to use StreamFlow?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedRole === 'user' 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedRole('user')}
          >
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Viewer</h3>
                <p className="text-sm text-muted-foreground">Watch streams and interact with creators</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedRole === 'creator' 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedRole('creator')}
          >
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-secondary" />
              <div>
                <h3 className="font-semibold">Creator</h3>
                <p className="text-sm text-muted-foreground">Stream content and monetize your audience</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleRoleSelection}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderProfileCompletion = () => (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Tell us a bit about yourself
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileCompletion} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="How should others see your name?"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio (Optional)</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Registration
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
          <h1 className="text-3xl font-bold">Join StreamFlow</h1>
          <p className="text-muted-foreground">
            Step {step} of 3 - {step === 1 ? 'Account' : step === 2 ? 'Role' : 'Profile'}
          </p>
        </div>

        {step === 1 && renderAccountCreation()}
        {step === 2 && renderRoleSelection()}
        {step === 3 && renderProfileCompletion()}
      </div>
    </div>
  );
};

export default Register;