/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "mycarflix-black": "var(--color-text)",
        "mycarflix-white": "var(--color-text-light)",
        "mycarflix-grey":"var(--color-text-grey)",
        primary: "var(--color-primary)",
        "primary-bg": "var(--color-primary-bg)",
        "body-bg": "var(--color-body-background)",
        background: "var(--color-background)",
        "background-off": "var(--color-background-off)",
      },
    },
  },
  plugins: [],
};
