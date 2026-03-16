// Brand/Model/Color data for device registration — Exhaustive lists

export const phoneBrands: Record<string, string[]> = {
  Samsung: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S22 Ultra", "Galaxy S22", "Galaxy S21", "Galaxy A54", "Galaxy A53", "Galaxy A34", "Galaxy A33", "Galaxy A25", "Galaxy A15", "Galaxy A14", "Galaxy A05", "Galaxy A05s", "Galaxy A04", "Galaxy A03", "Galaxy Z Fold5", "Galaxy Z Fold4", "Galaxy Z Flip5", "Galaxy Z Flip4", "Galaxy M54", "Galaxy M34", "Galaxy M14", "Galaxy F54", "Galaxy Note 20 Ultra", "Galaxy Note 20", "Galaxy Note 10"],
  Apple: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini", "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11", "iPhone SE 2022", "iPhone SE 2020", "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X", "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7", "iPad Pro 12.9", "iPad Pro 11", "iPad Air", "iPad Mini"],
  Xiaomi: ["Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13", "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12", "Redmi 13C", "Redmi 12", "Redmi A2+", "Redmi A2", "Poco X6 Pro", "Poco X6", "Poco X5 Pro", "Poco M6 Pro", "Poco M6", "Poco F5", "Mi 14 Ultra", "Mi 14 Pro", "Mi 14", "Mi 13", "Mi 12"],
  Tecno: ["Camon 20 Pro", "Camon 20", "Camon 19 Pro", "Camon 19", "Camon 18", "Spark 20 Pro+", "Spark 20 Pro", "Spark 20", "Spark 10 Pro", "Spark 10", "Spark Go 2024", "Pop 8", "Pop 7 Pro", "Pop 7", "Phantom X2 Pro", "Phantom X2", "Phantom V Fold", "Pova 5 Pro", "Pova 5", "Pova Neo 3"],
  Infinix: ["Hot 40 Pro", "Hot 40", "Hot 30 Play", "Hot 30", "Hot 20S", "Note 30 Pro", "Note 30 VIP", "Note 30", "Note 12", "Zero 30 5G", "Zero 30", "Smart 8 Plus", "Smart 8", "Smart 7", "GT 20 Pro", "GT 10 Pro"],
  Oppo: ["A98", "A78", "A58", "A38", "A18", "A17", "Reno 10 Pro+", "Reno 10 Pro", "Reno 10", "Reno 8T", "Reno 8", "Find X6 Pro", "Find X6", "Find N3", "F23"],
  Huawei: ["P60 Pro", "P60", "P50 Pro", "P50", "P40 Pro", "P40", "P30 Pro", "P30", "Nova 11 Pro", "Nova 11", "Nova 10", "Nova 9", "Y90", "Y70", "MatePad 11", "MatePad T10"],
  Nokia: ["G42", "G22", "G21", "G20", "C32", "C22", "C21", "C12", "105 (2023)", "110 (2023)", "3310"],
  Motorola: ["Edge 40 Pro", "Edge 40", "Edge 30 Ultra", "Moto G84", "Moto G73", "Moto G54", "Moto G34", "Moto G23", "Moto G13", "Moto E13", "Moto G Power", "Razr 40 Ultra"],
  Realme: ["C55", "C53", "C51", "C33", "11 Pro+", "11 Pro", "11", "GT Neo 5", "GT3", "Narzo 60 Pro", "Narzo 60", "10 Pro+"],
  Vivo: ["V29 Pro", "V29", "V27", "V25", "Y36", "Y27", "Y22", "Y16", "X90 Pro", "X90", "X80 Pro"],
  OnePlus: ["12", "11", "Nord 3", "Nord CE 3 Lite", "Nord CE 3", "Nord N30", "10 Pro", "10T", "9 Pro", "9"],
  Google: ["Pixel 8 Pro", "Pixel 8", "Pixel 7a", "Pixel 7 Pro", "Pixel 7", "Pixel 6a", "Pixel 6 Pro", "Pixel 6"],
  Itel: ["A60s", "A60", "P55+", "P55", "P40+", "P40", "S23+", "S23", "A70", "A58", "A27"],
  ZTE: ["Blade A73", "Blade A53", "Blade V40", "Nubia Z50 Ultra", "Nubia Z50", "Axon 40 Ultra"],
  Sony: ["Xperia 1 V", "Xperia 5 V", "Xperia 10 V", "Xperia 1 IV", "Xperia 5 IV"],
  Nothing: ["Phone (2)", "Phone (1)"],
  Wiko: ["Power U30", "View 5 Plus", "View 5", "Y82", "Y62", "T50", "T10"],
  Alcatel: ["3L", "1S", "1B", "1", "Go Flip 4"],
  TCL: ["40 SE", "30 SE", "305", "306", "Tab 10"],
  Honor: ["90 Pro", "90", "X9a", "X8a", "X7a", "Magic5 Pro", "Magic5"],
  Blackview: ["BV9300 Pro", "BV6600", "A96", "A55 Pro"],
};

