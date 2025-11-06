import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Pastikan ini mengarah ke folder 'app'
  ],
  theme: {
    extend: {},
  },
  darkMode: false,
  plugins: [], // Tambahkan ini
};
export default config;
