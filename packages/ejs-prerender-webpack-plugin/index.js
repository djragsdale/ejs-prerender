const ejsPrerender = require('ejs-prerender');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const pkg = require('./package.json');

const {
  getConfig,
  grabPagesSync,
  replaceExtension,
} = ejsPrerender;

// const getConfig = require('../getConfig');
// const grabPages = require('../grabPages');
// const grabPagesSync = require('../grabPagesSync');
// const replaceExtension = require('../replaceExtension');

class EjsPrerenderWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    this.config = getConfig({
      baseDir: compiler.context, // Align webpack base with package baseDir
      ...this.options,
    });
    const {
      baseDir,
      componentsDir,
      outputDir,
      pagesDir,
    } = this.config;
    // this.pages = this.options.pages;

    this.pages = grabPagesSync(this.config);


    // const loader = 'ejs-compiled-loader'; // Doesn't work with Webpack 4 😡
    // This loader, like many, only compiles the template but does not render with data.
    // Since I want both include functions (for data passing) and rendered templates, I created my
    // my own loader.
    const loader = 'ejs-prerender-loader';
    const loaderOptions = `?{"templateOptions":{"views":["${componentsDir}"]}}`;

    this.plugins = this.pages.map((pagePath) => {
      // Replace extension and trim leading /
      const desiredFilename = replaceExtension('.ejs', '.html', pagePath.substring(1));
      const fullTemplatePath = `${loader}${loaderOptions}!${path.relative(baseDir, path.join(pagesDir, pagePath))}`;

      return {
        pagePath,
        plugin: new HtmlWebpackPlugin({
          filename: desiredFilename,
          template: fullTemplatePath,
          inject: true,
        }),
      };
    });

    this.plugins.forEach(({
      plugin
    }) => {
      plugin.apply(compiler);
    });
  }
}

module.exports = EjsPrerenderWebpackPlugin;
