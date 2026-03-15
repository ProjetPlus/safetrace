import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import safetraceLogo from "@/assets/safetrace-logo.jpg";
import inocentKoffi from "@/assets/inocent-koffi.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <img src={safetraceLogo} alt="SafeTrace" className="h-12 w-auto rounded-lg" />
          <p className="text-sm text-primary-foreground/70">
            Enregistrez. Protégez. Vérifiez.<br />
            La plateforme de traçabilité des appareils et véhicules en Côte d'Ivoire.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link></li>
            <li><Link to="/scanner" className="hover:text-primary-foreground transition-colors">Scanner un appareil</Link></li>
            <li><Link to="/inscription" className="hover:text-primary-foreground transition-colors">Créer un compte</Link></li>
            <li><Link to="/equipe" className="hover:text-primary-foreground transition-colors">Équipe</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4">Légal</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/confidentialite" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</Link></li>
            <li><Link to="/conditions" className="hover:text-primary-foreground transition-colors">Conditions d'utilisation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="https://wa.me/2250707167921" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">+225 07 07 16 79 21 (WhatsApp)</a>
            </li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@safetrace.ci</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Daloa, Côte d'Ivoire</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
        <p>© {new Date().getFullYear()} SafeTrace CI — Plateforme de traçabilité et de protection des appareils et véhicules · Vérification gratuite pour tous</p>
        <a href="https://ikoffi.agricapital.ci" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 hover:text-primary-foreground/80 transition-colors">
          <img src={inocentKoffi} alt="Inocent KOFFI" className="w-6 h-6 rounded-full object-cover object-top border border-primary-foreground/30" />
          <span>Plateforme développée par Inocent KOFFI</span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
