import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Phone, Mail, User, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import LocationSelector from "@/components/LocationSelector";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Inscription = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSecours, setEmailSecours] = useState("");
  const [telSecours, setTelSecours] = useState("");
  const [contactUrgenceNom, setContactUrgenceNom] = useState("");
  const [contactUrgenceTel, setContactUrgenceTel] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !prenoms) { toast({ title: "Erreur", description: "Nom et prénoms sont obligatoires.", variant: "destructive" }); return; }
    if (!whatsapp) { toast({ title: "Erreur", description: "Le numéro WhatsApp est obligatoire.", variant: "destructive" }); return; }
    if (!email) { toast({ title: "Erreur", description: "L'email est obligatoire.", variant: "destructive" }); return; }
    if (!password || password.length < 8) { toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 8 caractères.", variant: "destructive" }); return; }

    setLoading(true);
    // Simulate account creation - will be connected to Supabase
    setTimeout(() => {
      setLoading(false);
      toast({ title: "✅ Compte créé avec succès !", description: "Bienvenue sur SafeTrace ! Connectez-vous pour commencer." });
      navigate("/connexion");
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-2xl bg-safe-green/10 flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="h-7 w-7 text-safe-green" />
                </div>
                <CardTitle className="font-display text-2xl">Créer un compte</CardTitle>
                <CardDescription>Inscription gratuite — protégez vos biens</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="KOFFI" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prenoms">Prénoms *</Label>
                      <Input id="prenoms" value={prenoms} onChange={(e) => setPrenoms(e.target.value)} placeholder="Inocent" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="whatsapp">Numéro WhatsApp (identifiant) *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+225 07 XX XX XX XX" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 caractères" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Contact de secours */}
                  <div className="border-t pt-4 mt-4">
                    <Label className="text-sm font-display font-semibold text-muted-foreground mb-3 block">Informations complémentaires (optionnel)</Label>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>Email de secours</Label>
                        <Input value={emailSecours} onChange={(e) => setEmailSecours(e.target.value)} placeholder="email-secours@email.com" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Téléphone de secours</Label>
                        <Input value={telSecours} onChange={(e) => setTelSecours(e.target.value)} placeholder="+225..." />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label>Personne d'urgence</Label>
                          <Input value={contactUrgenceNom} onChange={(e) => setContactUrgenceNom(e.target.value)} placeholder="Nom" />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Tél. urgence</Label>
                          <Input value={contactUrgenceTel} onChange={(e) => setContactUrgenceTel(e.target.value)} placeholder="+225..." />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Localisation */}
                  <LocationSelector value={location} onChange={setLocation} />

                  <Button type="submit" className="w-full bg-safe-green hover:bg-safe-green/90 text-white" size="lg" disabled={loading}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {loading ? "Création en cours…" : "Créer mon compte"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Déjà inscrit ?{" "}
                    <Link to="/connexion" className="text-primary font-medium hover:underline">Se connecter</Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Inscription;
