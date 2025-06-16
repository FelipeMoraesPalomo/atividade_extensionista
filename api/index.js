import fetch from "node-fetch";

export default async function handler(req, res) {
  const { cidade = "Jundiaí" } = req.query;
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Chave da API não configurada." });
  }

  const url = `https://gnews.io/api/v4/search?q=saúde+${cidade}&lang=pt&country=br&max=10&token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.articles);
  } catch (error) {
    console.error("Erro ao buscar dados da GNews:", error);
    res.status(500).json({ error: "Erro ao buscar notícias." });
  }
}
