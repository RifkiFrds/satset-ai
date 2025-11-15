import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lottie: ["lottie-react"],
          gsap: ["gsap"],
          pdf: ["jspdf", "html2canvas", "docx"],
        },
      },
    },
  },
});
