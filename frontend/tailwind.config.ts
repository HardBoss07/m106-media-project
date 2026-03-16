import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        "bg0": "#04060b",
        "bg1": "#080d18",
        "bg2": "#0d1422",
        "bg3": "#121b2d",
        "bg4": "#1a2640",
        "line": "#22304a",
        "line2": "#2e4062",
        "text": "#f5f8ff",
        "text2": "#b7c1d6",
        "text3": "#7f8aa3",
        "red": "#ff108a",
      },
    },
  },
  plugins: [],
} satisfies Config;