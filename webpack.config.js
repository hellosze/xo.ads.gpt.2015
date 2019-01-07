const path = require('path');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = {
  entry: './xo.ads.gpt.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "eslint-loader"
      },
    ],
  },
  output: {
    filename: 'xo.ads.gpt.mins.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new NodemonPlugin()
  ],
};