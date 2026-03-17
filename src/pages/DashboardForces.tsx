import { useEffect, useState } from "react";
import { Search, Shield, AlertTriangle, FileText, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

const DashboardForces = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [owner, setOwner] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statsCount, setStatsCount] = useState({ voles: 0, perdus: 0, enquetes: 0 });

  useEffect(() => {
    const fetchRecent = async () => {
      const { data } = await supabase.from("reports").select("*, devices(marque, modele, token, categorie)").order("created_at", { ascending: false }).limit(10);
      if (data) setRecentReports(data);

      const [v, p, e] = await Promise.all([
        supabase.from("devices").select("*", { count: "exact", head: true }).eq("statut", "vole"),
        supabase.from("devices").select("*", { count: "exact", head: true }).eq("statut", "perdu"),
        supabase.from("devices").select("*", { count: "exact", head: true }).eq("statut", "enquete"),
      ]);
      setStatsCount({ voles: v.count || 0, perdus: p.count || 0, enquetes: e.count || 0 });
    };
    fetchRecent();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setOwner(null);
    setReports([]);
    const val = query.trim();
    let data = null;
    for (const field of ["token", "imei1", "imei2", "chassis", "num_serie", "plaque"] as const) {
      const res = await supabase.from("devices").select("*").eq(field, val).maybeSingle();
      if (res.data) { data = res.data; break; }
    }
    if (data) {
      setResult(data);
      const { data: profile } = await supabase.from("profiles").select("nom, prenoms, whatsapp, email, departement, sous_prefecture").eq("id", data.user_id).maybeSingle();
      if (profile) setOwner(profile);
      const { data: reps } = await supabase.from("reports").select("*").eq("device_id", data.id).order("created_at", { ascending: false });
      if (reps) setReports(reps);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2"><Shield className="h-7 w-7" /> Espace Forces de Sécurité</h1>
            <p className="text-muted-foreground text-sm">Recherche et suivi des signalements</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="bg-red-50 border-red-200"><CardContent className="p-4 text-center">
              <div className="font-display text-2xl font-bold text-red-600">{statsCount.voles}</div>
              <p className="text-xs text-red-600/70">Appareils volés</p>
            </CardContent></Card>
            <Card className="bg-yellow-50 border-yellow-200"><CardContent className="p-4 text-center">
              <div className="font-display text-2xl font-bold text-yellow-600">{statsCount.perdus}</div>
              <p className="text-xs text-yellow-600/70">Appareils perdus</p>
            </CardContent></Card>
            <Card className="bg-blue-50 border-blue-200"><CardContent className="p-4 text-center">
              <div className="font-display text-2xl font-bold text-blue-600">{statsCount.enquetes}</div>
              <p className="text-xs text-blue-600/70">En enquête</p>
            </CardContent></Card>
          </div>

          <Card className="border-2 mb-6">
            <CardContent className="p-6">
              <h3 className="font-display font-bold mb-4">Rechercher un appareil</h3>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="IMEI, châssis, plaque, token..." className="pl-10" />
                </div>
                <Button type="submit" disabled={loading} className="bg-safe-green hover:bg-safe-green/90 text-white">Rechercher</Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-4 mb-8">
              <Card className={`border-2 ${result.statut === "vole" ? "border-red-300 bg-red-50" : result.statut === "perdu" ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {result.statut === "vole" ? <AlertTriangle className="h-6 w-6 text-red-600" /> : <Shield className="h-6 w-6 text-green-600" />}
                    <span className="font-display font-bold text-lg capitalize">{result.statut}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Marque :</span> <strong>{result.marque}</strong></div>
                    <div><span className="text-muted-foreground">Modèle :</span> <strong>{result.modele || "—"}</strong></div>
                    <div><span className="text-muted-foreground">Catégorie :</span> <strong className="capitalize">{result.categorie}</strong></div>
                    <div><span className="text-muted-foreground">Token :</span> <strong className="font-mono text-xs">{result.token}</strong></div>
                    {result.imei1 && <div><span className="text-muted-foreground">IMEI 1 :</span> <strong>{result.imei1}</strong></div>}
                    {result.chassis && <div><span className="text-muted-foreground">Châssis :</span> <strong>{result.chassis}</strong></div>}
                    {result.plaque && <div><span className="text-muted-foreground">Plaque :</span> <strong>{result.plaque}</strong></div>}
                  </div>
                </CardContent>
              </Card>

              {owner && (
                <Card className="border-2">
                  <CardHeader><CardTitle className="text-base">Propriétaire</CardTitle></CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>{owner.nom} {owner.prenoms}</strong></p>
                    {owner.whatsapp && <p>📱 {owner.whatsapp}</p>}
                    {owner.email && <p>✉️ {owner.email}</p>}
                    {(owner.departement || owner.sous_prefecture) && (
                      <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {owner.departement}{owner.sous_prefecture ? ` S/P ${owner.sous_prefecture}` : ""}</p>
                    )}
                  </CardContent>
                </Card>
              )}

              {reports.length > 0 && (
                <Card className="border-2">
                  <CardHeader><CardTitle className="text-base">Signalements ({reports.length})</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {reports.map(r => (
                      <div key={r.id} className="border rounded-lg p-3 text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium capitalize">{r.type_incident}</span>
                          <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Dossier : {r.numero_dossier}</p>
                        {r.circonstances && <p className="text-xs mt-1">{r.circonstances}</p>}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <Card className="border-2">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-5 w-5" /> Derniers signalements</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">Appareil</th>
                    <th className="p-3 text-left font-medium">Type</th>
                    <th className="p-3 text-left font-medium hidden md:table-cell">Dossier</th>
                    <th className="p-3 text-left font-medium">Date</th>
                  </tr></thead>
                  <tbody>
                    {recentReports.map(r => (
                      <tr key={r.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{(r.devices as any)?.marque} {(r.devices as any)?.modele || ""}</td>
                        <td className="p-3 capitalize">{r.type_incident}</td>
                        <td className="p-3 hidden md:table-cell font-mono text-xs">{r.numero_dossier}</td>
                        <td className="p-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString("fr-FR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardForces;
