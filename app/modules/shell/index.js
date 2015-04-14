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

      // Delete all keys that start with underscore (_)
      Object.keys(value).forEach(function(key) {
        if (key.charAt(0) === '_') {
          delete value[key];
        }
      });
    }
    return value;
  });

}).run(function($rootScope, $state, userHelper, authService) {

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {

      var loginState = 'shell.login';
      if (!$rootScope._user
          && !$rootScope.authenticating
          && toState.name !== loginState) {
        return $state.go(loginState, {}, { reload: true });
      }

      var setupRoute = 'shell.user.detail.setup';
      var tutorialRoute = 'shell.tutorial';
      var redirectList = [setupRoute, tutorialRoute];

      if ($rootScope._user && redirectList.indexOf(toState.name) === -1) {

        // If user is not yet setup, redirect
        if ($rootScope._user._isSetup === false) {
          event.preventDefault();
          return $state.go(setupRoute, { id: $rootScope._user._id });
        }

        // If user is not yet done tutorial, redirect
        if (!$rootScope._user.tutorialCompleted) {
          event.preventDefault();
          return $state.go(tutorialRoute);
        }
      }
    });
});
