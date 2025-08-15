import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "animate-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "animate-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px) scale(0.95)",
          },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out forwards",
        "fade-out": "fade-out 200ms ease-in forwards",
        "animate-in": "animate-in 200ms ease-out forwards",
        "animate-out": "animate-out 200ms ease-in forwards",
        "slide-in-left": "slide-in-left 300ms ease-out forwards",
        "slide-in-right": "slide-in-right 300ms ease-out forwards",
        "slide-in-top": "slide-in-top 300ms ease-out forwards",
        "slide-in-bottom": "slide-in-bottom 300ms ease-out forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-slide-in": (value) => {
            return {
              animation: `${value} 300ms ease-out forwards`,
            };
          },
        },
        {
          value: {
            left: "slide-in-left",
            right: "slide-in-right",
            top: "slide-in-top",
            bottom: "slide-in-bottom",
          },
        }
      );
    }),
  ],
};
