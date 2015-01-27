'use strict';

angular.module('opportunity')
  .controller('OpportunityDetailEditCtrl', function ($scope, $stateParams, Opportunity) {

    $scope.palette = $stateParams.palette || '1';

    Opportunity.get({ id: $stateParams.id }, function(response) {
      $scope.opportunity = response;
    });

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

    $scope.save = function(opportunity) {
      Opportunity.update(opportunity, function(response) {
        console.log('success');
      }, function(response) {
        console.log('error');
      });
    };
  });
