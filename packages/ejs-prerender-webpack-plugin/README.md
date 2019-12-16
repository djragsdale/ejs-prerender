# ejs-prerender-webpack-plugin

## Basis

This webpack plugin is based on the [ejs-prerender](https://github.com/djragsdale/ejs-prerender/tree/master/packages/ejs-prerender) package. See that for more information on configuration options and goals.

## Usage

If using default options, simply add the plugin instance to your webpack config's plugins array.

```javascript
module.exports = {
  plugins: [
    new EjsPrerenderWebpackPlugin(),
  ],
};
```

The following options can be passed into the plugin using an options object:

```javascript
{
  baseDir: process.cwd(), // Base directory to resolve relative paths from
  componentsDir: 'components', // Directory to use for partials
  pagesDir: 'pages', // Directory to use for page structure
}
```

For an example of the plugin being used, look at the [ejs-starter](https://github.com/djragsdale/ejs-prerender/tree/master/packages/ejs-starter) repository.