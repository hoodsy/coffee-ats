'use strict';

angular.module('opportunity')
  .controller('OpportunityDetailCtrl', function ($scope, $stateParams, Opportunity) {

    $scope.palette = $stateParams.palette || '1';

    Opportunity.get({ id: $stateParams.id }, function(response) {
      $scope.opportunity = response;
    });

    $scope.updateOpportunity = function() {
      console.log('save changes made to opportunity');
    };
  });
