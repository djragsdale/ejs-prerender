const debug = require('./debug')('base');
const getConfig = require('./getConfig');
const grabPages = require('./grabPages');
const renderTemplate = require('./renderTemplate');
const replaceExtension = require('./replaceExtension');
const writeHtml = require('./writeHtml');

const pkg = require('../package.json');

const STATUSES = {
  RENDERING: 'is being rendered...',
  WRITING: 'is being written to file...',
  COMPLETE: 'has been written!',
};

module.exports = async function ejsPrerender(options = {}) {
  debug(`Using ejs-prerender@${pkg.version}`);
  const config = getConfig(options);

  const viewData = {};
  const statuses = {};

  const getStatusMessage = (pagePath) => `page "${pagePath}" ${statuses[pagePath]}`;

  const pages = await grabPages(config);
  const writePromises = pages
    .map((pagePath) => async function pageFn() {
      debug(`Rendering page "${pagePath}"`);
      statuses[pagePath] = STATUSES.RENDERING;
      const html = await renderTemplate(config, {
        templatePath: pagePath,
        viewData,
      });
      statuses[pagePath] = STATUSES.WRITING;
      debug(`Writing page "${pagePath}"`);
      await writeHtml(config, {
        pagePath: replaceExtension('.ejs', '.html', pagePath),
        content: html,
      });
      debug(`"${pagePath}" written.`);
      statuses[pagePath] = STATUSES.COMPLETE;
    });

  await Promise.all(writePromises.map((fn) => fn()));

  pages.forEach((page) => console.log(getStatusMessage(page)));

  debug('Render finished!');
};
