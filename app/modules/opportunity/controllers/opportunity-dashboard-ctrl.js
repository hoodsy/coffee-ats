'use strict';

angular.module('opportunity')
  .controller('OpportunityDashboardCtrl', function ($scope, UserOpportunities) {

    // Flag to track which card has its controls displayed, this variable is
    // data-bound to the child card directives which control the toggling
    $scope.showControls = { id: -1 };

    UserOpportunities.query(function(response) {
      $scope.opportunities = response;
    });
  });
