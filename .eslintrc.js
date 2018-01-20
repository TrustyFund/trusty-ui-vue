module.exports = {
 root: true,
 parserOptions: {
  parser: 'babel-eslint',
  sourceType: 'module'
 },
 env: {
   browser: true,
 },
 plugins: [
   'html',
   'import',
   'testcafe'
 ],
 extends: 'airbnb-base',
 rules: {
   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
   'comma-dangle': 0,
   'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
   'no-console': 0,
   'max-len': [2, 80, 2],
   'import/prefer-default-export': 0,
   'arrow-parens': ['error', 'always'],
   'no-param-reassign': [2, { 'props': false }],
   'arrow-body-style': 0,
   'import/extensions': 0,
   'import/no-unresolved': 0,
   'prefer-template': 0
 }
};