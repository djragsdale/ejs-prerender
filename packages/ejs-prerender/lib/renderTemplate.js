const debug = require('./debug')('renderTemplate');
const ejs = require('ejs');
const fse = require('fs-extra');
const path = require('path');

const getBaseComponentsDir = require('./getBaseComponentsDir');
const getBasePagesDir = require('./getBasePagesDir');

module.exports = async function renderTemplate({ baseDir, componentsDir, pagesDir }, {
  templatePath,
  viewData = {},
} = {}) {
  const baseComponentsDir = getBaseComponentsDir({ baseDir, componentsDir });
  const basePagesDir = getBasePagesDir({ baseDir, pagesDir });
  debug(`Rendering with base directory "${basePagesDir}"`);
  debug(`Using components directory "${baseComponentsDir}"`);

  // TODO: Validate options

  const templateStr = await fse.readFile(`${basePagesDir}/${templatePath}`, 'utf8');
  const templateFn = ejs.compile(templateStr, { views: [baseComponentsDir] });
  const output = templateFn(viewData);

  return output;
};
