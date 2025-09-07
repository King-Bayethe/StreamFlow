import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  BarChart3, 
  Users, 
  Clock, 
  Play, 
  Pause, 
  Trash2,
  TrendingUp,
  Vote,
  Eye
} from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isActive: boolean;
  duration: number;
  totalVotes: number;
  createdAt: Date;
  expiresAt?: Date;
}

const LivePolls = ({ isLive }: { isLive: boolean }) => {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      question: "What game should I play next?",
      options: [
        { id: "1a", text: "Minecraft", votes: 45 },
        { id: "1b", text: "Fortnite", votes: 32 },
        { id: "1c", text: "Among Us", votes: 28 },
        { id: "1d", text: "Valorant", votes: 55 }
      ],
      isActive: true,
      duration: 120,
      totalVotes: 160,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 120000)
    }
  ]);

  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", ""],
    duration: 60
  });

  const [showCreatePoll, setShowCreatePoll] = useState(false);

  useEffect(() => {
    // Update poll timers
    const interval = setInterval(() => {
      setPolls(prevPolls => 
        prevPolls.map(poll => {
          if (poll.isActive && poll.expiresAt && new Date() > poll.expiresAt) {
            return { ...poll, isActive: false };
          }
          return poll;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addOption = () => {
    setNewPoll(prev => ({
      ...prev,
      options: [...prev.options, ""]
    }));
  };

  const removeOption = (index: number) => {
    if (newPoll.options.length > 2) {
      setNewPoll(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setNewPoll(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const createPoll = () => {
    if (newPoll.question.trim() && newPoll.options.filter(opt => opt.trim()).length >= 2) {
      const poll: Poll = {
        id: Date.now().toString(),
        question: newPoll.question,
        options: newPoll.options
          .filter(opt => opt.trim())
          .map((text, index) => ({
            id: `${Date.now()}_${index}`,
            text: text.trim(),
            votes: 0
          })),
        isActive: true,
        duration: newPoll.duration,
        totalVotes: 0,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + newPoll.duration * 1000)
      };

      setPolls(prev => [poll, ...prev]);
      setNewPoll({ question: "", options: ["", ""], duration: 60 });
      setShowCreatePoll(false);
    }
  };

  const togglePoll = (pollId: string) => {
    setPolls(prev => 
      prev.map(poll => 
        poll.id === pollId 
          ? { 
              ...poll, 
              isActive: !poll.isActive,
              expiresAt: !poll.isActive 
                ? new Date(Date.now() + poll.duration * 1000)
                : undefined
            }
          : poll
      )
    );
  };

  const deletePoll = (pollId: string) => {
    setPolls(prev => prev.filter(poll => poll.id !== pollId));
  };

  const getTimeRemaining = (poll: Poll) => {
    if (!poll.isActive || !poll.expiresAt) return null;
    const remaining = Math.max(0, Math.floor((poll.expiresAt.getTime() - Date.now()) / 1000));
    return remaining;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Live Polls
          </h3>
          <p className="text-muted-foreground">Engage your audience with interactive polls</p>
        </div>
        <Button 
          onClick={() => setShowCreatePoll(!showCreatePoll)}
          disabled={!isLive}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Poll
        </Button>
      </div>

      {/* Create Poll Form */}
      {showCreatePoll && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-5 h-5" />
              Create New Poll
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Poll Question</Label>
              <Textarea
                id="question"
                placeholder="What would you like to ask your audience?"
                value={newPoll.question}
                onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Poll Options</Label>
              {newPoll.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  {newPoll.options.length > 2 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addOption}
                className="w-full"
                disabled={newPoll.options.length >= 6}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                min="30"
                max="600"
                value={newPoll.duration}
                onChange={(e) => setNewPoll(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={createPoll} className="flex-1">
                Create Poll
              </Button>
              <Button variant="outline" onClick={() => setShowCreatePoll(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Polls */}
      <div className="grid gap-6">
        {polls.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No polls created yet</h3>
              <p className="text-muted-foreground">Create your first poll to start engaging with your audience!</p>
            </CardContent>
          </Card>
        ) : (
          polls.map((poll) => {
            const timeRemaining = getTimeRemaining(poll);
            const maxVotes = Math.max(...poll.options.map(opt => opt.votes), 1);

            return (
              <Card key={poll.id} className={poll.isActive ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{poll.question}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {poll.totalVotes} votes
                        </div>
                        {poll.isActive && timeRemaining !== null && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                          </div>
                        )}
                        <Badge variant={poll.isActive ? "default" : "secondary"}>
                          {poll.isActive ? "Active" : "Ended"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePoll(poll.id)}
                        disabled={!isLive && !poll.isActive}
                      >
                        {poll.isActive ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            End
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Restart
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deletePoll(poll.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const percentage = poll.totalVotes > 0 
                        ? (option.votes / poll.totalVotes) * 100 
                        : 0;
                      
                      return (
                        <div key={option.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{option.text}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">{option.votes} votes</span>
                              <span className="font-semibold">{percentage.toFixed(1)}%</span>
                            </div>
                          </div>
                          <Progress 
                            value={percentage} 
                            className="h-2"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {poll.isActive && timeRemaining !== null && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Time Remaining</span>
                        <span className="font-mono">
                          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <Progress 
                        value={((poll.duration - timeRemaining) / poll.duration) * 100} 
                        className="h-1 mt-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Statistics */}
      {polls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Poll Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{polls.length}</div>
                <div className="text-sm text-muted-foreground">Total Polls</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {polls.filter(p => p.isActive).length}
                </div>
                <div className="text-sm text-muted-foreground">Active Polls</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {polls.length > 0 
                    ? Math.round(polls.reduce((sum, poll) => sum + poll.totalVotes, 0) / polls.length)
                    : 0
                  }
                </div>
                <div className="text-sm text-muted-foreground">Avg Votes/Poll</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LivePolls;