export const computerBrands: Record<string, string[]> = {
  HP: ["Pavilion 15", "Pavilion 14", "Pavilion x360", "EliteBook 840 G10", "EliteBook 850 G10", "EliteBook 640", "ProBook 450 G10", "ProBook 440 G10", "Envy x360 15", "Envy x360 13", "Victus 16", "Victus 15", "Omen 16", "Omen 17", "250 G9", "255 G9", "Dragonfly G4", "Spectre x360"],
  Dell: ["Inspiron 15 3520", "Inspiron 15 5530", "Inspiron 14", "Inspiron 16", "Latitude 5540", "Latitude 5440", "Latitude 7440", "Latitude 3540", "XPS 13 Plus", "XPS 13", "XPS 15", "XPS 17", "Vostro 3520", "Vostro 3420", "Alienware m16", "Alienware x14", "Precision 5680"],
  Lenovo: ["ThinkPad T14 Gen 4", "ThinkPad T16", "ThinkPad X1 Carbon", "ThinkPad E16", "ThinkPad E14", "IdeaPad 3 15", "IdeaPad 3 14", "IdeaPad 5 Pro", "IdeaPad Slim 5", "Legion 5 Pro", "Legion 5", "Legion 7", "Yoga Slim 7 Pro", "Yoga 9i", "V15 G4", "V14 G4", "ThinkBook 14"],
  Apple: ["MacBook Air M3 15\"", "MacBook Air M3 13\"", "MacBook Air M2 15\"", "MacBook Air M2 13\"", "MacBook Air M1", "MacBook Pro 16 M3 Max", "MacBook Pro 16 M3 Pro", "MacBook Pro 14 M3 Pro", "MacBook Pro 14 M3", "MacBook Pro 13 M2", "iMac 24 M3", "Mac Mini M2", "Mac Studio M2", "Mac Pro"],
  Asus: ["VivoBook 15", "VivoBook 14", "VivoBook S 14", "ZenBook 14 OLED", "ZenBook 13 OLED", "ZenBook Pro 14", "ROG Strix G16", "ROG Strix G15", "ROG Zephyrus G14", "TUF Gaming F15", "TUF Gaming A15", "Chromebook CX1", "Chromebook Flip", "ProArt StudioBook"],
  Acer: ["Aspire 5", "Aspire 3", "Aspire 7", "Aspire Vero", "Swift 3", "Swift 5", "Swift Go 14", "Nitro 5", "Nitro 16", "Predator Helios 16", "Predator Helios 300", "Spin 3", "Chromebook 314", "Chromebook Spin 513"],
  MSI: ["GF63 Thin", "GF76", "Katana 15", "Katana 17", "Modern 14", "Modern 15", "Prestige 16", "Prestige 14", "Stealth 16", "Creator Z16", "Raider GE78"],
  Toshiba: ["Satellite Pro C50", "Dynabook Tecra A50", "Dynabook Tecra A40", "Satellite Pro L50"],
  Samsung: ["Galaxy Book3 Pro 360", "Galaxy Book3 Pro", "Galaxy Book3 360", "Galaxy Book3", "Galaxy Book Go", "Galaxy Book2 Pro"],
  Huawei: ["MateBook D16", "MateBook D15", "MateBook D14", "MateBook X Pro", "MateBook 14s"],
  Microsoft: ["Surface Pro 9", "Surface Laptop 5", "Surface Laptop Go 3", "Surface Book 3"],
  Fujitsu: ["LifeBook U7413", "LifeBook E5413", "LifeBook A3510"],
  Razer: ["Blade 16", "Blade 15", "Blade 14", "Book 13"],
};

