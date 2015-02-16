'use strict';

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var MockSessionPage = require('./mockSessionPage');
var FeedPage = require('./feedPage');


describe('Get mock session and open feed', function() {

  // need to pass browser.driver since this is a non-angular page
  var msp = new MockSessionPage(browser.driver);
  msp.open();
  var fp = new FeedPage(browser);

  beforeEach(function() {
    fp.open();
  });

  it('should have a title', function() {
    expect(fp.getTitle()).to.eventually.equal('Coffee');
  });

  it('should have coffee cards', function() {
    fp.getCards(function(cards) {
      expect(cards.length).to.be.at.least(1);
    })
  })
});
