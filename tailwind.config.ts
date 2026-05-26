import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCE4EC",
        secondary: "#D81B60",
        accent: "#2D0C1E"
      },
      fontFamily: {
        heading: ["Playfair Display"],
        sans: ["Outfit"]
      }
    }
  }
} satisfies Config;