'use strict';

angular.module('opportunity')
  .controller('OpportunityCreateCtrl', function ($scope, $state, $stateParams, Opportunity) {

    $scope.palette = $stateParams.palette || '1';

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

    // initialize opportunity to add tags before creation
    $scope.opportunity = {};
    $scope.opportunity.tags = [];

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
      Opportunity.save(opportunity, function(response) {
        console.log('success');
      }, function(response) {
        console.log('error');
      });
    };
  });
