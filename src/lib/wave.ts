import { supabase } from "@/integrations/supabase/client";

const TARIFS: Record<string, number> = {
  telephone: 200,
  ordinateur: 500,
  televiseur: 500,
  electromenager: 500,
  voiture: 2000,
  moto: 1000,
};

export const getTarif = (categorie: string): number => TARIFS[categorie] || 0;

export const initiateWavePayment = async (
  amount: number,
  description: string,
  deviceId?: string
): Promise<{ checkoutUrl: string; paymentId: string } | null> => {
  try {
    const { data, error } = await supabase.functions.invoke("wave-payment", {
      body: { amount, description, device_id: deviceId },
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Wave payment error:", err);
    return null;
  }
};

export { TARIFS };
