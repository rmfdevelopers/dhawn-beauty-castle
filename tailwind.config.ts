import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { 
    extend: {
      colors: { 
        primary: "#FADADD", 
        secondary: "#FC0FC0", 
        accent: "#2D1A1E" 
      },
      fontFamily: { 
        heading: ["Playfair Display"], 
        sans: ["Outfit"] 
      }
    }
  }
} satisfies Config;