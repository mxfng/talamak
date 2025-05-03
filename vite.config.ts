/// <reference types="vitest" />

import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, Plugin } from "vite";

// Custom plugin to pre-render YAML data
const preloadYamlPlugin = (): Plugin => {
  return {
    name: "preload-yaml",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        try {
          const yamlContent = fs.readFileSync(
            "public/config/linktree.yaml",
            "utf-8",
          );
          const parsedData = yaml.load(yamlContent);
          const dataScript = `<script>window.__PRELOADED_CONFIG__ = ${JSON.stringify(parsedData)}</script>`;
          return html.replace("</head>", `${dataScript}</head>`);
        } catch (error) {
          console.error("Failed to preload YAML:", error);
          return html;
        }
      },
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadYamlPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
