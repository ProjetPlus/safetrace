import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const waveApiKey = Deno.env.get("WAVE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from JWT
    const token = authHeader?.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { amount, description, device_id } = await req.json();

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        device_id: device_id || null,
        amount,
        currency: "XOF",
        payment_method: "wave",
        description,
        status: "pending",
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    // Call Wave API to create checkout
    const waveResponse = await fetch("https://api.wave.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${waveApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount.toString(),
        currency: "XOF",
        error_url: `${req.headers.get("origin") || "https://safetrace.lovable.app"}/paiement-erreur`,
        success_url: `${req.headers.get("origin") || "https://safetrace.lovable.app"}/paiement-succes?payment_id=${payment.id}`,
        client_reference: payment.id,
      }),
    });

    if (!waveResponse.ok) {
      const errText = await waveResponse.text();
      console.error("Wave API error:", errText);
      
      // Update payment as failed
      await supabase.from("payments").update({ status: "failed" }).eq("id", payment.id);
      
      return new Response(JSON.stringify({ error: "Erreur Wave", details: errText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const waveData = await waveResponse.json();

    // Update payment with Wave checkout ID
    await supabase
      .from("payments")
      .update({
        wave_checkout_id: waveData.id,
        payment_reference: waveData.id,
      })
      .eq("id", payment.id);

    return new Response(
      JSON.stringify({
        checkoutUrl: waveData.wave_launch_url,
        paymentId: payment.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
