-- Create channels table
CREATE TABLE public.channels (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id uuid NOT NULL,
  name text NOT NULL,
  display_name text,
  description text,
  category text,
  tags text[],
  banner_url text,
  logo_url text,
  trailer_url text,
  social_links jsonb DEFAULT '{}',
  channel_settings jsonb DEFAULT '{
    "notifications_enabled": true,
    "chat_enabled": true,
    "subscriber_only_chat": false,
    "mature_content": false,
    "allow_clips": true
  }',
  follower_count integer NOT NULL DEFAULT 0,
  total_views integer NOT NULL DEFAULT 0,
  total_streams integer NOT NULL DEFAULT 0,
  average_viewers integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  verified boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_stream_at timestamp with time zone,
  
  UNIQUE(creator_id),
  UNIQUE(name)
);

-- Enable Row Level Security
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Channels are viewable by everyone" 
ON public.channels 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Creators can manage their own channels" 
ON public.channels 
FOR ALL 
USING (auth.uid() = creator_id)
WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Admins can manage all channels" 
ON public.channels 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for better performance
CREATE INDEX idx_channels_creator_id ON public.channels(creator_id);
CREATE INDEX idx_channels_name ON public.channels(name);
CREATE INDEX idx_channels_category ON public.channels(category);
CREATE INDEX idx_channels_status ON public.channels(status);
CREATE INDEX idx_channels_featured ON public.channels(featured);
CREATE INDEX idx_channels_verified ON public.channels(verified);
CREATE INDEX idx_channels_tags ON public.channels USING GIN(tags);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_channels_updated_at
BEFORE UPDATE ON public.channels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update channel stats
CREATE OR REPLACE FUNCTION public.update_channel_stats(_channel_id uuid, _follower_change integer DEFAULT 0, _view_change integer DEFAULT 0)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.channels 
  SET 
    follower_count = GREATEST(0, follower_count + _follower_change),
    total_views = GREATEST(0, total_views + _view_change),
    updated_at = now()
  WHERE id = _channel_id;
END;
$$;