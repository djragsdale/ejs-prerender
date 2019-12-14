const ejs = require('ejs');
const ejsPrerender = require('ejs-prerender');
const utils = require('loader-utils');
const merge = require('merge');
const path = require('path');

const pkg = require('./package.json');

const {
  getBaseComponentsDir,
  getConfig,
} = ejsPrerender;

module.exports = function (source) {
  console.log(`Invoking ejs-render-loader@${pkg.version}`, Object.keys(ejsPrerender));
  // console.log('ejs-render-loader source', source);
  this.cacheable && this.cacheable();

  const config = getConfig();
  // console.log('ejs-render-loader config', config);
  const baseComponentsDir = getBaseComponentsDir(config);
  // console.log('ejs-render-loader baseComponentsDir', baseComponentsDir);

  const options = merge({
    // Default options here
    views: [baseComponentsDir],
  }, utils.getOptions(this));
  // options.client = true; // Messes with the include function

  // console.log('ejs-render-loader options', options);

  const filename = loaderUtils.getRemainingRequest(this).replace(/^!/, "");
  // Use filenames relative to working dir, which should be project root
  // options.filename = path.relative(process.cwd(), this.resourcePath);
  options.filename = filename;

  const template = ejs.compile(source, options);
  console.log('template fn in loader', template.toString());

  return 'module.exports = ' + template;
};