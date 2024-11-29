import { defineConfig } from "vite";
import path, { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["lib"], exclude: ["**/*.stories.ts", "**/*.test.tsx"] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib/shadcn"),
      "@lib": path.resolve(__dirname, "./lib"),
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    reportCompressedSize: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es"],
      name: "rbc-design-system",
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      input: Object.fromEntries(
        glob
          .sync("lib/**/*.{ts,tsx}")
          .map((file) => [
            relative("lib", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true,
  },
});
