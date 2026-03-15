import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  };

  const filtered = users.filter(u => `${u.nom} ${u.prenoms} ${u.username} ${u.email}`.toLowerCase().includes(search.toLowerCase()));

  const typeColors: Record<string, string> = {
    particulier: "bg-blue-100 text-blue-700",
    commercant: "bg-purple-100 text-purple-700",
    entreprise: "bg-indigo-100 text-indigo-700",
    assurance: "bg-teal-100 text-teal-700",
    forces_securite: "bg-red-100 text-red-700",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2"><Users className="h-6 w-6" /> Utilisateurs ({users.length})</h2>
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
                    <th className="text-left p-3 font-medium">Utilisateur</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Email</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium hidden sm:table-cell">WhatsApp</th>
                    <th className="text-left p-3 font-medium hidden lg:table-cell">Inscrit le</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : filtered.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">
                        <div className="font-medium">{u.prenoms} {u.nom}</div>
                        <div className="text-xs text-muted-foreground">@{u.username}</div>
                      </td>
                      <td className="p-3 hidden md:table-cell text-muted-foreground">{u.email}</td>
                      <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[u.user_type] || "bg-gray-100 text-gray-700"}`}>{u.user_type}</span></td>
                      <td className="p-3 hidden sm:table-cell text-muted-foreground">{u.whatsapp || "—"}</td>
                      <td className="p-3 hidden lg:table-cell text-muted-foreground">{new Date(u.created_at).toLocaleDateString("fr-FR")}</td>
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

export default AdminUsers;
