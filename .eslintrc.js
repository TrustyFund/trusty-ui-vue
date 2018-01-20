module.exports = {
 root: true,
 parser: 'babel-eslint',
 parserOptions: {
   sourceType: 'module'
 },
 env: {
   browser: true,
 },
 plugins: [
   'html',
   'testcafe'
 ],
 extends: 'airbnb-base',
 rules: {
   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
   'comma-dangle': 0,
   'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
   'no-console': 0
 }
};