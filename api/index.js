export default function handler(req, res) {
  const apiKey = process.env.GNEWS_API_KEY || null;
  if (!apiKey) {
    return res.status(500).json({ error: "Chave da API não configurada." });
  }
  res.status(200).json({ chave: apiKey });
}
