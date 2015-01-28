'use strict';

angular.module('common')
  .directive('coffeeCard', function($compile, $interpolate, $timeout) {
    return {
      restrict: 'A',
      controller: 'CoffeeCardCtrl',
      link: function(scope, element) {
        var original = $interpolate(
          '<div data-{{ item.type }}-card data-model="item" data-like-card="likeCard($event)" data-ask-delete="askDelete()"></div>')(scope);
        element.append($compile(original)(scope));
      }
    };
});
