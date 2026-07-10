import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // static prerendering — no server runtime needed
      prerender: {
        crawlLinks: true, // discover routes by crawling links from entry pages
      },
      pages: [
        { path: "/" }, // list any routes not reachable via crawling
      ],
    }),
    viteReact(),
  ],
});