module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: "airbnb-base",
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    strict: ["error", "global"],
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: true,
    }],
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        mocha: true,
        node: true,
      },
    },
  ],
  "plugins": [
    "html",
  ]
};
