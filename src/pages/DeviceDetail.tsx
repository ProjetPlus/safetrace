import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Package, QrCode, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Layout from "@/components/layout/Layout";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const statusLabels: Record<string, { label: string; cls: string }> = {
  propre: { label: "✅ Propre", cls: "bg-green-100 text-green-700" },
  vole: { label: "🔴 Volé", cls: "bg-red-100 text-red-700" },
  perdu: { label: "🟡 Perdu", cls: "bg-yellow-100 text-yellow-700" },
  enquete: { label: "🔵 En enquête", cls: "bg-blue-100 text-blue-700" },
  retrouve: { label: "🟢 Retrouvé", cls: "bg-emerald-100 text-emerald-700" },
};

const DeviceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [device, setDevice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [retireOpen, setRetireOpen] = useState(false);
  const [retireMotif, setRetireMotif] = useState("");
  const [retireLoading, setRetireLoading] = useState(false);
  
  // Edit fields
  const [modele, setModele] = useState("");
  const [couleur, setCouleur] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => { fetchDevice(); }, [id]);

  const fetchDevice = async () => {
    if (!id) return;
    setLoading(true);
    const { data } = await supabase.from("devices").select("*").eq("id", id).single();
    if (data) {
      setDevice(data);
      setModele(data.modele || "");
      setCouleur(data.couleur || "");
      setDescription(data.description || "");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!device) return;
    setSaving(true);
    const { error } = await supabase.from("devices").update({
      modele: modele || null,
      couleur: couleur || null,
      description: description || null,
    }).eq("id", device.id);
    setSaving(false);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "✅ Appareil mis à jour" });
    setEditing(false);
    fetchDevice();
  };

  const handleRetireReport = async () => {
    if (!device || !retireMotif) return;
    setRetireLoading(true);
    // Deactivate reports
    await supabase.from("reports").update({ is_active: false }).eq("device_id", device.id).eq("is_active", true);
    // Set device status back to propre
    await supabase.from("devices").update({ statut: "retrouve" as any }).eq("id", device.id);
    setRetireLoading(false);
    setRetireOpen(false);
    toast({ title: "✅ Signalement retiré", description: "Votre appareil est marqué comme retrouvé." });
    fetchDevice();
  };

  if (loading) return <Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></Layout>;
  if (!device) return <Layout><div className="text-center py-16"><p>Appareil non trouvé</p></div></Layout>;

  const st = statusLabels[device.statut] || statusLabels.propre;
  const canRetire = ["vole", "perdu", "enquete"].includes(device.statut) && device.user_id === user?.id;

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/mes-biens"><ArrowLeft className="h-4 w-4 mr-2" /> Mes appareils</Link>
          </Button>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-xl">{device.marque} {device.modele || ""}</CardTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${st.cls}`}>{st.label}</span>
                </div>
                <p className="text-sm text-muted-foreground font-mono">{device.token}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Catégorie</span><p className="font-medium capitalize">{device.categorie}</p></div>
                  <div><span className="text-muted-foreground">Couleur</span><p className="font-medium">{device.couleur || "—"}</p></div>
                  {device.imei1 && <div><span className="text-muted-foreground">IMEI 1</span><p className="font-medium font-mono">{device.imei1}</p></div>}
                  {device.imei2 && <div><span className="text-muted-foreground">IMEI 2</span><p className="font-medium font-mono">{device.imei2}</p></div>}
                  {device.num_serie && <div><span className="text-muted-foreground">N° Série</span><p className="font-medium font-mono">{device.num_serie}</p></div>}
                  {device.chassis && <div><span className="text-muted-foreground">Châssis</span><p className="font-medium font-mono">{device.chassis}</p></div>}
                  {device.plaque && <div><span className="text-muted-foreground">Plaque</span><p className="font-medium">{device.plaque}</p></div>}
                  {device.operateur && <div><span className="text-muted-foreground">Opérateur</span><p className="font-medium">{device.operateur}</p></div>}
                  {device.annee_achat && <div><span className="text-muted-foreground">Année d'achat</span><p className="font-medium">{device.annee_achat}</p></div>}
                  <div><span className="text-muted-foreground">Enregistré le</span><p className="font-medium">{new Date(device.created_at).toLocaleDateString("fr-FR")}</p></div>
                  {device.region && <div><span className="text-muted-foreground">Région</span><p className="font-medium">{device.region}</p></div>}
                </div>
                {device.description && <div className="text-sm"><span className="text-muted-foreground">Description</span><p className="mt-1">{device.description}</p></div>}

                {editing ? (
                  <div className="border-t pt-4 space-y-3">
                    <div className="space-y-1.5"><Label>Modèle</Label><Input value={modele} onChange={e => setModele(e.target.value)} /></div>
                    <div className="space-y-1.5"><Label>Couleur</Label><Input value={couleur} onChange={e => setCouleur(e.target.value)} /></div>
                    <div className="space-y-1.5"><Label>Description</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} /></div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} disabled={saving} className="flex-1"><Save className="h-4 w-4 mr-1" />{saving ? "..." : "Enregistrer"}</Button>
                      <Button variant="outline" onClick={() => setEditing(false)} className="flex-1">Annuler</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-4 border-t flex-wrap">
                    <Button variant="outline" onClick={() => setEditing(true)} className="flex-1">Modifier</Button>
                    <Button variant="outline" onClick={() => setQrOpen(true)} className="flex-1"><QrCode className="h-4 w-4 mr-1" /> QR Code</Button>
                    {canRetire && (
                      <Button variant="outline" onClick={() => setRetireOpen(true)} className="flex-1 text-safe-green border-safe-green">
                        <CheckCircle className="h-4 w-4 mr-1" /> Retrouvé
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-display">QR Code</DialogTitle></DialogHeader>
          <QRCodeGenerator token={device.token} bienNom={`${device.marque} ${device.modele || ""}`} />
        </DialogContent>
      </Dialog>

      <Dialog open={retireOpen} onOpenChange={setRetireOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-display">Retirer le signalement</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Indiquez le motif du retrait du signalement :</p>
            <Textarea value={retireMotif} onChange={e => setRetireMotif(e.target.value)} placeholder="Ex: Appareil retrouvé, faux signalement..." rows={3} />
            <Button onClick={handleRetireReport} disabled={!retireMotif || retireLoading} className="w-full bg-safe-green hover:bg-safe-green/90 text-white">
              {retireLoading ? "Traitement..." : "Confirmer le retrait"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DeviceDetail;
