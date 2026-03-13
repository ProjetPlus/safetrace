import { Shield, Users, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import marcelPhoto from "@/assets/dr-marcel-konan.jpg";
import inocentPhoto from "@/assets/inocent-koffi.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const team = [
  {
    photo: marcelPhoto,
    nom: "Dr. Marcel KONAN",
    role: "Co-fondateur — Direction & Stratégie",
    desc: "Expert en gestion et structuration de projets, Dr. Marcel KONAN apporte son expérience dans l'accompagnement de porteurs de projets et la mobilisation de partenaires et d'investisseurs.",
  },
  {
    photo: inocentPhoto,
    nom: "Inocent KOFFI",
    role: "Co-fondateur — Technologie & Développement",
    desc: "Concepteur et développeur de la plateforme SafeTrace, Inocent KOFFI assure la conception technique, le développement de l'application et la sécurité de l'infrastructure numérique.",
  },
];

const Equipe = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">L'équipe SafeTrace</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SafeTrace est porté par deux co-fondateurs aux expertises complémentaires.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {team.map((member, i) => (
            <motion.div key={member.nom} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden relative">
                      {/* Branded border effect */}
                      <div className="absolute top-0 left-0 w-full h-2 bg-primary z-10" />
                      <div className="absolute top-0 left-0 w-2 h-full bg-primary z-10" />
                      <div className="absolute bottom-0 right-0 w-full h-2 bg-safe-green z-10" />
                      <div className="absolute top-0 right-0 w-2 h-full bg-safe-green z-10" />
                      <img
                        src={member.photo}
                        alt={member.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-1">{member.nom}</h3>
                    <p className="text-safe-green font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values section */}
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
          <p className="text-muted-foreground text-sm">📍 Daloa, Haut-Sassandra — Côte d'Ivoire</p>
          <p className="font-display font-bold text-lg mt-2 text-primary">SafeTrace — Chaque appareil a une identité. Protégez la vôtre.</p>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Equipe;
