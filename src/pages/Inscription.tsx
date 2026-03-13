import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Phone, Mail, User, Eye, EyeOff, Smartphone, Briefcase, Building2, Shield, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Layout from "@/components/layout/Layout";
import LocationSelector from "@/components/LocationSelector";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const userTypes = [
  { value: "particulier", label: "Particulier", icon: Smartphone, desc: "Protégez vos appareils personnels et véhicules" },
  { value: "commercant", label: "Commerçant / Revendeur", icon: Briefcase, desc: "Sécurisez vos transactions de seconde main" },
  { value: "entreprise", label: "Entreprise", icon: Building2, desc: "Gérez votre parc d'équipements" },
  { value: "assurance", label: "Compagnie d'assurance", icon: Shield, desc: "Vérifiez les sinistres déclarés" },
  { value: "forces_securite", label: "Forces de sécurité", icon: Swords, desc: "Identifiez les propriétaires légitimes" },
];

const Inscription = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showTypeDialog, setShowTypeDialog] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSecours, setEmailSecours] = useState("");
  const [telSecours, setTelSecours] = useState("");
  const [contactUrgenceNom, setContactUrgenceNom] = useState("");
  const [contactUrgenceTel, setContactUrgenceTel] = useState("");
  // Commerçant / Entreprise fields
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [registreCommerce, setRegistreCommerce] = useState("");
  const [secteurActivite, setSecteurActivite] = useState("");
  // Assurance fields
  const [nomCompagnie, setNomCompagnie] = useState("");
  const [numeroAgrement, setNumeroAgrement] = useState("");
  // Forces de sécurité fields
  const [grade, setGrade] = useState("");
  const [matricule, setMatricule] = useState("");
  const [unite, setUnite] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setShowTypeDialog(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) { toast({ title: "Erreur", description: "Le nom d'utilisateur est obligatoire.", variant: "destructive" }); return; }
    if (!nom || !prenoms) { toast({ title: "Erreur", description: "Nom et prénoms sont obligatoires.", variant: "destructive" }); return; }
    if (!email) { toast({ title: "Erreur", description: "L'email est obligatoire.", variant: "destructive" }); return; }
    if (!password || password.length < 8) { toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 8 caractères.", variant: "destructive" }); return; }

    setLoading(true);
    const { error } = await signUp(email, password, {
      username,
      nom,
      prenoms,
      whatsapp,
      user_type: selectedType || "particulier",
    });
    setLoading(false);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    toast({
      title: "✅ Compte créé avec succès !",
      description: "Un email de confirmation vous a été envoyé. Vérifiez votre boîte mail.",
    });
    navigate("/connexion");
  };

  return (
    <Layout>
      {/* User Type Selection Dialog */}
      <Dialog open={showTypeDialog} onOpenChange={setShowTypeDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-center">Choisissez votre profil</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 mt-4">
            {userTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleTypeSelect(type.value)}
                className="flex items-center gap-4 p-4 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <type.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-display font-bold">{type.label}</div>
                  <div className="text-sm text-muted-foreground">{type.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-12 md:py-20 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-2xl bg-safe-green/10 flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="h-7 w-7 text-safe-green" />
                </div>
                <CardTitle className="font-display text-2xl">Créer un compte</CardTitle>
                <CardDescription>
                  {selectedType ? `Inscription — ${userTypes.find(t => t.value === selectedType)?.label}` : "Inscription gratuite"}
                  {selectedType && (
                    <button onClick={() => setShowTypeDialog(true)} className="block text-primary text-xs hover:underline mt-1">
                      Changer de profil
                    </button>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="username">Nom d'utilisateur *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))} placeholder="nom_utilisateur" className="pl-10" />
                    </div>
                  </div>

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
                    <Label htmlFor="whatsapp">Numéro WhatsApp</Label>
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
                    <Label htmlFor="password">Mot de passe * (min. 8 caractères)</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 caractères" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Commerçant / Entreprise fields */}
                  {(selectedType === "commercant" || selectedType === "entreprise") && (
                    <div className="border-t pt-4 space-y-3">
                      <Label className="text-sm font-display font-semibold text-muted-foreground">Informations professionnelles</Label>
                      <div className="space-y-1.5">
                        <Label>Nom de l'entreprise *</Label>
                        <Input value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} placeholder="Raison sociale" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>N° Registre du commerce</Label>
                        <Input value={registreCommerce} onChange={(e) => setRegistreCommerce(e.target.value)} placeholder="RCCM" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Secteur d'activité</Label>
                        <Input value={secteurActivite} onChange={(e) => setSecteurActivite(e.target.value)} placeholder="Commerce, Réparation, etc." />
                      </div>
                    </div>
                  )}

                  {/* Assurance fields */}
                  {selectedType === "assurance" && (
                    <div className="border-t pt-4 space-y-3">
                      <Label className="text-sm font-display font-semibold text-muted-foreground">Informations compagnie</Label>
                      <div className="space-y-1.5">
                        <Label>Nom de la compagnie *</Label>
                        <Input value={nomCompagnie} onChange={(e) => setNomCompagnie(e.target.value)} placeholder="Compagnie d'assurance" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Numéro d'agrément</Label>
                        <Input value={numeroAgrement} onChange={(e) => setNumeroAgrement(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Forces de sécurité fields */}
                  {selectedType === "forces_securite" && (
                    <div className="border-t pt-4 space-y-3">
                      <Label className="text-sm font-display font-semibold text-muted-foreground">Informations service</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label>Grade</Label>
                          <Input value={grade} onChange={(e) => setGrade(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Matricule</Label>
                          <Input value={matricule} onChange={(e) => setMatricule(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Unité / Service</Label>
                        <Input value={unite} onChange={(e) => setUnite(e.target.value)} />
                      </div>
                    </div>
                  )}

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
