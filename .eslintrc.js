// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, {"max": 100}],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    "no-trailing-spaces": 0,
    //解决“Expected indentation of 2 spaces but found 4”
    "indent": ["off", 2],
    //解决：“is defined but never used eslint”
    "no-unused-vars":"off",
    //解决：'Newline required at end of file but not found eol-last'
    "eol-last": 0,
    //解决： Infix operators must be spaced
    "space-infix-ops": 0,
    "space-before-function-paren": 0,
    //解决： Expected space or tab after '//' in comment
    "spaced-comment": 0
  }
}
