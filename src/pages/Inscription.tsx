import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Phone, Mail, User, Eye, EyeOff, Smartphone, Briefcase, Building, Shield, Car } from "lucide-react";
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
  { value: "entreprise", label: "Entreprise", icon: Building, desc: "Gérez votre parc d'équipements" },
  { value: "assurance", label: "Compagnie d'assurance", icon: Shield, desc: "Vérification des sinistres déclarés" },
  { value: "forces_securite", label: "Forces de sécurité", icon: Car, desc: "Identifiez les propriétaires légitimes" },
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
  // Merchant fields
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [registreCommerce, setRegistreCommerce] = useState("");
  const [secteurActivite, setSecteurActivite] = useState("");
  // Insurance fields
  const [nomCompagnie, setNomCompagnie] = useState("");
  const [numeroAgrement, setNumeroAgrement] = useState("");
  // Forces fields
  const [grade, setGrade] = useState("");
  const [matricule, setMatricule] = useState("");
  const [unite, setUnite] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setShowTypeDialog(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) { toast({ title: "Erreur", description: "Le nom d'utilisateur est obligatoire.", variant: "destructive" }); return; }
    if (!nom || !prenoms) { toast({ title: "Erreur", description: "Nom et prénoms obligatoires.", variant: "destructive" }); return; }
    if (!email) { toast({ title: "Erreur", description: "L'email est obligatoire.", variant: "destructive" }); return; }
    if (!password || password.length < 8) { toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 8 caractères.", variant: "destructive" }); return; }

    setLoading(true);
    const { error } = await signUp({
      username, nom, prenoms, email, whatsapp, password,
      user_type: selectedType || "particulier",
      location,
      email_secours: emailSecours,
      tel_secours: telSecours,
      contact_urgence_nom: contactUrgenceNom,
      contact_urgence_tel: contactUrgenceTel,
      nom_entreprise: nomEntreprise,
      numero_registre_commerce: registreCommerce,
      secteur_activite: secteurActivite,
      nom_compagnie: nomCompagnie,
      numero_agrement: numeroAgrement,
      grade, matricule, unite,
    });

    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "✅ Compte créé !", description: "Vérifiez votre email pour confirmer votre inscription." });
      navigate("/connexion");
    }
  };

  const selectedTypeInfo = userTypes.find(t => t.value === selectedType);

  return (
    <Layout>
      {/* User type selection dialog */}
      <Dialog open={showTypeDialog} onOpenChange={setShowTypeDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-center">Choisissez votre type de compte</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            {userTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleSelectType(type.value)}
                className="flex items-center gap-4 p-4 rounded-xl border-2 hover:border-safe-green/50 hover:bg-safe-green/5 transition-all text-left"
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
                  {selectedTypeInfo ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="bg-safe-green/10 text-safe-green text-xs font-medium px-2 py-0.5 rounded-full">{selectedTypeInfo.label}</span>
                      <button onClick={() => setShowTypeDialog(true)} className="text-primary text-xs underline">Changer</button>
                    </span>
                  ) : "Inscription gratuite"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="username">Nom d'utilisateur *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} placeholder="mon_nom_utilisateur" className="pl-10" />
                    </div>
                    <p className="text-xs text-muted-foreground">Lettres minuscules, chiffres et underscore uniquement</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Nom *</Label>
                      <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="KOFFI" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Prénoms *</Label>
                      <Input value={prenoms} onChange={(e) => setPrenoms(e.target.value)} placeholder="Inocent" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Numéro WhatsApp</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+225 07 XX XX XX XX" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Mot de passe *</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 caractères" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Merchant-specific fields */}
                  {selectedType === "commercant" && (
                    <div className="space-y-3 border-t pt-4">
                      <Label className="font-display font-semibold">Informations commerçant</Label>
                      <Input value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} placeholder="Nom de l'entreprise" />
                      <Input value={registreCommerce} onChange={(e) => setRegistreCommerce(e.target.value)} placeholder="N° Registre du commerce" />
                      <Input value={secteurActivite} onChange={(e) => setSecteurActivite(e.target.value)} placeholder="Secteur d'activité" />
                    </div>
                  )}

                  {selectedType === "entreprise" && (
                    <div className="space-y-3 border-t pt-4">
                      <Label className="font-display font-semibold">Informations entreprise</Label>
                      <Input value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} placeholder="Nom de l'entreprise" />
                      <Input value={registreCommerce} onChange={(e) => setRegistreCommerce(e.target.value)} placeholder="N° Registre du commerce" />
                    </div>
                  )}

                  {selectedType === "assurance" && (
                    <div className="space-y-3 border-t pt-4">
                      <Label className="font-display font-semibold">Informations compagnie</Label>
                      <Input value={nomCompagnie} onChange={(e) => setNomCompagnie(e.target.value)} placeholder="Nom de la compagnie" />
                      <Input value={numeroAgrement} onChange={(e) => setNumeroAgrement(e.target.value)} placeholder="N° Agrément" />
                    </div>
                  )}

                  {selectedType === "forces_securite" && (
                    <div className="space-y-3 border-t pt-4">
                      <Label className="font-display font-semibold">Informations agent</Label>
                      <Input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" />
                      <Input value={matricule} onChange={(e) => setMatricule(e.target.value)} placeholder="Matricule" />
                      <Input value={unite} onChange={(e) => setUnite(e.target.value)} placeholder="Unité / Commissariat" />
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-3">
                    <Label className="font-display font-semibold text-muted-foreground">Contact d'urgence (optionnel)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={contactUrgenceNom} onChange={(e) => setContactUrgenceNom(e.target.value)} placeholder="Nom" />
                      <Input value={contactUrgenceTel} onChange={(e) => setContactUrgenceTel(e.target.value)} placeholder="Téléphone" />
                    </div>
                  </div>

                  <LocationSelector value={location} onChange={setLocation} />

                  <Button type="submit" className="w-full bg-safe-green hover:bg-safe-green/90 text-white" size="lg" disabled={loading}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {loading ? "Création en cours…" : "Créer mon compte"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Déjà inscrit ? <Link to="/connexion" className="text-primary font-medium hover:underline">Se connecter</Link>
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
