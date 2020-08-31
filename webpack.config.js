require('dotenv').config();
const path = require('path');

const { PORT } = process.env;

module.exports = {
  entry: path.join(__dirname, '/client/src/index.js'),
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    port: PORT,
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};