// Brand/Model/Color data for device registration

export const phoneBrands: Record<string, string[]> = {
  Samsung: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23", "Galaxy A54", "Galaxy A34", "Galaxy A15", "Galaxy A05", "Galaxy Z Fold5", "Galaxy Z Flip5", "Galaxy M14"],
  Apple: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone SE"],
  Xiaomi: ["Redmi Note 13", "Redmi 13C", "Poco X6", "Poco M6", "Mi 14", "Redmi A2"],
  Tecno: ["Camon 20", "Spark 20", "Pop 8", "Phantom X2", "Pova 5"],
  Infinix: ["Hot 40", "Note 30", "Zero 30", "Smart 8", "GT 20 Pro"],
  Oppo: ["A78", "Reno 10", "Find X6", "A58", "A18"],
  Huawei: ["P60 Pro", "Nova 11", "Y90", "MatePad"],
  Nokia: ["G42", "C32", "G22", "105"],
  Motorola: ["Edge 40", "Moto G84", "Moto G54", "Moto E13"],
  Realme: ["C55", "11 Pro", "GT Neo 5", "Narzo 60"],
  Vivo: ["V29", "Y36", "X90 Pro"],
  OnePlus: ["12", "Nord 3", "Nord CE 3"],
  Google: ["Pixel 8 Pro", "Pixel 8", "Pixel 7a"],
  Itel: ["A60", "P40", "S23", "A70"],
  ZTE: ["Blade A73", "Nubia Z50"],
};

export const computerBrands: Record<string, string[]> = {
  HP: ["Pavilion 15", "EliteBook 840", "ProBook 450", "Envy x360", "Victus 16", "Omen 16", "250 G9"],
  Dell: ["Inspiron 15", "Latitude 5540", "XPS 13", "XPS 15", "Vostro 3520", "Alienware m16"],
  Lenovo: ["ThinkPad T14", "IdeaPad 3", "Legion 5", "Yoga Slim 7", "V15"],
  Apple: ["MacBook Air M2", "MacBook Air M3", "MacBook Pro 14", "MacBook Pro 16", "iMac 24"],
  Asus: ["VivoBook 15", "ZenBook 14", "ROG Strix", "TUF Gaming", "Chromebook"],
  Acer: ["Aspire 5", "Swift 3", "Nitro 5", "Predator Helios", "Chromebook"],
  MSI: ["GF63", "Katana 15", "Modern 14", "Prestige 16"],
  Toshiba: ["Satellite Pro", "Dynabook Tecra"],
  Samsung: ["Galaxy Book 3", "Galaxy Book Go"],
  Huawei: ["MateBook D15", "MateBook X Pro"],
};

export const tvBrands: Record<string, string[]> = {
  Samsung: ["Crystal UHD 55\"", "QLED 65\"", "Neo QLED 75\"", "The Frame 55\"", "32\" HD"],
  LG: ["OLED C3 55\"", "NanoCell 65\"", "UHD 43\"", "32\" LED"],
  Sony: ["Bravia XR 65\"", "X85K 55\"", "X80K 43\""],
  TCL: ["C735 55\"", "P735 50\"", "S5400 32\""],
  Hisense: ["U7H 55\"", "A6H 50\"", "32A4H"],
  Panasonic: ["LX800 55\"", "JX800 43\""],
  Philips: ["OLED 55\"", "PUS8108 50\"", "32PHS6605"],
  Toshiba: ["C350 50\"", "V35 32\""],
};

