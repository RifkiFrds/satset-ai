import Replicate from "replicate";

export const handler = async (event) => {
  try {
    const { topic, style = "formal akademik" } = JSON.parse(event.body);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const prompt = `
Anda adalah asisten akademik ahli. Buat kerangka makalah (outline) yang mendetail dengan struktur berikut:

1.  **Judul** (Buat judul yang spesifik dan menarik)
2.  **Latar Belakang** (Jelaskan masalah, konteks, dan urgensi topik)
3.  **Rumusan Masalah** (Poin-poin pertanyaan penelitian)
4.  **Tujuan Penelitian** (Poin-poin tujuan yang ingin dicapai)
5.  **Tinjauan Pustaka** (Sebutkan 3-4 sub-topik teori/penelitian terkait)
6.  **Metodologi Penelitian** (Jelaskan metode yang disarankan)
7.  **Pembahasan** (Buat 3-4 sub-bab utama untuk analisis)
8.  **Kesimpulan & Saran** (Ringkasan temuan dan saran)
9.  **Daftar Pustaka** (Berikan 3 contoh referensi fiktif format APA)

Topik: ${topic}
Gaya bahasa: ${style}
Gunakan bahasa Indonesia yang baku dan jelas.
Berikan jawaban HANYA dalam format Markdown yang rapi.
`;

    // Kita gunakan model Llama 3 8B Instruct dari Meta
    const output = await replicate.run(
      "meta/meta-llama-3-8b-instruct",
      {
        input: {
          prompt: prompt,
          system_prompt: "Kamu adalah AI penulis akademik yang ahli dalam membuat kerangka makalah.",
          temperature: 0.6,
        }
      }
    );

    // Replicate mengembalikan array, kita gabungkan
    const markdownOutput = output.join("");

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        output: markdownOutput,
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