'use strict';

angular.module('auth')
  .factory('authService', function ($rootScope, $resource, $state, $location, socket, apiUrl, userHelper) {
    var authResource = $resource(apiUrl('/auth'));
    var logoutResource = $resource(apiUrl('/auth/logout'));

    return {
      auth: function() {
        if ($rootScope._user) {
          return;
        }

        $rootScope._user = null;
        $rootScope.authenticating = true;

        var redirect = $location.url() || '/feed';
        if (/login$/.test($location.url())) {
          // If user is already logged in, don't redirect to login page
          redirect = '/feed';
        }

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
              var user = $rootScope._user = response.user;
              socket.init();

              // Check if user is setup
              userHelper.checkNeedsSetup(user);

              // If not setup, direct user to setup process
              if (user._isSetup === false) {
                return $state.go('shell.user.detail.setup', { id: $rootScope._user._id });
              }

              // If tutorial not completed, direct user to it
              if (!user.tutorialCompleted) {
                return $state.go('shell.tutorial');
              }

              // Direct user to his original destination
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
