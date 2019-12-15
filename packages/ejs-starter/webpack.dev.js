// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EjsPrerenderWebpackPlugin } = require('ejs-prerender');
const path = require('path');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/js/index.js',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
  },
  node: {
    fs: 'empty',
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
            options: {
              sourceMap: true,
            },
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
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
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
            // On development we want to see where the file is coming from, hence we preserve the [path]
            name: '[path][name].[ext]?hash=[hash:20]',
            limit: 8192,
          },
        }],
      },
      {
        // Load all icons
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: [{
          loader: 'file-loader',
        }],
      },
    ],
  },
  plugins: [
    // // Can I map the EJS templates over an array of pages and get an array of HtmlWebpackPlugins?
    // ...[
    //   'index.html',
    //   'about/index.html',
    // ]
    //   .map((template) => new HtmlWebpackPlugin({
    //     filename: template,
    //     template: `public/${template}`,
    //     inject: true,
    //   })),
    new EjsPrerenderWebpackPlugin(),
  ],
};
