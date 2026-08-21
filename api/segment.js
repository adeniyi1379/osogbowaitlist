import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed." });
  }

  const { email, role, interests } = req.body;
  if (!email) {
    return res.status(400).json({ detail: "Email is required." });
  }

  const interestsStr = interests && interests.length > 0 ? interests.join(",") : null;

  const { error } = await supabase
    .from("waitlist")
    .update({ role: role || null, interests: interestsStr })
    .eq("email", email.toLowerCase().trim());

  if (error) {
    return res.status(500).json({ detail: "Update failed." });
  }

  return res.status(200).json({ status: "ok" });
}
