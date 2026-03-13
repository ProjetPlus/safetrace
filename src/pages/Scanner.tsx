import { useState, useRef, useEffect } from "react";
import { ScanLine, Search, Camera, Keyboard, Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type ResultStatus = "propre" | "vole" | "perdu" | "enquete" | "non_enregistre" | null;

interface ScanData {
  status: ResultStatus;
  marque?: string;
  modele?: string;
  categorie?: string;
  region?: string;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const detectType = (value: string): string => {
    if (/^\d{14,16}$/.test(value)) return "IMEI détecté";
    if (/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) return "Numéro de châssis (VIN) détecté";
    if (/^ST-CI-/i.test(value)) return "Code SafeTrace détecté";
    if (value.length > 3) return "Recherche en cours…";
    return "";
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) { toast({ title: "Erreur", description: "Veuillez saisir un identifiant.", variant: "destructive" }); return; }

    setLoading(true);
    setSearched(true);

    // Search in database
    let device = null;
    const q = query.trim();

    // Try token
    let { data } = await supabase.from("devices").select("*").eq("token", q).maybeSingle();
    if (!data) {
      // Try IMEI
      ({ data } = await supabase.from("devices").select("*").eq("imei1", q).maybeSingle());
    }
    if (!data) {
      ({ data } = await supabase.from("devices").select("*").eq("imei2", q).maybeSingle());
    }
    if (!data) {
      // Try chassis
      ({ data } = await supabase.from("devices").select("*").eq("chassis", q).maybeSingle());
    }
    if (!data) {
      // Try num_serie
      ({ data } = await supabase.from("devices").select("*").eq("num_serie", q).maybeSingle());
    }
    if (!data) {
      // Try plaque
      ({ data } = await supabase.from("devices").select("*").eq("plaque", q).maybeSingle());
    }

    setLoading(false);

    if (data) {
      setResult({
        status: data.statut as ResultStatus,
        marque: data.marque,
        modele: data.modele || undefined,
        categorie: data.categorie,
        region: data.region || undefined,
        dateEnregistrement: data.created_at,
      });

      // Create notification for device owner if scanned by someone else
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user?.id !== data.user_id) {
        await supabase.from("notifications").insert({
          user_id: data.user_id,
          title: "Votre appareil a été scanné",
          message: `Votre ${data.marque} ${data.modele || ""} (${data.token}) vient d'être scanné par quelqu'un.`,
          link: `/scan/${data.token}`,
        });
      }
    } else {
      setResult({ status: "non_enregistre" });
    }
  };

  // Camera handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      toast({ title: "Erreur", description: "Impossible d'accéder à la caméra.", variant: "destructive" });
      setMode("manual");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (mode === "camera") startCamera();
    else stopCamera();
    return () => stopCamera();
  }, [mode]);

  const resultDisplay: Record<string, { icon: any; bg: string; iconColor: string; title: string; desc: string }> = {
    propre: { icon: CheckCircle2, bg: "bg-green-50 border-green-200", iconColor: "text-green-600", title: "✅ Appareil propre", desc: "Cet appareil est enregistré et aucun signalement n'est actif." },
    vole: { icon: AlertTriangle, bg: "bg-red-50 border-red-200", iconColor: "text-red-600", title: "🔴 Signalé VOLÉ", desc: "ATTENTION — Cet appareil a été signalé volé. Ne l'achetez pas." },
    perdu: { icon: AlertTriangle, bg: "bg-yellow-50 border-yellow-200", iconColor: "text-yellow-600", title: "🟡 Signalé PERDU", desc: "Cet appareil a été déclaré perdu par son propriétaire." },
    enquete: { icon: Shield, bg: "bg-blue-50 border-blue-200", iconColor: "text-blue-600", title: "🔵 En enquête", desc: "Cet appareil fait l'objet d'une enquête." },
    non_enregistre: { icon: XCircle, bg: "bg-gray-50 border-gray-200", iconColor: "text-gray-500", title: "⚪ Non enregistré", desc: "Cet appareil n'est pas dans la base SafeTrace." },
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

              {searched && result && !loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <Card className={`border-2 ${resultDisplay[result.status!]?.bg}`}>
                    <CardContent className="p-6 text-center">
                      {(() => { const Icon = resultDisplay[result.status!]?.icon; return Icon ? <Icon className={`h-12 w-12 mx-auto mb-3 ${resultDisplay[result.status!]?.iconColor}`} /> : null; })()}
                      <h3 className="font-display text-xl font-bold mb-2">{resultDisplay[result.status!]?.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{resultDisplay[result.status!]?.desc}</p>
                      {result.marque && (
                        <div className="bg-card/80 rounded-xl p-3 text-left space-y-1 border text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Marque</span><span className="font-medium">{result.marque}</span></div>
                          {result.modele && <div className="flex justify-between"><span className="text-muted-foreground">Modèle</span><span className="font-medium">{result.modele}</span></div>}
                          {result.categorie && <div className="flex justify-between"><span className="text-muted-foreground">Catégorie</span><span className="font-medium">{result.categorie}</span></div>}
                          {result.region && <div className="flex justify-between"><span className="text-muted-foreground">Région</span><span className="font-medium">{result.region}</span></div>}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-2">
                <CardContent className="p-6">
                  {cameraActive ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <video ref={videoRef} className="w-full rounded-xl" autoPlay playsInline muted />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-safe-green rounded-xl" />
                      </div>
                      <p className="text-center text-sm text-muted-foreground mt-4">
                        Pointez la caméra vers un QR code SafeTrace ou un code-barres
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Chargement de la caméra…</p>
                    </div>
                  )}
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
