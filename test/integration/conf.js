// conf.js
exports.config = {
  directConnect: true,
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  framework: 'mocha',
  capabilities: {
    browserName: 'chrome'
  }
}
