
-- Create trigger for auto-creating profiles on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to get email by username (for username-based login)
CREATE OR REPLACE FUNCTION public.get_email_by_username(p_username text)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM public.profiles WHERE username = p_username LIMIT 1;
$$;

-- Allow anon and authenticated to call this function
GRANT EXECUTE ON FUNCTION public.get_email_by_username(text) TO anon, authenticated;

-- Create storage bucket for device photos
INSERT INTO storage.buckets (id, name, public) VALUES ('device-photos', 'device-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy for device photos
CREATE POLICY "Users can upload device photos" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'device-photos');

CREATE POLICY "Anyone can view device photos" ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'device-photos');

CREATE POLICY "Users can delete own device photos" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'device-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
