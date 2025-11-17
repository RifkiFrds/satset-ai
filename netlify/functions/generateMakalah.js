import Replicate from "replicate";

export const handler = async (event) => {
  try {
    // --- Menambahkan 'citationFormat' ---
    const { topic, style = "formal akademik", citationFormat = "APA" } = JSON.parse(event.body);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    // --- Prompt utama  ---
    const prompt = `
Anda adalah SATSET AI, asisten akademik ahli. Buat DRAF AWAL makalah yang mendetail dengan struktur berikut.
Tuliskan 1-2 paragraf untuk setiap bagian utama (Abstrak, Latar Belakang, Tinjauan Pustaka, Metodologi, Pembahasan, Kesimpulan).

Struktur Wajib:

1.  **Judul** (Buat judul yang spesifik, menarik, dan profesional)
2.  **Abstrak** (Tuliskan draf abstrak singkat 1 paragraf: mencakup tujuan, metode, temuan utama, dan kesimpulan)
3.  **Latar Belakang** (Tuliskan draf 1-2 paragraf yang menjelaskan masalah, konteks, data/fakta pendukung, dan urgensi topik)
4.  **Rumusan Masalah** (Buat 3-4 poin pertanyaan penelitian yang spesifik)
5.  **Tujuan Penelitian** (Buat 3-4 poin tujuan yang selaras dengan rumusan masalah)
6.  **Tinjauan Pustaka** (Sebutkan 3-4 sub-topik teori/penelitian terkait. Untuk setiap sub-topik, berikan 1 paragraf singkat yang merangkum teori/penelitian tersebut)
7.  **Metodologi Penelitian** (Tuliskan draf 1-2 paragraf yang menjelaskan metode yang disarankan, pendekatan, dan teknik pengumpulan data)
8.  **Pembahasan** (Buat 3-4 sub-bab utama untuk analisis. Untuk setiap sub-bab, jelaskan poin analisis utamanya dalam 1 paragraf)
9.  **Kesimpulan & Saran** (Tuliskan draf 1 paragraf ringkasan temuan dan 1 paragraf saran untuk penelitian selanjutnya)
10. **Daftar Pustaka** (Berikan 3-5 contoh referensi fiktif format ${citationFormat} yang relevan dengan topik)

Topik: ${topic}
Gaya bahasa: ${style}

Instruksi Penting:
- Gunakan bahasa Indonesia ${style} yang baku, jelas, dan profesional.
- Lakukan proofreading otomatis untuk tata bahasa dan ejaan.
- Berikan jawaban HANYA dalam format Markdown yang rapi dan terstruktur.
`;

    // --- System prompt dibuat lebih tegas ---
    const system_prompt = `Anda adalah SATSET AI, asisten penulis akademik profesional. Anda ahli dalam menstrukturkan ide, menggunakan bahasa Indonesia formal yang baku, dan melakukan proofreading tata bahasa serta tone secara otomatis. Anda akan menghasilkan draf makalah, bukan hanya outline.`;

    // Kita gunakan model Llama 3 8B Instruct dari Meta
    const output = await replicate.run(
      "meta/meta-llama-3-8b-instruct",
      {
        input: {
          prompt: prompt,
          system_prompt: system_prompt,
          temperature: 0.6,
          max_new_tokens: 2048, 
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