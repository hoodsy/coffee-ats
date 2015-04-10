'use strict';

angular.module('auth')
  .factory('authService', function ($rootScope, $resource, $state, $location, socket, apiUrl, userHelper) {
    var authResource = $resource(apiUrl('/auth'));
    var logoutResource = $resource(apiUrl('/auth/logout'));

    return {
      auth: function() {
        $rootScope._user = null;
        $rootScope.authenticating = true;

        var redirect = $location.url() || '/feed';

        return authResource.get().$promise
          .then(function(response) {
            $rootScope.authenticating = false;

            // User is not yet authenticated
            if (response.status === 401 ||
                response.authenticated === false ||
                response.user === undefined) {

              if (!/login$/.test($location.url())) {
                $location.url('/login');
              }
            } else {
              // User is authenticated
              $rootScope._user = response.user;
              socket.init();

              // Check if user is setup
              userHelper.checkNeedsSetup($rootScope._user);

              $location.url(redirect);
            }
          })
          .catch(function(err) {
            console.log(err);
            $rootScope.authenticating = false;
          });
      },

      logout: function() {
        logoutResource.save(function() {
          $rootScope._user = null;
          $state.go('shell.login');
        }, function(err) {
          console.log('ERROR:', err);
        });
      }
    };
  });
