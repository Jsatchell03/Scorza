/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./screens/**/*.{ts,tsx}",
    "./navigation/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#fd4902",
        "primary-soft": "#fff1ea",
        dark: "#143355",
        "dark-soft": "#e9eef5",
        background: "#fdfcfb",
        muted: "#8a94a6",
        hairline: "#eef0f3",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
