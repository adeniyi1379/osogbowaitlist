import { supabase, ADMIN_KEY } from "../../_lib.js";

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ detail: "Invalid admin key." });
  }

  try {
    const { count: total, error: e1 } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true });

    if (e1) console.error("Stats total error:", e1);

    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const { count: today, error: e2 } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    if (e2) console.error("Stats today error:", e2);

    const { data: roles, error: e3 } = await supabase
      .from("waitlist")
      .select("role");

    if (e3) console.error("Stats roles error:", e3);

    const rolesBreakdown = {};
    (roles || []).forEach((r) => {
      const k = r.role || "unset";
      rolesBreakdown[k] = (rolesBreakdown[k] || 0) + 1;
    });

    return res.status(200).json({
      total_signups: total || 0,
      today_signups: today || 0,
      roles_breakdown: rolesBreakdown,
    });
  } catch (err) {
    console.error("Stats unexpected error:", err);
    return res.status(200).json({
      total_signups: 0,
      today_signups: 0,
      roles_breakdown: {},
    });
  }
}
