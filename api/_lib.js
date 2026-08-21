import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const ADMIN_KEY = process.env.ADMIN_KEY || "osogbo-admin-2024";
export { supabase };
