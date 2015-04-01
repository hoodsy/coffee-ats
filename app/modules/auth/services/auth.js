'use strict';

angular.module('auth')
  .factory('authService', function ($rootScope, $resource, $state, $location, socket) {

    var authResource = $resource('/api/auth');
    var logoutResource = $resource('/api/auth/logout');

    return {
      auth: function() {
        $rootScope.authenticating = true;

        var redirect = $location.url() || '/feed';
        $state.go('login');

        authResource.get(function(response) {
            $rootScope.authenticating = false;

            // User is not yet authenticated
            if (response.status === 401 ||
                response.authenticated === false ||
                response.user === undefined) {
              $state.go('login');

            } else {
              // User is authenticated
              $rootScope._user = response.user;
              socket.init();
              $location.url(redirect);
            }
        }, function(err) {
          console.log(err);
          $rootScope.authenticating = false;
        });
      },

      logout: function() {
        logoutResource.save(function() {
          $state.go('login');
        }, function(err) {
          console.log('ERROR:', err);
        });
      }
    };
  });
