import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Phone, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Connexion = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifiant) { toast({ title: "Erreur", description: "Veuillez saisir votre identifiant.", variant: "destructive" }); return; }
    if (!password) { toast({ title: "Erreur", description: "Veuillez saisir votre mot de passe.", variant: "destructive" }); return; }

    setLoading(true);
    // Simulate login - will be connected to Supabase
    setTimeout(() => {
      setLoading(false);
      toast({ title: "✅ Connexion réussie", description: "Bienvenue sur SafeTrace !" });
      navigate("/tableau-de-bord");
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <LogIn className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">Connexion</CardTitle>
                <CardDescription>Accédez à votre espace SafeTrace</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="identifiant">WhatsApp ou Email</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="identifiant" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} placeholder="+225 07... ou email" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link to="#" className="text-xs text-primary hover:underline">Mot de passe oublié ?</Link>
                    </div>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Votre mot de passe" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    <LogIn className="h-4 w-4 mr-2" />
                    {loading ? "Connexion…" : "Se connecter"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Pas encore de compte ?{" "}
                    <Link to="/inscription" className="text-safe-green font-medium hover:underline">S'inscrire gratuitement</Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Connexion;
