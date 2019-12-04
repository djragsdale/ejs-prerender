const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getConfig = require('../getConfig');
// const grabPages = require('../grabPages');
const grabPagesSync = require('../grabPagesSync');

class EjsPrerenderWebpackPlugin {
  constructor(options = {}) {
    console.log('Constructing EjsPrerenderWebpackPlugin plugin');
    this.options = options;
    console.log('Completing constructor');
  }

  apply(compiler) {
    console.log('Applying EjsPrerenderWebpackPlugin plugin');
    console.log('compiler.context', compiler.context);

    console.log('Initializing with options', this.options);
    this.config = getConfig({
      baseDir: compiler.context, // Align webpack base with package baseDir
      ...this.options,
    });
    const {
      baseDir,
      outputDir,
      pagesDir,
    } = this.config;
    this.pages = this.options.pages;

    // this.pages = grabPagesSync(this.config);
    // console.log('pages', this.pages);

    this.plugins = this.pages.map((pagePath) => {
      console.log(
        `Instantiating plugin for page "${pagePath}"`,
        path.relative(baseDir, path.join(pagesDir, pagePath)),
        path.relative(baseDir, path.join(outputDir, pagePath)),
      );

      return {
        pagePath,
        plugin: new HtmlWebpackPlugin({
          filename: pagePath,
          template: path.relative(baseDir, path.join(outputDir, pagePath)),
          inject: true,
        }),
      };
    });

    // this.initialized.then(() => {
      // console.log('initialized done');
      this.plugins.forEach(({ pagePath, plugin }) => {
        console.log(`Applying plugin array for page "${pagePath}"`);
        plugin.apply(compiler);
      })
    // }).catch((err) => {
    //   console.error('EjsPrerenderWebpackPlugin error: ', err);
    // });
    // compiler.hooks.make.tapAsync('EjsPrerenderWebpackPlugin', (compilation, callback) => {
    //   console.log('makehook');
    // });
    // compiler.hooks.emit.tapAsync('EjsPrerenderWebpackPlugin', (compilation, callback) => {
    //   console.log('emit hook');
    // });
  }
}

module.exports = EjsPrerenderWebpackPlugin;
