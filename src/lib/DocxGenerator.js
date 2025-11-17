import { Document, Packer, Paragraph, HeadingLevel, AlignmentType, convertInchesToTwip } from "docx";
import { saveAs } from "file-saver";

export function generateDocx(topic, markdownContent) {
  
  // Regex untuk mendeteksi heading
  const heading1Regex = /^\d+\.\s.*\*$/; // Cth: 1. **Latar Belakang**
  const heading2Regex = /^\d\.\d\s.*\*$/; // Cth: 5.1 **Teori A**
  const boldOnlyRegex = /^\*\*(.*)\*\*$/; // Cth: **Judul**

  const children = [];

  // Split konten berdasarkan baris baru
  const lines = markdownContent.split('\n');

  lines.forEach(line => {
    let paragraph;
    line = line.trim(); // Hapus spasi

    // Hapus tanda **
    const cleanLine = line.replace(/\*\*/g, '');

    if (line.match(heading1Regex)) {
      // Ini adalah Heading 1
      paragraph = new Paragraph({
        text: cleanLine.replace(/^\d+\.\s*/, ''), // Hapus "1. "
        style: "heading1",
      });
    } else if (line.match(heading2Regex)) {
      // Ini adalah Heading 2
      paragraph = new Paragraph({
        text: cleanLine.replace(/^\d\.\d\s*/, ''), // Hapus "5.1 "
        style: "heading2",
      });
    } else if (line.match(boldOnlyRegex) && line.length < 100) {
      // Ini mungkin Judul atau sub-judul non-numerik
       paragraph = new Paragraph({
        text: cleanLine,
        style: "heading1", // Perlakukan sebagai Heading 1
      });
    } else if (line.length > 0) {
      // Ini adalah paragraf biasa
      paragraph = new Paragraph({
        text: cleanLine,
        style: "normal",
      });
    } else {
      // Ini adalah baris kosong, beri spasi
      paragraph = new Paragraph({ text: "", style: "normal" });
    }
    
    children.push(paragraph);
  });

  const doc = new Document({
    // IMPROVEMENT: Menambah styles (font, size, spacing)
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 24 }, // 12pt
        },
      },
      paragraphStyles: [
        {
          id: "normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          run: { font: "Calibri", size: 24 }, // 12pt
          paragraph: {
            spacing: { after: 120 }, // 6pt spacing after
          },
        },
        {
          id: "heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: { size: 32, bold: true }, // 16pt
          paragraph: {
            spacing: { before: 240, after: 120 }, // 12pt before, 6pt after
          },
        },
        {
          id: "heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: { size: 28, bold: true }, // 14pt
          paragraph: {
            spacing: { before: 200, after: 100 },
          },
        },
      ],
    },
    sections: [{
      // margin halaman (1 inci)
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
          },
        },
      },
      children: [
        // Judul Utama di
         new Paragraph({
          text: topic,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({ text: "" }), // Spasi
        ...children
      ],
    }],
  });

  Packer.toBlob(doc).then(blob => {
    console.log("Blob DOCX berhasil dibuat, memicu download...");
    saveAs(blob, `Draf Makalah - ${topic}.docx`);
  }).catch(err => {
    console.error("Gagal membuat file docx:", err);
  });
}