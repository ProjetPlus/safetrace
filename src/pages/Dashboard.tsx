import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ScanLine, Package, AlertTriangle, QrCode, Bell, ArrowRightLeft, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import TransferDialog from "@/components/TransferDialog";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [qrDialog, setQrDialog] = useState<{ open: boolean; token: string; nom: string }>({ open: false, token: "", nom: "" });
  const [transferDialog, setTransferDialog] = useState<{ open: boolean; bienNom: string }>({ open: false, bienNom: "" });

  const appareils = [
    { id: 1, nom: "iPhone 14 Pro", type: "Téléphone", identifiant: "IMEI: 352789102345678", statut: "propre", token: "ST-CI-2026-ABC12345" },
    { id: 2, nom: "Moto Honda CBR", type: "Moto", identifiant: "VIN: JH2MC130XXK000123", statut: "propre", token: "ST-CI-2026-XYZ98765" },
  ];

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

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground">Gérez et protégez vos appareils et véhicules</p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
                <Link to="/enregistrer-bien"><Plus className="h-4 w-4 mr-2" /> Enregistrer</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/scanner"><ScanLine className="h-4 w-4 mr-2" /> Scanner</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/mes-biens"><List className="h-4 w-4 mr-2" /> Tous mes appareils</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Package, label: "Appareils enregistrés", value: String(appareils.length), color: "text-primary" },
              { icon: AlertTriangle, label: "Signalements actifs", value: "0", color: "text-destructive" },
              { icon: QrCode, label: "QR Codes générés", value: String(appareils.length), color: "text-safe-green" },
              { icon: Bell, label: "Notifications", value: "0", color: "text-muted-foreground" },
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
              {appareils.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun appareil enregistré</p>
                  <Button asChild className="mt-4 bg-safe-green hover:bg-safe-green/90 text-white">
                    <Link to="/enregistrer-bien">Enregistrer mon premier appareil</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {appareils.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{item.nom}</div>
                          <div className="text-sm text-muted-foreground">{item.type} · {item.identifiant}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatutBadge(item.statut)}
                        <Button variant="ghost" size="icon" onClick={() => setQrDialog({ open: true, token: item.token, nom: item.nom })} title="Voir QR Code">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setTransferDialog({ open: true, bienNom: item.nom })} title="Transférer">
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
          <DialogHeader>
            <DialogTitle className="font-display">QR Code — {qrDialog.nom}</DialogTitle>
          </DialogHeader>
          {qrDialog.token && <QRCodeGenerator token={qrDialog.token} bienNom={qrDialog.nom} />}
        </DialogContent>
      </Dialog>

      <TransferDialog
        open={transferDialog.open}
        onOpenChange={(open) => setTransferDialog({ ...transferDialog, open })}
        bienNom={transferDialog.bienNom}
      />
    </Layout>
  );
};

export default Dashboard;
