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
        typing:{
          from:{width:"0"},
          to:{width:"100%"} 
        },
        'fade-in':{
          from:{opacity:'0'},
          to:{opacity:'1'}
        },
        'slide-in':{
          from:{transform:'translateX(100%)',opacity:'0'},
          to:{transform:'translateX(0)',opacity:'1'}
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' }, // Adjust color as needed
        },
      },
      animation: {
        smoke: 'smoke 2s ease-in-out infinite',
        typing:'typing 3s steps(30) forwards, blink 0.5s step-end infinite alternate',
        'fade-in':'fade-in 1.5s ease-in-out forwards',
        'slide-in':'slide-in 1s ease-in-out forwards'
      },
    },
  },
  plugins: [],
} satisfies Config;
