<div align="center">
  <img src="https://satset-ai.netlify.app/images/logo.png" alt="Satset AI Logo" width="100" />
  <h1>Satset AI</h1>
  <p><strong>AI-powered tools designed to boost student productivity.</strong></p>
  <p>
    Suite alat AI untuk men-support workflow akademik Anda.<br />
    Dibangun dengan React, Netlify Functions, dan Replicate.
  </p>
  <br />
  <a href="https://satset-ai.netlify.app/">
    <img src="http://img.shields.io/netlify/e6d5a4e0-dee1-4261-833e-2f47f509c68f?style=plastic&logo=netlify" alt="Netlify Deploy"></img>
  </a>
</div>

---

# Satset AI

Satset AI adalah open-source web app yang dibuat untuk men-streamline tugas-tugas akademik.  
Lupakan writer's block atau menghabiskan waktu berjam-jam membaca jurnal.  
Proyek ini menyediakan toolset yang cepat dan tajam untuk membantu Anda menulis, me-review, dan melakukan riset.

<div align="center">

➡️ <strong>Lihat Live Demo</strong>  
<br>

<img 
  src="https://files.imagetourl.net/uploads/1763400144043-3ead11c7-574e-4d39-ab7f-c19f5a779b72.png" 
  alt="Screenshot Satset AI" 
  width="400"
/>

</div>

---

## ✨ Core Features

Aplikasi ini dibangun dengan tiga fitur utama:

### 🤖 AI Chatbot  
Asisten general-purpose untuk brainstorming, debugging, atau tanya-jawab cepat.  

**Model yang tersedia:**
- **GPT-4.1 (OpenAI)**
- **Claude 3.7 Sonnet (Anthropic)**
- **Granite 3.3 (IBM)**
- **Mistral 7B (MistralAI)**

**Model default digunakan aplikasi:**  
**Granite 3.3 (IBM)**

### 📄 Jurnal Review AI
Masukkan teks jurnal dan dapatkan respons JSON terstruktur berisi:
- summary  
- critical review  
- methodology  
- key highlights  

Sempurna untuk analisis cepat.

### 📝 AI Makalah Generator
Mulai tulisan Anda. Masukkan:
- topik  
- writing style  
- format sitasi (APA, MLA, IEEE)  

Lalu dapatkan draft makalah lengkap: abstract, pendahuluan, hingga literature review.  
**Model:** `meta/meta-llama-3-8b-instruct`.

---

## 🧩 Built With (Tech Stack)

| Kategori             | Teknologi |
|----------------------|-----------|
| **Frontend**         | React (Vite), Tailwind CSS, Framer Motion |
| **Backend**          | Netlify Functions (Serverless) |
| **AI Model Hosting** | Replicate API |
| **State Management** | Zustand |
| **Deployment**       | Netlify |

---

## 📁 Project Structure

Repo ini mengikuti struktur standar Vite + React, dengan dua area utama:  
serverless backend (`netlify/`) dan React frontend (`src/`).

```
├── netlify/
│ └── functions/ # Logika serverless backend (API endpoints)
│ ├── chat.js
│ ├── generateMakalah.js
│ └── reviewJurnal.js
│
├── public/ # Aset statis (gambar, font, dll.)
│
├── src/ # Source code React
│ ├── components/
│ │ ├── features/ # Modul feature-sliced (self-contained)
│ │ │ ├── chat-bot-ai/
│ │ │ ├── review-jurnal-ai/
│ │ │ └── template-makalah/
│ │ ├── home/ # Komponen khusus homepage
│ │ ├── ui/ # Komponen UI atomik
│ │ └── ... # Shared component (Navbar, Footer)
│ │
│ ├── hooks/ # Custom hooks (deprecated)
│ ├── lib/ # Utility (DocxGenerator.js)
│ ├── layouts/ # Layout wrapper
│ ├── pages/ # Halaman top-level
│ ├── routes/ # React Router config
│ ├── store/ # Zustand global state
│ └── main.jsx # Entry point aplikasi
│
├── .env.example
├── package.json
└── tailwind.config.js
```

---

## ▶️ Running Locally

1. Clone repo:
git clone https://github.com/YOUR_USERNAME/satset-ai.git
cd satset-ai

2. Install dependencies:
npm install

3. Set .env:
REPLICATE_API_KEY=r8_...
REPLICATE_API_TOKEN=r8_...

4. Jalankan Netlify:
npm install -g netlify-cli
netlify dev

---

## 👥 Contributors

**Are Welcome.**

---

