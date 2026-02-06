/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,.25)",
        glow: "0 0 40px rgba(56,189,248,.18)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(1200px 600px at 20% 10%, rgba(56,189,248,.20), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(34,197,94,.12), transparent 60%), radial-gradient(900px 700px at 50% 90%, rgba(168,85,247,.14), transparent 60%)",
      },
      keyframes: {
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};
