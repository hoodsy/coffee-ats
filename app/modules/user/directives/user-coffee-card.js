'use strict';

angular.module('user')
  .directive('userCoffeeCard', function() {

    var count = 0;

    return {
      restrict: 'A',
      scope: {
        model: '='
      },
      templateUrl: 'modules/user/partials/user-coffee-card.html',
      link: function(scope) {
        count = (count + 1) % 5;
        scope.count = count;
      }
    };
});
