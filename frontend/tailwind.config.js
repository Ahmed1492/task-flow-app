export const darkMode = "class";
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    keyframes: {
      shrink: { "0%": { width: "100%" }, "100%": { width: "0%" } },
      fadeUp: {
        from: { opacity: "0", transform: "translateY(16px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      shrink: "shrink 3s linear forwards",
      fadeUp: "fadeUp 0.35s ease both",
    },
  },
};
export const plugins = [];
