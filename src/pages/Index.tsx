import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, ScanLine, Search, QrCode, ArrowRight,
  Smartphone, Car, Laptop, UserCheck,
  AlertTriangle, CheckCircle2, Eye, Users, Globe, Briefcase,
  Monitor, WashingMachine
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
  { icon: Smartphone, label: "Téléphones & Tablettes", desc: "IMEI, numéro de série", tarif: "200 F CFA" },
  { icon: Laptop, label: "Ordinateurs", desc: "Laptops, desktops, consoles", tarif: "500 F CFA" },
  { icon: Monitor, label: "Téléviseurs", desc: "TV, écrans, moniteurs", tarif: "500 F CFA" },
  { icon: WashingMachine, label: "Électroménager", desc: "Frigos, climatiseurs, machines", tarif: "500 F CFA" },
  { icon: Car, label: "Voitures", desc: "Véhicules automobiles", tarif: "2 000 F CFA" },
  { icon: Car, label: "Motos", desc: "Motos, tricycles", tarif: "1 000 F CFA" },
];

const steps = [
  { icon: UserCheck, title: "Créez votre compte", desc: "Inscrivez-vous, puis enregistrez vos appareils et véhicules en renseignant le numéro de série, la marque, le modèle et vos informations en tant que propriétaire." },
  { icon: AlertTriangle, title: "Signalez en cas de vol", desc: "En cas de vol ou de perte, signalez l'objet en quelques secondes. Il est immédiatement marqué comme « signalé volé » dans notre base de données, visible par tous." },
  { icon: Search, title: "Vérifiez avant d'acheter", desc: "Avant d'acheter un appareil ou un véhicule d'occasion, saisissez ou scannez son numéro de série. SafeTrace vous indique instantanément s'il est enregistré ou signalé volé." },
];

const valeurs = [
  { icon: QrCode, title: "Traçabilité garantie", desc: "Chaque appareil ou véhicule enregistré reçoit un identifiant unique et un QR code vérifiable." },
  { icon: Users, title: "Réseau de confiance", desc: "Particuliers, commerçants et forces de sécurité collaborent sur une même base de données fiable." },
  { icon: Globe, title: "Accessible partout", desc: "Depuis un smartphone, une tablette ou un ordinateur — sans contrainte technique." },
  { icon: Shield, title: "Service professionnel", desc: "SafeTrace est un acteur ivoirien du numérique engagé au service de la sécurité des transactions et de la protection des appareils et véhicules." },
];

const cibles = [
  { icon: UserCheck, title: "Particuliers", desc: "Protégez vos appareils personnels et vos véhicules contre le vol et la revente illégale." },
  { icon: Briefcase, title: "Commerçants et revendeurs", desc: "Sécurisez vos transactions de seconde main et renforcez la confiance de vos clients." },
  { icon: Globe, title: "Entreprises", desc: "Gérez et protégez votre parc d'équipements informatiques et matériels." },
  { icon: Shield, title: "Compagnies d'assurance", desc: "Facilitez la gestion et la vérification des sinistres déclarés." },
  { icon: Search, title: "Forces de sécurité", desc: "Identifiez rapidement le propriétaire légitime d'un objet saisi ou retrouvé." },
];

const tarifs = [
  { categorie: "Téléphone", tarif: "200 F CFA" },
  { categorie: "Ordinateur", tarif: "500 F CFA" },
  { categorie: "Téléviseur", tarif: "500 F CFA" },
  { categorie: "Appareil électroménager", tarif: "500 F CFA" },
  { categorie: "Moto", tarif: "1 000 F CFA" },
  { categorie: "Voiture / Véhicule automobile", tarif: "2 000 F CFA" },
];

