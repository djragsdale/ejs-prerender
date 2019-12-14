const debug = require('./debug')('grabPages');
const glob = require('glob');

const getBasePagesDir = require('./getBasePagesDir');

module.exports = function grabPagesSync({ baseDir, pagesDir, pageExtension }) {
  const basePagesDir = getBasePagesDir({ baseDir, pagesDir });
  debug(`Using base pages directory "${basePagesDir}"`);

  const pattern = `${basePagesDir}/**/*.${pageExtension}`;
  const ejsEntryPoints = glob.sync(pattern);

  return ejsEntryPoints
    .map((fullPath) => fullPath.substring(basePagesDir.length));
};
