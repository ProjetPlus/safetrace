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
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Pourquoi SafeTrace ?</h1>
          <p className="text-muted-foreground text-lg">
            Plateforme de traçabilité des appareils et véhicules en Côte d'Ivoire
          </p>
        </motion.div>

        <div className="prose prose-lg max-w-none mb-12">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-muted-foreground leading-relaxed">
            Chaque jour en Côte d'Ivoire, des téléphones, ordinateurs, téléviseurs, électroménagers, motos et voitures sont volés — et rarement retrouvés, faute d'un registre centralisé.
          </motion.p>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground leading-relaxed mt-4">
            SafeTrace comble ce vide. Notre plateforme permet à tout propriétaire d'enregistrer ses appareils et véhicules par numéro de série, et à tout acheteur de vérifier l'historique d'un objet avant de conclure une transaction.
          </motion.p>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mt-4">
            Un outil simple, fiable et accessible à tous — conçu pour renforcer la sécurité des transactions et lutter contre la revente d'objets volés.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Shield, title: "Traçabilité garantie", desc: "Chaque appareil ou véhicule enregistré reçoit un identifiant unique et un QR code vérifiable." },
            { icon: Users, title: "Réseau de confiance", desc: "Particuliers, commerçants et forces de sécurité collaborent sur une même base de données fiable." },
            { icon: Globe, title: "Accessible partout", desc: "Depuis un smartphone, une tablette ou un ordinateur — sans contrainte technique." },
            { icon: Heart, title: "Service professionnel", desc: "SafeTrace est un acteur ivoirien du numérique engagé au service de la sécurité des transactions." },
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
