'use strict';

angular.module('opportunity')
  .controller('OpportunityDetailCtrl', function ($rootScope, $scope, $stateParams, Opportunity) {

    $scope.palette = $stateParams.palette || '1';

    Opportunity.get({ id: $stateParams.id }, function(response) {
      $scope.opportunity = response;
    });

    // Only logged in user may edit their own profile
    $scope.isEditable = function() {
      if ($scope.opportunity) {
        return ($rootScope._user._id === $scope.opportunity.creatorId);
      }
    };
  });
