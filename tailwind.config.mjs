/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#fdfdfd",
        "light-accent": "#1072fa",
        "off-black": "#0B1215",
      },
      keyframes: {
        Flash: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "flash": "Flash 1s linear infinite",
      },
    },
  },
  plugins: [],
};
