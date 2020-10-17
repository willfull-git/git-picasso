const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Log
console.log('-- entry:');
console.log(' - '+ path.resolve(__dirname, './public/index.js'));

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[name]_[local]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, './dist/index.html')})
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 1917
  }
}
