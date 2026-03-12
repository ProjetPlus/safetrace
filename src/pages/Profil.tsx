import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save, Shield } from "lucide-react";
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
  const [email, setEmail] = useState("");
  const [emailSecours, setEmailSecours] = useState("");
  const [telSecours, setTelSecours] = useState("");
  const [contactUrgenceNom, setContactUrgenceNom] = useState("");
  const [contactUrgenceTel, setContactUrgenceTel] = useState("");
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [nomCompagnie, setNomCompagnie] = useState("");
  const [grade, setGrade] = useState("");
  const [matricule, setMatricule] = useState("");
  const [unite, setUnite] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });

  useEffect(() => {
    if (profile) {
      setNom(profile.nom || "");
      setPrenoms(profile.prenoms || "");
      setWhatsapp(profile.whatsapp || "");
      setEmail(profile.email || "");
      setNomEntreprise(profile.nom_entreprise || "");
      setNomCompagnie(profile.nom_compagnie || "");
      setGrade(profile.grade || "");
      setMatricule(profile.matricule || "");
      setUnite(profile.unite || "");
      setLocation({
        village: profile.village || "",
        sousPrefecture: "",
        departement: profile.departement || "",
        region: profile.region || "",
        district: "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        nom, prenoms, whatsapp, email_secours: emailSecours,
        tel_secours: telSecours, contact_urgence_nom: contactUrgenceNom,
        contact_urgence_tel: contactUrgenceTel,
        village: location.village, departement: location.departement,
        region: location.region, district: location.district,
        nom_entreprise: nomEntreprise, nom_compagnie: nomCompagnie,
        grade, matricule, unite,
      })
      .eq("id", profile.id);

    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "✅ Profil mis à jour" });
      refreshProfile();
    }
  };

  const userTypeLabels: Record<string, string> = {
    particulier: "Particulier",
    commercant: "Commerçant / Revendeur",
    entreprise: "Entreprise",
    assurance: "Compagnie d'assurance",
    forces_securite: "Forces de sécurité",
  };

  return (
    <Layout>
      <section className="py-8 md:py-16 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">Mon Profil</CardTitle>
                {profile && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      @{profile.username}
                    </span>
                    <span className="bg-safe-green/10 text-safe-green text-xs font-medium px-3 py-1 rounded-full">
                      {userTypeLabels[profile.user_type] || profile.user_type}
                    </span>
                  </div>
                )}
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
                    <Label>Email</Label>
                    <Input value={email} disabled className="opacity-50" />
                  </div>

                  {profile?.user_type === "commercant" && (
                    <div className="space-y-3 border-t pt-4">
                      <Label className="font-display font-semibold">Informations commerçant</Label>
                      <Input value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} placeholder="Nom de l'entreprise" />
                    </div>
                  )}

                  {profile?.user_type === "assurance" && (
                    <div className="space-y-3 border-t pt-4">
                      <Label className="font-display font-semibold">Informations assurance</Label>
                      <Input value={nomCompagnie} onChange={(e) => setNomCompagnie(e.target.value)} placeholder="Nom de la compagnie" />
                    </div>
                  )}

                  {profile?.user_type === "forces_securite" && (
                    <div className="space-y-3 border-t pt-4">
                      <Label className="font-display font-semibold">Informations forces de sécurité</Label>
                      <Input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" />
                      <Input value={matricule} onChange={(e) => setMatricule(e.target.value)} placeholder="Matricule" />
                      <Input value={unite} onChange={(e) => setUnite(e.target.value)} placeholder="Unité" />
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-3">
                    <Label className="font-display font-semibold text-muted-foreground">Contact d'urgence</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={contactUrgenceNom} onChange={(e) => setContactUrgenceNom(e.target.value)} placeholder="Nom" />
                      <Input value={contactUrgenceTel} onChange={(e) => setContactUrgenceTel(e.target.value)} placeholder="Téléphone" />
                    </div>
                  </div>

                  <LocationSelector value={location} onChange={setLocation} />

                  <Button type="submit" className="w-full bg-safe-green hover:bg-safe-green/90 text-white" size="lg" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Enregistrement…" : "Sauvegarder"}
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
