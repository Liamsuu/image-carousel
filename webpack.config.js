const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  experiments: {
    outputModule: true,
  },

  output: {
    filename: "image-carousel.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: {
      type: "module",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ["url-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true, // keep function names
        },
      }),
    ],
  },
};
