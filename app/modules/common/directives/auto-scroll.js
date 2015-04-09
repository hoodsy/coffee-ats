'use strict';

/*
 * This directive automatically scrolls down an element. This is used on the
 * into Feed, for example. Once it reaches the bottom of a scrollable area,
 * it stops.
 */

angular.module('common')
  .directive('autoScroll', function($interval) {

    var SCROLL_INTERVAL = 30;
    var LOAD_WAIT = 100;

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        // Un-wrapped DOM element
        var el = element[0];

        // Scroll down the scrollable area until the last height matches
        // the current, which means we're done scrolling
        function start() {
          var lastTop = -1;
          var promise = $interval(function() {
            if (el.scrollTop === lastTop) {
              $interval.cancel(promise);
              return;
            }
            lastTop = el.scrollTop;
            element.scrollTop(el.scrollTop + 1);
          }, SCROLL_INTERVAL);
        }

        // Watch for the directive to be enabled
        var unregister = attrs.$observe('autoScroll', function(value) {
          if (value === 'true') {

            // Watch for the area to become scrollable. This is necessary for
            // content that has to load asynchronously, for example.
            var promise = $interval(function() {
              if (el.scrollHeight > 0) {
                start();
                $interval.cancel(promise);
              }
            }, LOAD_WAIT);
          }
          unregister();
        });
      }
    };
});
