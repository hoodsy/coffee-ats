'use strict';

angular.module('opportunity')
  .controller('OpportunityCreateCtrl', function ($scope, $state, $stateParams, Opportunity) {

    // $scope.postOpportunity = function() {
    //   var newOpportunity = new Opportunity($scope.opportunity);
    //   newOpportunity.$save();
    //   $state.go('home.opportunity.billing');
    // }

    $scope.palette = $stateParams.palette || '1';

    $scope.newTag = '';

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
    $scope.addTag = function(opportunity, tag) {
      if (opportunity.tags.indexOf(tag) === -1) {
        opportunity.tags.push(tag);
      }
      $scope.newTag = '';
    };

    // Remove a tag by index number (0-indexed)
    $scope.deleteTag = function(opportunity, index) {
      opportunity.tags.splice(index, 1);
    };

    $scope.save = function(opportunity) {
      opportunity.$update(function(response) {
        console.log('success');
      }, function(response) {
        console.log('error');
      });
    };
  });
