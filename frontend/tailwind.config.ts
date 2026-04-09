import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdfbf7",
          100: "#f8f3e6",
          200: "#f1e5cc",
          300: "#e9d4a8",
          400: "#e0c07d",
          500: "#d4af37", // Gold
          600: "#b59124",
          700: "#8e7019",
          800: "#755a1a",
          900: "#634c1b",
          950: "#392a0c",
        },
        background: {
          light: "#FDFBF7", // Pearl White
          dark: "#0A0A0A", // Deep Black
        },
        surface: {
          light: "#FFFFFF",
          dark: "#121212",
        },
        text: {
          main: {
            light: "#0A0A0A",
            dark: "#FDFBF7",
          },
          muted: {
            light: "#6B7280",
            dark: "#9CA3AF",
          }
        },
        gold: "#D4AF37",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        serif: ["Noto Serif Display", "serif"],
        sans: ["Manrope", "sans-serif"],
        accent: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        gold: "0 4px 14px 0 rgba(212, 175, 55, 0.25)",
        "gold-glow": "0 0 20px rgba(212, 175, 55, 0.4)",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
} satisfies Config;
