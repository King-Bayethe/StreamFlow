-- Phase 1: Fix Database Schema & Triggers for User Onboarding

-- First, check if triggers exist and drop them if needed
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_role_created ON auth.users;

-- Create the trigger to handle new user setup (profiles + business profiles)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_setup();

-- Create the trigger to assign default user role
CREATE TRIGGER on_auth_user_role_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Add unique constraint on usernames in profiles table if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_username_unique') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_unique UNIQUE (username);
    END IF;
END $$;

-- Add onboarding_completed column to user_profiles if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'onboarding_completed') THEN
        ALTER TABLE public.user_profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Add selected_role column to user_profiles to track chosen role during onboarding
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'selected_role') THEN
        ALTER TABLE public.user_profiles ADD COLUMN selected_role TEXT DEFAULT 'user';
    END IF;
END $$;

-- Create function to update user role based on onboarding selection
CREATE OR REPLACE FUNCTION public.update_user_role_from_onboarding(_user_id uuid, _selected_role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete existing role
  DELETE FROM public.user_roles WHERE user_id = _user_id;
  
  -- Insert new role
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (_user_id, _selected_role, _user_id);
  
  -- Update user profile
  UPDATE public.user_profiles 
  SET selected_role = _selected_role::text,
      onboarding_completed = true
  WHERE user_id = _user_id OR id = _user_id;
END;
$$;

-- Create function to check if username is available
CREATE OR REPLACE FUNCTION public.is_username_available(_username text, _user_id uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _user_id IS NULL THEN
    RETURN NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = _username);
  ELSE
    RETURN NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = _username AND user_id != _user_id);
  END IF;
END;
$$;