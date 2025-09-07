import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Gift, 
  Clock, 
  Users, 
  Trophy, 
  Play, 
  Pause, 
  Trash2,
  Plus,
  Dice6,
  Crown,
  Star,
  Settings
} from "lucide-react";

interface Participant {
  id: string;
  username: string;
  avatar: string;
  joinedAt: Date;
  isFollower: boolean;
  isSubscriber: boolean;
}

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prize: string;
  duration: number;
  isActive: boolean;
  startedAt?: Date;
  endsAt?: Date;
  participants: Participant[];
  winner?: Participant;
  requirements: {
    mustFollow: boolean;
    mustSubscribe: boolean;
    minWatchTime: number;
  };
  maxParticipants?: number;
}

const Giveaways = ({ isLive }: { isLive: boolean }) => {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([
    {
      id: "1",
      title: "Gaming Headset Giveaway",
      description: "Win a brand new gaming headset worth $150!",
      prize: "SteelSeries Arctis 7P Wireless Headset",
      duration: 300,
      isActive: true,
      startedAt: new Date(Date.now() - 120000),
      endsAt: new Date(Date.now() + 180000),
      participants: [
        {
          id: "1",
          username: "GamerPro2024",
          avatar: "/placeholder.svg",
          joinedAt: new Date(Date.now() - 100000),
          isFollower: true,
          isSubscriber: true
        },
        {
          id: "2",
          username: "StreamFan",
          avatar: "/placeholder.svg",
          joinedAt: new Date(Date.now() - 80000),
          isFollower: true,
          isSubscriber: false
        }
      ],
      requirements: {
        mustFollow: true,
        mustSubscribe: false,
        minWatchTime: 5
      },
      maxParticipants: 100
    }
  ]);

  const [newGiveaway, setNewGiveaway] = useState({
    title: "",
    description: "",
    prize: "",
    duration: 300,
    requirements: {
      mustFollow: false,
      mustSubscribe: false,
      minWatchTime: 0
    },
    maxParticipants: 0
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Update giveaway timers
    const interval = setInterval(() => {
      setGiveaways(prevGiveaways => 
        prevGiveaways.map(giveaway => {
          if (giveaway.isActive && giveaway.endsAt && new Date() > giveaway.endsAt) {
            return { ...giveaway, isActive: false };
          }
          return giveaway;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createGiveaway = () => {
    if (newGiveaway.title.trim() && newGiveaway.prize.trim()) {
      const giveaway: Giveaway = {
        id: Date.now().toString(),
        title: newGiveaway.title,
        description: newGiveaway.description,
        prize: newGiveaway.prize,
        duration: newGiveaway.duration,
        isActive: false,
        participants: [],
        requirements: newGiveaway.requirements,
        maxParticipants: newGiveaway.maxParticipants || undefined
      };

      setGiveaways(prev => [giveaway, ...prev]);
      setNewGiveaway({
        title: "",
        description: "",
        prize: "",
        duration: 300,
        requirements: {
          mustFollow: false,
          mustSubscribe: false,
          minWatchTime: 0
        },
        maxParticipants: 0
      });
      setShowCreateForm(false);
    }
  };

  const startGiveaway = (giveawayId: string) => {
    const now = new Date();
    setGiveaways(prev => 
      prev.map(giveaway => 
        giveaway.id === giveawayId 
          ? { 
              ...giveaway, 
              isActive: true,
              startedAt: now,
              endsAt: new Date(now.getTime() + giveaway.duration * 1000)
            }
          : giveaway
      )
    );
  };

  const endGiveaway = (giveawayId: string) => {
    setGiveaways(prev => 
      prev.map(giveaway => 
        giveaway.id === giveawayId 
          ? { ...giveaway, isActive: false }
          : giveaway
      )
    );
  };

  const pickWinner = (giveawayId: string) => {
    setGiveaways(prev => 
      prev.map(giveaway => {
        if (giveaway.id === giveawayId && giveaway.participants.length > 0) {
          const randomIndex = Math.floor(Math.random() * giveaway.participants.length);
          const winner = giveaway.participants[randomIndex];
          return { 
            ...giveaway, 
            isActive: false,
            winner 
          };
        }
        return giveaway;
      })
    );
  };

  const deleteGiveaway = (giveawayId: string) => {
    setGiveaways(prev => prev.filter(giveaway => giveaway.id !== giveawayId));
  };

  const getTimeRemaining = (giveaway: Giveaway) => {
    if (!giveaway.isActive || !giveaway.endsAt) return null;
    const remaining = Math.max(0, Math.floor((giveaway.endsAt.getTime() - Date.now()) / 1000));
    return remaining;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Giveaways
          </h3>
          <p className="text-muted-foreground">Create and manage timed giveaways for your audience</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Giveaway
        </Button>
      </div>

      {/* Create Giveaway Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Create New Giveaway
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Giveaway Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Gaming Mouse Giveaway"
                  value={newGiveaway.title}
                  onChange={(e) => setNewGiveaway(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prize">Prize</Label>
                <Input
                  id="prize"
                  placeholder="e.g., Logitech G Pro X Superlight"
                  value={newGiveaway.prize}
                  onChange={(e) => setNewGiveaway(prev => ({ ...prev, prize: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the giveaway and any special rules..."
                value={newGiveaway.description}
                onChange={(e) => setNewGiveaway(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Select
                  value={newGiveaway.duration.toString()}
                  onValueChange={(value) => setNewGiveaway(prev => ({ ...prev, duration: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                    <SelectItem value="600">10 minutes</SelectItem>
                    <SelectItem value="900">15 minutes</SelectItem>
                    <SelectItem value="1800">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants (optional)</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  placeholder="Leave empty for unlimited"
                  value={newGiveaway.maxParticipants || ""}
                  onChange={(e) => setNewGiveaway(prev => ({ 
                    ...prev, 
                    maxParticipants: parseInt(e.target.value) || 0 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Requirements</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="mustFollow"
                    checked={newGiveaway.requirements.mustFollow}
                    onChange={(e) => setNewGiveaway(prev => ({ 
                      ...prev, 
                      requirements: { ...prev.requirements, mustFollow: e.target.checked }
                    }))}
                  />
                  <Label htmlFor="mustFollow">Must be a follower</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="mustSubscribe"
                    checked={newGiveaway.requirements.mustSubscribe}
                    onChange={(e) => setNewGiveaway(prev => ({ 
                      ...prev, 
                      requirements: { ...prev.requirements, mustSubscribe: e.target.checked }
                    }))}
                  />
                  <Label htmlFor="mustSubscribe">Must be a subscriber</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={createGiveaway} className="flex-1">
                Create Giveaway
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Giveaways */}
      <div className="grid gap-6">
        {giveaways.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No giveaways created yet</h3>
              <p className="text-muted-foreground">Create your first giveaway to engage with your audience!</p>
            </CardContent>
          </Card>
        ) : (
          giveaways.map((giveaway) => {
            const timeRemaining = getTimeRemaining(giveaway);
            const isEligible = giveaway.maxParticipants 
              ? giveaway.participants.length < giveaway.maxParticipants 
              : true;

            return (
              <Card key={giveaway.id} className={giveaway.isActive ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        {giveaway.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">{giveaway.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {giveaway.prize}
                        </Badge>
                        <Badge variant={giveaway.isActive ? "default" : "secondary"}>
                          {giveaway.isActive ? "Active" : "Ended"}
                        </Badge>
                        {giveaway.winner && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            Winner: {giveaway.winner.username}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!giveaway.isActive && !giveaway.winner && (
                        <Button
                          size="sm"
                          onClick={() => startGiveaway(giveaway.id)}
                          disabled={!isLive}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {giveaway.isActive && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => pickWinner(giveaway.id)}
                            disabled={giveaway.participants.length === 0}
                          >
                            <Dice6 className="w-4 h-4 mr-1" />
                            Pick Winner
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => endGiveaway(giveaway.id)}
                          >
                            <Pause className="w-4 h-4 mr-1" />
                            End
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteGiveaway(giveaway.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Giveaway Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Participants</span>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">
                            {giveaway.participants.length}
                            {giveaway.maxParticipants && ` / ${giveaway.maxParticipants}`}
                          </span>
                        </div>
                      </div>

                      {giveaway.isActive && timeRemaining !== null && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Time Remaining</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="font-mono font-semibold">
                                {formatTime(timeRemaining)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Requirements */}
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Requirements</span>
                        <div className="space-y-1">
                          {giveaway.requirements.mustFollow && (
                            <Badge variant="outline" className="text-xs">Must Follow</Badge>
                          )}
                          {giveaway.requirements.mustSubscribe && (
                            <Badge variant="outline" className="text-xs">Must Subscribe</Badge>
                          )}
                          {giveaway.requirements.minWatchTime > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {giveaway.requirements.minWatchTime}min watch time
                            </Badge>
                          )}
                          {!giveaway.requirements.mustFollow && 
                           !giveaway.requirements.mustSubscribe && 
                           giveaway.requirements.minWatchTime === 0 && (
                            <Badge variant="outline" className="text-xs">No requirements</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Recent Participants */}
                    <div className="space-y-4">
                      <span className="text-sm font-medium">Recent Participants</span>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {giveaway.participants.slice(0, 5).map((participant) => (
                          <div key={participant.id} className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={participant.avatar} />
                              <AvatarFallback className="text-xs">
                                {participant.username[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{participant.username}</span>
                            <div className="flex gap-1">
                              {participant.isFollower && (
                                <Star className="w-3 h-3 text-yellow-500" />
                              )}
                              {participant.isSubscriber && (
                                <Crown className="w-3 h-3 text-purple-500" />
                              )}
                            </div>
                          </div>
                        ))}
                        {giveaway.participants.length === 0 && (
                          <p className="text-sm text-muted-foreground">No participants yet</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Winner Display */}
                  {giveaway.winner && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <div>
                          <div className="font-semibold">🎉 Winner: {giveaway.winner.username}</div>
                          <div className="text-sm text-muted-foreground">
                            Congratulations! You won {giveaway.prize}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Statistics */}
      {giveaways.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Giveaway Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{giveaways.length}</div>
                <div className="text-sm text-muted-foreground">Total Giveaways</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {giveaways.filter(g => g.isActive).length}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {giveaways.reduce((sum, g) => sum + g.participants.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Participants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {giveaways.filter(g => g.winner).length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Giveaways;