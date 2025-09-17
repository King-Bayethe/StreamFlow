import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Vote, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
  ends_at: string;
  creator_id: string;
}

interface PaidPollModalProps {
  isOpen: boolean;
  onClose: () => void;
  poll: Poll | null;
}

const PaidPollModal = ({ isOpen, onClose, poll }: PaidPollModalProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  if (!poll) return null;

  const minAmount = poll.min_payment_cents / 100;
  const voteAmount = parseFloat(amount) || minAmount;

  const handleVote = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to vote",
        variant: "destructive",
      });
      return;
    }

    if (selectedOption === null) {
      toast({
        title: "Error",
        description: "Please select an option",
        variant: "destructive",
      });
      return;
    }

    if (voteAmount < minAmount) {
      toast({
        title: "Error",
        description: `Minimum vote amount is $${minAmount.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }

    setIsVoting(true);

    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Submit vote
      const { error } = await supabase
        .from('poll_votes')
        .insert({
          poll_id: poll.id,
          user_id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous',
          option_index: selectedOption,
          amount_cents: Math.round(voteAmount * 100)
        });

      if (error) throw error;

      toast({
        title: "Vote Cast!",
        description: `Your $${voteAmount.toFixed(2)} vote has been recorded`,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to cast vote",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const totalRevenue = poll.total_revenue_cents / 100;
  const timeRemaining = Math.max(0, new Date(poll.ends_at).getTime() - Date.now());
  const minutesRemaining = Math.floor(timeRemaining / (1000 * 60));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5 text-primary" />
            Paid Poll
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">{poll.question}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline">
                {poll.total_votes} votes
              </Badge>
              <Badge variant="outline">
                ${totalRevenue.toFixed(2)} raised
              </Badge>
              <Badge variant="outline">
                {minutesRemaining > 0 ? `${minutesRemaining}m left` : 'Ended'}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Vote Options</Label>
            {poll.options.map((option, index) => {
              const percentage = poll.total_votes > 0 
                ? Math.round((option.votes / poll.total_votes) * 100)
                : 0;
              
              return (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    selectedOption === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedOption(index)}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option.text}</span>
                      <span className="text-sm text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{option.votes} votes</span>
                      <span>${(option.revenue / 100).toFixed(2)} raised</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vote-amount" className="text-sm font-medium">
              Vote Amount (min: ${minAmount.toFixed(2)})
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="vote-amount"
                type="number"
                placeholder={minAmount.toFixed(2)}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={minAmount}
                step="0.01"
                className="pl-10"
              />
            </div>
          </div>

          <Card className="p-4 bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Vote Summary</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Selected Option:</span>
                <span className="font-medium text-foreground">
                  {selectedOption !== null ? poll.options[selectedOption]?.text : 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Vote Amount:</span>
                <span className="font-medium text-foreground">
                  ${voteAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleVote}
              disabled={isVoting || selectedOption === null || voteAmount < minAmount || minutesRemaining <= 0}
              className="flex-1"
            >
              {isVoting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Vote ${voteAmount.toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaidPollModal;