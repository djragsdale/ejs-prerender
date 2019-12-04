const debug = require('./debug').extend('grabPages');
const glob = require('glob');
const { promisify } = require('util');

const getBasePagesDir = require('./getBasePagesDir');

const globAsync = promisify(glob);

module.exports = async function grabPages({ baseDir, pagesDir, pageExtension }) {
  const basePagesDir = getBasePagesDir({ baseDir, pagesDir });
  debug(`Using base pages directory "${basePagesDir}"`);

  const pattern = `${basePagesDir}/**/*.${pageExtension}`;
  const ejsEntryPoints = await globAsync(pattern);

  return ejsEntryPoints
    .map((fullPath) => fullPath.substring(basePagesDir.length));
};
