const glob = require('glob');
const { promisify } = require('util');

const getBaseTemplatesDir = require('./getBaseTemplatesDir');

const globAsync = promisify(glob);

module.exports = async function grabPages({ baseDir, templatesDir, templateExtension }) {
  const baseTemplatesDir = getBaseTemplatesDir({ baseDir, templatesDir });
  const pattern = `${baseTemplatesDir}/**/*.${templateExtension}`;
  const ejsEntryPoints = await globAsync(pattern);

  return ejsEntryPoints
    .map((fullPath) => fullPath.substring(baseTemplatesDir.length));
};
