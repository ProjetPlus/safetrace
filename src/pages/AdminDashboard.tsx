import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users, Package, AlertTriangle, CreditCard, BarChart3,
  Shield, ArrowRightLeft, Bell, TrendingUp, Eye, Settings,
  UserCheck, Briefcase, Building, Car, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["hsl(216, 60%, 26%)", "hsl(130, 52%, 50%)", "hsl(0, 84%, 60%)", "hsl(45, 93%, 47%)", "hsl(200, 70%, 50%)"];

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [stats, setStats] = useState({ users: 0, devices: 0, reports: 0, payments: 0, transfers: 0 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentDevices, setRecentDevices] = useState<any[]>([]);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [userTypeData, setUserTypeData] = useState<any[]>([]);
  const [deviceCategoryData, setDeviceCategoryData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [usersRes, devicesRes, reportsRes, paymentsRes, transfersRes] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact" }),
      supabase.from("devices").select("*", { count: "exact" }),
      supabase.from("reports").select("*", { count: "exact" }),
      supabase.from("payments").select("*", { count: "exact" }),
      supabase.from("transfers").select("*", { count: "exact" }),
    ]);

    setStats({
      users: usersRes.count || 0,
      devices: devicesRes.count || 0,
      reports: reportsRes.count || 0,
      payments: paymentsRes.count || 0,
      transfers: transfersRes.count || 0,
    });

    setRecentUsers((usersRes.data || []).slice(0, 10));
    setRecentDevices((devicesRes.data || []).slice(0, 10));
    setRecentReports((reportsRes.data || []).slice(0, 10));
    setRecentPayments((paymentsRes.data || []).slice(0, 10));

    // User type distribution
    const typeCounts: Record<string, number> = {};
    (usersRes.data || []).forEach((u: any) => {
      typeCounts[u.user_type] = (typeCounts[u.user_type] || 0) + 1;
    });
    setUserTypeData(Object.entries(typeCounts).map(([name, value]) => ({ name, value })));

    // Device category distribution
    const catCounts: Record<string, number> = {};
    (devicesRes.data || []).forEach((d: any) => {
      catCounts[d.categorie] = (catCounts[d.categorie] || 0) + 1;
    });
    setDeviceCategoryData(Object.entries(catCounts).map(([name, value]) => ({ name, value })));
  };

  const statCards = [
    { icon: Users, label: "Utilisateurs", value: stats.users, color: "text-primary" },
    { icon: Package, label: "Appareils enregistrés", value: stats.devices, color: "text-safe-green" },
    { icon: AlertTriangle, label: "Signalements", value: stats.reports, color: "text-destructive" },
    { icon: CreditCard, label: "Paiements", value: stats.payments, color: "text-primary" },
    { icon: ArrowRightLeft, label: "Transferts", value: stats.transfers, color: "text-safe-green" },
  ];

  return (
    <Layout>
      <section className="py-6 md:py-8 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Shield className="h-7 w-7 text-primary" /> Administration SafeTrace
              </h1>
              <p className="text-muted-foreground">Vue d'ensemble et gestion de la plateforme</p>
            </div>
            <Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4 mr-2" /> Déconnexion</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Répartition des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                {userTypeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={userTypeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                        {userTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Aucune donnée</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Appareils par catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                {deviceCategoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={deviceCategoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(130, 52%, 50%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Aucune donnée</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users">
            <TabsList className="mb-4">
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="devices">Appareils</TabsTrigger>
              <TabsTrigger value="reports">Signalements</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom d'utilisateur</TableHead>
                        <TableHead>Nom complet</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((u: any) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">@{u.username}</TableCell>
                          <TableCell>{u.nom} {u.prenoms}</TableCell>
                          <TableCell><span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{u.user_type}</span></TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>{new Date(u.created_at).toLocaleDateString("fr-FR")}</TableCell>
                        </TableRow>
                      ))}
                      {recentUsers.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Aucun utilisateur</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Marque</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDevices.map((d: any) => (
                        <TableRow key={d.id}>
                          <TableCell className="font-mono text-xs">{d.token}</TableCell>
                          <TableCell>{d.categorie}</TableCell>
                          <TableCell>{d.marque} {d.modele}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              d.statut === "propre" ? "bg-green-100 text-green-700" :
                              d.statut === "vole" ? "bg-red-100 text-red-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>{d.statut}</span>
                          </TableCell>
                          <TableCell>{new Date(d.created_at).toLocaleDateString("fr-FR")}</TableCell>
                        </TableRow>
                      ))}
                      {recentDevices.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Aucun appareil</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>N° Dossier</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actif</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentReports.map((r: any) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-mono text-xs">{r.numero_dossier}</TableCell>
                          <TableCell>{r.type_incident}</TableCell>
                          <TableCell>{new Date(r.date_incident).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell>{r.is_active ? "✅ Oui" : "Non"}</TableCell>
                        </TableRow>
                      ))}
                      {recentReports.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Aucun signalement</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPayments.map((p: any) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-mono text-xs">{p.payment_reference || "—"}</TableCell>
                          <TableCell className="font-bold">{p.amount} F CFA</TableCell>
                          <TableCell>{p.payment_method}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              p.status === "completed" ? "bg-green-100 text-green-700" :
                              p.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>{p.status}</span>
                          </TableCell>
                          <TableCell>{new Date(p.created_at).toLocaleDateString("fr-FR")}</TableCell>
                        </TableRow>
                      ))}
                      {recentPayments.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Aucun paiement</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
