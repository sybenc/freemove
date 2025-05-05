import { defineConfig } from "vite";
import { resolve } from 'path';
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "dist",
    minify: true,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: "FreeMove",
      formats: ['es', 'umd'],
      fileName: (format) => `freemove.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          FreeMove: "FreeMove",
        },
      },
    },
  },
  plugins: [
    dts({
      outputDir: "types",
      rollupTypes: true,
    })
  ],
});