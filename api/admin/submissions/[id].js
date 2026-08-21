import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const ADMIN_KEY = process.env.ADMIN_KEY || "osogbo-admin-2024";

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ detail: "Invalid admin key." });
  }

  const id = parseInt(req.query.id, 10);
  if (!id) {
    return res.status(400).json({ detail: "Invalid ID." });
  }

  if (req.method === "PUT") {
    const { role, interests } = req.body;
    const values = {};
    if (role !== undefined) values.role = role;
    if (interests !== undefined) values.interests = interests;

    if (Object.keys(values).length === 0) {
      return res.status(400).json({ detail: "Nothing to update." });
    }

    const { error } = await supabase
      .from("waitlist")
      .update(values)
      .eq("id", id);

    if (error) {
      return res.status(500).json({ detail: "Update failed." });
    }

    return res.status(200).json({ status: "ok" });
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("waitlist")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ detail: "Delete failed." });
    }

    return res.status(200).json({ status: "ok" });
  }

  return res.status(405).json({ detail: "Method not allowed." });
}