export const tvBrands: Record<string, string[]> = {
  Samsung: ["Crystal UHD 43\"", "Crystal UHD 50\"", "Crystal UHD 55\"", "Crystal UHD 65\"", "Crystal UHD 75\"", "QLED 55\"", "QLED 65\"", "QLED 75\"", "Neo QLED 55\"", "Neo QLED 65\"", "Neo QLED 75\"", "The Frame 32\"", "The Frame 43\"", "The Frame 55\"", "The Frame 65\"", "32\" HD Smart TV", "32\" HD LED"],
  LG: ["OLED C3 55\"", "OLED C3 65\"", "OLED B3 55\"", "OLED B3 65\"", "NanoCell 50\"", "NanoCell 55\"", "NanoCell 65\"", "UHD 43\"", "UHD 50\"", "UHD 55\"", "UHD 65\"", "32\" LED HD", "32\" Smart TV"],
  Sony: ["Bravia XR A95K 55\"", "Bravia XR A80K 55\"", "Bravia XR A80K 65\"", "X85K 55\"", "X85K 65\"", "X80K 43\"", "X80K 50\"", "X80K 55\"", "X75K 43\"", "32\" W830K"],
  TCL: ["C845 55\"", "C845 65\"", "C735 55\"", "C735 65\"", "P735 50\"", "P735 55\"", "P635 43\"", "P635 50\"", "S5400 32\"", "S5400 40\"", "S5200 32\""],
  Hisense: ["U8H 55\"", "U8H 65\"", "U7H 55\"", "U7H 65\"", "A7H 50\"", "A7H 55\"", "A6H 43\"", "A6H 50\"", "A6H 55\"", "32A4H", "40A4H"],
  Panasonic: ["LX800 55\"", "LX800 65\"", "JX800 43\"", "JX800 50\"", "JX800 55\"", "32\" LED"],
  Philips: ["OLED 55\"", "OLED 65\"", "PUS8108 50\"", "PUS8108 55\"", "PUS7608 43\"", "PUS7608 50\"", "32PHS6605"],
  Toshiba: ["C350 50\"", "C350 55\"", "V35 32\"", "V35 43\""],
  Nasco: ["32\" LED", "40\" LED", "43\" Smart TV", "50\" Smart TV", "55\" Smart TV"],
  Astech: ["32\" LED", "40\" LED", "43\" Smart TV", "50\" Smart TV"],
  StarSat: ["32\" LED", "40\" LED", "43\" Smart TV", "50\" Smart TV"],
};

export const electroBrands: Record<string, string[]> = {
  Samsung: ["Réfrigérateur RT38", "Réfrigérateur RT32", "Réfrigérateur RT22", "Machine à laver WW90", "Machine à laver WW80", "Machine à laver WW70", "Climatiseur AR18", "Climatiseur AR12", "Climatiseur AR09", "Micro-ondes ME83X", "Micro-ondes MS23", "Lave-vaisselle DW60"],
  LG: ["Réfrigérateur GN-B422", "Réfrigérateur GN-C272", "Réfrigérateur GL-T432", "Machine à laver F4V5", "Machine à laver F2V5", "Climatiseur Dual Inverter 1CV", "Climatiseur Dual Inverter 1.5CV", "Climatiseur Dual Inverter 2CV", "Micro-ondes MS2535", "Lave-vaisselle DF325FPS"],
  Whirlpool: ["Réfrigérateur WRB322", "Réfrigérateur WRT518", "Lave-linge FWG91484", "Lave-linge FWG71484", "Climatiseur 1CV", "Climatiseur 1.5CV", "Micro-ondes MWF421"],
  Nasco: ["Réfrigérateur 200L", "Réfrigérateur 150L", "Réfrigérateur 100L", "Climatiseur 1CV", "Climatiseur 1.5CV", "Climatiseur 2CV", "Cuisinière 4 feux", "Cuisinière 5 feux", "Machine à laver 7kg", "Machine à laver 10kg", "Congélateur 200L", "Congélateur 300L"],
  Hisense: ["Réfrigérateur RD-49WR", "Réfrigérateur RS-20DR", "Climatiseur 1CV", "Climatiseur 1.5CV", "Machine à laver 8kg", "Congélateur 200L"],
  Midea: ["Climatiseur 1CV", "Climatiseur 1.5CV", "Climatiseur 2CV", "Réfrigérateur 93L", "Réfrigérateur 150L", "Machine à laver 7kg"],
  Sharp: ["Réfrigérateur SJ-FE680", "Réfrigérateur SJ-FE580", "Micro-ondes R-20CT", "Micro-ondes R-25CT", "Climatiseur 1CV"],
  Bosch: ["Lave-linge WAN28", "Lave-linge WAT28", "Réfrigérateur KGN36", "Réfrigérateur KGN39", "Lave-vaisselle SMS46", "Climatiseur 1.5CV"],
  Electrolux: ["Lave-linge EW6F4", "Lave-linge EW7F3", "Climatiseur 1CV", "Climatiseur 1.5CV", "Réfrigérateur ERB3"],
  Beko: ["Réfrigérateur RDNT271", "Lave-linge WTE7512", "Climatiseur 1CV", "Climatiseur 1.5CV", "Cuisinière FSGT62"],
  Haier: ["Réfrigérateur HRF-246", "Machine à laver HW80", "Climatiseur 1CV", "Climatiseur 1.5CV"],
  Brandt: ["Réfrigérateur BFD357", "Lave-linge BAM13", "Cuisinière BC6640", "Micro-ondes SE2616"],
};

