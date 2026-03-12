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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const Signaler = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [appareil, setAppareil] = useState("");
  const [appareils, setAppareils] = useState<any[]>([]);
  const [typeIncident, setTypeIncident] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [circonstances, setCirconstances] = useState("");
  const [location, setLocation] = useState({ village: "", sousPrefecture: "", departement: "", region: "", district: "" });

  useEffect(() => {
    if (user) loadDevices();
  }, [user]);

  const loadDevices = async () => {
    const { data } = await supabase.from("devices").select("id, marque, modele, token, categorie").eq("statut", "propre");
    setAppareils(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!appareil) { toast({ title: "Erreur", description: "Sélectionnez un appareil.", variant: "destructive" }); return; }
    if (!typeIncident) { toast({ title: "Erreur", description: "Choisissez le type d'incident.", variant: "destructive" }); return; }
    if (!date) { toast({ title: "Erreur", description: "Indiquez la date.", variant: "destructive" }); return; }

    setLoading(true);
    const numDossier = `SF-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const { error } = await supabase.from("reports").insert({
      device_id: appareil,
      user_id: user.id,
      type_incident: typeIncident as any,
      date_incident: date,
      heure_incident: heure || null,
      circonstances: circonstances || null,
      village: location.village || null,
      sous_prefecture: location.sousPrefecture || null,
      departement: location.departement || null,
      region: location.region || null,
      district: location.district || null,
      numero_dossier: numDossier,
    });

    if (!error) {
      // Update device status
      const newStatut = typeIncident === "vol" ? "vole" : typeIncident === "perte" ? "perdu" : "propre";
      await supabase.from("devices").update({ statut: newStatut }).eq("id", appareil);
    }

    setLoading(false);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "🔴 Signalement enregistré", description: `Dossier N° ${numDossier}` });
      navigate("/tableau-de-bord");
    }
  };

  return (
    <Layout>
      <section className="py-8 md:py-16 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/tableau-de-bord"><ArrowLeft className="h-4 w-4 mr-2" /> Retour</Link>
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
                    <Label>Appareil ou véhicule *</Label>
                    <Select value={appareil} onValueChange={setAppareil}>
                      <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                      <SelectContent>
                        {appareils.map((a) => (
                          <SelectItem key={a.id} value={a.id}>{a.marque} {a.modele} — {a.token}</SelectItem>
                        ))}
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
                    <div className="space-y-1.5"><Label>Date *</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
                    <div className="space-y-1.5"><Label>Heure</Label><Input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} /></div>
                  </div>

                  <LocationSelector value={location} onChange={setLocation} />

                  <div className="space-y-1.5">
                    <Label>Circonstances</Label>
                    <Textarea value={circonstances} onChange={(e) => setCirconstances(e.target.value)} rows={4} />
                  </div>

                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                    <p className="text-sm text-destructive font-medium">⚠️ Tout faux signalement est passible de poursuites judiciaires.</p>
                  </div>

                  <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground" size="lg" disabled={loading}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {loading ? "Envoi…" : "Confirmer le signalement"}
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
