'use strict';

angular.module('opportunity')
  .controller('OpportunityBillingCtrl', function ($scope, $state, chargeCustomer, saveCustomer) {

    $scope.saveCard = false;
    $scope.purchase = {};
    $scope.purchase.num = 1;
    $scope.purchase.total = 50;

    // 50 = $50.00, cost of an opportunity
    $scope.getTotal = function () {
      $scope.purchase.total = $scope.purchase.num * 50;
    }

    /*
      Attempt to charge provided Card.
      One time charge, or one time charge and Customer ID
      created and associated with current User
    */
    $scope.processPayment = function (status, response) {
      if ($scope.saveCard == true) {
        var customer = new saveCustomer(
          { tokenID: response.id, numItems: $scope.purchase.num} );
        customer.$save();
      }
      else {
        var charge = new chargeCustomer(
          { tokenID: response.id, numItems: $scope.purchase.num } );
        charge.$save();
      }
      $state.go('home.opportunity');
    }
  });
