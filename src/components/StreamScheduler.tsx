import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Calendar,
  Clock,
  Plus,
  Play,
  Pause,
  Settings,
  Bell,
  Users,
  Copy,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Zap,
  Globe,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScheduledStream {
  id: string;
  title: string;
  description: string;
  scheduledAt: Date;
  duration: number;
  category: string;
  thumbnail: string;
  isRecurring: boolean;
  recurringDays: string[];
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  notifyFollowers: boolean;
  autoStart: boolean;
  platforms: string[];
}

interface StreamTemplate {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
}

interface AnnouncementTemplate {
  id: string;
  name: string;
  platform: 'discord' | 'twitter' | 'youtube' | 'twitch' | 'all';
  message: string;
  timing: 'immediate' | '1hour' | '24hours' | 'custom';
  isActive: boolean;
}

const StreamScheduler = () => {
  const { toast } = useToast();
  const [scheduledStreams, setScheduledStreams] = useState<ScheduledStream[]>([]);
  const [templates, setTemplates] = useState<StreamTemplate[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementTemplate[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStream, setNewStream] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    duration: 120,
    category: 'Gaming',
    notifyFollowers: true,
    autoStart: false,
    platforms: ['main'],
    isRecurring: false,
    recurringDays: [] as string[]
  });

  // Mock data initialization
  useEffect(() => {
    const mockStreams: ScheduledStream[] = [
      {
        id: '1',
        title: 'Epic Gaming Marathon',
        description: 'Join me for an epic 6-hour gaming session with viewer games!',
        scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
        duration: 360,
        category: 'Gaming',
        thumbnail: '/api/placeholder/400/225',
        isRecurring: false,
        recurringDays: [],
        status: 'scheduled',
        notifyFollowers: true,
        autoStart: true,
        platforms: ['main', 'twitch', 'youtube']
      },
      {
        id: '2',
        title: 'Weekly Art Stream',
        description: 'Digital art creation and tutorials every Wednesday',
        scheduledAt: new Date(Date.now() + 259200000), // 3 days from now
        duration: 180,
        category: 'Art',
        thumbnail: '/api/placeholder/400/225',
        isRecurring: true,
        recurringDays: ['wednesday'],
        status: 'scheduled',
        notifyFollowers: true,
        autoStart: false,
        platforms: ['main', 'youtube']
      }
    ];
    setScheduledStreams(mockStreams);

    const mockTemplates: StreamTemplate[] = [
      {
        id: '1',
        name: 'Gaming Session',
        title: 'Epic Gaming with {{username}}',
        description: 'Join me for some amazing {{game}} gameplay! Drop your suggestions in chat!',
        category: 'Gaming',
        tags: ['gaming', 'interactive', 'fun'],
        thumbnail: '/api/placeholder/400/225'
      },
      {
        id: '2',
        name: 'Tutorial Stream',
        title: '{{skill}} Tutorial - Learn with {{username}}',
        description: 'Learn {{skill}} step by step in this comprehensive tutorial stream.',
        category: 'Education',
        tags: ['tutorial', 'educational', 'learning'],
        thumbnail: '/api/placeholder/400/225'
      }
    ];
    setTemplates(mockTemplates);

    const mockAnnouncements: AnnouncementTemplate[] = [
      {
        id: '1',
        name: 'Stream Starting Soon',
        platform: 'all',
        message: '🔴 LIVE in 1 hour! {{title}} - {{url}}',
        timing: '1hour',
        isActive: true
      },
      {
        id: '2',
        name: 'Stream Live Now',
        platform: 'twitter',
        message: '🎮 LIVE NOW: {{title}} Come join the fun! {{url}} #streaming #{{category}}',
        timing: 'immediate',
        isActive: true
      }
    ];
    setAnnouncements(mockAnnouncements);
  }, []);

  const scheduleStream = () => {
    if (!newStream.title || !newStream.scheduledAt) {
      toast({
        title: "Invalid Stream",
        description: "Please provide a title and scheduled time",
        variant: "destructive"
      });
      return;
    }

    const stream: ScheduledStream = {
      id: Date.now().toString(),
      ...newStream,
      scheduledAt: new Date(newStream.scheduledAt),
      status: 'scheduled',
      thumbnail: '/api/placeholder/400/225'
    };

    setScheduledStreams(prev => [stream, ...prev]);
    setNewStream({
      title: '',
      description: '',
      scheduledAt: '',
      duration: 120,
      category: 'Gaming',
      notifyFollowers: true,
      autoStart: false,
      platforms: ['main'],
      isRecurring: false,
      recurringDays: []
    });
    setShowCreateForm(false);

    toast({
      title: "Stream Scheduled",
      description: `Stream scheduled for ${stream.scheduledAt.toLocaleString()}`
    });
  };

  const cancelStream = (streamId: string) => {
    setScheduledStreams(prev => 
      prev.map(stream => 
        stream.id === streamId 
          ? { ...stream, status: 'cancelled' as const }
          : stream
      )
    );
    
    toast({
      title: "Stream Cancelled",
      description: "Stream has been cancelled and followers have been notified"
    });
  };

  const deleteStream = (streamId: string) => {
    setScheduledStreams(prev => prev.filter(stream => stream.id !== streamId));
    toast({
      title: "Stream Deleted",
      description: "Stream has been removed from schedule"
    });
  };

  const useTemplate = (template: StreamTemplate) => {
    setNewStream(prev => ({
      ...prev,
      title: template.title.replace('{{username}}', 'Creator'),
      description: template.description,
      category: template.category
    }));
    setShowCreateForm(true);
  };

  const getStatusIcon = (status: ScheduledStream['status']) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'live': return <Play className="w-4 h-4 text-green-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-gray-500" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: ScheduledStream['status']) => {
    const variants = {
      scheduled: 'default',
      live: 'destructive',
      completed: 'secondary',
      cancelled: 'outline'
    } as const;
    
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Stream Scheduler
          </h3>
          <p className="text-muted-foreground">Schedule and manage your upcoming streams</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Schedule Stream
        </Button>
      </div>

      <Tabs defaultValue="scheduled" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-4">
          {/* Create Stream Form */}
          {showCreateForm && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule New Stream
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stream-title">Stream Title</Label>
                    <Input
                      id="stream-title"
                      placeholder="Epic Gaming Session"
                      value={newStream.title}
                      onChange={(e) => setNewStream(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stream-category">Category</Label>
                    <select
                      id="stream-category"
                      className="w-full h-10 px-3 border border-input rounded-md"
                      value={newStream.category}
                      onChange={(e) => setNewStream(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="Gaming">Gaming</option>
                      <option value="Art">Art</option>
                      <option value="Music">Music</option>
                      <option value="Education">Education</option>
                      <option value="Entertainment">Entertainment</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stream-description">Description</Label>
                  <Textarea
                    id="stream-description"
                    placeholder="Tell your audience what this stream will be about..."
                    value={newStream.description}
                    onChange={(e) => setNewStream(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stream-date">Scheduled Date & Time</Label>
                    <Input
                      id="stream-date"
                      type="datetime-local"
                      value={newStream.scheduledAt}
                      onChange={(e) => setNewStream(prev => ({ ...prev, scheduledAt: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stream-duration">Duration (minutes)</Label>
                    <Input
                      id="stream-duration"
                      type="number"
                      min="30"
                      max="720"
                      value={newStream.duration}
                      onChange={(e) => setNewStream(prev => ({ ...prev, duration: parseInt(e.target.value) || 120 }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notify-followers"
                      checked={newStream.notifyFollowers}
                      onCheckedChange={(checked) => setNewStream(prev => ({ ...prev, notifyFollowers: checked }))}
                    />
                    <Label htmlFor="notify-followers">Notify Followers</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-start"
                      checked={newStream.autoStart}
                      onCheckedChange={(checked) => setNewStream(prev => ({ ...prev, autoStart: checked }))}
                    />
                    <Label htmlFor="auto-start">Auto Start</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="recurring"
                      checked={newStream.isRecurring}
                      onCheckedChange={(checked) => setNewStream(prev => ({ ...prev, isRecurring: checked }))}
                    />
                    <Label htmlFor="recurring">Recurring</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={scheduleStream} className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Stream
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scheduled Streams List */}
          <div className="grid gap-4">
            {scheduledStreams.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No scheduled streams</h3>
                  <p className="text-muted-foreground">Schedule your first stream to get started!</p>
                </CardContent>
              </Card>
            ) : (
              scheduledStreams.map((stream) => (
                <Card key={stream.id} className={stream.status === 'live' ? 'border-green-500' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <img 
                          src={stream.thumbnail} 
                          alt={stream.title}
                          className="w-24 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-semibold">{stream.title}</h4>
                            {getStatusIcon(stream.status)}
                            {getStatusBadge(stream.status)}
                            {stream.isRecurring && (
                              <Badge variant="outline">
                                <Zap className="w-3 h-3 mr-1" />
                                Recurring
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {stream.scheduledAt.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {stream.duration} min
                            </div>
                            <Badge variant="outline">{stream.category}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {stream.platforms.map(platform => (
                              <Badge key={platform} variant="secondary" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {stream.status === 'scheduled' && (
                          <>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => cancelStream(stream.id)}
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteStream(stream.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="w-5 h-5" />
                Stream Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{template.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{template.title}</p>
                          <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{template.category}</Badge>
                            {template.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => useTemplate(template)}
                        >
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Auto Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{announcement.name}</span>
                        <Badge variant="outline">{announcement.platform}</Badge>
                        <Badge variant={announcement.timing === 'immediate' ? 'destructive' : 'secondary'}>
                          {announcement.timing}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{announcement.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={announcement.isActive}
                        onCheckedChange={() => {
                          setAnnouncements(prev => 
                            prev.map(a => 
                              a.id === announcement.id 
                                ? { ...a, isActive: !a.isActive }
                                : a
                            )
                          );
                        }}
                      />
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Scheduler Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get email reminders before scheduled streams</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-publish to Social Media</Label>
                  <p className="text-sm text-muted-foreground">Automatically post announcements to connected platforms</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Stream Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders to followers before scheduled streams</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Default Stream Duration (minutes)</Label>
                <Input type="number" defaultValue="120" min="30" max="720" />
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <select className="w-full h-10 px-3 border border-input rounded-md">
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Standard Time</option>
                  <option value="PST">Pacific Standard Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreamScheduler;