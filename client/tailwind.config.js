/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: {
            light: "#f9a8d4", // optional lighter pink
            DEFAULT: "#db2777", // magenta base
            dark: "#be185d"    // darker magenta
          },
          yellow: {
            light: "#fde68a",
            DEFAULT: "#facc15", // bright yellow
            dark: "#ca8a04"
          },
          black: "#111827" // deep gray-black
        }
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)"
      }
    },
  },
  plugins: [],
}
