import { useEffect, useState } from "react";
import { Search, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const statusLabels: Record<string, { label: string; cls: string }> = {
  propre: { label: "✅ Propre", cls: "bg-green-100 text-green-700" },
  vole: { label: "🔴 Volé", cls: "bg-red-100 text-red-700" },
  perdu: { label: "🟡 Perdu", cls: "bg-yellow-100 text-yellow-700" },
  enquete: { label: "🔵 Enquête", cls: "bg-blue-100 text-blue-700" },
  retrouve: { label: "🟢 Retrouvé", cls: "bg-emerald-100 text-emerald-700" },
};

const AdminDevices = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDevices(); }, []);

  const fetchDevices = async () => {
    setLoading(true);
    const { data } = await supabase.from("devices").select("*").order("created_at", { ascending: false });
    if (data) setDevices(data);
    setLoading(false);
  };

  const filtered = devices.filter(d => `${d.marque} ${d.modele || ""} ${d.token} ${d.imei1 || ""} ${d.chassis || ""}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2"><Package className="h-6 w-6" /> Appareils ({devices.length})</h2>
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
                    <th className="text-left p-3 font-medium">Appareil</th>
                    <th className="text-left p-3 font-medium hidden sm:table-cell">Catégorie</th>
                    <th className="text-left p-3 font-medium">Statut</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Token</th>
                    <th className="text-left p-3 font-medium hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : filtered.map((d) => {
                    const st = statusLabels[d.statut] || statusLabels.propre;
                    return (
                      <tr key={d.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">
                          <div className="font-medium">{d.marque} {d.modele || ""}</div>
                          <div className="text-xs text-muted-foreground">{d.imei1 || d.chassis || d.num_serie || "—"}</div>
                        </td>
                        <td className="p-3 hidden sm:table-cell text-muted-foreground capitalize">{d.categorie}</td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${st.cls}`}>{st.label}</span></td>
                        <td className="p-3 hidden md:table-cell font-mono text-xs text-muted-foreground">{d.token}</td>
                        <td className="p-3 hidden lg:table-cell text-muted-foreground">{new Date(d.created_at).toLocaleDateString("fr-FR")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDevices;
