'use strict';

angular.module('common')
  .directive('messageTextarea', function() {
    return {
      restrict: 'A',
      scope: {
        handleScrollToTop: '&',
        handleHeightChange: '&'
      },
      link: function(scope, element) {
        // Un-wrapped DOM element
        var el = element[0];

        // When scroll height changes we might want to automatically scroll
        // up or down
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

        // When user scrolls to top, call the handler
        element.bind('scroll', function() {
          if (el.scrollTop === 0) {
            scope.handleScrollToTop();
          }
        });
      }
    };
});
