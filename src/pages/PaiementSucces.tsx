import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const PaiementSucces = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-green to-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-2 border-safe-green/30">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-safe-green/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-safe-green" />
                </div>
                <h1 className="font-display text-2xl font-bold mb-2">Paiement réussi !</h1>
                <p className="text-muted-foreground mb-6">Votre enregistrement a été confirmé avec succès.</p>
                <div className="flex gap-3 justify-center">
                  <Button asChild><Link to="/tableau-de-bord">Tableau de bord</Link></Button>
                  <Button variant="outline" asChild><Link to="/mes-appareils">Mes appareils</Link></Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PaiementSucces;
