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
import Confirmation from "./pages/Confirmation";
import MotDePasseOublie from "./pages/MotDePasseOublie";
import ResetPassword from "./pages/ResetPassword";
import Profil from "./pages/Profil";
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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/scan/:token" element={<ScanResult />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/a-propos" element={<Equipe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes */}
            <Route path="/tableau-de-bord" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/mes-biens" element={<ProtectedRoute><MesBiens /></ProtectedRoute>} />
            <Route path="/enregistrer-bien" element={<ProtectedRoute><EnregistrerBien /></ProtectedRoute>} />
            <Route path="/signaler" element={<ProtectedRoute><Signaler /></ProtectedRoute>} />
            <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
