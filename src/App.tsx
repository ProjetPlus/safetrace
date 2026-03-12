import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Scanner from "./pages/Scanner";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import MesBiens from "./pages/MesBiens";
import EnregistrerBien from "./pages/EnregistrerBien";
import Signaler from "./pages/Signaler";
import ScanResult from "./pages/ScanResult";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import Confidentialite from "./pages/Confidentialite";
import Conditions from "./pages/Conditions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/tableau-de-bord" element={<Dashboard />} />
          <Route path="/mes-biens" element={<MesBiens />} />
          <Route path="/enregistrer-bien" element={<EnregistrerBien />} />
          <Route path="/signaler" element={<Signaler />} />
          <Route path="/scan/:token" element={<ScanResult />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
