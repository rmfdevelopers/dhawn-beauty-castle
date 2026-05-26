import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF1493",
        secondary: "#FADADD",
        accent: "#1A1A1A"
      },
      fontFamily: {
        heading: ["Playfair Display"],
        sans: ["Outfit"]
      }
    }
  }
} satisfies Config;