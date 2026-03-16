import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Package, Smartphone, Car, Laptop, Camera, ArrowLeft, Monitor, WashingMachine, CreditCard, CheckCircle2, Loader2 } from "lucide-react";
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
import { getBrandsForCategory, colors, getYears } from "@/data/brands";

const categories = [
  { value: "telephone", label: "Téléphone / Tablette", icon: Smartphone, tarif: "200 F CFA", amount: 200 },
  { value: "ordinateur", label: "Ordinateur", icon: Laptop, tarif: "500 F CFA", amount: 500 },
  { value: "televiseur", label: "Téléviseur", icon: Monitor, tarif: "500 F CFA", amount: 500 },
  { value: "electromenager", label: "Appareil électroménager", icon: WashingMachine, tarif: "500 F CFA", amount: 500 },
  { value: "voiture", label: "Voiture / Véhicule automobile", icon: Car, tarif: "2 000 F CFA", amount: 2000 },
  { value: "moto", label: "Moto / Tricycle", icon: Car, tarif: "1 000 F CFA", amount: 1000 },
];

const STORAGE_KEY = "safetrace_registration_draft";

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
  const [searchParams] = useSearchParams();

  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [customMarque, setCustomMarque] = useState("");
  const [modele, setModele] = useState("");
  const [customModele, setCustomModele] = useState("");
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
  const [paymentPending, setPaymentPending] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);

  const selectedCat = categories.find(c => c.value === categorie);
  const brandsData = getBrandsForCategory(categorie);
  const brandNames = Object.keys(brandsData);
  const effectiveMarque = marque === "__autre" ? customMarque : marque;
  const modelNames = marque && marque !== "__autre" && brandsData[marque] ? brandsData[marque] : [];
  const effectiveModele = modele === "__autre_modele" ? customModele : modele;
  const years = getYears();

  // Auto-save to localStorage
  useEffect(() => {
    const draft = { categorie, marque, customMarque, modele, customModele, couleur, annee, description, imei1, imei2, numSerie, operateur, chassis, plaque, location };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [categorie, marque, customMarque, modele, customModele, couleur, annee, description, imei1, imei2, numSerie, operateur, chassis, plaque, location]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.categorie) setCategorie(draft.categorie);
        if (draft.marque) setMarque(draft.marque);
        if (draft.customMarque) setCustomMarque(draft.customMarque);
        if (draft.modele) setModele(draft.modele);
        if (draft.customModele) setCustomModele(draft.customModele);
        if (draft.couleur) setCouleur(draft.couleur);
        if (draft.annee) setAnnee(draft.annee);
        if (draft.description) setDescription(draft.description);
        if (draft.imei1) setImei1(draft.imei1);
        if (draft.imei2) setImei2(draft.imei2);
        if (draft.numSerie) setNumSerie(draft.numSerie);
        if (draft.operateur) setOperateur(draft.operateur);
        if (draft.chassis) setChassis(draft.chassis);
        if (draft.plaque) setPlaque(draft.plaque);
        if (draft.location) setLocation(draft.location);
      }
    } catch {}
  }, []);

  // Check payment status from URL params
  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const paymentId = searchParams.get("payment_id");

    if (paymentStatus === "success" && paymentId) {
      setCheckingPayment(true);
      checkPaymentAndFinalize(paymentId);
    } else if (paymentStatus === "error") {
      toast({ title: "Paiement échoué", description: "Le paiement n'a pas abouti. Veuillez réessayer.", variant: "destructive" });
    }
  }, [searchParams]);

  const checkPaymentAndFinalize = async (paymentId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("check-payment", {
        body: { payment_id: paymentId },
      });

      if (error) throw error;

      if (data.status === "completed") {
        // Device was created by webhook, find token
        if (data.payment?.device_id) {
          const { data: device } = await supabase.from("devices").select("token, marque, modele").eq("id", data.payment.device_id).single();
          if (device) {
            setGeneratedToken(device.token);
            setMarque(device.marque);
            setModele(device.modele || "");
            setSubmitted(true);
            localStorage.removeItem(STORAGE_KEY);
            toast({ title: "✅ Enregistrement confirmé !", description: `Code SafeTrace : ${device.token}` });
          }
        } else if (data.payment?.payment_reference) {
          // Webhook hasn't fired yet, create device manually
          const deviceData = JSON.parse(data.payment.payment_reference);
          
          // Check if device already exists
          const { data: existing } = await supabase.from("devices").select("id").eq("token", deviceData.token).maybeSingle();
          if (!existing) {
            const { error: insertError } = await supabase.from("devices").insert({
              ...deviceData,
              user_id: user!.id,
            });
            if (insertError) {
              toast({ title: "Erreur", description: insertError.message, variant: "destructive" });
              setCheckingPayment(false);
              return;
            }
            await supabase.from("payments").update({ device_id: null }).eq("id", paymentId);
          }

          setGeneratedToken(deviceData.token);
          setSubmitted(true);
          localStorage.removeItem(STORAGE_KEY);
          toast({ title: "✅ Enregistrement confirmé !", description: `Code SafeTrace : ${deviceData.token}` });
        }
      } else {
        toast({ title: "Paiement en attente", description: "Votre paiement est en cours de traitement. Veuillez patienter.", variant: "default" });
      }
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
    setCheckingPayment(false);
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setPhotos(files);
    toast({ title: `${files.length} photo(s) sélectionnée(s)` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Erreur", description: "Vous devez être connecté.", variant: "destructive" }); return; }
    if (!categorie) { toast({ title: "Erreur", description: "Veuillez choisir une catégorie.", variant: "destructive" }); return; }
    if (!effectiveMarque) { toast({ title: "Erreur", description: "Veuillez saisir la marque.", variant: "destructive" }); return; }
    if (categorie === "telephone" && !imei1) { toast({ title: "Erreur", description: "L'IMEI 1 est obligatoire.", variant: "destructive" }); return; }
    if ((categorie === "voiture" || categorie === "moto") && !chassis) { toast({ title: "Erreur", description: "Le numéro de châssis est obligatoire.", variant: "destructive" }); return; }
    if (["ordinateur", "televiseur", "electromenager"].includes(categorie) && !numSerie) { toast({ title: "Erreur", description: "Le numéro de série est obligatoire.", variant: "destructive" }); return; }

    setLoading(true);
    const token = generateToken();

    // Upload photos first
    const photoUrls: string[] = [];
    for (const photo of photos) {
      const filePath = `${user.id}/${token}/${photo.name}`;
      const { error: uploadError } = await supabase.storage.from("device-photos").upload(filePath, photo);
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("device-photos").getPublicUrl(filePath);
        photoUrls.push(urlData.publicUrl);
      }
    }

    // Prepare device data
    const deviceData = {
      categorie: categorie as any,
      marque: effectiveMarque,
      modele: effectiveModele || null,
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
    };

    // Initiate Wave payment
    try {
      const { data, error } = await supabase.functions.invoke("wave-checkout", {
        body: {
          amount: selectedCat!.amount,
          device_data: deviceData,
          description: `Enregistrement ${selectedCat!.label}: ${effectiveMarque} ${effectiveModele || ""}`,
        },
      });

      if (error) throw error;

      if (data?.wave_launch_url) {
        // Redirect to Wave payment page
        window.location.href = data.wave_launch_url;
      } else {
        throw new Error("Impossible de créer la session de paiement");
      }
    } catch (err: any) {
      toast({ title: "Erreur de paiement", description: err.message || "Impossible d'initier le paiement. Veuillez réessayer.", variant: "destructive" });
      setLoading(false);
    }
  };

  if (checkingPayment) {
    return (
      <Layout>
        <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-green to-background min-h-[80vh]">
          <div className="container mx-auto px-4 max-w-md text-center">
            <Loader2 className="h-16 w-16 animate-spin text-safe-green mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold mb-2">Vérification du paiement…</h2>
            <p className="text-muted-foreground">Veuillez patienter pendant que nous confirmons votre paiement.</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (submitted && generatedToken) {
    return (
      <Layout>
        <section className="py-8 md:py-16 bg-gradient-to-b from-safe-bg-green to-background min-h-[80vh]">
          <div className="container mx-auto px-4 max-w-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-safe-green/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-safe-green" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">Enregistrement réussi !</h2>
                <p className="text-muted-foreground mt-1">{effectiveMarque} {effectiveModele}</p>
                <p className="text-sm text-safe-green font-medium mt-1">Paiement confirmé ✅</p>
              </div>
              <QRCodeGenerator token={generatedToken} bienNom={`${effectiveMarque} ${effectiveModele}`} />
              <div className="flex gap-2 mt-6">
                <Button asChild variant="outline" className="flex-1"><Link to="/tableau-de-bord">Tableau de bord</Link></Button>
                <Button onClick={() => { setSubmitted(false); setGeneratedToken(""); setCategorie(""); setMarque(""); setModele(""); localStorage.removeItem(STORAGE_KEY); }} className="flex-1 bg-safe-green hover:bg-safe-green/90 text-white">Nouveau</Button>
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
            <Link to="/tableau-de-bord"><ArrowLeft className="h-4 w-4 mr-2" /> Retour</Link>
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-safe-green/10 flex items-center justify-center mx-auto mb-3">
                  <Package className="h-7 w-7 text-safe-green" />
                </div>
                <CardTitle className="font-display text-2xl">Enregistrer un appareil ou véhicule</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Le paiement sera effectué via Wave avant l'enregistrement</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label>Catégorie *</Label>
                    <Select value={categorie} onValueChange={(v) => { setCategorie(v); setMarque(""); setModele(""); setCustomMarque(""); setCustomModele(""); }}>
                      <SelectTrigger><SelectValue placeholder="Choisir une catégorie" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label} — {cat.tarif}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCat && (
                    <div className="bg-safe-bg-green rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-safe-green" />
                        <span className="text-sm">Tarif d'enregistrement :</span>
                      </div>
                      <span className="font-display font-bold text-safe-green">{selectedCat.tarif}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Marque *</Label>
                      {brandNames.length > 0 ? (
                        <Select value={marque} onValueChange={(v) => { setMarque(v); setModele(""); setCustomModele(""); }}>
                          <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                          <SelectContent className="max-h-60">
                            {brandNames.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                            <SelectItem value="__autre">Autre marque</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={customMarque} onChange={(e) => { setCustomMarque(e.target.value); setMarque("__autre"); }} placeholder="Marque" />
                      )}
                      {marque === "__autre" && <Input value={customMarque} onChange={(e) => setCustomMarque(e.target.value)} placeholder="Saisir la marque" className="mt-1" />}
                    </div>
                    <div className="space-y-1.5">
                      <Label>Modèle</Label>
                      {modelNames.length > 0 ? (
                        <Select value={modele} onValueChange={setModele}>
                          <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                          <SelectContent className="max-h-60">
                            {modelNames.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                            <SelectItem value="__autre_modele">Autre modèle</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={customModele} onChange={(e) => { setCustomModele(e.target.value); setModele("__autre_modele"); }} placeholder="Modèle" />
                      )}
                      {modele === "__autre_modele" && modelNames.length > 0 && <Input value={customModele} onChange={(e) => setCustomModele(e.target.value)} placeholder="Saisir le modèle" className="mt-1" />}
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
                      <div className="space-y-1.5"><Label>Plaque d'immatriculation</Label><Input value={plaque} onChange={(e) => setPlaque(e.target.value)} /></div>
                    </div>
                  )}

                  {["ordinateur", "televiseur", "electromenager"].includes(categorie) && (
                    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
                      <div className="space-y-1.5"><Label>Numéro de série *</Label><Input value={numSerie} onChange={(e) => setNumSerie(e.target.value)} /></div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Couleur</Label>
                      <Select value={couleur} onValueChange={setCouleur}>
                        <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                        <SelectContent className="max-h-60">
                          {colors.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Année d'achat</Label>
                      <Select value={annee} onValueChange={setAnnee}>
                        <SelectTrigger><SelectValue placeholder="Année" /></SelectTrigger>
                        <SelectContent className="max-h-60">
                          {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Informations supplémentaires…" rows={3} />
                  </div>

                  <LocationSelector value={location} onChange={setLocation} />

                  <div className="space-y-1.5">
                    <Label>Photos (1 à 5)</Label>
                    <label className="border-2 border-dashed rounded-xl p-6 text-center text-muted-foreground cursor-pointer hover:border-safe-green/50 transition-colors block">
                      <Camera className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Cliquez pour ajouter des photos</p>
                      {photos.length > 0 && <p className="text-xs text-safe-green mt-1 font-medium">{photos.length} photo(s)</p>}
                      <input type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
                    </label>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">En cliquant sur le bouton ci-dessous, vous serez redirigé vers Wave pour effectuer le paiement.</p>
                    <p className="text-xs text-muted-foreground">L'enregistrement ne sera validé qu'après confirmation du paiement.</p>
                  </div>

                  <Button type="submit" className="w-full bg-safe-green hover:bg-safe-green/90 text-white" size="lg" disabled={loading}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    {loading ? "Redirection vers Wave…" : `Payer et enregistrer${selectedCat ? ` — ${selectedCat.tarif}` : ""}`}
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
