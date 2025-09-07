import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Crown, 
  Star, 
  Shield, 
  Flame, 
  Zap, 
  Gift,
  Trophy,
  Gem,
  Sparkles
} from "lucide-react";

interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  level: number;
  badges: string[];
  xpGained?: number;
  tipAmount?: number;
  isHighlighted?: boolean;
}

interface GamifiedChatProps {
  messages: ChatMessage[];
  className?: string;
}

const GamifiedChat = ({ messages, className = "" }: GamifiedChatProps) => {
  const getLevelTier = (level: number) => {
    if (level >= 50) return { name: "Legendary", color: "text-yellow-500", bgColor: "bg-yellow-100" };
    if (level >= 40) return { name: "Master", color: "text-purple-500", bgColor: "bg-purple-100" };
    if (level >= 30) return { name: "Expert", color: "text-blue-500", bgColor: "bg-blue-100" };
    if (level >= 20) return { name: "Advanced", color: "text-green-500", bgColor: "bg-green-100" };
    if (level >= 10) return { name: "Intermediate", color: "text-orange-500", bgColor: "bg-orange-100" };
    return { name: "Beginner", color: "text-gray-500", bgColor: "bg-gray-100" };
  };

  const badgeIcons: Record<string, React.ReactNode> = {
    "legend": <Trophy className="w-3 h-3 text-yellow-500" />,
    "big_tipper": <Crown className="w-3 h-3 text-purple-500" />,
    "loyal_viewer": <Star className="w-3 h-3 text-blue-500" />,
    "speed_demon": <Zap className="w-3 h-3 text-orange-500" />,
    "super_fan": <Flame className="w-3 h-3 text-red-500" />,
    "guardian": <Shield className="w-3 h-3 text-green-500" />,
    "newcomer": <Sparkles className="w-3 h-3 text-pink-500" />,
    "diamond_member": <Gem className="w-3 h-3 text-cyan-500" />
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {messages.map((message) => {
        const tier = getLevelTier(message.level);
        
        return (
          <div 
            key={message.id} 
            className={`flex items-start gap-2 p-2 rounded-lg transition-colors ${
              message.isHighlighted ? "bg-primary/5 border border-primary/20" : ""
            } ${message.tipAmount ? "bg-accent/5" : ""}`}
          >
            <Avatar className="w-6 h-6 mt-0.5">
              <AvatarImage src={message.avatar} />
              <AvatarFallback className="text-xs">{message.username[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Level Badge */}
                <Badge className={`${tier.bgColor} ${tier.color} text-xs px-1.5 py-0.5`}>
                  Lv.{message.level}
                </Badge>
                
                {/* Achievement Badges */}
                <div className="flex gap-1">
                  {message.badges.slice(0, 3).map((badgeId) => (
                    <div key={badgeId} className="w-4 h-4 flex items-center justify-center">
                      {badgeIcons[badgeId]}
                    </div>
                  ))}
                </div>
                
                {/* Username */}
                <span className={`font-medium text-sm ${tier.color}`}>
                  {message.username}
                </span>
                
                {/* Tip Amount */}
                {message.tipAmount && (
                  <Badge className="bg-accent text-accent-foreground text-xs">
                    ${message.tipAmount}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                {/* Message */}
                <span className="text-sm text-foreground">{message.message}</span>
                
                {/* XP Gained */}
                {message.xpGained && (
                  <div className="flex items-center gap-1 ml-auto">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">
                      +{message.xpGained} XP
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Example usage component for preview
const GamifiedChatPreview = () => {
  const [sampleMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "StreamLegend",
      avatar: "/placeholder.svg",
      message: "Amazing stream today! Keep it up! 🔥",
      timestamp: new Date(),
      level: 45,
      badges: ["legend", "big_tipper", "loyal_viewer"],
      xpGained: 5,
      isHighlighted: true
    },
    {
      id: "2",
      username: "BigTipper",
      avatar: "/placeholder.svg",
      message: "Here's something for the great content!",
      timestamp: new Date(),
      level: 38,
      badges: ["big_tipper", "super_fan"],
      tipAmount: 25,
      xpGained: 250
    },
    {
      id: "3",
      username: "ChatMaster",
      avatar: "/placeholder.svg",
      message: "What game are we playing next?",
      timestamp: new Date(),
      level: 22,
      badges: ["guardian", "speed_demon"],
      xpGained: 5
    },
    {
      id: "4",
      username: "NewViewer",
      avatar: "/placeholder.svg",
      message: "First time watching, loving it!",
      timestamp: new Date(),
      level: 3,
      badges: ["newcomer"],
      xpGained: 5
    },
    {
      id: "5",
      username: "LoyalFan",
      avatar: "/placeholder.svg",
      message: "GG! That was incredible!",
      timestamp: new Date(),
      level: 28,
      badges: ["loyal_viewer", "super_fan"],
      xpGained: 5
    }
  ]);

  return (
    <div className="bg-background border rounded-lg p-4 h-80 overflow-y-auto">
      <div className="mb-3 text-sm font-medium text-muted-foreground border-b pb-2">
        Live Chat with Gamification
      </div>
      <GamifiedChat messages={sampleMessages} />
    </div>
  );
};

export { GamifiedChat, GamifiedChatPreview };
export default GamifiedChat;