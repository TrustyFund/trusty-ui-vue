'use strict'
const pkg = require('../package')

module.exports = {
  title: 'trusty-vue',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: 'localhost',
    port: 4000
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/',
  cssModules: false,
  jsx: true,

  // postcss: function(){
  //   return [
  //     require( `postcss-use` )(
  //       {
  //         modules: [
  //           'postcss-autoreset',
  //           'postcss-initial'
  //         ]
  //       }
  //     ),
  //     require('postcss-import')({
  //       path: path.resolve('./client'),
  //       addDependencyTo: webpack
  //     }),
  //     require("postcss-url")(),
  //     require('postcss-nested')(),
  //     require('postcss-comment/hookRequire')(),
  //     require('postcss-discard-comments')(),
  //     require('postcss-short')(),
  //     require('precss')(),
  //     require('postcss-color-function')(),
  //     require('postcss-flexbugs-fixes')(),
  //     require('autoprefixer')({
  //       // Vue does not support ie 8 and below
  //       browsers: ['last 2 versions', 'ie > 8']
  //     })

  //   ]

  // },
  
}
