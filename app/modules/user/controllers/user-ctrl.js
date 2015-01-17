'use strict';

angular.module('user')
  .controller('UserCtrl', function ($scope, $stateParams, User) {
    $scope.palette = $stateParams.palette || '1';
    $scope.user = User.get({ id: $scope._user.id });
  });
