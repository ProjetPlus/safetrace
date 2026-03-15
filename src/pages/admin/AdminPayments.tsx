import { useEffect, useState } from "react";
import { Search, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const { data } = await supabase.from("payments").select("*").order("created_at", { ascending: false });
    if (data) setPayments(data);
    setLoading(false);
  };

  const filtered = payments.filter(p => `${p.payment_reference || ""} ${p.description || ""}`.toLowerCase().includes(search.toLowerCase()));

  const statusCls: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-blue-100 text-blue-700",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2"><CreditCard className="h-6 w-6" /> Paiements ({payments.length})</h2>
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
                    <th className="text-left p-3 font-medium">Montant</th>
                    <th className="text-left p-3 font-medium">Statut</th>
                    <th className="text-left p-3 font-medium hidden sm:table-cell">Méthode</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Référence</th>
                    <th className="text-left p-3 font-medium hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : filtered.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-bold">{p.amount} {p.currency}</td>
                      <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusCls[p.status] || ""}`}>{p.status}</span></td>
                      <td className="p-3 hidden sm:table-cell capitalize">{p.payment_method}</td>
                      <td className="p-3 hidden md:table-cell font-mono text-xs text-muted-foreground">{p.payment_reference || "—"}</td>
                      <td className="p-3 hidden lg:table-cell text-muted-foreground">{new Date(p.created_at).toLocaleDateString("fr-FR")}</td>
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

export default AdminPayments;
