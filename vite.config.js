// vite.config.js
import { defineConfig } from "vite";
import { resolve } from 'path'
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "dist",
    minify: false,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: "createFreeMove",
      formats: ['es', 'umd'], // ES模块 & 浏览器全局
      fileName: (format)=>`freemove.${format}.js`,
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
  plugins: [dts()],
});
