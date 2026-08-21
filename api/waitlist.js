import { supabase } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed." });
  }

  const { email, whatsapp, source } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ detail: "Invalid email." });
  }

  const normalized = email.toLowerCase().trim();

  const { data: existing } = await supabase
    .from("waitlist")
    .select("id")
    .eq("email", normalized)
    .single();

  if (existing) {
    return res.status(409).json({ detail: "Email already on the waitlist." });
  }

  const { error } = await supabase.from("waitlist").insert({
    email: normalized,
    whatsapp: whatsapp || null,
    source: source || "organic",
    created_at: new Date().toISOString(),
  });

  if (error) {
    return res.status(500).json({ detail: "Something went wrong." });
  }

  return res.status(200).json({ status: "ok", message: "You're on the list!" });
}
