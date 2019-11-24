#!/usr/bin/env node

const {
  getConfig,
  grabPages,
  renderTemplate,
  writeHtml,
} = require('../lib');

const STATUSES = {
  RENDERING: 'is being rendered...',
  WRITING: 'is being written to file...',
  COMPLETE: 'has been written!',
};

const main = async function main() {
  const config = getConfig();

  const viewData = {};
  const statuses = {};

  const getStatusMessage = (pagePath) => `page "${pagePath}" ${statuses[pagePath]}`;
  const replaceExtension = (oldExtension, newExtension, path) => `${path.substring(0, path.length - oldExtension.length)}${newExtension}`;

  const pages = await grabPages(config);
  const writePromises = pages
    .map((pagePath) => async function pageFn() {
      statuses[pagePath] = STATUSES.RENDERING;
      const html = await renderTemplate(config, {
        templatePath: pagePath,
        viewData
      });
      statuses[pagePath] = STATUSES.WRITING;
      await writeHtml(config, {
        pagePath: replaceExtension('.ejs', '.html', pagePath),
        content: html
      });
      statuses[pagePath] = STATUSES.COMPLETE;
    });

  await Promise.all(writePromises.map((fn) => fn()));

  pages.forEach((page) => console.log(getStatusMessage(page)));

  console.log('Render finished!');
};
main();
