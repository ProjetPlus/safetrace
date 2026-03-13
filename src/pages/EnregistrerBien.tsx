import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Smartphone, Car, Laptop, Camera, ArrowLeft, Monitor, WashingMachine } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { value: "telephone", label: "Téléphone / Tablette", icon: Smartphone, tarif: "200 F CFA", amount: 200 },
  { value: "ordinateur", label: "Ordinateur", icon: Laptop, tarif: "500 F CFA", amount: 500 },
  { value: "televiseur", label: "Téléviseur", icon: Monitor, tarif: "500 F CFA", amount: 500 },
  { value: "electromenager", label: "Appareil électroménager", icon: WashingMachine, tarif: "500 F CFA", amount: 500 },
  { value: "voiture", label: "Voiture / Véhicule automobile", icon: Car, tarif: "2 000 F CFA", amount: 2000 },
  { value: "moto", label: "Moto / Tricycle", icon: Car, tarif: "1 000 F CFA", amount: 1000 },
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
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const [chassis, setChassis] = useState("");
  const [plaque, setPlaque] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });
  const [photos, setPhotos] = useState<File[]>([]);
  const [generatedToken, setGeneratedToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCat = categories.find(c => c.value === categorie);

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setPhotos(files);
    toast({ title: `${files.length} photo(s) sélectionnée(s)` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Erreur", description: "Vous devez être connecté.", variant: "destructive" }); return; }
    if (!categorie) { toast({ title: "Erreur", description: "Veuillez choisir une catégorie.", variant: "destructive" }); return; }
    if (!marque) { toast({ title: "Erreur", description: "Veuillez saisir la marque.", variant: "destructive" }); return; }
    if (categorie === "telephone" && !imei1) { toast({ title: "Erreur", description: "L'IMEI 1 est obligatoire.", variant: "destructive" }); return; }
    if ((categorie === "voiture" || categorie === "moto") && !chassis) { toast({ title: "Erreur", description: "Le numéro de châssis est obligatoire.", variant: "destructive" }); return; }
    if (["ordinateur", "televiseur", "electromenager"].includes(categorie) && !numSerie) { toast({ title: "Erreur", description: "Le numéro de série est obligatoire.", variant: "destructive" }); return; }

    setLoading(true);
    const token = generateToken();

    // Upload photos
    const photoUrls: string[] = [];
    for (const photo of photos) {
      const filePath = `${user.id}/${token}/${photo.name}`;
      const { error: uploadError } = await supabase.storage.from("device-photos").upload(filePath, photo);
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("device-photos").getPublicUrl(filePath);
        photoUrls.push(urlData.publicUrl);
      }
    }

    // Insert device
    const { error } = await supabase.from("devices").insert({
      user_id: user.id,
      categorie: categorie as any,
      marque,
      modele: modele || null,
      couleur: couleur || null,
      annee_achat: annee ? parseInt(annee) : null,
      description: description || null,
      imei1: imei1 || null,
      imei2: imei2 || null,
      num_serie: numSerie || null,
      operateur: operateur || null,
      chassis: chassis || null,
      plaque: plaque || null,
      token,
      photos: photoUrls.length > 0 ? photoUrls : null,
      village: location.village || null,
      sous_prefecture: location.sousPrefecture || null,
      departement: location.departement || null,
      region: location.region || null,
      district: location.district || null,
    });

    setLoading(false);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    setGeneratedToken(token);
    setSubmitted(true);
    toast({ title: "✅ Enregistrement réussi !", description: `Code SafeTrace : ${token}` });
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
                <h2 className="font-display text-2xl font-bold text-foreground">Enregistrement réussi !</h2>
                <p className="text-muted-foreground mt-1">{marque} {modele}</p>
                {selectedCat && <p className="text-sm text-safe-green font-medium mt-1">Tarif : {selectedCat.tarif}</p>}
              </div>
              <QRCodeGenerator token={generatedToken} bienNom={`${marque} ${modele}`} />
              <div className="flex gap-2 mt-6">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/tableau-de-bord">Tableau de bord</Link>
                </Button>
                <Button onClick={() => { setSubmitted(false); setGeneratedToken(""); setCategorie(""); setMarque(""); setModele(""); }} className="flex-1 bg-safe-green hover:bg-safe-green/90 text-white">
                  Nouvel enregistrement
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
            <Link to="/tableau-de-bord"><ArrowLeft className="h-4 w-4 mr-2" /> Retour au tableau de bord</Link>
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-safe-green/10 flex items-center justify-center mx-auto mb-3">
                  <Package className="h-7 w-7 text-safe-green" />
                </div>
                <CardTitle className="font-display text-2xl">Enregistrer un appareil ou véhicule</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label>Catégorie *</Label>
                    <Select value={categorie} onValueChange={setCategorie}>
                      <SelectTrigger><SelectValue placeholder="Choisir une catégorie" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label} — {cat.tarif}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCat && (
                    <div className="bg-safe-bg-green rounded-xl p-3 text-center">
                      <p className="text-sm text-muted-foreground">Tarif d'enregistrement : <span className="font-display font-bold text-safe-green">{selectedCat.tarif}</span></p>
                    </div>
                  )}

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

                  {categorie === "telephone" && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5"><Label>IMEI 1 *</Label><Input value={imei1} onChange={(e) => setImei1(e.target.value)} placeholder="Tapez *#06#" /></div>
                      <div className="space-y-1.5"><Label>IMEI 2 (dual SIM)</Label><Input value={imei2} onChange={(e) => setImei2(e.target.value)} /></div>
                      <div className="space-y-1.5"><Label>Numéro de série</Label><Input value={numSerie} onChange={(e) => setNumSerie(e.target.value)} /></div>
                      <div className="space-y-1.5">
                        <Label>Opérateur</Label>
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

                  {(categorie === "voiture" || categorie === "moto") && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5"><Label>Châssis / VIN *</Label><Input value={chassis} onChange={(e) => setChassis(e.target.value)} placeholder="17 caractères" /></div>
                      <div className="space-y-1.5"><Label>Plaque</Label><Input value={plaque} onChange={(e) => setPlaque(e.target.value)} /></div>
                    </div>
                  )}

                  {["ordinateur", "televiseur", "electromenager"].includes(categorie) && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5"><Label>Numéro de série *</Label><Input value={numSerie} onChange={(e) => setNumSerie(e.target.value)} /></div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label>Couleur</Label><Input value={couleur} onChange={(e) => setCouleur(e.target.value)} /></div>
                    <div className="space-y-1.5"><Label>Année d'achat</Label><Input type="number" value={annee} onChange={(e) => setAnnee(e.target.value)} placeholder="2024" /></div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Informations supplémentaires…" rows={3} />
                  </div>

                  <LocationSelector value={location} onChange={setLocation} />

                  <div className="space-y-1.5">
                    <Label>Photos (1 à 5)</Label>
                    <label className="border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground cursor-pointer hover:border-safe-green/50 transition-colors block">
                      <Camera className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Cliquez ou glissez vos photos ici</p>
                      {photos.length > 0 && <p className="text-xs text-safe-green mt-2 font-medium">{photos.length} photo(s)</p>}
                      <input type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-safe-green hover:bg-safe-green/90 text-white" size="lg" disabled={loading}>
                    <Package className="h-4 w-4 mr-2" />
                    {loading ? "Enregistrement…" : `Enregistrer${selectedCat ? ` — ${selectedCat.tarif}` : ""}`}
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
