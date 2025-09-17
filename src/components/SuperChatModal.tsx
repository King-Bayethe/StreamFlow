import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, DollarSign, Star, Crown, Gem } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SuperChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  streamId: string;
  creatorId: string;
}

const SuperChatModal = ({ isOpen, onClose, streamId, creatorId }: SuperChatModalProps) => {
  const [amount, setAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const tiers = [
    { amount: 2, color: 'bg-blue-500', icon: DollarSign, label: 'Support', time: '2min' },
    { amount: 5, color: 'bg-green-500', icon: Star, label: 'Highlight', time: '5min' },
    { amount: 10, color: 'bg-purple-500', icon: Crown, label: 'Premium', time: '10min' },
    { amount: 25, color: 'bg-pink-500', icon: Gem, label: 'VIP', time: '20min' },
  ];

  const selectedTier = tiers.find(tier => tier.amount === amount) || tiers[0];
  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleSendSuperChat = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to send a Super Chat",
        variant: "destructive",
      });
      return;
    }

    if (finalAmount < 1) {
      toast({
        title: "Error",
        description: "Minimum amount is $1.00",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Error", 
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Mock payment processing (replace with Stripe when ready)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create chat message with payment
      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert({
          stream_id: streamId,
          user_id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous',
          content: message,
          is_paid: true,
          amount_cents: Math.round(finalAmount * 100),
          currency: 'USD',
          pinned_until: new Date(Date.now() + (finalAmount >= 25 ? 20 * 60 * 1000 : finalAmount >= 10 ? 10 * 60 * 1000 : finalAmount >= 5 ? 5 * 60 * 1000 : 2 * 60 * 1000)).toISOString()
        });

      if (messageError) throw messageError;

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          stream_id: streamId,
          sender_id: user.id,
          creator_id: creatorId,
          amount_cents: Math.round(finalAmount * 100),
          currency: 'USD',
          type: 'superchat',
          status: 'completed'
        });

      if (paymentError) throw paymentError;

      toast({
        title: "Super Chat Sent!",
        description: `Your $${finalAmount.toFixed(2)} Super Chat has been sent`,
      });

      setMessage('');
      setCustomAmount('');
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send Super Chat",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Send Super Chat
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Select Amount</Label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <Card
                    key={tier.amount}
                    className={`p-3 cursor-pointer border-2 transition-all ${
                      amount === tier.amount && !customAmount
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      setAmount(tier.amount);
                      setCustomAmount('');
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1 rounded ${tier.color} text-white`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <span className="font-medium">${tier.amount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tier.label} • Pinned {tier.time}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-amount" className="text-sm">Custom Amount ($)</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="1"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Say something to the streamer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <div className="text-right text-xs text-muted-foreground">
              {message.length}/200
            </div>
          </div>

          <Card className="p-4 bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Super Chat Summary</span>
              <Badge variant="secondary">
                {selectedTier?.label || 'Custom'}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium text-foreground">
                  ${finalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pin Duration:</span>
                <span className="font-medium text-foreground">
                  {finalAmount >= 25 ? '20 minutes' : 
                   finalAmount >= 10 ? '10 minutes' :
                   finalAmount >= 5 ? '5 minutes' : 
                   finalAmount >= 2 ? '2 minutes' : '1 minute'}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSendSuperChat} 
              disabled={isProcessing || !message.trim() || finalAmount < 1}
              className="flex-1"
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send ${finalAmount.toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuperChatModal;