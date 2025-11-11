export async function generateMakalah(topic, style) {
  try {
    const res = await fetch("/.netlify/functions/generateMakalah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, style }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Gagal memproses permintaan.");
    }
    
    return data.output; // Mengembalikan string Markdown

  } catch (err) {
    console.error("Error generating makalah:", err);
    return "⚠️ Maaf, server sedang bermasalah. Coba lagi sebentar ya.";
  }
}
