'use strict';

angular.module('common')
  .directive('onEnter', function() {
    return {
      restrict: 'A',
      scope: {
        onEnter: '&'
      },
      link: function(scope, element, attrs) {
        element.keydown(function(event){
          if (event.keyCode === 13) {
            if (attrs.onEnter) {
              scope.$apply(function() {
                scope.onEnter();
              });
            } else {
              event.preventDefault();
            }
          }
        });
      }
    };
});
