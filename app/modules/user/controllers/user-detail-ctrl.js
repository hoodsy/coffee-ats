'use strict';

angular.module('user')
  .controller('UserDetailCtrl', function ($scope, $rootScope, $stateParams, authService, User) {
    $scope.palette = $stateParams.palette || '1';
    $scope.user = User.get({ id: $stateParams.id });

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
