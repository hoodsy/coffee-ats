'use strict';

angular.module('common')
  .directive('mintags', function($compile, $interpolate) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        var unregister = attrs.$observe('mintags', function(value) {
          var valid = false;
          if (+value > 4) {
            valid = true;
          }
          ctrl.$setValidity('mintags', valid);
          ctrl.$setTouched();
        });
      }
    };
});
