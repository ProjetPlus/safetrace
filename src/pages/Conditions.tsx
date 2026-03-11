import Layout from "@/components/layout/Layout";

const Conditions = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
        <h1 className="font-display">Conditions d'utilisation</h1>
        <p className="text-muted-foreground">Dernière mise à jour : Février 2026</p>
        <h2>Objet</h2>
        <p>SafeTrace est une plateforme de traçabilité et protection des biens. L'utilisation est gratuite pour les citoyens. L'inscription implique l'acceptation des présentes conditions.</p>
        <h2>Responsabilités</h2>
        <p>L'utilisateur est responsable de l'exactitude des informations fournies. Tout faux signalement est passible de poursuites judiciaires.</p>
        <h2>Propriété intellectuelle</h2>
        <p>La plateforme SafeTrace, son design, son code et ses contenus sont la propriété de SafeTrace CI. Toute reproduction est interdite sans autorisation.</p>
        <h2>Limitation de responsabilité</h2>
        <p>SafeTrace ne garantit pas la récupération des biens signalés. La plateforme facilite la traçabilité mais ne se substitue pas aux forces de l'ordre.</p>
        <h2>Contact</h2>
        <p>Pour toute question : contact@safetrace.ci</p>
      </div>
    </section>
  </Layout>
);

export default Conditions;
