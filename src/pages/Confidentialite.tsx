import Layout from "@/components/layout/Layout";

const Confidentialite = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
        <h1 className="font-display">Politique de confidentialité</h1>
        <p className="text-muted-foreground">Dernière mise à jour : Février 2026</p>
        <h2>Collecte des données</h2>
        <p>SafeTrace collecte uniquement les données nécessaires au fonctionnement de la plateforme : informations d'identité, coordonnées, identifiants des biens enregistrés (IMEI, VIN, numéros de série) et photos.</p>
        <h2>Utilisation</h2>
        <p>Vos données sont utilisées exclusivement pour l'enregistrement de vos biens, le signalement de vols/pertes, et la vérification par des tiers. Aucune donnée n'est vendue à des tiers.</p>
        <h2>Sécurité</h2>
        <p>Les données sont chiffrées (AES-256) et stockées sur des serveurs sécurisés. L'accès est restreint et journalisé.</p>
        <h2>Vos droits</h2>
        <p>Conformément à la réglementation, vous pouvez demander l'accès, la modification ou la suppression de vos données en nous contactant.</p>
        <h2>Contact</h2>
        <p>Pour toute question : contact@safetrace.ci</p>
      </div>
    </section>
  </Layout>
);

export default Confidentialite;
