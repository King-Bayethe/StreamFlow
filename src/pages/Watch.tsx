import InteractiveStreamPage from "@/components/InteractiveStreamPage";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isPaid?: boolean;
  amount?: number;
  isPinned?: boolean;
  avatar?: string;
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  totalEarnings: number;
  bio: string;
  isFollowing: boolean;
}

const Watch = () => {
  return <InteractiveStreamPage />;
};

export default Watch;