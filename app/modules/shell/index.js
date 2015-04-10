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
    }
    return value;
  });

}).run(function($rootScope, $state, userHelper) {

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {

      // If user is not yet setup, redirect him to setup pages
      if ($rootScope._user &&
          $rootScope._user._isSetup === false &&
          toState.name !== 'shell.user.detail.setup') {
        event.preventDefault();
        $state.go('shell.user.detail.setup', {
          id: $rootScope._user._id
        }, { reload: true });
      }
    });
});