export const carBrands: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Land Cruiser 300", "Land Cruiser Prado", "Hilux", "Yaris", "Fortuner", "Rush", "Avensis", "C-HR", "Highlander", "4Runner", "Sequoia", "Tacoma", "Tundra", "Venza", "Supra", "Avalon", "Sienna"],
  Hyundai: ["Tucson", "Santa Fe", "Accent", "Elantra", "i10", "i20", "i30", "Creta", "Sonata", "Kona", "Palisade", "Venue", "Ioniq 5", "Starex", "H-1"],
  Kia: ["Sportage", "Seltos", "Picanto", "Rio", "Cerato", "Sorento", "Carnival", "K5", "Stinger", "Niro", "EV6", "Soul", "Forte"],
  Nissan: ["X-Trail", "Qashqai", "Patrol", "Navara", "Sentra", "Almera", "Kicks", "Juke", "Pathfinder", "Murano", "Frontier", "Titan", "Altima", "Maxima", "Versa", "370Z"],
  Honda: ["Civic", "CR-V", "HR-V", "Accord", "Fit", "City", "Pilot", "Passport", "Odyssey", "BR-V", "Jazz", "Ridgeline"],
  Mercedes: ["Classe A", "Classe C", "Classe E", "Classe S", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "Classe G", "EQC", "Sprinter", "Vito", "AMG GT"],
  BMW: ["Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 7", "Série 8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i4", "iX"],
  Peugeot: ["208", "301", "308", "408", "508", "2008", "3008", "5008", "Partner", "Expert", "Boxer", "Rifter"],
  Renault: ["Clio", "Megane", "Kadjar", "Koleos", "Captur", "Duster", "Kwid", "Logan", "Sandero", "Trafic", "Master"],
  Suzuki: ["Swift", "Vitara", "Grand Vitara", "Jimny", "Alto", "Dzire", "Baleno", "S-Cross", "Ertiga", "Ciaz", "Ignis"],
  Mitsubishi: ["L200", "Outlander", "Pajero", "Pajero Sport", "Eclipse Cross", "ASX", "Triton", "Xpander", "Colt"],
  Ford: ["Ranger", "Escape", "Explorer", "EcoSport", "Focus", "Fusion", "Mustang", "F-150", "Edge", "Bronco", "Transit"],
  Volkswagen: ["Golf", "Polo", "Tiguan", "Passat", "T-Cross", "T-Roc", "Touareg", "Arteon", "ID.4", "Caddy", "Amarok", "Jetta"],
  Chevrolet: ["Spark", "Cruze", "Equinox", "Tracker", "Blazer", "Traverse", "Tahoe", "Silverado", "Trailblazer", "Malibu", "Camaro"],
  Isuzu: ["D-Max", "MU-X", "NLR", "NMR", "NPR"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Discovery", "Discovery Sport", "Defender", "Evoque"],
  Audi: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "e-tron", "TT", "RS"],
  Lexus: ["RX 350", "RX 500h", "NX 350h", "NX 250", "ES 350", "ES 300h", "LX 600", "IS 350", "UX 250h", "GX 460", "LC 500"],
  Mazda: ["CX-5", "CX-30", "CX-3", "Mazda3", "Mazda6", "CX-9", "MX-5", "BT-50"],
  Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator"],
  Volvo: ["XC40", "XC60", "XC90", "S60", "S90", "V60", "V90"],
  Citroën: ["C3", "C4", "C5 Aircross", "Berlingo", "Jumpy", "C-Elysée"],
  Fiat: ["500", "Panda", "Tipo", "Punto", "Doblo", "Ducato"],
  Subaru: ["Forester", "Outback", "XV", "Impreza", "Legacy", "WRX"],
  Porsche: ["Cayenne", "Macan", "Panamera", "911", "Taycan"],
  Dacia: ["Duster", "Sandero", "Logan", "Spring", "Jogger"],
  Chery: ["Tiggo 4", "Tiggo 7", "Tiggo 8", "Arrizo 5"],
  JAC: ["S2", "S3", "S4", "T6", "T8"],
  Haval: ["H6", "H9", "Jolion", "H2"],
  Changan: ["CS35", "CS55", "CS75", "Alsvin"],
  MG: ["ZS", "HS", "5", "3", "GT"],
  Geely: ["Coolray", "Azkarra", "Emgrand"],
};

