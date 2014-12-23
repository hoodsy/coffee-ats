'use strict';

angular.module('user')
  .controller('UserCtrl', function ($scope, $stateParams, User) {
    $scope.user = User.get({ id: $stateParams.id });
  });