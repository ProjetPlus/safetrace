import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, ScanLine, Package, AlertTriangle, QrCode, Bell, ArrowRightLeft, List, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import TransferDialog from "@/components/TransferDialog";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
}

const Dashboard = () => {
  const { profile } = useAuth();
  const [qrDialog, setQrDialog] = useState<{ open: boolean; token: string; nom: string }>({ open: false, token: "", nom: "" });
  const [transferDialog, setTransferDialog] = useState<{ open: boolean; bienNom: string }>({ open: false, bienNom: "" });
  const [devices, setDevices] = useState<Device[]>([]);
  const [reportCount, setReportCount] = useState(0);
  const [notifCount, setNotifCount] = useState(0);
  const [loadingDevices, setLoadingDevices] = useState(true);

  useEffect(() => {
    fetchData();

    // Real-time subscription for devices
    const channel = supabase
      .channel("dashboard-devices")
      .on("postgres_changes", { event: "*", schema: "public", table: "devices" }, () => {
        fetchDevices();
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications" }, () => {
        fetchNotifCount();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchDevices(), fetchReportCount(), fetchNotifCount()]);
  };

  const fetchDevices = async () => {
    setLoadingDevices(true);
    const { data } = await supabase.from("devices").select("id, marque, modele, categorie, statut, token, imei1, num_serie, chassis").order("created_at", { ascending: false }).limit(10);
    if (data) setDevices(data);
    setLoadingDevices(false);
  };

  const fetchReportCount = async () => {
    const { count } = await supabase.from("reports").select("*", { count: "exact", head: true }).eq("is_active", true);
    setReportCount(count || 0);
  };

  const fetchNotifCount = async () => {
    const { count } = await supabase.from("notifications").select("*", { count: "exact", head: true }).eq("is_read", false);
    setNotifCount(count || 0);
  };

  const getStatutBadge = (statut: string) => {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      propre: { bg: "bg-green-100", text: "text-green-700", label: "✅ Propre" },
      vole: { bg: "bg-red-100", text: "text-red-700", label: "🔴 Volé" },
      perdu: { bg: "bg-yellow-100", text: "text-yellow-700", label: "🟡 Perdu" },
      enquete: { bg: "bg-blue-100", text: "text-blue-700", label: "🔵 En enquête" },
      retrouve: { bg: "bg-emerald-100", text: "text-emerald-700", label: "🟢 Retrouvé" },
    };
    const s = map[statut] || map.propre;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>{s.label}</span>;
  };

  const getDeviceName = (d: Device) => `${d.marque}${d.modele ? ` ${d.modele}` : ""}`;
  const getDeviceId = (d: Device) => d.imei1 || d.num_serie || d.chassis || d.token;

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">
                Bienvenue, {profile?.prenoms || "Utilisateur"} 👋
              </h1>
              <p className="text-muted-foreground">@{profile?.username} · Gérez et protégez vos appareils et véhicules</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
                <Link to="/enregistrer-bien"><Plus className="h-4 w-4 mr-2" /> Enregistrer</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/scanner"><ScanLine className="h-4 w-4 mr-2" /> Scanner</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/mes-biens"><List className="h-4 w-4 mr-2" /> Tous</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/profil"><User className="h-4 w-4 mr-2" /> Profil</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Package, label: "Appareils enregistrés", value: String(devices.length), color: "text-primary" },
              { icon: AlertTriangle, label: "Signalements actifs", value: String(reportCount), color: "text-destructive" },
              { icon: QrCode, label: "QR Codes générés", value: String(devices.length), color: "text-safe-green" },
              { icon: Bell, label: "Notifications", value: String(notifCount), color: "text-muted-foreground" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4 text-center">
                  <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
                  <div className="font-display text-2xl font-bold">{s.value}</div>
                  <div className="text-muted-foreground text-xs">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-xl">Mes appareils et véhicules</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/signaler"><AlertTriangle className="h-3 w-3 mr-1" /> Signaler</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {loadingDevices ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : devices.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun appareil enregistré</p>
                  <Button asChild className="mt-4 bg-safe-green hover:bg-safe-green/90 text-white">
                    <Link to="/enregistrer-bien">Enregistrer mon premier appareil</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {devices.map((item) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{getDeviceName(item)}</div>
                          <div className="text-sm text-muted-foreground">{item.categorie} · {getDeviceId(item)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatutBadge(item.statut)}
                        <Button variant="ghost" size="icon" onClick={() => setQrDialog({ open: true, token: item.token, nom: getDeviceName(item) })} title="QR Code">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setTransferDialog({ open: true, bienNom: getDeviceName(item) })} title="Transférer">
                          <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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

export default Dashboard;
