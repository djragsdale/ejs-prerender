const ejsPrerender = require('./ejsPrerender');
const EjsPrerenderWebpackPlugin = require('./EjsPrerenderWebpackPlugin');
const getConfig = require('./getConfig');
const grabPages = require('./grabPages');
const renderTemplate = require('./renderTemplate');
const writeHtml = require('./writeHtml');

ejsPrerender.EjsPrerenderWebpackPlugin = EjsPrerenderWebpackPlugin;
ejsPrerender.getConfig = getConfig;
ejsPrerender.grabPages = grabPages;
ejsPrerender.renderTemplate = renderTemplate;
ejsPrerender.writeHtml = writeHtml;

module.exports = ejsPrerender;
