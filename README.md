# ejs-prerender

## Configuration

### Environment Variables

| Option        | Environment Variable      | Type   | Default                   | Description                                          |
| ------------- | ------------------------- | ------ | ------------------------- | ---------------------------------------------------- |
| baseDir       | PEJS_BASE_DIR             | String | current working directory | Base directory to reference for other relative paths |
| outputDir     | PEJS_BUILD_OUTPUT_DIR     | String | 'public'                  | Where the completed pages get written                |
| componentsDir | PEJS_BUILD_COMPONENTS_DIR | String | 'components'              | Where components live                                |
| pagesDir      | PEJS_BUILD_PAGES_DIR      | String | 'pages'                   | Where pages live                                     |
| pageExtension | PEJS_BUILD_PAGES_EXT      | String | 'ejs'                     | File extension of pages                              |
