import Groq from "groq-sdk";

export default async (req, res) => {
  try {
    const { topic, style = "formal akademik" } = JSON.parse(req.body);

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `
Kamu adalah asisten akademik. Buat kerangka makalah dengan struktur berikut:

1. Judul
2. Latar Belakang
3. Rumusan Masalah
4. Tujuan Penelitian
5. Tinjauan Pustaka
6. Metodologi
7. Pembahasan
8. Kesimpulan
9. Daftar Pustaka (contoh format APA)

Topik: ${topic}
Gaya bahasa: ${style}
Gunakan bahasa Indonesia yang baku dan jelas.
    `;

    const response = await client.chat.completions.create({
      model: "mixtral-8x7b",
      messages: [
        { role: "system", content: "Kamu adalah AI penulis akademik." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
    });

    return res.json({
      success: true,
      output: response.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
