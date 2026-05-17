import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Vercel sets VERCEL=1 during build and runtime. Cloudflare uses wrangler deploy instead.
const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  plugins: [
    ...(isVercel
      ? [nitro({ preset: "vercel" })]
      : [cloudflare({ viteEnvironment: { name: "ssr" } })]),
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(
      isVercel
        ? {}
        : {
            // Custom SSR entry for Cloudflare Workers (see wrangler.jsonc main).
            server: { entry: "server" },
          },
    ),
    react(),
  ],
});
