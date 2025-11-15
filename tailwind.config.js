/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'satset-blue': '#647DEB',
        'satset-rose': '#C74559',
        'satset-red': '#EA2222',
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration) * 1s) infinite linear",
        "logo-marquee": "logo-marquee 30s linear infinite",
        "logo-marquee-vertical": "logo-marquee-vertical 20s linear infinite",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "logo-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "logo-marquee-vertical": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
    },
  },
  plugins: [],
}