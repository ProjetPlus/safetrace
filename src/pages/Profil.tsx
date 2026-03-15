import { useState, useEffect } from "react";
import { User, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import LocationSelector from "@/components/LocationSelector";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Profil = () => {
  const { toast } = useToast();
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [emailSecours, setEmailSecours] = useState("");
  const [telSecours, setTelSecours] = useState("");
  const [contactUrgenceNom, setContactUrgenceNom] = useState("");
  const [contactUrgenceTel, setContactUrgenceTel] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });

  useEffect(() => {
    if (profile) {
      setNom(profile.nom || "");
      setPrenoms(profile.prenoms || "");
      setWhatsapp(profile.whatsapp || "");
      // Fetch full profile to get all fields
      const fetchFull = async () => {
        const { data } = await supabase.from("profiles").select("*").eq("id", profile.id).single();
        if (data) {
          setEmailSecours(data.email_secours || "");
          setTelSecours(data.tel_secours || "");
          setContactUrgenceNom(data.contact_urgence_nom || "");
          setContactUrgenceTel(data.contact_urgence_tel || "");
          setLocation({
            village: data.village || "",
            sousPrefecture: data.sous_prefecture || "",
            departement: data.departement || "",
            region: data.region || "",
            district: data.district || "",
          });
        }
      };
      fetchFull();
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        nom,
        prenoms,
        whatsapp,
        email_secours: emailSecours || null,
        tel_secours: telSecours || null,
        contact_urgence_nom: contactUrgenceNom || null,
        contact_urgence_tel: contactUrgenceTel || null,
        village: location.village || null,
        sous_prefecture: location.sousPrefecture || null,
        departement: location.departement || null,
        region: location.region || null,
        district: location.district || null,
      })
      .eq("id", profile.id);

    setLoading(false);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    await refreshProfile();
    toast({ title: "✅ Profil mis à jour avec succès" });
  };

  return (
    <Layout>
      <section className="py-8 md:py-16 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-lg">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/tableau-de-bord"><ArrowLeft className="h-4 w-4 mr-2" /> Tableau de bord</Link>
          </Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">Mon profil</CardTitle>
                {profile && <p className="text-sm text-muted-foreground">@{profile.username} · {profile.user_type}</p>}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Nom</Label>
                      <Input value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Prénoms</Label>
                      <Input value={prenoms} onChange={(e) => setPrenoms(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>WhatsApp</Label>
                    <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email de secours</Label>
                    <Input value={emailSecours} onChange={(e) => setEmailSecours(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tél. de secours</Label>
                    <Input value={telSecours} onChange={(e) => setTelSecours(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Personne d'urgence</Label>
                      <Input value={contactUrgenceNom} onChange={(e) => setContactUrgenceNom(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Tél. urgence</Label>
                      <Input value={contactUrgenceTel} onChange={(e) => setContactUrgenceTel(e.target.value)} />
                    </div>
                  </div>
                  <LocationSelector value={location} onChange={setLocation} />
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Enregistrement…" : "Enregistrer les modifications"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Profil;
