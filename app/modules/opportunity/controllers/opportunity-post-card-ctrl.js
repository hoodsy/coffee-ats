'use strict';

angular.module('opportunity')
  .controller('OpportunityPostCardCtrl', function ($scope, $modal, Opportunity) {

    $scope.toggleControls = function($event, id) {
      $event.stopPropagation();
      if ($scope.showControlsId === id) {
        $scope.showControlsId = null;
      } else {
        $scope.showControlsId = id;
      }
    };

    $scope.enableControls = function(id) {
      $scope.showControlsId = id;
    };

    $scope.disableControls = function(id) {
      if ($scope.showControlsId === id) {
        $scope.showControlsId = null;
      }
    };

    $scope.showControls = function(id) {
      return ($scope.showControlsId === id);
    };

    // Handle filled action: set opportunity to inactive and update
    $scope.filled = function($event, opportunity) {
      $event.stopPropagation();

      // Open modal with prompt
      var scope = $scope.$new();

      scope.message = 'Job Filled?';
      if (opportunity.filled) {
        scope.message = 'Un-fill Job?';
      }

      var modalInstance = $modal.open({
        templateUrl: 'modules/common/partials/prompt-modal.html',
        scope: scope,
        size: 'sm'
      });

      // Handle affirmative response
      modalInstance.result.then(function() {
        opportunity.filled = !opportunity.filled;
        Opportunity.update({ id: opportunity._id }, opportunity, function() {
          $scope.showControlsId = null;
        }, function() {
          console.log('failure');
        });
      }).finally(function() {
        modalInstance.dismiss();
      });
    };

    // Handle delete action
    $scope.delete = function($event, id) {
      $event.stopPropagation();

      // Open modal with prompt
      var scope = $scope.$new();
      scope.message = 'Delete?';
      var modalInstance = $modal.open({
        templateUrl: 'modules/common/partials/prompt-modal.html',
        scope: scope,
        size: 'sm'
      });

      // Handle affirmative response
      modalInstance.result.then(function() {
        Opportunity.delete({ id: id }, function() {
          $scope.showControlsId = null;
          $scope.onDelete();
        }, function() {
          console.log('failure');
        });
      }).finally(function() {
        modalInstance.dismiss();
      });
    };
  });
