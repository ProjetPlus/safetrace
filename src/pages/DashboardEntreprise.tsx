import { useEffect, useState } from "react";
import { Package, Shield, AlertTriangle, Plus, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DashboardEntreprise = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, propres: 0, signales: 0 });

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase.from("devices").select("statut").eq("user_id", user.id);
      if (data) {
        setStats({
          total: data.length,
          propres: data.filter(d => d.statut === "propre").length,
          signales: data.filter(d => ["vole", "perdu", "enquete"].includes(d.statut)).length,
        });
      }
    };
    fetch();
  }, [user]);

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2"><Building2 className="h-7 w-7" /> Espace Entreprise</h1>
              <p className="text-muted-foreground text-sm">Gestion de votre parc d'équipements</p>
            </div>
            <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
              <Link to="/enregistrer-bien"><Plus className="h-4 w-4 mr-2" /> Enregistrer un équipement</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card><CardContent className="p-4 text-center">
              <Package className="h-6 w-6 mx-auto mb-2 text-safe-green" />
              <div className="font-display text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Équipements</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="font-display text-2xl font-bold">{stats.propres}</div>
              <p className="text-xs text-muted-foreground">En règle</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <div className="font-display text-2xl font-bold">{stats.signales}</div>
              <p className="text-xs text-muted-foreground">Signalés</p>
            </CardContent></Card>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/mes-biens"}>
              <CardContent className="p-6"><h3 className="font-display font-bold mb-1">📦 Parc d'équipements</h3><p className="text-sm text-muted-foreground">Gérer tous vos équipements</p></CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/signaler"}>
              <CardContent className="p-6"><h3 className="font-display font-bold mb-1">⚠️ Signaler un incident</h3><p className="text-sm text-muted-foreground">Vol, perte ou tentative</p></CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/scanner"}>
              <CardContent className="p-6"><h3 className="font-display font-bold mb-1">🔍 Scanner</h3><p className="text-sm text-muted-foreground">Vérifier un appareil</p></CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardEntreprise;
