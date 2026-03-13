import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Search, Filter, QrCode, AlertTriangle, ArrowRightLeft, Smartphone, Car, Laptop, Monitor, WashingMachine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import TransferDialog from "@/components/TransferDialog";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const categoryIcons: Record<string, any> = {
  telephone: Smartphone, voiture: Car, moto: Car, ordinateur: Laptop, televiseur: Monitor, electromenager: WashingMachine,
};

const categoryLabels: Record<string, string> = {
  telephone: "Téléphone", voiture: "Voiture", moto: "Moto", ordinateur: "Ordinateur", televiseur: "Téléviseur", electromenager: "Électroménager",
};

const statutConfig: Record<string, { bg: string; text: string; label: string }> = {
  propre: { bg: "bg-green-100", text: "text-green-700", label: "✅ Propre" },
  vole: { bg: "bg-red-100", text: "text-red-700", label: "🔴 Volé" },
  perdu: { bg: "bg-yellow-100", text: "text-yellow-700", label: "🟡 Perdu" },
  enquete: { bg: "bg-blue-100", text: "text-blue-700", label: "🔵 En enquête" },
  retrouve: { bg: "bg-emerald-100", text: "text-emerald-700", label: "🟢 Retrouvé" },
};

interface Device {
  id: string;
  marque: string;
  modele: string | null;
  categorie: string;
  statut: string;
  token: string;
  imei1: string | null;
  num_serie: string | null;
  chassis: string | null;
  created_at: string;
}

const MesBiens = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("tous");
  const [filterStatut, setFilterStatut] = useState("tous");
  const [qrDialog, setQrDialog] = useState<{ open: boolean; token: string; nom: string }>({ open: false, token: "", nom: "" });
  const [transferDialog, setTransferDialog] = useState<{ open: boolean; bienNom: string }>({ open: false, bienNom: "" });
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices();
    const channel = supabase
      .channel("mes-biens")
      .on("postgres_changes", { event: "*", schema: "public", table: "devices" }, () => fetchDevices())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    const { data } = await supabase.from("devices").select("id, marque, modele, categorie, statut, token, imei1, num_serie, chassis, created_at").order("created_at", { ascending: false });
    if (data) setDevices(data);
    setLoading(false);
  };

  const filtered = devices.filter((b) => {
    const name = `${b.marque} ${b.modele || ""} ${b.imei1 || ""} ${b.num_serie || ""} ${b.chassis || ""}`.toLowerCase();
    const matchSearch = name.includes(searchQuery.toLowerCase());
    const matchCat = filterCategorie === "tous" || b.categorie === filterCategorie;
    const matchStatut = filterStatut === "tous" || b.statut === filterStatut;
    return matchSearch && matchCat && matchStatut;
  });

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">Mes appareils et véhicules</h1>
              <p className="text-muted-foreground">{devices.length} enregistrement(s)</p>
            </div>
            <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
              <Link to="/enregistrer-bien"><Plus className="h-4 w-4 mr-2" /> Enregistrer</Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher par nom, marque, identifiant…" className="pl-10" />
                </div>
                <Select value={filterCategorie} onValueChange={setFilterCategorie}>
                  <SelectTrigger className="w-full md:w-48"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Catégorie" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Toutes</SelectItem>
                    <SelectItem value="telephone">Téléphones</SelectItem>
                    <SelectItem value="ordinateur">Ordinateurs</SelectItem>
                    <SelectItem value="televiseur">Téléviseurs</SelectItem>
                    <SelectItem value="electromenager">Électroménager</SelectItem>
                    <SelectItem value="voiture">Voitures</SelectItem>
                    <SelectItem value="moto">Motos</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatut} onValueChange={setFilterStatut}>
                  <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Statut" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous</SelectItem>
                    <SelectItem value="propre">Propre</SelectItem>
                    <SelectItem value="vole">Volé</SelectItem>
                    <SelectItem value="perdu">Perdu</SelectItem>
                    <SelectItem value="enquete">En enquête</SelectItem>
                    <SelectItem value="retrouve">Retrouvé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">Aucun appareil trouvé</p>
                <p className="text-sm">Modifiez vos filtres ou enregistrez un nouvel appareil.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, i) => {
                const CatIcon = categoryIcons[item.categorie] || Package;
                const statut = statutConfig[item.statut] || statutConfig.propre;
                const name = `${item.marque}${item.modele ? ` ${item.modele}` : ""}`;
                const identifier = item.imei1 || item.num_serie || item.chassis || item.token;
                return (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <CatIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-display font-semibold truncate">{name}</div>
                              <div className="text-sm text-muted-foreground truncate">{identifier}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {categoryLabels[item.categorie]} · {new Date(item.created_at).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statut.bg} ${statut.text} hidden sm:inline-block`}>{statut.label}</span>
                            <Button variant="ghost" size="icon" onClick={() => setQrDialog({ open: true, token: item.token, nom: name })} title="QR Code">
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setTransferDialog({ open: true, bienNom: name })} title="Transférer">
                              <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                            {item.statut === "propre" && (
                              <Button variant="ghost" size="icon" asChild title="Signaler">
                                <Link to="/signaler"><AlertTriangle className="h-4 w-4 text-destructive" /></Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Dialog open={qrDialog.open} onOpenChange={(open) => setQrDialog({ ...qrDialog, open })}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-display">QR Code — {qrDialog.nom}</DialogTitle></DialogHeader>
          {qrDialog.token && <QRCodeGenerator token={qrDialog.token} bienNom={qrDialog.nom} />}
        </DialogContent>
      </Dialog>

      <TransferDialog open={transferDialog.open} onOpenChange={(open) => setTransferDialog({ ...transferDialog, open })} bienNom={transferDialog.bienNom} />
    </Layout>
  );
};

export default MesBiens;
