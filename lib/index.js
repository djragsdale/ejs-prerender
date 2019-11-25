const ejsPrerender = require('./ejsPrerender');
const getConfig = require('./getConfig');
const grabPages = require('./grabPages');
const renderTemplate = require('./renderTemplate');
const writeHtml = require('./writeHtml');

ejsPrerender.getConfig = getConfig;
ejsPrerender.grabPages = grabPages;
ejsPrerender.renderTemplate = renderTemplate;
ejsPrerender.writeHtml = writeHtml;

module.exports = ejsPrerender;
