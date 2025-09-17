-- Fix RLS disabled security issue for profiles_backup table
ALTER TABLE profiles_backup ENABLE ROW LEVEL SECURITY;

-- Create a restrictive policy for the backup table (admin only)
CREATE POLICY "Admin only access to profiles backup" ON profiles_backup
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);