import { useState, useMemo } from "react";
import { MapPin, Navigation, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  districts,
  regions,
  departements,
  sousPrefectures,
  localites,
  searchLocalites,
  getRegionsByDistrict,
  getDepartementsByRegion,
  getSousPrefecturesByDepartement,
  getLocalitesBySousPrefecture,
  type Localite,
} from "@/data/localites-ci";
import { useToast } from "@/hooks/use-toast";

interface LocationData {
  village: string;
  sousPrefecture: string;
  departement: string;
  region: string;
  district: string;
  isCustom?: boolean;
}

interface LocationSelectorProps {
  value: LocationData;
  onChange: (data: LocationData) => void;
}

const LocationSelector = ({ value, onChange }: LocationSelectorProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [showCustom, setShowCustom] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return searchLocalites(searchTerm);
  }, [searchTerm]);

  const availableRegions = value.district ? getRegionsByDistrict(value.district) : [];
  const availableDepartements = value.region ? getDepartementsByRegion(value.region) : [];
  const availableSousPrefectures = value.departement ? getSousPrefecturesByDepartement(value.departement) : [];
  const availableLocalites = value.sousPrefecture ? getLocalitesBySousPrefecture(value.sousPrefecture) : [];

  const selectLocalite = (loc: Localite) => {
    onChange({
      village: loc.nom,
      sousPrefecture: loc.sousPrefecture,
      departement: loc.departement,
      region: loc.region,
      district: loc.district,
    });
    setSearchTerm("");
    setShowSearch(false);
  };

  const handleGPS = () => {
    if (!navigator.geolocation) {
      toast({ title: "GPS non disponible", description: "Votre appareil ne supporte pas la géolocalisation.", variant: "destructive" });
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=fr`);
          const data = await resp.json();
          const village = data.address?.suburb || data.address?.village || data.address?.town || data.address?.city || "";
          toast({ title: "Position détectée", description: `${village} — ${data.address?.state || ""}` });
          // Try to match with our database
          const matched = localites.find((l) => l.nom.toLowerCase().includes(village.toLowerCase()));
          if (matched) {
            selectLocalite(matched);
          } else {
            onChange({ ...value, village: village || "Position GPS détectée" });
            setShowSearch(false);
          }
        } catch {
          toast({ title: "Erreur", description: "Impossible de déterminer votre localité.", variant: "destructive" });
        } finally {
          setGpsLoading(false);
        }
      },
      () => {
        toast({ title: "Accès refusé", description: "Autorisez la géolocalisation dans votre navigateur.", variant: "destructive" });
        setGpsLoading(false);
      }
    );
  };

  return (
    <div className="space-y-3 p-4 bg-safe-bg-blue rounded-xl">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 font-display font-semibold">
          <MapPin className="h-4 w-4 text-primary" /> Localisation
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={handleGPS} disabled={gpsLoading}>
          <Navigation className="h-3 w-3 mr-1" />
          {gpsLoading ? "Détection…" : "GPS auto"}
        </Button>
      </div>

      {/* Search by village name */}
      {showSearch && (
        <div className="space-y-1.5">
          <Label>Village / Quartier / Campement</Label>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tapez le nom de votre localité…"
          />
          {searchResults.length > 0 && (
            <div className="bg-card border rounded-lg max-h-48 overflow-y-auto">
              {searchResults.map((loc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectLocalite(loc)}
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm border-b last:border-b-0 transition-colors"
                >
                  <span className="font-medium">{loc.nom}</span>
                  <span className="text-muted-foreground"> — {loc.sousPrefecture}, {loc.departement}</span>
                </button>
              ))}
            </div>
          )}
          {searchTerm.length >= 2 && searchResults.length === 0 && (
            <button
              type="button"
              onClick={() => { setShowCustom(true); setShowSearch(false); onChange({ ...value, village: searchTerm, isCustom: true }); }}
              className="w-full text-left px-3 py-2 bg-card border rounded-lg text-sm hover:bg-muted transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4 text-safe-green" />
              <span>Autre — Ajouter « {searchTerm} » comme nouvelle localité</span>
            </button>
          )}
        </div>
      )}

      {/* Selected or manual location display */}
      {!showSearch && !showCustom && value.village && (
        <div className="bg-card border rounded-lg p-3 space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">{value.village}</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => { setShowSearch(true); onChange({ village: "", sousPrefecture: "", departement: "", region: "", district: "" }); }}>
              Changer
            </Button>
          </div>
          {value.sousPrefecture && <div className="text-xs text-muted-foreground">{value.sousPrefecture} → {value.departement} → {value.region} → {value.district}</div>}
        </div>
      )}

      {/* Custom localité entry */}
      {showCustom && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Nom de la localité</Label>
            <Input value={value.village} onChange={(e) => onChange({ ...value, village: e.target.value })} placeholder="Nom exact du village/quartier" />
          </div>
          <div className="space-y-1.5">
            <Label>District</Label>
            <Select value={value.district} onValueChange={(v) => onChange({ ...value, district: v, region: "", departement: "", sousPrefecture: "" })}>
              <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
              <SelectContent>{districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {value.district && (
            <div className="space-y-1.5">
              <Label>Région</Label>
              <Select value={value.region} onValueChange={(v) => onChange({ ...value, region: v, departement: "", sousPrefecture: "" })}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{availableRegions.map((r) => <SelectItem key={r.nom} value={r.nom}>{r.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          {value.region && (
            <div className="space-y-1.5">
              <Label>Département</Label>
              <Select value={value.departement} onValueChange={(v) => onChange({ ...value, departement: v, sousPrefecture: "" })}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{availableDepartements.map((d) => <SelectItem key={d.nom} value={d.nom}>{d.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          {value.departement && (
            <div className="space-y-1.5">
              <Label>Sous-Préfecture</Label>
              <Select value={value.sousPrefecture} onValueChange={(v) => onChange({ ...value, sousPrefecture: v })}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{availableSousPrefectures.map((sp) => <SelectItem key={sp.nom} value={sp.nom}>{sp.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          <Button type="button" variant="ghost" size="sm" onClick={() => { setShowCustom(false); setShowSearch(true); }}>
            ← Retour à la recherche
          </Button>
        </div>
      )}

      {/* Cascade selectors when no search */}
      {!showSearch && !showCustom && !value.village && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>District</Label>
            <Select value={value.district} onValueChange={(v) => onChange({ village: "", sousPrefecture: "", departement: "", region: "", district: v })}>
              <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
              <SelectContent>{districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {value.district && availableRegions.length > 0 && (
            <div className="space-y-1.5">
              <Label>Région</Label>
              <Select value={value.region} onValueChange={(v) => onChange({ ...value, region: v, departement: "", sousPrefecture: "", village: "" })}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{availableRegions.map((r) => <SelectItem key={r.nom} value={r.nom}>{r.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          {value.region && availableDepartements.length > 0 && (
            <div className="space-y-1.5">
              <Label>Département</Label>
              <Select value={value.departement} onValueChange={(v) => onChange({ ...value, departement: v, sousPrefecture: "", village: "" })}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{availableDepartements.map((d) => <SelectItem key={d.nom} value={d.nom}>{d.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          {value.departement && availableSousPrefectures.length > 0 && (
            <div className="space-y-1.5">
              <Label>Sous-Préfecture</Label>
              <Select value={value.sousPrefecture} onValueChange={(v) => onChange({ ...value, sousPrefecture: v, village: "" })}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{availableSousPrefectures.map((sp) => <SelectItem key={sp.nom} value={sp.nom}>{sp.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          {value.sousPrefecture && availableLocalites.length > 0 && (
            <div className="space-y-1.5">
              <Label>Village / Quartier</Label>
              <Select value={value.village} onValueChange={(v) => {
                const loc = availableLocalites.find(l => l.nom === v);
                if (loc) selectLocalite(loc);
              }}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>{availableLocalites.map((l) => <SelectItem key={l.nom} value={l.nom}>{l.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
