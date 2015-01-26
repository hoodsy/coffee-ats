'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function ($scope, $stateParams, UserMatch, MatchMessages, User) {

    $scope.palette = 1;

    UserMatch.get({ id: $stateParams.id }, function(response) {
      $scope.match = response;

      $scope.user = User.get({id: $scope.match.matchedUserId });

    });
    MatchMessages.query(function(response) {
      $scope.matchMessages = response;
    });
  });
