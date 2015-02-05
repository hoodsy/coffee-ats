'use strict';

angular.module('common')
  .directive('messageTextarea', function($compile, $interpolate) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var el = element[0];
        scope.$watch(function() {
          return el.scrollHeight;
        }, function(oldVal, newVal) {
          if (oldVal === newVal) {
            return;
          }
          element.scrollTop(el.scrollHeight);
        });
      }
    };
});
