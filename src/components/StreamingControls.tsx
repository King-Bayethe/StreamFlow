import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Copy, Eye, RefreshCw, Play, Square, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Stream {
  id: string;
  title: string;
  description: string;
  rtmp_key: string;
  stream_key: string;
  hls_url?: string;
  status: string;
  viewer_count: number;
  is_recording: boolean;
  started_at?: string;
  ended_at?: string;
  created_at?: string;
  creator_id?: string;
  max_viewers?: number;
  thumbnail_url?: string;
}

interface StreamingControlsProps {
  userId: string;
}

const StreamingControls: React.FC<StreamingControlsProps> = ({ userId }) => {
  const { toast } = useToast();
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchStreamData();
  }, [userId]);

  const fetchStreamData = async () => {
    try {
      const { data, error } = await supabase
        .from('streams')
        .select('*')
        .eq('creator_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // Create a new stream if none exists
        await createNewStream();
      } else {
        setStream(data);
      }
    } catch (error) {
      console.error('Error fetching stream:', error);
      toast({
        title: "Error",
        description: "Failed to load stream data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createNewStream = async () => {
    try {
      const { data, error } = await supabase
        .from('streams')
        .insert({
          creator_id: userId,
          title: 'My Live Stream',
          description: 'Live streaming with viewers!'
        })
        .select()
        .single();

      if (error) throw error;
      setStream(data);
    } catch (error) {
      console.error('Error creating stream:', error);
      toast({
        title: "Error",
        description: "Failed to create stream",
        variant: "destructive",
      });
    }
  };

  const updateStreamInfo = async (updates: Partial<Stream>) => {
    if (!stream) return;

    setUpdating(true);
    try {
      const { data, error } = await supabase
        .from('streams')
        .update(updates)
        .eq('id', stream.id)
        .select()
        .single();

      if (error) throw error;
      setStream(data);
      
      toast({
        title: "Success",
        description: "Stream updated successfully",
      });
    } catch (error) {
      console.error('Error updating stream:', error);
      toast({
        title: "Error",
        description: "Failed to update stream",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const toggleStreamStatus = async () => {
    if (!stream) return;

    const newStatus = stream.status === 'live' ? 'offline' : 'live';
    const updates: any = { 
      status: newStatus,
      started_at: newStatus === 'live' ? new Date().toISOString() : stream.started_at,
      ended_at: newStatus === 'offline' ? new Date().toISOString() : null
    };

    await updateStreamInfo(updates);
  };

  const regenerateStreamKey = async () => {
    if (!stream) return;

    try {
      const { data, error } = await supabase.rpc('regenerate_stream_key', {
        _stream_id: stream.id
      });

      if (error) throw error;

      setStream(prev => prev ? { ...prev, stream_key: data } : null);
      
      toast({
        title: "Success",
        description: "New stream key generated",
      });
    } catch (error) {
      console.error('Error regenerating key:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate stream key",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'starting': return 'bg-yellow-500';
      case 'ending': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <Circle className="h-3 w-3 fill-current" />;
      case 'starting': return <Play className="h-3 w-3" />;
      case 'ending': return <Square className="h-3 w-3" />;
      default: return <Square className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stream) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No stream found</p>
        </CardContent>
      </Card>
    );
  }

  const rtmpUrl = `rtmp://live.example.com/live`;

  return (
    <div className="space-y-6">
      {/* Stream Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className={`${getStatusColor(stream.status)} text-white flex items-center gap-1`}>
              {getStatusIcon(stream.status)}
              {stream.status.toUpperCase()}
            </Badge>
            Stream Status
            <div className="ml-auto flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-mono">{stream.viewer_count}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={toggleStreamStatus}
              disabled={updating}
              className={stream.status === 'live' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            >
              {stream.status === 'live' ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Stop Stream
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Go Live
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="recording">Recording</Label>
              <Switch
                id="recording"
                checked={stream.is_recording}
                onCheckedChange={(checked) => updateStreamInfo({ is_recording: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stream Info */}
      <Card>
        <CardHeader>
          <CardTitle>Stream Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Stream Title</Label>
            <Input
              id="title"
              value={stream.title}
              onChange={(e) => setStream(prev => prev ? { ...prev, title: e.target.value } : null)}
              onBlur={() => updateStreamInfo({ title: stream.title })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={stream.description}
              onChange={(e) => setStream(prev => prev ? { ...prev, description: e.target.value } : null)}
              onBlur={() => updateStreamInfo({ description: stream.description })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* RTMP Settings */}
      <Card>
        <CardHeader>
          <CardTitle>RTMP Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>RTMP Server URL</Label>
            <div className="flex gap-2">
              <Input value={rtmpUrl} readOnly className="font-mono text-sm" />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(rtmpUrl, 'RTMP URL')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Stream Key</Label>
              <Button 
                variant="outline" 
                size="sm"
                onClick={regenerateStreamKey}
                disabled={updating}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
            <div className="flex gap-2">
              <Input 
                value={stream.stream_key} 
                readOnly 
                className="font-mono text-sm"
                type="password"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(stream.stream_key, 'Stream Key')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">OBS Studio Setup</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Server:</strong> {rtmpUrl}</p>
              <p><strong>Stream Key:</strong> {stream.stream_key.substring(0, 8)}...</p>
              <p className="text-muted-foreground">
                Recommended settings: 1080p, 30fps, 2500-4000 kbps
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamingControls;