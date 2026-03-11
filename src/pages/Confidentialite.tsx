import Layout from "@/components/layout/Layout";

const Confidentialite = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
        <h1 className="font-display">Politique de confidentialité</h1>
        <p className="text-muted-foreground">Dernière mise à jour : Mars 2026</p>

        <h2>Collecte des données</h2>
        <p>SafeTrace collecte uniquement les données nécessaires au fonctionnement de la plateforme : informations d'identité, coordonnées, identifiants des appareils et véhicules enregistrés (IMEI, VIN, numéros de série) et photos.</p>

        <h2>Utilisation</h2>
        <p>Vos données sont utilisées exclusivement pour l'enregistrement de vos appareils et véhicules, le signalement de vols/pertes, et la vérification par des tiers. Aucune donnée n'est vendue à des tiers.</p>

        <h2>Chiffrement des données</h2>
        <p>Toutes les données personnelles et les identifiants de vos appareils sont chiffrés en transit (TLS/SSL) et au repos (AES-256). Les mots de passe sont hashés avec des algorithmes sécurisés et ne sont jamais stockés en clair.</p>

        <h2>Protection des données</h2>
        <p>SafeTrace met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction :</p>
        <ul>
          <li>Chiffrement de bout en bout des données sensibles</li>
          <li>Accès restreint et journalisé aux bases de données</li>
          <li>Sauvegardes régulières et sécurisées</li>
          <li>Surveillance continue des systèmes</li>
          <li>Authentification forte pour les accès administratifs</li>
        </ul>

        <h2>Respect de la réglementation</h2>
        <p>SafeTrace respecte la réglementation en vigueur en Côte d'Ivoire relative à la protection des données personnelles, notamment la loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel. Nous nous conformons également aux bonnes pratiques internationales en matière de protection de la vie privée.</p>

        <h2>Vos droits</h2>
        <p>Conformément à la réglementation, vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Droit d'accès</strong> : vous pouvez demander une copie de vos données personnelles</li>
          <li><strong>Droit de rectification</strong> : vous pouvez demander la correction de données inexactes</li>
          <li><strong>Droit de suppression</strong> : vous pouvez demander la suppression de vos données</li>
          <li><strong>Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données</li>
        </ul>

        <h2>Partage des données</h2>
        <p>Les informations de traçabilité (statut d'un appareil : propre, volé, perdu) sont accessibles publiquement lors d'une vérification. Les données personnelles du propriétaire ne sont jamais exposées directement — seul un moyen de contact sécurisé est proposé en cas de signalement.</p>

        <h2>Durée de conservation</h2>
        <p>Vos données sont conservées aussi longtemps que votre compte est actif et que vos appareils sont enregistrés. En cas de suppression de compte, vos données sont supprimées dans un délai de 30 jours.</p>

        <h2>Contact</h2>
        <p>Pour toute question relative à la protection de vos données ou pour exercer vos droits : <strong>contact@safetrace.ci</strong></p>
      </div>
    </section>
  </Layout>
);

export default Confidentialite;
