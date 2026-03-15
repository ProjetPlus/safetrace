import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !contact || !message) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({ nom, contact, message });
    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "✅ Message envoyé", description: "Nous vous répondrons dans les plus brefs délais." });
    setNom(""); setContact(""); setMessage("");
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-safe-bg-blue to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Contactez-nous</h1>
            <p className="text-muted-foreground text-lg">Une question, un partenariat ? Écrivez-nous.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-4">Envoyez un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>Nom complet *</Label>
                      <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Votre nom" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Email ou WhatsApp *</Label>
                      <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="vous@email.com ou +225..." />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Message *</Label>
                      <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Décrivez votre demande..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full bg-safe-green hover:bg-safe-green/90 text-white" disabled={loading}>
                      <Send className="h-4 w-4 mr-2" />
                      {loading ? "Envoi…" : "Envoyer"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
              {[
                { icon: Phone, label: "Téléphone / WhatsApp", value: "+225 07 07 16 79 21", href: "https://wa.me/2250707167921" },
                { icon: Mail, label: "Email", value: "contact@safetrace.ci", href: "mailto:contact@safetrace.ci" },
                { icon: MapPin, label: "Adresse", value: "Daloa, Haut-Sassandra, Côte d'Ivoire" },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary">{item.value}</a>
                      ) : (
                        <div className="font-medium">{item.value}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
