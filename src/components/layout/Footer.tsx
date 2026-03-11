import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import safetraceLogo from "@/assets/safetrace-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={safetraceLogo} alt="SafeTrace" className="h-12 w-auto rounded-lg" />
            <p className="text-sm text-primary-foreground/70">
              Identifie. Protège. Retrouve.<br />
              La plateforme nationale de protection des biens en Côte d'Ivoire.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link></li>
              <li><Link to="/scanner" className="hover:text-primary-foreground transition-colors">Scanner un bien</Link></li>
              <li><Link to="/inscription" className="hover:text-primary-foreground transition-colors">Créer un compte</Link></li>
              <li><Link to="/a-propos" className="hover:text-primary-foreground transition-colors">À propos</Link></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-display font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/confidentialite" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/conditions" className="hover:text-primary-foreground transition-colors">Conditions d'utilisation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +225 07 59 56 60 87
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@safetrace.ci
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Daloa, Côte d'Ivoire
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} SafeTrace CI — Plateforme de traçabilité et de protection des biens · Accès gratuit pour tous les citoyens
        </div>
      </div>
    </footer>
  );
};

export default Footer;
