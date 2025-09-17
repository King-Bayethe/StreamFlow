-- Fix the search path for the calculate_pin_duration function
CREATE OR REPLACE FUNCTION public.calculate_pin_duration(amount_cents integer)
RETURNS interval
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  CASE
    WHEN amount_cents >= 1000 THEN RETURN interval '5 minutes';
    WHEN amount_cents >= 500 THEN RETURN interval '2 minutes';
    WHEN amount_cents >= 100 THEN RETURN interval '30 seconds';
    ELSE RETURN interval '0 seconds';
  END CASE;
END;
$function$