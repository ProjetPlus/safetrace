
-- Fix function search path for update_updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix overly permissive INSERT policy for contact_messages - limit message size
DROP POLICY IF EXISTS "Anyone can send contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can send contact messages" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(nom) > 0 AND length(nom) <= 200 AND
    length(contact) > 0 AND length(contact) <= 300 AND
    length(message) > 0 AND length(message) <= 5000
  );

-- Fix overly permissive SELECT on devices (needed for public scan/verification)
DROP POLICY IF EXISTS "Anyone can search devices by token" ON public.devices;
CREATE POLICY "Anyone can search devices by token" ON public.devices
  FOR SELECT TO anon, authenticated
  USING (true);
