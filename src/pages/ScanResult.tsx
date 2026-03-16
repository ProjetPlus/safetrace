import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, CheckCircle2, AlertTriangle, XCircle, ScanLine, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type ScanStatus = "propre" | "vole" | "perdu" | "enquete" | "retrouve" | "non_enregistre";

const SAFETRACE_CONTACT = "+225 07 07 16 79 21";
const SAFETRACE_WA = "2250707167921";

const statusConfig: Record<ScanStatus, { icon: any; bg: string; iconColor: string; borderColor: string; title: string; desc: string; action?: string }> = {
  propre: { icon: CheckCircle2, bg: "bg-green-50", iconColor: "text-green-600", borderColor: "border-green-200", title: "✅ Appareil propre — Aucun signalement", desc: "Cet appareil est enregistré sur SafeTrace et aucun signalement n'est actif. Vous pouvez procéder à l'achat en toute confiance." },
  vole: { icon: AlertTriangle, bg: "bg-red-50", iconColor: "text-red-600", borderColor: "border-red-300", title: "🔴 ATTENTION — Appareil signalé VOLÉ", desc: "Cet appareil a été signalé VOLÉ sur SafeTrace.", action: "⚠️ N'ACHETEZ PAS cet appareil. Veuillez SAISIR la personne en possession de cet actif et appeler immédiatement SafeTrace." },
  perdu: { icon: AlertTriangle, bg: "bg-yellow-50", iconColor: "text-yellow-600", borderColor: "border-yellow-200", title: "🟡 Appareil signalé PERDU", desc: "Cet appareil a été déclaré PERDU par son propriétaire.", action: "Veuillez contacter SafeTrace pour aider à la restitution de cet appareil." },
  enquete: { icon: Shield, bg: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-200", title: "🔵 Appareil en cours d'enquête", desc: "Cet appareil fait l'objet d'une enquête en cours.", action: "Contactez SafeTrace pour plus d'informations." },
  retrouve: { icon: CheckCircle2, bg: "bg-emerald-50", iconColor: "text-emerald-600", borderColor: "border-emerald-200", title: "🟢 Appareil retrouvé", desc: "Cet appareil a été précédemment signalé mais a été retrouvé par son propriétaire." },
  non_enregistre: { icon: XCircle, bg: "bg-gray-50", iconColor: "text-gray-500", borderColor: "border-gray-200", title: "⚪ Appareil non enregistré", desc: "Cet appareil n'est pas dans la base SafeTrace. Soyez prudent lors de l'achat.", action: "Demandez au vendeur de l'enregistrer sur SafeTrace avant tout achat." },
};

const ScanResult = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState<any>(null);
  const [status, setStatus] = useState<ScanStatus>("non_enregistre");

  useEffect(() => {
    const fetchDevice = async () => {
      if (!token) { setStatus("non_enregistre"); setLoading(false); return; }
      const { data } = await supabase.from("devices").select("*").eq("token", token).maybeSingle();
      if (data) {
        setDevice(data);
        setStatus(data.statut as ScanStatus);
        // Notify owner (no personal info exposed)
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user?.id !== data.user_id) {
          await supabase.from("notifications").insert({
            user_id: data.user_id,
            title: "Votre appareil a été scanné",
            message: `Votre ${data.marque} ${data.modele || ""} (${data.token}) vient d'être scanné.`,
            link: `/scan/${data.token}`,
          });
        }
      } else { setStatus("non_enregistre"); }
      setLoading(false);
    };
    fetchDevice();
  }, [token]);

  const config = statusConfig[status];

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-safe-green/10 flex items-center justify-center mx-auto mb-4">
              <ScanLine className="h-8 w-8 text-safe-green" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Résultat du scan</h1>
            <p className="text-muted-foreground text-sm mt-1 font-mono">{token}</p>
          </motion.div>

          {loading ? (
            <Card className="border-2"><CardContent className="p-12 text-center"><div className="w-12 h-12 border-4 border-safe-green border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-muted-foreground font-medium">Vérification en cours…</p></CardContent></Card>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <Card className={`border-2 ${config.borderColor} ${config.bg}`}>
                <CardContent className="p-6 text-center">
                  {(() => { const Icon = config.icon; return <Icon className={`h-14 w-14 mx-auto mb-3 ${config.iconColor}`} />; })()}
                  <h2 className="font-display text-lg md:text-xl font-bold mb-2">{config.title}</h2>
                  <p className="text-muted-foreground text-sm mb-2">{config.desc}</p>

                  {config.action && (
                    <p className="text-sm font-semibold mt-3 p-3 bg-card rounded-lg border">
                      {config.action}
                    </p>
                  )}

                  {device && (
                    <div className="bg-card/80 rounded-xl p-4 text-left space-y-2 mt-4 border text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Catégorie</span><span className="font-medium capitalize">{device.categorie}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Marque</span><span className="font-medium">{device.marque}</span></div>
                      {device.modele && <div className="flex justify-between"><span className="text-muted-foreground">Modèle</span><span className="font-medium">{device.modele}</span></div>}
                      {device.couleur && <div className="flex justify-between"><span className="text-muted-foreground">Couleur</span><span className="font-medium">{device.couleur}</span></div>}
                      <div className="flex justify-between"><span className="text-muted-foreground">Enregistré le</span><span className="font-medium">{new Date(device.created_at).toLocaleDateString("fr-FR")}</span></div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* SafeTrace contact - always shown */}
              <Card className="border-2 border-safe-green/30 bg-safe-bg-green">
                <CardContent className="p-4 text-center">
                  <Phone className="h-6 w-6 text-safe-green mx-auto mb-2" />
                  <p className="font-display font-bold text-sm mb-1">Contactez SafeTrace</p>
                  <p className="text-muted-foreground text-xs mb-3">Pour toute information complémentaire</p>
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
