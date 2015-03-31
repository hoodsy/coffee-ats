'use strict';

angular.module('opportunity')
  .controller('OpportunityDashboardCtrl', function ($scope, UserOpportunities, DEFAULT_PAGE_SIZE) {

    // Flag to track which card has its controls displayed, this variable is
    // data-bound to the child card directives which control the toggling
    $scope.showControls = { id: -1 };

    // Flag for when more opportunities are being loaded
    $scope.loadingMoreOpportunities = false;

    // Track the date of the earliest opportunity we have received
    var earliestOpportunityDate = null;

    // Flag to mark when all opportunities have been loaded
    $scope.allOpportunitiesLoaded = false;

    // Array to hold opportunity objects
    $scope.opportunities = [];

    $scope.loadOpportunities = function() {
      if ($scope.allOpportunitiesLoaded) {
        return;
      }

      $scope.loadingMoreOpportunities = true;

      UserOpportunities.query({
        after: earliestOpportunityDate
      }, function(response) {
        $scope.loadingMoreOpportunities = false;

        // No more items to load
        if (response.length < DEFAULT_PAGE_SIZE) {
          $scope.allOpportunitiesLoaded = true;
        }

        // Extend the end of opportunities with response
        if (response.length > 0) {
          response.unshift($scope.opportunities.length, 0);
          $scope.opportunities.splice.apply($scope.opportunities, response);
          earliestOpportunityDate = $scope.opportunities[$scope.opportunities.length-1].created;
        }
      }, function() {
        $scope.loadingMoreOpportunities = false;
      });
    };

    $scope.loadOpportunities();

    $scope.removeOpportunity = function($index) {
      $scope.opportunities.splice($index, 1);
    };
  });
