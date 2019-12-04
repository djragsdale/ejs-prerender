const defaultOptions = {
  baseDir: process.env.PEJS_BASE_DIR || process.cwd(),
  outputDir: process.env.PEJS_BUILD_OUTPUT_DIR || 'public',
  componentsDir: process.env.PEJS_BUILD_COMPONENTS_DIR || 'components',
  pagesDir: process.env.PEJS_BUILD_PAGES_DIR || 'pages',
  pageExtension: process.env.PEJS_BUILD_PAGES_EXT || 'ejs',
};

module.exports = function getConfig(options = {}) {
  const config = {
    ...defaultOptions,
    ...options,
  };

  // TODO: Log options

  return config;
};
