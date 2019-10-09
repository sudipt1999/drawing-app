import babel from "rollup-plugin-babel";

export default {
  input: "./scripts/main.js",
  output: {
    dir: "./dist",
    format: "iife",
    sourcemap: "inline"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ]
};
