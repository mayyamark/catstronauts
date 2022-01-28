module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    "no-empty-function": "off",
    "no-undef": "error",
  },
};
