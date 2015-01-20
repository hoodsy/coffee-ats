'use strict';

angular.module('user')
  .directive('userCard', function() {

    var count = 0;

    return {
      restrict: 'A',
      scope: {
        model: '='
      },
      templateUrl: 'modules/user/partials/user-card.html',
      link: function(scope) {
        count = (count + 1) % 5;
        scope.count = count;
      }
    };
});