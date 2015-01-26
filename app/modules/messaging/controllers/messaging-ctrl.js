'use strict';

angular.module('messaging')
  .controller('MessagingCtrl', function ($scope, $modal, UserMatch, Incident) {

    $scope.detailShow = -1;

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


    $scope.toggleDetail = function(index) {
      if ($scope.detailShow === index) {
        $scope.detailShow = -1;
      } else {
        $scope.detailShow = index;
      }
    };

    $scope.showDetail = function(index) {
      return ($scope.detailShow === index);
    };

    // Launch Report model
    $scope.report = function(userId) {
      var modalInstance = $modal.open({
        templateUrl: 'modules/messaging/partials/report-modal.html',
        size: 'sm'
      });

      // Handle affirmative
      modalInstance.result.then(function() {
        Incident.save({ userId: userId }, function() {
          modalInstance.dismiss();
        }, function() {
          console.log('Implement me');
          modalInstance.dismiss();
        });
      });
    };
  });
