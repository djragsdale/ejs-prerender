const EjsPrerenderWebpackPlugin = require('ejs-prerender-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: './src/js/index.js',
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
    },
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
        test: /\.(scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: 'style-loader',
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
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
          // Please note we are not running postcss here
        ],
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // On development we want to see where the file is coming from, hence we preserve the
            // [path]
            name: '[path][name].[ext]?hash=[contentHash:20]',
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
  ],
};
