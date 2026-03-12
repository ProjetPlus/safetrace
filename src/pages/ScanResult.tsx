import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, CheckCircle2, AlertTriangle, XCircle, ScanLine, ArrowLeft, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type ScanStatus = "propre" | "vole" | "perdu" | "enquete" | "non_enregistre";

const statusConfig: Record<ScanStatus, { icon: any; bg: string; iconColor: string; borderColor: string; title: string; desc: string }> = {
  propre: { icon: CheckCircle2, bg: "bg-green-50", iconColor: "text-green-600", borderColor: "border-green-200", title: "✅ Appareil propre", desc: "Aucun signalement actif." },
  vole: { icon: AlertTriangle, bg: "bg-red-50", iconColor: "text-red-600", borderColor: "border-red-300", title: "🔴 SIGNALÉ VOLÉ", desc: "N'achetez PAS cet appareil." },
  perdu: { icon: AlertTriangle, bg: "bg-yellow-50", iconColor: "text-yellow-600", borderColor: "border-yellow-200", title: "🟡 Signalé PERDU", desc: "Déclaré perdu par son propriétaire." },
  enquete: { icon: Shield, bg: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-200", title: "🔵 En cours d'enquête", desc: "Il est déconseillé de l'acheter." },
  non_enregistre: { icon: XCircle, bg: "bg-gray-50", iconColor: "text-gray-500", borderColor: "border-gray-200", title: "⚪ Non enregistré", desc: "Pas dans la base SafeTrace." },
};

const ScanResult = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<ScanStatus>("non_enregistre");

  useEffect(() => {
    const fetchDevice = async () => {
      if (!token) { setLoading(false); return; }
      const { data: device } = await supabase.from("devices").select("*").eq("token", token).maybeSingle();
      if (device) {
        setData(device);
        setStatus(device.statut as ScanStatus);
      } else {
        setStatus("non_enregistre");
      }
      setLoading(false);
    };
    fetchDevice();
  }, [token]);

  const config = statusConfig[status];

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-safe-green/10 flex items-center justify-center mx-auto mb-4">
              <ScanLine className="h-8 w-8 text-safe-green" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Résultat du scan</h1>
            <p className="text-muted-foreground text-sm mt-1 font-mono">{token}</p>
          </motion.div>

          {loading ? (
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <div className="w-12 h-12 border-4 border-safe-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Vérification en cours…</p>
              </CardContent>
            </Card>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className={`border-2 ${config.borderColor} ${config.bg}`}>
                <CardContent className="p-8 text-center">
                  {(() => { const Icon = config.icon; return <Icon className={`h-16 w-16 mx-auto mb-4 ${config.iconColor}`} />; })()}
                  <h2 className="font-display text-xl md:text-2xl font-bold mb-3">{config.title}</h2>
                  <p className="text-muted-foreground mb-6">{config.desc}</p>

                  {data && status !== "non_enregistre" && (
                    <div className="bg-card/80 rounded-xl p-4 text-left space-y-2 mb-6 border">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Catégorie</span><span className="font-medium">{data.categorie}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Marque</span><span className="font-medium">{data.marque} {data.modele}</span></div>
                      {data.region && <div className="flex justify-between text-sm"><span className="text-muted-foreground"><MapPin className="h-3 w-3 inline mr-1" />Région</span><span className="font-medium">{data.region}</span></div>}
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Enregistré le</span><span className="font-medium">{new Date(data.created_at).toLocaleDateString("fr-FR")}</span></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="flex gap-3 mt-8 justify-center">
            <Button variant="outline" asChild><Link to="/scanner"><ArrowLeft className="h-4 w-4 mr-2" /> Nouveau scan</Link></Button>
            <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white"><Link to="/inscription">S'inscrire</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ScanResult;
