'use strict';

angular.module('opportunity')
  .controller('OpportunityManageCtrl', function ($scope, $state, $stateParams, Opportunity) {

    $scope.palette = $stateParams.palette || '1';

    if ($stateParams.id) { $scope.isEditable = true; };

    // Initialize operations for create/edit
    $scope.manageInit = function() {
      if ($scope.isEditable) {
        Opportunity.get({ id: $stateParams.id }, function(response) {
          $scope.opportunity = response;
        });
      } else {
        // initialize opportunity to add tags before creation
        $scope.opportunity = {};
        $scope.opportunity.tags = [];
      }
    };

    $scope.newTag = '';

    $scope.schedules = ['Full-time', 'Part-time', 'Other'];

    // On mobile views we split edit form across multiple pages
    $scope.page = 0;

    $scope.previousPage = function() {
      $scope.page -= 1;
    };

    $scope.nextPage = function() {
      $scope.page += 1;
    };

    // Add a tag to the opportunity's tags
    $scope.addTag = function(opportunity, tag, $event) {
      if (opportunity.tags.indexOf(tag) === -1) {
        opportunity.tags.push(tag);
      }
      $scope.newTag = '';
      $event.preventDefault();
    };

    // Remove a tag by index number (0-indexed)
    $scope.deleteTag = function(opportunity, index) {
      opportunity.tags.splice(index, 1);
    };

    $scope.create = function(opportunity) {
      Opportunity.create(opportunity, function(response) {
        console.log('success');
        $state.go('shell.opportunity.billing');
      }, function(response) {
        console.log('error');
      });
    };

    $scope.update = function(opportunity) {
      Opportunity.update(opportunity, function(response) {
        console.log('success');
        $state.go('shell.opportunity');
      }, function(response) {
        console.log('error');
      });
    };

    $scope.finish = function(opportunity) {
      if (Object.keys($scope.editForm.$error).length > 0) {
        return;
      }

      if ($scope.isEditable) {
        $scope.update(opportunity);
      } else {
        $scope.create(opportunity);
      }
    };
  });
