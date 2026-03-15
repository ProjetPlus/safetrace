-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for avatars bucket
CREATE POLICY "Users can upload their avatar" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their avatar" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'avatars');

-- Allow anyone to insert notifications (for scan alerts from anon users)
CREATE POLICY "Anyone can create notifications for scan alerts" ON public.notifications FOR INSERT TO anon
WITH CHECK (true);

-- Allow public to read profiles for scan results (limited info)  
CREATE POLICY "Public can read basic profile info" ON public.profiles FOR SELECT TO anon
USING (true);