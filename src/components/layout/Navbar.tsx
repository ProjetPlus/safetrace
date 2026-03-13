import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, ScanLine, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import safetraceLogo from "@/assets/safetrace-logo.jpg";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/scanner", label: "Scanner", icon: ScanLine },
  { to: "/mes-biens", label: "Mes appareils" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={safetraceLogo} alt="SafeTrace" className="h-10 w-auto rounded-lg" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/connexion">
                <LogIn className="h-4 w-4 mr-1" />
                Connexion
              </Link>
            </Button>
            <Button asChild className="bg-safe-green hover:bg-safe-green/90 text-white">
              <Link to="/inscription">
                <UserPlus className="h-4 w-4 mr-1" />
                S'inscrire
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/connexion" onClick={() => setIsOpen(false)}>
                  <LogIn className="h-4 w-4 mr-1" />
                  Connexion
                </Link>
              </Button>
              <Button asChild className="w-full bg-safe-green hover:bg-safe-green/90 text-white">
                <Link to="/inscription" onClick={() => setIsOpen(false)}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  S'inscrire gratuitement
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
