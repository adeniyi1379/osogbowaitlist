import { ADMIN_KEY } from "../_lib.js";

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
