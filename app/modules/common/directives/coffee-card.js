'use strict';

angular.module('common')
  .directive('coffeeCard', function($compile, $interpolate) {
    return {
      restrict: 'A',
      controller: 'CoffeeCardCtrl',
      link: function(scope, element) {
        var e = $interpolate(
          '<div data-{{ item.type }}-card data-model="item" data-like-card="likeCard($event)"></div>')(scope);
        element.append($compile(e)(scope));
      }
    };
});
