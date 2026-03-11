import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Search, Filter, QrCode, AlertTriangle, ArrowRightLeft, Smartphone, Car, Laptop, Zap, Gem, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

const categoryIcons: Record<string, any> = {
  telephone: Smartphone,
  vehicule: Car,
  informatique: Laptop,
  energie: Zap,
  bijoux: Gem,
  electromenager: Shield,
};

const categoryLabels: Record<string, string> = {
  telephone: "Téléphone",
  vehicule: "Véhicule",
  informatique: "Informatique",
  energie: "Énergie",
  bijoux: "Bijoux",
  electromenager: "Électroménager",
};

const statutConfig: Record<string, { bg: string; text: string; label: string }> = {
  propre: { bg: "bg-green-100", text: "text-green-700", label: "✅ Propre" },
  vole: { bg: "bg-red-100", text: "text-red-700", label: "🔴 Volé" },
  perdu: { bg: "bg-yellow-100", text: "text-yellow-700", label: "🟡 Perdu" },
  enquete: { bg: "bg-blue-100", text: "text-blue-700", label: "🔵 En enquête" },
  retrouve: { bg: "bg-emerald-100", text: "text-emerald-700", label: "🟢 Retrouvé" },
};

// Demo data
const demoBiens = [
  { id: 1, nom: "iPhone 14 Pro", categorie: "telephone", marque: "Apple", identifiant: "IMEI: 352789102345678", statut: "propre", token: "ST-CI-2026-ABC12345", dateEnregistrement: "2026-01-15" },
  { id: 2, nom: "Moto Honda CBR", categorie: "vehicule", marque: "Honda", identifiant: "VIN: JH2MC130XXK000123", statut: "propre", token: "ST-CI-2026-XYZ98765", dateEnregistrement: "2026-02-01" },
  { id: 3, nom: "MacBook Pro 16\"", categorie: "informatique", marque: "Apple", identifiant: "S/N: C02XL0FDJGH5", statut: "vole", token: "ST-CI-2026-MAC45678", dateEnregistrement: "2025-11-20" },
  { id: 4, nom: "Panneau Solaire 400W", categorie: "energie", marque: "JA Solar", identifiant: "S/N: JAS400-2024-001", statut: "propre", token: "ST-CI-2026-SOL11111", dateEnregistrement: "2026-02-10" },
  { id: 5, nom: "Bague en Or 18K", categorie: "bijoux", marque: "Artisanal", identifiant: "Poids: 12g", statut: "perdu", token: "ST-CI-2026-BIJ22222", dateEnregistrement: "2026-01-05" },
];

const MesBiens = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("tous");
  const [filterStatut, setFilterStatut] = useState("tous");
  const [qrDialog, setQrDialog] = useState<{ open: boolean; token: string; nom: string }>({ open: false, token: "", nom: "" });
  const [transferDialog, setTransferDialog] = useState<{ open: boolean; bienId: number; bienNom: string }>({ open: false, bienId: 0, bienNom: "" });

  const filtered = demoBiens.filter((b) => {
    const matchSearch = b.nom.toLowerCase().includes(searchQuery.toLowerCase()) || b.identifiant.toLowerCase().includes(searchQuery.toLowerCase()) || b.marque.toLowerCase().includes(searchQuery.toLowerCase());
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
              <h1 className="font-display text-2xl md:text-3xl font-bold">Mes biens</h1>
              <p className="text-muted-foreground">{demoBiens.length} bien(s) enregistré(s)</p>
            </div>
            <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
              <Link to="/enregistrer-bien"><Plus className="h-4 w-4 mr-2" /> Enregistrer un bien</Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher par nom, marque, identifiant…" className="pl-10" />
                </div>
                <Select value={filterCategorie} onValueChange={setFilterCategorie}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Toutes catégories</SelectItem>
                    <SelectItem value="telephone">Téléphones</SelectItem>
                    <SelectItem value="vehicule">Véhicules</SelectItem>
                    <SelectItem value="informatique">Informatique</SelectItem>
                    <SelectItem value="energie">Énergie</SelectItem>
                    <SelectItem value="bijoux">Bijoux</SelectItem>
                    <SelectItem value="electromenager">Électroménager</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatut} onValueChange={setFilterStatut}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les statuts</SelectItem>
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

          {/* Results */}
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">Aucun bien trouvé</p>
                <p className="text-sm">Modifiez vos filtres ou enregistrez un nouveau bien.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((bien, i) => {
                const CatIcon = categoryIcons[bien.categorie] || Package;
                const statut = statutConfig[bien.statut] || statutConfig.propre;
                return (
                  <motion.div
                    key={bien.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <CatIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-display font-semibold truncate">{bien.nom}</div>
                              <div className="text-sm text-muted-foreground truncate">{bien.marque} · {bien.identifiant}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {categoryLabels[bien.categorie]} · Enregistré le {new Date(bien.dateEnregistrement).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statut.bg} ${statut.text} hidden sm:inline-block`}>{statut.label}</span>
                            <Button variant="ghost" size="icon" onClick={() => setQrDialog({ open: true, token: bien.token, nom: bien.nom })} title="QR Code">
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setTransferDialog({ open: true, bienId: bien.id, bienNom: bien.nom })} title="Transférer">
                              <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                            {bien.statut === "propre" && (
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

export default MesBiens;
