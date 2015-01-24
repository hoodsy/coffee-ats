'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function ($scope, $stateParams, UserMatch, MatchMessages) {
    UserMatch.get({ id: $stateParams.id }, function(response) {
      $scope.match = response;
    });
    MatchMessages.query(function(response) {
      $scope.matchMessages = response;
    });
  });
