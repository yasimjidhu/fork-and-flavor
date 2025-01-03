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
        'primary': ['"Bree Serif"', 'serif'],  
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        smoke: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        smoke: 'smoke 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
