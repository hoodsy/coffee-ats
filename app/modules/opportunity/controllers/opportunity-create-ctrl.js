'use strict';

angular.module('opportunity')
  .controller('OpportunityCreateCtrl', function ($scope, $state, $stateParams, Opportunity) {

    $scope.postOpportunity = function() {
      var newOpportunity = new Opportunity($scope.opportunity);
      newOpportunity.$save();
      $state.go('home.opportunity.billing');
    }

  });
