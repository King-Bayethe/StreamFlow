-- Create specialized profile tables for creators and viewers

-- Creator profiles table for streamers/content creators
CREATE TABLE public.creator_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL UNIQUE,
  display_name text,
  avatar_url text,
  bio text,
  website_url text,
  twitter_url text,
  instagram_url text,
  youtube_url text,
  facebook_url text,
  linkedin_url text,
  follower_count integer NOT NULL DEFAULT 0,
  total_earnings_cents integer NOT NULL DEFAULT 0,
  stream_count integer NOT NULL DEFAULT 0,
  average_viewers integer NOT NULL DEFAULT 0,
  is_verified boolean NOT NULL DEFAULT false,
  branding_color text DEFAULT '#6366f1',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Viewer profiles table for regular users/viewers
CREATE TABLE public.viewer_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL UNIQUE,
  display_name text,
  avatar_url text,
  bio text,
  total_spent_cents integer NOT NULL DEFAULT 0,
  favorite_categories text[],
  notification_preferences jsonb DEFAULT '{"stream_start": true, "creator_announcements": true, "poll_notifications": false}'::jsonb,
  privacy_settings jsonb DEFAULT '{"show_activity": true, "show_tips": false, "show_watch_time": false}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for creator_profiles
CREATE POLICY "Creator profiles are viewable by everyone" 
ON public.creator_profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own creator profile" 
ON public.creator_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own creator profile" 
ON public.creator_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS policies for viewer_profiles
CREATE POLICY "Viewer profiles are viewable by owner and creators" 
ON public.viewer_profiles 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'creator'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can insert their own viewer profile" 
ON public.viewer_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own viewer profile" 
ON public.viewer_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Migrate data from existing tables
-- First, migrate creator data
INSERT INTO public.creator_profiles (
  user_id, username, display_name, avatar_url, bio, created_at, updated_at
)
SELECT DISTINCT ON (p.user_id)
  p.user_id,
  p.username,
  COALESCE(p.display_name, up.full_name, p.username),
  COALESCE(p.avatar_url, up.avatar_url),
  COALESCE(up.bio, ''),
  COALESCE(p.created_at, up.created_at, now()),
  COALESCE(p.updated_at, up.updated_at, now())
FROM profiles p
LEFT JOIN user_profiles up ON p.user_id = up.user_id OR p.user_id = up.id
INNER JOIN user_roles ur ON p.user_id = ur.user_id
WHERE ur.role IN ('creator', 'admin')
AND p.user_id IS NOT NULL;

-- Then, migrate viewer data  
INSERT INTO public.viewer_profiles (
  user_id, username, display_name, avatar_url, bio, created_at, updated_at
)
SELECT DISTINCT ON (p.user_id)
  p.user_id,
  p.username,
  COALESCE(p.display_name, up.full_name, p.username),
  COALESCE(p.avatar_url, up.avatar_url),
  COALESCE(up.bio, ''),
  COALESCE(p.created_at, up.created_at, now()),
  COALESCE(p.updated_at, up.updated_at, now())
FROM profiles p
LEFT JOIN user_profiles up ON p.user_id = up.user_id OR p.user_id = up.id
INNER JOIN user_roles ur ON p.user_id = ur.user_id
WHERE ur.role = 'user'
AND p.user_id IS NOT NULL;

-- Create update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_creator_profiles_updated_at
BEFORE UPDATE ON public.creator_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_viewer_profiles_updated_at
BEFORE UPDATE ON public.viewer_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_creator_profiles_user_id ON public.creator_profiles(user_id);
CREATE INDEX idx_creator_profiles_username ON public.creator_profiles(username);
CREATE INDEX idx_viewer_profiles_user_id ON public.viewer_profiles(user_id);
CREATE INDEX idx_viewer_profiles_username ON public.viewer_profiles(username);

-- Drop the old tables after migration (in order to avoid foreign key conflicts)
DROP TABLE IF EXISTS public.profiles_backup;
DROP TABLE IF EXISTS public.profiles;
DROP TABLE IF EXISTS public.user_profiles;