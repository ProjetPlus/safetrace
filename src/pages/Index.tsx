import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, ScanLine, Search, Bell, QrCode, ArrowRight,
  Smartphone, Car, Laptop, Zap, Gem, UserCheck,
  AlertTriangle, CheckCircle2, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import safetraceLogo from "@/assets/safetrace-logo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  }),
};

const categories = [
  { icon: Smartphone, label: "Téléphones & Tablettes", desc: "IMEI, numéro de série" },
  { icon: Car, label: "Véhicules & Motos", desc: "VIN, châssis, plaque" },
  { icon: Laptop, label: "Informatique", desc: "Ordinateurs, consoles" },
  { icon: Zap, label: "Énergie & Outillage", desc: "Panneaux solaires, groupes" },
  { icon: Gem, label: "Bijoux & Objets de valeur", desc: "Photos HD, descriptions" },
  { icon: Shield, label: "Électroménager", desc: "TV, frigos, climatiseurs" },
];

const steps = [
  { icon: UserCheck, title: "Inscrivez-vous", desc: "Créez votre compte gratuit en quelques secondes avec votre numéro WhatsApp." },
  { icon: QrCode, title: "Enregistrez vos biens", desc: "Ajoutez IMEI, châssis ou numéro de série. Un QR code unique est généré automatiquement." },
  { icon: Shield, title: "Protégez-les", desc: "En cas de vol ou perte, signalez et les autorités sont alertées instantanément." },
  { icon: Search, title: "Vérifiez avant d'acheter", desc: "Scannez n'importe quel bien pour vérifier qu'il n'est pas volé. Sans compte requis." },
];

const stats = [
  { value: "100%", label: "Gratuit pour les citoyens" },
  { value: "24/7", label: "Scanner accessible" },
  { value: "6", label: "Catégories de biens" },
  { value: "∞", label: "Biens enregistrables" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-safe-green rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-primary-foreground"
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-primary-foreground/20">
                <Shield className="h-4 w-4 text-safe-green" />
                <span className="text-sm font-medium">Plateforme nationale de protection des biens</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Identifie.<br />
                <span className="text-safe-green">Protège.</span><br />
                Retrouve.
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
                Enregistrez vos biens, signalez les vols, vérifiez avant d'acheter.
                La 1ère base de données citoyenne de traçabilité en Côte d'Ivoire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-safe-green hover:bg-safe-green/90 text-white text-lg px-8 animate-pulse-green">
                  <Link to="/scanner">
                    <ScanLine className="h-5 w-5 mr-2" />
                    Scanner un bien
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 bg-transparent">
                  <Link to="/inscription">
                    S'inscrire gratuitement
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-primary-foreground/5 rounded-3xl backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center animate-float">
                  <img src={safetraceLogo} alt="SafeTrace" className="w-64 h-auto rounded-2xl" />
                </div>
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-safe-green text-white rounded-2xl px-4 py-2 shadow-xl"
                >
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 className="h-4 w-4" /> Bien vérifié
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-destructive text-white rounded-2xl px-4 py-2 shadow-xl"
                >
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <AlertTriangle className="h-4 w-4" /> Signalé volé
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scanner public CTA */}
      <section className="py-12 bg-safe-bg-green">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="bg-card rounded-2xl shadow-lg border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-safe-green/10 flex items-center justify-center">
              <ScanLine className="h-8 w-8 text-safe-green" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">
                Vérifiez un bien avant d'acheter
              </h2>
              <p className="text-muted-foreground">
                Scannez un QR code, IMEI, châssis ou plaque — aucun compte requis.
              </p>
            </div>
            <Button size="lg" asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
              <Link to="/scanner">
                <ScanLine className="h-5 w-5 mr-2" />
                Ouvrir le scanner
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              4 étapes simples pour protéger vos biens
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <Card className="h-full border-2 hover:border-safe-green/50 transition-colors group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-safe-green/10 transition-colors">
                      <step.icon className="h-7 w-7 text-primary group-hover:text-safe-green transition-colors" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-safe-green text-white font-display font-bold text-sm flex items-center justify-center mx-auto mb-3">
                      {i + 1}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-20 bg-safe-bg-blue">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Protégez tous vos biens
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Téléphones, motos, voitures, électroménager, bijoux… tout est couvert.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-5 md:p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-safe-green/10 transition-colors">
                      <cat.icon className="h-6 w-6 text-primary group-hover:text-safe-green transition-colors" />
                    </div>
                    <h3 className="font-display font-semibold text-sm md:text-base mb-1">{cat.label}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">{cat.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-black text-safe-green mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statuts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Un système de statuts clair
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              À chaque scan, le statut du bien est affiché instantanément
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { color: "bg-gray-200 text-gray-600", label: "Non enregistré", emoji: "⚪" },
              { color: "bg-green-100 text-green-700", label: "Propre", emoji: "✅" },
              { color: "bg-yellow-100 text-yellow-700", label: "Signalé perdu", emoji: "🟡" },
              { color: "bg-red-100 text-red-700", label: "Signalé volé", emoji: "🔴" },
              { color: "bg-blue-100 text-blue-700", label: "En enquête", emoji: "🔵" },
              { color: "bg-emerald-100 text-emerald-700", label: "Retrouvé", emoji: "🟢" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`rounded-xl p-4 text-center ${s.color}`}
              >
                <div className="text-2xl mb-2">{s.emoji}</div>
                <div className="font-display font-semibold text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Protégez vos biens dès maintenant
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Inscription gratuite. Enregistrement illimité. Protection immédiate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-safe-green hover:bg-safe-green/90 text-white text-lg px-8">
                <Link to="/inscription">
                  S'inscrire gratuitement
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8">
                <Link to="/scanner">
                  <Eye className="h-5 w-5 mr-2" />
                  Essayer le scanner
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
