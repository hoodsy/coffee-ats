'use strict';

angular.module('shell', [
  'common',
  'auth',
  'feed',
  'user',
  'opportunity',
  'messaging',
  'ui.router',
  'angular-carousel'
]).config(function($httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  function prependTransform(transform) {
    var defaults = $httpProvider.defaults.transformRequest;
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    defaults.unshift(transform);
  }

  prependTransform(function(value) {
    if (value && value._id) {
      value = jQuery.extend({}, value);
      delete value._id;
      console.log('transformed');
    }
    return value;
  });

});
