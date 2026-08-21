import { supabase, ADMIN_KEY } from "../../_lib.js";

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ detail: "Invalid admin key." });
  }

  const format = req.query.format || "csv";

  const { data: rows } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (format === "json") {
    return res.status(200).json(
      (rows || []).map((r) => ({
        id: r.id,
        email: r.email,
        whatsapp: r.whatsapp,
        role: r.role,
        interests: r.interests,
        source: r.source,
        created_at: r.created_at,
      }))
    );
  }

  const header = "id,email,whatsapp,role,interests,source,created_at";
  const csvRows = (rows || [])
    .map(
      (r) =>
        `${r.id},"${(r.email || "").replace(/"/g, '""')}","${(r.whatsapp || "").replace(/"/g, '""')}","${(r.role || "").replace(/"/g, '""')}","${(r.interests || "").replace(/"/g, '""')}","${(r.source || "").replace(/"/g, '""')}","${r.created_at || ""}"`
    )
    .join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=osogbo_waitlist.csv"
  );
  return res.status(200).send(`${header}\n${csvRows}`);
}
