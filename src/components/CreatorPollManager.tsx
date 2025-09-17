import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DollarSign,
  Calendar,
  Settings,
  Copy
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PollOption {
  id: string;
  text: string;
  votes: number;
  revenue: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isActive: boolean;
  isPaid: boolean;
  minPaymentCents: number;
  duration: number;
  totalVotes: number;
  totalRevenue: number;
  createdAt: Date;
  expiresAt?: Date;
  streamId?: string;
}

const CreatorPollManager = ({ streamId, isLive }: { streamId?: string; isLive: boolean }) => {
  const { toast } = useToast();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", ""],
    duration: 300,
    isPaid: false,
    minPaymentCents: 100
  });

  // Load polls from database
  useEffect(() => {
    loadPolls();
  }, [streamId]);

  const loadPolls = async () => {
    try {
      const { data: pollsData, error } = await supabase
        .from('polls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPolls = pollsData?.map(poll => ({
        id: poll.id,
        question: poll.question,
        options: Array.isArray(poll.options) ? poll.options.map((opt: any) => ({
          id: opt.id || `opt_${Math.random()}`,
          text: opt.text || '',
          votes: opt.votes || 0,
          revenue: opt.revenue || 0
        })) : [],
        isActive: poll.ends_at ? new Date() < new Date(poll.ends_at) : false,
        isPaid: poll.min_payment_cents > 0,
        minPaymentCents: poll.min_payment_cents || 0,
        duration: 300, // Default duration
        totalVotes: poll.total_votes || 0,
        totalRevenue: (poll.total_revenue_cents || 0) / 100,
        createdAt: new Date(poll.created_at),
        expiresAt: poll.ends_at ? new Date(poll.ends_at) : undefined,
        streamId: poll.stream_id
      })) || [];

      setPolls(formattedPolls);
    } catch (error) {
      console.error('Error loading polls:', error);
      toast({
        title: "Error",
        description: "Failed to load polls",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  const createPoll = async () => {
    if (!newPoll.question.trim() || newPoll.options.filter(opt => opt.trim()).length < 2) {
      toast({
        title: "Invalid Poll",
        description: "Please provide a question and at least 2 options",
        variant: "destructive"
      });
      return;
    }

    try {
      const pollOptions = newPoll.options
        .filter(opt => opt.trim())
        .map((text, index) => ({
          id: `opt_${index}`,
          text: text.trim(),
          votes: 0,
          revenue: 0
        }));

      const { error } = await supabase
        .from('polls')
        .insert({
          question: newPoll.question,
          options: pollOptions,
          min_payment_cents: newPoll.isPaid ? newPoll.minPaymentCents : 0,
          ends_at: new Date(Date.now() + newPoll.duration * 1000).toISOString(),
          stream_id: streamId,
          creator_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "Poll Created",
        description: "Your poll is now live!"
      });

      setNewPoll({ 
        question: "", 
        options: ["", ""], 
        duration: 300, 
        isPaid: false, 
        minPaymentCents: 100 
      });
      setShowCreatePoll(false);
      loadPolls();
    } catch (error) {
      console.error('Error creating poll:', error);
      toast({
        title: "Error",
        description: "Failed to create poll",
        variant: "destructive"
      });
    }
  };

  const togglePoll = async (pollId: string) => {
    try {
      const poll = polls.find(p => p.id === pollId);
      if (!poll) return;

      const newEndTime = poll.isActive 
        ? null 
        : new Date(Date.now() + poll.duration * 1000).toISOString();

      const { error } = await supabase
        .from('polls')
        .update({ ends_at: newEndTime })
        .eq('id', pollId);

      if (error) throw error;

      loadPolls();
      toast({
        title: poll.isActive ? "Poll Ended" : "Poll Restarted",
        description: `Poll has been ${poll.isActive ? 'ended' : 'restarted'}`
      });
    } catch (error) {
      console.error('Error toggling poll:', error);
    }
  };

  const deletePoll = async (pollId: string) => {
    try {
      const { error } = await supabase
        .from('polls')
        .delete()
        .eq('id', pollId);

      if (error) throw error;

      loadPolls();
      toast({
        title: "Poll Deleted",
        description: "Poll has been removed"
      });
    } catch (error) {
      console.error('Error deleting poll:', error);
    }
  };

  const getTimeRemaining = (poll: Poll) => {
    if (!poll.isActive || !poll.expiresAt) return null;
    const remaining = Math.max(0, Math.floor((poll.expiresAt.getTime() - Date.now()) / 1000));
    return remaining;
  };

  const copyPollLink = (pollId: string) => {
    const link = `${window.location.origin}/poll/${pollId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Poll link copied to clipboard"
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading polls...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Poll Management
          </h3>
          <p className="text-muted-foreground">Create and manage interactive polls with monetization</p>
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

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Polls</TabsTrigger>
          <TabsTrigger value="create" disabled={!showCreatePoll}>Create Poll</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="60"
                      max="3600"
                      value={newPoll.duration}
                      onChange={(e) => setNewPoll(prev => ({ ...prev, duration: parseInt(e.target.value) || 300 }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="paid-poll"
                        checked={newPoll.isPaid}
                        onCheckedChange={(checked) => setNewPoll(prev => ({ ...prev, isPaid: checked }))}
                      />
                      <Label htmlFor="paid-poll">Paid Poll</Label>
                    </div>
                    {newPoll.isPaid && (
                      <div className="space-y-2">
                        <Label htmlFor="min-payment">Min Payment (cents)</Label>
                        <Input
                          id="min-payment"
                          type="number"
                          min="50"
                          max="10000"
                          value={newPoll.minPaymentCents}
                          onChange={(e) => setNewPoll(prev => ({ ...prev, minPaymentCents: parseInt(e.target.value) || 100 }))}
                        />
                      </div>
                    )}
                  </div>
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

          {/* Active Polls List */}
          <div className="grid gap-4">
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
                            {poll.isPaid && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                ${poll.totalRevenue.toFixed(2)}
                              </div>
                            )}
                            {poll.isActive && timeRemaining !== null && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                              </div>
                            )}
                            <Badge variant={poll.isActive ? "default" : "secondary"}>
                              {poll.isActive ? "Active" : "Ended"}
                            </Badge>
                            {poll.isPaid && (
                              <Badge variant="outline">
                                Paid (${(poll.minPaymentCents / 100).toFixed(2)})
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyPollLink(poll.id)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
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
                                  {poll.isPaid && (
                                    <span className="text-muted-foreground">${option.revenue.toFixed(2)}</span>
                                  )}
                                  <span className="font-semibold">{percentage.toFixed(1)}%</span>
                                </div>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Poll Analytics
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
                    ${polls.reduce((sum, poll) => sum + poll.totalRevenue, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorPollManager;