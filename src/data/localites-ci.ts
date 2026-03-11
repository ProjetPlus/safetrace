// Base de données administrative de la Côte d'Ivoire
// Structure: District → Région → Département → Sous-Préfecture → Village/Quartier

export interface Localite {
  nom: string;
  sousPrefecture: string;
  departement: string;
  region: string;
  district: string;
}

export interface SousPrefecture {
  nom: string;
  departement: string;
  region: string;
  district: string;
}

export interface Departement {
  nom: string;
  region: string;
  district: string;
}

export interface Region {
  nom: string;
  district: string;
}

export const districts = [
  "District Autonome d'Abidjan",
  "District Autonome de Yamoussoukro",
  "District des Montagnes",
  "District du Sassandra-Marahoué",
  "District de la Vallée du Bandama",
  "District des Lacs",
  "District de la Comoé",
  "District du Zanzan",
  "District des Savanes",
  "District du Denguélé",
  "District du Woroba",
  "District du Bas-Sassandra",
  "District du Gôh-Djiboua",
  "District des Lagunes",
];

export const regions: Region[] = [
  // Abidjan
  { nom: "Abidjan", district: "District Autonome d'Abidjan" },
  // Yamoussoukro
  { nom: "Yamoussoukro", district: "District Autonome de Yamoussoukro" },
  // Montagnes
  { nom: "Tonkpi", district: "District des Montagnes" },
  { nom: "Guémon", district: "District des Montagnes" },
  { nom: "Cavally", district: "District des Montagnes" },
  // Sassandra-Marahoué
  { nom: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Marahoué", district: "District du Sassandra-Marahoué" },
  // Vallée du Bandama
  { nom: "Gbêkê", district: "District de la Vallée du Bandama" },
  { nom: "Hambol", district: "District de la Vallée du Bandama" },
  // Lacs
  { nom: "Bélier", district: "District des Lacs" },
  { nom: "Iffou", district: "District des Lacs" },
  { nom: "Moronou", district: "District des Lacs" },
  { nom: "N'zi", district: "District des Lacs" },
  // Comoé
  { nom: "Indénié-Djuablin", district: "District de la Comoé" },
  { nom: "Sud-Comoé", district: "District de la Comoé" },
  // Zanzan
  { nom: "Gontougo", district: "District du Zanzan" },
  { nom: "Bounkani", district: "District du Zanzan" },
  // Savanes
  { nom: "Poro", district: "District des Savanes" },
  { nom: "Tchologo", district: "District des Savanes" },
  { nom: "Bagoué", district: "District des Savanes" },
  // Denguélé
  { nom: "Folon", district: "District du Denguélé" },
  { nom: "Kabadougou", district: "District du Denguélé" },
  // Woroba
  { nom: "Béré", district: "District du Woroba" },
  { nom: "Bafing", district: "District du Woroba" },
  { nom: "Worodougou", district: "District du Woroba" },
  // Bas-Sassandra
  { nom: "San-Pédro", district: "District du Bas-Sassandra" },
  { nom: "Nawa", district: "District du Bas-Sassandra" },
  { nom: "Gbôklé", district: "District du Bas-Sassandra" },
  // Gôh-Djiboua
  { nom: "Gôh", district: "District du Gôh-Djiboua" },
  { nom: "Lôh-Djiboua", district: "District du Gôh-Djiboua" },
  // Lagunes
  { nom: "Agnéby-Tiassa", district: "District des Lagunes" },
  { nom: "Grands-Ponts", district: "District des Lagunes" },
  { nom: "La Mé", district: "District des Lagunes" },
];

export const departements: Departement[] = [
  // Abidjan
  { nom: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Yamoussoukro
  { nom: "Yamoussoukro", region: "Yamoussoukro", district: "District Autonome de Yamoussoukro" },
  // Haut-Sassandra
  { nom: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Issia", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Vavoua", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  // Marahoué
  { nom: "Bouaflé", region: "Marahoué", district: "District du Sassandra-Marahoué" },
  { nom: "Sinfra", region: "Marahoué", district: "District du Sassandra-Marahoué" },
  { nom: "Zuénoula", region: "Marahoué", district: "District du Sassandra-Marahoué" },
  // Gbêkê
  { nom: "Bouaké", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  { nom: "Béoumi", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  { nom: "Sakassou", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  // Tonkpi
  { nom: "Man", region: "Tonkpi", district: "District des Montagnes" },
  { nom: "Biankouma", region: "Tonkpi", district: "District des Montagnes" },
  { nom: "Danané", region: "Tonkpi", district: "District des Montagnes" },
  // Guémon
  { nom: "Duékoué", region: "Guémon", district: "District des Montagnes" },
  { nom: "Bangolo", region: "Guémon", district: "District des Montagnes" },
  // Cavally
  { nom: "Guiglo", region: "Cavally", district: "District des Montagnes" },
  { nom: "Bloléquin", region: "Cavally", district: "District des Montagnes" },
  { nom: "Toulépleu", region: "Cavally", district: "District des Montagnes" },
  // Poro
  { nom: "Korhogo", region: "Poro", district: "District des Savanes" },
  { nom: "Sinématiali", region: "Poro", district: "District des Savanes" },
  { nom: "Dikodougou", region: "Poro", district: "District des Savanes" },
  // Tchologo
  { nom: "Ferkessédougou", region: "Tchologo", district: "District des Savanes" },
  { nom: "Kong", region: "Tchologo", district: "District des Savanes" },
  // Bagoué
  { nom: "Boundiali", region: "Bagoué", district: "District des Savanes" },
  { nom: "Tengréla", region: "Bagoué", district: "District des Savanes" },
  // San-Pédro
  { nom: "San-Pédro", region: "San-Pédro", district: "District du Bas-Sassandra" },
  { nom: "Tabou", region: "San-Pédro", district: "District du Bas-Sassandra" },
  // Nawa
  { nom: "Soubré", region: "Nawa", district: "District du Bas-Sassandra" },
  { nom: "Buyo", region: "Nawa", district: "District du Bas-Sassandra" },
  { nom: "Guéyo", region: "Nawa", district: "District du Bas-Sassandra" },
  // Gbôklé
  { nom: "Sassandra", region: "Gbôklé", district: "District du Bas-Sassandra" },
  { nom: "Fresco", region: "Gbôklé", district: "District du Bas-Sassandra" },
  // Gontougo
  { nom: "Bondoukou", region: "Gontougo", district: "District du Zanzan" },
  { nom: "Tanda", region: "Gontougo", district: "District du Zanzan" },
  // Bounkani
  { nom: "Bouna", region: "Bounkani", district: "District du Zanzan" },
  { nom: "Doropo", region: "Bounkani", district: "District du Zanzan" },
  // Indénié-Djuablin
  { nom: "Abengourou", region: "Indénié-Djuablin", district: "District de la Comoé" },
  { nom: "Agnibilékrou", region: "Indénié-Djuablin", district: "District de la Comoé" },
  // Sud-Comoé
  { nom: "Aboisso", region: "Sud-Comoé", district: "District de la Comoé" },
  { nom: "Adiaké", region: "Sud-Comoé", district: "District de la Comoé" },
  { nom: "Grand-Bassam", region: "Sud-Comoé", district: "District de la Comoé" },
  // Bélier
  { nom: "Toumodi", region: "Bélier", district: "District des Lacs" },
  { nom: "Didiévi", region: "Bélier", district: "District des Lacs" },
  { nom: "Tiébissou", region: "Bélier", district: "District des Lacs" },
  // Iffou
  { nom: "Daoukro", region: "Iffou", district: "District des Lacs" },
  { nom: "M'bahiakro", region: "Iffou", district: "District des Lacs" },
  // N'zi
  { nom: "Dimbokro", region: "N'zi", district: "District des Lacs" },
  { nom: "Bocanda", region: "N'zi", district: "District des Lacs" },
  // Moronou
  { nom: "Bongouanou", region: "Moronou", district: "District des Lacs" },
  { nom: "M'batto", region: "Moronou", district: "District des Lacs" },
  // Hambol
  { nom: "Katiola", region: "Hambol", district: "District de la Vallée du Bandama" },
  { nom: "Dabakala", region: "Hambol", district: "District de la Vallée du Bandama" },
  // Folon
  { nom: "Minignan", region: "Folon", district: "District du Denguélé" },
  // Kabadougou
  { nom: "Odienné", region: "Kabadougou", district: "District du Denguélé" },
  // Béré
  { nom: "Mankono", region: "Béré", district: "District du Woroba" },
  // Bafing
  { nom: "Touba", region: "Bafing", district: "District du Woroba" },
  // Worodougou
  { nom: "Séguéla", region: "Worodougou", district: "District du Woroba" },
  // Gôh
  { nom: "Gagnoa", region: "Gôh", district: "District du Gôh-Djiboua" },
  { nom: "Oumé", region: "Gôh", district: "District du Gôh-Djiboua" },
  // Lôh-Djiboua
  { nom: "Divo", region: "Lôh-Djiboua", district: "District du Gôh-Djiboua" },
  { nom: "Lakota", region: "Lôh-Djiboua", district: "District du Gôh-Djiboua" },
  // Agnéby-Tiassa
  { nom: "Agboville", region: "Agnéby-Tiassa", district: "District des Lagunes" },
  { nom: "Tiassalé", region: "Agnéby-Tiassa", district: "District des Lagunes" },
  // Grands-Ponts
  { nom: "Dabou", region: "Grands-Ponts", district: "District des Lagunes" },
  { nom: "Jacqueville", region: "Grands-Ponts", district: "District des Lagunes" },
  // La Mé
  { nom: "Adzopé", region: "La Mé", district: "District des Lagunes" },
  { nom: "Alépé", region: "La Mé", district: "District des Lagunes" },
];

export const sousPrefectures: SousPrefecture[] = [
  // Abidjan
  { nom: "Abobo", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Adjamé", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Attécoubé", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Cocody", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Koumassi", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Marcory", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Plateau", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Port-Bouët", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Treichville", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Yopougon", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Anyama", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Bingerville", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Songon", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Yamoussoukro
  { nom: "Yamoussoukro", departement: "Yamoussoukro", region: "Yamoussoukro", district: "District Autonome de Yamoussoukro" },
  { nom: "Attiégouakro", departement: "Yamoussoukro", region: "Yamoussoukro", district: "District Autonome de Yamoussoukro" },
  { nom: "Kossou", departement: "Yamoussoukro", region: "Yamoussoukro", district: "District Autonome de Yamoussoukro" },
  // Daloa
  { nom: "Daloa", departement: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Gboguhé", departement: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  // Issia
  { nom: "Issia", departement: "Issia", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Nahio", departement: "Issia", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  // Bouaké
  { nom: "Bouaké", departement: "Bouaké", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  { nom: "Djébonoua", departement: "Bouaké", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  // Korhogo
  { nom: "Korhogo", departement: "Korhogo", region: "Poro", district: "District des Savanes" },
  { nom: "Karakoro", departement: "Korhogo", region: "Poro", district: "District des Savanes" },
  // San-Pédro
  { nom: "San-Pédro", departement: "San-Pédro", region: "San-Pédro", district: "District du Bas-Sassandra" },
  // Man
  { nom: "Man", departement: "Man", region: "Tonkpi", district: "District des Montagnes" },
  // Gagnoa
  { nom: "Gagnoa", departement: "Gagnoa", region: "Gôh", district: "District du Gôh-Djiboua" },
  // Divo
  { nom: "Divo", departement: "Divo", region: "Lôh-Djiboua", district: "District du Gôh-Djiboua" },
  // Abengourou
  { nom: "Abengourou", departement: "Abengourou", region: "Indénié-Djuablin", district: "District de la Comoé" },
  // Grand-Bassam
  { nom: "Grand-Bassam", departement: "Grand-Bassam", region: "Sud-Comoé", district: "District de la Comoé" },
  // Agboville
  { nom: "Agboville", departement: "Agboville", region: "Agnéby-Tiassa", district: "District des Lagunes" },
  // Bondoukou
  { nom: "Bondoukou", departement: "Bondoukou", region: "Gontougo", district: "District du Zanzan" },
  // Soubré
  { nom: "Soubré", departement: "Soubré", region: "Nawa", district: "District du Bas-Sassandra" },
  // Bouaflé
  { nom: "Bouaflé", departement: "Bouaflé", region: "Marahoué", district: "District du Sassandra-Marahoué" },
  // Ferkessédougou
  { nom: "Ferkessédougou", departement: "Ferkessédougou", region: "Tchologo", district: "District des Savanes" },
  // Odienné
  { nom: "Odienné", departement: "Odienné", region: "Kabadougou", district: "District du Denguélé" },
  // Séguéla
  { nom: "Séguéla", departement: "Séguéla", region: "Worodougou", district: "District du Woroba" },
  // Adzopé
  { nom: "Adzopé", departement: "Adzopé", region: "La Mé", district: "District des Lagunes" },
  // Dimbokro
  { nom: "Dimbokro", departement: "Dimbokro", region: "N'zi", district: "District des Lacs" },
  // Katiola
  { nom: "Katiola", departement: "Katiola", region: "Hambol", district: "District de la Vallée du Bandama" },
];

// Quartiers/Villages principaux par sous-préfecture
export const localites: Localite[] = [
  // Abidjan - Cocody
  { nom: "Riviera", sousPrefecture: "Cocody", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Angré", sousPrefecture: "Cocody", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "II Plateaux", sousPrefecture: "Cocody", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Blockauss", sousPrefecture: "Cocody", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Danga", sousPrefecture: "Cocody", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Yopougon
  { nom: "Yopougon Maroc", sousPrefecture: "Yopougon", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Yopougon Sideci", sousPrefecture: "Yopougon", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Yopougon Wassakara", sousPrefecture: "Yopougon", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Yopougon Niangon", sousPrefecture: "Yopougon", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Abobo
  { nom: "Abobo Gare", sousPrefecture: "Abobo", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Abobo PK18", sousPrefecture: "Abobo", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Abobo Avocatier", sousPrefecture: "Abobo", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Marcory
  { nom: "Zone 4", sousPrefecture: "Marcory", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  { nom: "Biétry", sousPrefecture: "Marcory", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Treichville
  { nom: "Treichville Centre", sousPrefecture: "Treichville", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Plateau
  { nom: "Plateau Centre", sousPrefecture: "Plateau", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Koumassi
  { nom: "Koumassi Centre", sousPrefecture: "Koumassi", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Adjamé
  { nom: "Adjamé Liberté", sousPrefecture: "Adjamé", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Abidjan - Port-Bouët
  { nom: "Vridi", sousPrefecture: "Port-Bouët", departement: "Abidjan", region: "Abidjan", district: "District Autonome d'Abidjan" },
  // Daloa
  { nom: "Daloa Commerce", sousPrefecture: "Daloa", departement: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Daloa Lobia", sousPrefecture: "Daloa", departement: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Daloa Tazibouo", sousPrefecture: "Daloa", departement: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Daloa Huberson", sousPrefecture: "Daloa", departement: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  { nom: "Daloa Orly", sousPrefecture: "Daloa", departement: "Daloa", region: "Haut-Sassandra", district: "District du Sassandra-Marahoué" },
  // Bouaké
  { nom: "Bouaké Koko", sousPrefecture: "Bouaké", departement: "Bouaké", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  { nom: "Bouaké Commerce", sousPrefecture: "Bouaké", departement: "Bouaké", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  { nom: "Bouaké Dar es Salam", sousPrefecture: "Bouaké", departement: "Bouaké", region: "Gbêkê", district: "District de la Vallée du Bandama" },
  // Korhogo
  { nom: "Korhogo Centre", sousPrefecture: "Korhogo", departement: "Korhogo", region: "Poro", district: "District des Savanes" },
  { nom: "Korhogo Soba", sousPrefecture: "Korhogo", departement: "Korhogo", region: "Poro", district: "District des Savanes" },
  // San-Pédro
  { nom: "San-Pédro Centre", sousPrefecture: "San-Pédro", departement: "San-Pédro", region: "San-Pédro", district: "District du Bas-Sassandra" },
  { nom: "San-Pédro Bardo", sousPrefecture: "San-Pédro", departement: "San-Pédro", region: "San-Pédro", district: "District du Bas-Sassandra" },
  // Man
  { nom: "Man Centre", sousPrefecture: "Man", departement: "Man", region: "Tonkpi", district: "District des Montagnes" },
  // Yamoussoukro
  { nom: "Yamoussoukro Centre", sousPrefecture: "Yamoussoukro", departement: "Yamoussoukro", region: "Yamoussoukro", district: "District Autonome de Yamoussoukro" },
  { nom: "Yamoussoukro Habitat", sousPrefecture: "Yamoussoukro", departement: "Yamoussoukro", region: "Yamoussoukro", district: "District Autonome de Yamoussoukro" },
  // Gagnoa
  { nom: "Gagnoa Centre", sousPrefecture: "Gagnoa", departement: "Gagnoa", region: "Gôh", district: "District du Gôh-Djiboua" },
  // Grand-Bassam
  { nom: "Grand-Bassam Centre", sousPrefecture: "Grand-Bassam", departement: "Grand-Bassam", region: "Sud-Comoé", district: "District de la Comoé" },
];

// Fonction pour chercher les localités par terme
export function searchLocalites(term: string): Localite[] {
  const lower = term.toLowerCase();
  return localites.filter((l) => l.nom.toLowerCase().includes(lower)).slice(0, 20);
}

// Fonction pour chercher les sous-préfectures par terme
export function searchSousPrefectures(term: string): SousPrefecture[] {
  const lower = term.toLowerCase();
  return sousPrefectures.filter((sp) => sp.nom.toLowerCase().includes(lower)).slice(0, 20);
}

// Obtenir les régions d'un district
export function getRegionsByDistrict(district: string): Region[] {
  return regions.filter((r) => r.district === district);
}

// Obtenir les départements d'une région
export function getDepartementsByRegion(region: string): Departement[] {
  return departements.filter((d) => d.region === region);
}

// Obtenir les sous-préfectures d'un département
export function getSousPrefecturesByDepartement(departement: string): SousPrefecture[] {
  return sousPrefectures.filter((sp) => sp.departement === departement);
}

// Obtenir les localités d'une sous-préfecture
export function getLocalitesBySousPrefecture(sousPrefecture: string): Localite[] {
  return localites.filter((l) => l.sousPrefecture === sousPrefecture);
}
