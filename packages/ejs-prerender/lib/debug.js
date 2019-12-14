const debug = require('debug');

module.exports = (subname) => debug(`ejs-prerender:${subname}`);