'use strict';

angular.module('common')
  .directive('likedCard', function() {
    return {
      restrict: 'A',
      templateUrl: 'modules/common/partials/liked-card.html'
    };
});
