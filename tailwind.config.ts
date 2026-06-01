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
        sans: ["var(--font-geist-sans)", "Inter", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // FlowTech Navy — primary brand color (#0A192F base at 900)
        navy: {
          50:  "#EDF1F7",
          100: "#D2DCE9",
          200: "#A8BDD3",
          300: "#7D9EBD",
          400: "#527FA7",
          500: "#346291",
          600: "#264B75",
          700: "#1A3459",
          800: "#0F1E3C",
          900: "#0A192F",
          950: "#060F1C",
        },

        // Vaal Electric Blue — accent color (#00D2FF base at 500)
        electric: {
          50:  "#E0FAFF",
          100: "#B3F3FF",
          200: "#80EBFF",
          300: "#4DE3FF",
          400: "#1ADAFF",
          500: "#00D2FF",
          600: "#00A8CC",
          700: "#007E99",
          800: "#005466",
          900: "#002A33",
        },

        // Slate Gray — neutral / secondary text
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

        // Semantic shortcuts
        primary: "#0A192F",
        accent:  "#00D2FF",
      },
    },
  },
  plugins: [],
};
export default config;
