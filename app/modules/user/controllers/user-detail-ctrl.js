'use strict';

angular.module('user')
  .controller('UserDetailCtrl', function ($scope, $stateParams, User) {
    $scope.palette = $stateParams.palette || '1';
    $scope.user = User.get({ id: $scope._user.id });
  });
