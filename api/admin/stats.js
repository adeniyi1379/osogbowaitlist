import { supabase, ADMIN_KEY } from "../../_lib.js";

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ detail: "Invalid admin key." });
  }

  const { count: total } = await supabase
    .from("waitlist")
    .select("id", { count: "exact", head: true });

  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { count: today } = await supabase
    .from("waitlist")
    .select("id", { count: "exact", head: true })
    .gte("created_at", todayStart.toISOString());

  const { data: roles } = await supabase
    .from("waitlist")
    .select("role");

  const rolesBreakdown = {};
  (roles || []).forEach((r) => {
    const key = r.role || "unset";
    rolesBreakdown[key] = (rolesBreakdown[key] || 0) + 1;
  });

  return res.status(200).json({
    total_signups: total || 0,
    today_signups: today || 0,
    roles_breakdown: rolesBreakdown,
  });
}
