require("dotenv").config();
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const { PORT } = process.env;

module.exports = {
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "/client/dist/index.html"),
      favicon: path.join(__dirname, "/client/dist/favicon.png"),
    }),
  ],
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    inline: true,
    port: PORT,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
