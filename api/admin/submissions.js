import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const ADMIN_KEY = process.env.ADMIN_KEY || "osogbo-admin-2024";

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

  try {
    let countQuery = supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true });

    if (search) {
      countQuery = countQuery.ilike("email", `%${search}%`);
    }
    if (role) {
      countQuery = countQuery.eq("role", role);
    }

    const { count } = await countQuery;

    let dataQuery = supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + perPage - 1);

    if (search) {
      dataQuery = dataQuery.ilike("email", `%${search}%`);
    }
    if (role) {
      dataQuery = dataQuery.eq("role", role);
    }

    const { data, error } = await dataQuery;

    if (error) {
      return res.status(500).json({ detail: "Failed to fetch.", error: error.message });
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
  } catch (err) {
    return res.status(500).json({ detail: "Server error." });
  }
}
