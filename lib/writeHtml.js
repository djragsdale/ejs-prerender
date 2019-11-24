const fse = require('fs-extra');

module.exports = async function writeHtml({ baseDir, outputDir }, {
  content = '',
  pagePath = 'index.html',
} = {}) {
  // TODO: Validate options

  const fullPath = `${baseDir}/${outputDir}${pagePath}`;

  await fse.outputFile(fullPath, content, 'utf8');
};
