import { Shield, Users, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const APropos = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">À propos de SafeTrace</h1>
          <p className="text-muted-foreground text-lg">
            Initiative citoyenne pour la protection des biens en Côte d'Ivoire
          </p>
        </motion.div>

        <div className="prose prose-lg max-w-none mb-12">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-muted-foreground leading-relaxed">
            SafeTrace est née d'un constat simple : chaque jour, des milliers d'Ivoiriens sont victimes de vol de téléphones, motos, véhicules et autres biens de valeur. La plupart de ces biens ne sont jamais retrouvés, faute d'un système centralisé de traçabilité.
          </motion.p>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground leading-relaxed mt-4">
            Notre mission est de créer la première base de données nationale permettant à chaque citoyen d'enregistrer ses biens, de les signaler en cas de vol ou perte, et à tout acheteur de vérifier un bien avant achat.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Shield, title: "Protection", desc: "Chaque bien enregistré reçoit un QR code unique traçable." },
            { icon: Users, title: "Communautaire", desc: "Les citoyens et institutions collaborent pour retrouver les biens." },
            { icon: Globe, title: "Accessible", desc: "Gratuit pour tous, accessible depuis n'importe quel appareil." },
            { icon: Heart, title: "Citoyen", desc: "Une initiative au service de la communauté ivoirienne." },
          ].map((item, i) => (
            <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card>
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mt-16 text-center bg-card border rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold mb-4">Porté par</h2>
          <p className="font-display font-bold text-lg">Inocent KOFFI</p>
          <p className="text-muted-foreground text-sm">Visionnaire · Entrepreneur Social · Développeur Web</p>
          <p className="text-muted-foreground text-sm mt-2">📍 Daloa, Haut-Sassandra — Côte d'Ivoire</p>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default APropos;
