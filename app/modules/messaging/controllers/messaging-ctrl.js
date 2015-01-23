'use strict';

angular.module('messaging')
  .controller('MessagingCtrl', function ($scope, UserMatch) {
    UserMatch.query(function(response) {
      $scope.matches = response;

      // Iterate through the matches and assign the proper palette

      var opportunityCount = 0;
      var userCount = 0;

      $scope.matches.forEach(function(match) {
        if (match.matchedOpportunities.length > 0) {
          opportunityCount = (opportunityCount + 1) % 3;
          match._palette = opportunityCount;
          match._paletteClass = 'opportunity-match-card';
        } else {
          userCount = (userCount + 1) % 5;
          match._palette = userCount;
          match._paletteClass = 'user-match-card';
        }
      });
    });
  });
