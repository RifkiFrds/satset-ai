export async function reviewJurnal(inputText) {
  try {
    const res = await fetch("/.netlify/functions/reviewJurnal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputText }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Gagal memproses permintaan.");
    }
    
    return data.data; // Mengembalikan objek JSON: { metode_penelitian, ... }

  } catch (err) {
    console.error("Error reviewing jurnal:", err);
    return {
      error: "⚠️ Maaf, server sedang bermasalah. Coba lagi sebentar ya."
    };
  }
}