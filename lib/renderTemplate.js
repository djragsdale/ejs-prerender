const debug = require('./debug').extend('renderTemplate');
const ejs = require('ejs');
const fse = require('fs-extra');
const path = require('path');

const getBasePagesDir = require('./getBasePagesDir');

module.exports = async function renderTemplate({ baseDir, pagesDir }, {
  templatePath,
  viewData = {},
} = {}) {
  const basePagesDir = getBasePagesDir({ baseDir, pagesDir });
  debug(`Rendering with base directory "${basePagesDir}"`);

  // TODO: Validate options

  const templateStr = await fse.readFile(`${basePagesDir}/${templatePath}`, 'utf8');
  const templateFn = ejs.compile(templateStr, { views: [basePagesDir] });
  const output = templateFn(viewData);

  return output;
};
