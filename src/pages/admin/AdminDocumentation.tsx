import { FileText, Download, Wifi, Smartphone, Shield, Radio, Truck, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "./AdminLayout";

const sections = [
  {
    icon: Radio,
    title: "1. Détection par Bluetooth Low Energy (BLE)",
    content: `**Principe** : Chaque appareil enregistré sur SafeTrace émet (ou peut émettre via l'application installée) un signal BLE identifiable. Les appareils des forces de l'ordre équipés de l'application SafeTrace captent ces signaux automatiquement.

**Technologies requises** :
- **BLE Beacons** : Protocoles iBeacon (Apple) ou Eddystone (Google)
- **SDK** : Core Bluetooth (iOS), Android BLE API
- **Portée** : 10-30 mètres en intérieur, jusqu'à 70m en extérieur

**Références** :
- Apple iBeacon : developer.apple.com/ibeacon
- Google Eddystone : github.com/google/eddystone
- Tile / AirTag : modèles existants de tracking BLE

**Coût estimé** : Intégration logicielle uniquement si l'app est installée. Beacons physiques : 5-15€/unité.`,
  },
  {
    icon: Wifi,
    title: "2. Détection IMEI via opérateurs télécoms",
    content: `**Principe** : Les opérateurs téléphoniques (Orange, MTN, Moov) disposent des registres IMEI de chaque téléphone connecté à leur réseau. Un partenariat permettrait de croiser en temps réel les IMEI signalés volés avec les appareils actifs sur le réseau.

**Infrastructure nécessaire** :
- **EIR (Equipment Identity Register)** : Base de données gérée par chaque opérateur
- **CEIR (Central EIR)** : Registre national centralisé (à créer avec l'ARTCI)
- **GSMA IMEI Database** : Base internationale gsma.com/imei

**Partenaires clés** :
- ARTCI (Autorité de Régulation des Télécommunications de Côte d'Ivoire)
- GSMA : gsma.com/stolen-phone-databases
- Orange, MTN, Moov : départements sécurité/fraude

**Références** :
- GSMA Device Check : devicecheck.gsma.com
- UK IMEI Database : immobilise.com
- Kenya : Communications Authority IMEI registry`,
  },
  {
    icon: Truck,
    title: "3. Intégration aux postes de péage",
    content: `**Principe** : Les postes de péage routiers sont des points de passage obligatoires. En équipant ces postes de lecteurs RFID/NFC ou de caméras de reconnaissance de plaques couplées à SafeTrace, les véhicules volés peuvent être détectés automatiquement.

**Technologies** :
- **ANPR (Automatic Number Plate Recognition)** : Reconnaissance automatique de plaques
- **RFID longue portée** : Lecture des tags RFID sur les véhicules
- **Logiciel** : Intégration API SafeTrace pour vérification en temps réel

**Fournisseurs de référence** :
- Hikvision : Caméras ANPR (hikvision.com)
- Dahua Technology : Systèmes de surveillance routière
- Kapsch TrafficCom : Solutions de péage intelligentes (kapsch.net)
- Q-Free : Systèmes de transport intelligent (q-free.com)

**Coût estimé** : 2 000 - 10 000 € par poste de péage selon l'équipement.`,
  },
  {
    icon: Smartphone,
    title: "4. Auto-installation sur appareils neufs",
    content: `**Principe** : Partenariat avec les fabricants (Samsung, Xiaomi, Infinix, Tecno) et les opérateurs de systèmes d'exploitation pour pré-installer SafeTrace sur tout appareil vendu en Côte d'Ivoire.

**Modèles existants** :
- **Samsung Knox** : Permet le déploiement d'applications en usine (samsung.com/knox)
- **Google Android Enterprise** : Programme OEM pour pré-installation (android.com/enterprise)
- **MDM (Mobile Device Management)** : Solutions comme Microsoft Intune, VMware Workspace ONE

**Approche réglementaire** :
- Collaboration avec le Ministère du Numérique pour rendre l'enregistrement obligatoire
- Modèle du Kenya : obligation d'enregistrement IMEI depuis 2012
- Modèle de la Turquie : système MCKS d'enregistrement IMEI obligatoire

**Partenaires nécessaires** :
- Fabricants : Samsung, Xiaomi, Infinix, Tecno (programmes régionaux)
- Distributeurs locaux : partenariats de pré-installation
- ARTCI : cadre réglementaire`,
  },
  {
    icon: Shield,
    title: "5. Géofencing et détection de proximité",
    content: `**Principe** : Créer des zones de géofencing autour des points sensibles (commissariats, gares, marchés) qui déclenchent automatiquement une vérification lorsqu'un appareil signalé entre dans la zone.

**Technologies** :
- **Google Geofencing API** : developers.google.com/location-context/geofencing
- **Apple Core Location** : Monitoring de régions géographiques
- **Wi-Fi Fingerprinting** : Détection par les points d'accès Wi-Fi publics

**Infrastructure** :
- Points d'accès Wi-Fi dans les zones stratégiques
- Application SafeTrace en arrière-plan sur les appareils
- Serveur de traitement en temps réel

**Précision** : GPS (3-5m), Wi-Fi (15-40m), BLE (1-10m)`,
  },
  {
    icon: Settings,
    title: "6. Feuille de route d'implémentation",
    content: `**Phase 1 (0-6 mois)** : Application mobile avec scan BLE passif
- Développer l'app mobile native (React Native)
- Intégrer le scan BLE pour détection de proximité
- Déployer auprès des forces de sécurité

**Phase 2 (6-12 mois)** : Partenariats opérateurs
- Signer les partenariats avec Orange CI, MTN, Moov
- Intégrer les APIs EIR pour vérification IMEI réseau
- Mettre en place le CEIR avec l'ARTCI

**Phase 3 (12-24 mois)** : Infrastructure physique
- Équiper les premiers postes de péage (axe Abidjan-Yamoussoukro)
- Déployer les caméras ANPR pilotes
- Partenariats fabricants pour pré-installation

**Phase 4 (24+ mois)** : Couverture nationale
- Extension à tous les postes de péage
- Pré-installation obligatoire (cadre réglementaire)
- Interconnexion avec les pays voisins (UEMOA)

**Budget estimé total** : 150 000 - 500 000 € selon le périmètre.`,
  },
];

const AdminDocumentation = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap print:hidden">
          <div>
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6" /> Documentation technique
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Système de détection automatique à distance — SafeTrace CI
            </p>
          </div>
          <Button onClick={handlePrint} className="bg-safe-green hover:bg-safe-green/90 text-white">
            <Download className="h-4 w-4 mr-2" /> Télécharger PDF
          </Button>
        </div>

        {/* Print header */}
        <div className="hidden print:block text-center mb-8">
          <h1 className="text-2xl font-bold">SafeTrace CI — Documentation Technique</h1>
          <p className="text-gray-600">Système de détection automatique à distance</p>
          <p className="text-gray-400 text-sm mt-2">Version 1.0 — Mars 2026</p>
          <hr className="mt-4" />
        </div>

        <Card className="border-2 border-safe-green/20">
          <CardContent className="p-6">
            <h3 className="font-display font-bold text-lg mb-3">Introduction</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ce document présente les technologies et infrastructures nécessaires pour implémenter un système de détection
              automatique à distance des appareils et véhicules enregistrés sur SafeTrace. L'objectif est de permettre
              l'identification automatique des biens signalés volés ou perdus, sans intervention manuelle, en utilisant
              des technologies de proximité (BLE, RFID), de réseau (IMEI via opérateurs) et d'infrastructure routière (ANPR).
            </p>
          </CardContent>
        </Card>

        {sections.map((section, i) => (
          <Card key={i} className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <section.icon className="h-5 w-5 text-safe-green" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                {section.content.split("\n\n").map((paragraph, j) => (
                  <div key={j} className="mb-4">
                    {paragraph.split("\n").map((line, k) => {
                      const boldMatch = line.match(/^\*\*(.*?)\*\*\s*[:：]\s*(.*)/);
                      const listMatch = line.match(/^-\s*\*\*(.*?)\*\*\s*[:：]\s*(.*)/);
                      const simpleList = line.match(/^-\s*(.*)/);

                      if (listMatch) {
                        return (
                          <div key={k} className="flex gap-2 ml-4 mb-1">
                            <span className="text-safe-green mt-1">•</span>
                            <span><strong className="text-foreground">{listMatch[1]}</strong> : {listMatch[2]}</span>
                          </div>
                        );
                      }
                      if (simpleList) {
                        return (
                          <div key={k} className="flex gap-2 ml-4 mb-1">
                            <span className="text-safe-green mt-1">•</span>
                            <span>{simpleList[1]}</span>
                          </div>
                        );
                      }
                      if (boldMatch) {
                        return <p key={k} className="font-semibold text-foreground mb-2">{boldMatch[1]} : <span className="font-normal text-muted-foreground">{boldMatch[2]}</span></p>;
                      }
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return <p key={k} className="font-bold text-foreground mt-3 mb-1">{line.replace(/\*\*/g, "")}</p>;
                      }
                      return line ? <p key={k} className="mb-1">{line}</p> : null;
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-2 border-primary/20 print:break-inside-avoid">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground text-sm">
              © 2026 SafeTrace CI — Document confidentiel<br />
              Pour toute question : contact@safetrace.ci | +225 07 07 16 79 21
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDocumentation;
