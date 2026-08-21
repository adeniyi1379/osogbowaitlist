import { supabase, ADMIN_KEY } from "../../_lib.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Method not allowed." });
  }

  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ detail: "Invalid admin key." });
  }

  const search = req.query.search || "";
  const role = req.query.role || "";
  const page = parseInt(req.query.page || "1", 10);
  const perPage = parseInt(req.query.per_page || "20", 10);
  const offset = (page - 1) * perPage;

  let query = supabase
    .from("waitlist")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + perPage - 1);

  if (search) {
    query = query.ilike("email", `%${search.toLowerCase()}%`);
  }
  if (role) {
    query = query.eq("role", role);
  }

  const { data, count, error } = await query;

  if (error) {
    return res.status(500).json({ detail: "Failed to fetch submissions." });
  }

  return res.status(200).json({
    total: count || 0,
    page,
    per_page: perPage,
    data: (data || []).map((r) => ({
      id: r.id,
      email: r.email,
      whatsapp: r.whatsapp,
      role: r.role,
      interests: r.interests,
      source: r.source,
      created_at: r.created_at,
    })),
  });
}