const abonnements = [
  { nom: "Starter", prix: "5 000 F CFA / mois", desc: "Jusqu'à 50 enregistrements/mois. Idéal pour les petits revendeurs.", features: ["50 enregistrements/mois", "Vérifications illimitées", "Support standard"] },
  { nom: "Pro", prix: "10 000 F CFA / mois", desc: "Jusqu'à 200 enregistrements/mois. Pour les commerçants actifs.", features: ["200 enregistrements/mois", "Vérifications illimitées", "Historique des transactions", "Support prioritaire"] },
  { nom: "Business", prix: "20 000 F CFA / mois", desc: "Enregistrements illimités. Pour les grandes enseignes et entreprises.", features: ["Enregistrements illimités", "Vérifications illimitées", "Tableau de bord avancé", "API d'intégration", "Support dédié"] },
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
                <span className="text-sm font-medium">Plateforme de traçabilité des appareils et véhicules</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Enregistrez.<br />
                <span className="text-safe-green">Protégez.</span><br />
                Vérifiez.
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
                SafeTrace est le premier service numérique de traçabilité en Côte d'Ivoire. Enregistrez vos appareils électroniques et vos véhicules, signalez une perte ou un vol, et vérifiez l'origine d'un objet avant de l'acheter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-safe-green hover:bg-safe-green/90 text-white text-lg px-8 animate-pulse-green">
                  <Link to="/scanner">
                    <ScanLine className="h-5 w-5 mr-2" />
                    Scanner un appareil
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
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-safe-green text-white rounded-2xl px-4 py-2 shadow-xl"
                >
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 className="h-4 w-4" /> Appareil vérifié
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
                Vérifiez un appareil ou véhicule avant d'acheter
              </h2>
              <p className="text-muted-foreground">
                Scannez un QR code, IMEI, châssis ou plaque — aucun compte requis. La vérification est gratuite.
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

      {/* Pourquoi SafeTrace */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi SafeTrace ?</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-center mb-14">
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Chaque jour en Côte d'Ivoire, des téléphones, ordinateurs, téléviseurs, électroménagers, motos et voitures sont volés — et rarement retrouvés, faute d'un registre centralisé.
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mt-4">
              SafeTrace comble ce vide. Notre plateforme permet à tout propriétaire d'enregistrer ses appareils et véhicules par numéro de série, et à tout acheteur de vérifier l'historique d'un objet avant de conclure une transaction.
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mt-4">
              Un outil simple, fiable et accessible à tous — conçu pour renforcer la sécurité des transactions et lutter contre la revente d'objets volés.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {valeurs.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-safe-green/10 flex items-center justify-center flex-shrink-0">
                      <v.icon className="h-6 w-6 text-safe-green" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold mb-1">{v.title}</h3>
                      <p className="text-muted-foreground text-sm">{v.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 bg-safe-bg-blue">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comment fonctionne SafeTrace ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              3 étapes simples pour protéger vos appareils et véhicules
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
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

      {/* Catégories & Tarifs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tarifs d'enregistrement
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              L'enregistrement est simple et abordable. Un seul paiement par objet, valable à vie.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="max-w-2xl mx-auto mb-10">
            <Card className="border-2">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-display font-bold">Catégorie</th>
                      <th className="text-right p-4 font-display font-bold">Tarif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tarifs.map((t, i) => (
                      <tr key={t.categorie} className={i < tarifs.length - 1 ? "border-b" : ""}>
                        <td className="p-4 text-sm">{t.categorie}</td>
                        <td className="p-4 text-right font-display font-bold text-safe-green">{t.tarif}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-center text-sm text-muted-foreground mt-4">
              🔍 La vérification est <strong>gratuite</strong> pour tous — aucun compte requis.
            </p>
            <p className="text-center text-sm text-muted-foreground mt-1">
              🔄 Le transfert de propriété est payant selon le tarif de la catégorie concernée.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {categories.map((cat, i) => (
              <motion.div key={cat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-5 md:p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-safe-green/10 transition-colors">
                      <cat.icon className="h-6 w-6 text-primary group-hover:text-safe-green transition-colors" />
                    </div>
                    <h3 className="font-display font-semibold text-sm md:text-base mb-1">{cat.label}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm mb-2">{cat.desc}</p>
                    <span className="text-safe-green font-display font-bold text-sm">{cat.tarif}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Abonnements commerçants */}
      <section className="py-20 bg-safe-bg-blue">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Abonnements commerçants
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Des formules adaptées aux commerçants et revendeurs pour sécuriser leurs transactions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {abonnements.map((abo, i) => (
              <motion.div key={abo.nom} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className={`h-full border-2 ${i === 1 ? "border-safe-green shadow-lg" : ""}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    {i === 1 && (
                      <span className="bg-safe-green text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-3">Populaire</span>
                    )}
                    <h3 className="font-display text-xl font-bold mb-1">{abo.nom}</h3>
                    <p className="font-display text-2xl font-black text-safe-green mb-2">{abo.prix}</p>
                    <p className="text-muted-foreground text-sm mb-4">{abo.desc}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {abo.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-safe-green flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className={i === 1 ? "bg-safe-green hover:bg-safe-green/90 text-white" : ""} variant={i === 1 ? "default" : "outline"}>
                      <Link to="/inscription">Souscrire</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* À qui s'adresse SafeTrace */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              SafeTrace s'adresse à tous
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cibles.map((c, i) => (
              <motion.div key={c.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <c.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold mb-2">{c.title}</h3>
                    <p className="text-muted-foreground text-sm">{c.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statuts */}
      <section className="py-20 bg-safe-bg-blue">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Un système de statuts clair
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              À chaque scan, le statut de l'appareil ou du véhicule est affiché instantanément
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

      {/* Protection des données */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Protection de vos données
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vos informations personnelles sont protégées selon les meilleurs standards de sécurité.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Chiffrement des données", desc: "Toutes vos données sont chiffrées en transit et au repos (AES-256)." },
              { icon: Eye, title: "Politique de confidentialité", desc: "Aucune donnée n'est revendue. Vos informations restent strictement privées." },
              { icon: CheckCircle2, title: "Respect de la réglementation", desc: "SafeTrace respecte la réglementation en vigueur en Côte d'Ivoire sur la protection des données." },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Chaque appareil a une identité. Protégez la vôtre.
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Inscription gratuite. Enregistrement abordable. Protection immédiate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-safe-green hover:bg-safe-green/90 text-white text-lg px-8">
                <Link to="/inscription">
                  S'inscrire gratuitement
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 bg-transparent">
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
