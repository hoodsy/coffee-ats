'use strict';

angular.module('common')
  .directive('messageTextarea', function() {
    return {
      restrict: 'A',
      scope: {
        handleScrollToTop: '&'
      },
      link: function(scope, element) {
        // Un-wrapped DOM element
        var el = element[0];

        // Flag to ignore the next possible auto-scroll
        var ignoreScroll = false;

        // When scroll height increases (e.g. when a new message comes in),
        // automatically scroll down
        scope.$watch(function() {
          return el.scrollHeight;
        }, function(newVal, oldVal) {
          if (oldVal === newVal) {
            // Scroll down on initial load (i.e. when oldVal === newVal)
            element.scrollTop(el.scrollHeight);
          } else if (ignoreScroll) {
            // Ignore scrolling when we call handleScrollTop
            ignoreScroll = false;
          } else if (el.scrollTop === 0) {
            // When our previous scroll was 0 but our height has changed adjust
            // the scroll so it maintains its relative location
            element.scrollTop(newVal - oldVal + element.height());
          }
        });

        // When user scrolls to top, call the handler
        element.bind('scroll', function() {
          if (el.scrollTop === 0) {
            scope.handleScrollToTop();
            ignoreScroll = true;
          }
        });
      }
    };
});
