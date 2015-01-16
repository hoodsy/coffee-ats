'use strict';

angular.module('common')
  .directive('coffeeCard', function($compile, $interpolate) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var e = $interpolate('<div data-{{ item.type }}-coffee-card data-model="item"></div>')(scope);
        element.append($compile(e)(scope));
      }
    };
});
