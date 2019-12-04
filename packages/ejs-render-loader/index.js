const ejs = require('ejs');
const utils = require('loader-utils');
const merge = require('merge');
const path = require('path');

module.exports = function (source) {
  this.cacheable && this.cacheable();

  const options = merge({
    compileOptions: {},
    templateOptions: {}, // Do I need this?
  }, utils.getOptions(this));
  options.client = true;

  console.log('compileOptions', options.compileOptions);
  console.log('templateOptions', options.templateOptions);

  // Use filenames relative to working dir, which should be project root
  options.filename = path.relative(process.cwd(), this.resourcePath);

  const template = ejs.compile(source, options.compileOptions);
  console.log('template fn in loader', template.toString());

  return 'module.exports = ' + template;
};