export const electroBrands: Record<string, string[]> = {
  Samsung: ["Réfrigérateur RT38", "Machine à laver WW90", "Climatiseur AR12", "Micro-ondes ME83X"],
  LG: ["Réfrigérateur GN-B422", "Machine à laver F4V5", "Climatiseur Dual Inverter"],
  Whirlpool: ["Réfrigérateur WRB322", "Lave-linge FWG91484"],
  "Nasco": ["Réfrigérateur 200L", "Climatiseur 1.5CV", "Cuisinière 4 feux"],
  Hisense: ["Réfrigérateur RD-49WR", "Climatiseur 1CV"],
  Midea: ["Climatiseur 1CV", "Réfrigérateur 93L"],
  Sharp: ["Réfrigérateur SJ-FE680", "Micro-ondes R-20CT"],
  Bosch: ["Lave-linge WAN28", "Réfrigérateur KGN36"],
  Electrolux: ["Lave-linge EW6F4", "Climatiseur"],
};

export const carBrands: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Land Cruiser", "Hilux", "Yaris", "Prado", "Fortuner", "Rush", "Avensis"],
  Hyundai: ["Tucson", "Santa Fe", "Accent", "Elantra", "i10", "i20", "Creta", "Sonata"],
  Kia: ["Sportage", "Seltos", "Picanto", "Rio", "Cerato", "Sorento"],
  Nissan: ["X-Trail", "Qashqai", "Patrol", "Navara", "Sentra", "Almera"],
  Honda: ["Civic", "CR-V", "HR-V", "Accord", "Fit"],
  Mercedes: ["Classe C", "Classe E", "GLC", "GLE", "Classe A", "Classe S", "Sprinter"],
  BMW: ["Série 3", "Série 5", "X3", "X5", "Série 1"],
  Peugeot: ["208", "308", "3008", "5008", "Partner"],
  Renault: ["Clio", "Duster", "Megane", "Kwid"],
  Suzuki: ["Swift", "Vitara", "Jimny", "Alto", "Dzire"],
  Mitsubishi: ["L200", "Outlander", "Pajero", "Eclipse Cross"],
  Ford: ["Ranger", "Escape", "Explorer", "EcoSport"],
  Volkswagen: ["Golf", "Polo", "Tiguan", "Passat", "T-Cross"],
  Chevrolet: ["Spark", "Cruze", "Equinox", "Tracker"],
  Isuzu: ["D-Max", "MU-X"],
  "Land Rover": ["Range Rover", "Discovery", "Defender", "Evoque"],
  Audi: ["A3", "A4", "Q3", "Q5"],
  Lexus: ["RX 350", "NX", "ES", "LX"],
};

export const motoBrands: Record<string, string[]> = {
  Honda: ["CBR 250R", "CB 125F", "Wave 110", "XR 150", "CRF 300", "Forza 300", "PCX 160"],
  Yamaha: ["YBR 125", "FZ 150", "MT-15", "NMAX 155", "R15", "Crypton"],
  Suzuki: ["GN 125", "GSX-R150", "Gixxer", "Access 125"],
  TVS: ["Apache RTR 160", "Star City", "Jupiter", "Ntorq 125"],
  Bajaj: ["Boxer 100", "Discover 125", "Pulsar 150", "CT 100", "Platina"],
  Haojue: ["HJ125-8", "DK 150", "Lucky"],
  Apsonic: ["AP150", "Zone", "Aloba"],
  "Kymco": ["Agility 125", "Like 150"],
  Lifan: ["LF150", "KPR 200"],
  "Royal Enfield": ["Classic 350", "Meteor 350"],
};

export const getBrandsForCategory = (category: string): Record<string, string[]> => {
  switch (category) {
    case "telephone": return phoneBrands;
    case "ordinateur": return computerBrands;
    case "televiseur": return tvBrands;
    case "electromenager": return electroBrands;
    case "voiture": return carBrands;
    case "moto": return motoBrands;
    default: return {};
  }
};

export const colors = [
  "Noir", "Blanc", "Gris", "Argent", "Bleu", "Rouge", "Vert", "Or", "Rose", 
  "Violet", "Orange", "Marron", "Beige", "Jaune", "Bronze", "Champagne",
  "Bleu nuit", "Vert olive", "Bordeaux", "Gris anthracite", "Bleu ciel",
];
