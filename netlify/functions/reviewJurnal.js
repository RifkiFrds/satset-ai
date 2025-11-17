import Replicate from "replicate";

export const handler = async (event) => {
  try {
    const { inputText } = JSON.parse(event.body);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    // system prompt
    const prompt = `
Anda adalah SATSET AI — asisten akademik yang ahli menganalisis jurnal ilmiah menggunakan NLP modern.

Tugas:
Analisis teks ilmiah berikut dan ekstrak informasi berdasarkan struktur yang diwajibkan.

Teks:
"""
${inputText}
"""

Format jawaban:
- WAJIB JSON valid
- TANPA teks tambahan
- TANPA markdown
- TANPA kalimat pembuka/penutup
- Hanya berisi objek JSON murni

Struktur JSON WAJIB:

{
  "summary": "Ringkasan utama jurnal dalam 3–6 kalimat.",
  "critical_review": "Analisis kekuatan dan kelemahan metodologi serta potensi bias riset.",
  "highlights": ["Kalimat penting 1", "Kalimat penting 2", "Kalimat penting 3"],
  "trend_insight": "Insight tren penelitian atau keyword penting yang dapat diambil dari teks.",
  "metode_penelitian": "Metode penelitian jika disebutkan.",
  "hasil_utama": "Temuan utama yang dapat diekstraksi.",
  "kesimpulan": "Kesimpulan jurnal berdasarkan teks."
}

Pastikan JSON valid tanpa tanda backtick.
`;

    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt,
          system_prompt:
            "Anda adalah asisten analisis jurnal yang disiplin dan HANYA mengembalikan JSON valid.",
          temperature: 0.2,
        },
      }
    );

    // Bersihkan output
    const jsonString = output
      .join("")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(jsonString);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: parsed,
      }),
    };
  } catch (err) {
    console.error("❌ ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Gagal menganalisis jurnal. Coba ulangi.",
      }),
    };
  }
};
