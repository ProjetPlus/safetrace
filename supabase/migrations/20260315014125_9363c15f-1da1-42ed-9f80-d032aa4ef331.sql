INSERT INTO public.user_roles (user_id, role) 
VALUES ('c18a4eed-39d4-4535-ab7f-98dca83c449c', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;