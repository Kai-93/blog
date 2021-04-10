/*
 * @Author: Kaiser
 * @Date: 2020-03-26 14:54:44
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-28 20:50:23
 * @Description: webpack 配置文件
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ['css-loader', 'postcss-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.png/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ie8: true,
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ],
};
