'use strict';

/**
 * Directive that sets the model validatity (for forms) based on a minimum
 * value passed in as an attribute.
 */
angular.module('common')
  .directive('coffeemin', function($compile, $interpolate) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {

        var min = +attrs.coffeemin;

        attrs.$observe('coffeeminModel', function(value) {
          var valid = true;
          if (min !== null && +value < min) {
            valid = false;
          }
          ctrl.$setValidity('coffeemin', valid);
          ctrl.$setTouched();
        });
      }
    };
});