export const motoBrands: Record<string, string[]> = {
  Honda: ["CBR 250R", "CBR 150R", "CB 125F", "CB 150R", "CB 300R", "Wave 110", "Wave 125", "XR 150L", "CRF 300L", "CRF 250L", "Forza 300", "PCX 160", "PCX 125", "ADV 160", "Dio", "Activa", "Africa Twin", "NC750X"],
  Yamaha: ["YBR 125", "YBR 125G", "FZ 150", "FZ-S V3", "FZX", "MT-15", "MT-03", "MT-07", "NMAX 155", "NMAX 125", "R15 V4", "R3", "Crypton", "XMax 300", "Tenere 700", "Tracer 700", "YZF-R1"],
  Suzuki: ["GN 125", "GN 150", "GSX-R150", "GSX-S150", "Gixxer SF", "Gixxer 150", "Access 125", "Burgman 125", "V-Strom 250", "V-Strom 650", "Hayabusa"],
  TVS: ["Apache RTR 200", "Apache RTR 160 4V", "Apache RTR 160", "Apache RR 310", "Star City+", "Sport", "Jupiter 125", "Ntorq 125", "Raider 125", "XL100"],
  Bajaj: ["Boxer CT 100", "Boxer BM 150", "CT 125", "Discover 125", "Discover 150", "Pulsar 150", "Pulsar NS200", "Pulsar RS200", "Pulsar 220F", "Platina 110", "Dominar 400", "Avenger Cruise 220"],
  Haojue: ["HJ125-8", "HJ150-6", "DK 150", "DR 160", "Lucky Plus", "TR 150"],
  Apsonic: ["AP150X", "AP125", "Zone 125", "Zone 150", "Aloba 150", "Aloba Plus"],
  Kymco: ["Agility 125", "Like 150", "Downtown 350i", "X-Town 300i", "AK 550"],
  Lifan: ["LF150-2J", "LF200-10B", "KPR 200", "KPS 200", "KPT 200"],
  "Royal Enfield": ["Classic 350", "Meteor 350", "Bullet 350", "Hunter 350", "Continental GT 650", "Interceptor 650", "Himalayan"],
  Piaggio: ["Vespa Primavera 125", "Vespa Sprint 150", "Liberty 125", "Medley 125"],
  SYM: ["Jet 14", "Orbit II 125", "Crox 125", "NH-T 125"],
  Kawasaki: ["Ninja 250", "Ninja 400", "Z250", "Z400", "Versys 650", "KLX 150", "KLX 230"],
  Hero: ["Splendor+", "HF Deluxe", "Glamour", "Passion Pro", "Xpulse 200", "Xtreme 160R"],
  Senke: ["SK150", "SK125", "SK200"],
  Dayun: ["DY150", "DY125", "DY200"],
  Qingqi: ["QM125", "QM150", "QM200"],
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
  "Noir", "Blanc", "Gris", "Gris anthracite", "Gris sidéral", "Argent",
  "Bleu", "Bleu nuit", "Bleu ciel", "Bleu marine", "Bleu pétrole",
  "Rouge", "Rouge bordeaux", "Rouge cerise",
  "Vert", "Vert olive", "Vert émeraude", "Vert menthe",
  "Or", "Or rose", "Bronze", "Champagne", "Cuivre",
  "Rose", "Rose gold", "Violet", "Lavande", "Mauve",
  "Orange", "Corail", "Saumon",
  "Marron", "Beige", "Crème", "Ivoire", "Camel",
  "Jaune", "Jaune moutarde",
  "Turquoise", "Cyan",
  "Bordeaux", "Prune",
  "Transparent", "Multicolore",
];

export const getYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= 2000; y--) years.push(y);
  return years;
};
