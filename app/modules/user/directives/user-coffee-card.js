'use strict';

angular.module('user')
  .directive('userCoffeeCard', function() {
    return {
      restrict: 'A',
      scope: {
        model: '='
      },
      templateUrl: 'modules/user/partials/user-coffee-card.html'
    };
});
