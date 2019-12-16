# ejs-prerender-loader

## Basis

This webpack plugin is based on the [ejs-prerender](https://github.com/djragsdale/ejs-prerender/tree/master/packages/ejs-prerender) package. See that for more information on configuration options and goals. This Webpack loader was specifically created for use by [ejs-prerender-webpack-plugin](https://github.com/djragsdale/ejs-prerender/tree/master/packages/ejs-prerender-webpack-plugin).

## Usage

While most other [EJS](https://ejs.co/) Webpack loaders are for client implementations, the goal of this loader is for pre-rendering. This means it acts like a template engine for a web server, allowing full usage of `<%- include('my-partial', { data: 'my data' }) -%>` for passing data to dynamic partials. While it is designed for use by the aforementioned Webpack plugin, it can be used separately by including it in your Webpack config's module rules.

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [{
          loader: 'ejs-prerender-loader',
        }],
      },
    ]
  }
};
```

For a full example of the plugin being used, look at the [ejs-starter](https://github.com/djragsdale/ejs-prerender/tree/master/packages/ejs-starter) repository.