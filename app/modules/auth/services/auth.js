'use strict';

angular.module('auth')
  .factory('authService', function ($rootScope, $resource, $state) {

    var authResource = $resource('/api/auth');

    return function() {
      authResource.get(function(response) {
          if (response.status === 401 ||
              response.authenticated === false ||
              response.user === undefined) {
            $state.go('login');
          } else {
            $rootScope._user = response.user;
          }
      });
    };
  });
