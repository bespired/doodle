module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
  ],
  rules: {
      "vue/no-unused-vars"       : "off",
      "vue/no-unused-components" : "off",
      "vue/no-async-in-computed-properties" :"off",
      "vue/no-side-effects-in-computed-properties" :"off",

      "no-restricted-syntax"     : "off",
      "no-prototype-builtins"    : "off",

      "guard-for-in"             : "off",
      "no-useless-escape"        : "off",
      "no-mixed-operators"       : "off",
      "prefer-destructuring"     : "off",
      "no-bitwise"               : "off",
      "no-multi-assign"          : "off",
      "no-unused-vars"           : "off",
      "no-undef"                 : "off",
      "no-tabs"                  : "off",
      "indent"                   : "off",
      "no-multi-spaces"          : "off",
      "key-spacing"              : "off",
      "max-len"                  : "off",
      "no-plusplus"              : "off",
      "no-param-reassign"        : "off",
      "no-mixed-spaces-and-tabs" : "off",
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
