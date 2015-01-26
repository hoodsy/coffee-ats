'use strict';

angular.module('messaging')
  .controller('MessagingCtrl', function ($scope, $modal, UserMatch, Incident) {

    // Flag to activate match controls
    $scope.canShowControls = -1;

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

    $scope.toggleControls = function(index) {
      if ($scope.canShowControls === index) {
        $scope.canShowControls = -1;
      } else {
        $scope.canShowControls = index;
      }
    };

    $scope.showControls = function(index) {
      return ($scope.canShowControls === index);
    };

    // Launch Report model
    $scope.report = function(userId) {
      var scope = $scope.$new();
      scope.message = 'Report?';

      var modalInstance = $modal.open({
        templateUrl: 'modules/common/partials/prompt-modal.html',
        scope: scope,
        size: 'sm'
      });

      // Handle affirmative response
      modalInstance.result.then(function() {
        Incident.save({ userId: userId }, function() {}, function() {
          console.log('Implement me');
        });
      }).finally(function() {
        modalInstance.dismiss();
      });
    };

    // Launch Delete model
    $scope.delete = function(matchId) {
      var scope = $scope.$new();
      scope.message = 'Delete?';

      var modalInstance = $modal.open({
        templateUrl: 'modules/common/partials/prompt-modal.html',
        scope: scope,
        size: 'sm'
      });

      // Handle affirmative response
      modalInstance.result.then(function() {
        UserMatch.delete({ id: matchId }, function() {}, function() {
          console.log('Implement me');
        });
      }).finally(function() {
        modalInstance.dismiss();
      });
    };
  });
