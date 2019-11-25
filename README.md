# ejs-prerender

## Usage

This package is typically used as a devDependency. Install by running `npm i -D ejs-prerender`. It can be used as an npm script like the following:

```
"build:templates": "ejs-prerender",
```

and run manually using `npx`:

```
npx ejs-prerender
```

This package utilizes the debug library, so adding `DEBUG=*` to a `.env` file or the command path (`DEBUG=* npx ejs-prerender`) will enable logging of everything.≈

## Configuration

### Environment Variables

| Option        | Environment Variable      | Type   | Default                   | Description                                          |
| ------------- | ------------------------- | ------ | ------------------------- | ---------------------------------------------------- |
| baseDir       | PEJS_BASE_DIR             | String | current working directory | Base directory to reference for other relative paths |
| outputDir     | PEJS_BUILD_OUTPUT_DIR     | String | 'public'                  | Where the completed pages get written                |
| componentsDir | PEJS_BUILD_COMPONENTS_DIR | String | 'components'              | Where components live                                |
| pagesDir      | PEJS_BUILD_PAGES_DIR      | String | 'pages'                   | Where pages live                                     |
| pageExtension | PEJS_BUILD_PAGES_EXT      | String | 'ejs'                     | File extension of pages                              |
