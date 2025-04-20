// postcss.config.js
import postcssModules from "postcss-modules";

export default {
  plugins: [
    postcssModules({
      generateScopedName: (name, filename, css) => {
        return `__freemove-${name}`;
      },
    }),
  ],
};
