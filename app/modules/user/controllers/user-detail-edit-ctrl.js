'use strict';

angular.module('user')
  .controller('UserDetailEditCtrl', function ($scope, $rootScope, $stateParams, User) {
    $scope.palette = $stateParams.palette || '1';
    $scope.user = User.get({ id: $stateParams.id });

    // Only logged in user may edit their own profile
    $scope.isEditable = function() {
      if ($rootScope._user && $scope.user) {
        return $rootScope._user.id === $scope.user.id;
      }
    };
  });
