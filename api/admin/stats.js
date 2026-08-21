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

  try {
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
      const k = r.role || "unset";
      rolesBreakdown[k] = (rolesBreakdown[k] || 0) + 1;
    });

    return res.status(200).json({
      total_signups: total || 0,
      today_signups: today || 0,
      roles_breakdown: rolesBreakdown,
    });
  } catch (err) {
    return res.status(200).json({
      total_signups: 0,
      today_signups: 0,
      roles_breakdown: {},
    });
  }
}
