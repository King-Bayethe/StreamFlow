-- Clean up duplicate profiles and add unique constraint
-- First, create a backup of profiles data
CREATE TABLE IF NOT EXISTS profiles_backup AS SELECT * FROM profiles;

-- Remove duplicates, keeping the most recent profile for each user_id
DELETE FROM profiles 
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id
  FROM profiles
  ORDER BY user_id, created_at DESC
);

-- Add unique constraint to prevent future duplicates
ALTER TABLE profiles 
ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);