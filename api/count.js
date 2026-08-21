import { supabase } from "./_lib.js";

export default async function handler(req, res) {
  const { count, error } = await supabase
    .from("waitlist")
    .select("id", { count: "exact", head: true });

  if (error) {
    return res.status(500).json({ count: 0 });
  }

  return res.status(200).json({ count: count || 0 });
}
