import Layout from "@/components/layout/Layout";

const Confidentialite = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Politique de confidentialité</h1>
        <p className="text-muted-foreground mb-10">Dernière mise à jour : Mars 2026</p>

        <div className="space-y-10 text-foreground leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-bold mb-3">1. Collecte des données</h2>
            <p className="mb-3">
              SafeTrace collecte <strong>uniquement les données nécessaires</strong> au fonctionnement de la plateforme :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Informations d'identité : <strong>nom, prénoms, photo de profil</strong></li>
              <li>Coordonnées : <strong>email, numéro WhatsApp</strong></li>
              <li>Identifiants des appareils et véhicules : <strong>IMEI, VIN, numéros de série, plaques d'immatriculation</strong></li>
              <li>Photos des appareils enregistrés</li>
              <li>Données de localisation lors de l'enregistrement</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">2. Utilisation des données</h2>
            <p className="mb-3">
              Vos données sont utilisées <strong>exclusivement</strong> pour les finalités suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>L'enregistrement</strong> et la traçabilité de vos appareils et véhicules</li>
              <li><strong>Le signalement</strong> de vols ou de pertes</li>
              <li><strong>La vérification</strong> du statut d'un appareil par des tiers (sans exposition des données personnelles du propriétaire)</li>
              <li><strong>Les notifications</strong> lorsque vos appareils sont scannés</li>
              <li><strong>Le traitement des paiements</strong> via notre partenaire Wave CI</li>
            </ul>
            <p className="mt-3 font-semibold">Aucune donnée n'est vendue à des tiers.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">3. Chiffrement et sécurité des données</h2>
            <p className="mb-3">
              Toutes les données personnelles et les identifiants de vos appareils bénéficient de <strong>mesures de protection avancées</strong> :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Chiffrement en transit</strong> via TLS/SSL pour toutes les communications</li>
              <li><strong>Chiffrement au repos</strong> (AES-256) pour les données stockées</li>
              <li>Les mots de passe sont <strong>hashés avec des algorithmes sécurisés</strong> et ne sont jamais stockés en clair</li>
              <li>Authentification renforcée pour les accès administratifs</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">4. Protection des données personnelles</h2>
            <p className="mb-3">
              SafeTrace met en œuvre des <strong>mesures techniques et organisationnelles appropriées</strong> pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Accès restreint et journalisé</strong> aux bases de données</li>
              <li><strong>Sauvegardes régulières</strong> et sécurisées</li>
              <li><strong>Surveillance continue</strong> des systèmes</li>
              <li><strong>Politiques de sécurité au niveau des lignes (RLS)</strong> pour isoler les données utilisateur</li>
              <li><strong>Aucune exposition</strong> des données personnelles du propriétaire lors des vérifications publiques</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">5. Confidentialité lors des vérifications</h2>
            <p className="mb-3">
              Lorsqu'un tiers vérifie le statut d'un appareil :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Seul le <strong>statut de l'appareil</strong> est affiché (propre, volé, perdu, en enquête)</li>
              <li>Les <strong>données personnelles du propriétaire ne sont jamais exposées</strong></li>
              <li>Un <strong>contact sécurisé SafeTrace</strong> est proposé en cas de signalement actif</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">6. Respect de la réglementation</h2>
            <p className="mb-3">
              SafeTrace respecte la <strong>Loi n°2013-450 du 19 juin 2013</strong> relative à la protection des données à caractère personnel en Côte d'Ivoire.
            </p>
            <p>
              Nous nous conformons également aux <strong>bonnes pratiques internationales</strong> en matière de protection de la vie privée et de sécurité des données.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">7. Vos droits</h2>
            <p className="mb-3">Conformément à la réglementation, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Droit d'accès</strong> — Vous pouvez demander une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> — Vous pouvez demander la correction de données inexactes</li>
              <li><strong>Droit de suppression</strong> — Vous pouvez demander la suppression de vos données</li>
              <li><strong>Droit d'opposition</strong> — Vous pouvez vous opposer au traitement de vos données</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">8. Paiements et données financières</h2>
            <p>
              Les paiements sont traités par notre partenaire <strong>Wave CI</strong>. SafeTrace <strong>ne stocke aucune donnée bancaire</strong> ou de carte de paiement. Seules les références de transaction sont conservées pour le suivi des enregistrements.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">9. Durée de conservation</h2>
            <p className="mb-3">
              Vos données sont conservées <strong>aussi longtemps que votre compte est actif</strong> et que vos appareils sont enregistrés.
            </p>
            <p>
              En cas de suppression de compte, vos données sont <strong>supprimées dans un délai de 30 jours</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">10. Contact</h2>
            <p className="mb-2">
              Pour toute question relative à la protection de vos données ou pour exercer vos droits :
            </p>
            <ul className="list-none space-y-1 text-muted-foreground">
              <li>📧 Email : <strong>contact@safetrace.ci</strong></li>
              <li>📱 WhatsApp : <strong>+225 07 07 16 79 21</strong></li>
              <li>📍 Adresse : <strong>Daloa, Haut-Sassandra, Côte d'Ivoire</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Confidentialite;
