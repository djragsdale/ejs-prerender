const ejsPrerender = require('./ejsPrerender');
const getBaseComponentsDir = require('./getBaseComponentsDir');
const getConfig = require('./getConfig');
const grabPages = require('./grabPages');
const grabPagesSync = require('./grabPagesSync');
const renderTemplate = require('./renderTemplate');
const replaceExtension = require('./replaceExtension');
const writeHtml = require('./writeHtml');

ejsPrerender.getBaseComponentsDir = getBaseComponentsDir;
ejsPrerender.getConfig = getConfig;
ejsPrerender.grabPages = grabPages;
ejsPrerender.grabPagesSync = grabPagesSync;
ejsPrerender.renderTemplate = renderTemplate;
ejsPrerender.replaceExtension = replaceExtension;
ejsPrerender.writeHtml = writeHtml;

module.exports = ejsPrerender;
