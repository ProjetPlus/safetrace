import { useState } from "react";
import { ScanLine, Search, Camera, Keyboard, Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

type ResultStatus = "propre" | "vole" | "perdu" | "non_enregistre" | null;

const Scanner = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"manual" | "camera">("manual");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultStatus>(null);
  const [searched, setSearched] = useState(false);

  const detectType = (value: string): string => {
    if (/^\d{14,16}$/.test(value)) return "IMEI détecté";
    if (/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) return "Numéro de châssis (VIN) détecté";
    if (/^ST-CI-/i.test(value)) return "Code SafeTrace détecté";
    if (/^\+?225/.test(value)) return "Numéro de téléphone détecté";
    if (value.length > 3) return "Recherche en cours…";
    return "";
  };

  const validateLuhn = (num: string): boolean => {
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
      let d = parseInt(num[num.length - 1 - i]);
      if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
    }
    return sum % 10 === 0;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) { toast({ title: "Erreur", description: "Veuillez saisir un identifiant.", variant: "destructive" }); return; }
    if (/^\d{14,16}$/.test(query) && !validateLuhn(query)) {
      toast({ title: "IMEI invalide", description: "Ce numéro IMEI ne passe pas la validation Luhn.", variant: "destructive" });
    }
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      setLoading(false);
      const rand = Math.random();
      if (rand < 0.3) setResult("propre");
      else if (rand < 0.5) setResult("vole");
      else if (rand < 0.7) setResult("perdu");
      else setResult("non_enregistre");
    }, 1500);
  };

  const resultDisplay = {
    propre: { icon: CheckCircle2, bg: "bg-green-50 border-green-200", iconColor: "text-green-600", title: "✅ Appareil propre", desc: "Cet appareil est enregistré et aucun signalement n'est actif." },
    vole: { icon: AlertTriangle, bg: "bg-red-50 border-red-200", iconColor: "text-red-600", title: "🔴 Signalé VOLÉ", desc: "ATTENTION — Cet appareil a été signalé volé. Ne l'achetez pas. Contactez le propriétaire ou les autorités." },
    perdu: { icon: AlertTriangle, bg: "bg-yellow-50 border-yellow-200", iconColor: "text-yellow-600", title: "🟡 Signalé PERDU", desc: "Cet appareil a été déclaré perdu par son propriétaire." },
    non_enregistre: { icon: XCircle, bg: "bg-gray-50 border-gray-200", iconColor: "text-gray-500", title: "⚪ Non enregistré", desc: "Cet appareil n'est pas dans la base SafeTrace. Cela ne signifie pas qu'il est volé." },
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
                      <Input value={query} onChange={(e) => { setQuery(e.target.value); setSearched(false); setResult(null); }} placeholder="IMEI, châssis, plaque, n° téléphone, code SafeTrace…" className="pl-12 h-14 text-lg rounded-xl" />
                    </div>
                    {query && (
                      <p className="text-sm text-safe-green font-medium flex items-center gap-2">
                        <Shield className="h-4 w-4" /> {detectType(query)}
                      </p>
                    )}
                    <Button type="submit" size="lg" className="w-full bg-safe-green hover:bg-safe-green/90 text-white text-lg" disabled={loading}>
                      <Search className="h-5 w-5 mr-2" />
                      {loading ? "Vérification en cours…" : "Vérifier cet appareil"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {searched && result && !loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <Card className={`border-2 ${resultDisplay[result].bg}`}>
                    <CardContent className="p-6 text-center">
                      {(() => { const Icon = resultDisplay[result].icon; return <Icon className={`h-12 w-12 mx-auto mb-3 ${resultDisplay[result].iconColor}`} />; })()}
                      <h3 className="font-display text-xl font-bold mb-2">{resultDisplay[result].title}</h3>
                      <p className="text-muted-foreground text-sm">{resultDisplay[result].desc}</p>
                      {(result === "vole" || result === "perdu") && (
                        <div className="flex gap-2 justify-center mt-4">
                          <Button size="sm" className="bg-safe-green hover:bg-safe-green/90 text-white">Contacter le propriétaire</Button>
                          <Button size="sm" variant="outline">Signaler à la police</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Le scanner caméra sera activé prochainement.<br />
                    Utilisez la saisie manuelle en attendant.
                  </p>
                  <Button variant="outline" onClick={() => setMode("manual")}>Passer en saisie manuelle</Button>
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
              { label: "N° Téléphone", desc: "+225…" },
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
