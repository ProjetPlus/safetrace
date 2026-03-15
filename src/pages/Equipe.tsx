import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import drMarcelKonan from "@/assets/dr-marcel-konan.jpg";
import inocentKoffi from "@/assets/inocent-koffi.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

const founders = [
  {
    name: "Dr. Marcel KONAN",
    role: "Co-fondateur — Direction & Stratégie",
    desc: "Expert en gestion et structuration de projets, Dr. Marcel KONAN apporte son expérience dans l'accompagnement de porteurs de projets et la mobilisation de partenaires et d'investisseurs.",
    photo: drMarcelKonan,
  },
  {
    name: "Inocent KOFFI",
    role: "Co-fondateur — Technologie & Développement",
    desc: "Concepteur et développeur de la plateforme SafeTrace, Inocent KOFFI assure la conception technique, le développement de l'application et la sécurité de l'infrastructure numérique.",
    photo: inocentKoffi,
  },
];

const Equipe = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">L'équipe SafeTrace</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SafeTrace est porté par deux co-fondateurs aux expertises complémentaires.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >
              <div className="relative inline-block mb-6">
                {/* Decorative border: blue top-left, green bottom-right */}
                <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-t-4 border-l-4" style={{ borderColor: 'hsl(216, 60%, 26%)' }} />
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-b-4 border-r-4" style={{ borderColor: 'hsl(130, 52%, 50%)' }} />
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="relative w-64 h-72 object-cover object-top rounded-2xl z-10"
                />
              </div>
              <h3 className="font-display text-xl font-bold mb-1">{founder.name}</h3>
              <p className="text-sm font-medium text-primary mb-3">{founder.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{founder.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="mt-16 text-center bg-card border rounded-2xl p-8"
        >
          <p className="font-display text-xl font-bold text-primary mb-2">
            SafeTrace — Chaque appareil a une identité. Protégez la vôtre.
          </p>
          <p className="text-muted-foreground text-sm">
            📍 Daloa, Haut-Sassandra — Côte d'Ivoire
          </p>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Equipe;
