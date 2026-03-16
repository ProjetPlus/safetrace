import { useState, useRef, useEffect, useCallback } from "react";
import { ScanLine, Search, Camera, Keyboard, Shield, AlertTriangle, CheckCircle2, XCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Html5Qrcode } from "html5-qrcode";

const SAFETRACE_CONTACT = "+225 07 07 16 79 21";
const SAFETRACE_WA = "2250707167921";

type ResultStatus = "propre" | "vole" | "perdu" | "enquete" | "retrouve" | "non_enregistre" | null;

interface ScanData {
  status: ResultStatus;
  marque?: string;
  modele?: string;
  categorie?: string;
  couleur?: string;
  dateEnregistrement?: string;
}

const Scanner = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"manual" | "camera">("manual");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanData | null>(null);
  const [searched, setSearched] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerDivId = "qr-reader";

  const detectType = (value: string): string => {
    if (/^\d{14,16}$/.test(value)) return "IMEI détecté";
    if (/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) return "Numéro de châssis (VIN) détecté";
    if (/^ST-CI-/i.test(value)) return "Code SafeTrace détecté";
    if (value.length > 3) return "Recherche en cours…";
    return "";
  };

  const searchDevice = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);

    let data = null;
    const val = q.trim();

    // Try all identifiers
    for (const field of ["token", "imei1", "imei2", "chassis", "num_serie", "plaque"] as const) {
      const res = await supabase.from("devices").select("*").eq(field, val).maybeSingle();
      if (res.data) { data = res.data; break; }
    }

    setLoading(false);

    if (data) {
      setResult({
        status: data.statut as ResultStatus,
        marque: data.marque,
        modele: data.modele || undefined,
        categorie: data.categorie,
        couleur: data.couleur || undefined,
        dateEnregistrement: data.created_at,
      });

      // Notify owner
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user?.id !== data.user_id) {
        await supabase.from("notifications").insert({
          user_id: data.user_id,
          title: "Votre appareil a été scanné",
          message: `Votre ${data.marque} ${data.modele || ""} (${data.token}) vient d'être scanné.`,
          link: `/scan/${data.token}`,
        });
      }
    } else {
      setResult({ status: "non_enregistre" });
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) { toast({ title: "Erreur", description: "Veuillez saisir un identifiant.", variant: "destructive" }); return; }
    await searchDevice(query);
  };

  // QR Scanner with html5-qrcode
  const startScanner = useCallback(async () => {
    try {
      const scanner = new Html5Qrcode(scannerDivId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText) => {
          // QR code detected
          setQuery(decodedText);
          scanner.stop().then(() => {
            setCameraActive(false);
            setMode("manual");
            searchDevice(decodedText);
          });
        },
        () => { /* ignore errors during scanning */ }
      );
      setCameraActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      toast({ title: "Erreur caméra", description: "Impossible d'accéder à la caméra. Vérifiez les permissions.", variant: "destructive" });
      setMode("manual");
    }
  }, [searchDevice, toast]);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch { /* already stopped */ }
      scannerRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    if (mode === "camera") {
      // Small delay to let the div render
      const timer = setTimeout(() => startScanner(), 300);
      return () => { clearTimeout(timer); stopScanner(); };
    } else {
      stopScanner();
    }
    return () => { stopScanner(); };
  }, [mode]);

  const statusMessages: Record<string, { icon: any; bg: string; iconColor: string; title: string; desc: string; action?: string }> = {
    propre: {
      icon: CheckCircle2, bg: "bg-green-50 border-green-200", iconColor: "text-green-600",
      title: "✅ Appareil propre — Aucun signalement",
      desc: "Cet appareil est enregistré sur SafeTrace et aucun signalement n'est actif. Vous pouvez acheter cet appareil en toute sécurité.",
    },
    vole: {
      icon: AlertTriangle, bg: "bg-red-50 border-red-300", iconColor: "text-red-600",
      title: "🔴 ATTENTION — Appareil signalé VOLÉ",
      desc: "Cet appareil a été signalé VOLÉ sur SafeTrace.",
      action: "⚠️ N'ACHETEZ PAS cet appareil. Veuillez SAISIR la personne en possession de cet actif et appeler immédiatement SafeTrace.",
    },
    perdu: {
      icon: AlertTriangle, bg: "bg-yellow-50 border-yellow-200", iconColor: "text-yellow-600",
      title: "🟡 Appareil signalé PERDU",
      desc: "Cet appareil a été déclaré PERDU par son propriétaire.",
      action: "Veuillez contacter SafeTrace pour aider à restituer cet appareil à son propriétaire.",
    },
    enquete: {
      icon: Shield, bg: "bg-blue-50 border-blue-200", iconColor: "text-blue-600",
      title: "🔵 Appareil en cours d'enquête",
      desc: "Cet appareil fait l'objet d'une enquête en cours.",
      action: "Contactez SafeTrace pour plus d'informations sur cet appareil.",
    },
    retrouve: {
      icon: CheckCircle2, bg: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600",
      title: "🟢 Appareil retrouvé",
      desc: "Cet appareil a été précédemment signalé mais a été retrouvé par son propriétaire.",
    },
    non_enregistre: {
      icon: XCircle, bg: "bg-gray-50 border-gray-200", iconColor: "text-gray-500",
      title: "⚪ Appareil non enregistré",
      desc: "Cet appareil n'est pas dans la base SafeTrace. Soyez prudent lors de l'achat.",
      action: "Demandez au vendeur de l'enregistrer sur SafeTrace avant tout achat.",
    },
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-safe-green/10 flex items-center justify-center mx-auto mb-6">
              <ScanLine className="h-10 w-10 text-safe-green" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Scanner Universel</h1>
            <p className="text-muted-foreground text-lg">Vérifiez n'importe quel appareil ou véhicule — gratuit, aucun compte requis</p>
          </motion.div>

          <div className="flex gap-2 justify-center mb-8">
            <Button variant={mode === "manual" ? "default" : "outline"} onClick={() => setMode("manual")}>
              <Keyboard className="h-4 w-4 mr-2" /> Saisie manuelle
            </Button>
            <Button variant={mode === "camera" ? "default" : "outline"} onClick={() => setMode("camera")}>
              <Camera className="h-4 w-4 mr-2" /> Scanner caméra
            </Button>
          </div>

          {mode === "manual" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-2">
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input value={query} onChange={(e) => { setQuery(e.target.value); setSearched(false); setResult(null); }} placeholder="IMEI, châssis, plaque, code SafeTrace…" className="pl-12 h-14 text-lg rounded-xl" />
                    </div>
                    {query && <p className="text-sm text-safe-green font-medium flex items-center gap-2"><Shield className="h-4 w-4" /> {detectType(query)}</p>}
                    <Button type="submit" size="lg" className="w-full bg-safe-green hover:bg-safe-green/90 text-white text-lg" disabled={loading}>
                      <Search className="h-5 w-5 mr-2" />
                      {loading ? "Vérification…" : "Vérifier"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-2">
                <CardContent className="p-6">
                  <div id={scannerDivId} className="w-full rounded-xl overflow-hidden" />
                  {!cameraActive && (
                    <div className="text-center py-8">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
                      <p className="text-muted-foreground">Chargement de la caméra…</p>
                    </div>
                  )}
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Pointez la caméra vers un QR code SafeTrace
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Results */}
          {searched && result && !loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
              <Card className={`border-2 ${statusMessages[result.status!]?.bg}`}>
                <CardContent className="p-6 text-center">
                  {(() => { const Icon = statusMessages[result.status!]?.icon; return Icon ? <Icon className={`h-12 w-12 mx-auto mb-3 ${statusMessages[result.status!]?.iconColor}`} /> : null; })()}
                  <h3 className="font-display text-xl font-bold mb-2">{statusMessages[result.status!]?.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{statusMessages[result.status!]?.desc}</p>
                  
                  {statusMessages[result.status!]?.action && (
                    <p className="text-sm font-semibold mt-3 p-3 bg-card rounded-lg border">
                      {statusMessages[result.status!]?.action}
                    </p>
                  )}

                  {result.marque && (
                    <div className="bg-card/80 rounded-xl p-4 text-left space-y-2 mt-4 border text-sm">
                      {result.categorie && <div className="flex justify-between"><span className="text-muted-foreground">Catégorie</span><span className="font-medium capitalize">{result.categorie}</span></div>}
                      <div className="flex justify-between"><span className="text-muted-foreground">Marque</span><span className="font-medium">{result.marque}</span></div>
                      {result.modele && <div className="flex justify-between"><span className="text-muted-foreground">Modèle</span><span className="font-medium">{result.modele}</span></div>}
                      {result.couleur && <div className="flex justify-between"><span className="text-muted-foreground">Couleur</span><span className="font-medium">{result.couleur}</span></div>}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* SafeTrace contact - always shown */}
              <Card className="border-2 border-safe-green/30 bg-safe-bg-green">
                <CardContent className="p-4 text-center">
                  <Phone className="h-6 w-6 text-safe-green mx-auto mb-2" />
                  <p className="font-display font-bold text-sm mb-1">Contactez SafeTrace</p>
                  <p className="text-muted-foreground text-xs mb-3">Pour toute information ou signalement</p>
                  <div className="flex gap-2 justify-center">
                    <Button asChild size="sm" variant="outline">
                      <a href={`tel:${SAFETRACE_CONTACT.replace(/\s/g, "")}`}><Phone className="h-3 w-3 mr-1" /> Appeler</a>
                    </Button>
                    <Button asChild size="sm" className="bg-safe-green hover:bg-safe-green/90 text-white">
                      <a href={`https://wa.me/${SAFETRACE_WA}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "QR Code SafeTrace", desc: "Scan caméra" },
              { label: "IMEI", desc: "14-16 chiffres" },
              { label: "Châssis / VIN", desc: "17 caractères" },
              { label: "Plaque", desc: "Immatriculation" },
              { label: "N° Série", desc: "Numéro de série" },
              { label: "Code SafeTrace", desc: "ST-CI-XXXX" },
            ].map((t) => (
              <div key={t.label} className="bg-card border rounded-xl p-3 text-center">
                <div className="font-display font-semibold text-sm">{t.label}</div>
                <div className="text-muted-foreground text-xs">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Scanner;
