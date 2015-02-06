'use strict';

angular.module('common')
  .directive('coffeeInput', function($compile, $interpolate) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var name = element.attr('name');
        if (name) {
          var required = $interpolate(
            '<span class="coffee-input-helper" ' +
            'data-ng-if="editForm.' + name +
            '.$error.required">Required</span>')(scope);
          ($compile(required)(scope)).insertAfter(element);
        }
      }
    };
});
