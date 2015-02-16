'use strict';

var By = require('selenium-webdriver').By;

var abp = require('./basePage');

function FeedPage (webdriver) {
  abp.call(this, webdriver, '/feed');
}

FeedPage.prototype = Object.create(abp.prototype);
FeedPage.prototype.constructor = FeedPage;

FeedPage.prototype.getCards = function() {
  return this.webdriver.findElements(By.css('[data-coffee-card]'));
};

module.exports = FeedPage;
