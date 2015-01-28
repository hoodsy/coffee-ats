'use strict';

angular.module('common')
  .directive('coffeeCard', function($compile, $interpolate) {
    return {
      restrict: 'A',
      controller: 'CoffeeCardCtrl',
      link: function(scope, element) {

        var original = $interpolate(
          '<div data-{{ item.type }}-card data-model="item" data-like-card="likeCard($event)"></div>')(scope);
        element.append($compile(original)(scope));

        // Reference to any currently running animation
        var animation = null;

        scope.$watch('item._action', function(newValue, oldValue) {
          if (!newValue && newValue === oldValue) {
            return;  // initialization by the framework
          }

          if (!newValue) {
            // If we previously had a value and now it is undefined this must
            // be an error due to a server call, so do the opposite animation
            // to restore the card

            if (animation) {
              animation.stop(true,false);
              element.find('.card-shadow').eq(0).animate({
                'padding-left': '0',
                'margin-right': '0'
              }, 400, 'swing');
            }
          } else {

            var e = $interpolate('<div data-{{ item._action }}-card></div>')(scope);
            animation = element.find('.card-shadow').eq(0).animate({
              'padding-left': '100%',
              'margin-right': '-100%'
            }, 400, 'swing', function() {
              animation = null;
              element.empty();
              element.append($compile(e)(scope));
            });
          }
        });
      }
    };
});
