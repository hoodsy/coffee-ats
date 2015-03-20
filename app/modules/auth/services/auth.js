'use strict';

angular.module('auth')
  .factory('authService', function ($rootScope, $resource, $state) {

    var authResource = $resource('/api/auth');

    return function() {
      $rootScope.authenticating = true;
      authResource.get(function(response) {
          $rootScope.authenticating = false;
          if (response.status === 401 ||
              response.authenticated === false ||
              response.user === undefined) {
            $state.go('login');
          } else {
            $rootScope._user = response.user;
            $state.go('shell.feed');
          }
      }, function(err) {
        console.log(err);
        $rootScope.authenticating = false;
      });
    };
  });
