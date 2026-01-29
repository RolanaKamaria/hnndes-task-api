/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fc",
        surface: "#ffffff",
        surface2: "#f0f2f9",

        foreground: "#1f2a44",
        muted: "#64748b",
        muted2: "#94a3b8",

        primary: "#6366f1",
        primaryHover: "#4f46e5",
        primaryLight: "#818cf8",

        accent: "#8b5cf6",
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",

        border: "#e2e8f0",

        glass: "rgba(255, 255, 255, 0.45)",
      },

      backdropBlur: {
        xs: "2px",
        sm: "8px",
        md: "12px",
      },

      boxShadow: {
        soft: "0 4px 30px rgba(0, 0, 0, 0.06)",
        glass: "0 8px 32px rgba(31, 38, 68, 0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
