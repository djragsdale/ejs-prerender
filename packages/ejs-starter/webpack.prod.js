const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EjsPrerenderWebpackPlugin = require('ejs-prerender-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/js/index.js',
  output: {
    filename: '[name].[contentHash:20].js',
    path: buildPath,
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // Runs compiled CSS through postcss for vendor prefixing
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[contentHash:20].[ext]',
            limit: 8192,
          },
        }],
        type: 'asset/inline',
      },
      {
        // Load all icons
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new EjsPrerenderWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};
