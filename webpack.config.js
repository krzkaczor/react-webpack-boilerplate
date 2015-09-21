var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var join = require('path').join;

var app = join(__dirname, 'app');
var tmp = join(__dirname, 'tmp');

module.exports = {
  entry: join(app, "app.js"),
  output: {
    path: tmp,
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.css$/, loader: "style!css"},
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        loader: "style!css!less?strictMath&noIeCompat"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: join(app, 'index.html')
    }),
    new webpack.OldWatchingPlugin() //fix for failing watch for all files - needs investigating
  ],
  devServer: {
    contentBase: tmp,
    historyApiFallback: true
  }
}
