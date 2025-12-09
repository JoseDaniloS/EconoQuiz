import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      // Necessário para testar no modo DEV
      devOptions: {
        enabled: true,
      },

      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],

      manifest: {
        name: "EconoQuiz",
        short_name: "ODS 8 Game",
        description:
          "Jogo educativo sobre o ODS 8: Trabalho Decente e Crescimento Econômico",

        theme_color: "#A21942",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],

  build: {
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true,
  },
});
