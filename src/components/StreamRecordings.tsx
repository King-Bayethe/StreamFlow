import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Play, 
  Download, 
  Eye, 
  Calendar, 
  Clock,
  Search,
  MoreHorizontal,
  Trash2,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Recording {
  id: string;
  stream_id: string;
  title: string;
  duration_seconds: number;
  file_size_mb: number;
  video_url?: string;
  thumbnail_url?: string;
  view_count: number;
  is_public: boolean;
  created_at: string;
}

interface StreamRecordingsProps {
  userId: string;
}

const StreamRecordings: React.FC<StreamRecordingsProps> = ({ userId }) => {
  const { toast } = useToast();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchRecordings();
  }, [userId]);

  const fetchRecordings = async () => {
    try {
      const { data, error } = await supabase
        .from('stream_recordings')
        .select(`
          *,
          streams!inner(creator_id)
        `)
        .eq('streams.creator_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add mock data for demo
      const mockRecordings: Recording[] = [
        {
          id: '1',
          stream_id: 'stream-1',
          title: 'Epic Gaming Session - Part 1',
          duration_seconds: 7200,
          file_size_mb: 1024,
          video_url: '/recordings/stream1.mp4',
          thumbnail_url: '/thumbnails/stream1.jpg',
          view_count: 1247,
          is_public: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '2',
          stream_id: 'stream-2',
          title: 'Late Night Coding Stream',
          duration_seconds: 5400,
          file_size_mb: 756,
          video_url: '/recordings/stream2.mp4',
          thumbnail_url: '/thumbnails/stream2.jpg',
          view_count: 892,
          is_public: true,
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: '3',
          stream_id: 'stream-3',
          title: 'Private Test Stream',
          duration_seconds: 1800,
          file_size_mb: 234,
          video_url: '/recordings/stream3.mp4',
          thumbnail_url: '/thumbnails/stream3.jpg',
          view_count: 12,
          is_public: false,
          created_at: new Date(Date.now() - 259200000).toISOString(),
        }
      ];

      setRecordings(data?.length > 0 ? data : mockRecordings);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      toast({
        title: "Error",
        description: "Failed to load recordings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRecording = async (id: string, updates: Partial<Recording>) => {
    try {
      const { error } = await supabase
        .from('stream_recordings')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setRecordings(prev => 
        prev.map(recording => 
          recording.id === id ? { ...recording, ...updates } : recording
        )
      );

      toast({
        title: "Success",
        description: "Recording updated successfully",
      });
    } catch (error) {
      console.error('Error updating recording:', error);
      toast({
        title: "Error",
        description: "Failed to update recording",
        variant: "destructive",
      });
    }
  };

  const deleteRecording = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stream_recordings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRecordings(prev => prev.filter(recording => recording.id !== id));

      toast({
        title: "Success",
        description: "Recording deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting recording:', error);
      toast({
        title: "Error",
        description: "Failed to delete recording",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatFileSize = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(0)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRecordings = recordings.filter(recording =>
    recording.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex gap-4">
                  <div className="w-32 h-20 bg-muted rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold">Stream Recordings</h2>
          <p className="text-muted-foreground">
            Manage your recorded streams and replays
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recordings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Recordings</p>
                <p className="text-2xl font-bold">{recordings.length}</p>
              </div>
              <Play className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">
                  {recordings.reduce((sum, r) => sum + r.view_count, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">
                  {formatFileSize(recordings.reduce((sum, r) => sum + r.file_size_mb, 0))}
                </p>
              </div>
              <Download className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Public Videos</p>
                <p className="text-2xl font-bold">
                  {recordings.filter(r => r.is_public).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recordings List */}
      <div className="space-y-4">
        {filteredRecordings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recordings found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'Your recorded streams will appear here'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRecordings.map((recording) => (
            <Card key={recording.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-32 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    {recording.thumbnail_url ? (
                      <img 
                        src={recording.thumbnail_url} 
                        alt={recording.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Play className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {editingId === recording.id ? (
                          <Input
                            value={recording.title}
                            onChange={(e) => setRecordings(prev =>
                              prev.map(r => r.id === recording.id ? { ...r, title: e.target.value } : r)
                            )}
                            onBlur={() => {
                              updateRecording(recording.id, { title: recording.title });
                              setEditingId(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                updateRecording(recording.id, { title: recording.title });
                                setEditingId(null);
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <h3 className="text-lg font-semibold truncate">{recording.title}</h3>
                        )}
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(recording.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDuration(recording.duration_seconds)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {recording.view_count.toLocaleString()} views
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant={recording.is_public ? "default" : "secondary"}>
                            {recording.is_public ? "Public" : "Private"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatFileSize(recording.file_size_mb)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`public-${recording.id}`} className="text-sm">
                            Public
                          </Label>
                          <Switch
                            id={`public-${recording.id}`}
                            checked={recording.is_public}
                            onCheckedChange={(checked) => 
                              updateRecording(recording.id, { is_public: checked })
                            }
                          />
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingId(recording.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Title
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(recording.video_url, '_blank')}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteRecording(recording.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default StreamRecordings;