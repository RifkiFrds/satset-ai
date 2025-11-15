import Replicate from "replicate";

export const handler = async (event) => {
  try {
    const { inputText } = JSON.parse(event.body);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const prompt = `
Analisis teks ilmiah berikut. Ekstrak poin-poin kunci.
Teks: """
${inputText}
"""

Berikan jawaban HANYA dalam format JSON yang valid, tanpa teks penjelasan apa pun di luar blok JSON.
Struktur JSON yang WAJIB digunakan:
{
  "metode_penelitian": "...",
  "hasil_utama": "...",
  "kesimpulan": "..."
}
`;

    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt: prompt,
          system_prompt: "Anda adalah asisten peneliti AI yang ahli dalam ekstraksi data. Anda hanya membalas dengan format JSON yang valid.",
          temperature: 0.2,
        }
      }
    );

    // Menggabungkan array output dan membersihkan jika ada markdown
    const jsonString = output.join("").replace(/```json/g, "").replace(/```/g, "").trim();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: JSON.parse(jsonString), // Parse string JSON
      }),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};