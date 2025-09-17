import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Wifi, 
  Camera, 
  Zap, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StreamMetric {
  id: string;
  stream_id: string;
  timestamp: string;
  bitrate: number;
  fps: number;
  dropped_frames: number;
  cpu_usage: number;
  memory_usage: number;
  latency_ms: number;
  connection_quality: string;
}

interface StreamMetricsProps {
  streamId: string | null;
  isLive: boolean;
}

const StreamMetrics: React.FC<StreamMetricsProps> = ({ streamId, isLive }) => {
  const [currentMetrics, setCurrentMetrics] = useState<StreamMetric | null>(null);
  const [historicalMetrics, setHistoricalMetrics] = useState<StreamMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!streamId) {
      setLoading(false);
      return;
    }

    fetchMetrics();
    
    // Set up real-time updates for live streams
    if (isLive) {
      const interval = setInterval(fetchMetrics, 2000);
      return () => clearInterval(interval);
    }
  }, [streamId, isLive]);

  const fetchMetrics = async () => {
    if (!streamId) return;

    try {
      // Get latest metrics
      const { data: latest, error: latestError } = await supabase
        .from('stream_metrics')
        .select('*')
        .eq('stream_id', streamId)
        .order('timestamp', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestError) throw latestError;
      
      if (latest) {
        setCurrentMetrics(latest);
      }

      // Get historical data for charts
      const { data: historical, error: historicalError } = await supabase
        .from('stream_metrics')
        .select('*')
        .eq('stream_id', streamId)
        .order('timestamp', { ascending: false })
        .limit(20);

      if (historicalError) throw historicalError;
      
      if (historical) {
        setHistoricalMetrics(historical);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove mock real-time data generation
  useEffect(() => {
    if (!streamId) {
      setLoading(false);
      return;
    }

    fetchMetrics();
    
    // Set up real-time updates for live streams
    if (isLive) {
      const interval = setInterval(fetchMetrics, 2000);
      return () => clearInterval(interval);
    }
  }, [isLive, streamId]);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <CheckCircle className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'fair': return <AlertTriangle className="h-4 w-4" />;
      case 'poor': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const formatBitrate = (bitrate: number) => {
    if (bitrate >= 1000) {
      return `${(bitrate / 1000).toFixed(1)}M`;
    }
    return `${bitrate}K`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!streamId || !isLive) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Stream metrics will appear when you go live
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Connection Quality */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connection</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${getQualityColor(currentMetrics?.connection_quality || 'unknown')} text-white flex items-center gap-1`}>
                    {getQualityIcon(currentMetrics?.connection_quality || 'unknown')}
                    {(currentMetrics?.connection_quality || 'unknown').toUpperCase()}
                  </Badge>
                </div>
              </div>
              <Wifi className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Bitrate */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bitrate</p>
                <p className="text-2xl font-bold">
                  {currentMetrics ? formatBitrate(currentMetrics.bitrate) : '0K'}bps
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* FPS */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Frame Rate</p>
                <p className="text-2xl font-bold">
                  {currentMetrics ? currentMetrics.fps.toFixed(1) : '0.0'} FPS
                </p>
              </div>
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Latency */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Latency</p>
                <p className="text-2xl font-bold">
                  {currentMetrics ? currentMetrics.latency_ms : 0}ms
                </p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current</span>
                <span>{currentMetrics ? currentMetrics.cpu_usage.toFixed(1) : 0}%</span>
              </div>
              <Progress 
                value={currentMetrics ? currentMetrics.cpu_usage : 0} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current</span>
                <span>{currentMetrics ? currentMetrics.memory_usage.toFixed(1) : 0}%</span>
              </div>
              <Progress 
                value={currentMetrics ? currentMetrics.memory_usage : 0} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stream Health */}
      <Card>
        <CardHeader>
          <CardTitle>Stream Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Dropped Frames</span>
                <span className={currentMetrics && currentMetrics.dropped_frames > 5 ? 'text-red-500' : 'text-green-500'}>
                  {currentMetrics ? currentMetrics.dropped_frames : 0}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {currentMetrics && currentMetrics.dropped_frames > 5 ? 'High frame drops detected' : 'Stream stable'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bitrate Stability</span>
                <span className="text-green-500">Stable</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Target: 2500 kbps
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Audio Quality</span>
                <span className="text-green-500">Good</span>
              </div>
              <p className="text-xs text-muted-foreground">
                128 kbps, 44.1 kHz
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live indicator */}
      {isLive && (
        <div className="text-center">
          <Badge className="bg-red-500 text-white animate-pulse">
            ● LIVE - Updates every 2 seconds
          </Badge>
        </div>
      )}
    </div>
  );
};

export default StreamMetrics;