
-- User types enum
CREATE TYPE public.user_type AS ENUM ('particulier', 'commercant', 'entreprise', 'assurance', 'forces_securite');

-- App roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Device categories enum
CREATE TYPE public.device_category AS ENUM ('telephone', 'ordinateur', 'televiseur', 'electromenager', 'voiture', 'moto');

-- Device status enum
CREATE TYPE public.device_status AS ENUM ('propre', 'vole', 'perdu', 'enquete', 'retrouve');

-- Incident type enum
CREATE TYPE public.incident_type AS ENUM ('vol', 'perte', 'tentative');

-- Payment status enum
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Transfer status enum
CREATE TYPE public.transfer_status AS ENUM ('pending', 'accepted', 'rejected', 'cancelled');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenoms TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT,
  user_type public.user_type NOT NULL DEFAULT 'particulier',
  avatar_url TEXT,
  email_secours TEXT,
  tel_secours TEXT,
  contact_urgence_nom TEXT,
  contact_urgence_tel TEXT,
  village TEXT,
  sous_prefecture TEXT,
  departement TEXT,
  region TEXT,
  district TEXT,
  -- Merchant-specific fields
  nom_entreprise TEXT,
  numero_registre_commerce TEXT,
  secteur_activite TEXT,
  -- Insurance-specific fields
  nom_compagnie TEXT,
  numero_agrement TEXT,
  -- Forces de sécurité-specific fields
  grade TEXT,
  matricule TEXT,
  unite TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Devices table
CREATE TABLE public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  categorie public.device_category NOT NULL,
  marque TEXT NOT NULL,
  modele TEXT,
  couleur TEXT,
  annee_achat INTEGER,
  description TEXT,
  imei1 TEXT,
  imei2 TEXT,
  num_serie TEXT,
  operateur TEXT,
  chassis TEXT,
  plaque TEXT,
  statut public.device_status NOT NULL DEFAULT 'propre',
  village TEXT,
  sous_prefecture TEXT,
  departement TEXT,
  region TEXT,
  district TEXT,
  photos TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reports (signalements)
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES public.devices(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type_incident public.incident_type NOT NULL,
  date_incident DATE NOT NULL,
  heure_incident TIME,
  circonstances TEXT,
  village TEXT,
  sous_prefecture TEXT,
  departement TEXT,
  region TEXT,
  district TEXT,
  photo_plainte_url TEXT,
  numero_dossier TEXT UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payments
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  device_id UUID REFERENCES public.devices(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XOF',
  payment_method TEXT NOT NULL DEFAULT 'wave',
  payment_reference TEXT,
  wave_checkout_id TEXT,
  status public.payment_status NOT NULL DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Transfers
CREATE TABLE public.transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES public.devices(id) ON DELETE CASCADE NOT NULL,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  motif TEXT,
  status public.transfer_status NOT NULL DEFAULT 'pending',
  payment_id UUID REFERENCES public.payments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Merchant subscriptions
CREATE TABLE public.merchant_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL,
  max_registrations_per_month INTEGER,
  price INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  payment_id UUID REFERENCES public.payments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for devices
CREATE POLICY "Users can view their own devices" ON public.devices FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own devices" ON public.devices FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own devices" ON public.devices FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own devices" ON public.devices FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all devices" ON public.devices FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can search devices by token" ON public.devices FOR SELECT TO anon, authenticated USING (true);

-- RLS Policies for reports
CREATE POLICY "Users can view their own reports" ON public.reports FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can create reports" ON public.reports FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own reports" ON public.reports FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all reports" ON public.reports FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Forces can view all reports" ON public.reports FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'forces_securite')
);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can create payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage all payments" ON public.payments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for transfers
CREATE POLICY "Users can view their own transfers" ON public.transfers FOR SELECT TO authenticated USING (from_user_id = auth.uid() OR to_user_id = auth.uid());
CREATE POLICY "Users can create transfers" ON public.transfers FOR INSERT TO authenticated WITH CHECK (from_user_id = auth.uid());
CREATE POLICY "Users can update their received transfers" ON public.transfers FOR UPDATE TO authenticated USING (to_user_id = auth.uid());
CREATE POLICY "Admins can manage all transfers" ON public.transfers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for merchant_subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.merchant_subscriptions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can create subscriptions" ON public.merchant_subscriptions FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage all subscriptions" ON public.merchant_subscriptions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for contact_messages
CREATE POLICY "Anyone can send contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all notifications" ON public.notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, nom, prenoms, email, whatsapp, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'nom', ''),
    COALESCE(NEW.raw_user_meta_data->>'prenoms', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'whatsapp', ''),
    COALESCE((NEW.raw_user_meta_data->>'user_type')::public.user_type, 'particulier')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON public.devices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_transfers_updated_at BEFORE UPDATE ON public.transfers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Enable realtime on key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.devices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transfers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;

-- Create indexes for performance
CREATE INDEX idx_devices_user_id ON public.devices(user_id);
CREATE INDEX idx_devices_token ON public.devices(token);
CREATE INDEX idx_devices_statut ON public.devices(statut);
CREATE INDEX idx_devices_imei1 ON public.devices(imei1);
CREATE INDEX idx_devices_chassis ON public.devices(chassis);
CREATE INDEX idx_devices_plaque ON public.devices(plaque);
CREATE INDEX idx_devices_num_serie ON public.devices(num_serie);
CREATE INDEX idx_reports_device_id ON public.reports(device_id);
CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_transfers_device_id ON public.transfers(device_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
