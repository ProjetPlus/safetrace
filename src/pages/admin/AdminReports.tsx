import { useEffect, useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const AdminReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data } = await supabase.from("reports").select("*, devices(marque, modele, token)").order("created_at", { ascending: false });
    if (data) setReports(data);
    setLoading(false);
  };

  const filtered = reports.filter(r => `${r.numero_dossier} ${r.devices?.marque || ""} ${r.devices?.token || ""}`.toLowerCase().includes(search.toLowerCase()));

  const typeLabels: Record<string, string> = { vol: "🔴 Vol", perte: "🟡 Perte", tentative: "🔵 Tentative" };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2"><AlertTriangle className="h-6 w-6" /> Signalements ({reports.length})</h2>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="pl-10" />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">N° Dossier</th>
                    <th className="text-left p-3 font-medium hidden sm:table-cell">Appareil</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Date incident</th>
                    <th className="text-left p-3 font-medium">Actif</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : filtered.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-mono text-xs">{r.numero_dossier}</td>
                      <td className="p-3 hidden sm:table-cell">{r.devices?.marque} {r.devices?.modele || ""}</td>
                      <td className="p-3">{typeLabels[r.type_incident] || r.type_incident}</td>
                      <td className="p-3 hidden md:table-cell text-muted-foreground">{new Date(r.date_incident).toLocaleDateString("fr-FR")}</td>
                      <td className="p-3">{r.is_active ? <span className="text-destructive font-medium">Oui</span> : <span className="text-muted-foreground">Non</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
