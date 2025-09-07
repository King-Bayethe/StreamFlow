-- Create streams table for managing live streams
CREATE TABLE public.streams (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Untitled Stream',
  description text DEFAULT '',
  rtmp_key text NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  stream_key text NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  hls_url text,
  thumbnail_url text,
  status text NOT NULL DEFAULT 'offline' CHECK (status IN ('offline', 'starting', 'live', 'ending')),
  viewer_count integer NOT NULL DEFAULT 0,
  max_viewers integer NOT NULL DEFAULT 0,
  is_recording boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  started_at timestamp with time zone,
  ended_at timestamp with time zone
);

-- Create stream_sessions table for tracking individual streaming sessions
CREATE TABLE public.stream_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stream_id uuid NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  session_start timestamp with time zone NOT NULL DEFAULT now(),
  session_end timestamp with time zone,
  duration_seconds integer,
  peak_viewers integer NOT NULL DEFAULT 0,
  total_messages integer NOT NULL DEFAULT 0,
  total_tips numeric(10,2) NOT NULL DEFAULT 0,
  avg_bitrate integer,
  quality_score numeric(3,2),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create stream_metrics table for real-time streaming health data
CREATE TABLE public.stream_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stream_id uuid NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  bitrate integer NOT NULL DEFAULT 0,
  fps numeric(4,1) NOT NULL DEFAULT 0,
  dropped_frames integer NOT NULL DEFAULT 0,
  cpu_usage numeric(5,2) NOT NULL DEFAULT 0,
  memory_usage numeric(5,2) NOT NULL DEFAULT 0,
  latency_ms integer NOT NULL DEFAULT 0,
  connection_quality text NOT NULL DEFAULT 'unknown' CHECK (connection_quality IN ('excellent', 'good', 'fair', 'poor', 'unknown'))
);

-- Create stream_recordings table for VOD management
CREATE TABLE public.stream_recordings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stream_id uuid NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  session_id uuid REFERENCES public.stream_sessions(id) ON DELETE SET NULL,
  title text NOT NULL,
  duration_seconds integer NOT NULL DEFAULT 0,
  file_size_mb numeric(10,2) NOT NULL DEFAULT 0,
  video_url text,
  thumbnail_url text,
  view_count integer NOT NULL DEFAULT 0,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_recordings ENABLE ROW LEVEL SECURITY;

-- RLS policies for streams table
CREATE POLICY "Creators can manage their own streams"
ON public.streams
FOR ALL
USING (auth.uid() = creator_id)
WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Anyone can view live streams"
ON public.streams
FOR SELECT
USING (status = 'live');

-- RLS policies for stream_sessions table
CREATE POLICY "Creators can view their stream sessions"
ON public.stream_sessions
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.streams s 
  WHERE s.id = stream_sessions.stream_id 
  AND s.creator_id = auth.uid()
));

-- RLS policies for stream_metrics table
CREATE POLICY "Creators can view their stream metrics"
ON public.stream_metrics
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.streams s 
  WHERE s.id = stream_metrics.stream_id 
  AND s.creator_id = auth.uid()
));

CREATE POLICY "System can insert stream metrics"
ON public.stream_metrics
FOR INSERT
WITH CHECK (true);

-- RLS policies for stream_recordings table
CREATE POLICY "Creators can manage their recordings"
ON public.stream_recordings
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.streams s 
  WHERE s.id = stream_recordings.stream_id 
  AND s.creator_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.streams s 
  WHERE s.id = stream_recordings.stream_id 
  AND s.creator_id = auth.uid()
));

CREATE POLICY "Anyone can view public recordings"
ON public.stream_recordings
FOR SELECT
USING (is_public = true);

-- Create indexes for performance
CREATE INDEX idx_streams_creator_id ON public.streams(creator_id);
CREATE INDEX idx_streams_status ON public.streams(status);
CREATE INDEX idx_stream_sessions_stream_id ON public.stream_sessions(stream_id);
CREATE INDEX idx_stream_metrics_stream_id ON public.stream_metrics(stream_id);
CREATE INDEX idx_stream_metrics_timestamp ON public.stream_metrics(timestamp);
CREATE INDEX idx_stream_recordings_stream_id ON public.stream_recordings(stream_id);

-- Create function to update stream metrics in real-time
CREATE OR REPLACE FUNCTION public.update_stream_metrics(
  _stream_id uuid,
  _bitrate integer,
  _fps numeric,
  _dropped_frames integer,
  _cpu_usage numeric,
  _memory_usage numeric,
  _latency_ms integer,
  _connection_quality text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.stream_metrics (
    stream_id, bitrate, fps, dropped_frames, cpu_usage, 
    memory_usage, latency_ms, connection_quality
  )
  VALUES (
    _stream_id, _bitrate, _fps, _dropped_frames, _cpu_usage,
    _memory_usage, _latency_ms, _connection_quality
  );
END;
$$;

-- Create function to generate new stream key
CREATE OR REPLACE FUNCTION public.regenerate_stream_key(_stream_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_key text;
BEGIN
  new_key := encode(gen_random_bytes(32), 'hex');
  
  UPDATE public.streams 
  SET stream_key = new_key 
  WHERE id = _stream_id AND creator_id = auth.uid();
  
  RETURN new_key;
END;
$$;