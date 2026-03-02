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
        sans: ["var(--font-lato)", "sans-serif"],
      },
      colors: {
        "primary-accent": "#ff0aef",
        "primary-brand": "#ff0a70",
        "primary-text": "#d2d2d2",
        "primary-white": "#ededed",
        "primary-black": "#121212",
        background: "#060B18",
      },
    },
  },
  plugins: [],
} satisfies Config;