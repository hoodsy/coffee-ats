'use strict';

angular.module('opportunity')
  .directive('opportunityCard', function() {

    var count = 0;

    return {
      restrict: 'A',
      scope: {
        model: '='
      },
      templateUrl: 'modules/opportunity/partials/opportunity-card.html',
      link: function(scope) {
        count = (count + 1) % 3;
        scope.count = count;
      }
    };
});
