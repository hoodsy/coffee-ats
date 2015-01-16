'use strict';

angular.module('user')
  .controller('UserCtrl', function ($scope, $stateParams, $cookies, User) {
    $scope.user = User.get({ id: $scope._user.id });
  });
