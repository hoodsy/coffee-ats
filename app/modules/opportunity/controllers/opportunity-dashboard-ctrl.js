'use strict';

angular.module('opportunity')
  .controller('OpportunityDashboardCtrl', function ($scope, Opportunity) {
      Opportunity.query(function(response) {
        $scope.opportunities = response;
      });
  });
