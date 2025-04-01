import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        // Poppins: ["var(--font-Poppins"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "staff-White-img": "url(/assets/staffWhite.png)",
        "staff-Dark-img": "url(/assets/staffDark.png)",
      },
      colors: {
        primary: "#23BDEE",
        secondary: "#0F172A",
        warning: "#ef4444",
        success: "#22c55e",
        backgroundGray: "#f1f5f9",
        golden: "#FCB40D",
        lightGreen: "#33EFA0",
        dimDark: "#0B1739",
      },
      screens: {
        xxs: "350px", // Extra extra small screens (mobile devices)
        xs: "480px", // Extra small screens (mobile devices)
        sm: "640px", // Small screens and up
        md: "768px", // Medium screens and up
        lg: "1024px", // Large screens and up
        xl: "1280px", // Extra large screens and up
        xxl: "1536px", // 2X large screens and up
      },
    },
  },
  plugins: [],
};
export default config;
