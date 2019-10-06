module.exports = {
  // env: {
  //   browser: true,
  //   es6: true
  // },
  // // "extends": "eslint:recommended",
  // globals: {
  //   Atomics: "readonly",
  //   SharedArrayBuffer: "readonly"
  // },
  // parserOptions: {
  //   ecmaVersion: 2018
  // },

  rules: {
    'prettier/prettier': ['error'],
    'no-underscore-dangle': 'off'
  },
  plugins: ['prettier'],
  extends: ['airbnb', 'prettier']
  //   extends: "airbnb-base"
};
