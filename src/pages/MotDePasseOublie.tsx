import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MotDePasseOublie = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast({ title: "Erreur", description: "Veuillez saisir votre email.", variant: "destructive" }); return; }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    setSent(true);
    toast({ title: "✅ Email envoyé", description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe." });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-md">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/connexion"><ArrowLeft className="h-4 w-4 mr-2" /> Retour à la connexion</Link>
          </Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">Mot de passe oublié</CardTitle>
                <CardDescription>Saisissez l'email de votre compte pour recevoir un lien de réinitialisation</CardDescription>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="text-center py-4">
                    <Mail className="h-12 w-12 text-safe-green mx-auto mb-4" />
                    <p className="font-medium mb-2">Email envoyé !</p>
                    <p className="text-sm text-muted-foreground">Vérifiez votre boîte mail (et vos spams) pour réinitialiser votre mot de passe.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email de votre compte</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" className="pl-10" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? "Envoi…" : "Envoyer le lien"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default MotDePasseOublie;
