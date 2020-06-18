const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Log
console.log('-- entry:');
console.log(' - '+ path.resolve(__dirname, './public/index.js'));

module.exports = {
  entry: path.resolve(__dirname, './public/index.js'),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        loaders: [
          "style-loader",
          "css-loader?modules=true"
        ]
      }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, './public/index.html')})
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    port: 1917
  }
}