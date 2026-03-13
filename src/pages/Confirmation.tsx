import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

const Confirmation = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const handleConfirmation = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const type = hashParams.get("type");

      if (type === "signup" || type === "email") {
        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            setStatus("error");
          } else {
            setStatus("success");
            setTimeout(() => navigate("/tableau-de-bord"), 3000);
          }
        } else {
          // Try to get session from URL params
          const { error } = await supabase.auth.getSession();
          if (error) {
            setStatus("error");
          } else {
            setStatus("success");
            setTimeout(() => navigate("/tableau-de-bord"), 3000);
          }
        }
      } else if (type === "recovery") {
        navigate("/reset-password" + window.location.hash);
      } else {
        // Check if already authenticated
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setStatus("success");
          setTimeout(() => navigate("/tableau-de-bord"), 3000);
        } else {
          setStatus("error");
        }
      }
    };

    handleConfirmation();
  }, [navigate]);

  return (
    <Layout>
      <section className="py-20 md:py-32 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-2">
            <CardContent className="p-8 text-center">
              {status === "loading" && (
                <>
                  <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                  <h2 className="font-display text-2xl font-bold mb-2">Vérification en cours…</h2>
                  <p className="text-muted-foreground">Validation de votre email</p>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 className="h-16 w-16 text-safe-green mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold mb-2">Email confirmé !</h2>
                  <p className="text-muted-foreground mb-6">Votre compte SafeTrace est maintenant actif. Vous allez être redirigé…</p>
                  <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
                    <Link to="/tableau-de-bord">Accéder au tableau de bord</Link>
                  </Button>
                </>
              )}
              {status === "error" && (
                <>
                  <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold mb-2">Erreur de confirmation</h2>
                  <p className="text-muted-foreground mb-6">Le lien est invalide ou a expiré. Veuillez vous reconnecter.</p>
                  <Button asChild>
                    <Link to="/connexion">Se connecter</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Confirmation;
