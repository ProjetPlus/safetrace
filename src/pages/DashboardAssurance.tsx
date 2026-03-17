import { useState } from "react";
import { Search, Shield, FileText, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

const DashboardAssurance = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const val = query.trim();
    let data = null;
    for (const field of ["token", "imei1", "imei2", "chassis", "num_serie", "plaque"] as const) {
      const res = await supabase.from("devices").select("*").eq(field, val).maybeSingle();
      if (res.data) { data = res.data; break; }
    }
    setResult(data);
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7" /> Espace Assurance</h1>
            <p className="text-muted-foreground text-sm">Vérification et gestion des sinistres</p>
          </div>

          <Card className="border-2 mb-6">
            <CardContent className="p-6">
              <h3 className="font-display font-bold mb-4">Vérifier un appareil / véhicule</h3>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="IMEI, châssis, plaque, token..." className="pl-10" />
                </div>
                <Button type="submit" disabled={loading} className="bg-safe-green hover:bg-safe-green/90 text-white">
                  {loading ? "..." : "Vérifier"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className={`border-2 ${result.statut === "propre" ? "border-green-200 bg-green-50" : result.statut === "vole" ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className={`h-6 w-6 ${result.statut === "propre" ? "text-green-600" : "text-red-600"}`} />
                  <span className="font-display font-bold capitalize">{result.statut}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Catégorie</span><span className="font-medium capitalize">{result.categorie}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Marque</span><span className="font-medium">{result.marque}</span></div>
                  {result.modele && <div className="flex justify-between"><span className="text-muted-foreground">Modèle</span><span className="font-medium">{result.modele}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Token</span><span className="font-mono text-xs">{result.token}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Enregistré le</span><span>{new Date(result.created_at).toLocaleDateString("fr-FR")}</span></div>
                </div>
              </CardContent>
            </Card>
          )}

          {result === null && query && !loading && (
            <Card className="border-2 border-gray-200 bg-gray-50">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Aucun appareil trouvé avec cet identifiant.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DashboardAssurance;
