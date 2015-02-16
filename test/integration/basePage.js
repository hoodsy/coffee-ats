'use strict';

function AbstractBasePage(webdriver, baseurl) {
  this.webdriver = webdriver;
  this.absurl = 'http://localhost:8080/shell.html';

  if (/^http/.test(baseurl)) {
    this.absurl = baseurl;
  } else {
    this.absurl = [this.absurl, '#/', baseurl].join('');
  }
};

AbstractBasePage.prototype.open = function() {
  this.webdriver.get(this.absurl);
  return this;
};

AbstractBasePage.prototype.getTitle = function() {
  return this.webdriver.getTitle();
};

module.exports = AbstractBasePage;
