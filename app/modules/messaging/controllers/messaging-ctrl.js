'use strict';

angular.module('messaging')
  .controller('MessagingCtrl', function ($scope, $modal, $state, $q, UserMatch, Incident) {

    // Flag to activate match controls
    $scope.canShowControls = -1;

    UserMatch.query(function(response) {
      $scope.matches = response;

      // Iterate through the matches and assign the proper palette

      var opportunityCount = 0;
      var userCount = 0;

      $scope.matches.forEach(function(match) {
        if (match.opportunities.length > 0) {
          opportunityCount = (opportunityCount + 1) % 3;
          match._palette = opportunityCount;
          match._paletteClass = 'opportunity';
        } else {
          userCount = (userCount + 1) % 5;
          match._palette = userCount;
          match._paletteClass = 'user';
        }
      });

      // Open up the first match already
      if ($scope.matches.length &&
          !/detail$/.test($state.current.name)) {
        $state.go('.detail', { id: $scope.matches[0]._id });
      }
    });

    $scope.toggleControls = function(index) {
      if ($scope.canShowControls === index) {
        $scope.canShowControls = -1;
      } else {
        $scope.canShowControls = index;
      }
    };

    $scope.enableControls = function(index) {
      $scope.canShowControls = index;
    };

    $scope.disableControls = function(index) {
      if ($scope.canShowControls === index) {
        $scope.canShowControls = -1;
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
    $scope.delete = function(matchId, $index) {
      var scope = $scope.$new();
      scope.message = 'Delete?';

      var modalInstance = $modal.open({
        templateUrl: 'modules/common/partials/prompt-modal.html',
        scope: scope,
        size: 'sm'
      });

      // Handle affirmative response
      return modalInstance.result.then(function() {
        var deferred = $q.defer();

        UserMatch.delete({ id: matchId }, function() {
          $scope.canShowControls = -1;
          $scope.matches.splice($index, 1);
          deferred.resolve();
        }, function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }).finally(function() {
        modalInstance.dismiss();
      });
    };
  });
