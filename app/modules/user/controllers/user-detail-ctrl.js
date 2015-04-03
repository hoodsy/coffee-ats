'use strict';

angular.module('user')
  .controller('UserDetailCtrl', function ($scope, $rootScope, $stateParams, authService, User) {
    $scope.palette = $stateParams.palette || '1';
    User.get({ id: $stateParams.id }, function(response) {
      $scope.user = response;
      if ($rootScope._user._id === response._id) {
        _.assign($rootScope._user, response);
      }
    }, function(err) {
      console.log('ERROR', err);
    });

    // Only logged in user may edit their own profile
    $scope.isEditable = function() {
      if ($rootScope._user && $scope.user) {
        return ($rootScope._user._id === $scope.user._id);
      }
    };

    $scope.logout = function() {
      authService.logout();
    };
  });
