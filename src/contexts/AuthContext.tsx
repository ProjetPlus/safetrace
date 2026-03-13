import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string;
  nom: string;
  prenoms: string;
  email: string;
  whatsapp: string;
  user_type: "particulier" | "commercant" | "entreprise" | "assurance" | "forces_securite";
  avatar_url: string | null;
  nom_entreprise: string | null;
  nom_compagnie: string | null;
  grade: string | null;
  matricule: string | null;
  unite: string | null;
  village: string | null;
  region: string | null;
  departement: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{ error: any }>;
  signIn: (username: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface SignUpData {
  username: string;
  nom: string;
  prenoms: string;
  email: string;
  whatsapp: string;
  password: string;
  user_type: string;
  location?: any;
  email_secours?: string;
  tel_secours?: string;
  contact_urgence_nom?: string;
  contact_urgence_tel?: string;
  // Merchant fields
  nom_entreprise?: string;
  numero_registre_commerce?: string;
  secteur_activite?: string;
  // Insurance fields
  nom_compagnie?: string;
  numero_agrement?: string;
  // Forces fields
  grade?: string;
  matricule?: string;
  unite?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    setProfile(data as Profile | null);

    // Check admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    setIsAdmin(roles?.some((r: any) => r.role === "admin") || false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (data: SignUpData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          username: data.username,
          nom: data.nom,
          prenoms: data.prenoms,
          whatsapp: data.whatsapp,
          user_type: data.user_type,
        },
      },
    });
    
    if (!error) {
      // Update profile with additional fields after creation
      // The trigger will create the basic profile
    }
    
    return { error };
  };

  const signIn = async (username: string, password: string) => {
    // First look up the email by username
    const { data: profileData } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", username)
      .maybeSingle();

    if (!profileData?.email) {
      return { error: { message: "Nom d'utilisateur introuvable." } };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: profileData.email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsAdmin(false);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, isAdmin, loading, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
