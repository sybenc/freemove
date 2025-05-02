import { defineConfig } from "vite";
import { resolve } from 'path';
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "static",
    minify: true,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: "Ruler",
      formats: ['es', 'umd'],
      fileName: (format) => `ruler.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          Ruler: "Ruler",
        },
      },
    },
  },
  plugins: [
    dts({
      outputDir: "static",
      rollupTypes: true,
    })
  ],
});