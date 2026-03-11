import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Smartphone, Car, Laptop, Zap, Gem, Shield, Camera, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import LocationSelector from "@/components/LocationSelector";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "telephone", label: "Téléphone / Tablette", icon: Smartphone },
  { value: "vehicule", label: "Véhicule / Moto", icon: Car },
  { value: "informatique", label: "Informatique", icon: Laptop },
  { value: "energie", label: "Énergie / Outillage", icon: Zap },
  { value: "bijoux", label: "Bijoux / Objets de valeur", icon: Gem },
  { value: "electromenager", label: "Électroménager", icon: Shield },
];

const generateToken = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const year = new Date().getFullYear();
  let id = "";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return `ST-CI-${year}-${id}`;
};

const EnregistrerBien = () => {
  const { toast } = useToast();
  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [couleur, setCouleur] = useState("");
  const [annee, setAnnee] = useState("");
  const [description, setDescription] = useState("");
  const [imei1, setImei1] = useState("");
  const [imei2, setImei2] = useState("");
  const [numSerie, setNumSerie] = useState("");
  const [operateur, setOperateur] = useState("");
  const [typeVehicule, setTypeVehicule] = useState("");
  const [chassis, setChassis] = useState("");
  const [plaque, setPlaque] = useState("");
  const [matiere, setMatiere] = useState("");
  const [poids, setPoids] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });
  const [photos, setPhotos] = useState<File[]>([]);
  const [generatedToken, setGeneratedToken] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setPhotos(files);
    toast({ title: `${files.length} photo(s) sélectionnée(s)` });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categorie) { toast({ title: "Erreur", description: "Veuillez choisir une catégorie.", variant: "destructive" }); return; }
    if (!marque) { toast({ title: "Erreur", description: "Veuillez saisir la marque.", variant: "destructive" }); return; }

    // Validate category-specific required fields
    if (categorie === "telephone" && !imei1) { toast({ title: "Erreur", description: "L'IMEI 1 est obligatoire.", variant: "destructive" }); return; }
    if (categorie === "vehicule" && !chassis) { toast({ title: "Erreur", description: "Le numéro de châssis est obligatoire.", variant: "destructive" }); return; }
    if (["informatique", "energie", "electromenager"].includes(categorie) && !numSerie) { toast({ title: "Erreur", description: "Le numéro de série est obligatoire.", variant: "destructive" }); return; }

    const token = generateToken();
    setGeneratedToken(token);
    setSubmitted(true);

    toast({
      title: "✅ Bien enregistré avec succès !",
      description: `Code SafeTrace : ${token}`,
    });
  };

  if (submitted && generatedToken) {
    return (
      <Layout>
        <section className="py-8 md:py-16 bg-gradient-to-b from-safe-bg-green to-background min-h-[80vh]">
          <div className="container mx-auto px-4 max-w-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-safe-green/10 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-safe-green" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">Bien enregistré !</h2>
                <p className="text-muted-foreground mt-1">{marque} {modele}</p>
              </div>

              <QRCodeGenerator token={generatedToken} bienNom={`${marque} ${modele}`} />

              <div className="flex gap-2 mt-6">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/tableau-de-bord">Tableau de bord</Link>
                </Button>
                <Button onClick={() => { setSubmitted(false); setGeneratedToken(""); setCategorie(""); setMarque(""); setModele(""); }} className="flex-1 bg-safe-green hover:bg-safe-green/90 text-white">
                  Nouveau bien
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 md:py-16 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/tableau-de-bord">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Link>
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-safe-green/10 flex items-center justify-center mx-auto mb-3">
                  <Package className="h-7 w-7 text-safe-green" />
                </div>
                <CardTitle className="font-display text-2xl">Enregistrer un bien</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Catégorie */}
                  <div className="space-y-1.5">
                    <Label>Catégorie du bien *</Label>
                    <Select value={categorie} onValueChange={setCategorie}>
                      <SelectTrigger><SelectValue placeholder="Choisir une catégorie" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Common fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Marque *</Label>
                      <Input value={marque} onChange={(e) => setMarque(e.target.value)} placeholder="Ex: Samsung, Honda…" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Modèle</Label>
                      <Input value={modele} onChange={(e) => setModele(e.target.value)} placeholder="Ex: Galaxy S24, CBR…" />
                    </div>
                  </div>

                  {/* Category-specific fields */}
                  {categorie === "telephone" && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5">
                        <Label>IMEI 1 *</Label>
                        <Input value={imei1} onChange={(e) => setImei1(e.target.value)} placeholder="Tapez *#06# pour trouver votre IMEI" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>IMEI 2 (si dual SIM)</Label>
                        <Input value={imei2} onChange={(e) => setImei2(e.target.value)} placeholder="Optionnel" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Numéro de série</Label>
                        <Input value={numSerie} onChange={(e) => setNumSerie(e.target.value)} placeholder="Numéro de série" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Opérateur réseau</Label>
                        <Select value={operateur} onValueChange={setOperateur}>
                          <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="orange">Orange CI</SelectItem>
                            <SelectItem value="mtn">MTN CI</SelectItem>
                            <SelectItem value="moov">Moov Africa</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {categorie === "vehicule" && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5">
                        <Label>Type de véhicule</Label>
                        <Select value={typeVehicule} onValueChange={setTypeVehicule}>
                          <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="moto">Moto / Tricycle</SelectItem>
                            <SelectItem value="voiture">Voiture / Camion</SelectItem>
                            <SelectItem value="velo">Vélo / Vélo électrique</SelectItem>
                            <SelectItem value="engin">Tracteur / Engin agricole</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Numéro de châssis / VIN *</Label>
                        <Input value={chassis} onChange={(e) => setChassis(e.target.value)} placeholder="17 caractères" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Plaque d'immatriculation</Label>
                        <Input value={plaque} onChange={(e) => setPlaque(e.target.value)} placeholder="Optionnel" />
                      </div>
                    </div>
                  )}

                  {["informatique", "energie", "electromenager"].includes(categorie) && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5">
                        <Label>Numéro de série *</Label>
                        <Input value={numSerie} onChange={(e) => setNumSerie(e.target.value)} placeholder="Numéro de série du bien" />
                      </div>
                    </div>
                  )}

                  {categorie === "bijoux" && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5">
                        <Label>Matière</Label>
                        <Input value={matiere} onChange={(e) => setMatiere(e.target.value)} placeholder="Or, argent, platine…" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Poids (grammes)</Label>
                        <Input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} placeholder="Poids en grammes" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Numéro de série (si disponible)</Label>
                        <Input value={numSerie} onChange={(e) => setNumSerie(e.target.value)} placeholder="Optionnel" />
                      </div>
                    </div>
                  )}

                  {/* Common remaining fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Couleur</Label>
                      <Input value={couleur} onChange={(e) => setCouleur(e.target.value)} placeholder="Couleur du bien" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Année d'achat</Label>
                      <Input type="number" value={annee} onChange={(e) => setAnnee(e.target.value)} placeholder="2024" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Description / Notes</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Informations supplémentaires, signes distinctifs…" rows={3} />
                  </div>

                  {/* Location */}
                  <LocationSelector value={location} onChange={setLocation} />

                  {/* Photos */}
                  <div className="space-y-1.5">
                    <Label>Photos du bien (1 à 5)</Label>
                    <label className="border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground cursor-pointer hover:border-safe-green/50 transition-colors block">
                      <Camera className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Cliquez ou glissez vos photos ici</p>
                      <p className="text-xs">JPG, PNG — max 5 photos</p>
                      {photos.length > 0 && <p className="text-xs text-safe-green mt-2 font-medium">{photos.length} photo(s) sélectionnée(s)</p>}
                      <input type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-safe-green hover:bg-safe-green/90 text-white" size="lg">
                    <Package className="h-4 w-4 mr-2" />
                    Enregistrer ce bien
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

export default EnregistrerBien;
