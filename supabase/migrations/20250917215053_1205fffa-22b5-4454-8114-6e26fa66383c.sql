-- Extend creator_profiles table with channel setup fields
ALTER TABLE public.creator_profiles 
ADD COLUMN IF NOT EXISTS content_categories TEXT[],
ADD COLUMN IF NOT EXISTS streaming_schedule JSONB DEFAULT '{"days": [], "time_slots": []}',
ADD COLUMN IF NOT EXISTS monetization_goals TEXT[],
ADD COLUMN IF NOT EXISTS setup_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS setup_step INTEGER DEFAULT 0;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_creator_profiles_setup_completed ON public.creator_profiles(setup_completed);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_content_categories ON public.creator_profiles USING GIN(content_categories);