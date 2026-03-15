import { useEffect, useState } from "react";
import { Users, Package, AlertTriangle, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["hsl(216,60%,26%)", "hsl(130,52%,50%)", "hsl(0,84%,60%)", "hsl(45,93%,47%)", "hsl(200,70%,50%)"];

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, devices: 0, reports: 0, payments: 0 });
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [recentDevices, setRecentDevices] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [users, devices, reports, payments] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("devices").select("*", { count: "exact", head: true }),
      supabase.from("reports").select("*", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("payments").select("*", { count: "exact", head: true }).eq("status", "completed"),
    ]);
    setStats({ users: users.count || 0, devices: devices.count || 0, reports: reports.count || 0, payments: payments.count || 0 });

    // Category breakdown
    const { data: devData } = await supabase.from("devices").select("categorie");
    if (devData) {
      const counts: Record<string, number> = {};
      devData.forEach((d: any) => { counts[d.categorie] = (counts[d.categorie] || 0) + 1; });
      setCategoryData(Object.entries(counts).map(([name, value]) => ({ name, value })));
    }

    // Status breakdown
    const { data: statData } = await supabase.from("devices").select("statut");
    if (statData) {
      const counts: Record<string, number> = {};
      statData.forEach((d: any) => { counts[d.statut] = (counts[d.statut] || 0) + 1; });
      setStatusData(Object.entries(counts).map(([name, value]) => ({ name, value })));
    }

    // Recent devices by day (last 7 days)
    const { data: recent } = await supabase.from("devices").select("created_at").order("created_at", { ascending: false }).limit(100);
    if (recent) {
      const days: Record<string, number> = {};
      recent.forEach((d: any) => {
        const day = new Date(d.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
        days[day] = (days[day] || 0) + 1;
      });
      setRecentDevices(Object.entries(days).slice(0, 7).reverse().map(([date, count]) => ({ date, count })));
    }
  };

  const statCards = [
    { icon: Users, label: "Utilisateurs", value: stats.users, color: "text-primary" },
    { icon: Package, label: "Appareils", value: stats.devices, color: "text-safe-green" },
    { icon: AlertTriangle, label: "Signalements actifs", value: stats.reports, color: "text-destructive" },
    { icon: CreditCard, label: "Paiements", value: stats.payments, color: "text-accent" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-bold">Tableau de bord</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 text-center">
                <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
                <div className="font-display text-2xl font-bold">{s.value}</div>
                <div className="text-muted-foreground text-xs">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-sm font-display">Enregistrements récents</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={recentDevices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="hsl(130,52%,50%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-display">Par catégorie</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-display">Par statut</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(216,60%,26%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
