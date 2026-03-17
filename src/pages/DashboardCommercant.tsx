import { useEffect, useState } from "react";
import { Package, TrendingUp, CreditCard, BarChart3, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DashboardCommercant = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ devices: 0, thisMonth: 0, payments: 0 });
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const [devRes, subRes, payRes] = await Promise.all([
        supabase.from("devices").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("merchant_subscriptions").select("*").eq("user_id", user.id).eq("is_active", true).maybeSingle(),
        supabase.from("payments").select("amount").eq("user_id", user.id).eq("status", "completed"),
      ]);
      const now = new Date();
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const { count: monthCount } = await supabase.from("devices").select("*", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", firstOfMonth);
      
      setStats({
        devices: devRes.count || 0,
        thisMonth: monthCount || 0,
        payments: payRes.data?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0,
      });
      setSubscription(subRes.data);
    };
    fetch();
  }, [user]);

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">Espace Commerçant</h1>
              <p className="text-muted-foreground text-sm">Gérez vos enregistrements et transactions</p>
            </div>
            <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
              <Link to="/enregistrer-bien"><Plus className="h-4 w-4 mr-2" /> Enregistrer un appareil</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card><CardContent className="p-4 text-center">
              <Package className="h-6 w-6 mx-auto mb-2 text-safe-green" />
              <div className="font-display text-2xl font-bold">{stats.devices}</div>
              <p className="text-xs text-muted-foreground">Appareils enregistrés</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-display text-2xl font-bold">{stats.thisMonth}</div>
              <p className="text-xs text-muted-foreground">Ce mois-ci</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-display text-2xl font-bold">{stats.payments.toLocaleString("fr-FR")} F</div>
              <p className="text-xs text-muted-foreground">Total payé</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <BarChart3 className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-display text-lg font-bold">{subscription?.plan || "Aucun"}</div>
              <p className="text-xs text-muted-foreground">Abonnement</p>
            </CardContent></Card>
          </div>

          {subscription && (
            <Card className="mb-8 border-safe-green/30">
              <CardHeader><CardTitle className="text-lg">Abonnement actif : {subscription.plan}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Limite mensuelle :</span> <strong>{subscription.max_registrations_per_month || "Illimité"}</strong></div>
                  <div><span className="text-muted-foreground">Utilisés ce mois :</span> <strong>{stats.thisMonth}</strong></div>
                  <div><span className="text-muted-foreground">Expire le :</span> <strong>{new Date(subscription.expires_at).toLocaleDateString("fr-FR")}</strong></div>
                  <div><span className="text-muted-foreground">Prix :</span> <strong>{subscription.price.toLocaleString("fr-FR")} F CFA</strong></div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/mes-biens"}>
              <CardContent className="p-6"><h3 className="font-display font-bold mb-1">📦 Mes appareils</h3><p className="text-sm text-muted-foreground">Voir tous les appareils enregistrés</p></CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/scanner"}>
              <CardContent className="p-6"><h3 className="font-display font-bold mb-1">🔍 Vérifier un appareil</h3><p className="text-sm text-muted-foreground">Scanner ou rechercher un appareil</p></CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardCommercant;
