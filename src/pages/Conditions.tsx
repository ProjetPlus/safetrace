import Layout from "@/components/layout/Layout";

const Conditions = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
        <h1 className="font-display">Conditions Générales d'Utilisation</h1>
        <p className="text-muted-foreground">Dernière mise à jour : Mars 2026</p>

        <h2>Article 1 — Objet</h2>
        <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme SafeTrace, service numérique de traçabilité des appareils électroniques et véhicules en Côte d'Ivoire, accessible à l'adresse <strong>safetrace.ivoireprojet.com</strong>.</p>

        <h2>Article 2 — Éditeur</h2>
        <p>La plateforme SafeTrace est éditée par SafeTrace CI, dont le siège social est situé à Daloa, Haut-Sassandra, Côte d'Ivoire. Représentée par ses co-fondateurs : Dr. Marcel KONAN et Inocent KOFFI.</p>
        <p>Contact : contact@safetrace.ci — +225 07 59 56 60 87</p>

        <h2>Article 3 — Acceptation des conditions</h2>
        <p>L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU. L'utilisateur reconnaît avoir pris connaissance de ces conditions avant toute inscription ou utilisation du service.</p>

        <h2>Article 4 — Description du service</h2>
        <p>SafeTrace offre les services suivants :</p>
        <ul>
          <li>Enregistrement d'appareils électroniques et de véhicules par numéro de série, IMEI ou numéro de châssis</li>
          <li>Génération de QR codes uniques pour chaque enregistrement</li>
          <li>Signalement de vol ou de perte d'un appareil ou véhicule</li>
          <li>Vérification gratuite de l'historique d'un appareil ou véhicule avant achat</li>
          <li>Transfert de propriété entre utilisateurs</li>
        </ul>

        <h2>Article 5 — Tarification</h2>
        <p>L'enregistrement est payant et valable à vie :</p>
        <ul>
          <li>Téléphone : 200 F CFA</li>
          <li>Ordinateur : 500 F CFA</li>
          <li>Téléviseur : 500 F CFA</li>
          <li>Appareil électroménager : 500 F CFA</li>
          <li>Moto : 1 000 F CFA</li>
          <li>Voiture / Véhicule automobile : 2 000 F CFA</li>
        </ul>
        <p>La vérification est gratuite pour tous. Le transfert de propriété est payant selon le tarif de la catégorie concernée.</p>

        <h2>Article 6 — Obligations de l'utilisateur</h2>
        <ul>
          <li>Fournir des informations exactes et véridiques lors de l'inscription et de l'enregistrement</li>
          <li>Ne pas utiliser la plateforme à des fins frauduleuses</li>
          <li>Ne pas effectuer de faux signalements</li>
          <li>Respecter la législation ivoirienne en vigueur</li>
        </ul>
        <p><strong>Tout faux signalement est passible de poursuites judiciaires conformément au Code pénal ivoirien.</strong></p>

        <h2>Article 7 — Protection des données personnelles</h2>
        <p>Conformément à la Loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel en Côte d'Ivoire, SafeTrace s'engage à :</p>
        <ul>
          <li>Protéger les données personnelles des utilisateurs par chiffrement AES-256</li>
          <li>Ne pas céder, vendre ou transmettre les données à des tiers sans consentement</li>
          <li>Permettre à chaque utilisateur d'accéder, modifier ou supprimer ses données</li>
          <li>Respecter la finalité de la collecte des données</li>
        </ul>
        <p>Pour toute demande relative à vos données, contactez-nous à : contact@safetrace.ci</p>

        <h2>Article 8 — Propriété intellectuelle</h2>
        <p>La plateforme SafeTrace, son design, son code source, ses logos et l'ensemble de ses contenus sont la propriété exclusive de SafeTrace CI. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.</p>

        <h2>Article 9 — Limitation de responsabilité</h2>
        <p>SafeTrace ne garantit pas la récupération des appareils ou véhicules signalés volés ou perdus. La plateforme facilite la traçabilité et la vérification mais ne se substitue pas aux forces de l'ordre.</p>
        <p>SafeTrace ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le service.</p>

        <h2>Article 10 — Droit applicable et juridiction</h2>
        <p>Les présentes CGU sont régies par le droit ivoirien. Tout litige relatif à l'interprétation ou à l'exécution des présentes sera soumis aux juridictions compétentes de la République de Côte d'Ivoire.</p>

        <h2>Article 11 — Modification des CGU</h2>
        <p>SafeTrace se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications par notification sur la plateforme.</p>

        <h2>Article 12 — Contact</h2>
        <p>Pour toute question relative aux présentes CGU :</p>
        <ul>
          <li>Email : contact@safetrace.ci</li>
          <li>WhatsApp : +225 07 59 56 60 87</li>
          <li>Adresse : Daloa, Haut-Sassandra, Côte d'Ivoire</li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default Conditions;
