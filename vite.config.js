import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        // Customize caching strategy here if needed
      },
      manifest: {
        name: "My Vite PWA",
        short_name: "VitePWA",
        description: "A Vite PWA that handles shared links",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon92.png",
            sizes: "92x92",
            type: "image/png",
          },
        ],
        share_target: {
          action: "/share",
          method: "POST",
          enctype: "multipart/form-data",
          params: {
            title: "shared-title",
            text: "shared-text",
            url: "/",
          },
        },
      },
    }),
  ],
});
