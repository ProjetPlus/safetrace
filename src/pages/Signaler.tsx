import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LocationSelector from "@/components/LocationSelector";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Signaler = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appareil, setAppareil] = useState("");
  const [typeIncident, setTypeIncident] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [circonstances, setCirconstances] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });
  const [photoplainte, setPhotoplainte] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appareil) { toast({ title: "Erreur", description: "Veuillez sélectionner un appareil.", variant: "destructive" }); return; }
    if (!typeIncident) { toast({ title: "Erreur", description: "Veuillez choisir le type d'incident.", variant: "destructive" }); return; }
    if (!date) { toast({ title: "Erreur", description: "Veuillez indiquer la date de l'incident.", variant: "destructive" }); return; }

    setLoading(true);
    const numDossier = `SF-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "🔴 Signalement enregistré",
        description: `Dossier N° ${numDossier} — Les autorités de votre zone ont été notifiées.`,
      });
      navigate("/tableau-de-bord");
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-8 md:py-16 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/tableau-de-bord"><ArrowLeft className="h-4 w-4 mr-2" /> Retour au tableau de bord</Link>
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2 border-destructive/20">
              <CardHeader className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="h-7 w-7 text-destructive" />
                </div>
                <CardTitle className="font-display text-2xl">Signaler un vol ou une perte</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label>Appareil ou véhicule concerné *</Label>
                    <Select value={appareil} onValueChange={setAppareil}>
                      <SelectTrigger><SelectValue placeholder="Sélectionner un appareil enregistré" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">iPhone 14 Pro — IMEI: 352789102345678</SelectItem>
                        <SelectItem value="2">Moto Honda — VIN: JH2MC130XXK000123</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Type d'incident *</Label>
                    <Select value={typeIncident} onValueChange={setTypeIncident}>
                      <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vol">Vol</SelectItem>
                        <SelectItem value="perte">Perte</SelectItem>
                        <SelectItem value="tentative">Tentative de vol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Date de l'incident *</Label>
                      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Heure approximative</Label>
                      <Input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} />
                    </div>
                  </div>

                  <LocationSelector value={location} onChange={setLocation} />

                  <div className="space-y-1.5">
                    <Label>Circonstances</Label>
                    <Textarea value={circonstances} onChange={(e) => setCirconstances(e.target.value)} placeholder="Décrivez les circonstances du vol ou de la perte…" rows={4} />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Photo du dépôt de plainte (optionnel)</Label>
                    <label className="border-2 border-dashed rounded-xl p-6 text-center text-muted-foreground cursor-pointer hover:border-destructive/30 transition-colors block">
                      <FileText className="h-6 w-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Joindre la photo du PV de plainte</p>
                      {photoplainte && <p className="text-xs text-safe-green mt-1">{photoplainte.name}</p>}
                      <input type="file" accept="image/*" onChange={(e) => setPhotoplainte(e.target.files?.[0] || null)} className="hidden" />
                    </label>
                  </div>

                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                    <p className="text-sm text-destructive font-medium">⚠️ Tout faux signalement est passible de poursuites judiciaires.</p>
                  </div>

                  <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground" size="lg" disabled={loading}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {loading ? "Envoi en cours…" : "Confirmer le signalement"}
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

export default Signaler;
