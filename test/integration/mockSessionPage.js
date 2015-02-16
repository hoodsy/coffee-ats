'use strict';

var abp = require('./basePage');

function MockSessionPage (webdriver) {
  abp.call(this, webdriver, 'http://localhost:3000/auth/mockSession');
}

MockSessionPage.prototype = Object.create(abp.prototype);
MockSessionPage.prototype.constructor = MockSessionPage;

module.exports = MockSessionPage;
