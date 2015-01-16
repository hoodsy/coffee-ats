'use strict';

angular.module('opportunity')
  .directive('opportunityCoffeeCard', function() {
    return {
      restrict: 'A',
      scope: {
        model: '='
      },
      templateUrl: 'modules/opportunity/partials/opportunity-coffee-card.html'
    };
});
