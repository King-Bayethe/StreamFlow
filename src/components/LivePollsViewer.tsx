import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Vote,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Timer
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PollOption {
  text: string;
  votes: number;
  revenue: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  min_payment_cents: number;
  total_votes: number;
  total_revenue_cents: number;
  ends_at?: string;
  created_at: string;
  creator_id: string;
}

interface LivePollsViewerProps {
  streamId: string;
  className?: string;
}

const LivePollsViewer = ({ streamId, className }: LivePollsViewerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [voteAmounts, setVoteAmounts] = useState<Record<string, string>>({});
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({});

  // Subscribe to real-time poll updates
  useEffect(() => {
    const channel = supabase
      .channel(`stream-polls-${streamId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'polls',
          filter: `stream_id=eq.${streamId}`
        },
        () => {
          loadActivePolls();
        }
      )
      .subscribe();

    // Load active polls
    loadActivePolls();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [streamId]);

  const loadActivePolls = async () => {
    try {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('stream_id', streamId)
        .or('ends_at.is.null,ends_at.gt.now()')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Poll interface
      const transformedPolls = (data || []).map(poll => ({
        id: poll.id,
        question: poll.question || '',
        options: Array.isArray(poll.options) ? (poll.options as unknown as PollOption[]) : [],
        min_payment_cents: poll.min_payment_cents || 0,
        total_votes: poll.total_votes || 0,
        total_revenue_cents: poll.total_revenue_cents || 0,
        ends_at: poll.ends_at || undefined,
        created_at: poll.created_at,
        creator_id: poll.creator_id || ''
      }));
      
      setActivePolls(transformedPolls);
    } catch (error) {
      console.error('Error loading polls:', error);
    }
  };

  const handleVote = async (pollId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to vote in polls",
        variant: "destructive",
      });
      return;
    }

    const poll = activePolls.find(p => p.id === pollId);
    const selectedOption = selectedOptions[pollId];
    const voteAmount = parseFloat(voteAmounts[pollId] || '0');

    if (!poll || selectedOption === undefined) {
      toast({
        title: "Error",
        description: "Please select an option",
        variant: "destructive",
      });
      return;
    }

    const minAmount = poll.min_payment_cents / 100;
    if (voteAmount < minAmount) {
      toast({
        title: "Insufficient amount",
        description: `Minimum vote amount is $${minAmount.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }

    setVotingStates(prev => ({ ...prev, [pollId]: true }));

    try {
      // Submit vote
      const { error } = await supabase
        .from('poll_votes')
        .insert({
          poll_id: pollId,
          user_id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous',
          option_index: selectedOption,
          amount_cents: Math.round(voteAmount * 100)
        });

      if (error) throw error;

      toast({
        title: "Vote submitted!",
        description: `Your $${voteAmount.toFixed(2)} vote has been recorded`,
      });

      // Reset form
      setSelectedOptions(prev => ({ ...prev, [pollId]: undefined }));
      setVoteAmounts(prev => ({ ...prev, [pollId]: '' }));

      // Refresh polls to show updated results
      loadActivePolls();

    } catch (error: any) {
      toast({
        title: "Vote failed",
        description: error.message || "Failed to submit vote",
        variant: "destructive",
      });
    } finally {
      setVotingStates(prev => ({ ...prev, [pollId]: false }));
    }
  };

  const getTimeRemaining = (endsAt?: string) => {
    if (!endsAt) return null;
    
    const now = new Date();
    const end = new Date(endsAt);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isPollEnded = (endsAt?: string) => {
    if (!endsAt) return false;
    return new Date(endsAt) <= new Date();
  };

  if (activePolls.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center text-muted-foreground">
          <Vote className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No active polls</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {activePolls.map((poll) => {
        const timeRemaining = getTimeRemaining(poll.ends_at);
        const ended = isPollEnded(poll.ends_at);
        const selectedOption = selectedOptions[poll.id];
        const voteAmount = voteAmounts[poll.id] || '';
        const isVoting = votingStates[poll.id];
        const minAmount = poll.min_payment_cents / 100;

        return (
          <Card key={poll.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{poll.question}</CardTitle>
                {poll.ends_at && (
                  <Badge variant={ended ? "destructive" : "secondary"} className="flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    {timeRemaining}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {poll.total_votes} votes
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ${(poll.total_revenue_cents / 100).toFixed(2)} raised
                </div>
                {poll.min_payment_cents > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Min: ${minAmount.toFixed(2)}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Poll Options */}
              <div className="space-y-3">
                {poll.options.map((option, index) => {
                  const percentage = poll.total_votes > 0 ? (option.votes / poll.total_votes) * 100 : 0;
                  const isSelected = selectedOption === index;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div 
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                        } ${ended ? 'cursor-not-allowed opacity-50' : ''}`}
                        onClick={() => {
                          if (!ended) {
                            setSelectedOptions(prev => ({ 
                              ...prev, 
                              [poll.id]: isSelected ? undefined : index 
                            }));
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{option.text}</span>
                          <div className="flex items-center gap-2">
                            {isSelected && !ended && <CheckCircle className="h-4 w-4 text-primary" />}
                            <Badge variant="outline">
                              {option.votes} votes
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{percentage.toFixed(1)}%</span>
                            <span>${(option.revenue / 100).toFixed(2)} raised</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Voting Controls */}
              {!ended && user && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    {poll.min_payment_cents > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Vote Amount (Min: ${minAmount.toFixed(2)})
                        </label>
                        <Input
                          type="number"
                          min={minAmount}
                          step="0.01"
                          placeholder={`$${minAmount.toFixed(2)}`}
                          value={voteAmount}
                          onChange={(e) => setVoteAmounts(prev => ({
                            ...prev,
                            [poll.id]: e.target.value
                          }))}
                        />
                      </div>
                    )}
                    
                    <Button
                      onClick={() => handleVote(poll.id)}
                      disabled={
                        isVoting ||
                        selectedOption === undefined ||
                        (poll.min_payment_cents > 0 && parseFloat(voteAmount) < minAmount)
                      }
                      className="w-full"
                    >
                      {isVoting ? (
                        "Submitting Vote..."
                      ) : poll.min_payment_cents > 0 ? (
                        `Vote with $${parseFloat(voteAmount || '0').toFixed(2)}`
                      ) : (
                        "Vote"
                      )}
                    </Button>
                  </div>
                </>
              )}

              {!user && !ended && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">Sign in to participate in polls</p>
                </div>
              )}

              {ended && (
                <div className="text-center py-2">
                  <Badge variant="secondary">Poll Ended</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LivePollsViewer;