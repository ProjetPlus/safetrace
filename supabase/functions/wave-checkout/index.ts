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

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { amount, device_data, description } = body;

    if (!amount || amount < 100) {
      return new Response(JSON.stringify({ error: "Montant invalide" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create pending payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        amount,
        currency: "XOF",
        payment_method: "wave",
        status: "pending",
        description: description || `Enregistrement SafeTrace`,
      })
      .select()
      .single();

    if (paymentError) {
      return new Response(JSON.stringify({ error: paymentError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Store device data temporarily in payment metadata
    // We'll use the payment_reference field to store serialized device data
    if (device_data) {
      await supabase.from("payments").update({
        payment_reference: JSON.stringify(device_data),
      }).eq("id", payment.id);
    }

    // Create Wave checkout session
    const baseUrl = "https://safetrace.ivoireprojet.com";
    const waveResponse = await fetch("https://api.wave.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${waveApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: String(amount),
        currency: "XOF",
        error_url: `${baseUrl}/enregistrer-bien?payment=error&payment_id=${payment.id}`,
        success_url: `${baseUrl}/enregistrer-bien?payment=success&payment_id=${payment.id}`,
        client_reference: payment.id,
      }),
    });

    if (!waveResponse.ok) {
      const errorText = await waveResponse.text();
      console.error("Wave API error:", errorText);
      
      await supabase.from("payments").update({ status: "failed" }).eq("id", payment.id);
      
      return new Response(JSON.stringify({ error: "Erreur Wave: " + errorText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const waveData = await waveResponse.json();

    // Update payment with Wave checkout ID
    await supabase.from("payments").update({
      wave_checkout_id: waveData.id,
    }).eq("id", payment.id);

    return new Response(JSON.stringify({
      payment_id: payment.id,
      wave_launch_url: waveData.wave_launch_url,
      checkout_id: waveData.id,
    }), {
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
