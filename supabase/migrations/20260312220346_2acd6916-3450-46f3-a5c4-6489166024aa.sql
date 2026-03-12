
-- Create a function to promote a user to admin by username
CREATE OR REPLACE FUNCTION public.promote_to_admin(target_username TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  SELECT id INTO target_user_id FROM public.profiles WHERE username = target_username;
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found: %', target_username;
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;
