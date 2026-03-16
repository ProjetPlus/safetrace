import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const webhookSecret = Deno.env.get("WAVE_WEBHOOK_SECRET");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    console.log("Wave webhook received:", JSON.stringify(body));

    const { type, data } = body;

    if (type === "checkout.session.completed") {
      const clientReference = data?.client_reference;
      if (!clientReference) {
        return new Response(JSON.stringify({ error: "Missing client_reference" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Update payment status
      const { data: payment, error: fetchError } = await supabase
        .from("payments")
        .select("*")
        .eq("id", clientReference)
        .single();

      if (fetchError || !payment) {
        console.error("Payment not found:", clientReference);
        return new Response(JSON.stringify({ error: "Payment not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Mark as completed
      await supabase.from("payments").update({
        status: "completed",
        wave_checkout_id: data?.id || payment.wave_checkout_id,
      }).eq("id", payment.id);

      // If device data was stored, create the device now
      if (payment.payment_reference) {
        try {
          const deviceData = JSON.parse(payment.payment_reference);
          
          const { data: device, error: deviceError } = await supabase
            .from("devices")
            .insert({
              ...deviceData,
              user_id: payment.user_id,
            })
            .select()
            .single();

          if (deviceError) {
            console.error("Device creation error:", deviceError);
          } else {
            // Link device to payment
            await supabase.from("payments").update({
              device_id: device.id,
            }).eq("id", payment.id);

            // Send notification
            await supabase.from("notifications").insert({
              user_id: payment.user_id,
              title: "Enregistrement confirmé ✅",
              message: `Votre ${deviceData.marque} ${deviceData.modele || ""} a été enregistré avec succès. Code: ${deviceData.token}`,
              link: `/appareil/${device.id}`,
            });
          }
        } catch (e) {
          console.error("Failed to parse device data:", e);
        }
      }

      // Notify user of payment success
      await supabase.from("notifications").insert({
        user_id: payment.user_id,
        title: "Paiement reçu ✅",
        message: `Votre paiement de ${payment.amount} F CFA a été confirmé.`,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
