module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'amd': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'eqeqeq': ['error', 'always'],
    'no-multi-spaces': 'error',
    'no-empty': 0,
		// allow space-before-function-paren
		'space-before-function-paren': ['error', 'always'], // 函数[匿名函数]名 括号
		'semi': ['error', 'never'], // 无分号
		'quotes': ['error', 'single'] // 单引号
  }
}
