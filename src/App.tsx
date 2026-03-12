import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Scanner from "./pages/Scanner";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import MesBiens from "./pages/MesBiens";
import EnregistrerBien from "./pages/EnregistrerBien";
import Signaler from "./pages/Signaler";
import ScanResult from "./pages/ScanResult";
import Equipe from "./pages/Equipe";
import Contact from "./pages/Contact";
import Confidentialite from "./pages/Confidentialite";
import Conditions from "./pages/Conditions";
import Profil from "./pages/Profil";
import AdminDashboard from "./pages/AdminDashboard";
import PaiementSucces from "./pages/PaiementSucces";
import PaiementErreur from "./pages/PaiementErreur";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/tableau-de-bord" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/mes-appareils" element={<ProtectedRoute><MesBiens /></ProtectedRoute>} />
            <Route path="/mes-biens" element={<ProtectedRoute><MesBiens /></ProtectedRoute>} />
            <Route path="/enregistrer-bien" element={<ProtectedRoute><EnregistrerBien /></ProtectedRoute>} />
            <Route path="/signaler" element={<ProtectedRoute><Signaler /></ProtectedRoute>} />
            <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/scan/:token" element={<ScanResult />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/a-propos" element={<Equipe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/paiement-succes" element={<PaiementSucces />} />
            <Route path="/paiement-erreur" element={<PaiementErreur />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
