const { compile } = require('nexe')

compile({
  input: './bin/www',
  build: true, //required to use patches
  // patches: [
  //   async (compiler, next) => {
  //     await compiler.setFileContentsAsync(
  //       'lib/new-native-module.js',
  //       'module.exports = 42'
  //     )
  //     return next()
  //   }
  // ]
})
.then(() => {
  console.log('success')
})
.catch(console.error)