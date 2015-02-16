'use strict';

var abp = require('./basePage');

function LoginPage (webdriver) {
  abp.call(this, webdriver, '/login');
}

LoginPage.prototype = Object.create(abp.prototype);
LoginPage.prototype.constructor = LoginPage;

module.exports = LoginPage;
