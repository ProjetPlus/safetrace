import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-display text-6xl font-black text-primary mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Cette page n'existe pas sur SafeTrace</p>
          <Button asChild size="lg">
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" /> Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
