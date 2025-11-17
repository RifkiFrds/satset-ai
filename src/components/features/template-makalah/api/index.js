export async function generateMakalah({ topic, style, citationFormat }) {
  try {
    const res = await fetch("/.netlify/functions/generateMakalah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, style, citationFormat }), 
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Gagal memproses permintaan.");
    }
    
    return data.output; // Mengembalikan string Markdown

  } catch (err) {
    console.error("Error generating makalah:", err);
    // Melempar error agar hook bisa menangkapnya
    throw new Error(err.message || "Maaf, server sedang bermasalah. Coba lagi sebentar ya.");
  }
}