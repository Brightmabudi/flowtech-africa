import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-instrument-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-cabinet-grotesk)", ...defaultTheme.fontFamily.sans],
        mono:    ["var(--font-jetbrains-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Slate Gray — neutral / secondary text (kept for existing /dashboard usage)
        slate: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },

        // Brand purple — #5B35D5 base at 600
        brand: {
          50:  "#F5F2FE",
          100: "#EBE3FD",
          200: "#D6C9FB",
          300: "#B79CF6",
          400: "#9470EE",
          500: "#7550E3",
          600: "#5B35D5",
          700: "#4A2AB0",
          800: "#2D1580",
          900: "#1F0F5C",
          950: "#120836",
        },

        // Accent orange — #E8401A base at 500
        accent: {
          50:  "#FFF3EF",
          100: "#FFE1D6",
          200: "#FFC0AC",
          300: "#FF9776",
          400: "#F3672F",
          500: "#E8401A",
          600: "#C7330F",
          700: "#A3280C",
          800: "#7E1F09",
          900: "#5C1607",
          950: "#3A0D04",
        },

        // Ink — text/background neutrals lifted from the marketing site's existing hex usage
        ink: {
          50:  "#F8F5FF",
          100: "#F0EDF8",
          400: "#6B5F8A",
          500: "#4A3F6B",
          700: "#2D1A4A",
          950: "#0D0720",
        },
      },
      borderRadius: {
        control: "12px",
        card:    "20px",
        panel:   "28px",
      },
      boxShadow: {
        'brand-sm': "0 2px 16px rgba(91,53,213,0.06)",
        'brand-md': "0 8px 32px rgba(91,53,213,0.12)",
        'brand-lg': "0 20px 48px rgba(91,53,213,0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
