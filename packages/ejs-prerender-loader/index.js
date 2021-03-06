const ejs = require('ejs');
const ejsPrerender = require('ejs-prerender');
const utils = require('loader-utils');
const merge = require('merge');

const {
  getBaseComponentsDir,
  getConfig,
} = ejsPrerender;

module.exports = function (source) {
  this.cacheable && this.cacheable();

  const config = getConfig();
  const baseComponentsDir = getBaseComponentsDir(config);

  const defaultOptions = {
    views: [baseComponentsDir],
  };

  const options = merge(defaultOptions, utils.getOptions(this));
  // options.client = true; // Removes the include() function in favor of a callback

  const filename = utils.getRemainingRequest(this).replace(/^!/, "");
  // Use filenames relative to working dir, which should be project root
  // options.filename = path.relative(process.cwd(), this.resourcePath);
  options.filename = filename;

  // Most plugins return this template function. I can't do that because the internal referenced
  // are no longer in closure.
  const template = ejs.compile(source, options);

  // Go ahead and invoke template function while it has closure.
  const renderedTemplate = template();

  // Create my own template function to return the rendered html.
  // I may need to do something to protect backticks being used in the .ejs.
  const templateFn = new Function(`return \`${renderedTemplate}\``);

  return 'module.exports = ' + templateFn;
};