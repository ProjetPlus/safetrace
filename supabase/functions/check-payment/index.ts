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
    const waveApiKey = Deno.env.get("WAVE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { payment_id } = await req.json();

    if (!payment_id) {
      return new Response(JSON.stringify({ error: "payment_id requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: payment, error } = await supabase
      .from("payments")
      .select("*")
      .eq("id", payment_id)
      .single();

    if (error || !payment) {
      return new Response(JSON.stringify({ error: "Paiement non trouvé" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If already completed, return
    if (payment.status === "completed") {
      return new Response(JSON.stringify({ status: "completed", payment }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check with Wave API if we have a checkout ID
    if (payment.wave_checkout_id) {
      const waveResponse = await fetch(
        `https://api.wave.com/v1/checkout/sessions/${payment.wave_checkout_id}`,
        {
          headers: {
            Authorization: `Bearer ${waveApiKey}`,
          },
        }
      );

      if (waveResponse.ok) {
        const waveData = await waveResponse.json();
        
        if (waveData.payment_status === "succeeded") {
          await supabase.from("payments").update({ status: "completed" }).eq("id", payment.id);

          // Create device if data exists
          if (payment.payment_reference) {
            try {
              const deviceData = JSON.parse(payment.payment_reference);
              const { data: existingDevice } = await supabase
                .from("devices")
                .select("id")
                .eq("token", deviceData.token)
                .maybeSingle();

              if (!existingDevice) {
                const { data: device } = await supabase
                  .from("devices")
                  .insert({ ...deviceData, user_id: payment.user_id })
                  .select()
                  .single();

                if (device) {
                  await supabase.from("payments").update({ device_id: device.id }).eq("id", payment.id);
                }
              }
            } catch (e) {
              console.error("Parse error:", e);
            }
          }

          return new Response(JSON.stringify({ status: "completed", payment: { ...payment, status: "completed" } }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        if (waveData.payment_status === "failed" || waveData.payment_status === "expired") {
          await supabase.from("payments").update({ status: "failed" }).eq("id", payment.id);
          return new Response(JSON.stringify({ status: "failed" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    return new Response(JSON.stringify({ status: payment.status, payment }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
