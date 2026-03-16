import Layout from "@/components/layout/Layout";

const Conditions = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-muted-foreground mb-10">Dernière mise à jour : Mars 2026</p>

        <div className="space-y-10 text-foreground leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 1 — Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme <strong>SafeTrace</strong>, service numérique de <strong>traçabilité des appareils électroniques et véhicules</strong> en Côte d'Ivoire, accessible à l'adresse <strong>safetrace.ivoireprojet.com</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 2 — Éditeur</h2>
            <p className="mb-2">
              La plateforme SafeTrace est éditée par <strong>SafeTrace CI</strong>, dont le siège social est situé à <strong>Daloa, Haut-Sassandra, Côte d'Ivoire</strong>.
            </p>
            <p className="mb-2">
              Représentée par ses co-fondateurs : <strong>Dr. Marcel KONAN</strong> et <strong>Inocent KOFFI</strong>.
            </p>
            <p className="text-muted-foreground">
              Contact : <strong>contact@safetrace.ci</strong> — <strong>+225 07 07 16 79 21</strong>
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 3 — Acceptation des conditions</h2>
            <p>
              L'utilisation de la plateforme implique <strong>l'acceptation pleine et entière</strong> des présentes CGU. L'utilisateur reconnaît avoir pris connaissance de ces conditions avant toute inscription ou utilisation du service.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 4 — Description du service</h2>
            <p className="mb-3">SafeTrace offre les services suivants :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Enregistrement</strong> d'appareils électroniques et de véhicules par numéro de série, IMEI ou numéro de châssis</li>
              <li><strong>Génération de QR codes uniques</strong> pour chaque enregistrement</li>
              <li><strong>Signalement</strong> de vol ou de perte d'un appareil ou véhicule</li>
              <li><strong>Vérification gratuite</strong> de l'historique d'un appareil ou véhicule avant achat</li>
              <li><strong>Transfert de propriété</strong> entre utilisateurs</li>
              <li><strong>Notifications en temps réel</strong> lorsque vos appareils sont scannés</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 5 — Tarification</h2>
            <p className="mb-3">L'enregistrement est <strong>payant et valable à vie</strong> :</p>
            <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Téléphone / Tablette</span><strong>200 F CFA</strong></div>
              <div className="flex justify-between"><span>Ordinateur</span><strong>500 F CFA</strong></div>
              <div className="flex justify-between"><span>Téléviseur</span><strong>500 F CFA</strong></div>
              <div className="flex justify-between"><span>Appareil électroménager</span><strong>500 F CFA</strong></div>
              <div className="flex justify-between"><span>Moto / Tricycle</span><strong>1 000 F CFA</strong></div>
              <div className="flex justify-between"><span>Voiture / Véhicule automobile</span><strong>2 000 F CFA</strong></div>
            </div>
            <p className="mt-3 text-muted-foreground">
              La vérification est <strong>gratuite pour tous</strong>. Le transfert de propriété est payant selon le tarif de la catégorie concernée.
            </p>
            <p className="mt-2 text-muted-foreground">
              Les paiements sont traités exclusivement via <strong>Wave CI</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 6 — Obligations de l'utilisateur</h2>
            <p className="mb-3">L'utilisateur s'engage à :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Fournir des <strong>informations exactes et véridiques</strong> lors de l'inscription et de l'enregistrement</li>
              <li><strong>Ne pas utiliser</strong> la plateforme à des fins frauduleuses</li>
              <li><strong>Ne pas effectuer</strong> de faux signalements</li>
              <li>Respecter la <strong>législation ivoirienne</strong> en vigueur</li>
            </ul>
            <p className="mt-4 bg-destructive/10 text-destructive p-3 rounded-lg text-sm font-semibold">
              ⚠️ Tout faux signalement est passible de poursuites judiciaires conformément au Code pénal ivoirien.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 7 — Protection des données personnelles</h2>
            <p className="mb-3">
              Conformément à la <strong>Loi n°2013-450 du 19 juin 2013</strong> relative à la protection des données à caractère personnel en Côte d'Ivoire, SafeTrace s'engage à :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Protéger</strong> les données personnelles par chiffrement AES-256</li>
              <li><strong>Ne pas céder</strong>, vendre ou transmettre les données à des tiers sans consentement</li>
              <li>Permettre à chaque utilisateur d'<strong>accéder, modifier ou supprimer</strong> ses données</li>
              <li>Respecter la <strong>finalité de la collecte</strong> des données</li>
              <li><strong>Ne pas exposer</strong> les données personnelles lors des vérifications publiques</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Pour toute demande relative à vos données : <strong>contact@safetrace.ci</strong>
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 8 — Propriété intellectuelle</h2>
            <p>
              La plateforme SafeTrace, son design, son code source, ses logos et l'ensemble de ses contenus sont la <strong>propriété exclusive de SafeTrace CI</strong>. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est <strong>strictement interdite</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 9 — Limitation de responsabilité</h2>
            <p className="mb-3">
              SafeTrace <strong>ne garantit pas la récupération</strong> des appareils ou véhicules signalés volés ou perdus. La plateforme <strong>facilite la traçabilité et la vérification</strong> mais ne se substitue pas aux forces de l'ordre.
            </p>
            <p>
              SafeTrace ne saurait être tenu responsable des <strong>dommages directs ou indirects</strong> résultant de l'utilisation ou de l'impossibilité d'utiliser le service.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 10 — Droit applicable</h2>
            <p>
              Les présentes CGU sont régies par le <strong>droit ivoirien</strong>. Tout litige relatif à l'interprétation ou à l'exécution des présentes sera soumis aux <strong>juridictions compétentes de la République de Côte d'Ivoire</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 11 — Modification des CGU</h2>
            <p>
              SafeTrace se réserve le droit de <strong>modifier les présentes CGU</strong> à tout moment. Les utilisateurs seront informés des modifications par notification sur la plateforme.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">Article 12 — Contact</h2>
            <p className="mb-3">Pour toute question relative aux présentes CGU :</p>
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

export default Conditions;
