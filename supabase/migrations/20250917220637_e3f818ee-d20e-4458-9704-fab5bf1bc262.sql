-- Fix the update_user_role_from_onboarding function to work with our table structure
CREATE OR REPLACE FUNCTION public.update_user_role_from_onboarding(_user_id uuid, _selected_role app_role)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Delete existing role
  DELETE FROM public.user_roles WHERE user_id = _user_id;
  
  -- Insert new role
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (_user_id, _selected_role, _user_id);
END;
$function$;