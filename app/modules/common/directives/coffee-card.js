'use strict';

angular.module('common')
  .directive('coffeeCard', function($compile, $interpolate, $timeout) {
    return {
      restrict: 'A',
      controller: 'CoffeeCardCtrl',
      link: function(scope, element) {
        var original = $interpolate(
          '<div data-{{ item.type }}-card ' +
          'data-model="item" ' +
          'data-card-like="like($event, model)" ' +
          'data-card-ask-delete="askDelete(model)" ' +
          'data-card-cancel-delete="cancelDelete($event, model)" ' +
          'data-card-delete="delete($event, model)"></div>')(scope);

        element.append($compile(original)(scope));
      }
    };
});
