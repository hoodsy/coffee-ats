'use strict';

angular.module('auth')
  .factory('authService', function ($rootScope, $resource, $state, $location) {

    var authResource = $resource('/api/auth');

    return function() {
      $rootScope.authenticating = true;

      var redirect = $location.url() || '/feed';
      $state.go('login');

      authResource.get(function(response) {
          $rootScope.authenticating = false;
          if (response.status === 401 ||
              response.authenticated === false ||
              response.user === undefined) {
            $state.go('login');
          } else {
            $rootScope._user = response.user;
            $location.url(redirect);
          }
      }, function(err) {
        console.log(err);
        $rootScope.authenticating = false;
      });
    };
  });
