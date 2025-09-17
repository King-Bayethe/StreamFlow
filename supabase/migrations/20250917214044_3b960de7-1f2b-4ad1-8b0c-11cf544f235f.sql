-- Remove duplicate/conflicting user role triggers
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_role_created ON auth.users;

-- Drop the old handle_new_user_role function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user_role();

-- Ensure we only have the correct trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();