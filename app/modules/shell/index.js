'use strict';

angular.module('shell', [
  'common',
  'auth',
  'feed',
  'user',
  'opportunity',
  'messaging',
  'ui.router'
]).config(function($httpProvider) {

  function prependTransform(transform) {
    var defaults = $httpProvider.defaults.transformRequest;
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    defaults.unshift(transform);
  }

  prependTransform(function(value) {
    if (value && value._id) {
      var value = jQuery.extend({}, value);
      delete value._id;
      console.log('transformed');
    }
    return value;
  });

}).run(function(authService) {
  authService.auth();
});
