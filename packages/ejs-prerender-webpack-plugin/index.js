const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getConfig = require('../getConfig');
// const grabPages = require('../grabPages');
const grabPagesSync = require('../grabPagesSync');
const replaceExtension = require('../replaceExtension');

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
      componentsDir,
      outputDir,
      pagesDir,
    } = this.config;
    // this.pages = this.options.pages;

    this.pages = grabPagesSync(this.config);
    console.log('pages', this.pages);


    // const loader = 'ejs-compiled-loader'; // Doesn't work with Webpack 4 😡
    // This loader, like many, only compiles the template but does not render with data.
    // I may need to fork 'ejs-compiled-loader' and upgrade it to work with Webpack 4
    const loader = '@testerum/ejs-compiled-loader-webpack4-nodeps';
    // const loaderOptions = `?views[]=${componentsDir}`;
    const loaderOptions = `?{"ejsOptions":{"views":["${componentsDir}"]}}`;

    this.plugins = this.pages.map((pagePath) => {
      console.log(
        `Instantiating plugin for page "${pagePath}"`,
        path.relative(baseDir, path.join(pagesDir, pagePath)),
        path.relative(baseDir, path.join(outputDir, pagePath)),
        replaceExtension('.ejs', '.html', pagePath),
      );

      // Replace extension and trim leading /
      const desiredFilename = replaceExtension('.ejs', '.html', pagePath.substring(1));
      const fullTemplatePath = `${loader}${loaderOptions}!${path.relative(baseDir, path.join(pagesDir, pagePath))}`;
      // const fullTemplatePath = `${loader}!${path.relative(baseDir, path.join(pagesDir, pagePath))}`;

      console.log(`Loading template of value "${fullTemplatePath}"`);
      // console.log('parseQuery', utils.parseQuery(fullTemplatePath));

      return {
        pagePath,
        plugin: new HtmlWebpackPlugin({
          filename: desiredFilename,
          template: fullTemplatePath,
          inject: true,
          htmlPluginOptions: {
            unnecessary: 'something',
          },
          templateParameters: {
            something: 'whatever',
          },
          options: {
            views: [componentsDir],
          },
        }),
      };
    });

    // this.initialized.then(() => {
    // console.log('initialized done');
    this.plugins.forEach(({
      pagePath,
      plugin
    }) => {
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
