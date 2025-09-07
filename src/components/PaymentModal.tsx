import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  Heart, 
  Zap, 
  Gift, 
  Star,
  CreditCard,
  Loader2,
  CheckCircle,
  Pin
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  creatorAvatar: string;
  onPaymentSuccess: (amount: number, message: string) => void;
}

const predefinedAmounts = [
  { amount: 1, label: "$1", icon: Heart, color: "bg-pink-500" },
  { amount: 5, label: "$5", icon: Star, color: "bg-yellow-500" },
  { amount: 10, label: "$10", icon: Zap, color: "bg-purple-500" },
  { amount: 25, label: "$25", icon: Gift, color: "bg-blue-500" }
];

export const PaymentModal = ({ 
  isOpen, 
  onClose, 
  creatorName, 
  creatorAvatar,
  onPaymentSuccess 
}: PaymentModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue);
    }
  };

  const handlePayment = async () => {
    if (selectedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select a valid tip amount",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate Stripe Checkout integration
      // In real implementation, this would call Supabase edge function
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        setShowConfirmation(true);
        
        // Call the success callback to update chat
        onPaymentSuccess(selectedAmount, message);
        
        toast({
          title: "Payment Successful!",
          description: `Your $${selectedAmount} tip has been sent to ${creatorName}`,
        });

        // Reset form after short delay
        setTimeout(() => {
          setShowConfirmation(false);
          setMessage("");
          setSelectedAmount(5);
          setCustomAmount("");
          onClose();
        }, 3000);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setShowConfirmation(false);
    setMessage("");
    setSelectedAmount(5);
    setCustomAmount("");
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Your ${selectedAmount} tip has been sent to {creatorName}
            </p>
            {message && (
              <div className="bg-muted/50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Pin className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Your message has been pinned!</span>
                </div>
                <p className="text-sm italic">"{message}"</p>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4" />
              <span>Processed securely via Stripe</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            Send a Tip
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Creator Info */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={creatorAvatar} />
                <AvatarFallback>{creatorName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{creatorName}</h4>
                <p className="text-sm text-muted-foreground">
                  Show your support with a tip!
                </p>
              </div>
            </div>
          </Card>

          {/* Amount Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Choose Amount</Label>
            <div className="grid grid-cols-2 gap-3">
              {predefinedAmounts.map((preset) => {
                const IconComponent = preset.icon;
                const isSelected = selectedAmount === preset.amount && !customAmount;
                
                return (
                  <Button
                    key={preset.amount}
                    variant={isSelected ? "default" : "outline"}
                    className={`p-4 h-auto flex flex-col gap-2 ${
                      isSelected ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleAmountSelect(preset.amount)}
                  >
                    <div className={`w-8 h-8 rounded-full ${preset.color} flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">{preset.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label htmlFor="customAmount">Custom Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message to your tip..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={280}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Your message will be highlighted in chat</span>
              <span>{message.length}/280</span>
            </div>
          </div>

          {/* Payment Summary */}
          <Card className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-accent">
                  ${selectedAmount.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Secure payment via Stripe</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePayment}
              className="flex-1 bg-gradient-to-r from-accent to-primary text-white"
              disabled={isProcessing || selectedAmount <= 0}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4 mr-2" />
                  Send Tip
                </>
              )}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>
              🔒 Your payment information is secure and encrypted. 
              We use industry-standard security measures.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};