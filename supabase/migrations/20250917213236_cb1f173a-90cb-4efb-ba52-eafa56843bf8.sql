-- Fix the is_username_available function to work with the new profile tables
CREATE OR REPLACE FUNCTION public.is_username_available(_username text, _user_id uuid DEFAULT NULL::uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF _user_id IS NULL THEN
    -- Check if username exists in either creator_profiles or viewer_profiles
    RETURN NOT EXISTS (
      SELECT 1 FROM public.creator_profiles WHERE username = _username
      UNION
      SELECT 1 FROM public.viewer_profiles WHERE username = _username
    );
  ELSE
    -- Check if username exists for other users (excluding current user)
    RETURN NOT EXISTS (
      SELECT 1 FROM public.creator_profiles WHERE username = _username AND user_id != _user_id
      UNION
      SELECT 1 FROM public.viewer_profiles WHERE username = _username AND user_id != _user_id
    );
  END IF;
END;
$function$