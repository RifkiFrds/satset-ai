import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

/**
 * Membuat file .docx dari teks Markdown sederhana (hanya judul dan paragraf)
 * @param {string} topic - Judul dokumen
 * @param {string} markdownContent - Konten dari AI
 */
export function generateDocx(topic, markdownContent) {
  const children = [
    new Paragraph({
      text: topic,
      heading: HeadingLevel.TITLE,
    }),
    new Paragraph({ text: "" }), // Spasi
  ];

  // Split konten berdasarkan baris baru
  const lines = markdownContent.split('\n');

  lines.forEach(line => {
    let paragraph;
    line = line.trim(); // Hapus spasi

    if (line.startsWith("9. Daftar Pustaka")) {
      // Judul Daftar Pustaka
      paragraph = new Paragraph({
        text: line.replace("9. ", ""),
        heading: HeadingLevel.HEADING_1,
      });
    } else if (line.match(/^\d+\..+/)) {
      // Cek apakah ini Heading 1 (cth: "1. Latar Belakang")
      paragraph = new Paragraph({
        text: line.replace(/^\d+\.\s*/, ''), // Hapus "1. "
        heading: HeadingLevel.HEADING_1,
      });
    } else if (line.match(/^\d\.\d/)) {
      // Cek apakah ini Heading 2 (cth: "5.1 Teori A")
      paragraph = new Paragraph({
        text: line.replace(/^\d\.\d\s*/, ''), // Hapus "5.1 "
        heading: HeadingLevel.HEADING_2,
      });
    } else if (line.length > 0) {
      // Ini adalah paragraf biasa
      paragraph = new Paragraph({
        text: line,
      });
    } else {
      // Ini adalah baris kosong, beri spasi
      paragraph = new Paragraph({ text: "" });
    }
    
    children.push(paragraph);
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
    }],
  });

  Packer.toBlob(doc).then(blob => {
    console.log("Blob DOCX berhasil dibuat, memicu download...");
    saveAs(blob, `Kerangka Makalah - ${topic}.docx`);
  }).catch(err => {
    console.error("Gagal membuat file docx:", err);
  });
}