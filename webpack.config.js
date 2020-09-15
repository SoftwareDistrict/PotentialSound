require("dotenv").config();
const HTMLWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const path = require("path");

const { PORT } = process.env;

module.exports = {
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
  plugins: [
    new FaviconsWebpackPlugin(path.join(__dirname, "/client/dist/favicon.png"))
  ],
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
