import { useEffect, useState } from "react";
import { Search, MessageSquare, X, Send, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const AdminContacts = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [reply, setReply] = useState("");

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    fetchMessages();
  };

  const openMessage = (msg: any) => {
    setSelected(msg);
    if (!msg.is_read) markAsRead(msg.id);
  };

  const handleWhatsAppReply = () => {
    const contact = selected?.contact || "";
    const phone = contact.replace(/\D/g, "");
    const text = encodeURIComponent(reply || `Bonjour ${selected?.nom}, merci pour votre message sur SafeTrace.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const handleEmailReply = () => {
    const contact = selected?.contact || "";
    const subject = encodeURIComponent("Réponse SafeTrace");
    const body = encodeURIComponent(reply || `Bonjour ${selected?.nom}, merci pour votre message.`);
    window.open(`mailto:${contact}?subject=${subject}&body=${body}`, "_blank");
  };

  const filtered = messages.filter(m => `${m.nom} ${m.contact} ${m.message}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2"><MessageSquare className="h-6 w-6" /> Messages ({messages.length})</h2>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="pl-10" />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Nom</th>
                    <th className="text-left p-3 font-medium hidden sm:table-cell">Contact</th>
                    <th className="text-left p-3 font-medium">Message</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
                    <th className="text-left p-3 font-medium">Lu</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : filtered.map((m) => (
                    <tr key={m.id} className={`border-b cursor-pointer hover:bg-muted/30 ${!m.is_read ? "bg-primary/5 font-medium" : ""}`} onClick={() => openMessage(m)}>
                      <td className="p-3">{m.nom}</td>
                      <td className="p-3 hidden sm:table-cell text-muted-foreground">{m.contact}</td>
                      <td className="p-3 truncate max-w-[200px]">{m.message}</td>
                      <td className="p-3 hidden md:table-cell text-muted-foreground">{new Date(m.created_at).toLocaleDateString("fr-FR")}</td>
                      <td className="p-3">{m.is_read ? "✓" : <span className="w-2 h-2 bg-primary rounded-full inline-block" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Message de {selected?.nom}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="bg-muted rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Nom</span><span className="font-medium">{selected.nom}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span className="font-medium">{selected.contact}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{new Date(selected.created_at).toLocaleString("fr-FR")}</span></div>
              </div>
              <div className="bg-card border rounded-xl p-4">
                <p className="text-sm whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="space-y-2">
                <Textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Votre réponse..." rows={3} />
                <div className="flex gap-2">
                  <Button onClick={handleEmailReply} variant="outline" className="flex-1"><Send className="h-4 w-4 mr-1" /> Email</Button>
                  <Button onClick={handleWhatsAppReply} className="flex-1 bg-safe-green hover:bg-safe-green/90 text-white"><Phone className="h-4 w-4 mr-1" /> WhatsApp</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminContacts;
