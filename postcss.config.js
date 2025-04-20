import postcssModules from "postcss-modules";

const NodeClassPrefix = "__freemove";

export default {
  plugins: [
    postcssModules({
      generateScopedName: (name, filename, css) => {
        return `${NodeClassPrefix}-${name}`;
      },
    }),
  ],
};
