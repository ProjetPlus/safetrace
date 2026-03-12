import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const PaiementErreur = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-2 border-destructive/30">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-10 w-10 text-destructive" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">Paiement échoué</h1>
              <p className="text-muted-foreground mb-6">Le paiement n'a pas pu être effectué. Veuillez réessayer.</p>
              <div className="flex gap-3 justify-center">
                <Button asChild><Link to="/tableau-de-bord">Tableau de bord</Link></Button>
                <Button variant="outline" asChild><Link to="/enregistrer-bien">Réessayer</Link></Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default PaiementErreur;
