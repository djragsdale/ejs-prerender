const ejs = require('ejs');
const fse = require('fs-extra');
const path = require('path');

const getBaseTemplatesDir = require('./getBaseTemplatesDir');

module.exports = async function renderTemplate({ baseDir, templatesDir }, {
  templatePath,
  viewData = {},
} = {}) {
  const baseTemplatesDir = getBaseTemplatesDir({ baseDir, templatesDir });

  // TODO: Validate options

  const templateStr = await fse.readFile(`${baseTemplatesDir}/${templatePath}`, 'utf8');
  const templateFn = ejs.compile(templateStr, { views: [path.join(__dirname, '../../views')] });
  const output = templateFn(viewData);

  return output;
};
