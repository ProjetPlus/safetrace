import { useState } from "react";
import { ArrowRightLeft, Phone, Mail, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bienNom: string;
}

const TransferDialog = ({ open, onOpenChange, bienNom }: TransferDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"search" | "confirm" | "done">("search");
  const [destinataire, setDestinataire] = useState("");
  const [motif, setMotif] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState<{ nom: string; whatsapp: string } | null>(null);

  const handleSearch = () => {
    if (!destinataire.trim()) {
      toast({ title: "Erreur", description: "Veuillez saisir le WhatsApp ou l'email du destinataire.", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate user lookup
    setTimeout(() => {
      setLoading(false);
      setFoundUser({ nom: "Kouassi Aya", whatsapp: "+225 07 58 00 00 00" });
      setStep("confirm");
    }, 1000);
  };

  const handleTransfer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
      toast({ title: "✅ Transfert initié", description: `Un lien de confirmation a été envoyé au destinataire.` });
    }, 1500);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("search");
      setDestinataire("");
      setMotif("");
      setFoundUser(null);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Transférer la propriété
          </DialogTitle>
          <DialogDescription>
            {bienNom} — Le destinataire devra accepter le transfert.
          </DialogDescription>
        </DialogHeader>

        {step === "search" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>WhatsApp ou email du destinataire *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={destinataire} onChange={(e) => setDestinataire(e.target.value)} placeholder="+225 07... ou email@..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Motif du transfert (optionnel)</Label>
              <Textarea value={motif} onChange={(e) => setMotif(e.target.value)} placeholder="Vente, don, etc." rows={2} />
            </div>
            <Button onClick={handleSearch} className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Recherche…" : "Rechercher le destinataire"}
            </Button>
          </div>
        )}

        {step === "confirm" && foundUser && (
          <div className="space-y-4">
            <div className="bg-safe-bg-green rounded-xl p-4 border">
              <p className="text-sm font-medium text-foreground">Destinataire trouvé :</p>
              <p className="font-display font-bold text-lg">{foundUser.nom}</p>
              <p className="text-sm text-muted-foreground">{foundUser.whatsapp}</p>
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <p className="text-sm text-destructive font-medium">⚠️ Cette action est irréversible. Le bien sera transféré définitivement au destinataire après son acceptation.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("search")} className="flex-1">Retour</Button>
              <Button onClick={handleTransfer} className="flex-1 bg-safe-green hover:bg-safe-green/90 text-white" disabled={loading}>
                {loading ? "Transfert…" : "Confirmer le transfert"}
              </Button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-safe-green/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-safe-green" />
            </div>
            <div>
              <p className="font-display font-bold text-lg">Transfert initié !</p>
              <p className="text-sm text-muted-foreground">Le destinataire recevra une notification pour accepter le transfert. Vous serez notifié une fois le transfert finalisé.</p>
            </div>
            <Button onClick={handleClose} className="w-full">Fermer</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransferDialog;
