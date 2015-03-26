'use strict';

angular.module('common')
  .directive('scrollLoader', function() {
    return {
      restrict: 'A',
      scope: {
        handleScrollToTop: '&',
        handleHeightChange: '&',
        handleScrollToBottom: '&'
      },
      link: function(scope, element) {
        // Un-wrapped DOM element
        var el = element[0];

        // When scroll height changes we might want to automatically scroll
        // up or down
        if (scope.handleHeightChange) {
          scope.$watch(function() {
            return el.scrollHeight;
          }, function(newVal, oldVal) {
            var scrollDirection = scope.handleHeightChange();
            if (scrollDirection === -1) {
              element.scrollTop(el.scrollHeight);
            } else if (scrollDirection === 1) {
              element.scrollTop(newVal - oldVal + element.height());
            }
          });
        }

        // When user scrolls to top, call the handler
        if (scope.handleScrollToTop) {
          element.bind('scroll', function() {
            if (el.scrollTop === 0) {
              scope.handleScrollToTop();
            }
          });
        }

        // When user scrolls to bottom, call the handler
        if (scope.handleScrollToBottom) {
          element.bind('scroll', function() {
            if ((element.height() + el.scrollTop) >= el.scrollHeight) {
              scope.handleScrollToBottom();
            }
          });
        }
      }
    };
});
