-- Fix security warnings by setting search_path on functions
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
SET search_path = public
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

-- Fix search_path for regenerate_stream_key function
CREATE OR REPLACE FUNCTION public.regenerate_stream_key(_stream_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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