const defaultOptions = {
  baseDir: process.cwd(),
  outputDir: process.env.PEJS_BUILD_OUTPUT_DIR || 'public',
  templatesDir: process.env.PEJS_BUILD_TEMPLATES_DIR || 'views/pages',
  templateExtension: process.env.PEJS_BUILD_TEMPLATES_EXT || 'ejs',
};

module.exports = function getConfig(options = {}) {
  const config = {
    ...defaultOptions,
    ...options,
  };

  // TODO: Log options

  return config;
};
