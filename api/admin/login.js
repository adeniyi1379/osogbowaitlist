const ADMIN_KEY = process.env.ADMIN_KEY || "osogbo-admin-2024";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed." });
  }

  const { key } = req.body;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ detail: "Invalid admin key." });
  }

  return res.status(200).json({ status: "ok", token: ADMIN_KEY });
}
