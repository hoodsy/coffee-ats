'use strict';

angular.module('opportunity')
  .controller('OpportunityBillingCtrl', function ($scope, $stateParams, Opportunity, chargeCustomer, saveCustomer) {

    Opportunity.get({ id: $stateParams.id }, function(response) {
      $scope.opportunity = response;
    });

    $scope.saveCard = false;

    $scope.purchase = {'num': 1, 'total': 10};

    // 10 = $10.00, cost of an opportunity
    $scope.getTotal = function () {
      $scope.purchase.total = $scope.purchase.num * 10;
    }

    /*
     * Attempt to charge provided Card.
     * One time charge, or one time charge and Customer ID
     * created and associated with current User (info saved)
     */
    $scope.processPayment = function (status, response) {
      if ($scope.saveCard) {
        var customer = new saveCustomer(
          { tokenID: response.id, numItems: $scope.purchase.num} );
        customer.$save();
      }
      else {
        var charge = new chargeCustomer(
          { tokenID: response.id, numItems: $scope.purchase.num } );
        charge.$save();
      }
    }
  });
