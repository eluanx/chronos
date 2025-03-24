/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './*.html',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--text)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--text)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--text)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "var(--text)",
        },
        muted: {
          DEFAULT: "var(--background-light)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--text)",
        },
        card: {
          DEFAULT: "var(--background-light)",
          foreground: "var(--text)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
